import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Proyecto1-Diseño API - Sistema de Gestión de Viajes',
      version: '1.0.0',
      description: `
# Proyecto1-Diseño - API REST para Sistema de Gestión de Viajes Compartidos

## Descripción del Proyecto
API REST completa desarrollada para el curso de Diseño de Software.
Sistema de gestión de viajes compartidos con autenticación JWT, patrón Repository 
y arquitectura lista para despliegue en Azure.

## Características Técnicas
- 🔐 **Autenticación JWT** con tokens seguros y bcrypt
- 📊 **32 Endpoints RESTful** organizados en 8 módulos
- 🏗️ **Patrón Repository** para abstracción de datos
- ✅ **Validación** de datos con express-validator
- 🛡️ **Manejo de errores** centralizado
- 📈 **Analytics** y reportes en tiempo real
- 🎨 **Frontend Next.js 15** con TypeScript y Tailwind CSS

## Módulos del Sistema
- **Authentication**: Registro y login de usuarios con JWT
- **Trips**: Gestión completa de viajes (CRUD)
- **Users**: Administración de usuarios y perfiles
- **Drivers**: Gestión de conductores y vehículos
- **Ratings**: Sistema de calificaciones bidireccional
- **Payments**: Procesamiento y registro de pagos
- **Analytics**: Estadísticas y métricas del sistema
- **Vehicles**: Gestión de vehículos asignados

## Cómo usar esta API
1. Registra un usuario con \`POST /api/auth/register\`
2. Obtén tu token JWT con \`POST /api/auth/login\`
3. Haz click en **Authorize** 🔒 (arriba a la derecha) y pega tu token
4. ¡Prueba cualquier endpoint protegido!

**Nota**: El token expira en 7 días según la configuración actual.
      `,
      contact: {
        name: 'Proyecto1-Diseño Team',
        email: 'proyecto1@diseño.edu',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: '🟢 Servidor Local Activo - Proyecto1-Diseño (Costa Rica)',
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
            email: { type: 'string', format: 'email', example: 'carlos.rodriguez@proyecto.com' },
            name: { type: 'string', example: 'Carlos Rodríguez Mora' },
            phone: { type: 'string', example: '+506 8765-4321' },
            role: { type: 'string', enum: ['user', 'driver', 'admin'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Driver: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            licenseNumber: { type: 'string', example: 'CR-123456789' },
            vehicleId: { type: 'string', format: 'uuid' },
            rating: { type: 'number', example: 4.8 },
            totalTrips: { type: 'number', example: 156 },
            isAvailable: { type: 'boolean', example: true },
            location: { 
              type: 'object',
              properties: {
                lat: { type: 'number', example: 9.9325 },
                lng: { type: 'number', example: -84.0795 }
              }
            },
          },
        },
        Vehicle: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            driverId: { type: 'string', format: 'uuid' },
            make: { type: 'string', example: 'Toyota' },
            model: { type: 'string', example: 'Corolla' },
            year: { type: 'number', example: 2022 },
            licensePlate: { type: 'string', example: 'SJO-1234' },
            color: { type: 'string', example: 'Gris' },
            capacity: { type: 'number', example: 4 },
            type: { type: 'string', enum: ['sedan', 'suv', 'van'], example: 'sedan' },
          },
        },
        Trip: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            driverId: { type: 'string', format: 'uuid' },
            status: { type: 'string', enum: ['active', 'completed', 'scheduled', 'cancelled'], example: 'completed' },
            from: { type: 'string', example: 'Aeropuerto Juan Santamaría' },
            to: { type: 'string', example: 'TEC Cartago' },
            fromCoordinates: {
              type: 'object',
              properties: {
                lat: { type: 'number', example: 9.9937 },
                lng: { type: 'number', example: -84.2088 }
              }
            },
            toCoordinates: {
              type: 'object',
              properties: {
                lat: { type: 'number', example: 9.8632 },
                lng: { type: 'number', example: -83.9119 }
              }
            },
            date: { type: 'string', format: 'date', example: '2025-11-26' },
            time: { type: 'string', example: '14:30' },
            duration: { type: 'string', example: '50 min' },
            distance: { type: 'string', example: '38.5 km' },
            price: { type: 'number', example: 6200 },
            vehicleId: { type: 'string', format: 'uuid' },
            rideType: { type: 'string', enum: ['standard', 'premium'], example: 'premium' },
            paymentMethod: { type: 'string', example: 'credit_card' },
            city: { type: 'string', example: 'Cartago' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Rating: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            tripId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            driverId: { type: 'string', format: 'uuid' },
            rating: { type: 'number', minimum: 1, maximum: 5, example: 5 },
            comment: { type: 'string', example: 'Excelente conductor, muy amable y puntual. Recomendado 100%.' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Payment: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            tripId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            amount: { type: 'number', example: 6200 },
            method: { type: 'string', enum: ['cash', 'credit_card', 'debit_card', 'paypal'], example: 'credit_card' },
            status: { type: 'string', enum: ['pending', 'completed', 'failed', 'refunded'], example: 'completed' },
            transactionId: { type: 'string', example: 'TXN-CR-20251126-001234' },
            createdAt: { type: 'string', format: 'date-time' },
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
