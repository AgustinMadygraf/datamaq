@echo off
setlocal

set "SCRIPT_DIR=%~dp0"

cd /d "%SCRIPT_DIR%"
"C:\Users\MAQ-BOLSAS\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\python.exe" "C:\AppServ\www\DigiRail\SCR\MainDataCollector.py"
pause
endlocal
