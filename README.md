# 🚗 Rides App - Sistema de Gestión de Viajes

Aplicación completa de gestión de viajes con **Next.js (frontend)** y **Express (backend)**.

## 📋 Descripción

Sistema full-stack que combina:
- **Frontend**: Next.js 15 con React 19, TypeScript, Tailwind CSS y integración completa con el API
- **Backend**: Express API REST con autenticación JWT, documentación Swagger y 32 endpoints
- **Integración**: 8 servicios TypeScript, Context API para autenticación global

## 🌟 Características

### Frontend
- ✅ **Autenticación completa** con JWT y React Context
- ✅ **Dashboard interactivo** con estadísticas en tiempo real
- 📊 **Gráficos y analíticas** con Recharts
- ⭐ **Sistema de calificaciones** mejorado
- 📅 **Timeline visual** de viajes
- 🎨 **UI moderna** con Tailwind CSS 4
- 📱 **Diseño responsive**
- 🔐 **Rutas protegidas** con middleware de autenticación
- 🆕 **Páginas de Login y Registro**

### Backend API
- ✅ **32 Endpoints RESTful** organizados en 8 módulos
- 🔐 **Autenticación JWT** con bcrypt
- 📚 **Documentación Swagger** interactiva (OpenAPI 3.0)
- 🏗️ **Repository Pattern** implementado
- 🛡️ **Validación y manejo de errores**
- ☁️ **Listo para Azure** con GitHub Actions
- 🔄 **CORS configurado**
- 🗄️ **In-memory database** (fácil migración a PostgreSQL)

### Integración Frontend-Backend
- ✅ **8 Servicios TypeScript** para consumir el API
- ✅ **AuthContext** para gestión global de autenticación
- ✅ **Componentes reutilizables** (Loading, ErrorDisplay, ProtectedRoute)
- ✅ **Variables de entorno** configuradas
- ✅ **Token JWT** guardado en localStorage

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 20.x o superior
- npm

### Instalación

```bash
# Instalar dependencias
npm install
```

### Ejecución

**Terminal 1 - Backend:**
```bash
npm run server:dev
```
Abre [http://localhost:3002/api-docs](http://localhost:3002/api-docs) para Swagger

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) para ver el frontend

## 📚 Documentación

- **[GUIA_EJECUCION.md](./GUIA_EJECUCION.md)**: Guía completa de ejecución paso a paso
  - Instalación de dependencias
  - Iniciar backend y frontend
  - Generar tokens JWT
  - Uso de Swagger
  - Ejemplos de pruebas
  
- **[AZURE_INTEGRATION.md](./AZURE_INTEGRATION.md)**: Integración con Azure Cosmos DB
  - Configuración automática y manual
  - Modo dual (Memory/Azure)
  - Políticas de seguridad
  - Costos y monitoreo

- **[DESPLIEGUE_AZURE.md](./DESPLIEGUE_AZURE.md)**: Guía completa de despliegue en Azure
  - Azure CLI y recursos
  - App Service deployment
  - Variables de entorno
  - CI/CD con GitHub Actions

## 🛠️ Tecnologías

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React

### Backend
- Node.js + Express
- TypeScript
- JWT (jsonwebtoken)
- Swagger UI Express
- bcryptjs
- CORS

### DevOps
- Azure App Service
- GitHub Actions
- tsx / nodemon

## 📁 Estructura del Proyecto

```
proyecto1-diseno/
├── src/
│   └── app/              # Frontend Next.js
│       ├── admin/        # Dashboard de administrador
│       ├── inicio/       # Página de inicio
│       ├── perfil/       # Perfil de usuario
│       └── wallet/       # Billetera
├── server/
│   ├── config/           # Configuración (Swagger)
│   ├── controllers/      # Controladores (8)
│   ├── middlewares/      # Auth, Error handling
│   ├── repositories/     # Repository pattern
│   ├── routes/           # Rutas (8 módulos)
│   ├── types/            # TypeScript types
│   └── server.ts         # Entry point
├── .github/workflows/    # CI/CD
├── GUIA_EJECUCION.md     # Guía de ejecución
├── AZURE_INTEGRATION.md  # Integración Azure
├── DESPLIEGUE_AZURE.md   # Guía de deploy
├── setup-azure.ps1       # Script Azure automático
└── package.json
```

