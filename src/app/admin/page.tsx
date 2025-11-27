"use client";

import { useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { TrendingUp, Users, Car, DollarSign, MapPin, Star, Calendar, Clock } from 'lucide-react';

function clsx(...args: (string | undefined | null | false)[]) {
  return args.filter(Boolean).join(" ");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TripsMockupV4() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("timeline");

type Trip = {
  id: string;
  userId: string;
  driverId: string;
  status: string;
  from: string;
  to: string;
  date: string;
  time: string;
  duration: string;
  distance: string;
  price: number;
  rideType: string;
  paymentMethod: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  // tu backend NO manda driver ni vehicle todavía
  driver?: { name: string; rating: number; avatar: string } | null;
  vehicleId: string;
};



  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedDriver, setSelectedDriver] = useState("all");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    async function loadTrips() {
      try {
        const res = await fetch(`${API_URL}/api/trips`);
        const data = await res.json();
        console.log("Viajes cargados:", data);
        setTrips(data.data.trips);
      } catch (err) {
        console.error("Error cargando viajes:", err);
      }
    }

    loadTrips();
  }, []);

  
  const topDrivers = [
    { name: "Miguel Castro", avatar: "MC", avgRating: 5.0, trips: 8 },
    { name: "Carlos Méndez", avatar: "CM", avgRating: 4.9, trips: 12 },
    { name: "Ana Rodríguez", avatar: "AR", avgRating: 4.8, trips: 6 },
    { name: "Luis Vargas", avatar: "LV", avgRating: 4.7, trips: 4 }
  ];

  const ratingStats = {
    average: 4.85,
    distribution: {
      5: 45,
      4: 35,
      3: 15,
      2: 3,
      1: 2
    },
    totalRatings: 47
  };

  const heatmapData = [
    { destination: "TEC Cartago", frequency: 12, lat: 9.85, lng: -83.91 },
    { destination: "UCR San Pedro", frequency: 8, lat: 9.94, lng: -84.05 },
    { destination: "Centro San José", frequency: 6, lat: 9.93, lng: -84.08 },
    { destination: "Mall San Pedro", frequency: 5, lat: 9.93, lng: -84.05 },
    { destination: "Aeropuerto SJO", frequency: 4, lat: 9.99, lng: -84.21 }
  ];

  // Funciones para calcular estadísticas
  const calculateStats = () => {
    const totalTrips = trips.length;
    const completedTrips = trips.filter(trip => trip.status === 'completed').length;
    const activeTrips = trips.filter(trip => trip.status === 'active').length;
    const scheduledTrips = trips.filter(trip => trip.status === 'scheduled').length;

    const totalRevenue = trips
      .filter(trip => trip.status === 'completed')
      .reduce((sum, trip) => sum + trip.price, 0); // <- ARREGLADO

    const avgTripValue = totalRevenue / completedTrips || 0;

    const uniqueDrivers = new Set(trips.map(trip => trip.driver?.name)).size;

    return {
      totalTrips,
      completedTrips,
      activeTrips,
      scheduledTrips,
      totalRevenue,
      avgTripValue,
      uniqueDrivers
    };
  };


  const getRevenueByDay = () => {
    const last7Days = Array.from({length: 7}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const dayTrips = trips.filter(trip => 
        trip.date === date && trip.status === 'completed'
      );
      const revenue = dayTrips.reduce((sum, trip) => sum + trip.price, 0);
      const tripCount = dayTrips.length;
      
      return {
        date: new Date(date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }),
        revenue,
        trips: tripCount
      };
    });
  };

  const getCityDistribution = () => {
    const cityStats = trips.reduce((acc: any, trip) => {
      acc[trip.city] = (acc[trip.city] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(cityStats).map(([city, count]: [string, any]) => ({
      name: city,
      value: count,
      percentage: Math.round((count / trips.length) * 100)
    }));
  };

  const getHourlyDistribution = () => {
    const hourStats = trips.reduce((acc: any, trip) => {
      const hour = parseInt(trip.time.split(':')[0]);
      const period = hour < 12 ? 'Mañana' : hour < 18 ? 'Tarde' : 'Noche';
      acc[period] = (acc[period] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(hourStats).map(([period, count]: [string, any]) => ({
      period,
      trips: count
    }));
  };

  const stats = calculateStats();
  const revenueData = getRevenueByDay();
  const cityData = getCityDistribution();
  const hourlyData = getHourlyDistribution();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getStatusColor = (status: "active" | "completed" | "scheduled" | "cancelled") => {
    const colors = {
      active: "from-emerald-500 to-green-500",
      completed: "from-blue-500 to-cyan-500",
      scheduled: "from-purple-500 to-pink-500",
      cancelled: "from-gray-500 to-slate-500"
    };
    return colors[status as keyof typeof colors] || "from-gray-500 to-slate-500";
  };

  const getStatusIcon = (status: "active" | "completed" | "scheduled" | "cancelled") => {
    const icons = {
      active: "🚗",
      completed: "✅",
      scheduled: "⏰",
      cancelled: "❌"
    };
    return icons[status as keyof typeof icons] || "📍";
  };

  const handleDownloadReceipt = (trip: Trip) => {
    alert("Descargando comprobante PDF del viaje #" + trip.id + "...");
    setShowDownload(false);
  };

  const filteredTrips = trips.filter(trip => {
    if (dateRange.from && trip.date < dateRange.from) return false;
    if (dateRange.to && trip.date > dateRange.to) return false;
    
    const price = trip.price;
    if (priceRange.min && price < parseInt(priceRange.min)) return false;
    if (priceRange.max && price > parseInt(priceRange.max)) return false;
    
    if (selectedCity !== "all" && trip.city !== selectedCity) return false;
    if (selectedDriver !== "all" && trip.driver?.name !== selectedDriver) return false;
    
    return true;
  });

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <button className="rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur hover:bg-white/20 transition-all">
              ←
            </button>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Mis Viajes Pro
              </h1>
              <p className="text-sm text-white/60">{trips.length} viajes</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/20 transition-all"
          >
            🔍 Filtros
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 relative z-10">
        {showAdvancedFilters && (
          <section className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4">Filtros Avanzados</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-white/60 mb-2">Fecha desde</label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-2">Fecha hasta</label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-2">Precio mínimo</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  placeholder="₡0"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-2">Precio máximo</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  placeholder="₡10000"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-2">Ciudad</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="all">Todas</option>
                  <option value="San José">San José</option>
                  <option value="Cartago">Cartago</option>
                  <option value="Alajuela">Alajuela</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-2">Conductor</label>
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="all">Todos</option>
                  {topDrivers.map(d => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 flex items-end gap-2">
                <button
                  onClick={() => {
                    setDateRange({ from: "", to: "" });
                    setPriceRange({ min: "", max: "" });
                    setSelectedCity("all");
                    setSelectedDriver("all");
                  }}
                  className="flex-1 rounded-lg border border-white/20 bg-white/10 py-2 text-sm hover:bg-white/20"
                >
                  Limpiar
                </button>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="flex-1 rounded-lg bg-cyan-500 py-2 text-sm font-bold hover:bg-cyan-600"
                >
                  Aplicar
                </button>
              </div>
            </div>
            <p className="text-xs text-white/60 mt-4">
              Mostrando {filteredTrips.length} de {trips.length} viajes
            </p>
          </section>
        )}

        <section>
          <div className="flex gap-2 rounded-2xl border border-white/20 bg-white/5 p-2 backdrop-blur-xl overflow-x-auto">
            {[
              { id: "timeline", label: "Timeline", icon: "📅" },
              { id: "map", label: "Mapa", icon: "🗺️" },
              { id: "ratings", label: "Ratings", icon: "⭐" },
              { id: "analytics", label: "Estadísticas", icon: "📊" },
              { id: "list", label: "Lista", icon: "📋" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className={clsx(
          "transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {activeTab === "timeline" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  📅 Timeline de Viajes
                </h3>
                <p className="text-white/60">Tu historial cronológico con línea de tiempo interactiva</p>
              </div>

              {/* Estadísticas del Timeline */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 text-center">
                  <div className="text-green-400 text-2xl font-bold">{filteredTrips.filter(t => t.status === 'completed').length}</div>
                  <div className="text-green-300 text-xs font-medium">Completados</div>
                </div>
                <div className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 text-center">
                  <div className="text-blue-400 text-2xl font-bold">{filteredTrips.filter(t => t.status === 'active').length}</div>
                  <div className="text-blue-300 text-xs font-medium">Activos</div>
                </div>
                <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 text-center">
                  <div className="text-purple-400 text-2xl font-bold">{filteredTrips.filter(t => t.status === 'scheduled').length}</div>
                  <div className="text-purple-300 text-xs font-medium">Programados</div>
                </div>
                <div className="rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-4 text-center">
                  <div className="text-orange-400 text-2xl font-bold">{filteredTrips.length}</div>
                  <div className="text-orange-300 text-xs font-medium">Total Filtrados</div>
                </div>
              </div>

              {/* Timeline Visual */}
              <div className="relative">
                {/* Línea de tiempo principal */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 opacity-30"></div>
                
                <div className="space-y-8">
                  {filteredTrips.map((trip, index) => {
                    const isFirst = index === 0;
                    const isLast = index === filteredTrips.length - 1;
                    
                    return (
                      <div key={trip.id} className="relative">
                        {/* Línea conectora */}
                        {!isLast && (
                          <div className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
                        )}
                        
                        {/* Contenedor del viaje */}
                        <div
                          onClick={() => {
                            setSelectedTrip(trip);
                            setShowDetails(true);
                          }}
                          className="group relative ml-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl"
                        >
                          {/* Indicador de estado en la línea de tiempo */}
                          <div className="absolute -left-20 top-6 flex items-center">
                            <div className={`relative w-8 h-8 rounded-full bg-gradient-to-r ${getStatusColor(trip.status as "active" | "completed" | "scheduled" | "cancelled")} flex items-center justify-center text-white font-bold text-sm shadow-lg ring-4 ring-black/20`}>
                              {getStatusIcon(trip.status as "active" | "completed" | "scheduled" | "cancelled")}
                              {trip.status === 'active' && (
                                <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping"></div>
                              )}
                            </div>
                          </div>

                          <div className="p-6">
                            {/* Header del viaje */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                                    trip.status === 'active' ? 'bg-green-500/80' :
                                    trip.status === 'completed' ? 'bg-blue-500/80' :
                                    trip.status === 'scheduled' ? 'bg-purple-500/80' :
                                    'bg-gray-500/80'
                                  }`}>
                                    {trip.status === 'active' ? '🚗 En curso' :
                                     trip.status === 'completed' ? '✅ Completado' :
                                     trip.status === 'scheduled' ? '⏰ Programado' :
                                     '❌ Cancelado'}
                                  </div>
                                  <div className="text-xs text-white/60 font-medium">
                                    {trip.date} • {trip.time}
                                  </div>
                                </div>
                                
                                <h4 className="font-bold text-white text-xl group-hover:text-cyan-300 transition-colors mb-2">
                                  {trip.from} → {trip.to}
                                </h4>
                                
                                <div className="flex items-center gap-4 text-sm text-white/70">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {trip.city}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {trip.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    🚗 {trip.distance}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="text-right ml-4">
                                <p className="text-3xl font-black text-cyan-400 mb-1">
                                  ₡{trip.price.toLocaleString()}
                                </p>
                                <div className="text-xs text-white/60">
                                  {trip.paymentMethod}
                                </div>
                              </div>
                            </div>

                            {/* Información del conductor */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                                  {trip.driver?.avatar}
                                </div>
                                <div>
                                  <p className="text-white font-medium">{trip.driver?.name}</p>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                    <span className="text-yellow-400 text-xs font-medium">{trip.driver?.rating}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-white/70 text-sm font-medium">{trip.vehicleId}</p>
                                <p className="text-white/50 text-xs">
                                  {trip.rideType === 'premium' ? '👑 Premium' : '🚗 Standard'}
                                </p>
                              </div>
                            </div>

                            {/* Indicador de progreso para viajes activos */}
                            {trip.status === 'active' && (
                              <div className="mt-4 pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                  <span className="text-green-400 text-sm font-medium">Viaje en progreso</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full w-3/4 animate-pulse"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mensaje si no hay viajes */}
                {filteredTrips.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Car className="w-12 h-12 text-white/30" />
                    </div>
                    <p className="text-white/60 text-lg">No hay viajes que mostrar</p>
                    <p className="text-white/40 text-sm">Ajusta los filtros para ver más resultados</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "map" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Mapa de Calor</h3>
                <p className="text-white/60">Tus destinos más frecuentes</p>
              </div>
              <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
                <div className="relative h-96 bg-slate-700/50 rounded-2xl overflow-hidden">
                  {heatmapData.map((point, i) => {
                    const size = 20 + (point.frequency * 5);
                    const opacity = 0.3 + (point.frequency / 15);
                    return (
                      <div
                        key={i}
                        className="absolute rounded-full animate-pulse"
                        style={{
                          left: ((point.lng + 84.5) * 10) + "%",
                          top: ((10.2 - point.lat) * 10) + "%",
                          width: size + "px",
                          height: size + "px",
                          backgroundColor: "rgba(6, 182, 212, " + opacity + ")",
                          boxShadow: "0 0 " + size + "px rgba(6, 182, 212, " + opacity + ")"
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {heatmapData.map((point, i) => (
                  <div key={i} className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
                    <p className="font-bold text-white text-sm">{point.destination}</p>
                    <p className="text-xs text-cyan-300">{point.frequency} viajes</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "ratings" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                  ⭐ Sistema de Calificaciones
                </h3>
                <p className="text-white/60">Análisis detallado de ratings y rendimiento</p>
              </div>

              {/* Rating Principal Mejorado */}
              <div className="relative rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-amber-500/20 p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-center">
                      <p className="text-yellow-300 font-medium mb-2">Rating Promedio General</p>
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-7xl font-black text-white drop-shadow-lg">{ratingStats.average}</span>
                        <div className="flex flex-col items-center">
                          <div className="flex text-yellow-400 text-4xl mb-2">
                            {[1,2,3,4,5].map((star) => (
                              <span 
                                key={star}
                                className={`${star <= Math.floor(ratingStats.average) ? 'animate-pulse' : 'opacity-30'} transition-all duration-500`}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-yellow-200">Excelente</p>
                        </div>
                      </div>
                      <p className="text-white/80 font-medium">Basado en {ratingStats.totalRatings} calificaciones</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distribución de Ratings */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gráfico de Distribución */}
                <div className="lg:col-span-2 rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-400" />
                    Distribución de Calificaciones
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(ratingStats.distribution).reverse().map(([rating, count]) => {
                      const percentage = (count / ratingStats.totalRatings) * 100;
                      return (
                        <div key={rating} className="flex items-center gap-4">
                          <div className="flex items-center gap-2 w-20">
                            <span className="text-white font-medium">{rating}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </div>
                          <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="text-right w-16">
                            <span className="text-white font-bold">{count}</span>
                            <span className="text-white/60 text-xs ml-1">({percentage.toFixed(1)}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Estadísticas Rápidas */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                      </div>
                      <h5 className="font-bold text-white mb-1">Satisfacción</h5>
                      <p className="text-3xl font-black text-green-400">{((ratingStats.distribution[4] + ratingStats.distribution[5]) / ratingStats.totalRatings * 100).toFixed(1)}%</p>
                      <p className="text-xs text-white/60">4-5 estrellas</p>
                    </div>
                  </div>
                  
                  <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-blue-400" />
                      </div>
                      <h5 className="font-bold text-white mb-1">Conductores</h5>
                      <p className="text-3xl font-black text-blue-400">{topDrivers.length}</p>
                      <p className="text-xs text-white/60">Activos</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Conductores Mejorado */}
              <div className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  Ranking de Conductores
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topDrivers.map((driver, i) => (
                    <div key={i} className="group relative rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 hover:from-white/10 hover:to-white/15 transition-all duration-300 cursor-pointer">
                      {/* Ranking Badge */}
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-black font-black text-sm">
                        #{i + 1}
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {driver.avatar}
                          </div>
                          {/* Rating Badge */}
                          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-black">
                            ⭐ {driver.avgRating}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h5 className="font-bold text-white text-lg group-hover:text-yellow-300 transition-colors">
                            {driver.name}
                          </h5>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[1,2,3,4,5].map((star) => (
                                <Star 
                                  key={star}
                                  className={`w-4 h-4 ${star <= Math.floor(driver.avgRating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                                />
                              ))}
                            </div>
                            <span className="text-yellow-400 font-medium">({driver.avgRating})</span>
                          </div>
                          <p className="text-white/60 text-sm mt-1">{driver.trips} viajes completados</p>
                        </div>
                      </div>
                      
                      {/* Estadísticas del conductor */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div className="text-center">
                          <p className="text-white/60 text-xs">Eficiencia</p>
                          <p className="text-cyan-400 font-bold">{((driver.avgRating / 5) * 100).toFixed(0)}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/60 text-xs">Experiencia</p>
                          <p className="text-purple-400 font-bold">{driver.trips > 10 ? 'Alta' : driver.trips > 5 ? 'Media' : 'Nueva'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">📊 Dashboard de Estadísticas</h3>
                <p className="text-white/60">Análisis completo de tu actividad de viajes</p>
              </div>

              {/* Métricas Principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Car className="w-6 h-6 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">Total Viajes</span>
                  </div>
                  <p className="text-3xl font-black text-white">{stats.totalTrips}</p>
                  <p className="text-xs text-white/60">+{stats.completedTrips} completados</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-green-400" />
                    <span className="text-sm font-medium text-green-300">Ingresos Totales</span>
                  </div>
                  <p className="text-3xl font-black text-white">₡{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-white/60">Promedio: ₡{Math.round(stats.avgTripValue).toLocaleString()}</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-6 h-6 text-purple-400" />
                    <span className="text-sm font-medium text-purple-300">Conductores</span>
                  </div>
                  <p className="text-3xl font-black text-white">{stats.uniqueDrivers}</p>
                  <p className="text-xs text-white/60">Conductores únicos</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                    <span className="text-sm font-medium text-orange-300">Activos</span>
                  </div>
                  <p className="text-3xl font-black text-white">{stats.activeTrips}</p>
                  <p className="text-xs text-white/60">Viajes en curso</p>
                </div>
              </div>

              {/* Gráfico de Ingresos por Día */}
              <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Ingresos de los Últimos 7 Días
                </h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9CA3AF"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        fontSize={12}
                        tickFormatter={(value) => `₡${value.toLocaleString()}`}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                        formatter={(value: any) => [`₡${value.toLocaleString()}`, 'Ingresos']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#06B6D4" 
                        fill="url(#colorRevenue)"
                      />
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gráficos de Distribución */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Distribución por Ciudades */}
                <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Distribución por Ciudades
                  </h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {cityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Viajes por Horario */}
                <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Distribución por Horario
                  </h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="period" 
                          stroke="#9CA3AF"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#9CA3AF"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }}
                        />
                        <Bar dataKey="trips" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Tabla de Rendimiento por Conductor */}

              </div>
     
          )}

          {activeTab === "list" && (
            <div className="space-y-4">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Lista de Viajes</h3>
                <p className="text-white/60">Todos tus viajes</p>
              </div>
              {filteredTrips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => {
                    setSelectedTrip(trip);
                    setShowDetails(true);
                  }}
                  className="rounded-2xl border border-white/20 bg-white/5 p-6 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <div className={"w-12 h-12 rounded-xl bg-gradient-to-r " + getStatusColor(trip.status as "active" | "completed" | "scheduled" | "cancelled") + " flex items-center justify-center text-xl"}>
                        {getStatusIcon(trip.status as "active" | "completed" | "scheduled" | "cancelled")}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{trip.from} → {trip.to}</h4>
                        <p className="text-sm text-white/60">{trip.date} • {trip.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-cyan-400">₡{trip.price.toLocaleString()}</p>
                      <p className="text-xs text-white/60">{trip.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {showDetails && selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowDetails(false)}>
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/20 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-all text-2xl leading-none"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Detalles del Viaje</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                <p className="text-sm text-white/60">Origen</p>
                <p className="text-white font-bold">{selectedTrip.from}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                <p className="text-sm text-white/60">Destino</p>
                <p className="text-white font-bold">{selectedTrip.to}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                  <p className="text-sm text-white/60">Fecha</p>
                  <p className="text-white font-bold">{selectedTrip.date}</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                  <p className="text-sm text-white/60">Hora</p>
                  <p className="text-white font-bold">{selectedTrip.time}</p>
                </div>
              </div>
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
                <p className="text-sm text-white/60">Total</p>
                <p className="text-3xl font-black text-white">₡{selectedTrip.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => {
                  setShowDetails(false);
                  setShowDownload(true);
                }}
                className="w-full rounded-xl bg-purple-500 py-3 font-bold text-white hover:bg-purple-600"
              >
                📄 Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {showDownload && selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowDownload(false)}>
          <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowDownload(false)}
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 hover:bg-white/20 text-2xl leading-none"
            >
              ×
            </button>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-2xl font-bold text-white mb-2">Descargar Comprobante</h2>
              <p className="text-white/60">Viaje #{selectedTrip.id}</p>
            </div>
            <button
              onClick={() => handleDownloadReceipt(selectedTrip)}
              className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 font-bold text-white hover:scale-105 transition-all"
            >
              ⬇️ Descargar PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}