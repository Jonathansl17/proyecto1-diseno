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

interface Review {
  id: string;
  driverName: string;
  rating: number;
  comment: string;
  date: string;
  tripRoute: string;
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  type: 'milestone' | 'achievement' | 'bonus';
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
  medal?: string;
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
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'achievements' | 'reviews' | 'timeline'>('profile');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showSavedAddresses, setShowSavedAddresses] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  const [showAdvancedSecurity, setShowAdvancedSecurity] = useState(false);
  const [showSendFeedback, setShowSendFeedback] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const userProfile: UserProfile = {
    id: '1',
    name: 'Ana María Rodríguez',
    email: 'ana.rodriguez@email.com',
    phone: '+506 8765-4321',
    avatar: 'AM',
    memberSince: 'Septiembre 2025 ',
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

  const userReviews: Review[] = [
    {
      id: '1',
      driverName: 'Carlos Mendoza',
      rating: 5,
      comment: 'Muy puntual y educada. Excelente pasajera.',
      date: '2025-09-20',
      tripRoute: 'TEC Cartago → Mall San Pedro'
    },
    {
      id: '2',
      driverName: 'María González',
      rating: 5,
      comment: 'Super respetuosa y amable. La recomiendo totalmente.',
      date: '2025-09-15',
      tripRoute: 'Casa → Universidad UCR'
    },
    {
      id: '3',
      driverName: 'José Ramírez',
      rating: 4,
      comment: 'Buena comunicación y muy puntual para abordar.',
      date: '2025-09-10',
      tripRoute: 'Mall San Pedro → Casa'
    }
  ];

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      title: 'Bienvenida a la familia',
      description: 'Te uniste a nuestra comunidad',
      date: '2025-09-01',
      icon: '🎉',
      type: 'milestone'
    },
    {
      id: '2',
      title: 'Primer viaje completado',
      description: 'Completaste tu primer viaje exitosamente',
      date: '2025-09-02',
      icon: '🚗',
      type: 'milestone'
    },
    {
      id: '3',
      title: 'Bono de bienvenida',
      description: 'Recibiste ₡2,000 de bono por registro',
      date: '2025-09-02',
      icon: '💰',
      type: 'bonus'
    },
    {
      id: '4',
      title: 'Logro desbloqueado: Explorador',
      description: 'Visitaste 10 destinos diferentes',
      date: '2025-09-10',
      icon: '🗺️',
      type: 'achievement'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Primer Viaje',
      description: 'Completaste tu primer viaje',
      icon: '🚗',
      color: 'from-blue-500 to-cyan-500',
      unlocked: true,
      medal: '🥉'
    },
    {
      id: '2',
      title: 'Explorador',
      description: 'Visitaste 10 destinos diferentes',
      icon: '🗺️',
      color: 'from-emerald-500 to-green-500',
      unlocked: true,
      medal: '🥈'
    },
    {
      id: '3',
      title: 'Eco Warrior',
      description: 'Ahorraste 50kg de CO₂',
      icon: '🌱',
      color: 'from-green-500 to-emerald-500',
      unlocked: true,
      medal: '🥇'
    },
    {
      id: '4',
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

  const menuItems: MenuCategory[] = [
    {
      category: 'Cuenta',
      items: [
        { icon: '👤', label: 'Información personal', action: () => setShowEditProfile(true) },
        { icon: '🖼️', label: 'Personalizar avatar', action: () => setShowAvatarCustomizer(true) },
        { icon: '🔒', label: 'Seguridad y privacidad', action: () => setShowSecurity(true) },
        { icon: '🛡️', label: 'Seguridad avanzada', action: () => setShowAdvancedSecurity(true) },
        { icon: '💳', label: 'Métodos de pago', action: () => setShowPaymentMethods(true) },
        { icon: '🏠', label: 'Direcciones guardadas', action: () => setShowSavedAddresses(true) }
      ]
    },
    {
      category: 'Soporte',
      items: [
        { icon: '❓', label: 'Centro de ayuda', action: () => setShowHelpCenter(true) },
        { icon: '💬', label: 'Contactar soporte', action: () => setShowContactSupport(true) },
        { icon: '💡', label: 'Enviar sugerencias', action: () => setShowSendFeedback(true) },
        { icon: '🚪', label: 'Cerrar sesión', action: () => {}, danger: true }
      ]
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-600"}>
        ⭐
      </span>
    ));
  };

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
                  <button 
                    onClick={() => setShowAvatarCustomizer(true)}
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 text-xs transition-all"
                  >
                    📸
                  </button>
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
          <div className="flex gap-2 rounded-2xl border border-white/20 bg-white/5 p-2 backdrop-blur-xl overflow-x-auto">
            {[
              { id: 'profile', label: 'Perfil', icon: '👤' },
              { id: 'reviews', label: 'Reseñas', icon: '⭐' },
              { id: 'achievements', label: 'Logros', icon: '🏆' },
              { id: 'timeline', label: 'Progreso', icon: '📈' },
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
        <section
          className={clsx(
            "transition-all duration-1000 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Información personal</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Nombre completo', value: userProfile.name, icon: '👤' },
                    { label: 'Correo electrónico', value: userProfile.email, icon: '📧' },
                    { label: 'Teléfono', value: userProfile.phone, icon: '📱' }
                  ].map((item, i) => (
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
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Reseñas recibidas</h3>
                <p className="text-white/60">
                  Lo que los conductores dicen sobre ti como pasajero
                </p>
                <div className="flex justify-center items-center gap-2 mt-4">
                  <span className="text-3xl font-bold text-yellow-400">{userProfile.rating}</span>
                  <div className="flex">
                    {renderStars(Math.floor(userProfile.rating))}
                  </div>
                  <span className="text-white/60">({userReviews.length} reseñas)</span>
                </div>
              </div>

              <div className="space-y-4">
                {userReviews.map((review, i) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold">
                        {review.driverName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-white">{review.driverName}</h4>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-xs text-white/60">{review.date}</span>
                        </div>
                        <p className="text-white/80 mb-2">{review.comment}</p>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <span className="bg-white/10 px-2 py-1 rounded-full">
                            🗺️ {review.tripRoute}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Tu progreso</h3>
                <p className="text-white/60">
                  Revive los momentos más importantes de tu experiencia
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent"></div>
                
                <div className="space-y-6">
                  {timelineEvents.map((event, i) => (
                    <div
                      key={event.id}
                      className="relative flex items-start gap-6"
                    >
                      <div className={clsx(
                        "relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 border-slate-900",
                        event.type === 'milestone' && "bg-gradient-to-br from-blue-500 to-cyan-500",
                        event.type === 'achievement' && "bg-gradient-to-br from-yellow-500 to-orange-500",
                        event.type === 'bonus' && "bg-gradient-to-br from-emerald-500 to-green-500"
                      )}>
                        {event.icon}
                      </div>
                      
                      <div className="flex-1 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-white">{event.title}</h4>
                          <span className={clsx(
                            "text-xs px-2 py-1 rounded-full",
                            event.type === 'milestone' && "bg-blue-500/20 text-blue-300",
                            event.type === 'achievement' && "bg-yellow-500/20 text-yellow-300",
                            event.type === 'bonus' && "bg-emerald-500/20 text-emerald-300"
                          )}>
                            {event.type === 'milestone' && 'Hito'}
                            {event.type === 'achievement' && 'Logro'}
                            {event.type === 'bonus' && 'Bono'}
                          </span>
                        </div>
                        <p className="text-white/70 mb-2">{event.description}</p>
                        <p className="text-xs text-white/50">{event.date}</p>
                      </div>
                    </div>
                  ))}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, i) => (
                  <div
                    key={achievement.id}
                    className={clsx(
                      "relative rounded-2xl border backdrop-blur-xl p-6 transition-all duration-500 hover:scale-105",
                      achievement.unlocked
                        ? `border-white/20 bg-gradient-to-br ${achievement.color} bg-opacity-20 hover:bg-opacity-30`
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    )}
                  >
                    {achievement.unlocked && (
                      <div className="absolute -top-2 -right-2 text-3xl animate-bounce">
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
                                className={`h-2 rounded-full bg-gradient-to-r ${achievement.color} transition-all duration-1000`}
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
        </section>
      </main>

      {/* Avatar Customizer Modal */}
      {showAvatarCustomizer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Personalizar Avatar</h3>
                <button
                  onClick={() => setShowAvatarCustomizer(false)}
                  className="rounded-xl border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white text-3xl font-black mx-auto mb-4">
                    {userProfile.avatar}
                  </div>
                  <h4 className="text-white font-medium mb-4">Elige tu estilo</h4>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {['AM', '👤', '😊', '🤗', '😎', '🌟'].map((avatar, i) => (
                    <button
                      key={i}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white text-xl font-black hover:scale-105 transition-all"
                    >
                      {avatar}
                    </button>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-4">
                  <h5 className="text-white font-medium mb-3">O sube una foto</h5>
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-sm text-white/60 mb-2">Arrastra una imagen aquí</p>
                    <button className="text-xs text-purple-400 hover:text-purple-300">
                      o haz clic para seleccionar
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAvatarCustomizer(false)}
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

      {/* Send Feedback Modal */}
      {showSendFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Enviar Sugerencias</h3>
                <button
                  onClick={() => setShowSendFeedback(false)}
                  className="rounded-xl border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center text-white text-2xl mx-auto mb-3">
                    💡
                  </div>
                  <p className="text-white/70">Tu opinión es muy importante para nosotros</p>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2">Categoría</label>
                  <select className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur focus:border-purple-500 focus:outline-none">
                    <option value="">Selecciona una categoría</option>
                    <option value="feature">Nueva funcionalidad</option>
                    <option value="improvement">Mejora existente</option>
                    <option value="bug">Reportar error</option>
                    <option value="ui">Interfaz de usuario</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2">Tu sugerencia</label>
                  <textarea
                    placeholder="Describe tu idea o sugerencia..."
                    rows={4}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur focus:border-purple-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <span className="text-blue-400">💡</span>
                  <p className="text-xs text-blue-200">
                    ¿Sabías que también puedes enviar capturas de pantalla? Adjúntalas para ayudarnos a entender mejor tu sugerencia.
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowSendFeedback(false)}
                    className="flex-1 rounded-xl border border-white/30 bg-white/10 py-3 text-sm font-medium text-white hover:bg-white/20 transition-all"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 py-3 text-sm font-bold text-white hover:from-purple-600 hover:to-violet-600 transition-all">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Security Modal */}
      {showAdvancedSecurity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Seguridad Avanzada</h3>
                <button
                  onClick={() => setShowAdvancedSecurity(false)}
                  className="rounded-xl border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2">
                      🔔
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Alertas de inicio de sesión</h4>
                      <p className="text-sm text-white/60">Te notificaremos cuando detectemos un nuevo inicio de sesión</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Activar alertas</span>
                    <div className="w-12 h-6 rounded-full bg-blue-500">
                      <div className="w-5 h-5 rounded-full bg-white transition-all transform mt-0.5 translate-x-6" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-3">Dispositivos activos</h4>
                  <div className="space-y-3">
                    {[
                      { device: 'iPhone 14 Pro', location: 'San José, CR', time: 'Activo ahora', current: true },
                      { device: 'MacBook Pro', location: 'Cartago, CR', time: 'Hace 2 horas', current: false }
                    ].map((session, i) => (
                      <div
                        key={i}
                        className={clsx(
                          "rounded-xl border backdrop-blur-xl p-4",
                          session.current 
                            ? "border-emerald-500/50 bg-emerald-500/10" 
                            : "border-white/20 bg-white/5"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 p-2">
                              📱
                            </div>
                            <div>
                              <h5 className="font-medium text-white">{session.device}</h5>
                              <p className="text-xs text-white/60">{session.location} • {session.time}</p>
                            </div>
                          </div>
                          {session.current && (
                            <span className="text-xs text-emerald-400 px-3 py-1 rounded-lg border border-emerald-500/50 bg-emerald-500/10">
                              Actual
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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