# Start Backend Server
Write-Host "`n===============================================" -ForegroundColor Cyan
Write-Host "   INICIANDO SERVIDOR BACKEND" -ForegroundColor Green
Write-Host "===============================================`n" -ForegroundColor Cyan

Set-Location $PSScriptRoot
npx tsx server/server.ts
