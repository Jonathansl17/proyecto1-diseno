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
  route?: { lat: number; lng: number }[];
  tripType?: 'short' | 'long' | 'intercity';
}

export default function EnhancedTripsScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [showStats, setShowStats] = useState(false);

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
      paymentMethod: 'Visa •••• 4242',
      tripType: 'short'
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
      paymentMethod: 'Mastercard •••• 8888',
      tripType: 'short'
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
      paymentMethod: 'Efectivo',
      tripType: 'long'
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
      paymentMethod: 'Visa •••• 4242',
      tripType: 'long'
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
      paymentMethod: 'Efectivo',
      tripType: 'short'
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
      paymentMethod: 'Visa •••• 4242',
      tripType: 'short'
    },
    {
      id: '7',
      status: 'completed',
      from: 'San Carlos Centro',
      to: 'Campus ITCR San Carlos',
      date: '2 semanas',
      time: '11:30',
      duration: '45 min',
      distance: '35.5 km',
      price: '₡6,865',
      driver: { name: 'Jonathan Sancho', rating: 4.9, avatar: 'JS' },
      vehicle: 'Toyota Tacoma • BGA-324',
      rideType: 'premium',
      paymentMethod: 'Visa •••• 9543',
      tripType: 'intercity'
    }
  ];

  const stats = {
    totalTrips: 47,
    totalSpent: 124800,
    totalDistance: 892,
    avgRating: 4.9,
    co2Saved: 23.5,
    monthlySpent: 18500,
    topDestinations: [
      { name: 'TEC Cartago', count: 12 },
      { name: 'UCR San Pedro', count: 8 },
      { name: 'Centro San José', count: 6 }
    ],
    tripsByType: {
      short: 28,
      long: 14,
      intercity: 5
    }
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

  const getTripTypeColor = (type: Trip['tripType']) => {
    switch (type) {
      case 'short': return 'from-green-500 to-emerald-500';
      case 'long': return 'from-yellow-500 to-orange-500';
      case 'intercity': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const filteredTrips = trips.filter(trip => {
    // Filter by status
    if (activeTab === 'pending') return trip.status === 'active' || trip.status === 'scheduled';
    if (activeTab === 'completed') return trip.status === 'completed';
    if (activeTab === 'cancelled') return trip.status === 'cancelled';
    
    // Filter by search
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      trip.from.toLowerCase().includes(searchLower) ||
      trip.to.toLowerCase().includes(searchLower) ||
      trip.date.toLowerCase().includes(searchLower);

    return matchesSearch;
  });

  // Chart component for trip distribution
  const TripChart = () => {
    const total = stats.tripsByType.short + stats.tripsByType.long + stats.tripsByType.intercity;
    const shortPercent = (stats.tripsByType.short / total) * 100;
    const longPercent = (stats.tripsByType.long / total) * 100;
    const intercityPercent = (stats.tripsByType.intercity / total) * 100;

    return (
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="rgb(34, 197, 94)"
              strokeWidth="8"
              strokeDasharray={`${shortPercent * 2.51} 251`}
              className="transition-all duration-1000"
            />
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="rgb(249, 115, 22)"
              strokeWidth="8"
              strokeDasharray={`${longPercent * 2.51} 251`}
              strokeDashoffset={`-${shortPercent * 2.51}`}
              className="transition-all duration-1000 delay-300"
            />
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="rgb(168, 85, 247)"
              strokeWidth="8"
              strokeDasharray={`${intercityPercent * 2.51} 251`}
              strokeDashoffset={`-${(shortPercent + longPercent) * 2.51}`}
              className="transition-all duration-1000 delay-600"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">{total}</div>
              <div className="text-xs text-white/60">viajes</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mini map component
  const MiniMap = ({ trip }: { trip: Trip }) => (
    <div className="relative w-full h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20"></div>
      </div>
      <div className="absolute inset-2 flex items-center justify-between">
        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="flex-1 mx-2 h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-400"></div>
        <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
      </div>
      <div className="absolute top-1 right-1">
        <button className="text-xs text-white/70 bg-black/30 rounded px-1 py-0.5 hover:bg-black/50">
          🗺️
        </button>
      </div>
    </div>
  );

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
            <button
              className="rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur hover:bg-white/20 transition-all"
              onClick={() => window.history.back()}
            >
              ←
            </button>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Mis Viajes
              </h1>
              <p className="text-sm text-white/60">{stats.totalTrips} viajes realizados</p>
            </div>
          </div>
          <button 
            onClick={() => setShowStats(true)}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/20 transition-all"
          >
            📊 Estadísticas
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8">
        {/* Enhanced Stats Cards */}
        <section
          className={clsx(
            "grid grid-cols-2 md:grid-cols-5 gap-4",
            "transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {[
            { label: 'Viajes', value: stats.totalTrips, icon: '🚗', color: 'from-blue-500 to-cyan-500' },
            { label: 'Este mes', value: `₡${stats.monthlySpent.toLocaleString()}`, icon: '💰', color: 'from-emerald-500 to-green-500' },
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

        {/* Filters and Search */}
        <section
          className={clsx(
            "space-y-4",
            "transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Tab Navigation */}
          <div className="flex gap-2 rounded-2xl border border-white/20 bg-white/5 p-2 backdrop-blur-xl">
            {[
              { id: 'all', label: 'Todos', count: trips.length },
              { id: 'pending', label: 'Pendientes', count: trips.filter(t => t.status === 'active' || t.status === 'scheduled').length },
              { id: 'completed', label: 'Completados', count: trips.filter(t => t.status === 'completed').length },
              { id: 'cancelled', label: 'Cancelados', count: trips.filter(t => t.status === 'cancelled').length }
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

          {/* Search and Date Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-xl">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Buscar por destino o fecha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm placeholder:text-white/50 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'Todo' },
                { id: 'today', label: 'Hoy' },
                { id: 'week', label: '7d' },
                { id: 'month', label: '30d' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setDateFilter(filter.id as typeof dateFilter)}
                  className={clsx(
                    "rounded-lg px-3 py-1 text-xs transition-all",
                    dateFilter === filter.id
                      ? "bg-cyan-500 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Trips List */}
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
              <p className="text-white/60">No se encontraron viajes que coincidan con el filtro.</p>
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
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left: Trip Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`rounded-lg bg-gradient-to-r ${getStatusColor(trip.status)} p-2 text-lg`}>
                          {getStatusIcon(trip.status)}
                        </div>
                        <div>
                          <p className="font-bold text-white capitalize">
                            {trip.status === 'active' ? 'En curso' : 
                             trip.status === 'completed' ? 'Completado' : 
                             trip.status === 'scheduled' ? 'Programado' : 'Cancelado'}
                          </p>
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

                      {/* Enhanced trip details */}
                      <div className="flex items-center justify-between text-sm mb-4">
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
                      </div>

                      {/* Payment method and trip type */}
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-white/60">💳 {trip.paymentMethod}</span>
                        {trip.tripType && (
                          <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${getTripTypeColor(trip.tripType)} px-2 py-1 text-xs font-medium text-white`}>
                            {trip.tripType === 'short' ? 'Corto' : 
                             trip.tripType === 'long' ? 'Largo' : 'Interurbano'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Center: Mini Map */}
                    <div className="lg:col-span-1">
                      <MiniMap trip={trip} />
                      <div className="mt-2 text-center text-xs text-white/60">
                        {trip.duration} • {trip.distance}
                      </div>
                    </div>

                    {/* Right: Price and Actions */}
                    <div className="lg:col-span-1 flex flex-col justify-between">
                      <div className="text-right mb-4">
                        <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                          {trip.price}
                        </p>
                      </div>

                      {trip.status === 'active' && (
                        <div className="space-y-2">
                          <button className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-2 text-sm font-bold text-white hover:from-emerald-600 hover:to-green-600 transition-all">
                            📞 Llamar
                          </button>
                          <button className="w-full rounded-xl border border-white/30 bg-white/10 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all">
                            📍 Rastrear
                          </button>
                        </div>
                      )}

                      {trip.status === 'scheduled' && (
                        <div className="space-y-2">
                          <button className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-sm font-bold text-white hover:from-purple-600 hover:to-pink-600 transition-all">
                            ✏️ Modificar
                          </button>
                          <button className="w-full rounded-xl border border-red-500/50 bg-red-500/20 py-2 text-sm font-medium text-red-300 hover:bg-red-500/30 transition-all">
                            ❌ Cancelar
                          </button>
                        </div>
                      )}

                      {trip.status === 'completed' && (
                        <div className="flex gap-2">
                          <button className="flex-1 rounded-xl border border-white/30 bg-white/10 py-2 text-xs font-medium text-white hover:bg-white/20 transition-all">
                            🔄 Repetir
                          </button>
                          <button className="flex-1 rounded-xl border border-white/30 bg-white/10 py-2 text-xs font-medium text-white hover:bg-white/20 transition-all">
                            📧 Recibo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      {/* Enhanced Statistics Modal */}
      {showStats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-3xl border border-white/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Estadísticas de Viajes</h3>
                <button
                  onClick={() => setShowStats(false)}
                  className="rounded-xl border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Trip Distribution Chart */}
                <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
                  <h4 className="text-lg font-bold text-white mb-4">Distribución por Tipo</h4>
                  <TripChart />
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                      <p className="text-sm text-white/70">Cortos</p>
                      <p className="text-lg font-bold">{stats.tripsByType.short}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-2"></div>
                      <p className="text-sm text-white/70">Largos</p>
                      <p className="text-lg font-bold">{stats.tripsByType.long}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-4 h-4 bg-purple-500 rounded-full mx-auto mb-2"></div>
                      <p className="text-sm text-white/70">Interurbanos</p>
                      <p className="text-lg font-bold">{stats.tripsByType.intercity}</p>
                    </div>
                  </div>
                </div>

                {/* Top Destinations */}
                <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
                  <h4 className="text-lg font-bold text-white mb-4">Destinos Frecuentes</h4>
                  <div className="space-y-4">
                    {stats.topDestinations.map((dest, i) => (
                      <div key={dest.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                            {i + 1}
                          </div>
                          <span className="text-white font-medium">{dest.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{dest.count}</p>
                          <p className="text-xs text-white/60">viajes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly Spending Trend */}
                <div className="lg:col-span-2 rounded-2xl border border-white/20 bg-white/5 p-6">
                  <h4 className="text-lg font-bold text-white mb-4">Resumen Mensual</h4>
                  <div className="grid grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl mb-2">💰</div>
                      <p className="text-2xl font-bold text-emerald-400">₡{stats.monthlySpent.toLocaleString()}</p>
                      <p className="text-xs text-white/60">Gastado este mes</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-2">📊</div>
                      <p className="text-2xl font-bold text-cyan-400">{Math.round(stats.totalDistance / stats.totalTrips)}</p>
                      <p className="text-xs text-white/60">km promedio</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-2">⭐</div>
                      <p className="text-2xl font-bold text-yellow-400">{stats.avgRating}</p>
                      <p className="text-xs text-white/60">Rating promedio</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-2">🌱</div>
                      <p className="text-2xl font-bold text-green-400">{stats.co2Saved} kg</p>
                      <p className="text-xs text-white/60">CO₂ ahorrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Trip Details Modal */}
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
                {/* Enhanced Route with Map */}
                <div>
                  <div className="mb-4">
                    <MiniMap trip={selectedTrip} />
                  </div>
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

                {/* Enhanced Trip Info */}
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

                {/* Enhanced Driver info */}
                {selectedTrip.driver.name !== 'Por asignar' && (
                  <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                        {selectedTrip.driver.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold">{selectedTrip.driver.name}</p>
                        <p className="text-sm text-white/60">{selectedTrip.vehicle}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-yellow-400 text-sm">★</span>
                          <span className="text-white/70 text-sm">{selectedTrip.driver.rating}</span>
                          {selectedTrip.tripType && (
                            <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${getTripTypeColor(selectedTrip.tripType)} px-2 py-1 text-xs font-medium text-white ml-2`}>
                              {selectedTrip.tripType === 'short' ? 'Corto' : 
                               selectedTrip.tripType === 'long' ? 'Largo' : 'Interurbano'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Payment */}
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

                {/* Enhanced Actions */}
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