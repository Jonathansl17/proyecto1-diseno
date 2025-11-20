import { User, Trip, Driver, Rating, Payment, Vehicle } from '../types';
import { v4 as uuidv4 } from 'uuid';

// In-memory database with seed data (replace with real database in production)
export class Database {
  private static users: User[] = [];
  private static trips: Trip[] = [];
  private static drivers: Driver[] = [];
  private static ratings: Rating[] = [];
  private static payments: Payment[] = [];
  private static vehicles: Vehicle[] = [];
  private static initialized = false;

  // Initialize database with seed data
  static initialize() {
    if (this.initialized) return;
    
    // Seed Drivers (Costa Rica)
    const driver1: Driver = {
      id: uuidv4(),
      userId: uuidv4(),
      name: 'Carlos Méndez',
      vehicleId: uuidv4(),
      isAvailable: true,
      rating: 4.9,
      totalTrips: 342,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
    };
    
    const driver2: Driver = {
      id: uuidv4(),
      userId: uuidv4(),
      name: 'Ana Rodríguez',
      vehicleId: uuidv4(),
      isAvailable: true,
      rating: 4.8,
      totalTrips: 428,
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date(),
    };
    
    const driver3: Driver = {
      id: uuidv4(),
      userId: uuidv4(),
      name: 'Miguel Castro',
      vehicleId: uuidv4(),
      isAvailable: true,
      rating: 5.0,
      totalTrips: 215,
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date(),
    };
    
    const driver4: Driver = {
      id: uuidv4(),
      userId: uuidv4(),
      name: 'Luis Vargas',
      vehicleId: uuidv4(),
      isAvailable: true,
      rating: 4.7,
      totalTrips: 156,
      createdAt: new Date('2024-04-05'),
      updatedAt: new Date(),
    };

    const driver5: Driver = {
      id: uuidv4(),
      userId: uuidv4(),
      name: 'Patricia Solís',
      vehicleId: uuidv4(),
      isAvailable: true,
      rating: 4.85,
      totalTrips: 298,
      createdAt: new Date('2024-05-12'),
      updatedAt: new Date(),
    };

    this.drivers.push(driver1, driver2, driver3, driver4, driver5);

    // Seed Vehicles
    const vehicles: Vehicle[] = [
      {
        id: driver1.vehicleId,
        driverId: driver1.id,
        brand: 'Toyota',
        model: 'Yaris',
        year: 2023,
        plate: 'ABC-123',
        color: 'Plata',
        type: 'standard',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date(),
      },
      {
        id: driver2.vehicleId,
        driverId: driver2.id,
        brand: 'Honda',
        model: 'Accord',
        year: 2024,
        plate: 'XYZ-789',
        color: 'Negro',
        type: 'premium',
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date(),
      },
      {
        id: driver3.vehicleId,
        driverId: driver3.id,
        brand: 'Nissan',
        model: 'Sentra',
        year: 2023,
        plate: 'DEF-456',
        color: 'Blanco',
        type: 'premium',
        createdAt: new Date('2024-03-20'),
        updatedAt: new Date(),
      },
      {
        id: driver4.vehicleId,
        driverId: driver4.id,
        brand: 'Hyundai',
        model: 'Accent',
        year: 2022,
        plate: 'GHI-321',
        color: 'Azul',
        type: 'standard',
        createdAt: new Date('2024-04-05'),
        updatedAt: new Date(),
      },
      {
        id: driver5.vehicleId,
        driverId: driver5.id,
        brand: 'Honda',
        model: 'Civic',
        year: 2023,
        plate: 'JKL-654',
        color: 'Gris',
        type: 'standard',
        createdAt: new Date('2024-05-12'),
        updatedAt: new Date(),
      },
    ];

    this.vehicles.push(...vehicles);

    // Seed Trips - Rutas populares de Costa Rica
    const popularRoutes = [
      { from: 'Aeropuerto Juan Santamaría', to: 'Hotel Presidente', distance: '22.1 km', duration: '35 min', price: 5650, city: 'Alajuela' },
      { from: 'Centro San José', to: 'TEC Cartago', distance: '35 km', duration: '45 min', price: 5500, city: 'Cartago' },
      { from: 'Casa', to: 'Aeropuerto Juan Santamaría', distance: '20 km', duration: '30 min', price: 4800, city: 'Alajuela' },
      { from: 'Mall San Pedro', to: 'Casa', distance: '7.8 km', duration: '15 min', price: 2500, city: 'San José' },
      { from: 'Hotel Presidente', to: 'Aeropuerto Juan Santamaría', distance: '23.5 km', duration: '40 min', price: 5900, city: 'Alajuela' },
      { from: 'Casa', to: 'Centro de San José', distance: '10.0 km', duration: '20 min', price: 3100, city: 'San José' },
      { from: 'UCR San Pedro', to: 'TEC Cartago', distance: '18 km', duration: '25 min', price: 4200, city: 'Cartago' },
      { from: 'Aeropuerto Juan Santamaría', to: 'Casa', distance: '22.0 km', duration: '35 min', price: 5700, city: 'Alajuela' },
      { from: 'San José Centro', to: 'Escazú', distance: '8.5 km', duration: '18 min', price: 2800, city: 'San José' },
      { from: 'Heredia Centro', to: 'Barva', distance: '5.2 km', duration: '12 min', price: 2000, city: 'Heredia' },
      { from: 'Alajuela Centro', to: 'Grecia', distance: '15 km', duration: '22 min', price: 3500, city: 'Alajuela' },
      { from: 'Cartago Centro', to: 'Paraíso', distance: '8 km', duration: '15 min', price: 2400, city: 'Cartago' },
      { from: 'San José', to: 'Curridabat', distance: '6.5 km', duration: '14 min', price: 2200, city: 'San José' },
      { from: 'Zapote', to: 'Los Yoses', distance: '3.2 km', duration: '10 min', price: 1800, city: 'San José' },
      { from: 'Sabana', to: 'Pavas', distance: '5.8 km', duration: '12 min', price: 2100, city: 'San José' },
    ];

    const trips: Trip[] = [];
    const now = new Date();
    
    // Generar 20 viajes de ejemplo
    for (let i = 0; i < 20; i++) {
      const route = popularRoutes[i % popularRoutes.length];
      const driver = this.drivers[i % 4]; // Usar los primeros 4 conductores
      const daysAgo = Math.floor(Math.random() * 30);
      const statuses: Trip['status'][] = ['completed', 'completed', 'completed', 'active', 'scheduled'];
      const rideTypes: Trip['rideType'][] = ['standard', 'premium'];
      
      const tripDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      
      trips.push({
        id: uuidv4(),
        userId: uuidv4(),
        driverId: driver.id,
        status: statuses[i % statuses.length],
        from: route.from,
        to: route.to,
        fromCoordinates: { lat: 9.93 + Math.random() * 0.1, lng: -84.08 + Math.random() * 0.1 },
        toCoordinates: { lat: 9.85 + Math.random() * 0.1, lng: -83.91 + Math.random() * 0.1 },
        date: tripDate.toISOString().split('T')[0],
        time: `${8 + Math.floor(Math.random() * 12)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        duration: route.duration,
        distance: route.distance,
        price: route.price,
        vehicleId: driver.vehicleId,
        rideType: rideTypes[i % 2],
        paymentMethod: ['credit_card', 'debit_card', 'cash', 'paypal'][i % 4],
        city: route.city,
        createdAt: tripDate,
        updatedAt: new Date(),
      });
    }

    this.trips.push(...trips);

    // Seed Ratings para los conductores
    const completedTrips = trips.filter(t => t.status === 'completed');
    completedTrips.forEach((trip, index) => {
      if (index % 2 === 0) { // Calificar algunos viajes
        const scores = [4.5, 4.7, 4.8, 4.9, 5.0, 4.6, 4.8, 4.9];
        const comments = [
          '¡Excelente conductor! Muy puntual y amable.',
          'Viaje muy cómodo y seguro. Lo recomiendo ampliamente.',
          'Buen servicio, vehículo limpio y conductor profesional.',
          'Muy buena experiencia, llegamos a tiempo sin problemas.',
          'Conductor amable y respetuoso. 5 estrellas sin duda.',
          'Todo perfecto, buen conductor y excelente conversación.',
          'Muy profesional, respeta las señales de tránsito.',
          'Recomendado 100%, vehículo en excelentes condiciones.',
        ];
        
        this.ratings.push({
          id: uuidv4(),
          tripId: trip.id,
          userId: trip.userId,
          driverId: trip.driverId,
          score: scores[index % scores.length],
          comment: comments[index % comments.length],
          createdAt: new Date(trip.createdAt.getTime() + 60 * 60 * 1000),
        });
      }
    });

    // Seed Payments para viajes completados
    completedTrips.forEach((trip) => {
      const methods = ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Efectivo', 'PayPal', 'Transferencia'];
      this.payments.push({
        id: uuidv4(),
        tripId: trip.id,
        userId: trip.userId,
        amount: trip.price,
        method: methods[Math.floor(Math.random() * methods.length)],
        status: 'completed',
        transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        createdAt: trip.createdAt,
        updatedAt: new Date(),
      });
    });

    this.initialized = true;
    console.log('✅ Base de datos inicializada con datos de ejemplo');
    console.log(`   - ${this.drivers.length} conductores`);
    console.log(`   - ${this.vehicles.length} vehículos`);
    console.log(`   - ${this.trips.length} viajes`);
    console.log(`   - ${this.ratings.length} calificaciones`);
    console.log(`   - ${this.payments.length} pagos`);
  }

  // Users
  static getAllUsers(): User[] {
    return this.users;
  }

  static getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  static getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  static createUser(user: User): User {
    this.users.push(user);
    return user;
  }

  static updateUser(id: string, updates: Partial<User>): User | undefined {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return undefined;
    this.users[index] = { ...this.users[index], ...updates, updatedAt: new Date() };
    return this.users[index];
  }

  static deleteUser(id: string): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  // Trips
  static getAllTrips(): Trip[] {
    return this.trips;
  }

  static getTripById(id: string): Trip | undefined {
    return this.trips.find(t => t.id === id);
  }

  static getTripsByUserId(userId: string): Trip[] {
    return this.trips.filter(t => t.userId === userId);
  }

  static getTripsByDriverId(driverId: string): Trip[] {
    return this.trips.filter(t => t.driverId === driverId);
  }

  static createTrip(trip: Trip): Trip {
    this.trips.push(trip);
    return trip;
  }

  static updateTrip(id: string, updates: Partial<Trip>): Trip | undefined {
    const index = this.trips.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    this.trips[index] = { ...this.trips[index], ...updates, updatedAt: new Date() };
    return this.trips[index];
  }

  static deleteTrip(id: string): boolean {
    const index = this.trips.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.trips.splice(index, 1);
    return true;
  }

  // Drivers
  static getAllDrivers(): Driver[] {
    return this.drivers;
  }

  static getDriverById(id: string): Driver | undefined {
    return this.drivers.find(d => d.id === id);
  }

  static createDriver(driver: Driver): Driver {
    this.drivers.push(driver);
    return driver;
  }

  static updateDriver(id: string, updates: Partial<Driver>): Driver | undefined {
    const index = this.drivers.findIndex(d => d.id === id);
    if (index === -1) return undefined;
    this.drivers[index] = { ...this.drivers[index], ...updates, updatedAt: new Date() };
    return this.drivers[index];
  }

  // Ratings
  static getAllRatings(): Rating[] {
    return this.ratings;
  }

  static getRatingsByDriverId(driverId: string): Rating[] {
    return this.ratings.filter(r => r.driverId === driverId);
  }

  static createRating(rating: Rating): Rating {
    this.ratings.push(rating);
    return rating;
  }

  // Payments
  static getAllPayments(): Payment[] {
    return this.payments;
  }

  static getPaymentById(id: string): Payment | undefined {
    return this.payments.find(p => p.id === id);
  }

  static createPayment(payment: Payment): Payment {
    this.payments.push(payment);
    return payment;
  }

  static updatePayment(id: string, updates: Partial<Payment>): Payment | undefined {
    const index = this.payments.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    this.payments[index] = { ...this.payments[index], ...updates, updatedAt: new Date() };
    return this.payments[index];
  }

  // Vehicles
  static getAllVehicles(): Vehicle[] {
    return this.vehicles;
  }

  static getVehicleById(id: string): Vehicle | undefined {
    return this.vehicles.find(v => v.id === id);
  }

  static createVehicle(vehicle: Vehicle): Vehicle {
    this.vehicles.push(vehicle);
    return vehicle;
  }

  static updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | undefined {
    const index = this.vehicles.findIndex(v => v.id === id);
    if (index === -1) return undefined;
    this.vehicles[index] = { ...this.vehicles[index], ...updates, updatedAt: new Date() };
    return this.vehicles[index];
  }
}
