#!/bin/bash

# Probar APIs
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║              🧪 PROBANDO TODAS LAS APIs                      ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

BASE_URL="http://localhost:5000/api"
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
NEW_USER='{"email":"test11dasdsa122@proyecto.com","password":"test123","name":"Usuario de Prueba","phone":"+506 1234-5678","role":"user"}'
if test_endpoint "Register User" "$BASE_URL/auth/register" "POST" "$NEW_USER"; then
    # Test 9: Login User
    LOGIN_DATA='{"email":"test@proyecto.com","password":"test123"}'
    test_endpoint "Login User" "$BASE_URL/auth/login" "POST" "$LOGIN_DATA"
fi


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
echo "Backend API:   http://localhost:5000/api"
echo "Swagger Docs:  http://localhost:5000/api-docs"
echo "Health Check:  http://localhost:5000/api/health"

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
        xdg-open "http://localhost:5000/api-docs"
        echo "✅ Swagger abierto en el navegador"
    elif command -v open &> /dev/null; then
        open "http://localhost:5000/api-docs"
        echo "✅ Swagger abierto en el navegador"
    else
        echo "⚠️  No se pudo abrir automáticamente. Abre manualmente:"
        echo "   http://localhost:5000/api-docs"
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
