/**
 * Analytics Service - Estadísticas y análisis
 */

import api from './api';

export interface AnalyticsOverview {
  totalTrips: number;
  completedTrips: number;
  cancelledTrips: number;
  totalRevenue: number;
  averageFare: number;
  activeDrivers: number;
  totalUsers: number;
  totalDrivers: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  trips: number;
}

export interface TripStats {
  hourlyDistribution: { hour: number; count: number }[];
  cityDistribution: { city: string; count: number }[];
  statusDistribution: { status: string; count: number }[];
}

/**
 * Obtener resumen general de estadísticas
 */
export const getOverview = async (): Promise<AnalyticsOverview> => {
  const response = await api.fetch<AnalyticsOverview>('/api/analytics/overview');
  return response.data!;
};

/**
 * Obtener datos de ingresos
 */
export const getRevenue = async (days: number = 7): Promise<RevenueData[]> => {
  const response = await api.fetch<{ revenue: RevenueData[] }>(`/api/analytics/revenue?days=${days}`);
  return response.data?.revenue || [];
};

/**
 * Obtener estadísticas de viajes
 */
export const getTripStats = async (): Promise<TripStats> => {
  const response = await api.fetch<TripStats>('/api/analytics/trips');
  return response.data!;
};
