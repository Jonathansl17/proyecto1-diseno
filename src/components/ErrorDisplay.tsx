/**
 * Error Display Component - Muestra errores de forma amigable
 */

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}
