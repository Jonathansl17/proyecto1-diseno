/**
 * Loading Component - Componente de carga reutilizable
 */

export default function Loading({ message = 'Cargando...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-blue-100 rounded-full"></div>
          </div>
        </div>
        <p className="text-gray-700 font-medium text-lg">{message}</p>
        <p className="text-gray-500 text-sm mt-2">Por favor espera...</p>
      </div>
    </div>
  );
}
