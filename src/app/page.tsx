"use client";
import { useEffect, useMemo, useState } from "react";

// Simple helpers (no external libs)
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

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState("standard");
  const [eta, setEta] = useState("—");
  const [fare, setFare] = useState("—");
  const [looking, setLooking] = useState(false);
  const [mapAnimation, setMapAnimation] = useState(false);
  const [showDriverCard, setShowDriverCard] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    // Animate map periodically
    const interval = setInterval(() => {
      setMapAnimation(true);
      setTimeout(() => setMapAnimation(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
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

  function handleGeo() {
    if (!navigator.geolocation) return alert("Geolocalización no soportada");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPickup(`Mi ubicación actual`);
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
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-bounce"></div>
      </div>

      {/* Glassmorphic top bar */}
      <header
        className={clsx(
          "sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-xl",
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/20 to-transparent p-3 shadow-2xl backdrop-blur">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold">R</div>
              </div>
              <div className="absolute -right-1 -top-1 h-3 w-3 bg-emerald-400 rounded-full animate-ping"></div>
              <div className="absolute -right-1 -top-1 h-3 w-3 bg-emerald-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Costa Rica</p>
              <h1 className="text-xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">RideNow</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-300">En línea</span>
            </div>
            <button className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition-all">
              24/7 Soporte
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8">
        {/* Main ride request area */}
        <section
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-2 gap-8",
            "transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Left side - Controls */}
          <div className="space-y-6">
            {/* Trip planner card */}
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Planifica tu viaje</h2>
                <button
                  onClick={() => {
                    const p = pickup;
                    setPickup(dropoff);
                    setDropoff(p);
                  }}
                  className="rounded-xl border border-cyan-500/50 bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300 hover:bg-cyan-500/30 transition-all"
                >
                  ⇄ Swap
                </button>
              </div>

              <div className="space-y-4">
                <div className="group relative">
                  <div className="absolute left-4 top-4 z-10">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
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

              {/* Quick destination chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["🏠 Casa", "💼 Trabajo", "🛒 Centro", "🎓 Universidad", "✈️ Aeropuerto"].map((tag, i) => (
                  <button
                    key={tag}
                    onClick={() => setDropoff(tag.split(" ")[1])}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-all backdrop-blur"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced ride options */}
            <div className="grid grid-cols-2 gap-4">
              {rideOptions.map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => setRideType(opt.id)}
                  className={clsx(
                    "group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 hover:scale-105",
                    rideType === opt.id
                      ? "border-white/40 bg-white/20 shadow-2xl ring-2 ring-white/30"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  )}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {rideType === opt.id && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${opt.bgGradient} opacity-20`}></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="text-2xl">{opt.icon}</div>
                      <div>
                        <p className={`font-bold ${rideType === opt.id ? 'text-white' : 'text-white/90'}`}>{opt.name}</p>
                        <p className="text-xs text-white/60">{opt.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">{eta}</span>
                      <span className={`rounded-lg bg-gradient-to-r ${opt.bgGradient} px-3 py-1 font-bold text-white shadow-lg`}>
                        {fare}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Enhanced CTA button */}
            <div className="relative">
              <button
                onClick={requestRide}
                className={clsx(
                  "group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 p-6 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25",
                  looking && "animate-pulse"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {looking ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-lg">Conectando conductor...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🚀</span>
                      <span className="text-lg">Solicitar RideNow</span>
                      <div className="ml-2 text-sm opacity-80">{eta} • {fare}</div>
                    </>
                  )}
                </div>
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

        {/* Enhanced bottom section */}
        <section
          className={clsx(
            "grid grid-cols-1 md:grid-cols-3 gap-6",
            "transition-all duration-1000 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Activity card */}
          <div className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-bold text-white">Actividad reciente</h3>
            <div className="space-y-3">
              {[
                { route: "Casa → TEC Cartago", time: "Hace 2h", price: "₡2,400" },
                { route: "Centro → Universidad", time: "Ayer", price: "₡1,800" },
                { route: "Aeropuerto → Hotel", time: "3 días", price: "₡4,200" }
              ].map((trip, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-all">
                  <div>
                    <p className="text-sm font-medium text-white">{trip.route}</p>
                    <p className="text-xs text-white/60">{trip.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">{trip.price}</p>
                    <button className="text-xs text-cyan-400 hover:underline">Repetir</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment methods */}
          <div className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-bold text-white">Métodos de pago</h3>
            <div className="space-y-3">
              {[
                { type: "Visa", last4: "4242", primary: true },
                { type: "Mastercard", last4: "8888", primary: false },
                { type: "Efectivo", last4: "", primary: false }
              ].map((card, i) => (
                <div key={i} className={clsx(
                  "flex items-center justify-between rounded-xl border p-3 transition-all",
                  card.primary 
                    ? "border-emerald-500/50 bg-emerald-500/20" 
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                )}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {card.type === "Efectivo" ? "💵" : "💳"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{card.type}</p>
                      {card.last4 && <p className="text-xs text-white/60">•••• {card.last4}</p>}
                    </div>
                  </div>
                  {card.primary && <span className="text-xs text-emerald-400 font-medium">Principal</span>}
                </div>
              ))}
              <button className="w-full rounded-xl border border-dashed border-white/30 bg-white/5 p-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
                + Agregar método
              </button>
            </div>
          </div>

          {/* Promo card */}
          <div className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-xl p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">🎉</span>
              <h3 className="text-lg font-bold text-white">Oferta especial</h3>
            </div>
            <p className="mb-4 text-sm text-white/90">
              ¡20% OFF en tu próximo viaje nocturno! Válido hasta medianoche.
            </p>
            <div className="space-y-3">
              <div className="rounded-xl border border-pink-400/30 bg-pink-500/20 p-3">
                <p className="text-center font-mono text-lg font-bold text-pink-200">NIGHT20</p>
              </div>
              <button className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 py-3 font-bold text-white hover:from-pink-600 hover:to-purple-600 transition-all">
                Usar código
              </button>
            </div>
          </div>
        </section>
      {/* Modern bottom nav */}
      <nav className="sticky bottom-0 z-30 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-4 px-4">
          {[
            { name: "Inicio", icon: "🏠", active: true, href: "/" },
            { name: "Viajes", icon: "🧭", active: false, href: "/admin" },
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
      </main>
    </div>
  );
}