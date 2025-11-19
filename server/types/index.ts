export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'user' | 'driver' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Trip {
  id: string;
  userId: string;
  driverId: string;
  status: 'active' | 'completed' | 'scheduled' | 'cancelled';
  from: string;
  to: string;
  fromCoordinates: { lat: number; lng: number };
  toCoordinates: { lat: number; lng: number };
  date: string;
  time: string;
  duration: string;
  distance: string;
  price: number;
  vehicleId: string;
  rideType: 'standard' | 'premium';
  paymentMethod: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Driver {
  id: string;
  userId: string;
  name: string;
  rating: number;
  totalTrips: number;
  vehicleId: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: string;
  tripId: string;
  userId: string;
  driverId: string;
  score: number;
  comment: string;
  createdAt: Date;
}

export interface Payment {
  id: string;
  tripId: string;
  userId: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vehicle {
  id: string;
  driverId: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string;
  type: 'standard' | 'premium';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends AuthRequest {
  name: string;
  phone: string;
  role?: 'user' | 'driver';
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}
