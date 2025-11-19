# Test Script for Rides API

Write-Host "🧪 Testing Rides API..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "1. Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3002/health" -Method Get
    Write-Host "✅ Health Check: $($health.status)" -ForegroundColor Green
    Write-Host "   Message: $($health.message)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Health Check Failed" -ForegroundColor Red
}
Write-Host ""

# Test 2: Register User
Write-Host "2. Testing User Registration..." -ForegroundColor Yellow
$registerBody = @{
    email = "test@example.com"
    password = "password123"
    name = "Test User"
    phone = "+506 8888-8888"
    role = "user"
} | ConvertTo-Json

try {
    $register = Invoke-RestMethod -Uri "http://localhost:3002/api/auth/register" -Method Post -Body $registerBody -ContentType "application/json"
    $token = $register.data.token
    Write-Host "✅ User Registered: $($register.data.user.name)" -ForegroundColor Green
    Write-Host "   Email: $($register.data.user.email)" -ForegroundColor Gray
    Write-Host "   Token: $($token.Substring(0, 20))..." -ForegroundColor Gray
} catch {
    Write-Host "⚠️  User already exists or registration failed" -ForegroundColor Yellow
    # Try login instead
    $loginBody = @{
        email = "test@example.com"
        password = "password123"
    } | ConvertTo-Json
    
    $login = Invoke-RestMethod -Uri "http://localhost:3002/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    $token = $login.data.token
    Write-Host "✅ Logged in instead: $($login.data.user.name)" -ForegroundColor Green
}
Write-Host ""

# Test 3: Get Analytics
Write-Host "3. Testing Analytics Endpoint..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $token"
    }
    $analytics = Invoke-RestMethod -Uri "http://localhost:3002/api/analytics/overview" -Method Get -Headers $headers
    Write-Host "✅ Analytics Retrieved" -ForegroundColor Green
    Write-Host "   Total Trips: $($analytics.data.totalTrips)" -ForegroundColor Gray
    Write-Host "   Total Revenue: ₡$($analytics.data.totalRevenue)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Analytics Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Create Trip
Write-Host "4. Testing Create Trip..." -ForegroundColor Yellow
$tripBody = @{
    driverId = "driver-123"
    status = "scheduled"
    from = "Centro San José"
    to = "TEC Cartago"
    fromCoordinates = @{ lat = 9.93; lng = -84.08 }
    toCoordinates = @{ lat = 9.85; lng = -83.91 }
    date = "2025-11-12"
    time = "08:00"
    duration = "45 min"
    distance = "35 km"
    price = 5500
    vehicleId = "vehicle-123"
    rideType = "standard"
    paymentMethod = "Visa"
    city = "Cartago"
} | ConvertTo-Json

try {
    $trip = Invoke-RestMethod -Uri "http://localhost:3002/api/trips" -Method Post -Body $tripBody -ContentType "application/json" -Headers $headers
    Write-Host "✅ Trip Created: $($trip.data.trip.from) → $($trip.data.trip.to)" -ForegroundColor Green
    Write-Host "   Price: ₡$($trip.data.trip.price)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Trip Creation Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "✅ All tests completed!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Visit http://localhost:3002/api-docs for Swagger documentation" -ForegroundColor Blue
