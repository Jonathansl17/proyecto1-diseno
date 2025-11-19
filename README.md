# 🚗 Rides - Sistema de Gestión de Viajes Compartidos

Aplicación completa de gestión de viajes con Frontend Next.js y Backend API REST.

## 📋 Descripción

Sistema full-stack que combina:
- **Frontend**: Aplicación Next.js con React 19, TypeScript y Tailwind CSS
- **Backend**: API REST con autenticación JWT, documentación Swagger y 32+ endpoints

## 🌟 Características

### Frontend
- ✅ Dashboard interactivo con estadísticas en tiempo real
- 📊 Gráficos y analíticas con Recharts
- ⭐ Sistema de calificaciones mejorado
- 📅 Timeline visual de viajes
- 🎨 UI moderna con Tailwind CSS
- 📱 Diseño responsive

### Backend API
- ✅ 32+ Endpoints RESTful
- 🔐 Autenticación JWT completa
- 📚 Documentación Swagger interactiva
- 🏗️ Patrón Repository implementado
- 🛡️ Validación y manejo de errores
- ☁️ Listo para deploy en Azure
- 🔄 CORS configurado

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 20.x o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Jonathansl17/proyecto1-diseno.git
cd proyecto1-diseno

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

### Ejecutar el Proyecto

#### Frontend Next.js
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) para ver el frontend

#### Backend API
```bash
npm run server:dev
```
Abre [http://localhost:3002/api-docs](http://localhost:3002/api-docs) para Swagger

## 📚 Documentación

### Documentación del API
- **[API_README.md](./API_README.md)**: Documentación completa del backend
  - Lista de todos los endpoints
  - Ejemplos de uso
  - Justificación del patrón Repository
  
### Deployment
- **[AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md)**: Guía de despliegue en Azure
  - Comandos Azure CLI
  - Configuración de políticas
  - CI/CD con GitHub Actions

### Git & Commits
- **[GIT_COMMITS_GUIDE.md](./GIT_COMMITS_GUIDE.md)**: Guía de commits estructurados
  - Conventional Commits
  - Ejemplos específicos del proyecto
  - Workflow completo

### Resumen del Proyecto
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**: Resumen ejecutivo
  - Cumplimiento de requisitos
  - Métricas del proyecto
  - Notas para defensa

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
│   ├── routes/           # Rutas (8)
│   ├── types/            # TypeScript types
│   └── server.ts         # Entry point
├── public/               # Assets estáticos
├── azure/                # Configuración Azure
├── .github/workflows/    # CI/CD
├── API_README.md         # Docs del API
├── AZURE_DEPLOYMENT.md   # Guía de deploy
├── GIT_COMMITS_GUIDE.md  # Guía de commits
├── PROJECT_SUMMARY.md    # Resumen ejecutivo
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

Ver [API_README.md](./API_README.md) para detalles completos.

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
# Test manual con PowerShell
.\test-api.ps1

# Test con Postman
# Importar: Rides_API.postman_collection.json

# Test con Swagger UI
# Abrir: http://localhost:3002/api-docs
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

Ver justificación completa en [API_README.md](./API_README.md#arquitectura-y-patrones-de-diseño)

## ☁️ Deploy en Azure

```bash
# Crear recursos
az webapp create --resource-group rides-api-rg --plan rides-api-plan --name rides-api-yourname --runtime "NODE:20-lts"

# Configurar variables
az webapp config appsettings set --resource-group rides-api-rg --name rides-api-yourname --settings JWT_SECRET="prod-secret"

# Desplegar
az webapp deployment source config --name rides-api-yourname --resource-group rides-api-rg --repo-url https://github.com/YOUR_REPO --branch master
```

Ver guía completa en [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md)

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
3. Commit cambios (`git commit -m 'feat: add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

Ver [GIT_COMMITS_GUIDE.md](./GIT_COMMITS_GUIDE.md) para nomenclatura de commits.

## 📄 Licencia

Este proyecto es para uso educativo - Curso de Diseño de Software.

## 👨‍💻 Autor

Proyecto desarrollado por Jonathan para el curso de Diseño de Software.

## 🔗 Enlaces Útiles

- [Swagger Documentation](http://localhost:3002/api-docs) - Documentación interactiva
- [API README](./API_README.md) - Documentación completa del backend
- [Azure Deployment](./AZURE_DEPLOYMENT.md) - Guía de despliegue
- [Git Commits Guide](./GIT_COMMITS_GUIDE.md) - Guía de commits
- [Project Summary](./PROJECT_SUMMARY.md) - Resumen ejecutivo

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
