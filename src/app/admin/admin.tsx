"use client";
import { useEffect, useState } from "react";

function clsx(...arr: (string | false | null | undefined)[]): string {
  return arr.filter(Boolean).join(" ");
}

interface Trip {
  id: string;
  status: 'completed' | 'cancelled' | 'active' | 'scheduled';
  from: string;
  to: string;
  date: string;
  time: string;
  duration: string;
  distance: string;
  price: string;
  driver: {
    name: string;
    rating: number;
    avatar: string;
  };
  vehicle: string;
  rideType: 'standard' | 'premium' | 'moto' | 'electric';
  paymentMethod: string;
}

export default function TripsScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'recent' | 'active' | 'scheduled'>('recent');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const trips: Trip[] = [
    {
      id: '1',
      status: 'active',
      from: 'Mi ubicación actual',
      to: 'TEC Cartago',
      date: 'Hoy',
      time: '14:25',
      duration: '12 min',
      distance: '8.2 km',
      price: '₡2,840',
      driver: { name: 'Carlos Méndez', rating: 4.9, avatar: 'CM' },
      vehicle: 'Toyota Yaris • ABC-123',
      rideType: 'standard',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: '2',
      status: 'completed',
      from: 'Centro de San José',
      to: 'Universidad de Costa Rica',
      date: 'Ayer',
      time: '09:15',
      duration: '18 min',
      distance: '12.5 km',
      price: '₡3,200',
      driver: { name: 'Ana Rodríguez', rating: 4.8, avatar: 'AR' },
      vehicle: 'Honda Civic • DEF-456',
      rideType: 'premium',
      paymentMethod: 'Mastercard •••• 8888'
    },
    {
      id: '3',
      status: 'completed',
      from: 'Aeropuerto Juan Santamaría',
      to: 'Hotel Presidente',
      date: '3 días',
      time: '16:30',
      duration: '35 min',
      distance: '22.1 km',
      price: '₡5,650',
      driver: { name: 'Miguel Castro', rating: 5.0, avatar: 'MC' },
      vehicle: 'Nissan Sentra • GHI-789',
      rideType: 'premium',
      paymentMethod: 'Efectivo'
    },
    {
      id: '4',
      status: 'scheduled',
      from: 'Casa',
      to: 'Aeropuerto Juan Santamaría',
      date: 'Mañana',
      time: '06:00',
      duration: '~ 30 min',
      distance: '~ 20 km',
      price: '₡4,800',
      driver: { name: 'Por asignar', rating: 0, avatar: '?' },
      vehicle: 'Vehículo Premium',
      rideType: 'premium',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: '5',
      status: 'completed',
      from: 'Mall San Pedro',
      to: 'Barrio Escalante',
      date: '5 días',
      time: '20:45',
      duration: '8 min',
      distance: '3.2 km',
      price: '₡1,400',
      driver: { name: 'Luis Vargas', rating: 4.7, avatar: 'LV' },
      vehicle: 'Yamaha MT-03 • JKL-012',
      rideType: 'moto',
      paymentMethod: 'Efectivo'
    },
    {
      id: '6',
      status: 'cancelled',
      from: 'Plaza de la Cultura',
      to: 'Mercado Central',
      date: '1 semana',
      time: '11:30',
      duration: '—',
      distance: '—',
      price: '₡0',
      driver: { name: 'Roberto Jiménez', rating: 4.6, avatar: 'RJ' },
      vehicle: 'Hyundai Accent • MNO-345',
      rideType: 'standard',
      paymentMethod: 'Visa •••• 4242'
    }
  ];

  const stats = {
    totalTrips: 47,
    totalSpent: 124800,
    totalDistance: 892,
    avgRating: 4.9,
    co2Saved: 23.5
  };

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'active': return 'from-emerald-500 to-green-500';
      case 'completed': return 'from-blue-500 to-cyan-500';
      case 'scheduled': return 'from-purple-500 to-pink-500';
      case 'cancelled': return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusIcon = (status: Trip['status']) => {
    switch (status) {
      case 'active': return '🚗';
      case 'completed': return '✅';
      case 'scheduled': return '⏰';
      case 'cancelled': return '❌';
    }
  };

  const getRideTypeIcon = (type: Trip['rideType']) => {
    switch (type) {
      case 'standard': return '🚗';
      case 'premium': return '🚘';
      case 'moto': return '🏍️';
      case 'electric': return '⚡';
    }
  };

  const filteredTrips = trips.filter(trip => {
    if (activeTab === 'recent') return trip.status === 'completed' || trip.status === 'cancelled';
    if (activeTab === 'active') return trip.status === 'active';
    if (activeTab === 'scheduled') return trip.status === 'scheduled';
    return false;
  });

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            <button className="rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur hover:bg-white/20 transition-all">
              ←
            </button>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Mis Viajes
              </h1>
              <p className="text-sm text-white/60">{stats.totalTrips} viajes realizados</p>
            </div>
          </div>
          <button className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/20 transition-all">
            📊 Estadísticas
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8">
        {/* Stats Cards */}
        <section
          className={clsx(
            "grid grid-cols-2 md:grid-cols-5 gap-4",
            "transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {[
            { label: 'Viajes', value: stats.totalTrips, icon: '🚗', color: 'from-blue-500 to-cyan-500' },
            { label: 'Gastado', value: `₡${stats.totalSpent.toLocaleString()}`, icon: '💰', color: 'from-emerald-500 to-green-500' },
            { label: 'Distancia', value: `${stats.totalDistance} km`, icon: '📏', color: 'from-purple-500 to-pink-500' },
            { label: 'Rating', value: `${stats.avgRating}★`, icon: '⭐', color: 'from-yellow-500 to-orange-500' },
            { label: 'CO₂ Ahorrado', value: `${stats.co2Saved} kg`, icon: '🌱', color: 'from-green-500 to-emerald-500' }
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 shadow-xl hover:bg-white/10 transition-all"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`rounded-lg bg-gradient-to-r ${stat.color} p-2 text-lg`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
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
              { id: 'recent', label: 'Recientes', count: trips.filter(t => t.status === 'completed' || t.status === 'cancelled').length },
              { id: 'active', label: 'Activos', count: trips.filter(t => t.status === 'active').length },
              { id: 'scheduled', label: 'Programados', count: trips.filter(t => t.status === 'scheduled').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={clsx(
                  "flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={clsx(
                    "ml-2 rounded-full px-2 py-0.5 text-xs",
                    activeTab === tab.id ? "bg-white/20" : "bg-white/10"
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Trips List */}
        <section
          className={clsx(
            "space-y-4",
            "transition-all duration-1000 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {filteredTrips.length === 0 ? (
            <div className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-12 text-center">
              <div className="text-6xl mb-4 opacity-50">🚗</div>
              <h3 className="text-xl font-bold text-white/80 mb-2">No hay viajes</h3>
              <p className="text-white/60">
                {activeTab === 'active' && "No tienes viajes activos en este momento"}
                {activeTab === 'scheduled' && "No tienes viajes programados"}
                {activeTab === 'recent' && "No tienes historial de viajes"}
              </p>
            </div>
          ) : (
            filteredTrips.map((trip, i) => (
              <div
                key={trip.id}
                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${i * 100}ms` }}
                onClick={() => {
                  setSelectedTrip(trip);
                  setShowDetails(true);
                }}
              >
                {/* Status indicator */}
                <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${getStatusColor(trip.status)}`}></div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`rounded-lg bg-gradient-to-r ${getStatusColor(trip.status)} p-2 text-lg`}>
                          {getStatusIcon(trip.status)}
                        </div>
                        <div>
                          <p className="font-bold text-white capitalize">{trip.status === 'active' ? 'En curso' : trip.status === 'completed' ? 'Completado' : trip.status === 'scheduled' ? 'Programado' : 'Cancelado'}</p>
                          <p className="text-sm text-white/60">{trip.date} • {trip.time}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                          <p className="text-white/90 font-medium">{trip.from}</p>
                        </div>
                        <div className="ml-6 w-px h-6 bg-gradient-to-b from-emerald-400 to-rose-400"></div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                          <p className="text-white/90 font-medium">{trip.to}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {trip.price}
                      </p>
                      <p className="text-sm text-white/60">{trip.duration} • {trip.distance}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getRideTypeIcon(trip.rideType)}</span>
                        <span className="text-white/70">{trip.vehicle}</span>
                      </div>
                      {trip.driver.name !== 'Por asignar' && (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                            {trip.driver.avatar}
                          </div>
                          <span className="text-white/70">{trip.driver.name}</span>
                          {trip.driver.rating > 0 && (
                            <span className="text-yellow-400">★ {trip.driver.rating}</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-white/60">{trip.paymentMethod}</span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-cyan-400">→</span>
                      </div>
                    </div>
                  </div>

                  {trip.status === 'active' && (
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-2 text-sm font-bold text-white hover:from-emerald-600 hover:to-green-600 transition-all">
                        📞 Llamar conductor
                      </button>
                      <button className="flex-1 rounded-xl border border-white/30 bg-white/10 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all">
                        📍 Rastrear
                      </button>
                    </div>
                  )}

                  {trip.status === 'scheduled' && (
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-sm font-bold text-white hover:from-purple-600 hover:to-pink-600 transition-all">
                        ✏️ Modificar
                      </button>
                      <button className="flex-1 rounded-xl border border-red-500/50 bg-red-500/20 py-2 text-sm font-medium text-red-300 hover:bg-red-500/30 transition-all">
                        ❌ Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      {/* Trip Details Modal */}
      {showDetails && selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Detalles del viaje</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="rounded-xl border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Route */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">{selectedTrip.from}</p>
                      <p className="text-xs text-white/60">{selectedTrip.date} • {selectedTrip.time}</p>
                    </div>
                  </div>
                  <div className="ml-8 w-px h-8 bg-gradient-to-b from-emerald-400 to-rose-400"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-rose-400 rounded-full"></div>
                    <p className="text-white font-medium">{selectedTrip.to}</p>
                  </div>
                </div>

                {/* Trip info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/20 bg-white/5 p-3">
                    <p className="text-xs text-white/60">Duración</p>
                    <p className="text-white font-bold">{selectedTrip.duration}</p>
                  </div>
                  <div className="rounded-xl border border-white/20 bg-white/5 p-3">
                    <p className="text-xs text-white/60">Distancia</p>
                    <p className="text-white font-bold">{selectedTrip.distance}</p>
                  </div>
                  <div className="rounded-xl border border-white/20 bg-white/5 p-3">
                    <p className="text-xs text-white/60">Tipo</p>
                    <p className="text-white font-bold flex items-center gap-1">
                      {getRideTypeIcon(selectedTrip.rideType)} 
                      {selectedTrip.rideType === 'standard' ? 'Económico' : 
                       selectedTrip.rideType === 'premium' ? 'Premium' :
                       selectedTrip.rideType === 'moto' ? 'Moto' : 'Eléctrico'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/20 bg-white/5 p-3">
                    <p className="text-xs text-white/60">Total</p>
                    <p className="text-cyan-400 font-bold text-lg">{selectedTrip.price}</p>
                  </div>
                </div>

                {/* Driver info */}
                {selectedTrip.driver.name !== 'Por asignar' && (
                  <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                        {selectedTrip.driver.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold">{selectedTrip.driver.name}</p>
                        <p className="text-sm text-white/60">{selectedTrip.vehicle}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-400 text-sm">★</span>
                          <span className="text-white/70 text-sm">{selectedTrip.driver.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment */}
                <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/60">Método de pago</p>
                      <p className="text-white font-medium">{selectedTrip.paymentMethod}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/60">Estado</p>
                      <div className={`inline-flex items-center gap-1 rounded-lg bg-gradient-to-r ${getStatusColor(selectedTrip.status)} px-3 py-1 text-sm font-bold text-white`}>
                        {getStatusIcon(selectedTrip.status)}
                        <span className="capitalize">
                          {selectedTrip.status === 'completed' ? 'Pagado' : 
                           selectedTrip.status === 'active' ? 'En curso' :
                           selectedTrip.status === 'scheduled' ? 'Programado' : 'Cancelado'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 rounded-xl border border-white/30 bg-white/10 py-3 text-sm font-medium text-white hover:bg-white/20 transition-all">
                    📧 Recibo
                  </button>
                  <button className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-sm font-bold text-white hover:from-cyan-600 hover:to-blue-600 transition-all">
                    🔄 Repetir viaje
                  </button>
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
            { name: "Viajes", icon: "🧭", active: true },
            { name: "Wallet", icon: "💳", active: false },
            { name: "Perfil", icon: "👤", active: false },
          ].map((tab) => (
            <button 
              key={tab.name} 
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
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}