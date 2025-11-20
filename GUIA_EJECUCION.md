# 🚀 Guía de Ejecución - Proyecto1-Diseño

## 📋 Requisitos Previos
- Node.js v18 o superior
- npm v9 o superior
- PowerShell (Windows)

---
##TOKEN JWT PARA SWAGGER:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NWY0MzE5Yy03NDQyLTRjODUtYjhiOS02N2RmMTliMDVlZGEiLCJlbWFpbCI6ImFkbWluQHByb3llY3RvLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MzYwMjUxOCwiZXhwIjoxNzY0MjA3MzE4fQ.3LKmCxhRoj8KpK3UjAUjggMEjrq3--c3Ky78GkNBTl8

## 🔧 PASO 1: Instalar Dependencias

Ejecutar en la raíz del proyecto:

```bash
npm install
```

Esto instalará todas las dependencias del frontend y backend.

---

## 🖥️ PASO 2: Iniciar el Backend (Puerto 3002)

### Opción A - Script Automatizado (Recomendado)
```powershell
.\start-server.ps1
```

### Opción B - Comando Manual
```bash
npm run server:dev
```

### ✅ Verificar que el backend está corriendo:
- **API REST:** `http://localhost:3002`
- **Swagger UI:** `http://localhost:3002/api-docs`
- **Health Check:** `http://localhost:3002/health`

---

## 🌐 PASO 3: Iniciar el Frontend (Puerto 3000)

En una **NUEVA terminal**, ejecutar:

```bash
npm run dev
```

### ✅ Verificar que el frontend está corriendo:
- **Aplicación:** `http://localhost:3000`
- **Login:** `http://localhost:3000/login`
- **Register:** `http://localhost:3000/register`

---

## 🔐 PASO 4: Obtener Token JWT para Swagger

### Opción A - Crear Usuario Nuevo (Recomendado)

