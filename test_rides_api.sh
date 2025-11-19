#!/bin/bash

echo -e "\e[36m🧪 Testing Rides API...\e[0m\n"

##############################################
# 1. Health Check
##############################################
echo -e "\e[33m1. Testing Health Endpoint...\e[0m"

health=$(curl -s http://localhost:3002/health)
if [ $? -eq 0 ]; then
    status=$(echo $health | jq -r '.status')
    message=$(echo $health | jq -r '.message')

    echo -e "\e[32m✅ Health Check: $status\e[0m"
    echo -e "   Message: $message"
else
    echo -e "\e[31m❌ Health Check Failed\e[0m"
fi
echo ""


##############################################
# 2. Register User
##############################################
echo -e "\e[33m2. Testing User Registration...\e[0m"

registerBody=$(jq -n \
    --arg email "test@example.com" \
    --arg password "password123" \
    --arg name "Test User" \
    --arg phone "+506 8888-8888" \
    --arg role "user" \
    '{email:$email, password:$password, name:$name, phone:$phone, role:$role}')

register=$(curl -s -X POST http://localhost:3002/api/auth/register \
    -H "Content-Type: application/json" \
    -d "$registerBody")

if echo "$register" | jq -e '.data.token' > /dev/null 2>&1; then
    token=$(echo "$register" | jq -r '.data.token')
    user=$(echo "$register" | jq -r '.data.user.name')
    email=$(echo "$register" | jq -r '.data.user.email')

    echo -e "\e[32m✅ User Registered: $user\e[0m"
    echo -e "   Email: $email"
    echo -e "   Token: ${token:0:20}..."
else
    echo -e "\e[33m⚠️  User already exists or registration failed, trying login...\e[0m"

    loginBody=$(jq -n \
        --arg email "test@example.com" \
        --arg password "password123" \
        '{email:$email, password:$password}')

    login=$(curl -s -X POST http://localhost:3002/api/auth/login \
        -H "Content-Type: application/json" \
        -d "$loginBody")

    token=$(echo "$login" | jq -r '.data.token')
    user=$(echo "$login" | jq -r '.data.user.name')

    echo -e "\e[32m✅ Logged in instead: $user\e[0m"
fi
echo ""


##############################################
# 3. Get Analytics
##############################################
echo -e "\e[33m3. Testing Analytics Endpoint...\e[0m"

analytics=$(curl -s -H "Authorization: Bearer $token" \
    http://localhost:3002/api/analytics/overview)

if echo "$analytics" | jq -e '.data.totalTrips' > /dev/null 2>&1; then
    totalTrips=$(echo "$analytics" | jq -r '.data.totalTrips')
    totalRevenue=$(echo "$analytics" | jq -r '.data.totalRevenue')

    echo -e "\e[32m✅ Analytics Retrieved\e[0m"
    echo -e "   Total Trips: $totalTrips"
    echo -e "   Total Revenue: ₡$totalRevenue"
else
    echo -e "\e[31m❌ Analytics Failed\e[0m"
fi
echo ""


##############################################
# 4. Create Trip
##############################################
echo -e "\e[33m4. Testing Create Trip...\e[0m"

tripBody=$(jq -n \
    --arg driverId "driver-123" \
    --arg status "scheduled" \
    --arg from "Centro San José" \
    --arg to "TEC Cartago" \
    --arg date "2025-11-12" \
    --arg time "08:00" \
    --arg duration "45 min" \
    --arg distance "35 km" \
    --arg vehicleId "vehicle-123" \
    --arg rideType "standard" \
    --arg paymentMethod "Visa" \
    --arg city "Cartago" \
    '{
        driverId:$driverId,
        status:$status,
        from:$from,
        to:$to,
        fromCoordinates:{lat:9.93, lng:-84.08},
        toCoordinates:{lat:9.85, lng:-83.91},
        date:$date,
        time:$time,
        duration:$duration,
        distance:$distance,
        price:5500,
        vehicleId:$vehicleId,
        rideType:$rideType,
        paymentMethod:$paymentMethod,
        city:$city
    }'
)

trip=$(curl -s -X POST http://localhost:3002/api/trips \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $token" \
    -d "$tripBody")

if echo "$trip" | jq -e '.data.trip' > /dev/null 2>&1; then
    from=$(echo "$trip" | jq -r '.data.trip.from')
    to=$(echo "$trip" | jq -r '.data.trip.to')
    price=$(echo "$trip" | jq -r '.data.trip.price')

    echo -e "\e[32m✅ Trip Created: $from → $to\e[0m"
    echo -e "   Price: ₡$price"
else
    echo -e "\e[31m❌ Trip Creation Failed\e[0m"
fi
echo ""

echo -e "\e[36m✅ All tests completed!\e[0m"
echo -e "\e[34mVisit http://localhost:3002/api-docs for Swagger documentation\e[0m"
