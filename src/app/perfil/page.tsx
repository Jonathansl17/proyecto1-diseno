"use client";
import { useEffect, useState } from "react";

function clsx(...arr: (string | false | null | undefined)[]): string {
  return arr.filter(Boolean).join(" ");
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  rating: number;
  totalTrips: number;
  favoriteLocations: string[];
  emergencyContact: {
    name: string;
    phone: string;
  };
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
    autoBook: boolean;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface MenuItem {
  icon: string;
  label: string;
  action: () => void;
  toggle?: boolean;
  value?: string;
  danger?: boolean;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export default function ProfileScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'achievements'>('profile');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const userProfile: UserProfile = {
    id: '1',
    name: 'Ana María Rodríguez',
    email: 'ana.rodriguez@email.com',
    phone: '+506 8765-4321',
    avatar: 'AM',
    memberSince: 'Septiembre 2025',
    rating: 4.9,
    totalTrips: 47,
    favoriteLocations: ['TEC Cartago', 'Universidad de Costa Rica', 'Mall San Pedro'],
    emergencyContact: {
      name: 'Carlos Rodríguez',
      phone: '+506 8888-9999'
    },
    preferences: {
      notifications: true,
      darkMode: true,
      language: 'es',
      autoBook: false
    }
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Primer Viaje',
      description: 'Completaste tu primer viaje',
      icon: '🚗',
      color: 'from-blue-500 to-cyan-500',
      unlocked: true
    },
    {
      id: '2',
      title: 'Explorador',
      description: 'Visitaste 10 destinos diferentes',
      icon: '🗺️',
      color: 'from-emerald-500 to-green-500',
      unlocked: true
    },
    {
      id: '3',
      title: 'Eco Warrior',
      description: 'Ahorraste 50kg de CO₂',
      icon: '🌱',
      color: 'from-green-500 to-emerald-500',
      unlocked: true
    },
    {
      id: '4',
      title: 'Cliente VIP',
      description: 'Completaste 50 viajes',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500',
      unlocked: false,
      progress: 47,
      maxProgress: 50
    },
    {
      id: '5',
      title: 'Noctámbulo',
      description: 'Realizaste 20 viajes nocturnos',
      icon: '🌙',
      color: 'from-purple-500 to-violet-500',
      unlocked: false,
      progress: 12,
      maxProgress: 20
    },
    {
      id: '6',
      title: 'Referidor Pro',
      description: 'Invitaste a 5 amigos',
      icon: '👥',
      color: 'from-pink-500 to-rose-500',
      unlocked: false,
      progress: 2,
      maxProgress: 5
    }
  ];

  const menuItems: MenuCategory[] = [
    {
      category: 'Cuenta',
      items: [
        { icon: '👤', label: 'Información personal', action: () => setShowEditProfile(true) },
        { icon: '🔒', label: 'Seguridad y privacidad', action: () => setShowSecurity(true) },
        { icon: '💳', label: 'Métodos de pago', action: () => {} },
        { icon: '🏠', label: 'Direcciones guardadas', action: () => {} }
      ]
    },
    {
      category: 'Preferencias',
      items: [
        { icon: '🔔', label: 'Notificaciones', action: () => {} },
        { icon: '🌙', label: 'Modo oscuro', action: () => {}, toggle: userProfile.preferences.darkMode },
        { icon: '🌍', label: 'Idioma', action: () => {}, value: 'Español' },
        { icon: '🎯', label: 'Reserva automática', action: () => {}, toggle: userProfile.preferences.autoBook }
      ]
    },
    {
      category: 'Soporte',
      items: [
        { icon: '❓', label: 'Centro de ayuda', action: () => {} },
        { icon: '💬', label: 'Contactar soporte', action: () => {} },
        { icon: '📋', label: 'Términos y condiciones', action: () => {} },
        { icon: '🔐', label: 'Política de privacidad', action: () => {} }
      ]
    },
    {
      category: 'Aplicación',
      items: [
        { icon: '⭐', label: 'Calificar app', action: () => {} },
        { icon: '📤', label: 'Compartir app', action: () => {} },
        { icon: 'ℹ️', label: 'Acerca de', action: () => {}, value: 'v2.1.0' },
        { icon: '🚪', label: 'Cerrar sesión', action: () => {}, danger: true }
      ]
    }
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header
        className={clsx(
          "sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-xl",
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              className="rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur hover:bg-white/20 transition-all"
              onClick={() => window.history.back()}
              aria-label="Volver"
            >
              ←
            </button>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Mi Perfil
              </h1>
              <p className="text-sm text-white/60">Gestiona tu cuenta</p>
            </div>
          </div>
          <button 
            onClick={() => setShowEditProfile(true)}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 px-4 py-2 text-sm font-bold backdrop-blur hover:from-purple-600 hover:to-violet-600 transition-all"
          >
            ✏️ Editar
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8">
        {/* Profile Header */}
        <section
          className={clsx(
            "transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-purple-600/20 backdrop-blur-xl p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-violet-400/5"></div>
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                    {userProfile.avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 p-2 border-4 border-slate-900">
                    <span className="text-white text-lg">✓</span>
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-black text-white mb-2">{userProfile.name}</h2>
                  <p className="text-purple-200/80 mb-4">{userProfile.email}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur">
                      <p className="text-2xl font-bold text-white">{userProfile.totalTrips}</p>
                      <p className="text-xs text-white/60">Viajes</p>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur">
                      <p className="text-2xl font-bold text-yellow-400">{userProfile.rating}★</p>
                      <p className="text-xs text-white/60">Rating</p>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur">
                      <p className="text-2xl font-bold text-emerald-400">Oro</p>
                      <p className="text-xs text-white/60">Nivel</p>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur">
                      <p className="text-lg font-bold text-purple-300">{userProfile.memberSince}</p>
                      <p className="text-xs text-white/60">Miembro</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section
          className={clsx(
            "transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex gap-2 rounded-2xl border border-white/20 bg-white/5 p-2 backdrop-blur-xl">
            {[
              { id: 'profile', label: 'Perfil', icon: '👤' },
              { id: 'settings', label: 'Configuración', icon: '⚙️' },
              { id: 'achievements', label: 'Logros', icon: '🏆' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={clsx(
                  "flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2",
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
        <section
          className={clsx(
            "transition-all duration-1000 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Información personal</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Nombre completo', value: userProfile.name, icon: '👤' },
                    { label: 'Correo electrónico', value: userProfile.email, icon: '📧' },
                    { label: 'Teléfono', value: userProfile.phone, icon: '📱' },
                    { label: 'Contacto de emergencia', value: `${userProfile.emergencyContact.name} - ${userProfile.emergencyContact.phone}`, icon: '🚨' }
                  ].map((item, i) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 hover:bg-white/10 transition-all"
                      style={{ animationDelay: `${i * 50}ms` }}
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

              {/* Favorite Locations */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Lugares favoritos</h3>
                <div className="space-y-3">
                  {userProfile.favoriteLocations.map((location, i) => (
                    <div
                      key={location}
                      className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 hover:bg-white/10 transition-all"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 p-2">
                            📍
                          </div>
                          <p className="text-white font-medium">{location}</p>
                        </div>
                        <button className="rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 transition-all">
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              {menuItems.map((category, i) => (
                <div key={category.category}>
                  <h3 className="text-lg font-bold text-white mb-4">{category.category}</h3>
                  <div className="space-y-2">
                    {category.items.map((item, j) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className={clsx(
                          "w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 hover:bg-white/10 transition-all text-left",
                          item.danger && "border-red-500/50 bg-red-500/10 hover:bg-red-500/20"
                        )}
                        style={{ animationDelay: `${(i * 100) + (j * 50)}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={clsx(
                              "rounded-lg p-2",
                              item.danger 
                                ? "bg-gradient-to-r from-red-500 to-pink-500" 
                                : "bg-gradient-to-r from-purple-500 to-violet-500"
                            )}>
                              {item.icon}
                            </div>
                            <span className={clsx(
                              "font-medium",
                              item.danger ? "text-red-300" : "text-white"
                            )}>
                              {item.label}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {item.value && (
                              <span className="text-sm text-white/60">{item.value}</span>
                            )}
                            {item.toggle !== undefined && (
                              <div className={clsx(
                                "w-12 h-6 rounded-full transition-all",
                                item.toggle ? "bg-emerald-500" : "bg-white/20"
                              )}>
                                <div className={clsx(
                                  "w-5 h-5 rounded-full bg-white transition-all transform mt-0.5",
                                  item.toggle ? "translate-x-6" : "translate-x-0.5"
                                )} />
                              </div>
                            )}
                            <span className={clsx(
                              "text-sm",
                              item.danger ? "text-red-400" : "text-white/60"
                            )}>
                              →
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, i) => (
                  <div
                    key={achievement.id}
                    className={clsx(
                      "rounded-2xl border backdrop-blur-xl p-6 transition-all",
                      achievement.unlocked
                        ? `border-white/20 bg-gradient-to-br ${achievement.color} bg-opacity-20 hover:bg-opacity-30`
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    )}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
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
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-gradient-to-r ${achievement.color} transition-all`}
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
        </section>
      </main>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Editar perfil</h3>
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="rounded-xl border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white text-2xl font-black mx-auto mb-3">
                    {userProfile.avatar}
                  </div>
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-all">
                    Cambiar foto
                  </button>
                </div>

                {[
                  { label: 'Nombre', value: userProfile.name, type: 'text' },
                  { label: 'Email', value: userProfile.email, type: 'email' },
                  { label: 'Teléfono', value: userProfile.phone, type: 'tel' }
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm text-white/70 mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                ))}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowEditProfile(false)}
                    className="flex-1 rounded-xl border border-white/30 bg-white/10 py-3 text-sm font-medium text-white hover:bg-white/20 transition-all"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 py-3 text-sm font-bold text-white hover:from-purple-600 hover:to-violet-600 transition-all">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Modal */}
      {showSecurity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Seguridad</h3>
                <button
                  onClick={() => setShowSecurity(false)}
                  className="rounded-xl border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Cambiar contraseña', icon: '🔐', action: () => {} },
                  { label: 'Autenticación de dos factores', icon: '🛡️', action: () => {}, toggle: false },
                  { label: 'Sesiones activas', icon: '📱', action: () => {}, value: '3 dispositivos' },
                  { label: 'Eliminar cuenta', icon: '🗑️', action: () => {}, danger: true }
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={option.action}
                    className={clsx(
                      "w-full rounded-xl border backdrop-blur-xl p-4 hover:bg-white/10 transition-all text-left",
                      option.danger 
                        ? "border-red-500/50 bg-red-500/10 hover:bg-red-500/20"
                        : "border-white/20 bg-white/5"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={clsx(
                          "rounded-lg p-2",
                          option.danger 
                            ? "bg-gradient-to-r from-red-500 to-pink-500"
                            : "bg-gradient-to-r from-purple-500 to-violet-500"
                        )}>
                          {option.icon}
                        </div>
                        <span className={clsx(
                          "font-medium",
                          option.danger ? "text-red-300" : "text-white"
                        )}>
                          {option.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {option.value && (
                          <span className="text-sm text-white/60">{option.value}</span>
                        )}
                        {option.toggle !== undefined && (
                          <div className={clsx(
                            "w-12 h-6 rounded-full transition-all",
                            option.toggle ? "bg-emerald-500" : "bg-white/20"
                          )}>
                            <div className={clsx(
                              "w-5 h-5 rounded-full bg-white transition-all transform mt-0.5",
                              option.toggle ? "translate-x-6" : "translate-x-0.5"
                            )} />
                          </div>
                        )}
                        <span className={clsx(
                          "text-sm",
                          option.danger ? "text-red-400" : "text-white/60"
                        )}>
                          →
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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