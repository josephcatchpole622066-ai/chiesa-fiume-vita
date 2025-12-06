// Script per scaricare tutte le trascrizioni dei video YouTube
import { YoutubeTranscript } from "youtube-transcript";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);
const CHANNEL_ID = "UCGdxHNQjIRAQJ66S5bCRJlg";
const API_KEY = "AIzaSyDxL-zPcTV4WyrbejEZ2iNXMORWbSbwySI";
const OUTPUT_DIR = "./public/transcripts";
const TEMP_DIR = "./temp";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Crea le directory se non esistono
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Funzione per filtrare le prediche (stessi filtri del codice principale)
function filterSermons(videos) {
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
    const titleLower = video.title.toLowerCase();

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

// Funzione per escludere shorts
function excludeShorts(videos) {
  return videos.filter((video) => {
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
}

// Funzione per ottenere tutti i video del canale
async function getAllVideos() {
  console.log("📥 Caricamento video dal canale...");

  // Ottieni la playlist degli upload
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`;
  const channelResponse = await fetch(channelUrl);
  const channelData = await channelResponse.json();

  const uploadsPlaylistId =
    channelData.items[0].contentDetails.relatedPlaylists.uploads;

  // Ottieni tutti i video
  let allVideos = [];
  let nextPageToken = "";

  do {
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&pageToken=${nextPageToken}&key=${API_KEY}`;
    const response = await fetch(playlistUrl);
    const data = await response.json();

    if (data.items) {
      allVideos = allVideos.concat(
        data.items.map((item) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          duration: item.contentDetails?.duration || "PT0S",
        }))
      );
    }

    nextPageToken = data.nextPageToken || "";
  } while (nextPageToken);

  console.log(`✅ Trovati ${allVideos.length} video`);

  // Ottieni dettagli completi per calcolare durata
  const videoIds = allVideos.map((v) => v.id);
  const batchSize = 50;
  const allVideoDetails = [];

  for (let i = 0; i < videoIds.length; i += batchSize) {
    const batchIds = videoIds.slice(i, i + batchSize).join(",");
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${batchIds}&key=${API_KEY}`;

    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();

    if (videosData.items) {
      videosData.items.forEach((detail) => {
        const video = allVideos.find((v) => v.id === detail.id);
        if (video) {
          video.duration = detail.contentDetails.duration;
        }
      });
    }
  }

  // Applica filtri
  const withoutShorts = excludeShorts(allVideos);
  const sermons = filterSermons(withoutShorts);

  return sermons;
}

// Funzione per scaricare l'audio di un video YouTube
async function downloadAudio(videoId) {
  console.log(`    📥 Download audio...`);
  const outputPath = path.join(TEMP_DIR, `${videoId}.mp3`);

  // Usa yt-dlp per scaricare l'audio
  const command = `yt-dlp -x --audio-format mp3 --audio-quality 0 -o "${outputPath}" "https://www.youtube.com/watch?v=${videoId}"`;

  try {
    await execPromise(command);
    console.log(`    ✅ Audio scaricato`);
    return outputPath;
  } catch (error) {
    console.error(`    ❌ Errore download: ${error.message}`);
    return null;
  }
}

// Funzione per trascrivere audio con Whisper API
async function transcribeWithWhisper(audioPath, videoId) {
  console.log(`    🎤 Trascrizione con Whisper API...`);

  if (!OPENAI_API_KEY) {
    console.error("    ❌ OPENAI_API_KEY non configurata!");
    return null;
  }

  try {
    const FormData = (await import("form-data")).default;
    const formData = new FormData();

    formData.append("file", fs.createReadStream(audioPath));
    formData.append("model", "whisper-1");
    formData.append("language", "it");
    formData.append("response_format", "text");

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${response.statusText} - ${error}`);
    }

    const result = await response.text();
    console.log(`    ✅ Trascrizione completata`);
    return result;
  } catch (error) {
    console.error(`    ❌ Errore trascrizione: ${error.message}`);
    return null;
  }
}

// Funzione per formattare la trascrizione in paragrafi
function formatTranscription(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const paragraphs = [];

  for (let i = 0; i < sentences.length; i += 5) {
    const paragraph = sentences
      .slice(i, i + 5)
      .join(" ")
      .trim();
    if (paragraph) paragraphs.push(paragraph);
  }

  return {
    text: paragraphs.join("\n\n"),
    paragraphs,
    charactersCount: text.length,
  };
}

