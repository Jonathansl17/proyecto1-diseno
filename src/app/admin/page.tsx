"use client";

import { useEffect, useState } from "react";

function clsx(...args: (string | undefined | null | false)[]) {
  return args.filter(Boolean).join(" ");
}

export default function TripsMockupV4() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("timeline");
  type Trip = {
    id: string;
    status: string;
    from: string;
    to: string;
    date: string;
    time: string;
    duration: string;
    distance: string;
    price: string;
    driver: { name: string; rating: number; avatar: string };
    vehicle: string;
    rideType: string;
    paymentMethod: string;
    city: string;
  };

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

  const trips = [
    {
      id: "1",
      status: "active",
      from: "Mi ubicación actual",
      to: "TEC Cartago",
      date: "2025-09-29",
      time: "14:25",
      duration: "12 min",
      distance: "8.2 km",
      price: "2840",
      driver: { name: "Carlos Méndez", rating: 4.9, avatar: "CM" },
      vehicle: "Toyota Yaris",
      rideType: "standard",
      paymentMethod: "Visa",
      city: "Cartago"
    },
    {
      id: "2",
      status: "completed",
      from: "Centro de San José",
      to: "Universidad de Costa Rica",
      date: "2025-09-28",
      time: "09:15",
      duration: "18 min",
      distance: "12.5 km",
      price: "3200",
      driver: { name: "Ana Rodríguez", rating: 4.8, avatar: "AR" },
      vehicle: "Honda Civic",
      rideType: "premium",
      paymentMethod: "Mastercard",
      city: "San José"
    },
    {
      id: "3",
      status: "completed",
      from: "Aeropuerto Juan Santamaría",
      to: "Hotel Presidente",
      date: "2025-09-26",
      time: "16:30",
      duration: "35 min",
      distance: "22.1 km",
      price: "5650",
      driver: { name: "Miguel Castro", rating: 5.0, avatar: "MC" },
      vehicle: "Nissan Sentra",
      rideType: "premium",
      paymentMethod: "Efectivo",
      city: "Alajuela"
    },
    {
      id: "4",
      status: "scheduled",
      from: "Casa",
      to: "Aeropuerto Juan Santamaría",
      date: "2025-09-30",
      time: "06:00",
      duration: "~ 30 min",
      distance: "~ 20 km",
      price: "4800",
      driver: { name: "Por asignar", rating: 0, avatar: "?" },
      vehicle: "Vehículo Premium",
      rideType: "premium",
      paymentMethod: "Visa",
      city: "Alajuela"
    }
    ,
    {
      id: "5",
      status: "cancelled",
      from: "Mall San Pedro",
      to: "Casa",
      date: "2025-09-25",
      time: "19:00",
      duration: "15 min",
      distance: "7.8 km",
      price: "2500",
      driver: { name: "Luis Vargas", rating: 4.7, avatar: "LV" },
      vehicle: "Hyundai Accent",
      rideType: "standard",
      paymentMethod: "Efectivo",
      city: "San José"
    },
    {
      id: "6",
      status: "completed",
      from: "Hotel Presidente",
      to: "Aeropuerto Juan Santamaría",
      date: "2025-09-24",
      time: "11:45",
      duration: "40 min",
      distance: "23.5 km",
      price: "5900",
      driver: { name: "Miguel Castro", rating: 5.0, avatar: "MC" },
      vehicle: "Nissan Sentra",
      rideType: "premium",
      paymentMethod: "Visa",
      city: "Alajuela"
    },
    {
      id: "7",
      status: "active",
      from: "Casa",
      to: "Centro de San José",
      date: "2025-09-30",
      time: "08:10",
      duration: "20 min",
      distance: "10.0 km",
      price: "3100",
      driver: { name: "Ana Rodríguez", rating: 4.8, avatar: "AR" },
      vehicle: "Honda Civic",
      rideType: "standard",
      paymentMethod: "Mastercard",
      city: "San José"
    },
    {
      id: "8",
      status: "scheduled",
      from: "UCR San Pedro",
      to: "TEC Cartago",
      date: "2025-10-01",
      time: "13:00",
      duration: "~ 25 min",
      distance: "~ 18 km",
      price: "4200",
      driver: { name: "Por asignar", rating: 0, avatar: "?" },
      vehicle: "Vehículo Premium",
      rideType: "premium",
      paymentMethod: "Visa",
      city: "Cartago"
    },
    {
      id: "9",
      status: "completed",
      from: "Aeropuerto Juan Santamaría",
      to: "Casa",
      date: "2025-09-23",
      time: "21:30",
      duration: "35 min",
      distance: "22.0 km",
      price: "5700",
      driver: { name: "Carlos Méndez", rating: 4.9, avatar: "CM" },
      vehicle: "Toyota Yaris",
      rideType: "standard",
      paymentMethod: "Efectivo",
      city: "Alajuela"
    }
  ];

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
    
    const price = parseInt(trip.price);
    if (priceRange.min && price < parseInt(priceRange.min)) return false;
    if (priceRange.max && price > parseInt(priceRange.max)) return false;
    
    if (selectedCity !== "all" && trip.city !== selectedCity) return false;
    if (selectedDriver !== "all" && trip.driver.name !== selectedDriver) return false;
    
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
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Timeline de Viajes</h3>
                <p className="text-white/60">Tu historial cronológico</p>
              </div>
              <div className="space-y-6">
                {filteredTrips.map((trip) => (
                  <div
                    key={trip.id}
                    onClick={() => {
                      setSelectedTrip(trip);
                      setShowDetails(true);
                    }}
                    className="rounded-2xl border border-white/20 bg-white/5 p-6 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={"w-12 h-12 rounded-xl bg-gradient-to-r " + getStatusColor(trip.status as "active" | "completed" | "scheduled" | "cancelled") + " flex items-center justify-center text-xl"}>
                          {getStatusIcon(trip.status as "active" | "completed" | "scheduled" | "cancelled")}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">{trip.from} → {trip.to}</h4>
                          <p className="text-sm text-white/60">{trip.date} • {trip.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-cyan-400">₡{parseInt(trip.price).toLocaleString()}</p>
                        <p className="text-xs text-white/60">{trip.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Calificaciones</h3>
                <p className="text-white/60">Tus ratings y mejores conductores</p>
              </div>
              <div className="rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-8">
                <p className="text-sm text-yellow-300 mb-2">Rating Promedio</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-black text-white">{ratingStats.average}</span>
                  <div className="flex text-yellow-400 text-3xl">
                    {"⭐".repeat(Math.floor(ratingStats.average))}
                  </div>
                </div>
                <p className="text-sm text-white/60 mt-2">Basado en {ratingStats.totalRatings} calificaciones</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
                <h4 className="text-lg font-bold text-white mb-4">Top Conductores</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topDrivers.map((driver, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                          {driver.avatar}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-white">{driver.name}</h5>
                          <p className="text-yellow-400">⭐ {driver.avgRating}</p>
                          <p className="text-xs text-white/60">{driver.trips} viajes</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                      <p className="text-2xl font-bold text-cyan-400">₡{parseInt(trip.price).toLocaleString()}</p>
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
                <p className="text-3xl font-black text-white">₡{parseInt(selectedTrip.price).toLocaleString()}</p>
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