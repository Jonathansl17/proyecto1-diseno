import { User, Trip, Driver, Rating, Payment, Vehicle } from '../types';

// In-memory database (replace with real database in production)
export class Database {
  private static users: User[] = [];
  private static trips: Trip[] = [];
  private static drivers: Driver[] = [];
  private static ratings: Rating[] = [];
  private static payments: Payment[] = [];
  private static vehicles: Vehicle[] = [];

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
