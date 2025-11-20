/**
 * Rating Service - Gestión de calificaciones
 */

import api from './api';

export interface Rating {
  id: string;
  tripId: string;
  userId: string;
  driverId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface CreateRatingData {
  tripId: string;
  driverId: string;
  rating: number;
  comment?: string;
}

/**
 * Obtener todas las calificaciones
 */
export const getRatings = async (): Promise<Rating[]> => {
  const response = await api.fetch<{ ratings: Rating[] }>('/api/ratings');
  return response.data?.ratings || [];
};

/**
 * Obtener calificaciones de un conductor
 */
export const getDriverRatings = async (driverId: string): Promise<Rating[]> => {
  const response = await api.fetch<{ ratings: Rating[] }>(`/api/ratings/driver/${driverId}`);
  return response.data?.ratings || [];
};

/**
 * Crear una nueva calificación
 */
export const createRating = async (data: CreateRatingData): Promise<Rating> => {
  const response = await api.fetch<{ rating: Rating }>('/api/ratings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data!.rating;
};
