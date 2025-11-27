"use client";
import { useEffect, useState } from "react";

function clsx(...arr: (string | false | null | undefined)[]): string {
  return arr.filter(Boolean).join(" ");
}

export default function EnhancedProfileScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'achievements' | 'security' | 'settings'>('dashboard');
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('purple');
  const [showSecurityAlert, setShowSecurityAlert] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Simulate achievement unlock celebration
    setTimeout(() => {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }, 1000);

    // Simulate suspicious login detection
    setTimeout(() => {
      setShowSecurityAlert(true);
    }, 2000);
  }, []);

  const userProfile = {
    name: 'Ana María Rodríguez',
    email: 'ana.rodriguez@email.com',
    avatar: 'AM',
    totalTrips: 47,
    rating: 4.9,
    stats: {
      co2Saved: 23.5,
      totalSpent: 124800,
      badges: ['🌱', '⭐', '🚗', '🏆']
    },
    socialStats: {
      rank: 156,
      percentile: 20,
      comparison: 'top 20% de usuarios activos'
    }
  };

  const achievements = [
    {
      id: '1',
      title: 'Eco Warrior',
      description: 'Ahorraste 25kg de CO₂ usando RideShare',
      icon: '🌱',
      color: 'from-green-500 to-emerald-500',
      unlocked: true,
      medal: '🥇',
      justUnlocked: true
    },
    {
      id: '2',
      title: 'Cliente VIP',
      description: 'Completaste 50 viajes',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500',
      unlocked: false,
      progress: 47,
      maxProgress: 50,
      medal: '🏆'
    }
  ];

  const securityEvents = [
    {
      id: '1',
      device: 'iPhone 14 Pro',
      location: 'San José, CR',
      timestamp: '2025-09-28 14:30',
      suspicious: false,
      ipAddress: '192.168.1.1'
    },
    {
      id: '2',
      device: 'Desktop Windows',
      location: 'Ciudad de México, MX',
      timestamp: '2025-09-28 02:15',
      suspicious: true,
      ipAddress: '201.123.45.67'
    }
  ];

  // Confetti effect component
  const ConfettiCelebration = () => (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          {['🎉', '✨', '⭐', '🏆', '🎊'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Confetti celebration */}
      {showCelebration && <ConfettiCelebration />}

      {/* Security Alert */}
      {showSecurityAlert && (
        <div className="fixed top-20 right-4 z-40 w-80 rounded-2xl border border-red-500/50 bg-red-500/10 backdrop-blur-xl p-4 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center animate-pulse">
              🚨
            </div>
            <div>
              <h4 className="font-bold text-red-200">Inicio sospechoso detectado</h4>
              <p className="text-xs text-red-300">Ciudad de México, MX - Hace 2 horas</p>
            </div>
            <button
              onClick={() => setShowSecurityAlert(false)}
              className="ml-auto text-red-300 hover:text-red-200"
            >
              ✕
            </button>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 rounded-lg bg-red-500/20 py-2 text-xs font-medium text-red-200">
              Revisar
            </button>
            <button 
              onClick={() => setShowSecurityAlert(false)}
              className="rounded-lg bg-white/10 px-3 py-2 text-xs text-white/70"
            >
              Ignorar
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              className="rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur hover:bg-white/20 transition-all"
              onClick={() => window.history.back()}
            >
              ←
            </button>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Mi Perfil
              </h1>
              <p className="text-sm text-white/60">Nivel Oro</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8">
        {/* Enhanced Profile Header */}
        <section className="transition-all duration-1000 delay-200">
          <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-purple-600/20 backdrop-blur-xl shadow-2xl">
            {/* Cover Image */}
            <div className="relative h-48 bg-gradient-to-r from-purple-500 to-violet-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-violet-400/20"></div>
              <button className="absolute top-4 right-4 rounded-lg bg-black/50 px-3 py-2 text-xs text-white hover:bg-black/70 transition-all">
                📷 Cambiar portada
              </button>
            </div>

            {/* Profile Info */}
            <div className="relative p-8 -mt-16">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white text-4xl font-black shadow-2xl border-4 border-slate-900">
                    {userProfile.avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 p-2 border-4 border-slate-900">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  {/* Badges */}
                  <div className="absolute -top-2 -left-2 flex gap-1">
                    {userProfile.stats.badges.slice(0, 3).map((badge, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-sm border-2 border-slate-900 animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-black text-white mb-2">{userProfile.name}</h2>
                  <p className="text-purple-200/80 mb-4">{userProfile.email}</p>
                  
                  {/* Social Stats */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 mb-4 inline-block">
                    <p className="text-sm text-emerald-300">
                      🏆 Estás en el {userProfile.socialStats.comparison}
                    </p>
                    <p className="text-xs text-emerald-400">
                      Posición #{userProfile.socialStats.rank} de todos los usuarios
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="transition-all duration-1000 delay-300">
          <div className="flex gap-2 rounded-2xl border border-white/20 bg-white/5 p-2 backdrop-blur-xl overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'achievements', label: 'Logros', icon: '🏆' },
              { id: 'security', label: 'Seguridad', icon: '🔒' },
              { id: 'settings', label: 'Configuración', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={clsx(
                  "flex-shrink-0 rounded-xl px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        <section className="transition-all duration-1000 delay-400">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Resumen de actividad</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl p-6 hover:scale-105 transition-all">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                      🚗
                    </div>
                    <p className="text-3xl font-bold text-white">{userProfile.totalTrips}</p>
                    <p className="text-sm text-blue-200">Viajes totales</p>
                  </div>

                  <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl p-6 hover:scale-105 transition-all">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                      🌱
                    </div>
                    <p className="text-3xl font-bold text-white">{userProfile.stats.co2Saved}</p>
                    <p className="text-sm text-green-200">kg CO₂ ahorrado</p>
                  </div>

                  <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl p-6 hover:scale-105 transition-all">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                      💰
                    </div>
                    <p className="text-2xl font-bold text-white">₡{userProfile.stats.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-purple-200">Total gastado</p>
                  </div>

                  <div className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl p-6 hover:scale-105 transition-all">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                      ⭐
                    </div>
                    <p className="text-3xl font-bold text-white">{userProfile.rating}</p>
                    <p className="text-sm text-yellow-200">Rating promedio</p>
                  </div>
                </div>
              </div>

              {/* Comparison section */}
              <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Comparación social</h4>
                    <p className="text-emerald-200">Cómo te comparas con otros usuarios</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-white/10">
                    <p className="text-2xl font-bold text-emerald-400">#{userProfile.socialStats.rank}</p>
                    <p className="text-sm text-white/70">Tu posición</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/10">
                    <p className="text-2xl font-bold text-emerald-400">{userProfile.socialStats.percentile}%</p>
                    <p className="text-sm text-white/70">Percentil</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/10">
                    <p className="text-2xl font-bold text-emerald-400">+23%</p>
                    <p className="text-sm text-white/70">vs mes anterior</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Tus Logros</h3>
                <p className="text-white/60">
                  {achievements.filter(a => a.unlocked).length} de {achievements.length} logros desbloqueados
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={clsx(
                      "relative rounded-2xl border backdrop-blur-xl p-6 transition-all duration-500 hover:scale-105",
                      achievement.unlocked
                        ? `border-white/20 bg-gradient-to-br ${achievement.color} bg-opacity-20`
                        : "border-white/10 bg-white/5",
                      achievement.justUnlocked && "animate-pulse ring-4 ring-yellow-500/50"
                    )}
                  >
                    {achievement.unlocked && (
                      <div className="absolute -top-3 -right-3 text-4xl animate-bounce">
                        {achievement.medal}
                      </div>
                    )}
                    
                    <div className="flex items-start gap-4">
                      <div className={clsx(
                        "rounded-xl p-3 text-2xl",
                        achievement.unlocked
                          ? `bg-gradient-to-r ${achievement.color}`
                          : "bg-white/10"
                      )}>
                        {achievement.unlocked ? achievement.icon : '🔒'}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className={clsx(
                          "font-bold mb-1",
                          achievement.unlocked ? "text-white" : "text-white/50"
                        )}>
                          {achievement.title}
                          {achievement.justUnlocked && (
                            <span className="ml-2 text-yellow-400 animate-bounce">¡NUEVO!</span>
                          )}
                        </h4>
                        <p className={clsx(
                          "text-sm mb-3",
                          achievement.unlocked ? "text-white/70" : "text-white/40"
                        )}>
                          {achievement.description}
                        </p>
                        
                        {!achievement.unlocked && achievement.progress && achievement.maxProgress && (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-white/50">Progreso</span>
                              <span className="text-xs text-white/50">
                                {achievement.progress}/{achievement.maxProgress}
                              </span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-3">
                              <div 
                                className={`h-3 rounded-full bg-gradient-to-r ${achievement.color} transition-all duration-1000`}
                                style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Seguridad Premium</h3>
                <p className="text-white/60">Monitoreo avanzado y protección de tu cuenta</p>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center animate-pulse">
                    🛡️
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Estado de seguridad: Excelente</h4>
                    <p className="text-emerald-200">Todas las medidas de protección están activas</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-4">Actividad reciente</h4>
                <div className="space-y-3">
                  {securityEvents.map((event) => (
                    <div
                      key={event.id}
                      className={clsx(
                        "rounded-xl border backdrop-blur-xl p-4 transition-all hover:scale-105",
                        event.suspicious 
                          ? "border-red-500/50 bg-red-500/10" 
                          : "border-white/20 bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={clsx(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          event.suspicious 
                            ? "bg-red-500 animate-pulse" 
                            : "bg-green-500"
                        )}>
                          {event.suspicious ? '🚨' : '✅'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium text-white">Inicio de sesión</h5>
                            {event.suspicious && (
                              <span className="text-xs text-red-300 bg-red-500/20 px-2 py-1 rounded-lg">
                                SOSPECHOSO
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/60">
                            {event.device} • {event.location} • {event.timestamp}
                          </p>
                          <p className="text-xs text-white/50">IP: {event.ipAddress}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white mb-4">Información personal</h3>
              <div className="space-y-3">
                {[
                  { label: 'Nombre completo', value: userProfile.name, icon: '👤' },
                  { label: 'Correo electrónico', value: userProfile.email, icon: '📧' },
                  { label: 'Teléfono', value: '+506 8765-4321', icon: '📱' }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-2">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs text-white/60">{item.label}</p>
                          <p className="text-white font-medium">{item.value}</p>
                        </div>
                      </div>
                      <button className="rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 transition-all">
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 z-30 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-4 px-4">
          {[
            { name: "Inicio", icon: "🏠", active: false },
            { name: "Viajes", icon: "🧭", active: false },
            { name: "Wallet", icon: "💳", active: false },
            { name: "Perfil", icon: "👤", active: true },
          ].map((tab) => (
            <button 
              key={tab.name} 
              className={clsx(
                "flex flex-col items-center gap-1 py-4 text-xs font-medium transition-all",
                tab.active 
                  ? "text-purple-400" 
                  : "text-white/60 hover:text-white"
              )}
            >
              <div className={clsx(
                "rounded-xl p-2 transition-all",
                tab.active 
                  ? "bg-purple-500/20 text-lg" 
                  : "text-base hover:bg-white/10"
              )}>
                {tab.icon}
              </div>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}