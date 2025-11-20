/**
 * User Service - Gestión de usuarios
 */

import api from './api';
import { User } from './authService';

export interface UpdateUserData {
  name?: string;
  phone?: string;
  email?: string;
}

/**
 * Obtener todos los usuarios (admin only)
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await api.fetch<{ users: User[] }>('/api/users');
  return response.data?.users || [];
};

/**
 * Obtener un usuario por ID
 */
export const getUserById = async (id: string): Promise<User> => {
  const response = await api.fetch<{ user: User }>(`/api/users/${id}`);
  return response.data!.user;
};

/**
 * Actualizar un usuario
 */
export const updateUser = async (id: string, data: UpdateUserData): Promise<User> => {
  const response = await api.fetch<{ user: User }>(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.data!.user;
};

/**
 * Eliminar un usuario
 */
export const deleteUser = async (id: string): Promise<void> => {
  await api.fetch(`/api/users/${id}`, {
    method: 'DELETE',
  });
};
