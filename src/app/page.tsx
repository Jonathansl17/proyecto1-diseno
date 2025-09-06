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
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState("standard");
  const [eta, setEta] = useState("—");
  const [fare, setFare] = useState("—");
  const [looking, setLooking] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fake fare/eta calculator
  useEffect(() => {
    if (!pickup || !dropoff) {
      setEta("—");
      setFare("—");
      return;
    }
    const base = rideType === "standard" ? 1200 : rideType === "premium" ? 2200 : 900; // CRC/min (fake)
    const minutes = 7 + Math.floor((pickup.length + dropoff.length) % 9);
    setEta(`${minutes} min`);
    setFare(`₡${(base * (minutes * 1.2)).toLocaleString("es-CR")}`);
  }, [pickup, dropoff, rideType]);

  function handleGeo() {
    if (!navigator.geolocation) return alert("Geolocalización no soportada");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPickup(`Mi ubicación (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`);
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
    setTimeout(() => setLooking(false), 2400);
  }

  const rideOptions = useMemo(
    () => [
      { id: "standard", name: "Económico", desc: "Hasta 4 pax", icon: "🚗" },
      { id: "premium", name: "Confort", desc: "Autos premium", icon: "🚘" },
      { id: "moto", name: "Moto", desc: "1 pax rápido", icon: "🏍️" },
    ],
    []
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-sky-50 via-white to-sky-50 text-gray-900">
      {/* Top bar */}
      <header
        className={clsx(
          "sticky top-0 z-30 border-b border-sky-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60",
          "transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-white to-sky-50 p-2 shadow-sm">
                <img src="/civicfix-logo.webp" alt="RideNow CR" width={36} height={36} className="rounded-xl" />
              </div>
              <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-emerald-500"></span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-sky-600">Disponible en CR</p>
              <h1 className="text-lg font-bold leading-5 text-sky-700">RideNow</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-sky-700">Soporte 24/7</span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-700 ring-1 ring-emerald-500/20">En línea</span>
          </div>
        </div>
      </header>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute -left-10 top-24 h-40 w-40 rounded-full bg-gradient-to-br from-sky-200 to-white blur-2xl" />
        <div className="absolute right-10 top-64 h-28 w-28 rotate-12 rounded-2xl bg-gradient-to-br from-sky-300 to-sky-100 blur-xl" />
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6">
        {/* Search card */}
        <section
          className={clsx(
            "grid grid-cols-1 gap-4 md:grid-cols-3",
            "transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {/* Inputs */}
          <div className="col-span-2 space-y-4">
            <div className="rounded-3xl border border-sky-200 bg-white p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-sky-700">Tu viaje</h2>
                <button
                  onClick={() => {
                    const p = pickup;
                    setPickup(dropoff);
                    setDropoff(p);
                  }}
                  className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700 hover:bg-sky-100"
                  title="Intercambiar"
                >
                  ⇅ Intercambiar
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/60 px-4 py-3 focus-within:ring-2 focus-within:ring-sky-300">
                  <span className="text-lg">📍</span>
                  <input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Punto de partida"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-sky-400"
                  />
                  <button onClick={handleGeo} className="rounded-lg bg-white px-3 py-1 text-xs text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50">
                    Usar mi ubicación
                  </button>
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/60 px-4 py-3 focus-within:ring-2 focus-within:ring-sky-300">
                  <span className="text-lg">🎯</span>
                  <input
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Destino (ej. TEC San Carlos)"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-sky-400"
                  />
                </label>
              </div>

              {/* Quick chips */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {["Casa", "Trabajo", "Super", "Universidad"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setDropoff(tag)}
                    className="rounded-full border border-sky-200 bg-white px-3 py-1 text-sky-700 hover:bg-sky-50"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Ride type selector */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {rideOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setRideType(opt.id)}
                  className={clsx(
                    "group rounded-3xl border p-5 text-left shadow transition-all",
                    rideType === opt.id
                      ? "border-sky-500 bg-gradient-to-br from-white to-sky-50 shadow-lg"
                      : "border-sky-100 bg-white hover:shadow-md"
                  )}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <p className="text-base font-semibold text-sky-800">{opt.name}</p>
                      <p className="text-xs text-sky-600">{opt.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sky-600">ETA: {eta}</span>
                    <span className="rounded-xl bg-sky-50 px-2 py-1 font-semibold text-sky-700 ring-1 ring-sky-200">{fare}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-emerald-700">Estimación</p>
                  <p className="text-xl font-bold text-emerald-800">{eta} • {fare}</p>
                </div>
                <button
                  onClick={requestRide}
                  className={clsx(
                    "w-full sm:w-auto rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-3 text-white shadow-lg transition-all hover:from-emerald-600 hover:to-emerald-700",
                    looking && "animate-pulse"
                  )}
                >
                  {looking ? "Buscando conductor…" : "Pedir viaje"}
                </button>
              </div>
            </div>
          </div>

          {/* Map / live area */}
          <div className="order-first md:order-last">
            <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-sky-200 bg-white shadow-xl">
              {/* faux map */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-70">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="border border-sky-50" />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/60 via-transparent to-sky-100/60" />
              {/* car marker */}
              <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-xl bg-sky-600 px-3 py-1 text-white shadow">{rideType === "moto" ? "🏍️" : "🚗"} en camino</div>
              </div>
              {/* pins */}
              {pickup && (
                <div className="absolute bottom-10 left-8 rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white shadow">Origen</div>
              )}
              {dropoff && (
                <div className="absolute right-8 top-10 rounded-full bg-fuchsia-600 px-3 py-1 text-xs font-semibold text-white shadow">Destino</div>
              )}

              {/* mini info card */}
              <div className="absolute bottom-0 left-0 right-0 m-3 rounded-2xl border border-sky-200 bg-white/90 p-4 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src="/driver-avatar.png" alt="Conductor" className="h-10 w-10 rounded-xl border border-slate-200 object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Carlos M.</p>
                      <p className="text-xs text-slate-600">Toyota Yaris • 506-123 ABC</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-md bg-amber-50 px-2 py-1 font-semibold text-amber-700 ring-1 ring-amber-200">4.9★</span>
                    <button className="rounded-md border border-sky-200 bg-white px-3 py-1 text-sky-700 hover:bg-sky-50">Llamar</button>
                  </div>
                </div>
              </div>
            </div>

            {/* safety row */}
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"/> Seguro de viaje incluido</span>
              <span className="hidden sm:inline">Centro de ayuda 911 / 1322</span>
            </div>
          </div>
        </section>

        {/* Recent & promos */}
        <section
          className={clsx(
            "grid grid-cols-1 gap-4 md:grid-cols-3",
            "transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <div className="rounded-3xl border border-sky-200 bg-white p-5 shadow">
            <h3 className="mb-3 text-base font-bold text-sky-700">Viajes recientes</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {["Casa → TEC", "Mercado → Casa", "Trabajo → Gimnasio"].map((it, i) => (
                <li key={i} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                  <span>{it}</span>
                  <button className="text-sky-700 hover:underline" onClick={() => setDropoff(it.split("→")[1].trim())}>Repetir</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-sky-200 bg-white p-5 shadow">
            <h3 className="mb-3 text-base font-bold text-sky-700">Métodos de pago</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1">💳 Visa</span>
              <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1">💳 Mastercard</span>
              <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1">💵 Efectivo</span>
              <button className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1 text-sky-700 hover:bg-sky-100">+ Agregar</button>
            </div>
          </div>
          <div className="rounded-3xl border border-fuchsia-200 bg-gradient-to-br from-white to-fuchsia-50 p-5 shadow">
            <h3 className="mb-2 text-base font-bold text-fuchsia-700">Promoción activa</h3>
            <p className="text-sm text-fuchsia-700">10% de descuento en viajes a aeropuerto hoy.</p>
            <button className="mt-3 rounded-xl bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white hover:bg-fuchsia-700">Usar código: AERO10</button>
          </div>
        </section>
      </main>

      {/* Bottom navigation */}
      <nav className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-4 text-center text-xs">
          {[
            { t: "Inicio", i: "🏠" },
            { t: "Viajes", i: "🧭" },
            { t: "Billetera", i: "💼" },
            { t: "Perfil", i: "👤" },
          ].map((tab) => (
            <button key={tab.t} className="px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">
              <div className="text-lg">{tab.i}</div>
              <div>{tab.t}</div>
            </button>
          ))}
        </div>
      </nav>

      {/* floating quick actions */}
      <div className="pointer-events-none fixed bottom-24 right-4 z-40 flex flex-col gap-2">
        <button className="pointer-events-auto rounded-full bg-sky-600 p-3 text-white shadow-lg hover:bg-sky-700" title="Centro de ayuda">❔</button>
        <button className="pointer-events-auto rounded-full bg-emerald-600 p-3 text-white shadow-lg hover:bg-emerald-700" title="Compartir viaje">🔗</button>
      </div>

      <footer className="border-t border-sky-100 bg-gradient-to-r from-sky-900 to-sky-800 px-4 py-8 text-center text-sky-100">
        <p className="text-sm">© 2025 RideNow Costa Rica • Versión 1.0</p>
        <p className="mt-1 text-xs opacity-80">Operación autorizada • (506) 2000-0000</p>
      </footer>
    </div>
  );
}
