# Chiesa Fiume di Vita - Backend Trascrizioni

## Deploy su Vercel

1. **Crea account Vercel** (se non lo hai): https://vercel.com/signup

2. **Installa Vercel CLI**:

```bash
npm install -g vercel
```

3. **Login a Vercel**:

```bash
vercel login
```

4. **Deploy il progetto**:

```bash
vercel
```

5. **Deploy in produzione**:

```bash
vercel --prod
```

## Configurazione

Dopo il deploy, ottieni l'URL (es: https://chiesa-nuovo.vercel.app)

Aggiungi al file `.env`:

```
VITE_TRANSCRIPT_API_URL=https://tuo-progetto.vercel.app/api/transcript
```

## Test Locale

Per testare il backend localmente:

```bash
# Installa Vercel CLI se non l'hai fatto
npm install -g vercel

# Avvia il server di sviluppo Vercel
vercel dev
```

Poi nel `.env` usa:

```
VITE_TRANSCRIPT_API_URL=http://localhost:3000/api/transcript
```

## API Endpoint

**GET** `/api/transcript?videoId=VIDEO_ID`

Risposta successo:

```json
{
  "videoId": "VIDEO_ID",
  "available": true,
  "language": "it",
  "text": "Trascrizione completa...",
  "paragraphs": ["Paragrafo 1", "Paragrafo 2", ...],
  "segmentsCount": 150,
  "charactersCount": 5000
}
```

Risposta errore:

```json
{
  "error": "Trascrizione non disponibile",
  "message": "Questo video non ha sottotitoli/trascrizioni disponibili",
  "available": false
}
```

## Note

- Il backend è completamente gratuito su Vercel (100GB bandwidth/mese)
- Le trascrizioni vengono estratte direttamente da YouTube
- Supporta italiano e altre lingue disponibili
- Nessun costo per API o quote