## 🔌 API Endpoints

El API cuenta con **32 endpoints** organizados en 8 módulos:

- **Authentication** (2): Register, Login
- **Trips** (5): CRUD + List
- **Users** (4): CRUD con autorización
- **Drivers** (4): Gestión de conductores
- **Ratings** (3): Sistema de calificaciones
- **Payments** (4): Procesamiento de pagos
- **Analytics** (3): Estadísticas y métricas
- **Vehicles** (4): Gestión de vehículos
- **Health** (1): Health check

Ver [GUIA_EJECUCION.md](./GUIA_EJECUCION.md) para detalles completos de los endpoints.

## 🔐 Autenticación

```bash
# Registro
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "securePass123",
  "name": "John Doe",
  "phone": "+506 8888-8888"
}

# Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securePass123"
}

# Usar el token
GET /api/trips
Authorization: Bearer <token>
```

## 🧪 Testing

```bash
# Test con Swagger UI (Recomendado)
Abrir: http://localhost:3002/api-docs

# Test manual con PowerShell
Invoke-RestMethod -Uri http://localhost:3002/api/trips -Method GET
```

## 🏗️ Patrón de Diseño: Repository

El proyecto implementa el **patrón Repository** para abstraer la lógica de acceso a datos:

### Ventajas:
- ✅ Separación de responsabilidades
- ✅ Testabilidad (fácil de mockear)
- ✅ Escalabilidad (cambiar BD sin afectar lógica)
- ✅ Mantenibilidad

### Estructura:
```
Routes → Controllers → Repository → Data Layer
```

Esta arquitectura permite cambiar la base de datos (de in-memory a Azure Cosmos DB) sin modificar los controladores.

## ☁️ Deploy en Azure

```bash
# Crear recursos
az webapp create --resource-group rides-api-rg --plan rides-api-plan --name rides-api-yourname --runtime "NODE:20-lts"

# Configurar variables
az webapp config appsettings set --resource-group rides-api-rg --name rides-api-yourname --settings JWT_SECRET="prod-secret"

# Desplegar
az webapp deployment source config --name rides-api-yourname --resource-group rides-api-rg --repo-url https://github.com/YOUR_REPO --branch master
```

Ver guía completa en [DESPLIEGUE_AZURE.md](./DESPLIEGUE_AZURE.md) y [AZURE_INTEGRATION.md](./AZURE_INTEGRATION.md)

## 📊 Scripts Disponibles

```bash
# Frontend
npm run dev          # Desarrollo Next.js
npm run build        # Build producción
npm run start        # Iniciar producción

# Backend
npm run server       # Iniciar API
npm run server:dev   # Desarrollo con watch
npm run server:watch # Watch mode
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/amazing-feature`)
3. Commit cambios usando **Conventional Commits**:
   - `feat:` nuevas funcionalidades
   - `fix:` correcciones de errores
   - `docs:` cambios en documentación
   - `refactor:` refactorización de código
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto es para uso educativo - Curso de Diseño de Software.

## 👨‍💻 Autor

Proyecto desarrollado por Jonathan para el curso de Diseño de Software.

## 🔗 Enlaces Útiles

- **[Swagger Documentation](http://localhost:3002/api-docs)** - API interactiva
- **[GUIA_EJECUCION.md](./GUIA_EJECUCION.md)** - Guía completa de ejecución
- **[AZURE_INTEGRATION.md](./AZURE_INTEGRATION.md)** - Integración Azure Cosmos DB
- **[DESPLIEGUE_AZURE.md](./DESPLIEGUE_AZURE.md)** - Despliegue en Azure
- **[GitHub Repository](https://github.com/Jonathansl17/proyecto1-diseno)** - Código fuente

---

⭐ Proyecto desarrollado para el curso de Diseño de Software - TEC Costa Rica
