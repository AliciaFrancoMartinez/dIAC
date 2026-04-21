@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "PS_SCRIPT=%SCRIPT_DIR%generate_catalog_manifest_windows.ps1"

echo Updating RaterTask catalog manifest...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%"
set "STATUS=%ERRORLEVEL%"

echo.
if "%STATUS%"=="0" (
  echo Manifest updated successfully.
) else (
  echo Manifest update failed ^(exit code: %STATUS%^).
)

echo.
pause
endlocal
