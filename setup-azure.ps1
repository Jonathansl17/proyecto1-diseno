# Script para configurar Azure Cosmos DB
# Ejecutar con: .\setup-azure.ps1

Write-Host "`n╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  CONFIGURACIÓN AZURE COSMOS DB - PROYECTO1-DISEÑO     ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Verificar si Azure CLI está instalado
Write-Host "Verificando Azure CLI..." -ForegroundColor Yellow
try {
    $azVersion = az --version 2>$null
    Write-Host "✅ Azure CLI instalado`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Azure CLI no encontrado. Instalando..." -ForegroundColor Red
    Write-Host "`nEjecutando: winget install -e --id Microsoft.AzureCLI`n" -ForegroundColor Cyan
    winget install -e --id Microsoft.AzureCLI
    Write-Host "✅ Azure CLI instalado. Por favor reinicia PowerShell y ejecuta el script nuevamente.`n" -ForegroundColor Green
    exit
}

# Login a Azure
Write-Host "Iniciando sesión en Azure..." -ForegroundColor Yellow
az login

# Variables
$resourceGroup = "proyecto1-diseno-rg"
$cosmosAccount = "proyecto1-diseno-db"
$location = "eastus"
$databaseName = "proyecto1-db"
$containerName = "rides-container"

Write-Host "`n════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "CONFIGURACIÓN:" -ForegroundColor Yellow
Write-Host "  Resource Group: $resourceGroup" -ForegroundColor White
Write-Host "  Cosmos Account: $cosmosAccount" -ForegroundColor White
Write-Host "  Location: $location" -ForegroundColor White
Write-Host "  Database: $databaseName" -ForegroundColor White
Write-Host "  Container: $containerName" -ForegroundColor White
Write-Host "════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

$confirm = Read-Host "¿Continuar con la creación? (s/n)"
if ($confirm -ne 's') {
    Write-Host "❌ Cancelado por el usuario" -ForegroundColor Red
    exit
}

# Paso 1: Crear Resource Group
Write-Host "`n[1/5] Creando Resource Group..." -ForegroundColor Yellow
$rgExists = az group exists --name $resourceGroup
if ($rgExists -eq "true") {
    Write-Host "⚠️  Resource Group ya existe" -ForegroundColor Yellow
} else {
    az group create --name $resourceGroup --location $location | Out-Null
    Write-Host "✅ Resource Group creado" -ForegroundColor Green
}

# Paso 2: Crear Cosmos DB Account
Write-Host "`n[2/5] Creando Cosmos DB Account (esto puede tardar 5-10 minutos)..." -ForegroundColor Yellow
$accountExists = az cosmosdb check-name-exists --name $cosmosAccount
if ($accountExists -eq "true") {
    Write-Host "⚠️  Cosmos DB Account ya existe" -ForegroundColor Yellow
} else {
    az cosmosdb create `
        --name $cosmosAccount `
        --resource-group $resourceGroup `
        --kind GlobalDocumentDB `
        --default-consistency-level Session `
        --locations regionName=$location `
        --enable-free-tier false | Out-Null
    Write-Host "✅ Cosmos DB Account creado" -ForegroundColor Green
}

# Paso 3: Crear Database
Write-Host "`n[3/5] Creando Database..." -ForegroundColor Yellow
az cosmosdb sql database create `
    --account-name $cosmosAccount `
    --resource-group $resourceGroup `
    --name $databaseName | Out-Null
Write-Host "✅ Database creado" -ForegroundColor Green

# Paso 4: Crear Container
Write-Host "`n[4/5] Creando Container..." -ForegroundColor Yellow
az cosmosdb sql container create `
    --account-name $cosmosAccount `
    --resource-group $resourceGroup `
    --database-name $databaseName `
    --name $containerName `
    --partition-key-path "/type" | Out-Null
Write-Host "✅ Container creado" -ForegroundColor Green

# Paso 5: Obtener credenciales
Write-Host "`n[5/5] Obteniendo credenciales..." -ForegroundColor Yellow
$keys = az cosmosdb keys list `
    --name $cosmosAccount `
    --resource-group $resourceGroup `
    --type keys | ConvertFrom-Json

$endpoint = "https://$cosmosAccount.documents.azure.com:443/"
$primaryKey = $keys.primaryMasterKey

Write-Host "✅ Credenciales obtenidas`n" -ForegroundColor Green

# Crear archivo .env con las credenciales
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "ACTUALIZANDO ARCHIVO .env..." -ForegroundColor Yellow
Write-Host "════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

$envContent = @"
PORT=3002
NODE_ENV=development
JWT_SECRET=desarrollo-secret-key-cambiar-en-produccion-123456789
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002

# Azure Cosmos DB Configuration (Generado automáticamente)
DB_MODE=azure
AZURE_COSMOS_ENDPOINT=$endpoint
AZURE_COSMOS_KEY=$primaryKey
AZURE_COSMOS_DATABASE=$databaseName
AZURE_COSMOS_CONTAINER=$containerName
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8 -Force

Write-Host "✅ Archivo .env actualizado con credenciales de Azure`n" -ForegroundColor Green

# Resumen
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║             ✅ CONFIGURACIÓN COMPLETADA                ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

Write-Host "RECURSOS CREADOS:" -ForegroundColor Yellow
Write-Host "  ✓ Resource Group: $resourceGroup" -ForegroundColor Green
Write-Host "  ✓ Cosmos DB Account: $cosmosAccount" -ForegroundColor Green
Write-Host "  ✓ Database: $databaseName" -ForegroundColor Green
Write-Host "  ✓ Container: $containerName" -ForegroundColor Green
Write-Host ""

Write-Host "CREDENCIALES (guardadas en .env):" -ForegroundColor Yellow
Write-Host "  Endpoint: $endpoint" -ForegroundColor Cyan
Write-Host "  Primary Key: ***" -ForegroundColor Gray
Write-Host ""

Write-Host "SIGUIENTES PASOS:" -ForegroundColor Yellow
Write-Host "  1. Reiniciar el servidor backend:" -ForegroundColor White
Write-Host "     npm run server:dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "  2. Verificar conexión:" -ForegroundColor White
Write-Host "     Invoke-RestMethod http://localhost:3002/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "  3. El servidor ahora usa Azure Cosmos DB!" -ForegroundColor White
Write-Host ""

Write-Host "COSTOS ESTIMADOS:" -ForegroundColor Yellow
Write-Host "  - Cosmos DB (400 RU/s): ~$24/mes" -ForegroundColor White
Write-Host "  - Primeros 1000 RU/s son gratis (Free Tier)" -ForegroundColor Green
Write-Host ""

Write-Host "PORTAL AZURE:" -ForegroundColor Yellow
Write-Host "  https://portal.azure.com/#resource/subscriptions/.../resourceGroups/$resourceGroup" -ForegroundColor Cyan
Write-Host ""

Write-Host "════════════════════════════════════════════════════════`n" -ForegroundColor Cyan
