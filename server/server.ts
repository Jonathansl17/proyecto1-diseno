import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from './middlewares/errorHandler';
import { Database } from './repositories/database';
import { checkAzureConnection, initializeCosmosDB } from './config/azure';
import { AzureRepository } from './repositories/azureRepository';

// Routes
import authRoutes from './routes/auth.routes';
import tripRoutes from './routes/trip.routes';
import userRoutes from './routes/user.routes';
import driverRoutes from './routes/driver.routes';
import ratingRoutes from './routes/rating.routes';
import paymentRoutes from './routes/payment.routes';
import analyticsRoutes from './routes/analytics.routes';
import vehicleRoutes from './routes/vehicle.routes';

dotenv.config();

// Determine database mode
const DB_MODE = process.env.DB_MODE || 'memory';
let usingAzure = false;

// Initialize database based on mode
const initializeDatabase = async () => {
  if (DB_MODE === 'azure') {
    try {
      console.log('🔄 Intentando conectar con Azure Cosmos DB...');
      const isConnected = await checkAzureConnection();
      
      if (isConnected) {
        await initializeCosmosDB();
        await AzureRepository.initialize();
        usingAzure = true;
        console.log('✅ Usando Azure Cosmos DB');
      } else {
        console.warn('⚠️  Azure no disponible, usando base de datos en memoria');
        Database.initialize();
      }
    } catch (error) {
      console.error('❌ Error conectando con Azure:', error);
      console.log('⚠️  Fallback a base de datos en memoria');
      Database.initialize();
    }
  } else {
    console.log('📦 Usando base de datos en memoria');
    Database.initialize();
  }
};

// Initialize database
initializeDatabase();

const app: Application = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Rides API is running',
    database: usingAzure ? 'Azure Cosmos DB' : 'In-Memory',
    timestamp: new Date().toISOString()
  });
});

// Public endpoint to view sample data (no authentication required)
app.get('/api/demo-data', (req, res) => {
  const drivers = Database.getAllDrivers();
  const trips = Database.getAllTrips();
  const vehicles = Database.getAllVehicles();
  const ratings = Database.getAllRatings();
  const payments = Database.getAllPayments();

  res.status(200).json({
    status: 'success',
    message: 'Datos de demostración del sistema',
    data: {
      stats: {
        totalDrivers: drivers.length,
        totalTrips: trips.length,
        totalVehicles: vehicles.length,
        totalRatings: ratings.length,
        totalPayments: payments.length,
      },
      drivers: drivers.map(d => ({
        id: d.id,
        name: d.name,
        rating: d.rating,
        totalTrips: d.totalTrips,
        isAvailable: d.isAvailable,
      })),
      trips: trips.slice(0, 10).map(t => ({
        id: t.id,
        from: t.from,
        to: t.to,
        distance: t.distance,
        duration: t.duration,
        price: t.price,
        status: t.status,
        date: t.date,
      })),
      vehicles: vehicles.map(v => ({
        id: v.id,
        brand: v.brand,
        model: v.model,
        year: v.year,
        plate: v.plate,
        color: v.color,
        type: v.type,
      })),
      popularRoutes: [
        { route: 'CDMX → Guadalajara', trips: trips.filter(t => t.from.includes('México') && t.to.includes('Guadalajara')).length },
        { route: 'CDMX → Monterrey', trips: trips.filter(t => t.from.includes('México') && t.to.includes('Monterrey')).length },
        { route: 'Guadalajara → Puerto Vallarta', trips: trips.filter(t => t.from.includes('Guadalajara') && t.to.includes('Puerto Vallarta')).length },
        { route: 'Monterrey → Saltillo', trips: trips.filter(t => t.from.includes('Monterrey') && t.to.includes('Saltillo')).length },
      ].filter(r => r.trips > 0),
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;
