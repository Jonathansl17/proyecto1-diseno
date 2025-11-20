/**
 * Payment Service - Gestión de pagos
 */

import api from './api';

export interface Payment {
  id: string;
  tripId: string;
  userId: string;
  amount: number;
  method: 'cash' | 'card' | 'digital_wallet';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: Date;
}

export interface CreatePaymentData {
  tripId: string;
  amount: number;
  method: 'cash' | 'card' | 'digital_wallet';
  transactionId?: string;
}

/**
 * Obtener todos los pagos
 */
export const getPayments = async (): Promise<Payment[]> => {
  const response = await api.fetch<{ payments: Payment[] }>('/api/payments');
  return response.data?.payments || [];
};

/**
 * Obtener un pago por ID
 */
export const getPaymentById = async (id: string): Promise<Payment> => {
  const response = await api.fetch<{ payment: Payment }>(`/api/payments/${id}`);
  return response.data!.payment;
};

/**
 * Crear un nuevo pago
 */
export const createPayment = async (data: CreatePaymentData): Promise<Payment> => {
  const response = await api.fetch<{ payment: Payment }>('/api/payments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data!.payment;
};

/**
 * Actualizar un pago
 */
export const updatePayment = async (id: string, data: Partial<Payment>): Promise<Payment> => {
  const response = await api.fetch<{ payment: Payment }>(`/api/payments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.data!.payment;
};
