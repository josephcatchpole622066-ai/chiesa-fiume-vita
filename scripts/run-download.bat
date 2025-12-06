@echo off
REM Script per eseguire il download delle trascrizioni con Whisper API
REM 
REM IMPORTANTE: Sostituisci "YOUR_OPENAI_API_KEY_HERE" con la tua vera chiave API
REM Puoi ottenere una chiave da: https://platform.openai.com/api-keys

set OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE

echo ========================================
echo Script Download Trascrizioni
echo ========================================
echo.
echo NOTA: Se non hai configurato OPENAI_API_KEY,
echo verra' creato un placeholder per ogni video
echo senza trascrizione automatica.
echo.
echo Per abilitare la generazione automatica:
echo 1. Modifica questo file (run-download.bat)
echo 2. Sostituisci YOUR_OPENAI_API_KEY_HERE con la tua chiave
echo.
echo ========================================
echo.

node scripts/download-transcripts.mjs

pause
