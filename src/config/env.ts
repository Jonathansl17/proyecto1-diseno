/**
 * Environment Configuration
 * Crea este archivo para configurar las variables de entorno
 */

// Crear archivo .env.local con:
// NEXT_PUBLIC_API_URL=http://localhost:3002

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
