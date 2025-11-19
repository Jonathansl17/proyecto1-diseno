// Servicio para interactuar con la API de Travel Preferences (HabitTracker)
const API_URL = process.env.NEXT_PUBLIC_PREFERENCES_API_URL || 'http://localhost:3000/travel-preferences';

export interface TravelPreference {
  id: string;
  userId: string;
  preferredRideType?: 'standard' | 'premium';
  preferredPaymentMethod?: string;
  preferredTimeSlots?: string[];
  favoriteRoutes?: Array<{
    from: string;
    to: string;
    fromCoordinates: { lat: number; lng: number };
    toCoordinates: { lat: number; lng: number };
    frequency: number;
    lastUsed: Date;
  }>;
  favoriteDriverIds?: string[];
  mostFrequentDestinations?: string[];
  preferredDays?: string[];
  averageTripsPerWeek?: number;
  minDriverRating?: number;
  notificationsEnabled: boolean;
  autoBookRecurringTrips: boolean;
}

export interface UserStatistics {
  userId: string;
  statistics: {
    totalFavoriteRoutes: number;
    totalFavoriteDrivers: number;
    totalDestinations: number;
    averageTripsPerWeek: number;
    preferredRideType: string;
    notificationsEnabled: boolean;
    autoBookEnabled: boolean;
  };
}

export interface Recommendation {
  type: string;
  message: string;
  routes?: any[];
  timeSlots?: string[];
  driverIds?: string[];
}

class PreferencesService {
  // Crear preferencias para un usuario
  async createPreferences(data: {
    userId: string;
    preferredRideType?: 'standard' | 'premium';
    preferredPaymentMethod?: string;
    preferredTimeSlots?: string[];
    notificationsEnabled?: boolean;
    autoBookRecurringTrips?: boolean;
    minDriverRating?: number;
  }): Promise<TravelPreference> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Error creating preferences');
    return response.json();
  }

  // Obtener preferencias por usuario
  async getUserPreferences(userId: string): Promise<TravelPreference | null> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}`);
      if (!response.ok) return null;
      const data = await response.json();
      if (data.message) return null; // No tiene preferencias
      return data;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      return null;
    }
  }

  // Obtener estadísticas del usuario
  async getUserStatistics(userId: string): Promise<UserStatistics | null> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/statistics`);
      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      console.error('Error fetching user statistics:', error);
      return null;
    }
  }

  // Obtener recomendaciones personalizadas
  async getRecommendations(userId: string): Promise<{ userId: string; recommendations: Recommendation[] } | null> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/recommendations`);
      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return null;
    }
  }

  // Obtener rutas más frecuentes
  async getMostFrequentRoutes(userId: string) {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/frequent-routes`);
      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      console.error('Error fetching frequent routes:', error);
      return null;
    }
  }

  // Agregar ruta favorita
  async addFavoriteRoute(userId: string, route: {
    from: string;
    to: string;
    fromCoordinates: { lat: number; lng: number };
    toCoordinates: { lat: number; lng: number };
  }): Promise<TravelPreference | null> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/favorite-route`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(route)
      });
      
      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      console.error('Error adding favorite route:', error);
      return null;
    }
  }

  // Eliminar ruta favorita
  async removeFavoriteRoute(userId: string, from: string, to: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/favorite-route`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to })
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error removing favorite route:', error);
      return false;
    }
  }

  // Agregar conductor favorito
  async addFavoriteDriver(userId: string, driverId: string): Promise<TravelPreference | null> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/favorite-driver`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverId })
      });
      
      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      console.error('Error adding favorite driver:', error);
      return null;
    }
  }

  // Eliminar conductor favorito
  async removeFavoriteDriver(userId: string, driverId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/favorite-driver/${driverId}`, {
        method: 'DELETE'
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error removing favorite driver:', error);
      return false;
    }
  }

  // Verificar si una ruta es favorita
  async isRouteFavorite(userId: string, from: string, to: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/check-route/${encodeURIComponent(from)}/${encodeURIComponent(to)}`);
      if (!response.ok) return false;
      const data = await response.json();
      return data.isFavorite || false;
    } catch (error) {
      console.error('Error checking route favorite:', error);
      return false;
    }
  }

  // Verificar si un conductor es favorito
  async isDriverFavorite(userId: string, driverId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/check-driver/${driverId}`);
      if (!response.ok) return false;
      const data = await response.json();
      return data.isFavorite || false;
    } catch (error) {
      console.error('Error checking driver favorite:', error);
      return false;
    }
  }

  // Actualizar preferencias
  async updatePreferences(id: number, data: Partial<TravelPreference>): Promise<TravelPreference | null> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      console.error('Error updating preferences:', error);
      return null;
    }
  }

  // Actualizar días preferidos
  async updatePreferredDays(userId: string, days: string[]): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/preferred-days`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days })
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error updating preferred days:', error);
      return false;
    }
  }

  // Actualizar destinos frecuentes
  async updateFrequentDestinations(userId: string, destinations: string[]): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/frequent-destinations`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinations })
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error updating frequent destinations:', error);
      return false;
    }
  }

  // Actualizar promedio de viajes por semana
  async updateAverageTrips(userId: string, average: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/average-trips`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ average })
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error updating average trips:', error);
      return false;
    }
  }
}

export const preferencesService = new PreferencesService();
