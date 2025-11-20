/**
 * Trip Service - Gestión de viajes
 */

import api from './api';

export interface Trip {
  id: string;
  userId: string;
  driverId?: string;
  origin: string;
  destination: string;
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  fare: number;
  distance: number;
  duration: number;
  vehicleType: string;
  paymentMethod: string;
  createdAt: Date;
  scheduledAt?: Date;
}

export interface CreateTripData {
  origin: string;
  destination: string;
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  fare: number;
  distance: number;
  duration: number;
  vehicleType: string;
  paymentMethod: string;
  scheduledAt?: Date;
}

/**
 * Obtener todos los viajes del usuario
 */
export const getTrips = async (): Promise<Trip[]> => {
  const response = await api.fetch<{ trips: Trip[] }>('/api/trips');
  return response.data?.trips || [];
};

/**
 * Obtener un viaje por ID
 */
export const getTripById = async (id: string): Promise<Trip> => {
  const response = await api.fetch<{ trip: Trip }>(`/api/trips/${id}`);
  return response.data!.trip;
};

/**
 * Crear un nuevo viaje
 */
export const createTrip = async (data: CreateTripData): Promise<Trip> => {
  const response = await api.fetch<{ trip: Trip }>('/api/trips', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data!.trip;
};

/**
 * Actualizar un viaje
 */
export const updateTrip = async (id: string, data: Partial<Trip>): Promise<Trip> => {
  const response = await api.fetch<{ trip: Trip }>(`/api/trips/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.data!.trip;
};

/**
 * Cancelar un viaje
 */
export const cancelTrip = async (id: string): Promise<void> => {
  await updateTrip(id, { status: 'cancelled' });
};

/**
 * Eliminar un viaje
 */
export const deleteTrip = async (id: string): Promise<void> => {
  await api.fetch(`/api/trips/${id}`, {
    method: 'DELETE',
  });
};
