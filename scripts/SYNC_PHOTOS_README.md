# Script di Sincronizzazione Foto da Google Drive

Questo script automatizza il download delle foto da Google Drive e le organizza nel progetto.

## Prerequisiti

### 1. Installare rclone

```powershell
winget install Rclone.Rclone
```

### 2. Configurare Google Drive

Dopo l'installazione, esegui:

```powershell
rclone config
```

Segui questi passi:
1. Premi `n` per nuovo remote
2. Nome: `gdrive`
3. Storage: `drive` (Google Drive)
4. Lascia vuoti client_id e client_secret (premi Invio)
5. Scope: `1` (Full access)
6. Lascia vuoto root_folder_id
7. Lascia vuoto service_account_file
8. Edit advanced config? `n`
9. Use auto config? `y` (si aprirà il browser)
10. Accedi con il tuo account Google e autorizza
11. Configure this as a team drive? `n`
12. Conferma con `y`
13. Quit con `q`

## Struttura Cartelle su Google Drive

Le cartelle devono essere organizzate così:

```
📁 Foto Chiesa/
  ├─ 📁 Calcetto/
  │   ├─ foto1.jpg
  │   └─ foto2.jpg
  ├─ 📁 Donne/
  ├─ 📁 Giovanissimi/
  ├─ 📁 Giovani Famiglie/
  ├─ 📁 Chiesa in Casa/
  ├─ 📁 Uomini/
  ├─ 📁 Scuola Domenicale/
  ├─ 📁 Aiuto Bisognosi/
  ├─ 📁 Inglese/
  └─ 📁 Gallery/
```

## Utilizzo

### Esecuzione Manuale

```powershell
cd "c:\Users\LENOVO\Josiah Catchpole\devSito\chiesa-fiume-vita"
.\scripts\sync-photos-from-drive.ps1
```

### Parametri Opzionali

```powershell
# Specifica ID cartella Drive diverso
.\scripts\sync-photos-from-drive.ps1 -DriveFolder "YOUR_FOLDER_ID"

# Specifica path progetto diverso
.\scripts\sync-photos-from-drive.ps1 -ProjectRoot "C:\altro\percorso"
```

## Cosa Fa lo Script

1. ✅ Verifica che rclone sia installato e configurato
2. 📥 Scarica tutte le foto dalla cartella Google Drive
3. 📁 Organizza le foto in `public/images/galleries/[ministero]/`
4. 📝 Aggiorna automaticamente:
   - `src/pages/ministries/MinistriesPage.jsx` (foto nelle card)
   - `src/pages/ministries/MinistryDetail.jsx` (foto nell'hero)
   - `src/components/Gallery.jsx` (prime 8 foto dalla cartella Gallery)
5. 🧹 Pulisce i file temporanei

## Mappa Cartelle → Ministeri

| Cartella Drive       | ID Ministero        | Cartella Locale          |
|---------------------|---------------------|--------------------------|
| Calcetto            | calcetto            | galleries/calcetto       |
| Donne               | donne               | galleries/donne          |
| Giovanissimi        | giovanissimi        | galleries/giovanissimi   |
| Giovani Famiglie    | giovani-famiglie    | galleries/giovani-famiglie |
| Chiesa in Casa      | chiesa-in-casa      | galleries/chiesa-in-casa |
| Uomini              | uomini              | galleries/uomini         |
| Scuola Domenicale   | scuola-domenicale   | galleries/scuola-domenicale |
| Aiuto Bisognosi     | aiuto-bisognosi     | galleries/aiuto-bisognosi |
| Inglese             | inglese             | galleries/inglese        |
| Gallery             | gallery             | galleries/gallery        |

## Formati Supportati

- JPG / JPEG
- PNG

## Troubleshooting

### Errore "rclone not found"

Installa rclone:
```powershell
winget install Rclone.Rclone
```

### Errore durante il download

Verifica la configurazione:
```powershell
rclone config show
```

Deve esistere un remote chiamato `gdrive` di tipo `drive`.

### Foto non aggiornate

1. Verifica che le cartelle su Drive abbiano i nomi esatti (case-sensitive)
2. Verifica che le foto siano in formato JPG o PNG
3. Controlla i log dello script per errori

## Automazione (Opzionale)

Puoi programmare l'esecuzione automatica usando Task Scheduler di Windows.

## Note

- Lo script usa la **prima foto** di ogni cartella per il ministero
- Per la Gallery, usa le **prime 8 foto**
- Le foto vengono copiate, non spostate (originali su Drive rimangono)
- Foto con stesso nome vengono sovrascritte
