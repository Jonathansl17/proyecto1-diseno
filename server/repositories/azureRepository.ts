/**
 * Azure Cosmos DB Repository
 * Implementación del patrón Repository usando Azure Cosmos DB
 */

import { Container } from '@azure/cosmos';
import { User, Trip, Driver, Rating, Payment, Vehicle } from '../types';
import { getCosmosClient, azureConfig } from '../config/azure';

export class AzureRepository {
  private static container: Container | null = null;

  // Initialize container
  static async initialize() {
    try {
      const client = getCosmosClient();
      const database = client.database(azureConfig.databaseId);
      this.container = database.container(azureConfig.containerId);
      
      console.log('✅ Azure Repository inicializado');
    } catch (error) {
      console.error('❌ Error inicializando Azure Repository:', error);
      throw error;
    }
  }

  private static getContainer(): Container {
    if (!this.container) {
      throw new Error('Azure Repository no inicializado');
    }
    return this.container;
  }

  // Generic CRUD operations
  static async create<T>(item: T & { id: string; type: string }): Promise<T> {
    const container = this.getContainer();
    const { resource } = await container.items.create(item);
    return resource as T;
  }

  static async findById<T>(id: string, type: string): Promise<T | null> {
    try {
      const container = this.getContainer();
      const { resource } = await container.item(id, type).read();
      return resource as T;
    } catch (error: any) {
      if (error.code === 404) {
        return null;
      }
      throw error;
    }
  }

  static async findAll<T>(type: string): Promise<T[]> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.type = @type',
      parameters: [{ name: '@type', value: type }],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources as T[];
  }

  static async update<T>(id: string, type: string, item: Partial<T>): Promise<T> {
    const container = this.getContainer();
    const existing = await this.findById<any>(id, type);
    
    if (!existing) {
      throw new Error(`Item with id ${id} not found`);
    }
    
    const updated = { ...existing, ...item, updatedAt: new Date() };
    const { resource } = await container.item(id, type).replace(updated);
    return resource as T;
  }

  static async delete(id: string, type: string): Promise<void> {
    const container = this.getContainer();
    await container.item(id, type).delete();
  }

  // Specific queries for each entity
  
  // Users
  static async findUserByEmail(email: string): Promise<User | null> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.type = @type AND c.email = @email',
      parameters: [
        { name: '@type', value: 'user' },
        { name: '@email', value: email },
      ],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources.length > 0 ? (resources[0] as User) : null;
  }

  // Drivers
  static async findDriverByUserId(userId: string): Promise<Driver | null> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.type = @type AND c.userId = @userId',
      parameters: [
        { name: '@type', value: 'driver' },
        { name: '@userId', value: userId },
      ],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources.length > 0 ? (resources[0] as Driver) : null;
  }

  static async findAvailableDrivers(): Promise<Driver[]> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.type = @type AND c.isAvailable = true',
      parameters: [{ name: '@type', value: 'driver' }],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources as Driver[];
  }

  // Trips
  static async findTripsByUserId(userId: string): Promise<Trip[]> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.type = @type AND c.userId = @userId ORDER BY c.createdAt DESC',
      parameters: [
        { name: '@type', value: 'trip' },
        { name: '@userId', value: userId },
      ],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources as Trip[];
  }

  static async findTripsByDriverId(driverId: string): Promise<Trip[]> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.type = @type AND c.driverId = @driverId ORDER BY c.createdAt DESC',
      parameters: [
        { name: '@type', value: 'trip' },
        { name: '@driverId', value: driverId },
      ],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources as Trip[];
  }

  static async findTripsByStatus(status: string): Promise<Trip[]> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.type = @type AND c.status = @status',
      parameters: [
        { name: '@type', value: 'trip' },
        { name: '@status', value: status },
      ],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources as Trip[];
  }

  // Ratings
  static async findRatingsByDriverId(driverId: string): Promise<Rating[]> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.type = @type AND c.driverId = @driverId',
      parameters: [
        { name: '@type', value: 'rating' },
        { name: '@driverId', value: driverId },
      ],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources as Rating[];
  }

  // Payments
  static async findPaymentsByUserId(userId: string): Promise<Payment[]> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.type = @type AND c.userId = @userId',
      parameters: [
        { name: '@type', value: 'payment' },
        { name: '@userId', value: userId },
      ],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources as Payment[];
  }

  // Vehicles
  static async findVehicleByDriverId(driverId: string): Promise<Vehicle | null> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.type = @type AND c.driverId = @driverId',
      parameters: [
        { name: '@type', value: 'vehicle' },
        { name: '@driverId', value: driverId },
      ],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources.length > 0 ? (resources[0] as Vehicle) : null;
  }

  // Analytics queries
  static async getCompletedTripsCount(): Promise<number> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT VALUE COUNT(1) FROM c WHERE c.type = @type AND c.status = @status',
      parameters: [
        { name: '@type', value: 'trip' },
        { name: '@status', value: 'completed' },
      ],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources[0] || 0;
  }

  static async getTotalRevenue(): Promise<number> {
    const container = this.getContainer();
    const querySpec = {
      query: 'SELECT VALUE SUM(c.amount) FROM c WHERE c.type = @type AND c.status = @status',
      parameters: [
        { name: '@type', value: 'payment' },
        { name: '@status', value: 'completed' },
      ],
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources[0] || 0;
  }
}
