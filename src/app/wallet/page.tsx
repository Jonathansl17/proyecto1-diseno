"use client";
import { useTheme } from "@/contexts/ThemeContext";

function clsx(...arr: (string | false | null | undefined)[]): string {
  return arr.filter(Boolean).join(" ");
}

export default function WalletPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`relative flex min-h-screen flex-col overflow-hidden transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-black'
    }`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-xl transition-all duration-1000 ${
          theme === 'dark' 
            ? 'border-white/10 bg-black/20' 
            : 'border-slate-200/50 bg-white/80'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              className={`rounded-xl border p-2 backdrop-blur transition-all ${
                theme === 'dark' 
                  ? 'border-white/20 bg-white/10 hover:bg-white/20' 
                  : 'border-slate-200/50 bg-slate-100/80 hover:bg-slate-200/80'
              }`}
              onClick={() => window.history.back()}
              aria-label="Volver"
            >
              ←
            </button>
            <div>
              <h1 className={`text-2xl font-black ${
                theme === 'dark' 
                  ? 'text-white' 
                  : 'text-black'
              }`}>
                Wallet
              </h1>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>Gestiona tus pagos</p>
            </div>
          </div>
          <button 
            onClick={toggleTheme}
            className={`rounded-xl border px-4 py-2 text-sm font-medium backdrop-blur transition-all ${
              theme === 'dark' 
                ? 'border-white/20 bg-white/10 text-white hover:bg-white/20' 
                : 'border-slate-200/50 bg-slate-100/80 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8">
        {/* Test Theme Card */}
        <div className={`rounded-3xl border backdrop-blur-xl p-8 shadow-2xl ${
          theme === 'dark' 
            ? 'border-white/20 bg-white/10' 
            : 'border-slate-200/50 bg-white/80'
        }`}>
          <h2 className={`text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            🎨 Modo {theme === 'dark' ? 'Oscuro' : 'Claro'} Activo
          </h2>
          <p className={`text-lg mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            El sistema de tema dinámico está funcionando correctamente. 
            Puedes cambiar entre modo oscuro y claro usando el botón en el header.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`rounded-2xl border p-6 ${
              theme === 'dark' 
                ? 'border-white/20 bg-white/5' 
                : 'border-slate-200/50 bg-slate-50/80'
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                ✅ Características Implementadas
              </h3>
              <ul className={`space-y-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                <li>• Contexto de tema global</li>
                <li>• Persistencia en localStorage</li>
                <li>• Detección de preferencia del sistema</li>
                <li>• Transiciones suaves</li>
                <li>• Variables CSS dinámicas</li>
                <li>• Toggle funcional en todas las páginas</li>
              </ul>
            </div>
            
            <div className={`rounded-2xl border p-6 ${
              theme === 'dark' 
                ? 'border-white/20 bg-white/5' 
                : 'border-slate-200/50 bg-slate-50/80'
            }`}>
              <h3 className={`text-xl font-bold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                🎯 Cómo Usar
              </h3>
              <ul className={`space-y-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                <li>• Botón ☀️/🌙 en el header</li>
                <li>• Toggle en Configuración → Modo oscuro</li>
                <li>• Se guarda automáticamente</li>
                <li>• Funciona en todas las páginas</li>
                <li>• Respeta preferencia del sistema</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className={`sticky bottom-0 z-30 border-t backdrop-blur-xl ${
        theme === 'dark' 
          ? 'border-white/10 bg-black/40' 
          : 'border-slate-200/50 bg-white/80'
      }`}>
        <div className="mx-auto grid max-w-6xl grid-cols-4 px-4">
          {[
            { name: "Inicio", icon: "🏠", active: false, href: "/" },
            { name: "Viajes", icon: "🧭", active: false, href: "/admin" },
            { name: "Wallet", icon: "💳", active: true, href: "/wallet" },
            { name: "Perfil", icon: "👤", active: false, href: "/perfil" },
          ].map((tab) => (
            <a 
              key={tab.name} 
              href={tab.href}
              className={clsx(
                "flex flex-col items-center gap-1 py-4 text-xs font-medium transition-all",
                tab.active 
                  ? (theme === 'dark' ? "text-green-400" : "text-green-600") 
                  : (theme === 'dark' ? "text-white/60 hover:text-white" : "text-slate-600 hover:text-slate-800")
              )}
            >
              <div className={clsx(
                "rounded-xl p-2 transition-all",
                tab.active 
                  ? (theme === 'dark' ? "bg-green-500/20 text-lg" : "bg-green-100 text-lg") 
                  : (theme === 'dark' ? "text-base hover:bg-white/10" : "text-base hover:bg-slate-100")
              )}>
                {tab.icon}
              </div>
              <span>{tab.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
