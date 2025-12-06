// Script per generare trascrizioni usando OpenAI Whisper API
// Richiede una chiave API OpenAI (https://platform.openai.com/api-keys)
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);
const TRANSCRIPTS_DIR = "./public/transcripts";
const TEMP_DIR = "./temp";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Imposta come variabile d'ambiente

// Crea directory temporanea se non esiste
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Funzione per scaricare l'audio di un video YouTube
async function downloadAudio(videoId) {
  console.log(`  📥 Download audio...`);
  const outputPath = path.join(TEMP_DIR, `${videoId}.mp3`);

  // Richiede yt-dlp installato: pip install yt-dlp
  // O: npm install -g yt-dlp
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
  console.log(`  🎤 Trascrizione con Whisper API...`);

  if (!OPENAI_API_KEY) {
    console.error("    ❌ OPENAI_API_KEY non configurata!");
    return null;
  }

  try {
    const formData = new FormData();
    const audioFile = fs.readFileSync(audioPath);
    const blob = new Blob([audioFile], { type: "audio/mpeg" });

    formData.append("file", blob, `${videoId}.mp3`);
    formData.append("model", "whisper-1");
    formData.append("language", "it");
    formData.append("response_format", "verbose_json");

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`    ✅ Trascrizione completata`);
    return result.text;
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

// Funzione principale per generare trascrizione
async function generateTranscript(videoId, title) {
  console.log(`\n[${videoId}] ${title}`);

  // Scarica audio
  const audioPath = await downloadAudio(videoId);
  if (!audioPath) {
    return null;
  }

  // Trascrivi con Whisper
  const transcription = await transcribeWithWhisper(audioPath, videoId);
  if (!transcription) {
    // Pulisci file temporaneo
    fs.unlinkSync(audioPath);
    return null;
  }

  // Formatta trascrizione
  const formatted = formatTranscription(transcription);

  // Salva trascrizione
  const transcriptData = {
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

  const outputPath = path.join(TRANSCRIPTS_DIR, `${videoId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(transcriptData, null, 2));

  // Pulisci file temporaneo
  fs.unlinkSync(audioPath);

  console.log(
    `  ✅ Trascrizione salvata (${formatted.paragraphs.length} paragrafi)`
  );
  return transcriptData;
}

// Funzione principale
async function main() {
  console.log("🚀 Generazione trascrizioni con Whisper API\n");

  // Leggi l'indice per trovare i placeholder
  const indexPath = path.join(TRANSCRIPTS_DIR, "index.json");
  if (!fs.existsSync(indexPath)) {
    console.error(
      "❌ File index.json non trovato. Esegui prima download-transcripts.mjs"
    );
    return;
  }

  const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  const placeholders = index.transcripts.filter((t) => !t.available);

  if (placeholders.length === 0) {
    console.log("✅ Tutte le trascrizioni sono già disponibili!");
    return;
  }

  console.log(`📝 Trovati ${placeholders.length} video da trascrivere\n`);
  console.log(
    `⚠️  NOTA: Questo processo può richiedere tempo e consumare crediti API OpenAI`
  );
  console.log(
    `⚠️  Costo stimato: ~$${(placeholders.length * 0.006).toFixed(
      2
    )} (basato su media 10 min/video)\n`
  );

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < placeholders.length; i++) {
    const placeholder = placeholders[i];

    const result = await generateTranscript(
      placeholder.videoId,
      placeholder.title
    );

    if (result) {
      successCount++;
    } else {
      failCount++;
    }

    // Pausa tra le richieste
    if (i < placeholders.length - 1) {
      console.log("  ⏳ Pausa 5 secondi...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.log("\n📊 Riepilogo:");
  console.log(`  ✅ Trascrizioni generate: ${successCount}`);
  console.log(`  ❌ Errori: ${failCount}`);
  console.log(`  📁 Salvate in: ${TRANSCRIPTS_DIR}`);

  console.log("\n✅ Processo completato!");
}

// Verifica prerequisiti
if (!OPENAI_API_KEY) {
  console.error("❌ ERRORE: OPENAI_API_KEY non configurata!");
  console.log("\nPer usare questo script:");
  console.log(
    "1. Ottieni una chiave API da https://platform.openai.com/api-keys"
  );
  console.log("2. Imposta la variabile d'ambiente:");
  console.log("   Windows: set OPENAI_API_KEY=sk-...");
  console.log("   Linux/Mac: export OPENAI_API_KEY=sk-...");
  console.log("3. Esegui lo script");
  process.exit(1);
}

main().catch(console.error);
