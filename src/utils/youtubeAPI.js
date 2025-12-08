// Channel ID per @fiumedivita1997
const CHANNEL_ID = "UCGdxHNQjIRAQJ66S5bCRJlg";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Cache globale per i video
let cachedVideos = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minuti

// Funzione per ottenere i video dalla cache
export function getCachedVideos() {
  const now = Date.now();
  if (cachedVideos && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
    return cachedVideos;
  }
  return null;
}

// Funzione per impostare i video nella cache
export function setCachedVideos(videos) {
  cachedVideos = videos;
  cacheTimestamp = Date.now();
}

// Funzione per estrarre il nome del predicatore dal titolo
function extractPreacherName(title) {
  const titleLower = title.toLowerCase();

  const preachers = [
    { search: "stefano bonavolta", name: "Stefano Bonavolta" },
    { search: "josiah catchpole", name: "Josiah Catchpole" },
    { search: "alec catchpole", name: "Alec Catchpole" },
    { search: "lorenzo piol", name: "Lorenzo Piol" },
    { search: "bonavolta", name: "Stefano Bonavolta" },
    { search: "catchpole", name: "Catchpole" },
    { search: "piol", name: "Lorenzo Piol" },
  ];

  for (const preacher of preachers) {
    if (titleLower.includes(preacher.search)) {
      return preacher.name;
    }
  }

  return "Chiesa Fiume di Vita";
}

// Funzione per estrarre il brano biblico dal titolo
function extractScripture(title) {
  const scripturePatterns = [
    /\b(\d\s+[A-Za-z�-�]+)\s+(\d+)(?::(\d+))?(?:-(\d+))?(?::(\d+))?\b/gi,
    /\b([A-Za-z�-�]+)\s+(\d+)(?::(\d+))?(?:-(\d+))?(?::(\d+))?\b/gi,
  ];

  const knownBooks = [
    "genesi",
    "esodo",
    "levitico",
    "numeri",
    "deuteronomio",
    "giosu�",
    "giudici",
    "rut",
    "samuele",
    "re",
    "cronache",
    "esdra",
    "neemia",
    "ester",
    "giobbe",
    "salmi",
    "proverbi",
    "ecclesiaste",
    "cantico",
    "isaia",
    "geremia",
    "lamentazioni",
    "ezechiele",
    "daniele",
    "osea",
    "gioele",
    "amos",
    "abdia",
    "giona",
    "michea",
    "naum",
    "abacuc",
    "sofonia",
    "aggeo",
    "zaccaria",
    "malachia",
    "matteo",
    "marco",
    "luca",
    "giovanni",
    "atti",
    "romani",
    "corinzi",
    "galati",
    "efesini",
    "filippesi",
    "colossesi",
    "tessalonicesi",
    "timoteo",
    "tito",
    "filemone",
    "ebrei",
    "giacomo",
    "pietro",
    "apocalisse",
  ];

  for (const pattern of scripturePatterns) {
    const matches = [...title.matchAll(pattern)];
    for (const match of matches) {
      const bookName = match[1].toLowerCase().trim();
      if (knownBooks.some((book) => bookName.includes(book))) {
        return match[0];
      }
    }
  }

  return null;
}

// Funzione per pulire il titolo rimuovendo predicatore e brano
function cleanTitle(title, preacherName, scripture) {
  let cleanedTitle = title;

  if (preacherName && preacherName !== "Chiesa Fiume di Vita") {
    const preacherRegex = new RegExp(preacherName, "gi");
    cleanedTitle = cleanedTitle.replace(preacherRegex, "").trim();
  }

  if (scripture) {
    const scriptureRegex = new RegExp(
      scripture.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "gi"
    );
    cleanedTitle = cleanedTitle.replace(scriptureRegex, "").trim();
  }

  cleanedTitle = cleanedTitle.replace(/^[\s\-|:]+|[\s\-|:]+$/g, "").trim();
  cleanedTitle = cleanedTitle.replace(/\s{2,}/g, " ").trim();

  return cleanedTitle || title;
}

