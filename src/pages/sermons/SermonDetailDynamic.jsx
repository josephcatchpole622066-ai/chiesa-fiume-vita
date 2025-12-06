import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getCachedVideos, fetchYouTubeVideos, filterSermons, excludeSongs } from '../../utils/youtubeAPI';
import jsPDF from 'jspdf';
import './SermonDetail.css';

// Funzione helper per estrarre le letture bibliche dalla trascrizione
const extractBiblicalReadings = (transcriptInfo) => {
  if (!transcriptInfo?.text) {
    return [
      { type: "Prima Lettura", reference: "Da definire", text: null },
      { type: "Salmo", reference: "Da definire", text: null },
      { type: "Seconda Lettura", reference: "Da definire", text: null },
      { type: "Vangelo", reference: "Da definire", text: null }
    ];
  }

  const text = transcriptInfo.text;
  const readings = [];
  
  // Dividi il testo in sezioni usando i blocchi di codice
  const sections = text.split('```');
  
  for (let i = 1; i < sections.length; i += 2) {
    const codeBlock = sections[i];
    
    // Verifica se contiene una citazione biblica (deve avere « e Nuova Riveduta 2006)
    if (codeBlock.includes('«') && codeBlock.includes('Nuova Riveduta 2006')) {
      // Estrai il riferimento (tutto dopo l'ultima parentesi aperta fino alla virgola)
      const refMatch = codeBlock.match(/\(([^,]+),\s*Nuova Riveduta 2006\)/);
      if (refMatch) {
        const reference = refMatch[1].trim();
        
        // Estrai il testo della citazione (tutto prima del riferimento)
        const textBeforeRef = codeBlock.substring(0, codeBlock.indexOf('('));
        const verseText = textBeforeRef.trim();
        
        const type = readings.length === 0 ? "Brano Principale" : "Citazione";
        readings.push({ type, reference, text: verseText });
      }
    }
  }
  
  // Se ancora non ci sono letture, usa i valori di default
  if (readings.length === 0) {
    return [
      { type: "Prima Lettura", reference: "Da definire", text: null },
      { type: "Salmo", reference: "Da definire", text: null },
      { type: "Seconda Lettura", reference: "Da definire", text: null },
      { type: "Vangelo", reference: "Da definire", text: null }
    ];
  }
  
  return readings;
};