```powershell
$body = @{
  email = "admin@proyecto.com"
  password = "Admin123!"
  name = "Administrador"
  phone = "+506 8888-8888"
  role = "admin"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3002/api/auth/register" -Method POST -Body $body -ContentType "application/json"

$token = $response.data.token
Write-Host "`nTOKEN GENERADO:" -ForegroundColor Green
Write-Host $token -ForegroundColor Cyan
```

### Opción B - Login con Usuario Existente

```powershell
$body = @{
  email = "admin@proyecto.com"
  password = "Admin123!"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3002/api/auth/login" -Method POST -Body $body -ContentType "application/json"

$token = $response.data.token
Write-Host "`nTOKEN GENERADO:" -ForegroundColor Green
Write-Host $token -ForegroundColor Cyan
```

### Copiar el Token
El token tendrá este formato:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI...
```

---

## 🔓 PASO 5: Usar Token en Swagger

1. **Abrir Swagger UI:** `http://localhost:3002/api-docs`
2. **Click en el botón "Authorize"** (ícono de candado en la esquina superior derecha)
3. **Pegar el token** en el campo de texto (sin la palabra "Bearer")
4. **Click en "Authorize"** y luego en "Close"
5. **¡Listo!** Ahora puedes probar todos los endpoints protegidos

---

## 📊 Endpoints Disponibles

### 🔓 Endpoints Públicos (Sin autenticación)
```
GET  /health                     - Health check del servidor
GET  /api/drivers                - Lista de conductores
GET  /api/drivers/:id            - Detalles de un conductor
GET  /api/trips                  - Lista de viajes
GET  /api/trips/:id              - Detalles de un viaje
GET  /api/vehicles               - Lista de vehículos
GET  /api/vehicles/:id           - Detalles de un vehículo
GET  /api/ratings                - Lista de calificaciones
GET  /api/ratings/driver/:id     - Calificaciones por conductor
GET  /api/payments               - Lista de pagos
GET  /api/payments/:id           - Detalles de un pago
GET  /api/users                  - Lista de usuarios
GET  /api/users/:id              - Detalles de un usuario
GET  /api/analytics/overview     - Estadísticas generales
GET  /api/analytics/revenue      - Análisis de ingresos
GET  /api/analytics/trips        - Análisis de viajes
GET  /api/demo-data              - Todos los datos de demostración
```

### 🔒 Endpoints Protegidos (Requieren JWT)
```
POST   /api/auth/register        - Registro de usuarios
POST   /api/auth/login           - Inicio de sesión
POST   /api/drivers              - Crear conductor
PUT    /api/drivers/:id          - Actualizar conductor
POST   /api/trips                - Crear viaje
PUT    /api/trips/:id            - Actualizar viaje
DELETE /api/trips/:id            - Cancelar viaje
POST   /api/vehicles             - Crear vehículo
PUT    /api/vehicles/:id         - Actualizar vehículo
POST   /api/ratings              - Crear calificación
POST   /api/payments             - Crear pago
PUT    /api/payments/:id         - Actualizar pago
PUT    /api/users/:id            - Actualizar usuario
DELETE /api/users/:id            - Eliminar usuario (admin)
```

---

## 🗂️ Datos Precargados (Costa Rica)

### 👨‍✈️ Conductores
- Carlos Méndez - 4.9★ (342 viajes)
- Ana Rodríguez - 4.8★ (428 viajes)
- Miguel Castro - 5.0★ (215 viajes)
- Luis Vargas - 4.7★ (156 viajes)
- Patricia Solís - 4.85★ (298 viajes)

### 🚗 Vehículos
- Toyota Yaris 2023 - Standard
- Honda Accord 2024 - Premium
- Nissan Sentra 2023 - Premium
- Hyundai Accent 2022 - Standard
- Honda Civic 2023 - Standard

### 🗺️ Rutas de Ejemplo
- Aeropuerto Juan Santamaría → Hotel Presidente (22.1 km, ₡5,650)
- Centro San José → TEC Cartago (35 km, ₡5,500)
- Casa → Aeropuerto Juan Santamaría (20 km, ₡4,800)
- Mall San Pedro → Casa (7.8 km, ₡2,500)
- UCR San Pedro → TEC Cartago (18 km, ₡4,200)
- San José Centro → Escazú (8.5 km, ₡2,800)
- Y más...

---

## 🧪 Probar el API

### Ejemplo 1: Obtener todos los conductores
```powershell
Invoke-RestMethod -Uri "http://localhost:3002/api/drivers" | ConvertTo-Json -Depth 3
```

### Ejemplo 2: Obtener todos los viajes
```powershell
Invoke-RestMethod -Uri "http://localhost:3002/api/trips" | ConvertTo-Json -Depth 3
```

### Ejemplo 3: Crear un viaje (requiere token)
```powershell
$headers = @{
  "Authorization" = "Bearer YOUR_TOKEN_HERE"
  "Content-Type" = "application/json"
}

$body = @{
  driverId = "driver-uuid"
  status = "scheduled"
  from = "Centro San José"
  to = "TEC Cartago"
  fromCoordinates = @{ lat = 9.93; lng = -84.08 }
  toCoordinates = @{ lat = 9.85; lng = -83.91 }
  date = "2025-11-20"
  time = "08:00"
  duration = "45 min"
  distance = "35 km"
  price = 5500
  vehicleId = "vehicle-uuid"
  rideType = "standard"
  paymentMethod = "credit_card"
  city = "Cartago"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3002/api/trips" -Method POST -Headers $headers -Body $body
```

---

## 📁 Estructura del Proyecto

### Backend (`server/`)
```
server/
├── config/
│   └── swagger.ts          # Configuración de Swagger/OpenAPI
├── controllers/            # Controladores (8 archivos)
├── middlewares/            # Middleware de autenticación
├── repositories/           # Capa de datos (Repository Pattern)
├── routes/                 # Rutas del API (8 archivos)
├── types/                  # Tipos TypeScript
├── utils/                  # Utilidades (JWT, bcrypt)
└── server.ts               # Punto de entrada del servidor
```

### Frontend (`src/`)
```
src/
├── app/                    # Páginas Next.js
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   ├── admin/             # Dashboard administrativo
│   ├── inicio/            # Página principal
│   ├── perfil/            # Perfil de usuario
│   └── wallet/            # Billetera
├── services/              # Servicios de API (10 archivos)
│   ├── api.ts             # Cliente HTTP base
│   ├── authService.ts     # Autenticación
│   ├── tripService.ts     # Viajes
│   ├── driverService.ts   # Conductores
│   └── ...
├── context/
│   └── AuthContext.tsx    # Context de autenticación global
├── components/            # Componentes reutilizables
│   ├── ProtectedRoute.tsx # Protección de rutas
│   ├── Loading.tsx        # Spinner de carga
│   └── ErrorDisplay.tsx   # Manejo de errores
└── config/
    └── env.ts             # Variables de entorno
```

---

## 🔧 Variables de Entorno

### `.env` (Backend)
```env
PORT=3002
JWT_SECRET=tu-secret-key-super-seguro-aqui-2024
JWT_EXPIRATION=7d
```

### `.env` o `.env.local` (Frontend - opcional)
```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

---

## ❗ Solución de Problemas

### El backend no inicia
1. Verificar que el puerto 3002 no esté en uso
2. Ejecutar: `Get-Process -Id (Get-NetTCPConnection -LocalPort 3002).OwningProcess | Stop-Process`
3. Reintentar: `npm run server:dev`

### El frontend no inicia
1. Verificar que el puerto 3000 no esté en uso
2. Eliminar `.next/`: `Remove-Item -Recurse -Force .next`
3. Reintentar: `npm run dev`

### Error de autenticación en Swagger
1. Generar un nuevo token con el script de PowerShell
2. Asegurarse de copiar el token completo
3. NO incluir la palabra "Bearer" al pegar en Swagger

### Endpoints GET no funcionan
- **Nota:** Los endpoints GET son públicos y no requieren autenticación
- Verificar que el backend esté corriendo en `http://localhost:3002`

---

## 📚 Documentación Adicional

- **Swagger/OpenAPI:** `http://localhost:3002/api-docs`
- **README.md:** Documentación general del proyecto
- **Postman Collection:** (Opcional) Importar `Rides_API.postman_collection.json`

---

## 🎯 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollo - Backend
npm run server:dev

# Desarrollo - Frontend  
npm run dev

# Desarrollo - Ambos (si configurado)
npm run dev:all

# Build - Frontend
npm run build

# Build - Backend
npm run build:server

# Linting
npm run lint

# Verificar tipos TypeScript
cd server && npx tsc --noEmit
```

---

## ✅ Checklist de Verificación

- [ ] Dependencias instaladas (`npm install`)
- [ ] Backend corriendo en puerto 3002
- [ ] Frontend corriendo en puerto 3000
- [ ] Swagger accesible en `/api-docs`
- [ ] Token JWT generado
- [ ] Token configurado en Swagger
- [ ] Endpoints GET funcionando sin token
- [ ] Endpoints POST/PUT/DELETE funcionando con token

---

## 🎉 ¡Listo para Usar!

El proyecto está completamente configurado y listo para:
- ✅ Demostración en Swagger
- ✅ Integración con frontend
- ✅ Presentación del proyecto
- ✅ Despliegue a producción

---

**Última actualización:** Noviembre 2025  