// Funzione per ottenere tutti i video del canale usando YouTube Data API v3
export async function fetchAllYouTubeVideos(channelId = CHANNEL_ID) {
  if (!API_KEY) {
    console.error("API Key YouTube non configurata!");
    return [];
  }

  try {
    console.log("Caricamento video da YouTube Data API v3...");

    // Step 1: Ottieni l'\''uploads playlist ID
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`;
    const channelResponse = await fetch(channelUrl);
    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error("Canale non trovato");
    }

    const uploadsPlaylistId =
      channelData.items[0].contentDetails.relatedPlaylists.uploads;
    console.log("Uploads playlist ID:", uploadsPlaylistId);

    // Step 2: Ottieni tutti i video dalla playlist con paginazione
    let allVideos = [];
    let nextPageToken = "";
    let pageCount = 0;

    do {
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&pageToken=${nextPageToken}&key=${API_KEY}`;
      const playlistResponse = await fetch(playlistUrl);
      const playlistData = await playlistResponse.json();

      if (playlistData.items) {
        allVideos = allVideos.concat(playlistData.items);
        pageCount++;
        console.log(
          `Pagina ${pageCount}: ${playlistData.items.length} video caricati (totale: ${allVideos.length})`
        );
      }

      nextPageToken = playlistData.nextPageToken || "";
    } while (nextPageToken);

    console.log(`Totale video trovati: ${allVideos.length}`);

    // Step 3: Ottieni dettagli e statistiche per tutti i video in batch
    // L'API ha un limite di 50 video per richiesta
    const videoIds = allVideos.map((item) => item.contentDetails.videoId);
    const batchSize = 50;
    const allVideoDetails = [];

    for (let i = 0; i < videoIds.length; i += batchSize) {
      const batchIds = videoIds.slice(i, i + batchSize).join(",");
      const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${batchIds}&key=${API_KEY}`;

      try {
        const videosResponse = await fetch(videosUrl);
        const videosData = await videosResponse.json();

        if (videosData.items) {
          allVideoDetails.push(...videosData.items);
          console.log(
            `Caricati dettagli per ${videosData.items.length} video (batch ${
              Math.floor(i / batchSize) + 1
            })`
          );
        }
      } catch (error) {
        console.error(
          `Errore nel batch ${Math.floor(i / batchSize) + 1}:`,
          error
        );
      }
    }

    console.log(`Dettagli caricati per ${allVideoDetails.length} video totali`);

    // Step 4: Ottieni info sulle playlist per ogni video
    const videoPlaylistMap = await getVideoPlaylists(channelId);

    // Step 5: Processa i video e filtra shorts
    const processedVideos = allVideoDetails
      .map((video) => {
        const originalTitle = video.snippet.title;
        const preacher = extractPreacherName(originalTitle);
        const scripture = extractScripture(originalTitle);
        const cleanedTitle = cleanTitle(originalTitle, preacher, scripture);
        const playlistInfo = videoPlaylistMap.get(video.id);

        return {
          id: video.id,
          title: cleanedTitle,
          originalTitle: originalTitle,
          scripture: scripture,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          embedUrl: `https://www.youtube.com/embed/${video.id}`,
          publishedAt: video.snippet.publishedAt,
          thumbnail:
            video.snippet.thumbnails.high?.url ||
            video.snippet.thumbnails.default.url,
          views: parseInt(video.statistics.viewCount) || 0,
          preacher: preacher,
          duration: video.contentDetails.duration,
          playlist: playlistInfo?.title || null,
          playlistId: playlistInfo?.id || null,
        };
      })
      .filter((video) => {
        // Escludi shorts (video con durata < 60 secondi)
        const duration = video.duration;
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (match) {
          const hours = parseInt(match[1] || 0);
          const minutes = parseInt(match[2] || 0);
          const seconds = parseInt(match[3] || 0);
          const totalSeconds = hours * 3600 + minutes * 60 + seconds;
          return totalSeconds >= 60; // Escludi video sotto 60 secondi
        }
        return true;
      });

    console.log(`Processati ${processedVideos.length} video (shorts esclusi)`);

    // Salva nella cache globale
    setCachedVideos(processedVideos);

    return processedVideos;
  } catch (error) {
    console.error("Errore nel caricamento dei video YouTube:", error);
    return [];
  }
}

