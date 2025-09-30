"use client";
import { useEffect, useMemo, useState } from "react";

function clsx(...arr: (string | false | null | undefined)[]): string {
  return arr.filter(Boolean).join(" ");
}

interface RideOption {
  id: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
  bgGradient: string;
}

interface PopularDestination {
  name: string;
  distance: string;
  price: string;
  icon: string;
  popular: boolean;
}

interface Notification {
  id: string;
  type: 'trip' | 'promo' | 'alert';
  message: string;
  time: string;
}

export default function EnhancedHomeScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState("standard");
  const [eta, setEta] = useState("—");
  const [fare, setFare] = useState("—");
  const [looking, setLooking] = useState(false);
  const [mapAnimation, setMapAnimation] = useState(false);
  const [showDriverCard, setShowDriverCard] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Obteniendo ubicación...");
  const [currentPromo, setCurrentPromo] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [weather, setWeather] = useState({ temp: "26", condition: "☀️", location: "Cartago" });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsVisible(true);
    
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    // Simulate getting current location
    setTimeout(() => {
      setCurrentLocation("Avenida Central, San José Centro");
    }, 1500);

    // Simulate weather update
    setTimeout(() => {
      const conditions = [
        { temp: "26", condition: "☀️", location: "Cartago" },
        { temp: "23", condition: "⛅", location: "San José" },
        { temp: "28", condition: "🌤️", location: "Alajuela" }
      ];
      setWeather(conditions[Math.floor(Math.random() * conditions.length)]);
    }, 2000);

    // Animate map periodically
    const interval = setInterval(() => {
      setMapAnimation(true);
      setTimeout(() => setMapAnimation(false), 2000);
    }, 8000);

    // Rotate promotions based on relevance
    const promoInterval = setInterval(() => {
      setCurrentPromo(prev => (prev + 1) % getRelevantPromotions().length);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearInterval(promoInterval);
      clearInterval(timeInterval);
    };
  }, []);

  // Enhanced fare/eta calculator with more dynamic pricing
  useEffect(() => {
    if (!pickup || !dropoff) {
      setEta("—");
      setFare("—");
      return;
    }
    const multipliers = { standard: 1.0, premium: 1.8, moto: 0.7, electric: 1.2 };
    const base = 1400;
    const distance = Math.floor((pickup.length + dropoff.length) % 12) + 3;
    const minutes = Math.floor(distance * 1.2) + Math.floor(Math.random() * 3);
    
    setEta(`${minutes} min`);
    setFare(`₡${(base * distance * multipliers[rideType as keyof typeof multipliers]).toLocaleString("es-CR")}`);
  }, [pickup, dropoff, rideType]);

  const notifications: Notification[] = [
    { id: '1', type: 'trip', message: 'Tu viaje programado para mañana 06:00', time: '2h' },
    { id: '2', type: 'promo', message: '20% OFF en viajes nocturnos hasta medianoche', time: '4h' },
    { id: '3', type: 'alert', message: 'Nueva zona de cobertura disponible en Cartago', time: '1d' }
  ];

  // User data simulation
  const user = {
    name: "querido usuario",
    avatar: "RN",
    recentDestinations: ["TEC Cartago", "UCR San Pedro", "Centro San José"],
    favoriteTime: "morning"
  };

  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  // AI-powered recommendations based on time and history
  const getSmartRecommendations = () => {
    const hour = currentTime.getHours();
    const day = currentTime.getDay();
    
    if (hour >= 6 && hour < 12) {
      if (day >= 1 && day <= 5) {
        return [
          { text: "¿Vas al TEC?", dest: "TEC Cartago", reason: "Usualmente vas los lunes en la mañana", confidence: 0.9 },
          { text: "¿Universidad hoy?", dest: "UCR San Pedro", reason: "Es tu horario habitual", confidence: 0.8 }
        ];
      }
    }
    
    if (hour >= 12 && hour < 18) {
      return [
        { text: "¿Almuerzo en el centro?", dest: "Centro San José", reason: "Sueles ir a esta hora", confidence: 0.7 },
        { text: "¿Regreso a casa?", dest: "Casa", reason: "Hora típica de regreso", confidence: 0.6 }
      ];
    }
    
    if (hour >= 18) {
      return [
        { text: "¿Regreso a casa?", dest: "Casa", reason: "Fin del día laboral", confidence: 0.8 },
        { text: "¿Cena en el mall?", dest: "Mall San Pedro", reason: "Actividad nocturna común", confidence: 0.5 }
      ];
    }
    
    return [];
  };

  // Smart promotions based on user behavior and time
  const getRelevantPromotions = () => {
    const hour = currentTime.getHours();
    const allPromotions = [
      {
        title: "¡Viajes nocturnos con descuento!",
        desc: "20% OFF de 6PM a 6AM",
        code: "NIGHT20",
        gradient: "from-purple-500 via-pink-500 to-rose-500",
        icon: "🌙",
        relevance: hour >= 18 || hour < 6 ? 1.0 : 0.3
      },
      {
        title: "¡Estudiantes viajan más barato!",
        desc: "15% OFF mostrando carné estudiantil",
        code: "STUDENT15",
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
        icon: "🎓",
        relevance: user.recentDestinations.some(d => d.includes("TEC") || d.includes("UCR")) ? 0.9 : 0.4
      },
      {
        title: "¡EcoRide ahorra el planeta!",
        desc: "Viajes eléctricos con 10% descuento",
        code: "ECO10",
        gradient: "from-green-500 via-emerald-500 to-lime-500",
        icon: "🌱",
        relevance: 0.6
      },
      {
        title: "¡Viajes matutinos eficientes!",
        desc: "10% OFF antes de las 10 AM",
        code: "EARLY10",
        gradient: "from-orange-500 via-yellow-500 to-amber-500",
        icon: "🌅",
        relevance: hour < 10 ? 0.8 : 0.2
      }
    ];
    
    return allPromotions
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3);
  };

  const popularDestinations: PopularDestination[] = [
    { name: "TEC Cartago", distance: "12 km", price: "₡2,800", icon: "🎓", popular: true },
    { name: "UCR San Pedro", distance: "8 km", price: "₡2,200", icon: "🏛️", popular: true },
    { name: "Centro San José", distance: "5 km", price: "₡1,800", icon: "🏢", popular: false },
    { name: "Aeropuerto SJO", distance: "18 km", price: "₡4,500", icon: "✈️", popular: true },
    { name: "Mall San Pedro", distance: "7 km", price: "₡2,000", icon: "🛍️", popular: false },
    { name: "Estadio Nacional", distance: "6 km", price: "₡1,900", icon: "⚽", popular: false }
  ];

  const quickActions = [
    {
      name: "Nuevo Viaje",
      desc: "Solicita tu ride ahora",
      icon: "🚗",
      gradient: "from-emerald-500 to-cyan-500",
      action: () => document.getElementById('trip-form')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      name: "Historial",
      desc: "Ver viajes anteriores",
      icon: "📋",
      gradient: "from-blue-500 to-purple-500",
      action: () => window.location.href = "/trips"
    },
    {
      name: "Mi Wallet",
      desc: "Gestionar pagos",
      icon: "💳",
      gradient: "from-purple-500 to-pink-500",
      action: () => window.location.href = "/wallet"
    },
    {
      name: "Mi Perfil",
      desc: "Configurar cuenta",
      icon: "👤",
      gradient: "from-orange-500 to-red-500",
      action: () => window.location.href = "/profile"
    }
  ];

  function handleGeo() {
    if (!navigator.geolocation) return alert("Geolocalización no soportada");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPickup(currentLocation);
      },
      () => alert("No se pudo obtener tu ubicación")
    );
  }

  function requestRide() {
    if (!pickup || !dropoff) {
      alert("Indicá punto de partida y destino");
      return;
    }
    setLooking(true);
    setTimeout(() => {
      setLooking(false);
      setShowDriverCard(true);
    }, 3000);
  }

  const rideOptions = useMemo(
    () => [
      { 
        id: "standard", 
        name: "RideShare", 
        desc: "Económico • 4 pax", 
        icon: "🚗", 
        color: "text-blue-600",
        bgGradient: "from-blue-500 to-cyan-500"
      },
      { 
        id: "premium", 
        name: "Premium", 
        desc: "Confort • AC", 
        icon: "🚘", 
        color: "text-purple-600",
        bgGradient: "from-purple-500 to-pink-500"
      },
      { 
        id: "moto", 
        name: "MotoExpress", 
        desc: "1 pax • Rápido", 
        icon: "🏍️", 
        color: "text-orange-600",
        bgGradient: "from-orange-500 to-red-500"
      },
      { 
        id: "electric", 
        name: "EcoRide", 
        desc: "Eléctrico • Verde", 
        icon: "⚡", 
        color: "text-green-600",
        bgGradient: "from-green-500 to-emerald-500"
      },
    ],
    []
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-bounce delay-500"></div>
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Enhanced glassmorphic top bar with personalized greeting and weather */}
      <header
        className={clsx(
          "sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-xl",
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/20 to-transparent p-3 shadow-2xl backdrop-blur group-hover:scale-105 transition-all">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold">R</div>
              </div>
              <div className="absolute -right-1 -top-1 h-3 w-3 bg-emerald-400 rounded-full animate-ping"></div>
              <div className="absolute -right-1 -top-1 h-3 w-3 bg-emerald-500 rounded-full"></div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm hover:scale-105 transition-transform cursor-pointer">
                  {user.avatar}
                </div>
                <p className="text-lg font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  {getGreeting()}, {user.name} 👋
                </p>
              </div>
              <p className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">RideNow Costa Rica</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Weather widget */}
            <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur px-4 py-2 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-2xl group-hover:scale-110 transition-transform">{weather.condition}</div>
              <div>
                <p className="text-lg font-bold text-white">{weather.temp}°C</p>
                <p className="text-xs text-white/70">{weather.location}</p>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-300">En línea</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-xl border border-white/20 bg-white/10 p-2 text-white backdrop-blur hover:bg-white/20 hover:scale-105 transition-all"
              >
                🔔
                {notifications.length > 0 && (
                  <div className="absolute -right-1 -top-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                    {notifications.length}
                  </div>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 rounded-2xl border border-white/20 bg-black/90 backdrop-blur-xl p-4 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
                  <h3 className="text-sm font-bold text-white mb-3">Notificaciones</h3>
                  <div className="space-y-2">
                    {notifications.map(notif => (
                      <div key={notif.id} className="rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-all cursor-pointer transform hover:scale-105">
                        <p className="text-sm text-white">{notif.message}</p>
                        <p className="text-xs text-white/60">Hace {notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8">
        {/* Dynamic promotional banner with smart recommendations */}
        <section
          className={clsx(
            "space-y-4",
            "transition-all duration-1000 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {/* AI Recommendations */}
          {getSmartRecommendations().length > 0 && (
            <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white animate-pulse">
                    🤖
                  </div>
                  <h3 className="text-lg font-bold text-white">Sugerencia inteligente</h3>
                </div>
                <div className="space-y-2">
                  {getSmartRecommendations().slice(0, 2).map((rec, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDropoff(rec.dest);
                        document.getElementById('trip-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left rounded-xl bg-white/10 p-3 hover:bg-white/20 transition-all hover:scale-105 group"
                    >
                      <p className="text-white font-medium">{rec.text}</p>
                      <p className="text-xs text-white/70">{rec.reason} • {Math.round(rec.confidence * 100)}% confianza</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Smart promotions */}
          <div className={`rounded-3xl border border-white/20 bg-gradient-to-r ${getRelevantPromotions()[currentPromo].gradient} p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:scale-105 transition-all duration-300`}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl group-hover:scale-110 transition-transform">{getRelevantPromotions()[currentPromo].icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-white">{getRelevantPromotions()[currentPromo].title}</h2>
                  <p className="text-white/90">{getRelevantPromotions()[currentPromo].desc}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-xs text-emerald-300">Recomendado para ti</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white/20 px-4 py-2 font-mono text-sm font-bold text-white group-hover:bg-white/30 transition-all">
                  {getRelevantPromotions()[currentPromo].code}
                </div>
                <button className="rounded-xl bg-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-all hover:scale-105">
                  Usar ahora
                </button>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 flex gap-2">
              {getRelevantPromotions().map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentPromo ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* Current location and quick actions */}
        <section
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-3 gap-6",
            "transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Current location card */}
          <div className="lg:col-span-1 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl animate-pulse">
                📍
              </div>
              <div>
                <h3 className="font-bold text-white">Tu ubicación</h3>
                <p className="text-sm text-white/70">Actualizada ahora</p>
              </div>
            </div>
            <p className="text-white font-medium mb-4">{currentLocation}</p>
            <button 
              onClick={handleGeo}
              className="w-full rounded-xl bg-emerald-500/20 border border-emerald-400/50 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/30 transition-all"
            >
              🔄 Actualizar ubicación
            </button>
          </div>

          {/* Quick actions grid with enhanced animations */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {quickActions.map((action, i) => (
              <button
                key={action.name}
                onClick={action.action}
                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 shadow-xl hover:bg-white/10 hover:scale-105 hover:rotate-1 transition-all duration-500 hover:shadow-2xl"
                style={{ 
                  animationDelay: `${i * 150}ms`,
                  transformOrigin: 'center'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl mb-3 group-hover:animate-bounce">{action.icon}</div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">{action.name}</h3>
                  <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">{action.desc}</p>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-white/30 transition-all duration-300"></div>
              </button>
            ))}
          </div>
        </section>

        {/* Popular destinations carousel */}
        <section
          className={clsx(
            "transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Destinos populares
            </h2>
            <button className="text-sm text-cyan-400 hover:underline">Ver todos</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {popularDestinations.map((dest, i) => (
              <button
                key={dest.name}
                onClick={() => {
                  setDropoff(dest.name);
                  document.getElementById('trip-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative flex-none w-48 overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 shadow-xl hover:bg-white/10 hover:scale-105 hover:-rotate-1 transition-all duration-500 hover:shadow-2xl hover:border-cyan-400/50"
                style={{ 
                  animationDelay: `${i * 150}ms`,
                  transformOrigin: 'center'
                }}
              >
                {dest.popular && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-2 py-1 text-xs font-bold text-white animate-pulse">
                    Popular
                  </div>
                )}
                <div className="text-3xl mb-3 group-hover:scale-110 group-hover:animate-bounce transition-all duration-300">{dest.icon}</div>
                <h3 className="font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">{dest.name}</h3>
                <p className="text-sm text-white/70 mb-2 group-hover:text-white/90 transition-colors">{dest.distance}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">{dest.price}</span>
                  <span className="text-cyan-400 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300">→</span>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-cyan-400/30 transition-all duration-300"></div>
              </button>
            ))}
          </div>
        </section>

        {/* Enhanced main ride request area */}
        <section
          id="trip-form"
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-2 gap-8",
            "transition-all duration-1000 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Left side - Enhanced Controls */}
          <div className="space-y-6">
            {/* Trip planner card */}
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">¿A dónde vamos?</h2>
                <button
                  onClick={() => {
                    const p = pickup;
                    setPickup(dropoff);
                    setDropoff(p);
                  }}
                  className="rounded-xl border border-cyan-500/50 bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300 hover:bg-cyan-500/30 transition-all"
                >
                  ⇄ Intercambiar
                </button>
              </div>

              <div className="space-y-4">
                <div className="group relative">
                  <input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="¿Desde dónde partes?"
                    className="w-full rounded-2xl border border-white/20 bg-white/5 px-12 py-4 text-white placeholder:text-white/60 focus:border-cyan-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all backdrop-blur"
                  />
                  <button 
                    onClick={handleGeo} 
                    className="absolute right-3 top-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-2 text-xs font-medium text-white hover:from-cyan-600 hover:to-blue-600 transition-all"
                  >
                    📍 GPS
                  </button>
                </div>

                <div className="group relative">
                  <div className="absolute left-4 top-4 z-10">
                    <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                  </div>
                  <input
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="¿A dónde vas?"
                    className="w-full rounded-2xl border border-white/20 bg-white/5 px-12 py-4 text-white placeholder:text-white/60 focus:border-rose-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-rose-400/50 transition-all backdrop-blur"
                  />
                </div>
              </div>

              {/* Enhanced quick destination suggestions */}
              <div className="mt-6">
                <p className="text-sm text-white/70 mb-3">Sugerencias para ti:</p>
                <div className="flex flex-wrap gap-2">
                  {["🏠 Casa", "💼 Trabajo", "🎓 TEC", "🏛️ UCR", "✈️ Aeropuerto"].map((tag, i) => (
                    <button
                      key={tag}
                      onClick={() => setDropoff(tag.split(" ")[1])}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-all backdrop-blur hover:scale-105"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced ride options with smooth animations */}
            <div className="grid grid-cols-2 gap-4">
              {rideOptions.map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => setRideType(opt.id)}
                  className={clsx(
                    "group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 hover:scale-105 hover:rotate-1",
                    rideType === opt.id
                      ? "border-white/40 bg-white/20 shadow-2xl ring-2 ring-white/30 scale-105"
                      : "border-white/20 bg-white/5 hover:bg-white/10 hover:shadow-2xl"
                  )}
                  style={{ 
                    animationDelay: `${i * 150}ms`,
                    transformOrigin: 'center'
                  }}
                >
                  {rideType === opt.id && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${opt.bgGradient} opacity-30 animate-pulse`}></div>
                  )}
                  
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="text-2xl group-hover:animate-bounce">{opt.icon}</div>
                      <div>
                        <p className={`font-bold transition-colors ${rideType === opt.id ? 'text-white' : 'text-white/90 group-hover:text-cyan-200'}`}>{opt.name}</p>
                        <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors">{opt.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70 group-hover:text-white/90 transition-colors">{eta}</span>
                      <span className={`rounded-lg bg-gradient-to-r ${opt.bgGradient} px-3 py-1 font-bold text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                        {fare}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-cyan-400/30 transition-all duration-300"></div>
                </button>
              ))}
            </div>

            {/* Enhanced CTA button with premium animations */}
            <div className="relative">
              <button
                onClick={requestRide}
                className={clsx(
                  "group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 p-6 font-bold text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-cyan-500/25 hover:-translate-y-1",
                  looking && "animate-pulse scale-105"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {looking ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-lg">Conectando conductor...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl group-hover:animate-bounce">🚀</span>
                      <span className="text-lg group-hover:text-cyan-200 transition-colors">Solicitar RideNow</span>
                      <div className="ml-2 text-sm opacity-80 group-hover:opacity-100 transition-opacity">{eta} • {fare}</div>
                    </>
                  )}
                </div>
                <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-4 group-hover:ring-cyan-400/20 transition-all duration-500"></div>
              </button>
            </div>
          </div>

          {/* Right side - Interactive map */}
          <div className="relative">
            <div className="h-[600px] w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
              {/* Dynamic map grid */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 grid grid-cols-16 grid-rows-16 opacity-20">
                  {Array.from({ length: 256 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={clsx(
                        "border border-cyan-500/20 transition-all duration-1000",
                        mapAnimation && Math.random() > 0.8 && "bg-cyan-500/30"
                      )}
                    />
                  ))}
                </div>
                
                {/* Animated route line */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 100 400 Q 200 200 400 300 Q 500 400 600 200"
                    stroke="url(#routeGradient)"
                    strokeWidth="4"
                    fill="none"
                    className="opacity-80"
                    strokeDasharray="10 5"
                    strokeDashoffset={mapAnimation ? "-100" : "0"}
                    style={{ transition: "stroke-dashoffset 2s ease-in-out" }}
                  />
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Dynamic car markers */}
                <div className="absolute inset-0">
                  {[
                    { x: '20%', y: '30%', type: 'available' },
                    { x: '60%', y: '20%', type: 'busy' },
                    { x: '40%', y: '70%', type: 'available' },
                    { x: '80%', y: '60%', type: 'available' }
                  ].map((car, i) => (
                    <div
                      key={i}
                      className="absolute animate-bounce"
                      style={{ 
                        left: car.x, 
                        top: car.y,
                        animationDelay: `${i * 500}ms`,
                        animationDuration: '3s'
                      }}
                    >
                      <div className={clsx(
                        "rounded-full p-2 text-lg shadow-lg",
                        car.type === 'available' 
                          ? "bg-emerald-500 text-white" 
                          : "bg-gray-500 text-white opacity-60"
                      )}>
                        🚗
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pickup and dropoff pins */}
                {pickup && (
                  <div className="absolute bottom-20 left-8 animate-pulse">
                    <div className="rounded-full bg-emerald-500 px-4 py-2 font-bold text-white shadow-lg">
                      📍 Origen
                    </div>
                  </div>
                )}
                {dropoff && (
                  <div className="absolute right-8 top-16 animate-pulse">
                    <div className="rounded-full bg-rose-500 px-4 py-2 font-bold text-white shadow-lg">
                      🎯 Destino
                    </div>
                  </div>
                )}
              </div>

              {/* Driver card overlay */}
              {showDriverCard && (
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl p-4 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          CM
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-black"></div>
                      </div>
                      <div>
                        <p className="font-bold text-white">Carlos Méndez</p>
                        <p className="text-sm text-white/70">Toyota Yaris • ABC-123</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex text-yellow-400 text-xs">★★★★★</div>
                          <span className="text-xs text-white/60">4.9 • 1,247 viajes</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-600 transition-all">
                        📞 Llamar
                      </button>
                      <button className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all">
                        💬 Mensaje
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Modern bottom nav */}
      <nav className="sticky bottom-0 z-30 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-4 px-4">
          {[
            { name: "Inicio", icon: "🏠", active: true, href: "/" },
            { name: "Viajes", icon: "🧭", active: false, href: "/trips" },
            { name: "Wallet", icon: "💳", active: false, href: "/wallet" },
            { name: "Perfil", icon: "👤", active: false, href: "/perfil" },
          ].map((tab) => (
            <a 
              key={tab.name} 
              href={tab.href}
              className={clsx(
                "flex flex-col items-center gap-1 py-4 text-xs font-medium transition-all",
                tab.active 
                  ? "text-cyan-400" 
                  : "text-white/60 hover:text-white"
              )}
            >
              <div className={clsx(
                "rounded-xl p-2 transition-all",
                tab.active 
                  ? "bg-cyan-500/20 text-lg" 
                  : "text-base hover:bg-white/10"
              )}>
                {tab.icon}
              </div>
              <span>{tab.name}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Floating action buttons */}
      <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3">
        <button className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white shadow-2xl hover:scale-110 transition-all" title="Centro de ayuda">
          ❓
        </button>
        <button className="rounded-full bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-white shadow-2xl hover:scale-110 transition-all" title="Compartir ubicación">
          📍
        </button>
      </div>
    </div>
  );
}  