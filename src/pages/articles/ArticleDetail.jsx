import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticles } from '../../data/articlesData';
import jsPDF from 'jspdf';
import './ArticleDetail.css';

// Contenuti completi degli articoli
const articlesContent = {
  'matrimonio-cristiano': {
    title: 'Il Matrimonio in Cristo: Un Patto Sacro',
    author: 'Stefano Bonavolta',
    date: '2025-12-01',
    category: 'vita-cristiana',
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80',
    readTime: '8 min',
    content: `
## Introduzione

Il matrimonio è molto più di una semplice unione civile o un contratto legale tra due persone. Nella visione biblica, il matrimonio è un patto sacro istituito da Dio stesso nel giardino dell'Eden, quando disse: *"Non è bene che l'uomo sia solo; io gli farò un aiuto che sia adatto a lui"* (Genesi 2:18).

## Il Modello Divino

L'apostolo Paolo, nella lettera agli Efesini, ci rivela il mistero profondo del matrimonio cristiano:

> *"Mariti, amate le vostre mogli, come anche Cristo ha amato la chiesa e ha dato se stesso per lei"* (Efesini 5:25)

Questo verso stabilisce il modello divino per il matrimonio: l'amore sacrificale di Cristo per la Sua chiesa. Il marito è chiamato ad amare la propria moglie con lo stesso amore incondizionato, paziente e sacrificale che Cristo ha dimostrato sulla croce.

## I Tre Pilastri del Matrimonio Cristiano

### 1. L'Unità

*"Perciò l'uomo lascerà suo padre e sua madre e si unirà a sua moglie, e i due saranno una sola carne"* (Genesi 2:24)

L'unità nel matrimonio cristiano non significa perdere la propria identità, ma creare una nuova entità spirituale dove due persone diventano un tutt'uno davanti a Dio. Questa unità richiede:

- **Comunicazione aperta e onesta**
- **Condivisione dei valori spirituali**
- **Supporto reciproco nelle decisioni**
- **Preghiera insieme come coppia**

### 2. Il Rispetto Reciproco

*"Del resto, anche voi, ciascuno individualmente, ami sua moglie come ama se stesso; e la moglie rispetti il marito"* (Efesini 5:33)

Il rispetto non è opzionale nel matrimonio cristiano. Il marito deve onorare sua moglie come vaso più delicato (1 Pietro 3:7), mentre la moglie è chiamata a rispettare l'autorità amorevole del marito. Questo rispetto reciproco crea un ambiente di sicurezza e fiducia.

### 3. L'Impegno Permanente

Il matrimonio cristiano non è un contratto temporaneo, ma un patto a vita. Gesù stesso disse:

> *"Quello dunque che Dio ha unito, l'uomo non lo separi"* (Marco 10:9)

Questo impegno permanente richiede:
- Fedeltà assoluta nel corpo, mente e cuore
- Perseveranza nelle difficoltà
- Perdono continuo e grazia reciproca
- Rinnovamento costante dell'amore

## Le Sfide del Matrimonio Moderno

Viviamo in un'epoca in cui il concetto biblico di matrimonio è costantemente attaccato e distorto. Le coppie cristiane affrontano sfide uniche:

- **Pressioni culturali** che promuovono valori contrari alla Parola di Dio
- **Tentazioni mediatiche** che minacciano la purezza e la fedeltà
- **Stress economico** e lavorativo che può creare tensioni
- **Differenze caratteriali** che richiedono pazienza e comprensione

Tuttavia, con Cristo al centro del matrimonio, ogni sfida può essere superata. Come dice Ecclesiaste 4:12: *"Una corda a tre capi non si rompe facilmente"* - quella terza corda è Cristo stesso.

## Consigli Pratici per un Matrimonio Prospero

### Preghiera Quotidiana Insieme
Iniziate e terminate ogni giornata pregando insieme come coppia. Condividete le vostre preoccupazioni, ringraziamenti e richieste davanti al Signore.

### Studio Biblico di Coppia
Dedicate del tempo ogni settimana per studiare insieme la Parola di Dio. Questo rafforza la vostra fondazione spirituale comune.

### Appuntamenti Regolari
Non smettete mai di corteggiare il vostro coniuge. Pianificate appuntamenti regolari per mantenere viva la relazione romantica.

### Comunicazione Aperta
Create uno spazio sicuro dove entrambi potete esprimere sentimenti, preoccupazioni e desideri senza timore di giudizio.

### Servizio Reciproco
Cercate quotidianamente modi per servire il vostro coniuge, seguendo l'esempio di Cristo che lavò i piedi dei Suoi discepoli.

## Conclusione

Il matrimonio cristiano è un viaggio meraviglioso che riflette la relazione tra Cristo e la Sua chiesa. Non è sempre facile, ma con Cristo al centro, diventa una fonte inesauribile di gioia, crescita spirituale e testimonianza al mondo.

Ricordate le parole di 1 Corinzi 13:4-7:

> *"L'amore è paziente, è benevolo; l'amore non invidia; l'amore non si vanta, non si gonfia, non si comporta in modo sconveniente, non cerca il proprio interesse, non s'inasprisce, non addebita il male, non gode dell'ingiustizia, ma gioisce con la verità; soffre ogni cosa, crede ogni cosa, spera ogni cosa, sopporta ogni cosa."*

Che il Signore benedica ogni matrimonio cristiano e lo renda una testimonianza potente dell'amore di Cristo nel mondo!
    `
  },
  'la-croce-di-cristo': {
    title: 'La Croce di Cristo: Il Cuore del Vangelo',
    author: 'Lorenzo Piol',
    date: '2025-11-28',
    category: 'teologia',
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=80',
    readTime: '10 min',
    content: `
## Il Significato Centrale della Croce

La croce di Cristo non è semplicemente un simbolo religioso o un ornamento da appendere al collo. È il fulcro della storia della redenzione, il punto in cui la giustizia e la misericordia di Dio si incontrano in modo perfetto e definitivo.

L'apostolo Paolo scrive con chiarezza cristallina:

> *"Io ritenni infatti di non sapere altro fra voi, fuorché Gesù Cristo e lui crocifisso"* (1 Corinzi 2:2)

Per Paolo, la croce era tutto. Era il messaggio centrale che doveva essere predicato, compreso e abbracciato da ogni credente.

## La Necessità della Croce

### Il Problema del Peccato

Prima di comprendere la soluzione, dobbiamo capire il problema. La Bibbia è chiara:

*"Tutti hanno peccato e sono privi della gloria di Dio"* (Romani 3:23)

Il peccato non è solo un errore o una debolezza umana - è una ribellione attiva contro un Dio santo. E la conseguenza è mortale: *"Il salario del peccato è la morte"* (Romani 6:23).

### La Giustizia di Dio

Dio è perfettamente giusto e non può semplicemente ignorare il peccato. La Sua santità richiede che il peccato sia punito. Ma Dio è anche amore perfetto e desidera la salvezza dell'umanità.

Come può Dio essere allo stesso tempo giusto e misericordioso? La risposta si trova nella croce.

## Il Sacrificio Sostitutivo

### Cristo Porta il Nostro Peccato

Sulla croce, accade qualcosa di straordinario e misterioso: Gesù Cristo, il Figlio di Dio senza peccato, prende su di sé i peccati del mondo intero.

> *"Colui che non ha conosciuto peccato, egli lo ha fatto diventare peccato per noi, affinché noi diventassimo giustizia di Dio in lui"* (2 Corinzi 5:21)

Questo concetto è chiamato "espiazione sostitutiva" - Cristo muore al nostro posto, subendo la punizione che noi meritavamo.

### La Grande Sostituzione

Isaia 53:5-6 profetizza con precisione incredibile:

> *"Ma egli è stato trafitto a causa delle nostre trasgressioni, stroncato a causa delle nostre iniquità; il castigo, per cui abbiamo pace, è caduto su di lui e mediante le sue lividure noi siamo stati guariti. Noi tutti eravamo smarriti come pecore, ognuno di noi seguiva la propria via; ma il SIGNORE ha fatto ricadere su di lui l'iniquità di noi tutti."*

## Le Sette Parole dalla Croce

Le ultime parole di Cristo sulla croce rivelano la profondità del Suo sacrificio:

### 1. "Padre, perdona loro, perché non sanno quello che fanno" (Luca 23:34)
Anche nel momento di massima sofferenza, Gesù prega per i Suoi carnefici. Questa è la manifestazione suprema dell'amore divino.

### 2. "Io ti dico in verità, oggi tu sarai con me in paradiso" (Luca 23:43)
La salvezza è offerta gratuitamente al ladrone pentito, dimostrando che non è mai troppo tardi per rivolgersi a Cristo.

### 3. "Donna, ecco tuo figlio... Ecco tua madre" (Giovanni 19:26-27)
Gesù si prende cura di Sua madre, mostrando che anche nella morte Egli mantiene le responsabilità umane.

### 4. "Dio mio, Dio mio, perché mi hai abbandonato?" (Matteo 27:46)
Il momento più buio: Cristo sperimenta la separazione dal Padre mentre porta i nostri peccati. Questo grido rivela l'orrore del peccato e la profondità del sacrificio.

### 5. "Ho sete" (Giovanni 19:28)
L'umanità di Cristo è evidente. Colui che disse "Chi ha sete venga a me e beva" ora soffre la sete fisica e spirituale.

### 6. "È compiuto" (Giovanni 19:30)
Non "è finita" ma "è compiuto" - l'opera di redenzione è completa. Il debito è pagato per intero.

### 7. "Padre, nelle tue mani rimetto il mio spirito" (Luca 23:46)
Con fiducia totale, Cristo consegna la Sua vita al Padre, completando volontariamente il sacrificio.

## La Vittoria sulla Croce

### Sconfitta di Satana

Colossesi 2:15 proclama:

> *"Ha spogliato i principati e le potenze, ne ha fatto un pubblico spettacolo, trionfando su di loro per mezzo della croce."*

Ciò che sembrava una sconfitta era in realtà la più grande vittoria della storia. Satana pensava di aver vinto, ma Cristo stava per risorgere, distruggendo il potere della morte.

### Riconciliazione con Dio

*"Dio ha riconciliato con sé il mondo in Cristo, non imputando agli uomini le loro colpe"* (2 Corinzi 5:19)

La croce abbatte il muro di separazione tra Dio e l'umanità. Ora possiamo avvicinarci con fiducia al trono della grazia.

## Implicazioni Pratiche per la Nostra Vita

### 1. Umiltà Profonda
Se Cristo, il Figlio di Dio, si è umiliato fino alla morte sulla croce, quanto più dovremmo noi vivere in umiltà?

### 2. Amore Sacrificale
*"Da questo abbiamo conosciuto l'amore: egli ha dato la sua vita per noi; anche noi dobbiamo dare la nostra vita per i fratelli"* (1 Giovanni 3:16)

### 3. Perdono Liberatore
Se Cristo ci ha perdonato così tanto, come possiamo noi rifiutare di perdonare gli altri?

### 4. Certezza della Salvezza
La croce ci dà una certezza incrollabile: "Chi accuserà gli eletti di Dio? Dio è colui che li giustifica" (Romani 8:33)

### 5. Motivazione per la Santità
*"Quelli che sono di Cristo hanno crocifisso la carne con le sue passioni e i suoi desideri"* (Galati 5:24)

## Conclusione

La croce di Cristo è lo scandalo e la follia per il mondo, ma per noi che siamo salvati è la potenza di Dio (1 Corinzi 1:18). Non vergogniamoci mai della croce, ma proclamiamola con coraggio e viviamola quotidianamente.

Come cantava l'inno antico:

*"Presso la croce io starò, là dove scorre il rio,
Rio d'acqua della vita, che sgorga ai piedi suoi.
La croce, la croce, la mia gloria sia sempre,
Finché dall'alma sia tolto ogni vel."*

Che possiamo dire con Paolo:

> *"Quanto a me, non sia mai che io mi vanti di altro che della croce del nostro Signore Gesù Cristo, mediante la quale il mondo, per me, è stato crocifisso e io per il mondo."* (Galati 6:14)
    `
  },
  'gioia-in-cristo': {
    title: 'La Gioia in Cristo: Una Scelta Quotidiana',
    author: 'Josiah Catchpole',
    date: '2025-11-25',
    category: 'riflessioni',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&q=80',
    readTime: '6 min',
    content: `
## La Differenza tra Gioia e Felicità

Viviamo in un mondo ossessionato dalla ricerca della felicità. Ovunque guardiamo - pubblicità, social media, cultura popolare - ci viene venduta la promessa di felicità attraverso prodotti, esperienze o relazioni.

Ma la gioia cristiana è qualcosa di radicalmente diverso dalla felicità temporanea che il mondo offre.

### La Felicità del Mondo
- Dipende dalle circostanze esterne
- È temporanea e fugace
- Si basa su ciò che possediamo o sperimentiamo
- Svanisce quando le cose vanno male

### La Gioia in Cristo
- È indipendente dalle circostanze
- È profonda e duratura
- Si basa sulla nostra relazione con Dio
- Può coesistere con il dolore e la sofferenza

## La Fonte della Vera Gioia

La Bibbia identifica chiaramente la fonte della vera gioia:

> *"Voi mi avete messo in cuore più gioia di quella che essi provano quando il loro grano e il loro mosto abbondano."* (Salmo 4:7)

La gioia non si trova nelle cose materiali, ma in Dio stesso. Gesù disse ai Suoi discepoli:

> *"Vi ho detto queste cose, affinché la mia gioia dimori in voi e la vostra gioia sia completa."* (Giovanni 15:11)

Nota che Gesù parla della "mia gioia" - la Sua gioia che diventa la nostra. Questa è una gioia soprannaturale che deriva dalla nostra unione con Cristo.

## Esempi Biblici di Gioia nelle Prove

### Paolo e Sila in Prigione

In Atti 16, troviamo Paolo e Sila ingiustamente imprigionati, con i piedi nei ceppi dopo essere stati brutalmente picchiati. La loro risposta?

*"Verso la mezzanotte Paolo e Sila, pregando, cantavano inni a Dio; e i carcerati li ascoltavano."* (Atti 16:25)

Non stavano fingendo di essere felici - stavano sperimentando la gioia soprannaturale di Cristo anche in mezzo alla sofferenza estrema.

### La Chiesa Perseguitata

In Atti 5:41, dopo essere stati flagellati per aver predicato il Vangelo, gli apostoli *"se ne andarono via dal sinedrio, rallegrandosi di essere stati ritenuti degni di essere oltraggiati per il nome di Gesù."*

Questa non è masochismo - è gioia autentica nella consapevolezza di partecipare alle sofferenze di Cristo.

## Come Coltivare la Gioia Cristiana

### 1. Rimani Connesso alla Vite

Gesù disse: *"Io sono la vite, voi siete i tralci. Colui che rimane in me e nel quale io rimango, porta molto frutto; perché senza di me non potete fare nulla."* (Giovanni 15:5)

La gioia è un frutto dello Spirito Santo (Galati 5:22). Non possiamo produrla da soli - fluisce naturalmente quando rimaniamo connessi a Cristo attraverso:
- Preghiera quotidiana
- Studio della Parola
- Comunione con altri credenti
- Obbedienza ai Suoi comandamenti

### 2. Scegli la Gratitudine

Paolo scrive: *"Siate sempre gioiosi; non cessate mai di pregare; in ogni cosa rendete grazie, perché questa è la volontà di Dio in Cristo Gesù verso di voi."* (1 Tessalonicesi 5:16-18)

La gratitudine è una scelta deliberata. Anche quando le circostanze sono difficili, possiamo sempre trovare motivi per ringraziare Dio:
- La Sua fedeltà costante
- La salvezza in Cristo
- Le promesse della Sua Parola
- La speranza del cielo
- Le benedizioni quotidiane (anche le più piccole)

### 3. Metti in Prospettiva le Difficoltà

Paolo, che ha sofferto enormemente per Cristo, scrive:

> *"Infatti io ritengo che le sofferenze del tempo presente non siano paragonabili alla gloria che dev'essere manifestata a nostro riguardo."* (Romani 8:18)

Quando guardiamo le nostre prove attraverso la lente dell'eternità, esse assumono una prospettiva completamente diversa. Giacomo ci esorta:

*"Fratelli miei, considerate una grande gioia quando venite a trovarvi in prove svariate"* (Giacomo 1:2)

Non perché le prove siano piacevoli, ma perché producono crescita spirituale e carattere.

### 4. Servi gli Altri

Gesù disse: *"Vi è più gioia nel dare che nel ricevere"* (Atti 20:35)

Paradossalmente, troviamo gioia quando smettiamo di concentrarci su noi stessi e iniziamo a servire gli altri. Quando alleviate il dolore di qualcun altro, la vostra gioia aumenta.

### 5. Medita sulle Promesse di Dio

Nehemia 8:10 proclama: *"La gioia del SIGNORE è la vostra forza."*

Quando meditiamo sulle promesse di Dio - la Sua presenza costante, la Sua provvidenza, la Sua protezione, il Suo amore incondizionato - la gioia riempie i nostri cuori anche nelle circostanze più buie.

## Ostacoli alla Gioia

### Il Peccato Non Confessato
Il peccato ruba la nostra gioia. Il Salmo 32:3-4 descrive il tormento di Davide quando nascose il suo peccato. Ma quando confessò, la gioia tornò (Salmo 51:12).

### Il Confronto con gli Altri
Quando ci confrontiamo con gli altri, perdiamo la gioia. Paolo ci avverte che coloro che si misurano tra loro *"sono senza intelligenza"* (2 Corinzi 10:12).

### L'Ansia e la Preoccupazione
Gesù ci comanda: *"Non siate dunque in ansia per il domani"* (Matteo 6:34). La preoccupazione è incompatibile con la gioia.

### La Mancanza di Comunione
Ebrei 10:25 ci esorta a non trascurare le riunioni della chiesa. La comunione con altri credenti alimenta la nostra gioia.

## La Gioia come Testimonianza

In un mondo pieno di disperazione, ansia e depressione, la gioia cristiana autentica è una testimonianza potente. Pietro scrive:

> *"Se siete insultati per il nome di Cristo, beati voi! Perché lo Spirito di gloria, lo Spirito di Dio, riposa su di voi."* (1 Pietro 4:14)

Quando le persone vedono credenti che mantengono la gioia anche nelle difficoltà, si chiedono quale sia la fonte di tale resilienza. Questo apre porte per condividere il Vangelo.

## Conclusione

La gioia in Cristo non è un optional nella vita cristiana - è un comandamento e un frutto naturale della nostra relazione con Dio. Non dobbiamo aspettare che le circostanze siano perfette per essere gioiosi. Possiamo scegliere la gioia oggi, proprio dove siamo, perché la nostra gioia non dipende da ciò che ci circonda ma da Chi abita in noi.

Come scrive il profeta Habacuc in un momento di devastazione nazionale:

> *"Infatti, il fico non fiorirà, non ci sarà più frutto nelle vigne; il prodotto dell'ulivo fallirà, i campi non daranno più cibo, i greggi verranno a mancare negli ovili e non ci saranno più buoi nelle stalle; ma io mi rallegrerò nel SIGNORE, esulterò nel Dio della mia salvezza."* (Habacuc 3:17-18)

Questa è la gioia incrollabile di chi ha il proprio fondamento in Cristo. Che possiamo tutti sperimentare e vivere questa gioia soprannaturale ogni giorno della nostra vita!

*"Rallegratevi sempre nel Signore. Ripeto: rallegratevi!"* (Filippesi 4:4)
    `
  }
};


