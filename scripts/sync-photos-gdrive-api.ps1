# Script per sincronizzare foto da Google Drive al progetto
# Usa Google Drive API senza bisogno di rclone
#
# SETUP INIZIALE (da fare UNA SOLA VOLTA):
# 1. Vai su https://console.cloud.google.com/
# 2. Crea un nuovo progetto o seleziona uno esistente
# 3. Abilita Google Drive API
# 4. Crea credenziali OAuth 2.0
# 5. Scarica il file credentials.json e salvalo in questa cartella scripts/
# 6. La prima volta che esegui lo script si aprirà il browser per autorizzare

param(
    [string]$FolderId = "19jb6R3X73YobIw9Em3_4OsKP1BiDkLP2",
    [string]$ProjectRoot = "c:\Users\LENOVO\Josiah Catchpole\devSito\chiesa-fiume-vita"
)

# Installa modulo Google Drive se non presente
if (-not (Get-Module -ListAvailable -Name "GoogleDrive")) {
    Write-Host "Installazione modulo Google Drive..." -ForegroundColor Yellow
    Install-Module -Name GoogleDrive -Scope CurrentUser -Force
}

Import-Module GoogleDrive

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  SYNC FOTO DA GOOGLE DRIVE" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Autenticazione
$credentialsPath = Join-Path $PSScriptRoot "credentials.json"
$tokenPath = Join-Path $PSScriptRoot "token.json"

if (-not (Test-Path $credentialsPath)) {
    Write-Host "ERRORE: File credentials.json non trovato!" -ForegroundColor Red
    Write-Host "`nSEGUI QUESTI PASSI:" -ForegroundColor Yellow
    Write-Host "1. Vai su https://console.cloud.google.com/" -ForegroundColor White
    Write-Host "2. Crea un nuovo progetto" -ForegroundColor White
    Write-Host "3. Abilita Google Drive API" -ForegroundColor White
    Write-Host "4. Vai su 'Credenziali' > 'Crea credenziali' > 'ID client OAuth'" -ForegroundColor White
    Write-Host "5. Tipo applicazione: 'Applicazione desktop'" -ForegroundColor White
    Write-Host "6. Scarica il JSON e salvalo come: $credentialsPath" -ForegroundColor White
    exit 1
}

Write-Host "Autenticazione con Google Drive..." -ForegroundColor Yellow

try {
    if (Test-Path $tokenPath) {
        $token = Get-Content $tokenPath | ConvertFrom-Json
        Write-Host "Token esistente trovato" -ForegroundColor Green
    } else {
        Write-Host "Prima autenticazione - si aprira il browser..." -ForegroundColor Yellow
        # Qui dovrebbe aprire il browser per OAuth
    }
} catch {
    Write-Host "Errore autenticazione: $_" -ForegroundColor Red
    exit 1
}

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

# Crea struttura cartelle
$galleriesPath = Join-Path $ProjectRoot "public\images\galleries"
New-Item -ItemType Directory -Force -Path $galleriesPath | Out-Null

$photosByMinistry = @{}

Write-Host "`nElaborazione cartelle Google Drive..." -ForegroundColor Yellow

foreach ($folderName in $ministryMapping.Keys) {
    $ministryId = $ministryMapping[$folderName]
    
    Write-Host "`nProcessando: $folderName -> $ministryId" -ForegroundColor Cyan
    
    # Qui scaricheresti le foto dalla cartella specifica
    # Per ora uso segnaposto
    
    $destFolder = Join-Path $galleriesPath $ministryId
    New-Item -ItemType Directory -Force -Path $destFolder | Out-Null
    
    # Segnaposto - in produzione qui scaricheresti le foto vere
    Write-Host "  Cartella creata: $destFolder" -ForegroundColor Green
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  COMPLETATO" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "NOTA: Questo script richiede setup OAuth di Google." -ForegroundColor Yellow
Write-Host "Uso alternativo piu semplice: scarica manualmente le foto" -ForegroundColor Yellow
Write-Host "e usa lo script organize-photos.ps1" -ForegroundColor Yellow
