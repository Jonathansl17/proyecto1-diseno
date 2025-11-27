# Script automatizado para desplegar Cosmos DB en Azure
# Ejecutar: .\deploy-azure.ps1

Write-Host "`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     🚀 DESPLIEGUE AUTOMÁTICO EN AZURE - PROYECTO1-DISEÑO    ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Variables
$resourceGroup = "proyecto1-diseno-rg"
$cosmosAccount = "proyecto1-diseno-db-" + (Get-Random -Minimum 1000 -Maximum 9999)
$location = "eastus"
$databaseName = "proyecto1-db"
$containerName = "rides-container"

Write-Host "📋 CONFIGURACIÓN:" -ForegroundColor Yellow
Write-Host "   Resource Group: $resourceGroup" -ForegroundColor White
Write-Host "   Cosmos Account: $cosmosAccount" -ForegroundColor White
Write-Host "   Location: $location" -ForegroundColor White
Write-Host "   Database: $databaseName" -ForegroundColor White
Write-Host "   Container: $containerName" -ForegroundColor White
Write-Host "   Modo: Serverless (GRATIS)" -ForegroundColor Green
Write-Host "`n════════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

# Login a Azure
Write-Host "🔐 Iniciando sesión en Azure..." -ForegroundColor Yellow
Write-Host "   (Se abrirá una ventana del navegador)`n" -ForegroundColor Gray
az login --use-device-code

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Error al iniciar sesión en Azure" -ForegroundColor Red
    Write-Host "   Por favor verifica tu cuenta de Azure`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n✅ Sesión iniciada correctamente`n" -ForegroundColor Green

# Confirmar
$confirm = Read-Host "¿Continuar con la creación? (s/n)"
if ($confirm -ne 's') {
    Write-Host "`n❌ Cancelado por el usuario`n" -ForegroundColor Red
    exit 0
}

# Paso 1: Crear Resource Group
Write-Host "`n[1/6] Creando Resource Group..." -ForegroundColor Yellow
az group create --name $resourceGroup --location $location --output none
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Resource Group creado: $resourceGroup" -ForegroundColor Green
} else {
    Write-Host "⚠️  Resource Group ya existe o hubo un error" -ForegroundColor Yellow
}

# Paso 2: Crear Cosmos DB Account (SERVERLESS - GRATIS)
Write-Host "`n[2/6] Creando Cosmos DB Account SERVERLESS (puede tardar 3-5 minutos)..." -ForegroundColor Yellow
Write-Host "   ⏳ Espera un momento..." -ForegroundColor Gray

az cosmosdb create `
    --name $cosmosAccount `
    --resource-group $resourceGroup `
    --kind GlobalDocumentDB `
    --default-consistency-level Session `
    --locations regionName=$location `
    --capabilities EnableServerless `
    --output none

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Cosmos DB Account creado (SERVERLESS - GRATIS)" -ForegroundColor Green
} else {
    Write-Host "❌ Error al crear Cosmos DB Account" -ForegroundColor Red
    exit 1
}

# Paso 3: Crear Database
Write-Host "`n[3/6] Creando Database..." -ForegroundColor Yellow
az cosmosdb sql database create `
    --account-name $cosmosAccount `
    --resource-group $resourceGroup `
    --name $databaseName `
    --output none

Write-Host "✅ Database creado: $databaseName" -ForegroundColor Green

# Paso 4: Crear Container con partition key
Write-Host "`n[4/6] Creando Container..." -ForegroundColor Yellow
az cosmosdb sql container create `
    --account-name $cosmosAccount `
    --resource-group $resourceGroup `
    --database-name $databaseName `
    --name $containerName `
    --partition-key-path "/type" `
    --output none

Write-Host "✅ Container creado: $containerName" -ForegroundColor Green

# Paso 5: Obtener credenciales
Write-Host "`n[5/6] Obteniendo credenciales..." -ForegroundColor Yellow

$endpoint = "https://$cosmosAccount.documents.azure.com:443/"
$keys = az cosmosdb keys list `
    --name $cosmosAccount `
    --resource-group $resourceGroup `
    --type keys | ConvertFrom-Json

$primaryKey = $keys.primaryMasterKey

Write-Host "✅ Credenciales obtenidas" -ForegroundColor Green

# Paso 6: Actualizar archivo .env
Write-Host "`n[6/6] Actualizando archivo .env..." -ForegroundColor Yellow

$envContent = @"
PORT=3002
NODE_ENV=production
JWT_SECRET=desarrollo-secret-key-cambiar-en-produccion-123456789
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002

# Azure Cosmos DB Configuration (Generado automáticamente el $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss'))
DB_MODE=azure
AZURE_COSMOS_ENDPOINT=$endpoint
AZURE_COSMOS_KEY=$primaryKey
AZURE_COSMOS_DATABASE=$databaseName
AZURE_COSMOS_CONTAINER=$containerName
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8 -Force

Write-Host "✅ Archivo .env actualizado" -ForegroundColor Green

# Resumen final
Write-Host "`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║              ✅ DESPLIEGUE COMPLETADO EXITOSAMENTE           ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

Write-Host "📦 RECURSOS CREADOS EN AZURE:" -ForegroundColor Yellow
Write-Host "   ✓ Resource Group: " -NoNewline -ForegroundColor White; Write-Host $resourceGroup -ForegroundColor Cyan
Write-Host "   ✓ Cosmos DB Account: " -NoNewline -ForegroundColor White; Write-Host $cosmosAccount -ForegroundColor Cyan
Write-Host "   ✓ Database: " -NoNewline -ForegroundColor White; Write-Host $databaseName -ForegroundColor Cyan
Write-Host "   ✓ Container: " -NoNewline -ForegroundColor White; Write-Host $containerName -ForegroundColor Cyan

Write-Host "`n🔐 CREDENCIALES (guardadas en .env):" -ForegroundColor Yellow
Write-Host "   Endpoint: " -NoNewline -ForegroundColor White; Write-Host $endpoint -ForegroundColor Gray
Write-Host "   Primary Key: " -NoNewline -ForegroundColor White; Write-Host "***" -ForegroundColor Gray

Write-Host "`n📝 SIGUIENTES PASOS:" -ForegroundColor Yellow
Write-Host "   1. Reinicia el servidor backend:" -ForegroundColor White
Write-Host "      " -NoNewline; Write-Host "npm run server:dev" -ForegroundColor Cyan
Write-Host "`n   2. Verifica que use Azure:" -ForegroundColor White
Write-Host "      Debe aparecer: " -NoNewline -ForegroundColor Gray; Write-Host "'📦 Usando Azure Cosmos DB'" -ForegroundColor Green
Write-Host "`n   3. Prueba la API:" -ForegroundColor White
Write-Host "      " -NoNewline; Write-Host "http://localhost:3002/api-docs" -ForegroundColor Cyan

Write-Host "`n💰 COSTOS:" -ForegroundColor Yellow
Write-Host "   Modo Serverless - Solo pagas por uso" -ForegroundColor Green
Write-Host "   Primeras 1,000 RU/s = GRATIS" -ForegroundColor Green
Write-Host "   Ideal para desarrollo y demos" -ForegroundColor Green

Write-Host "`n🌐 PORTAL AZURE:" -ForegroundColor Yellow
Write-Host "   https://portal.azure.com" -ForegroundColor Cyan
Write-Host "   Busca: " -NoNewline -ForegroundColor Gray; Write-Host $cosmosAccount -ForegroundColor White

Write-Host "`n╚═══════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan
