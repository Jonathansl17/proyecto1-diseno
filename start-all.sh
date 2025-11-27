#!/bin/bash

# Script para iniciar todo el proyecto y probar las APIs
# Ejecutar: chmod +x start-all.sh && ./start-all.sh

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         🚀 INICIANDO PROYECTO1-DISEÑO COMPLETO               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Verificar Node.js
echo "[1/5] Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js instalado: $NODE_VERSION"
    echo ""
else
    echo "❌ Node.js no encontrado. Por favor instala Node.js"
    echo ""
    exit 1
fi

# Verificar dependencias
echo "[2/5] Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo "✅ Dependencias instaladas"
    echo ""
else
    echo "📦 Instalando dependencias..."
    npm install
    echo "✅ Dependencias instaladas"
    echo ""
fi

# Iniciar Backend
echo "[3/5] Iniciando Backend API (Puerto 3001)..."
npm run server:dev > /dev/null 2>&1 &
BACKEND_PID=$!
sleep 3
echo "✅ Backend iniciado en http://localhost:3001 (PID: $BACKEND_PID)"
echo ""

# Iniciar Frontend
echo "[4/5] Iniciando Frontend (Puerto 3000)..."
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
sleep 5
echo "✅ Frontend iniciado en http://localhost:3000 (PID: $FRONTEND_PID)"
echo ""

# Esperar a que los servidores estén listos
echo "[5/5] Esperando a que los servidores estén listos..."
sleep 3

# Probar APIs
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║              🧪 PROBANDO TODAS LAS APIs                      ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

BASE_URL="http://localhost:3001/api"
TESTS_PASSED=0
TESTS_FAILED=0

# Función para probar endpoints
test_endpoint() {
    local NAME=$1
    local URL=$2
    local METHOD=${3:-GET}
    local BODY=${4:-}
    
    echo -n "Testing $NAME... "
    
    if [ -z "$BODY" ]; then
        RESPONSE=$(curl -s -w "%{http_code}" -X "$METHOD" "$URL" -o /dev/null)
    else
        RESPONSE=$(curl -s -w "%{http_code}" -X "$METHOD" "$URL" \
            -H "Content-Type: application/json" \
            -d "$BODY" -o /dev/null)
    fi
    
    if [ "$RESPONSE" -eq 200 ] || [ "$RESPONSE" -eq 201 ]; then
        echo "✅ PASS"
        ((TESTS_PASSED++))
        return 0
    else
        echo "❌ FAIL (Status: $RESPONSE)"
        ((TESTS_FAILED++))
        return 1
    fi
}

# Test 1: Health Check
test_endpoint "Health Check" "$BASE_URL/health"

# Test 2: Get All Trips
test_endpoint "Get All Trips" "$BASE_URL/trips"

# Test 3: Get All Users
test_endpoint "Get All Users" "$BASE_URL/users"

# Test 4: Get All Drivers
test_endpoint "Get All Drivers" "$BASE_URL/drivers"

# Test 5: Get All Vehicles
test_endpoint "Get All Vehicles" "$BASE_URL/vehicles"

# Test 6: Get All Ratings
test_endpoint "Get All Ratings" "$BASE_URL/ratings"

# Test 7: Get All Payments
test_endpoint "Get All Payments" "$BASE_URL/payments"

# Test 8: Register User
NEW_USER='{"email":"test@proyecto.com","password":"test123","name":"Usuario de Prueba","phone":"+506 1234-5678","role":"user"}'
if test_endpoint "Register User" "$BASE_URL/auth/register" "POST" "$NEW_USER"; then
    # Test 9: Login User
    LOGIN_DATA='{"email":"test@proyecto.com","password":"test123"}'
    test_endpoint "Login User" "$BASE_URL/auth/login" "POST" "$LOGIN_DATA"
fi

# Test 10: Get Trip by ID
test_endpoint "Get Trip by ID" "$BASE_URL/trips/1"

# Resumen
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                    📊 RESUMEN DE PRUEBAS                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
SUCCESS_RATE=$(awk "BEGIN {printf \"%.2f\", ($TESTS_PASSED / $TOTAL_TESTS) * 100}")

echo "Tests Exitosos: $TESTS_PASSED"
echo "Tests Fallidos: $TESTS_FAILED"
echo "Tasa de Éxito: $SUCCESS_RATE%"

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                  🌐 ACCESOS RÁPIDOS                          ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

echo "Frontend:      http://localhost:3000"
echo "Backend API:   http://localhost:3001/api"
echo "Swagger Docs:  http://localhost:3001/api-docs"
echo "Health Check:  http://localhost:3001/api/health"

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                  📝 INFORMACIÓN DE PROCESOS                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

echo "Backend PID:  $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Para detener los servidores:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "O usa el comando:"
echo "  pkill -f 'npm run'"
echo ""

# Preguntar si abrir Swagger
read -p "¿Deseas abrir Swagger en el navegador? (s/n): " OPEN_SWAGGER

if [ "$OPEN_SWAGGER" = "s" ] || [ "$OPEN_SWAGGER" = "S" ]; then
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:3001/api-docs"
        echo "✅ Swagger abierto en el navegador"
    elif command -v open &> /dev/null; then
        open "http://localhost:3001/api-docs"
        echo "✅ Swagger abierto en el navegador"
    else
        echo "⚠️  No se pudo abrir automáticamente. Abre manualmente:"
        echo "   http://localhost:3001/api-docs"
    fi
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "Presiona Ctrl+C para salir y detener los servidores..."
echo "═══════════════════════════════════════════════════════════════"

# Mantener el script corriendo
trap "echo ''; echo 'Deteniendo servidores...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '✅ Servidores detenidos'; exit 0" INT TERM

# Esperar indefinidamente
wait
