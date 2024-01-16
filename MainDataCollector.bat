@echo off
setlocal

set "SCRIPT_DIR=%~dp0"

cd /d "%SCRIPT_DIR%"
"C:\Users\usuario\AppData\Local\Programs\Python\Python312\python.exe" "C:\AppServ\www\DigiRail\SCR\main.py"
pause
endlocal
