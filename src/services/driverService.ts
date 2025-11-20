/**
 * Driver Service - Gestión de conductores
 */

import api from './api';

export interface Driver {
  id: string;
  userId: string;
  licenseNumber: string;
  vehicleId?: string;
  rating: number;
  totalTrips: number;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
}

export interface CreateDriverData {
  userId: string;
  licenseNumber: string;
  vehicleId?: string;
}

/**
 * Obtener todos los conductores
 */
export const getDrivers = async (): Promise<Driver[]> => {
  const response = await api.fetch<{ drivers: Driver[] }>('/api/drivers');
  return response.data?.drivers || [];
};

/**
 * Obtener un conductor por ID
 */
export const getDriverById = async (id: string): Promise<Driver> => {
  const response = await api.fetch<{ driver: Driver }>(`/api/drivers/${id}`);
  return response.data!.driver;
};

/**
 * Crear un nuevo conductor
 */
export const createDriver = async (data: CreateDriverData): Promise<Driver> => {
  const response = await api.fetch<{ driver: Driver }>('/api/drivers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data!.driver;
};

/**
 * Actualizar un conductor
 */
export const updateDriver = async (id: string, data: Partial<Driver>): Promise<Driver> => {
  const response = await api.fetch<{ driver: Driver }>(`/api/drivers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.data!.driver;
};

/**
 * Activar/Desactivar conductor
 */
export const toggleDriverStatus = async (id: string, isActive: boolean): Promise<Driver> => {
  return updateDriver(id, { isActive });
};
