/**
 * Authentication Service
 */

import api from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'driver' | 'admin';
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
  role?: 'user' | 'driver';
}

export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Registrar un nuevo usuario
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.fetch<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.data && response.data.token) {
    api.setAuthToken(response.data.token);
  }

  return response.data!;
};

/**
 * Iniciar sesión
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.fetch<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.data && response.data.token) {
    api.setAuthToken(response.data.token);
  }

  return response.data!;
};

/**
 * Cerrar sesión
 */
export const logout = (): void => {
  api.removeAuthToken();
};

/**
 * Verificar si el usuario está autenticado
 */
export const isAuthenticated = (): boolean => {
  return api.getAuthToken() !== null;
};

/**
 * Obtener el usuario actual (decodificando el token)
 */
export const getCurrentUser = (): User | null => {
  const token = api.getAuthToken();
  if (!token) return null;

  try {
    // Decodificar el JWT (solo la parte del payload)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.userId,
      email: payload.email,
      name: payload.name || '',
      phone: payload.phone || '',
      role: payload.role,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
