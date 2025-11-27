# Script para iniciar todo el proyecto y probar las APIs
# Ejecutar: .\start-all.ps1

Write-Host "`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         🚀 INICIANDO PROYECTO1-DISEÑO COMPLETO               ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Verificar Node.js
Write-Host "[1/5] Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✅ Node.js instalado: $nodeVersion`n" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js no encontrado. Por favor instala Node.js`n" -ForegroundColor Red
    exit 1
}

# Verificar dependencias
Write-Host "[2/5] Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ Dependencias instaladas`n" -ForegroundColor Green
} else {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Cyan
    npm install
    Write-Host "✅ Dependencias instaladas`n" -ForegroundColor Green
}

# Iniciar Backend
Write-Host "[3/5] Iniciando Backend API (Puerto 3001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run server:dev" -WindowStyle Normal
Start-Sleep -Seconds 3
Write-Host "✅ Backend iniciado en http://localhost:3001`n" -ForegroundColor Green

# Iniciar Frontend
Write-Host "[4/5] Iniciando Frontend (Puerto 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev" -WindowStyle Normal
Start-Sleep -Seconds 5
Write-Host "✅ Frontend iniciado en http://localhost:3000`n" -ForegroundColor Green

# Esperar a que los servidores estén listos
Write-Host "[5/5] Esperando a que los servidores estén listos..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Probar APIs
Write-Host "`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║              🧪 PROBANDO TODAS LAS APIs                      ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:3001/api"
$testsPassed = 0
$testsFailed = 0

function Test-Endpoint {
    param (
        [string]$Name,
        [string]$Url,
        [string]$Method = "GET",
        [object]$Body = $null
    )
    
    try {
        Write-Host "Testing $Name..." -NoNewline -ForegroundColor Cyan
        
        $params = @{
            Uri = $Url
            Method = $Method
            UseBasicParsing = $true
            TimeoutSec = 10
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json)
            $params.ContentType = "application/json"
        }
        
        $response = Invoke-WebRequest @params -ErrorAction Stop
        
        if ($response.StatusCode -eq 200 -or $response.StatusCode -eq 201) {
            Write-Host " ✅ PASS" -ForegroundColor Green
            $script:testsPassed++
            return $true
        } else {
            Write-Host " ❌ FAIL (Status: $($response.StatusCode))" -ForegroundColor Red
            $script:testsFailed++
            return $false
        }
    } catch {
        Write-Host " ❌ FAIL (Error: $($_.Exception.Message))" -ForegroundColor Red
        $script:testsFailed++
        return $false
    }
}

# Test 1: Health Check
Test-Endpoint -Name "Health Check" -Url "$baseUrl/health"

# Test 2: Get All Trips
Test-Endpoint -Name "Get All Trips" -Url "$baseUrl/trips"

# Test 3: Get All Users
Test-Endpoint -Name "Get All Users" -Url "$baseUrl/users"

# Test 4: Get All Drivers
Test-Endpoint -Name "Get All Drivers" -Url "$baseUrl/drivers"

# Test 5: Get All Vehicles
Test-Endpoint -Name "Get All Vehicles" -Url "$baseUrl/vehicles"

# Test 6: Get All Ratings
Test-Endpoint -Name "Get All Ratings" -Url "$baseUrl/ratings"

# Test 7: Get All Payments
Test-Endpoint -Name "Get All Payments" -Url "$baseUrl/payments"

# Test 8: Register User
$newUser = @{
    email = "test@proyecto.com"
    password = "test123"
    name = "Usuario de Prueba"
    phone = "+506 1234-5678"
    role = "user"
}
$registerResult = Test-Endpoint -Name "Register User" -Url "$baseUrl/auth/register" -Method "POST" -Body $newUser

# Test 9: Login User
if ($registerResult) {
    $loginData = @{
        email = "test@proyecto.com"
        password = "test123"
    }
    Test-Endpoint -Name "Login User" -Url "$baseUrl/auth/login" -Method "POST" -Body $loginData
}

# Test 10: Get Trip by ID
Test-Endpoint -Name "Get Trip by ID" -Url "$baseUrl/trips/1"

# Resumen
Write-Host "`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    📊 RESUMEN DE PRUEBAS                     ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

Write-Host "Tests Exitosos: " -NoNewline -ForegroundColor White
Write-Host "$testsPassed" -ForegroundColor Green

Write-Host "Tests Fallidos: " -NoNewline -ForegroundColor White
Write-Host "$testsFailed" -ForegroundColor $(if ($testsFailed -eq 0) { "Green" } else { "Red" })

$totalTests = $testsPassed + $testsFailed
$successRate = [math]::Round(($testsPassed / $totalTests) * 100, 2)
Write-Host "Tasa de Éxito: " -NoNewline -ForegroundColor White
Write-Host "$successRate%" -ForegroundColor $(if ($successRate -eq 100) { "Green" } else { "Yellow" })

Write-Host "`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                  🌐 ACCESOS RÁPIDOS                          ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

Write-Host "Frontend:      " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3000" -ForegroundColor Cyan

Write-Host "Backend API:   " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3001/api" -ForegroundColor Cyan

Write-Host "Swagger Docs:  " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3001/api-docs" -ForegroundColor Cyan

Write-Host "Health Check:  " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3001/api/health" -ForegroundColor Cyan

Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "¿Deseas abrir Swagger en el navegador? (s/n): " -NoNewline -ForegroundColor Yellow
$openSwagger = Read-Host

if ($openSwagger -eq 's' -or $openSwagger -eq 'S') {
    Start-Process "http://localhost:3001/api-docs"
    Write-Host "✅ Swagger abierto en el navegador`n" -ForegroundColor Green
}

Write-Host "Presiona cualquier tecla para salir..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