// Funzione per ottenere le playlist associate ai video
async function getVideoPlaylists(channelId) {
  const videoPlaylistMap = new Map();

  try {
    // Ottieni tutte le playlist del canale
    let nextPageToken = "";
    let allPlaylists = [];

    do {
      const playlistsUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=50&pageToken=${nextPageToken}&key=${API_KEY}`;
      const response = await fetch(playlistsUrl);
      const data = await response.json();

      if (data.items) {
        allPlaylists = allPlaylists.concat(data.items);
      }

      nextPageToken = data.nextPageToken || "";
    } while (nextPageToken);

    console.log(`Trovate ${allPlaylists.length} playlist`);

    // Per ogni playlist, ottieni i video
    for (const playlist of allPlaylists) {
      let playlistNextPageToken = "";

      do {
        const playlistItemsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlist.id}&maxResults=50&pageToken=${playlistNextPageToken}&key=${API_KEY}`;
        const response = await fetch(playlistItemsUrl);
        const data = await response.json();

        if (data.items) {
          data.items.forEach((item) => {
            const videoId = item.contentDetails.videoId;
            const playlistTitle = playlist.snippet.title.toLowerCase();

            // Definisci priorità: playlist specifiche hanno priorità su quelle generiche
            const isGenericPlaylist =
              playlistTitle.includes("uploads") ||
              playlistTitle.includes("tutti") ||
              playlistTitle.includes("all");

            const existingPlaylist = videoPlaylistMap.get(videoId);

            // Salva la playlist se:
            // 1. Il video non ha ancora una playlist associata, OPPURE
            // 2. La playlist esistente è generica e questa è specifica
            if (
              !existingPlaylist ||
              (existingPlaylist.title.toLowerCase().includes("uploads") &&
                !isGenericPlaylist)
            ) {
              videoPlaylistMap.set(videoId, {
                id: playlist.id,
                title: playlist.snippet.title,
              });
            }
          });
        }

        playlistNextPageToken = data.nextPageToken || "";
      } while (playlistNextPageToken);
    }

    console.log(`Mappati ${videoPlaylistMap.size} video alle playlist`);
  } catch (error) {
    console.error("Errore nel caricamento delle playlist:", error);
  }

  return videoPlaylistMap;
}

// Funzione per ottenere la trascrizione di un video dai file statici
export async function fetchTranscript(videoId) {
  try {
    console.log(`Caricamento trascrizione per video ${videoId}...`);

    // Prova a caricare il file JSON statico
    const response = await fetch(`/transcripts/${videoId}.json`);

    if (!response.ok) {
      console.log(`Trascrizione non disponibile per video ${videoId}`);
      return {
        available: false,
        language: null,
        text: null,
        error: "Trascrizione non disponibile",
      };
    }

    const data = await response.json();
    console.log(
      `Trascrizione caricata per video ${videoId}: ${
        data.paragraphs?.length || 0
      } paragrafi`
    );

    return {
      available: data.available,
      language: data.language,
      text: data.text,
      paragraphs: data.paragraphs,
      charactersCount: data.charactersCount,
    };
  } catch (error) {
    console.error(
      `Errore nel caricamento trascrizione per video ${videoId}:`,
      error
    );
    return {
      available: false,
      language: null,
      text: null,
      error: error.message,
    };
  }
}