// Funzione per scaricare la trascrizione come PDF
const downloadTranscriptPDF = (sermon, transcript) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;
  
  // Colori moderni
  const primaryColor = [41, 128, 185]; // Blu moderno
  const accentColor = [52, 73, 94]; // Grigio scuro
  const lightGray = [236, 240, 241]; // Grigio chiaro
  const citationBg = [245, 247, 250]; // Sfondo citazioni
  
  // Rimuovi solo i tag markdown ### ma mantieni i blocchi di citazione
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = transcript.replace(/###/g, '\n');
  let textContent = tempDiv.textContent || tempDiv.innerText;
  
  // Funzione per formattare la data
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      // Gestisci diversi formati di data
      let date;
      if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        date = new Date(year, month - 1, day);
      } else {
        date = new Date(dateString);
      }
      
      if (isNaN(date.getTime())) return dateString; // Ritorna stringa originale se non valida
      
      const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
                     'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch (e) {
      return dateString; // Ritorna stringa originale in caso di errore
    }
  };
  
  // Funzione helper per aggiungere nuova pagina se necessario
  const checkNewPage = (lineHeight) => {
    if (yPosition + lineHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin + 15; // Margine superiore per le nuove pagine
    }
  };
  
  // Box colorato superiore
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, pageWidth, 45, 'F');
  
  // Titolo del sermone in bianco sul box blu
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  yPosition = 20;
  const titleLines = pdf.splitTextToSize(sermon.title, maxWidth);
  titleLines.forEach(line => {
    pdf.text(line, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 7;
  });
  
  yPosition = 55;
  
  // Reset colore testo a nero
  pdf.setTextColor(0, 0, 0);
  
  // Metadati con icone e stile moderno
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  
  // Box info con sfondo grigio chiaro
  const infoBoxHeight = 25;
  pdf.setFillColor(...lightGray);
  pdf.roundedRect(margin, yPosition, maxWidth, infoBoxHeight, 3, 3, 'F');
  
  yPosition += 8;
  let xOffset = margin + 10;
  
  // Predicatore
  if (sermon.preacher) {
    pdf.setTextColor(...accentColor);
    pdf.setFont(undefined, 'bold');
    pdf.text('Predicatore:', xOffset, yPosition);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text(sermon.preacher, xOffset + 30, yPosition);
    yPosition += 6;
  }
  
  // Data
  if (sermon.date) {
    pdf.setTextColor(...accentColor);
    pdf.setFont(undefined, 'bold');
    pdf.text('Data:', xOffset, yPosition);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text(formatDate(sermon.date), xOffset + 15, yPosition);
    yPosition += 6;
  }
  
  // Playlist
  if (sermon.playlist) {
    pdf.setTextColor(...accentColor);
    pdf.setFont(undefined, 'bold');
    pdf.text('Serie:', xOffset, yPosition);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text(sermon.playlist, xOffset + 15, yPosition);
  }
  
  yPosition += 15;
  
  // Linea separatrice colorata
  pdf.setDrawColor(...primaryColor);
  pdf.setLineWidth(1);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 15;
  
  // Reset colore per il contenuto
  pdf.setDrawColor(0, 0, 0);
  pdf.setTextColor(0, 0, 0);
  
  // Contenuto della trascrizione con citazioni inline
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  
  // Split per sezioni e gestisci citazioni bibliche inline
  const sections = textContent.split('```');
  
  sections.forEach((section, index) => {
    // Le sezioni dispari sono dentro i blocchi ```
    if (index % 2 === 1 && section.includes('Nuova Riveduta 2006')) {
      // È una citazione biblica
      const lines = section.trim().split('\n');
      const lastLine = lines[lines.length - 1];
      const refMatch = lastLine.match(/\(([^,]+),\s*Nuova Riveduta 2006\)/);
      
      if (refMatch) {
        const reference = refMatch[1].trim();
        const text = lines.slice(0, -2).join('\n').trim();
        
        // Calcola altezza del box
        const citationLines = pdf.splitTextToSize(text, maxWidth - 20);
        const citationHeight = 15 + (citationLines.length * 5);
        checkNewPage(citationHeight + 10);
        
        // Box per la citazione
        pdf.setFillColor(...citationBg);
        pdf.setDrawColor(...primaryColor);
        pdf.setLineWidth(0.5);
        pdf.roundedRect(margin, yPosition, maxWidth, citationHeight, 3, 3, 'FD');
        
        yPosition += 7;
        
        // Riferimento in alto a destra
        pdf.setFontSize(8);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(...accentColor);
        pdf.text(reference, pageWidth - margin - 5, yPosition, { align: 'right' });
        
        yPosition += 3;
        
        // Testo della citazione
        pdf.setFontSize(9);
        pdf.setFont(undefined, 'italic');
        pdf.setTextColor(0, 0, 0);
        citationLines.forEach(line => {
          pdf.text(line, margin + 5, yPosition);
          yPosition += 5;
        });
        
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(10);
        yPosition += 10;
      }
    } else if (section.trim()) {
      // Testo normale
      const paragraphs = section.split(/\n\n+/).filter(p => p.trim());
      
      paragraphs.forEach((paragraph, pIndex) => {
        const trimmedParagraph = paragraph.trim();
        if (trimmedParagraph) {
          // Gestisci titoli
          const isTitle = trimmedParagraph.length < 100 && !trimmedParagraph.includes('.');
          
          if (isTitle) {
            checkNewPage(10);
            pdf.setFont(undefined, 'bold');
            pdf.setFontSize(11);
            const titleLines = pdf.splitTextToSize(trimmedParagraph, maxWidth);
            titleLines.forEach(line => {
              pdf.text(line, margin, yPosition);
              yPosition += 7;
            });
            pdf.setFont(undefined, 'normal');
            pdf.setFontSize(10);
            yPosition += 3;
          } else {
            const lines = pdf.splitTextToSize(trimmedParagraph, maxWidth);
            lines.forEach(line => {
              checkNewPage(6);
              pdf.text(line, margin, yPosition);
              yPosition += 6;
            });
            
            if (pIndex < paragraphs.length - 1) {
              yPosition += 4;
            }
          }
        }
      });
    }
  });
  
  // Footer moderno su ogni pagina
  const totalPages = pdf.internal.getNumberOfPages();
  pdf.setTextColor(...accentColor);
  pdf.setFontSize(8);
  pdf.setFont(undefined, 'normal');
  
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    
    // Linea sottile in alto nel footer
    pdf.setDrawColor(...lightGray);
    pdf.setLineWidth(0.5);
    pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
    
    // Numero pagina
    pdf.text(
      `${i} / ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }
  
  // Salva il PDF
  const filename = `${sermon.title.substring(0, 30).replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`;
  pdf.save(filename);
};

function SermonDetailDynamic() {
  const { sermonId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('video');
  const [sermon, setSermon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allSermons, setAllSermons] = useState([]);

  useEffect(() => {
    loadSermon();
  }, [sermonId]);

  const loadSermon = async () => {
    try {
      setLoading(true);

      // Usa cache globale o carica da YouTube
      let videos = getCachedVideos();
      if (!videos) {
        console.log('Cache non disponibile, carico da API');
        videos = await fetchYouTubeVideos('UCGdxHNQjIRAQJ66S5bCRJlg');
      } else {
        console.log('Uso cache globale per dettaglio video');
      }
      
      const youtubeVideo = videos.find(v => v.id === sermonId);
      
      if (youtubeVideo) {
        // Prova a caricare trascrizione manuale
        let transcriptText = null;
        let biblicalReadings = [];
        
        try {
          const response = await fetch(`/transcripts/${sermonId}.json`);
          if (response.ok) {
            const transcriptData = await response.json();
            if (transcriptData.available && transcriptData.text) {
              transcriptText = transcriptData.text;
              biblicalReadings = extractBiblicalReadings(transcriptData);
            }
          }
        } catch (err) {
          console.log('Nessuna trascrizione manuale disponibile');
        }
        
        setSermon({
          id: youtubeVideo.id,
          title: youtubeVideo.title,
          date: youtubeVideo.publishedAt,
          preacher: youtubeVideo.preacher || 'Chiesa Fiume di Vita',
          scripture: youtubeVideo.scripture || null,
          duration: 'N/A',
          views: youtubeVideo.views || 0,
          description: youtubeVideo.title,
          videoUrl: youtubeVideo.embedUrl,
          isStatic: false,
          playlist: null,
          transcript: transcriptText,
          readings: biblicalReadings,
          downloads: {
            audio: "#",
            pdf: "#"
          }
        });
        
        // Applica gli stessi filtri usati nella pagina principale
        const filtered = filterSermons(videos);
        const finalVideos = excludeSongs(filtered);
        
        // Escludi video dalla playlist "Culto di Adorazione Live"
        const excludedPlaylists = ['culto di adorazione live'];
        const withoutAdorationLive = finalVideos.filter(video => {
          if (!video.playlist) return true;
          const playlistLower = video.playlist.toLowerCase();
          return !excludedPlaylists.some(excluded => playlistLower.includes(excluded));
        });
        
        // Prendi altri video YouTube filtrati per la sezione "Altre Predicazioni"
        const otherVideos = withoutAdorationLive
          .filter(v => v.id !== sermonId)
          .slice(0, 3)
          .map(v => ({
            id: v.id,
            title: v.title,
            date: v.publishedAt,
            preacher: v.preacher || 'Chiesa Fiume di Vita',
            duration: 'N/A',
            views: v.views || 0,
            thumbnail: v.thumbnail,
            isStatic: false
          }));
        setAllSermons(otherVideos);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Guarda questa predicazione: ${sermon?.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      email: `mailto:?subject=${encodeURIComponent(sermon?.title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copiato negli appunti!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="sermon-detail-container">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Caricamento predicazione...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!sermon) {
    return (
      <div className="sermon-detail-container">
        <div className="container">
          <h2>Predicazione non trovata</h2>
          <button onClick={() => navigate('/sermons')} className="back-btn">
            Torna alle Predicazioni
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sermon-detail-container">
      <div className="sermon-detail-header">
        <div className="container">
          <button className="back-button" onClick={() => navigate('/sermons')}>
             Torna alle Predicazioni
          </button>

          <div className="sermon-header-content">
            <div className="sermon-meta-info">
              <span className="sermon-date-badge">{formatDate(sermon.date)}</span>
              {sermon.duration !== 'N/A' && (
                <span className="sermon-duration-badge"> {sermon.duration}</span>
              )}
            </div>

            <h1 className="sermon-detail-title">{sermon.title}</h1>

            <div className="sermon-preacher-info">
              <span className="preacher-icon-large">👤</span>
              <span className="preacher-name">{sermon.preacher}</span>
            </div>

            {sermon.scripture && (
              <div className="sermon-scripture-info">
                <span className="scripture-icon-large">📖</span>
                <span className="scripture-text">{sermon.scripture}</span>
              </div>
            )}

            <p className="sermon-detail-description">{sermon.description}</p>

            <div className="sermon-stats-bar">
              {sermon.views > 0 && (
                <div className="stat-item">
                  <span className="stat-icon"></span>
                  <span>{sermon.views} visualizzazioni</span>
                </div>
              )}
              {sermon.readings && sermon.readings.length > 0 && (
                <div className="stat-item">
                  <span className="stat-icon"></span>
                  <span>{sermon.readings.length} letture</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container sermon-detail-content">
        <div className="sermon-main">
          <div className="content-tabs">
            <button
              className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
               Video
            </button>
            {sermon.transcript && (
              <button
                className={`tab-btn ${activeTab === 'transcript' ? 'active' : ''}`}
                onClick={() => setActiveTab('transcript')}
              >
                 Trascrizione
              </button>
            )}
            {sermon.readings && sermon.readings.length > 0 && (
              <button
                className={`tab-btn ${activeTab === 'readings' ? 'active' : ''}`}
                onClick={() => setActiveTab('readings')}
              >
                 Letture
              </button>
            )}
          </div>

          <div className="tab-content">
            <div className="video-container" style={{ display: activeTab === 'video' ? 'block' : 'none' }}>
              <div className="video-wrapper">
                <iframe
                  width="100%"
                  height="500"
                  src={sermon.videoUrl}
                  title={sermon.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-info">
                <p>
                   Registrazione della celebrazione del {formatDate(sermon.date)}
                </p>
              </div>
            </div>

            {activeTab === 'transcript' && sermon.transcript && (
              <div className="transcript-container">
                <div className="transcript-header">
                  <h2>Trascrizione</h2>
                  <button className="print-btn" onClick={() => downloadTranscriptPDF(sermon, sermon.transcript)}>📄 PDF Trascrizione</button>
                </div>
                <div className="transcript-content">
                  <ReactMarkdown>{sermon.transcript}</ReactMarkdown>
                </div>
              </div>
            )}

            {activeTab === 'readings' && sermon.readings && (
              <div className="readings-container">
                <h2>Letture del Giorno</h2>
                <div className="readings-list">
                  {sermon.readings.map((reading, index) => (
                    <div key={index} className="reading-item">
                      <div className="reading-type">{reading.type}</div>
                      <div className="reading-reference">{reading.reference}</div>
                      {reading.text && (
                        <div className="reading-verse-text">
                          {reading.text}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="readings-note">
                  <p>
                    📖 Per leggere i testi completi, visita 
                    <a href="https://www.laparola.net" target="_blank" rel="noopener noreferrer">
                      {' '}LaParola.net
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sermon-sidebar">
          {sermon.downloads && (
            <div className="sidebar-section">
              <h3>Downloads</h3>
              <div className="download-buttons">
                <a href={sermon.downloads.audio} className={`download-btn ${sermon.downloads.audio === "#" ? "disabled" : ""}`} onClick={(e) => { if (sermon.downloads.audio === "#") { e.preventDefault(); alert("Download non ancora disponibile"); } }}>
                  <span className="download-icon"></span>
                  <span>Audio MP3</span>
                </a>
                <a href={sermon.downloads.pdf} className={`download-btn ${sermon.downloads.pdf === "#" ? "disabled" : ""}`} onClick={(e) => { if (sermon.downloads.pdf === "#") { e.preventDefault(); alert("Download non ancora disponibile"); } }}>
                  <span className="download-icon"></span>
                  <span>PDF Trascrizione</span>
                </a>
              </div>
            </div>
          )}

          <div className="sidebar-section">
            <h3>Condividi</h3>
            <div className="share-buttons-vertical">
              <button className="share-btn-vertical" onClick={() => handleShare('facebook')}> Facebook</button>
              <button className="share-btn-vertical" onClick={() => handleShare('whatsapp')}> WhatsApp</button>
              <button className="share-btn-vertical" onClick={() => handleShare('email')}> Email</button>
              <button className="share-btn-vertical" onClick={() => handleShare('copy')}> Copia Link</button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Informazioni</h3>
            <div className="info-list-vertical">
              <div className="info-item-vertical">
                <strong>Data:</strong>
                <span>{formatDate(sermon.date)}</span>
              </div>
              <div className="info-item-vertical">
                <strong>Predicatore:</strong>
                <span>{sermon.preacher}</span>
              </div>
              {sermon.duration !== 'N/A' && (
                <div className="info-item-vertical">
                  <strong>Durata:</strong>
                  <span>{sermon.duration}</span>
                </div>
              )}
              {sermon.views > 0 && (
                <div className="info-item-vertical">
                  <strong>Visualizzazioni:</strong>
                  <span>{sermon.views}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="related-sermons">
          <h2>Altre Predicazioni</h2>
          <div className="related-sermons-grid">
            {allSermons.filter(s => s.id !== sermonId).slice(0, 3).map((relatedSermon) => (
              <div
                key={relatedSermon.id}
                className="related-sermon-card"
                onClick={() => navigate(`/sermons/${relatedSermon.id}`)}
              >
                {relatedSermon.thumbnail && (
                  <div className="related-sermon-thumbnail">
                    <img src={relatedSermon.thumbnail} alt={relatedSermon.title} />
                  </div>
                )}
                <div className="related-sermon-content">
                  <div className="related-sermon-date">{formatDate(relatedSermon.date)}</div>
                  <h4>{relatedSermon.title}</h4>
                  <p className="related-sermon-preacher">{relatedSermon.preacher}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SermonDetailDynamic;





