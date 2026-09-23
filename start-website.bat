@echo off
title StudyNest - Laptop and Mobile Server
echo ========================================================
echo   StudyNest - Live on Laptop and Mobile Phone
echo ========================================================
echo.
echo   * On this Laptop: Open in browser at http://localhost:5174/
echo   * On your Mobile: Open in browser at the Network URL shown below
echo.
echo ========================================================
echo.
cmd.exe /c "npm.cmd run dev -- --host --port 5174"
pause
