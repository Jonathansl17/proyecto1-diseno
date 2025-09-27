"use client";
import { useEffect, useMemo, useState } from "react";

// Utilidad mínima (sin libs)
function clsx(...arr: (string | false | null | undefined)[]) {
  return arr.filter(Boolean).join(" ");
}

type TxType = "trip" | "recharge" | "refund" | "bonus" | "cashout";
type TxStatus = "completed" | "pending" | "failed";

interface Transaction {
  id: string;
  type: TxType;
  status: TxStatus;
  amount: number; // + ingreso / - egreso
  description: string;
  date: string;
  time: string;
  tripId?: string;
  paymentMethod?: string;
  reference?: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "bank" | "digital";
  name: string;
  last4?: string;
  brand?: string;
  isDefault: boolean;
  icon: string;
}

export default function WalletScreen() {
  // -------- State --------
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "methods">("overview");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [historyFilter, setHistoryFilter] = useState<"Todos" | "Viajes" | "Recargas" | "Reembolsos" | "Bonos" | "Retiros">("Todos");
  const [historyQuery, setHistoryQuery] = useState("");
  const [historyPeriod, setHistoryPeriod] = useState<"Todo" | "Hoy" | "Ayer" | "7d" | "30d">("Todo");
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => setIsVisible(true), []);

  // -------- Datos Demo (puedes conectar a API luego) --------
  const walletStats = {
    balance: 8450,
    thisMonthSpent: 12340,
    totalSpent: 124800,
    pendingRefunds: 0,
    bonusEarned: 1250,
  };

  const transactions: Transaction[] = [
    { id: "1", type: "trip", status: "completed", amount: -2840, description: "Viaje a TEC Cartago", date: "Hoy", time: "14:25", tripId: "T-001", paymentMethod: "Saldo Wallet" },
    { id: "2", type: "recharge", status: "completed", amount: 10000, description: "Recarga Visa •••• 4242", date: "Hoy", time: "08:30", reference: "RCG-2025-001" },
    { id: "3", type: "trip", status: "completed", amount: -3200, description: "Viaje a UCR", date: "Ayer", time: "09:15", tripId: "T-002" },
    { id: "4", type: "bonus", status: "completed", amount: 500, description: "Bono por referir amigo", date: "Ayer", time: "16:45", reference: "BONUS-REF-001" },
    { id: "5", type: "refund", status: "completed", amount: 2840, description: "Reembolso viaje cancelado", date: "2 días", time: "11:20", tripId: "T-003" },
    { id: "6", type: "trip", status: "completed", amount: -5650, description: "Viaje desde Aeropuerto", date: "3 días", time: "16:30", tripId: "T-004" },
    { id: "7", type: "cashout", status: "pending", amount: -5000, description: "Retiro a cuenta bancaria", date: "5 días", time: "10:00", reference: "OUT-2025-001" },
  ];

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", type: "card", name: "Visa", last4: "4242", brand: "VISA", isDefault: true, icon: "💳" },
    { id: "2", type: "card", name: "Mastercard", last4: "8888", brand: "MASTERCARD", isDefault: false, icon: "💳" },
    { id: "3", type: "bank", name: "Banco Nacional", last4: "1234", brand: "BN", isDefault: false, icon: "🏦" },
    { id: "4", type: "digital", name: "SINPE Móvil", last4: "8765", brand: "SINPE", isDefault: false, icon: "📱" },
  ]);

  // -------- Helpers UI --------
  const typeLabel: Record<TxType, string> = {
    trip: "Viaje",
    recharge: "Recarga",
    refund: "Reembolso",
    bonus: "Bono",
    cashout: "Retiro",
  };
  const typePill: Record<TxType, string> = {
    trip: "from-rose-500 to-pink-500",
    recharge: "from-emerald-500 to-green-500",
    refund: "from-blue-500 to-cyan-500",
    bonus: "from-yellow-500 to-orange-500",
    cashout: "from-violet-500 to-purple-600",
  };
  const statusColor: Record<TxStatus, string> = {
    completed: "text-emerald-400",
    pending: "text-yellow-400",
    failed: "text-red-400",
  };
  const posNeg = (n: number) => (n > 0 ? "text-emerald-400" : "text-rose-400");

  // -------- Derivados (distribución y filtros) --------
  const distribution = useMemo(() => {
    // Solo egresos para la barra de distribución
    const base: Record<TxType, number> = { trip: 0, recharge: 0, refund: 0, bonus: 0, cashout: 0 };
    transactions.forEach((t) => {
      if (t.amount < 0) base[t.type] += Math.abs(t.amount);
    });
    const total = Object.values(base).reduce((a, b) => a + b, 0) || 1;
    return (Object.entries(base) as [TxType, number][])
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => ({ type: k, label: typeLabel[k], amount: v, pct: Math.round((v / total) * 100) }));
  }, [transactions]);

  const historyFiltered = useMemo(() => {
    let list = [...transactions];

    // Filtro por categoría
    if (historyFilter !== "Todos") {
      const map: Record<"Todos" | "Viajes" | "Recargas" | "Reembolsos" | "Bonos" | "Retiros", TxType[]> = {
        Todos: ["trip", "recharge", "refund", "bonus", "cashout"],
        Viajes: ["trip"],
        Recargas: ["recharge"],
        Reembolsos: ["refund"],
        Bonos: ["bonus"],
        Retiros: ["cashout"],
      };
      list = list.filter((t) => map[historyFilter].includes(t.type));
    }

    // Filtro por texto
    if (historyQuery.trim()) {
      const q = historyQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.reference?.toLowerCase().includes(q) ||
          t.paymentMethod?.toLowerCase().includes(q) ||
          t.tripId?.toLowerCase().includes(q)
      );
    }

    // Filtro por período (demo basado en texto de date)
    if (historyPeriod !== "Todo") {
      list = list.filter((t) => {
        if (historyPeriod === "Hoy") return t.date === "Hoy";
        if (historyPeriod === "Ayer") return t.date === "Ayer";
        if (historyPeriod === "7d") return ["Hoy", "Ayer", "2 días", "3 días", "5 días", "1 semana"].includes(t.date);
        if (historyPeriod === "30d") return true; // demo
        return true;
      });
    }

    // Orden
    list.sort((a, b) => {
      const va = a.date === "Hoy" ? 0 : a.date === "Ayer" ? 1 : 2; // demo: "Hoy" antes
      const vb = b.date === "Hoy" ? 0 : b.date === "Ayer" ? 1 : 2;
      const cmp = va - vb;
      return sortDesc ? cmp : -cmp;
    });

    return list;
  }, [transactions, historyFilter, historyQuery, historyPeriod, sortDesc]);

  // -------- Acciones --------
  const handleRecharge = () => {
    if (!rechargeAmount) return;
    // Aquí iría la lógica real
    console.log("Recargando ₡", rechargeAmount);
    setShowAddFunds(false);
    setRechargeAmount("");
  };

  const setDefaultMethod = (id: string) => {
    // Demo local: solo UI
    setPaymentMethods(prev => prev.map(m => ({...m, isDefault: m.id === id})));
  };

  // -------- UI --------
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Nebula background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/3 left-1/3 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl animate-bounce [animation-duration:5s]" />
      </div>

      {/* Header */}
      <header
        className={clsx(
          "sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-xl",
          "transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-2">💳</div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                Mi Wallet
              </h1>
              <p className="text-xs text-white/60">Gestiona tu dinero digital</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddFunds(true)}
              className="rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-4 py-2 text-sm font-bold text-white shadow-lg hover:scale-[1.02] active:scale-[0.99] transition"
            >
              + Recargar
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8">
        {/* Tabs */}
        <section
          className={clsx(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
            {[
              { id: "overview", label: "Resumen" },
              { id: "history", label: "Historial" },
              { id: "methods", label: "Métodos" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={clsx(
                  "flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* -------- OVERVIEW -------- */}
        {activeTab === "overview" && (
          <section
            className={clsx(
              "grid grid-cols-1 lg:grid-cols-3 gap-6",
              "transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            {/* Saldo Card */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-cyan-600/20 p-8 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(6,182,212,.2),transparent_40%)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-emerald-300/80 text-xs font-medium mb-2 tracking-wider">Saldo disponible</p>
                    <p className="text-5xl font-black bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                      ₡{walletStats.balance.toLocaleString("es-CR")}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/15 p-4">
                    <div className="text-3xl">💰</div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {[
                    { label: "Recargar", icon: "⬆", action: () => setShowAddFunds(true) },
                    { label: "Retirar", icon: "⬇", action: () => alert("Acción demo: Retirar") },
                    { label: "Transferir", icon: "🔁", action: () => alert("Acción demo: Transferir") },
                    { label: "Pagar QR", icon: "🧾", action: () => alert("Acción demo: Pagar QR") },
                  ].map((a) => (
                    <button
                      key={a.label}
                      onClick={a.action}
                      className="group rounded-2xl border border-white/10 bg-white/10 p-4 text-center hover:bg-white/20 transition-all"
                    >
                      <div className="text-2xl mb-1 group-hover:scale-110 transition">{a.icon}</div>
                      <p className="text-xs text-white/80">{a.label}</p>
                    </button>
                  ))}
                </div>

                {/* Low balance hint */}
                {walletStats.balance < 10000 && (
                  <div className="mt-6 rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-3 text-sm text-yellow-200">
                    ⚠ Tu saldo es bajo. Considera recargar para evitar rechazos en viajes.
                  </div>
                )}
              </div>
            </div>

            {/* Stats mini dashboard */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs text-white/60">Este mes gastado</p>
                <p className="text-2xl font-bold">₡{walletStats.thisMonthSpent.toLocaleString("es-CR")}</p>
                <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" style={{ width: "62%" }} />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs text-white/60">Bonos acumulados</p>
                <p className="text-2xl font-bold text-yellow-300">₡{walletStats.bonusEarned.toLocaleString("es-CR")}</p>
                <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" style={{ width: "45%" }} />
                </div>
              </div>

              {/* Meta de ahorro */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Meta de ahorro</p>
                  <span className="text-xs text-white/60">₡30,000</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${Math.min((walletStats.balance / 30000) * 100, 100)}%` }} />
                </div>
                <p className="mt-1 text-xs text-white/60">Progreso hacia tu meta mensual</p>
              </div>
            </div>

            {/* Distribución de gastos (barras) */}
            <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Distribución de egresos</h3>
                <span className="text-xs text-white/60">Últimos 7 días</span>
              </div>
              <div className="space-y-3">
                {distribution.map((d) => (
                  <div key={d.type}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-white/80">{d.label}</span>
                      <span className="text-white/60">{d.pct}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10">
                      <div
                        className={clsx("h-2 rounded-full bg-gradient-to-r", typePill[d.type])}
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* -------- HISTORY -------- */}
        {activeTab === "history" && (
          <section
            className={clsx(
              "space-y-4",
              "transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            {/* Filtros */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {(["Todos", "Viajes", "Recargas", "Reembolsos", "Bonos", "Retiros"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setHistoryFilter(f)}
                      className={clsx(
                        "rounded-full px-3 py-1 text-xs border transition",
                        historyFilter === f ? "border-cyan-400 bg-cyan-500/20 text-cyan-200" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {(["Todo", "Hoy", "Ayer", "7d", "30d"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setHistoryPeriod(p)}
                      className={clsx(
                        "rounded-full px-3 py-1 text-xs border transition",
                        historyPeriod === p ? "border-emerald-400 bg-emerald-500/20 text-emerald-200" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      value={historyQuery}
                      onChange={(e) => setHistoryQuery(e.target.value)}
                      placeholder="Buscar (ref, método, viaje...)"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm placeholder:text-white/50 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setSortDesc((v) => !v)}
                    className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs hover:bg-white/20"
                    title="Cambiar orden"
                  >
                    {sortDesc ? "⬇" : "⬆"}
                  </button>
                </div>
              </div>
            </div>

            {/* Lista */}
            {historyFiltered.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
                <div className="text-6xl mb-2 opacity-50">🗂</div>
                <p className="text-white/70">No hay transacciones que coincidan con el filtro.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {historyFiltered.map((t, i) => (
                  <div
                    key={t.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:bg-white/10 transition"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {/* línea de estado a la izquierda */}
                    <div className={clsx("absolute left-0 top-0 h-full w-1 bg-gradient-to-b", typePill[t.type])} />
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={clsx(
                              "inline-flex items-center rounded-lg bg-gradient-to-r px-2 py-0.5 text-xs font-bold",
                              typePill[t.type]
                            )}
                          >
                            {typeLabel[t.type]}
                          </span>
                          <span className={clsx("text-xs", statusColor[t.status])}>
                            {t.status === "completed" ? "Completado" : t.status === "pending" ? "Pendiente" : "Fallido"}
                          </span>
                          <span className="text-xs text-white/50">• {t.date} {t.time && `• ${t.time}`}</span>
                        </div>
                        <p className="font-medium">{t.description}</p>
                        <div className="mt-1 flex flex-wrap gap-3 text-xs text-white/60">
                          {t.reference && <span>Ref: {t.reference}</span>}
                          {t.tripId && <span>Viaje: {t.tripId}</span>}
                          {t.paymentMethod && <span>Método: {t.paymentMethod}</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={clsx("text-xl font-bold", posNeg(t.amount))}>
                          {t.amount > 0 ? "+" : ""}₡{Math.abs(t.amount).toLocaleString("es-CR")}
                        </p>
                        {t.amount < 0 && t.type === "trip" && (
                          <button className="mt-1 text-xs text-cyan-300 hover:underline">Ver recibo</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* -------- METHODS -------- */}
        {activeTab === "methods" && (
          <section
            className={clsx(
              "space-y-6",
              "transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Métodos de pago</h3>
              <button
                onClick={() => setShowAddMethod(true)}
                className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-bold hover:scale-[1.02] active:scale-[0.99] transition"
              >
                + Agregar método
              </button>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((m, i) => (
                <div
                  key={m.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:bg-white/10 transition"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2 text-lg">{m.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {m.name} {m.last4 ? `• • • • ${m.last4}` : ""}
                          </p>
                          {m.isDefault && (
                            <span className="rounded-full border border-emerald-400/60 bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-300">
                              Principal
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/60">{m.type === "card" ? "Tarjeta" : m.type === "bank" ? "Banco" : "Digital"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!m.isDefault && (
                        <button
                          onClick={() => setDefaultMethod(m.id)}
                          className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
                        >
                          Hacer principal
                        </button>
                      )}
                      <button className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-xs hover:bg-white/20">
                        Gestionar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nota de seguridad */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              🔐 Tus métodos están cifrados. Puedes eliminar o establecer uno como principal en cualquier momento.
            </div>
          </section>
        )}
      </main>

      {/* -------- MODAL: Add Funds -------- */}
      {showAddFunds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-900/95 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h4 className="text-lg font-bold">Agregar fondos</h4>
              <button
                onClick={() => setShowAddFunds(false)}
                className="rounded-xl border border-white/15 bg-white/10 p-2 hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Monto */}
              <div>
                <p className="mb-2 text-sm text-white/70">Cantidad</p>
                <div className="mb-3 grid grid-cols-3 gap-2">
                  {["5000", "10000", "20000"].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setRechargeAmount(amount)}
                      className={clsx(
                        "rounded-xl border p-3 text-sm font-medium transition-all",
                        rechargeAmount === amount
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                          : "border-white/15 bg-white/10 hover:bg-white/15"
                      )}
                    >
                      ₡{parseInt(amount).toLocaleString("es-CR")}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Cantidad personalizada"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value.replace(/\D/g, ""))}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Método principal seleccionado */}
              <div>
                <p className="mb-2 text-sm text-white/70">Método</p>
                {paymentMethods
                  .filter((m) => m.isDefault)
                  .map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between rounded-xl border border-emerald-400/50 bg-emerald-500/15 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{m.icon}</span>
                        <span className="text-white font-medium">
                          {m.name} {m.last4 ? `• • • • ${m.last4}` : ""}
                        </span>
                      </div>
                      <span className="text-xs text-emerald-300">Seleccionado</span>
                    </div>
                  ))}
                <button
                  onClick={() => {
                    setShowAddMethod(true);
                    setShowAddFunds(false);
                  }}
                  className="mt-2 text-xs text-cyan-300 hover:underline"
                >
                  Cambiar / agregar método
                </button>
              </div>

              {/* Acciones */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddFunds(false)}
                  className="flex-1 rounded-xl border border-white/20 bg-white/10 py-3 text-sm hover:bg-white/15"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleRecharge}
                  disabled={!rechargeAmount}
                  className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-bold disabled:opacity-50"
                >
                  Recargar {rechargeAmount ? `₡${parseInt(rechargeAmount).toLocaleString("es-CR")}` : ""}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------- MODAL: Add Method -------- */}
      {showAddMethod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-900/95 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h4 className="text-lg font-bold">Agregar método</h4>
              <button
                onClick={() => setShowAddMethod(false)}
                className="rounded-xl border border-white/15 bg-white/10 p-2 hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { type: "Tarjeta", icon: "💳", color: "from-blue-500 to-cyan-500" },
                { type: "Banco", icon: "🏦", color: "from-purple-500 to-violet-500" },
                { type: "SINPE", icon: "📱", color: "from-emerald-500 to-green-500" },
                { type: "PayPal", icon: "🌐", color: "from-yellow-500 to-orange-500" },
              ].map((m) => (
                <button
                  key={m.type}
                  className={clsx("rounded-xl border border-white/15 bg-white/5 p-4 hover:bg-white/10 transition")}
                  onClick={() => alert(`Demo: agregar ${m.type}`)}
                >
                  <div className={clsx("mb-2 inline-flex rounded-lg bg-gradient-to-r p-2 text-xl", m.color)}>{m.icon}</div>
                  <p className="text-sm font-medium">{m.type}</p>
                </button>
              ))}
            </div>

            <div className="mt-4 text-xs text-white/60">
              * Al agregar un método nuevo, podrás establecerlo como principal.
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowAddMethod(false)}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="sticky bottom-0 z-30 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-4 px-4">
          {[
            { name: "Inicio", icon: "🏠", active: false, href: "/" },
            { name: "Viajes", icon: "🧭", active: false, href: "/admin" },
            { name: "Wallet", icon: "💳", active: true, href: "/wallet" },
            { name: "Perfil", icon: "👤", active: false, href: "/perfil" },
          ].map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={clsx(
                "flex flex-col items-center gap-1 py-4 text-xs font-medium transition-all",
                tab.active ? "text-emerald-400" : "text-white/60 hover:text-white"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl p-2 transition-all",
                  tab.active ? "bg-emerald-500/20 text-lg" : "text-base hover:bg-white/10"
                )}
              >
                {tab.icon}
              </div>
              <span>{tab.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}