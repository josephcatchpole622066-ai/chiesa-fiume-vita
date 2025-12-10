# Script per organizzare foto scaricate da Google Drive
# 
# ISTRUZIONI:
# 1. Vai su Google Drive: https://drive.google.com/drive/u/1/folders/19jb6R3X73YobIw9Em3_4OsKP1BiDkLP2
# 2. Scarica l'intera cartella (click destro > Scarica)
# 3. Estrai lo ZIP in una cartella temporanea
# 4. Esegui questo script: .\scripts\organize-photos.ps1 -SourcePath "C:\percorso\cartella\estratta"
#
# STRUTTURA RICHIESTA nella cartella Google Drive:
# - Calcetto/
# - Donne/
# - Giovanissimi/
# - Giovani Famiglie/
# - Chiesa in Casa/
# - Uomini/
# - Scuola Domenicale/
# - Aiuto Bisognosi/
# - Inglese/
# - Generale/  (per la gallery homepage)
# - Video/  (video di sfondo per la homepage)

param(
    [Parameter(Mandatory=$true)]
    [string]$SourcePath,
    
    [string]$ProjectRoot = "c:\Users\joseph.catchpole\chiesa-new"
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  ORGANIZZAZIONE FOTO CHIESA" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Verifica che la cartella sorgente esista
if (-not (Test-Path $SourcePath)) {
    Write-Host "ERRORE: Cartella non trovata: $SourcePath" -ForegroundColor Red
    Write-Host "`nEsempio di utilizzo:" -ForegroundColor Yellow
    Write-Host '.\scripts\organize-photos.ps1 -SourcePath "C:\Users\LENOVO\Downloads\Foto Chiesa"' -ForegroundColor White
    exit 1
}

Write-Host "Cartella sorgente: $SourcePath" -ForegroundColor Green
Write-Host "Progetto: $ProjectRoot`n" -ForegroundColor Green

# Mappa cartelle -> ministeri
$ministryMapping = @{
    "Calcetto" = "calcetto"
    "Donne" = "donne"
    "Giovanissimi" = "giovanissimi"
    "Giovani Famiglie" = "giovani-famiglie"
    "Chiesa in Casa" = "chiesa-in-casa"
    "Uomini" = "uomini"
    "Scuola Domenicale" = "scuola-domenicale"
    "Aiuto Bisognosi" = "aiuto-bisognosi"
    "Inglese" = "inglese"
    "Generale" = "gallery"
}

# Crea struttura cartelle destinazione
$galleriesPath = Join-Path $ProjectRoot "public\images\galleries"
New-Item -ItemType Directory -Force -Path $galleriesPath | Out-Null

$photosByMinistry = @{}
$totalPhotos = 0
$videoProcessed = $false

# Processa video di sfondo (se presente)
$videoSourcePath = Join-Path $SourcePath "Video"
if (Test-Path $videoSourcePath) {
    Write-Host "Processando video di sfondo..." -ForegroundColor Cyan
    
    $videos = Get-ChildItem -Path $videoSourcePath -File -Include *.mp4,*.webm,*.mov,*.MP4,*.WEBM,*.MOV -Recurse
    
    if ($videos.Count -gt 0) {
        # Prendi il primo video trovato
        $video = $videos[0]
        
        # Crea cartella video se non esiste
        $videoDestFolder = Join-Path $ProjectRoot "public\videos"
        New-Item -ItemType Directory -Force -Path $videoDestFolder | Out-Null
        
        # Copia con nome standardizzato
        $videoDestPath = Join-Path $videoDestFolder "hero-background.mp4"
        Copy-Item -Path $video.FullName -Destination $videoDestPath -Force
        
        Write-Host "  Video copiato: $($video.Name) -> hero-background.mp4" -ForegroundColor Green
        $videoProcessed = $true
    } else {
        Write-Host "  Nessun video trovato nella cartella Video" -ForegroundColor Yellow
    }
}

# Processa ogni cartella
foreach ($folderName in $ministryMapping.Keys) {
    $ministryId = $ministryMapping[$folderName]
    $sourceFolderPath = Join-Path $SourcePath $folderName
    
    if (-not (Test-Path $sourceFolderPath)) {
        Write-Host "ATTENZIONE: Cartella '$folderName' non trovata - saltata" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "Processando: $folderName" -ForegroundColor Cyan
    
    # Crea cartella destinazione
    $destFolder = Join-Path $galleriesPath $ministryId
    New-Item -ItemType Directory -Force -Path $destFolder | Out-Null
    
    # Copia tutte le foto
    $photos = Get-ChildItem -Path $sourceFolderPath -File -Include *.jpg,*.jpeg,*.png,*.JPG,*.JPEG,*.PNG -Recurse
    
    if ($photos.Count -eq 0) {
        Write-Host "  Nessuna foto trovata" -ForegroundColor Yellow
        continue
    }
    
    $photosByMinistry[$ministryId] = @()
    
    foreach ($photo in $photos) {
        $destPath = Join-Path $destFolder $photo.Name
        Copy-Item -Path $photo.FullName -Destination $destPath -Force
        
        # Salva path relativo
        $relativePath = "/images/galleries/$ministryId/$($photo.Name)"
        $photosByMinistry[$ministryId] += $relativePath
        
        $totalPhotos++
        Write-Host "  - $($photo.Name)" -ForegroundColor Green
    }
    
    Write-Host "  Totale: $($photos.Count) foto" -ForegroundColor Green
}

Write-Host "`nAggiornamento file del sito..." -ForegroundColor Yellow

# Aggiorna MinistriesPage.jsx
$ministriesPagePath = Join-Path $ProjectRoot "src\pages\ministries\MinistriesPage.jsx"
if (Test-Path $ministriesPagePath) {
    $content = Get-Content -Path $ministriesPagePath -Raw
    
    foreach ($ministryId in $photosByMinistry.Keys) {
        if ($ministryId -eq "gallery") { continue }
        if ($photosByMinistry[$ministryId].Count -gt 0) {
            $firstPhoto = $photosByMinistry[$ministryId][0]
            
            # Sostituisci immagine
            $pattern = "(id:\s*'$ministryId',[\s\S]{0,500}?)image:\s*'[^']*'"
            $replacement = "`$1image: '$firstPhoto'"
            $content = $content -replace $pattern, $replacement
            
            Write-Host "  MinistriesPage: $ministryId -> $firstPhoto" -ForegroundColor Green
        }
    }
    
    Set-Content -Path $ministriesPagePath -Value $content -NoNewline
}

# Aggiorna MinistryDetail.jsx
$detailPagePath = Join-Path $ProjectRoot "src\pages\ministries\MinistryDetail.jsx"
if (Test-Path $detailPagePath) {
    $content = Get-Content -Path $detailPagePath -Raw
    
    foreach ($ministryId in $photosByMinistry.Keys) {
        if ($ministryId -eq "gallery") { continue }
        if ($photosByMinistry[$ministryId].Count -gt 0) {
            $firstPhoto = $photosByMinistry[$ministryId][0]
            
            $pattern = "('$ministryId':\s*\{[\s\S]{0,800}?)image:\s*'[^']*'"
            $replacement = "`$1image: '$firstPhoto'"
            $content = $content -replace $pattern, $replacement
            
            Write-Host "  MinistryDetail: $ministryId -> $firstPhoto" -ForegroundColor Green
        }
    }
    
    Set-Content -Path $detailPagePath -Value $content -NoNewline
}

# Aggiorna Gallery.jsx (homepage)
if ($photosByMinistry.ContainsKey("gallery") -and $photosByMinistry["gallery"].Count -gt 0) {
    $galleryPath = Join-Path $ProjectRoot "src\components\Gallery.jsx"
    
    if (Test-Path $galleryPath) {
        $content = Get-Content -Path $galleryPath -Raw
        
        # Prendi prime 8 foto
        $galleryPhotos = $photosByMinistry["gallery"] | Select-Object -First 8
        
        # Costruisci array
        $imagesArray = ""
        $index = 1
        foreach ($photo in $galleryPhotos) {
            $category = if ($index % 3 -eq 0) { "Eventi" } elseif ($index % 2 -eq 0) { "Comunita" } else { "Culto" }
            $imagesArray += "    {`n"
            $imagesArray += "      url: `"$photo`",`n"
            $imagesArray += "      title: `"Galleria $index`",`n"
            $imagesArray += "      category: `"$category`",`n"
            $imagesArray += "    },`n"
            $index++
        }
        
        # Sostituisci
        $pattern = "const images = \[[^\]]+\];"
        $replacement = "const images = [`n$imagesArray  ];"
        $content = $content -replace $pattern, $replacement
        
        Set-Content -Path $galleryPath -Value $content -NoNewline
        Write-Host "  Gallery: $($galleryPhotos.Count) foto aggiornate" -ForegroundColor Green
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  COMPLETATO!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Riepilogo:" -ForegroundColor Cyan
Write-Host "  - Foto totali copiate: $totalPhotos" -ForegroundColor White
Write-Host "  - Ministeri aggiornati: $($photosByMinistry.Keys.Count)" -ForegroundColor White
Write-Host "  - Cartella destinazione: $galleriesPath" -ForegroundColor White
if ($videoProcessed) {
    Write-Host "  - Video di sfondo: hero-background.mp4" -ForegroundColor Green
}

Write-Host "`nProssimi passi:" -ForegroundColor Yellow
Write-Host "  1. Testa il sito: npm run dev" -ForegroundColor White
Write-Host "  2. Verifica le foto nei ministeri e nella gallery" -ForegroundColor White
Write-Host "  3. Committa: git add . && git commit -m 'Update photos'" -ForegroundColor White

Write-Host "`nPER AGGIORNARE LE FOTO IN FUTURO:" -ForegroundColor Cyan
Write-Host "  1. Scarica nuovamente la cartella da Google Drive" -ForegroundColor White
Write-Host "  2. Riesegui questo script" -ForegroundColor White
Write-Host "  3. Le foto verranno automaticamente aggiornate`n" -ForegroundColor White