// Funzione per filtrare predicazioni
export function filterSermons(videos) {
  const sermonKeywords = [
    "predica",
    "omelia",
    "sermone",
    "messaggio",
    "studio",
    "insegnamento",
    "culto",
    "domenica",
    "vangelo",
    "bibbia",
  ];

  const preacherNames = [
    "stefano bonavolta",
    "josiah catchpole",
    "alec catchpole",
    "lorenzo piol",
    "bonavolta",
    "catchpole",
    "piol",
  ];

  const excludeLiveKeywords = ["live", "diretta", "streaming"];

  const filtered = videos.filter((video) => {
    const titleLower = video.originalTitle.toLowerCase();

    const isLive = excludeLiveKeywords.some((keyword) =>
      titleLower.includes(keyword)
    );
    if (isLive) return false;

    const hasSermonKeyword = sermonKeywords.some((keyword) =>
      titleLower.includes(keyword)
    );
    const hasPreacherName = preacherNames.some((name) =>
      titleLower.includes(name)
    );

    return hasSermonKeyword || hasPreacherName;
  });

  console.log(
    `Filtrate ${filtered.length} predicazioni su ${videos.length} video (escluse live)`
  );
  return filtered;
}

// Funzione per escludere canti
export function excludeSongs(videos) {
  const excludeKeywords = [
    "canto",
    "cantico",
    "worship",
    "lode",
    "musica",
    "inno",
  ];

  const filtered = videos.filter((video) => {
    const titleLower = video.title.toLowerCase();
    return !excludeKeywords.some((keyword) => titleLower.includes(keyword));
  });

  console.log(`Dopo esclusione canti: ${filtered.length} video rimanenti`);
  return filtered;
}

// Funzione per filtrare testimonianze
export function filterTestimonials(videos) {
  // Filtra solo video che contengono "nati di nuovo" nel titolo
  const filtered = videos.filter((video) => {
    const titleLower = video.title.toLowerCase();
    return titleLower.includes("nati di nuovo");
  });

  console.log(
    `Filtrate ${filtered.length} testimonianze su ${videos.length} video`
  );
  return filtered;
}

// Mantieni la funzione RSS come fallback
export async function fetchYouTubeVideos(channelId = CHANNEL_ID) {
  // Prova prima con l'\''API completa
  if (API_KEY) {
    return await fetchAllYouTubeVideos(channelId);
  }

  // Fallback su RSS se non c'\''� API key
  console.warn("API Key non disponibile, uso RSS feed (solo ultimi 15 video)");
  return await fetchYouTubeVideosRSS(channelId);
}

async function fetchYouTubeVideosRSS(channelId) {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const proxyUrl = "https://corsproxy.io/?";
    const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));

    if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const entries = xmlDoc.querySelectorAll("entry");
    const videos = [];

    entries.forEach((entry) => {
      const originalTitle = entry.querySelector("title")?.textContent || "";
      const videoId = entry.querySelector("videoId")?.textContent || "";
      const published = entry.querySelector("published")?.textContent || "";
      const thumbnail =
        entry
          .querySelector("media\\:thumbnail, thumbnail")
          ?.getAttribute("url") || "";
      const mediaGroup = entry.querySelector("media\\:group, group");
      const viewCount =
        mediaGroup
          ?.querySelector(
            "media\\:community media\\:statistics, community statistics"
          )
          ?.getAttribute("views") || "0";

      if (videoId && originalTitle) {
        const preacher = extractPreacherName(originalTitle);
        const scripture = extractScripture(originalTitle);
        const cleanedTitle = cleanTitle(originalTitle, preacher, scripture);

        videos.push({
          id: videoId,
          title: cleanedTitle,
          originalTitle: originalTitle,
          scripture: scripture,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          publishedAt: published,
          thumbnail:
            thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          views: parseInt(viewCount) || 0,
          preacher: preacher,
          playlist: null,
          playlistId: null,
        });
      }
    });

    return videos;
  } catch (error) {
    console.error("Errore RSS:", error);
    return [];
  }
}