// Funzione per scaricare la trascrizione di un video
async function downloadTranscript(videoId, title) {
  try {
    console.log(`  📝 ${title}...`);

    // Prova con diverse lingue
    let transcript;
    let autoGenerated = false;

    try {
      transcript = await YoutubeTranscript.fetchTranscript(videoId, {
        lang: "it",
      });
    } catch (e1) {
      try {
        transcript = await YoutubeTranscript.fetchTranscript(videoId, {
          lang: "en",
        });
      } catch (e2) {
        try {
          transcript = await YoutubeTranscript.fetchTranscript(videoId);
        } catch (e3) {
          // Nessuna trascrizione disponibile - prova a generarla con Whisper
          console.log(
            `    ⚠️  Nessuna trascrizione disponibile - tento generazione con Whisper...`
          );

          if (!OPENAI_API_KEY) {
            console.log(
              `    ⚠️  OPENAI_API_KEY non configurata - creo placeholder`
            );
            const transcriptData = {
              videoId,
              title,
              available: false,
              language: null,
              text: null,
              paragraphs: [],
              note: "Trascrizione non disponibile su YouTube. Configura OPENAI_API_KEY per generarla automaticamente.",
              videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
              generatedAt: new Date().toISOString(),
            };

            const filePath = path.join(OUTPUT_DIR, `${videoId}.json`);
            fs.writeFileSync(filePath, JSON.stringify(transcriptData, null, 2));
            return transcriptData;
          }

          // Scarica audio
          const audioPath = await downloadAudio(videoId);
          if (!audioPath) {
            const transcriptData = {
              videoId,
              title,
              available: false,
              language: null,
              text: null,
              paragraphs: [],
              note: "Errore nel download audio. Riprova più tardi.",
              videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
              generatedAt: new Date().toISOString(),
            };

            const filePath = path.join(OUTPUT_DIR, `${videoId}.json`);
            fs.writeFileSync(filePath, JSON.stringify(transcriptData, null, 2));
            return transcriptData;
          }

          // Trascrivi con Whisper
          const transcription = await transcribeWithWhisper(audioPath, videoId);

          // Pulisci file temporaneo
          try {
            fs.unlinkSync(audioPath);
          } catch (e) {
            console.log(`    ⚠️  Impossibile eliminare file temporaneo`);
          }

          if (!transcription) {
            const transcriptData = {
              videoId,
              title,
              available: false,
              language: null,
              text: null,
              paragraphs: [],
              note: "Errore nella generazione trascrizione con Whisper.",
              videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
              generatedAt: new Date().toISOString(),
            };

            const filePath = path.join(OUTPUT_DIR, `${videoId}.json`);
            fs.writeFileSync(filePath, JSON.stringify(transcriptData, null, 2));
            return transcriptData;
          }

          // Formatta trascrizione generata
          const formatted = formatTranscription(transcription);
          const whisperTranscriptData = {
            videoId,
            title,
            available: true,
            language: "it",
            text: formatted.text,
            paragraphs: formatted.paragraphs,
            charactersCount: formatted.charactersCount,
            videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
            generatedAt: new Date().toISOString(),
            method: "whisper-api",
          };

          const filePath = path.join(OUTPUT_DIR, `${videoId}.json`);
          fs.writeFileSync(
            filePath,
            JSON.stringify(whisperTranscriptData, null, 2)
          );

          console.log(
            `    ✅ Trascrizione generata con Whisper (${formatted.paragraphs.length} paragrafi)`
          );
          return whisperTranscriptData;
        }
      }
    }

    if (!transcript || transcript.length === 0) {
      console.log(`    ⚠️  Nessuna trascrizione - creo placeholder`);
      const transcriptData = {
        videoId,
        title,
        available: false,
        language: null,
        text: null,
        paragraphs: [],
        note: "Trascrizione non disponibile",
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        generatedAt: new Date().toISOString(),
      };

      const filePath = path.join(OUTPUT_DIR, `${videoId}.json`);
      fs.writeFileSync(filePath, JSON.stringify(transcriptData, null, 2));
      return transcriptData;
    }

    // Formatta la trascrizione
    const fullText = transcript
      .map((item) => item.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
    const paragraphs = [];

    for (let i = 0; i < sentences.length; i += 5) {
      const paragraph = sentences
        .slice(i, i + 5)
        .join(" ")
        .trim();
      if (paragraph) paragraphs.push(paragraph);
    }

    const transcriptData = {
      videoId,
      title,
      available: true,
      language: "it",
      text: paragraphs.join("\n\n"),
      paragraphs,
      segmentsCount: transcript.length,
      charactersCount: fullText.length,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      generatedAt: new Date().toISOString(),
      method: "youtube-auto",
    };

    // Salva in un file JSON
    const filePath = path.join(OUTPUT_DIR, `${videoId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(transcriptData, null, 2));

    console.log(
      `    ✅ Salvata (${paragraphs.length} paragrafi, ${fullText.length} caratteri)`
    );
    return transcriptData;
  } catch (error) {
    console.log(`    ❌ Errore: ${error.message} - creo placeholder`);

    // Anche in caso di errore, crea un placeholder
    const transcriptData = {
      videoId,
      title,
      available: false,
      language: null,
      text: null,
      paragraphs: [],
      error: error.message,
      note: "Errore nel recupero trascrizione. Può essere aggiunta manualmente.",
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      generatedAt: new Date().toISOString(),
    };

    const filePath = path.join(OUTPUT_DIR, `${videoId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(transcriptData, null, 2));

    return transcriptData;
  }
}

// Funzione principale
async function main() {
  console.log("🚀 Avvio download trascrizioni...\n");

  const videos = await getAllVideos();

  // SOLO PRIMO VIDEO PER TEST
  const videosToProcess = videos.slice(0, 1);
  console.log(`\n⚠️  MODALITÀ TEST: Elaboro solo il primo video\n`);

  let successCount = 0;
  let failCount = 0;
  let placeholderCount = 0;

  for (let i = 0; i < videosToProcess.length; i++) {
    const video = videosToProcess[i];
    console.log(`[${i + 1}/${videosToProcess.length}] ${video.id}`);

    const result = await downloadTranscript(video.id, video.title);

    if (result) {
      if (result.available) {
        successCount++;
      } else {
        placeholderCount++;
      }
    } else {
      failCount++;
    }

    // Pausa per evitare rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\n📊 Riepilogo:");
  console.log(`  ✅ Trascrizioni scaricate: ${successCount}`);
  console.log(
    `  📄 Placeholder creati (da completare manualmente): ${placeholderCount}`
  );
  console.log(`  ❌ Errori: ${failCount}`);
  console.log(`  📁 Salvate in: ${OUTPUT_DIR}`);

  // Crea un file indice
  const indexPath = path.join(OUTPUT_DIR, "index.json");
  const allFiles = fs
    .readdirSync(OUTPUT_DIR)
    .filter((file) => file.endsWith(".json") && file !== "index.json");

  const transcriptsInfo = allFiles.map((file) => {
    const data = JSON.parse(
      fs.readFileSync(path.join(OUTPUT_DIR, file), "utf-8")
    );
    return {
      videoId: data.videoId,
      title: data.title,
      available: data.available,
      hasText: !!data.text,
    };
  });

  const availableCount = transcriptsInfo.filter((t) => t.available).length;
  const placeholderCountFinal = transcriptsInfo.filter(
    (t) => !t.available
  ).length;

  fs.writeFileSync(
    indexPath,
    JSON.stringify(
      {
        total: transcriptsInfo.length,
        available: availableCount,
        placeholders: placeholderCountFinal,
        transcripts: transcriptsInfo,
        lastUpdated: new Date().toISOString(),
      },
      null,
      2
    )
  );

  console.log(`\n✅ Processo completato!`);
  console.log(`\n💡 Per i video senza trascrizione automatica, puoi:`);
  console.log(`   1. Abilitare le trascrizioni automatiche su YouTube`);
  console.log(
    `   2. Usare servizi come Whisper API per generare trascrizioni dall'audio`
  );
  console.log(
    `   3. Aggiungere manualmente le trascrizioni nei file JSON creati`
  );
}

main().catch(console.error);
