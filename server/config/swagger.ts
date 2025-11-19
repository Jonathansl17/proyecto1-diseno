import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rides API - Sistema de Gestión de Viajes',
      version: '1.0.0',
      description: `
# API REST para Sistema de Gestión de Viajes Compartidos

## Descripción
API completa para gestión de viajes, usuarios, conductores, pagos y analíticas.
Implementa autenticación JWT, patrón Repository y está lista para despliegue en Azure.

## Características
- 🔐 **Autenticación JWT** con tokens seguros
- 📊 **32 Endpoints** organizados en 8 módulos
- 🏗️ **Patrón Repository** para abstracción de datos
- ✅ **Validación** de datos en todos los endpoints
- 🛡️ **Manejo de errores** centralizado
- 📈 **Analytics** y reportes

## Módulos
- **Authentication**: Registro y login de usuarios
- **Trips**: Gestión completa de viajes (CRUD)
- **Users**: Administración de usuarios
- **Drivers**: Gestión de conductores
- **Ratings**: Sistema de calificaciones
- **Payments**: Procesamiento de pagos
- **Analytics**: Estadísticas y métricas
- **Vehicles**: Gestión de vehículos

## Cómo usar
1. Registra un usuario con \`POST /api/auth/register\`
2. Obtén tu token con \`POST /api/auth/login\`
3. Haz click en **Authorize** 🔒 y pega tu token
4. ¡Prueba cualquier endpoint protegido!
      `,
      contact: {
        name: 'API Support',
        email: 'support@rides.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Servidor de Desarrollo Local',
      },
      {
        url: 'https://your-azure-app.azurewebsites.net',
        description: 'Servidor de Producción (Azure)',
      },
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'Endpoints de autenticación y autorización',
      },
      {
        name: 'Trips',
        description: 'Gestión de viajes (CRUD completo)',
      },
      {
        name: 'Users',
        description: 'Administración de usuarios del sistema',
      },
      {
        name: 'Drivers',
        description: 'Gestión de conductores y su información',
      },
      {
        name: 'Ratings',
        description: 'Sistema de calificaciones para conductores',
      },
      {
        name: 'Payments',
        description: 'Procesamiento y gestión de pagos',
      },
      {
        name: 'Analytics',
        description: 'Estadísticas, métricas y reportes',
      },
      {
        name: 'Vehicles',
        description: 'Gestión de vehículos registrados',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingresa el token JWT obtenido del endpoint de login. Formato: Bearer {token}',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            name: { type: 'string', example: 'John Doe' },
            phone: { type: 'string', example: '+506 8888-8888' },
            role: { type: 'string', enum: ['user', 'driver', 'admin'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Trip: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            driverId: { type: 'string', format: 'uuid' },
            status: { type: 'string', enum: ['active', 'completed', 'scheduled', 'cancelled'] },
            from: { type: 'string', example: 'Centro San José' },
            to: { type: 'string', example: 'TEC Cartago' },
            date: { type: 'string', format: 'date', example: '2025-11-12' },
            time: { type: 'string', example: '08:00' },
            duration: { type: 'string', example: '45 min' },
            distance: { type: 'string', example: '35 km' },
            price: { type: 'number', example: 5500 },
            rideType: { type: 'string', enum: ['standard', 'premium'] },
            paymentMethod: { type: 'string', example: 'Visa' },
            city: { type: 'string', example: 'Cartago' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'Error description' },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            data: { type: 'object' },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'No autorizado - Token inválido o ausente',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        NotFoundError: {
          description: 'Recurso no encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        BadRequestError: {
          description: 'Petición inválida',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./server/routes/*.ts', './server/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
