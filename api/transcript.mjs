import { YoutubeTranscript } from "youtube-transcript";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({
      error: "videoId richiesto"
    });
  }

  try {
    console.log(`Richiesta trascrizione per video: ${videoId}`);

    // Prova prima con italiano, poi con qualsiasi lingua disponibile
    let transcript;
    try {
      transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: "it" });
    } catch (e1) {
      try {
        transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: "en" });
      } catch (e2) {
        // Prova senza specificare lingua
        transcript = await YoutubeTranscript.fetchTranscript(videoId);
      }
    }

    if (!transcript || transcript.length === 0) {
      return res.status(404).json({
        error: "Trascrizione non disponibile",
        available: false
      });
    }

    const fullText = transcript.map(item => item.text).join(" ").replace(/\s+/g, " ").trim();
    const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
    const paragraphs = [];
    
    for (let i = 0; i < sentences.length; i += 5) {
      const paragraph = sentences.slice(i, i + 5).join(" ").trim();
      if (paragraph) paragraphs.push(paragraph);
    }

    console.log(`Trascrizione trovata: ${paragraphs.length} paragrafi`);

    return res.status(200).json({
      videoId,
      available: true,
      language: "it",
      text: paragraphs.join("\n\n"),
      paragraphs,
      segmentsCount: transcript.length,
      charactersCount: fullText.length
    });

  } catch (error) {
    console.error("Errore:", error.message);

    if (error.message?.includes("Could not find captions") || error.message?.includes("Transcript is disabled")) {
      return res.status(404).json({
        error: "Trascrizione non disponibile",
        message: "Questo video non ha sottotitoli disponibili",
        available: false
      });
    }

    return res.status(500).json({
      error: "Errore server",
      message: error.message,
      available: false
    });
  }
}
