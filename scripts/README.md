# Script per Gestione Trascrizioni

Questa cartella contiene script per scaricare e generare trascrizioni dei video YouTube.

## Script Disponibili

### 1. `download-transcripts.mjs`

Scarica le trascrizioni automatiche disponibili su YouTube per tutte le prediche del canale.

**Cosa fa:**

- Filtra automaticamente solo le prediche (esclude live, shorts, canti)
- Cerca trascrizioni automatiche su YouTube
- Crea file JSON con le trascrizioni trovate
- Crea placeholder per i video senza trascrizione

**Come usarlo:**

```bash
node scripts/download-transcripts.mjs
```

**Output:**

- Crea file JSON in `public/transcripts/` per ogni video
- Crea `public/transcripts/index.json` con l'elenco completo

### 2. `generate-transcripts-whisper.mjs` (OPZIONALE)

Genera trascrizioni usando OpenAI Whisper API per i video che non hanno trascrizioni automatiche.

**Prerequisiti:**

- Chiave API OpenAI (https://platform.openai.com/api-keys)
- `yt-dlp` installato (per scaricare audio): `pip install yt-dlp`

**Come usarlo:**

```bash
# Windows
set OPENAI_API_KEY=sk-your-api-key-here
node scripts/generate-transcripts-whisper.mjs

# Linux/Mac
export OPENAI_API_KEY=sk-your-api-key-here
node scripts/generate-transcripts-whisper.mjs
```

**⚠️ ATTENZIONE:**

- Questo script consuma crediti API OpenAI (~$0.006 per minuto di audio)
- Richiede tempo (qualche minuto per video)
- Usare solo se necessario!

## Workflow Consigliato

### Opzione 1: Solo Trascrizioni Automatiche YouTube (GRATIS)

```bash
# 1. Scarica trascrizioni disponibili
node scripts/download-transcripts.mjs

# 2. Per i video senza trascrizione, abilitale su YouTube Studio
# 3. Riesegui lo script periodicamente
```

### Opzione 2: Con Generazione Automatica (A PAGAMENTO)

```bash
# 1. Scarica trascrizioni disponibili
node scripts/download-transcripts.mjs

# 2. Genera le mancanti con Whisper API
set OPENAI_API_KEY=sk-...
node scripts/generate-transcripts-whisper.mjs
```

### Opzione 3: Manuale

```bash
# 1. Scarica trascrizioni disponibili
node scripts/download-transcripts.mjs

# 2. Modifica manualmente i file JSON in public/transcripts/
# 3. Cambia "available": false in true e aggiungi il testo
```

## Formato File JSON

Ogni trascrizione è salvata come:

```json
{
  "videoId": "abc123",
  "title": "Titolo del video",
  "available": true,
  "language": "it",
  "text": "Testo completo con paragrafi...",
  "paragraphs": ["Paragrafo 1", "Paragrafo 2"],
  "charactersCount": 1234,
  "videoUrl": "https://www.youtube.com/watch?v=abc123",
  "generatedAt": "2024-12-05T10:00:00.000Z"
}
```

## Come il Sito Usa le Trascrizioni

Il file `src/utils/youtubeAPI.js` contiene la funzione `fetchTranscript()` che:

1. Cerca il file JSON in `public/transcripts/{videoId}.json`
2. Se esiste, lo carica
3. Se non esiste o `available: false`, mostra "Trascrizione non disponibile"

**Nessuna chiamata API a runtime!** Tutto è statico e caricato dai file JSON.

## Aggiornamento Periodico

Per aggiungere trascrizioni di nuovi video:

```bash
node scripts/download-transcripts.mjs
```

Lo script:

- Aggiunge trascrizioni per nuovi video
- Non sovrascrive file esistenti
- Aggiorna l'indice automaticamente

## Abilitare Trascrizioni Automatiche su YouTube

1. Vai su YouTube Studio
2. Seleziona il video
3. Menu laterale → **Sottotitoli**
4. **Lingua video** → Italiano
5. Attendi che YouTube generi i sottotitoli automatici
6. Riesegui lo script

## Troubleshooting

### "Nessuna trascrizione disponibile"

- Il video non ha sottotitoli automatici su YouTube
- Soluzione: Abilitali su YouTube Studio o usa Whisper API

### Errore "OPENAI_API_KEY non configurata"

- Devi impostare la variabile d'ambiente prima di usare lo script Whisper
- Windows: `set OPENAI_API_KEY=sk-...`

### "yt-dlp not found"

- Installa con: `pip install yt-dlp` o `npm install -g yt-dlp`

### Lo script filtra troppi video

- Controlla i filtri in `filterSermons()` nello script
- Modifica le keyword se necessario