function ArticleDetail() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const articles = getArticles();
    const found = articles.find(a => a.id === articleId);
    setArticle(found);
  }, [articleId]);

  if (!article) {
    return (
      <div className="article-detail-container">
        <div className="container">
          <div className="not-found">
            <h2>Articolo non trovato</h2>
            <button onClick={() => navigate('/articles')} className="back-button">
              ← Torna agli Articoli
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Leggi questo articolo: ${article.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      email: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copiato negli appunti!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Funzione per generare PDF dell'articolo
  const downloadArticlePDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin;
    
    // Colori
    const primaryColor = [41, 128, 185];
    const accentColor = [243, 156, 18];
    const textColor = [0, 0, 0];
    const lightGray = [236, 240, 241];
    
    // Funzione per verificare spazio e aggiungere nuova pagina
    const checkNewPage = (requiredSpace) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    };
    
    // Intestazione colorata
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, pageWidth, 60, 'F');
    
    // Titolo articolo
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont(undefined, 'bold');
    const titleLines = pdf.splitTextToSize(article.title, maxWidth - 20);
    yPosition = 25;
    titleLines.forEach(line => {
      pdf.text(line, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;
    });
    
    yPosition = 70;
    
    // Box informazioni
    pdf.setFillColor(...lightGray);
    pdf.roundedRect(margin, yPosition, maxWidth, 30, 3, 3, 'F');
    
    yPosition += 10;
    const xOffset = margin + 10;
    
    pdf.setFontSize(10);
    pdf.setTextColor(...textColor);
    
    // Autore
    pdf.setFont(undefined, 'bold');
    pdf.text('Autore:', xOffset, yPosition);
    pdf.setFont(undefined, 'normal');
    pdf.text(article.author, xOffset + 20, yPosition);
    yPosition += 6;
    
    // Data
    pdf.setFont(undefined, 'bold');
    pdf.text('Data:', xOffset, yPosition);
    pdf.setFont(undefined, 'normal');
    pdf.text(formatDate(article.date), xOffset + 20, yPosition);
    yPosition += 6;
    
    // Categoria
    pdf.setFont(undefined, 'bold');
    pdf.text('Categoria:', xOffset, yPosition);
    pdf.setFont(undefined, 'normal');
    pdf.text(article.category, xOffset + 25, yPosition);
    
    yPosition += 20;
    
    // Linea separatrice
    pdf.setDrawColor(...primaryColor);
    pdf.setLineWidth(1);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;
    
    // Contenuto dell'articolo
    pdf.setTextColor(...textColor);
    
    const lines = article.content.split('\n');
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        yPosition += 3;
        return;
      }
      
      // Titoli H2
      if (trimmedLine.startsWith('## ')) {
        checkNewPage(15);
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(...primaryColor);
        const title = trimmedLine.substring(3);
        const titleLines = pdf.splitTextToSize(title, maxWidth);
        titleLines.forEach(line => {
          pdf.text(line, margin, yPosition);
          yPosition += 8;
        });
        pdf.setTextColor(...textColor);
        yPosition += 5;
        return;
      }
      
      // Titoli H3
      if (trimmedLine.startsWith('### ')) {
        checkNewPage(12);
        pdf.setFontSize(12);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(...accentColor);
        const title = trimmedLine.substring(4);
        const titleLines = pdf.splitTextToSize(title, maxWidth);
        titleLines.forEach(line => {
          pdf.text(line, margin, yPosition);
          yPosition += 7;
        });
        pdf.setTextColor(...textColor);
        yPosition += 3;
        return;
      }
      
      // Citazioni
      if (trimmedLine.startsWith('> ')) {
        const quote = trimmedLine.substring(2).replace(/^\*(.+)\*$/, '$1');
        const quoteLines = pdf.splitTextToSize(quote, maxWidth - 20);
        const quoteHeight = 10 + (quoteLines.length * 6);
        
        checkNewPage(quoteHeight);
        
        pdf.setFillColor(245, 247, 250);
        pdf.setDrawColor(...accentColor);
        pdf.setLineWidth(0.5);
        pdf.roundedRect(margin, yPosition, maxWidth, quoteHeight, 3, 3, 'FD');
        
        yPosition += 7;
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'italic');
        quoteLines.forEach(line => {
          pdf.text(line, margin + 10, yPosition);
          yPosition += 6;
        });
        pdf.setFont(undefined, 'normal');
        yPosition += 8;
        return;
      }
      
      // Liste
      if (trimmedLine.startsWith('- ')) {
        checkNewPage(8);
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        const text = trimmedLine.substring(2).replace(/\*\*(.+?)\*\*/g, '$1');
        const textLines = pdf.splitTextToSize(text, maxWidth - 15);
        
        // Bullet point
        pdf.setTextColor(...accentColor);
        pdf.text('•', margin + 5, yPosition);
        pdf.setTextColor(...textColor);
        
        textLines.forEach((line, index) => {
          pdf.text(line, margin + 12, yPosition + (index * 6));
        });
        yPosition += textLines.length * 6 + 2;
        return;
      }
      
      // Paragrafi normali
      if (!trimmedLine.startsWith('#')) {
        checkNewPage(8);
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        const text = trimmedLine.replace(/\*([^*]+)\*/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');
        const textLines = pdf.splitTextToSize(text, maxWidth);
        textLines.forEach(line => {
          checkNewPage(6);
          pdf.text(line, margin, yPosition);
          yPosition += 6;
        });
        yPosition += 2;
      }
    });
    
    // Footer su ogni pagina
    const totalPages = pdf.internal.getNumberOfPages();
    pdf.setTextColor(...accentColor);
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'normal');
    
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      
      pdf.setDrawColor(...lightGray);
      pdf.setLineWidth(0.5);
      pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
      
      pdf.text(
        `${i} / ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }
    
    // Salva PDF
    const filename = `${article.title.substring(0, 30).replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`;
    pdf.save(filename);
  };

  // Converte il markdown in HTML con formattazione
  const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
      // Titoli H2
      if (line.startsWith('## ')) {
        return <h2 key={index}>{line.substring(3)}</h2>;
      }
      // Titoli H3
      if (line.startsWith('### ')) {
        return <h3 key={index}>{line.substring(4)}</h3>;
      }
      // Citazioni
      if (line.startsWith('> ')) {
        const text = line.substring(2);
        const cleanText = text.replace(/^\*(.+)\*$/, '$1'); // Rimuovi asterischi
        return <blockquote key={index}><em>{cleanText}</em></blockquote>;
      }
      // Liste
      if (line.startsWith('- ')) {
        return <li key={index}>{line.substring(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/<strong>(.+?)<\/strong>/g, (_, text) => text)}</li>;
      }
      // Paragrafi normali
      if (line.trim() && !line.startsWith('#')) {
        // Gestisci corsivo e grassetto
        const formatted = line
          .replace(/\*([^*]+)\*/g, '<em>$1</em>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return <p key={index} dangerouslySetInnerHTML={{ __html: formatted }} />;
      }
      // Linee vuote
      return <br key={index} />;
    });
  };

  return (
    <div className="article-detail-container">
      <div className="article-detail-header" style={{ backgroundImage: `url(${article.image})` }}>
        <div className="article-header-overlay"></div>
        <div className="container">
          <button className="back-button" onClick={() => navigate('/articles')}>
            ← Torna agli Articoli
          </button>
          <div className="article-header-content">
            <div className="article-category-badge-large">{article.category}</div>
            <h1 className="article-detail-title">{article.title}</h1>
            <div className="article-meta-large">
              <span className="article-author-large">✍️ {article.author}</span>
              <span className="article-date-large">📅 {formatDate(article.date)}</span>
              <span className="article-time-large">⏱️ {article.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container article-detail-content">
        <div className="article-main">
          <div className="article-body">
            {renderContent(article.content)}
          </div>
        </div>

        <div className="article-sidebar">
          <div className="sidebar-section">
            <h3>Azioni</h3>
            <button className="download-pdf-btn" onClick={downloadArticlePDF}>
              📄 Scarica PDF
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Condividi</h3>
            <div className="share-buttons-vertical">
              <button className="share-btn-vertical" onClick={() => handleShare('facebook')}>📘 Facebook</button>
              <button className="share-btn-vertical" onClick={() => handleShare('whatsapp')}>💬 WhatsApp</button>
              <button className="share-btn-vertical" onClick={() => handleShare('email')}>📧 Email</button>
              <button className="share-btn-vertical" onClick={() => handleShare('copy')}>🔗 Copia Link</button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Informazioni</h3>
            <div className="info-list-vertical">
              <div className="info-item-vertical">
                <strong>Autore:</strong>
                <span>{article.author}</span>
              </div>
              <div className="info-item-vertical">
                <strong>Categoria:</strong>
                <span>{article.category}</span>
              </div>
              <div className="info-item-vertical">
                <strong>Data:</strong>
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="info-item-vertical">
                <strong>Tempo di lettura:</strong>
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
