// ISTRUZIONI:
// 1. Apri l'album su Google Photos nel browser
// 2. Apri la console del browser (F12 → Console)
// 3. Incolla tutto questo codice e premi Invio
// 4. Aspetta che carichi tutte le foto (scorri verso il basso)
// 5. Lo script creerà un file con tutti gli URL

(async function extractGooglePhotos() {
  console.log('🚀 Inizio estrazione foto da Google Photos...');
  
  // Scroll automatico per caricare tutte le foto
  console.log('📜 Scroll automatico per caricare tutte le immagini...');
  let lastHeight = 0;
  let currentHeight = document.body.scrollHeight;
  let scrollAttempts = 0;
  
  while (lastHeight !== currentHeight && scrollAttempts < 50) {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(resolve => setTimeout(resolve, 1000));
    lastHeight = currentHeight;
    currentHeight = document.body.scrollHeight;
    scrollAttempts++;
    console.log(`Scroll ${scrollAttempts}/50...`);
  }
  
  console.log('✅ Caricamento completato!');
  
  // Estrai tutte le immagini
  const images = [];
  const imgElements = document.querySelectorAll('img');
  
  imgElements.forEach((img, index) => {
    let src = img.src || img.dataset.src;
    
    // Filtra solo le immagini di Google Photos (non icone, avatar, ecc.)
    if (src && src.includes('googleusercontent.com') && !src.includes('=s32')) {
      // Ottieni URL ad alta risoluzione (=w2400)
      const highResSrc = src.split('=')[0] + '=w2400';
      images.push({
        index: index,
        url: highResSrc,
        alt: img.alt || `Foto ${images.length + 1}`
      });
    }
  });
  
  console.log(`📸 Trovate ${images.length} foto!`);
  
  // Crea un file JSON
  const jsonData = {
    album: "Chiesa Pozzuoli - Gallery",
    totalPhotos: images.length,
    extractedDate: new Date().toISOString(),
    photos: images.map((img, i) => ({
      id: i + 1,
      url: img.url,
      alt: `Chiesa Pozzuoli - Foto ${i + 1}`,
      category: "gallery"
    }))
  };
  
  // Download del JSON
  const dataStr = JSON.stringify(jsonData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'google-photos-urls.json';
  link.click();
  
  console.log('✅ File scaricato! Controlla la cartella Download');
  console.log('📋 Anteprima prima foto:', jsonData.photos[0]);
  
  return jsonData;
})();
