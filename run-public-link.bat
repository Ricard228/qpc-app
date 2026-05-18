@echo off
REM ====================================================================
REM run-public-link.bat
REM Lance le serveur Express (avec auth) + un tunnel public via serveo.net
REM Pratique pour partager temporairement, mais le deploiement Render reste
REM la solution permanente (voir DEPLOY.md).
REM
REM Necessite : Node.js + un client SSH (OpenSSH livre avec Windows 10+).
REM ====================================================================

setlocal
cd /d "%~dp0"

REM Installer les dependances si besoin
if not exist node_modules (
  echo [QPC] Installation des dependances...
  call npm install
)

REM Mot de passe admin pour cette session locale
set ADMIN_PASSWORD=qpc-admin-local-2026
set PORT=3001

echo.
echo [QPC] Demarrage du serveur Express (avec auth) sur le port %PORT%...
echo [QPC] Mot de passe super-admin local : %ADMIN_PASSWORD%
start "QPC server" /B cmd /c "set ADMIN_PASSWORD=%ADMIN_PASSWORD%&& set PORT=%PORT%&& node server.js"

echo [QPC] Attente que le serveur soit pret...
timeout /t 4 /nobreak >nul

echo.
echo [QPC] Demarrage du tunnel public via serveo.net...
echo Cherchez la ligne "Forwarding HTTP traffic from https://...serveousercontent.com"
echo.
echo Ctrl+C pour arreter (cela arretera aussi le serveur local).
echo.
ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -R 80:localhost:%PORT% serveo.net

endlocal
