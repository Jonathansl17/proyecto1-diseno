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
  amount: number;
  description: string;
  date: string;
  time: string;
  tripId?: string;
  paymentMethod?: string;
  reference?: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "bank" | "digital" | "crypto";
  name: string;
  last4?: string;
  brand?: string;
  isDefault: boolean;
  icon: string;
  balance?: number;
}

interface FinancialBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface MonthlyData {
  month: string;
  recharges: number;
  expenses: number;
  savings: number;
}

export default function EnhancedWalletV4() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "insights" | "history" | "methods" | "crypto"
  >("overview");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [historyFilter, setHistoryFilter] = useState<
    "Todos" | "Viajes" | "Recargas" | "Reembolsos" | "Bonos" | "Retiros"
  >("Todos");
  const [historyQuery, setHistoryQuery] = useState("");
  const [historyPeriod, setHistoryPeriod] = useState<
    "Todo" | "Hoy" | "Ayer" | "7d" | "30d"
  >("Todo");
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => setIsVisible(true), []);

  const walletStats = {
    balance: 8450,
    thisMonthSpent: 12340,
    lastMonthSpent: 15425,
    totalSpent: 124800,
    pendingRefunds: 0,
    bonusEarned: 1250,
    savingsGoal: 30000,
    highestTrip: 8200,
    lowestTrip: 850,
    avgTrip: 2840,
  };

  const cryptoBalances = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      balance: 0.00234,
      value: 2850,
      change: "+5.2%",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: 0.156,
      value: 1420,
      change: "-2.1%",
    },
    {
      symbol: "RIDE",
      name: "RideCoin",
      balance: 150,
      value: 450,
      change: "+12.5%",
    },
  ];

  const monthlyData: MonthlyData[] = [
    { month: "May", recharges: 15000, expenses: 12000, savings: 3000 },
    { month: "Jun", recharges: 18000, expenses: 14500, savings: 3500 },
    { month: "Jul", recharges: 20000, expenses: 15425, savings: 4575 },
    { month: "Ago", recharges: 16000, expenses: 12340, savings: 3660 },
    { month: "Sep", recharges: 14000, expenses: 8450, savings: 5550 },
  ];

  const financialBadges: FinancialBadge[] = [
    {
      id: "1",
      name: "Ahorro Constante",
      description: "Recarga todos los meses sin fallar",
      icon: "💎",
      color: "from-blue-500 to-cyan-500",
      unlocked: true,
    },
    {
      id: "2",
      name: "Eco Saver",
      description: "Ahorra dinero usando transporte compartido",
      icon: "🌱",
      color: "from-green-500 to-emerald-500",
      unlocked: true,
    },
    {
      id: "3",
      name: "Planificador Pro",
      description: "Mantén tu meta de ahorro por 3 meses",
      icon: "🎯",
      color: "from-purple-500 to-pink-500",
      unlocked: false,
      progress: 2,
      maxProgress: 3,
    },
    {
      id: "4",
      name: "Crypto Pioneer",
      description: "Usa criptomonedas para pagos",
      icon: "₿",
      color: "from-orange-500 to-yellow-500",
      unlocked: false,
      progress: 0,
      maxProgress: 1,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "trip",
      status: "completed",
      amount: -2840,
      description: "Viaje a TEC Cartago",
      date: "Hoy",
      time: "14:25",
      tripId: "T-001",
      paymentMethod: "Saldo Wallet",
    },
    {
      id: "2",
      type: "recharge",
      status: "completed",
      amount: 10000,
      description: "Recarga Visa •••• 4242",
      date: "Hoy",
      time: "08:30",
      reference: "RCG-2025-001",
    },
    {
      id: "3",
      type: "trip",
      status: "completed",
      amount: -3200,
      description: "Viaje a UCR",
      date: "Ayer",
      time: "09:15",
      tripId: "T-002",
    },
    {
      id: "4",
      type: "bonus",
      status: "completed",
      amount: 500,
      description: "Bono por referir amigo",
      date: "Ayer",
      time: "16:45",
      reference: "BONUS-REF-001",
    },
    {
      id: "5",
      type: "refund",
      status: "completed",
      amount: 2840,
      description: "Reembolso viaje cancelado",
      date: "2 días",
      time: "11:20",
      tripId: "T-003",
    },
    {
      id: "6",
      type: "trip",
      status: "completed",
      amount: -8200,
      description: "Viaje desde Aeropuerto (Premium)",
      date: "3 días",
      time: "16:30",
      tripId: "T-004",
    },
    {
      id: "7",
      type: "cashout",
      status: "pending",
      amount: -5000,
      description: "Retiro a cuenta bancaria",
      date: "5 días",
      time: "10:00",
      reference: "OUT-2025-001",
    },
  ];

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa",
      last4: "4242",
      brand: "VISA",
      isDefault: true,
      icon: "💳",
    },
    {
      id: "2",
      type: "card",
      name: "Mastercard",
      last4: "8888",
      brand: "MASTERCARD",
      isDefault: false,
      icon: "💳",
    },
    {
      id: "3",
      type: "bank",
      name: "Banco Nacional",
      last4: "1234",
      brand: "BN",
      isDefault: false,
      icon: "🏦",
    },
    {
      id: "4",
      type: "digital",
      name: "SINPE Móvil",
      last4: "8765",
      brand: "SINPE",
      isDefault: false,
      icon: "📱",
    },
    {
      id: "5",
      type: "crypto",
      name: "Bitcoin Wallet",
      last4: "x7a9",
      brand: "BTC",
      isDefault: false,
      icon: "₿",
      balance: 2850,
    },
    {
      id: "6",
      type: "crypto",
      name: "RideCoin",
      last4: "rm45",
      brand: "RIDE",
      isDefault: false,
      icon: "🚀",
      balance: 450,
    },
  ]);

  // Helpers UI
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

  // Insights calculations
  const insights = useMemo(() => {
    const percentageChange =
      ((walletStats.lastMonthSpent - walletStats.thisMonthSpent) /
        walletStats.lastMonthSpent) *
      100;
    const highestTrip = Math.max(
      ...transactions
        .filter((t) => t.type === "trip" && t.amount < 0)
        .map((t) => Math.abs(t.amount))
    );
    const avgMonthlySpend =
      monthlyData.reduce((sum, month) => sum + month.expenses, 0) /
      monthlyData.length;

    return {
      spendingChange:
        percentageChange > 0
          ? `${percentageChange.toFixed(1)}% menos`
          : `${Math.abs(percentageChange).toFixed(1)}% más`,
      spendingTrend: percentageChange > 0 ? "down" : "up",
      highestTrip: `₡${highestTrip.toLocaleString()}`,
      savingsRate: (
        (walletStats.balance / walletStats.savingsGoal) *
        100
      ).toFixed(1),
      avgSpend: `₡${avgMonthlySpend.toFixed(0)}`,
    };
  }, [walletStats, transactions, monthlyData]);

  // Distribution calculation
  const distribution = useMemo(() => {
    const base: Record<TxType, number> = {
      trip: 0,
      recharge: 0,
      refund: 0,
      bonus: 0,
      cashout: 0,
    };
    transactions.forEach((t) => {
      if (t.amount < 0) base[t.type] += Math.abs(t.amount);
    });
    const total = Object.values(base).reduce((a, b) => a + b, 0) || 1;
    return (Object.entries(base) as [TxType, number][])
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => ({
        type: k,
        label: typeLabel[k],
        amount: v,
        pct: Math.round((v / total) * 100),
      }));
  }, [transactions]);

  // Filtered transactions
  const historyFiltered = useMemo(() => {
    let list = [...transactions];

    if (historyFilter !== "Todos") {
      const map: Record<
        "Todos" | "Viajes" | "Recargas" | "Reembolsos" | "Bonos" | "Retiros",
        TxType[]
      > = {
        Todos: ["trip", "recharge", "refund", "bonus", "cashout"],
        Viajes: ["trip"],
        Recargas: ["recharge"],
        Reembolsos: ["refund"],
        Bonos: ["bonus"],
        Retiros: ["cashout"],
      };
      list = list.filter((t) => map[historyFilter].includes(t.type));
    }

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

    if (historyPeriod !== "Todo") {
      list = list.filter((t) => {
        if (historyPeriod === "Hoy") return t.date === "Hoy";
        if (historyPeriod === "Ayer") return t.date === "Ayer";
        if (historyPeriod === "7d")
          return [
            "Hoy",
            "Ayer",
            "2 días",
            "3 días",
            "5 días",
            "1 semana",
          ].includes(t.date);
        if (historyPeriod === "30d") return true;
        return true;
      });
    }

    list.sort((a, b) => {
      const va = a.date === "Hoy" ? 0 : a.date === "Ayer" ? 1 : 2;
      const vb = b.date === "Hoy" ? 0 : b.date === "Ayer" ? 1 : 2;
      const cmp = va - vb;
      return sortDesc ? cmp : -cmp;
    });

    return list;
  }, [transactions, historyFilter, historyQuery, historyPeriod, sortDesc]);

  // Actions
  const handleRecharge = () => {
    if (!rechargeAmount) return;
    console.log("Recargando ₡", rechargeAmount);
    setShowAddFunds(false);
    setRechargeAmount("");
  };

  const setDefaultMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    );
  };

  const handleExport = (format: "excel" | "pdf") => {
    alert(`Exportando historial en formato ${format.toUpperCase()}...`);
    setShowExport(false);
  };

  // Chart component for combined data
  const CombinedChart = () => (
    <div className="h-64 flex items-end justify-between gap-2 p-4">
      {monthlyData.map((month, i) => {
        const maxValue = Math.max(
          ...monthlyData.map((m) => Math.max(m.recharges, m.expenses))
        );
        const rechargeHeight = (month.recharges / maxValue) * 200;
        const expenseHeight = (month.expenses / maxValue) * 200;

        return (
          <div
            key={month.month}
            className="flex flex-col items-center gap-2 flex-1"
          >
            <div className="relative w-full flex justify-center gap-1">
              <div
                className="w-4 bg-gradient-to-t from-emerald-500 to-green-400 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                style={{ height: `${rechargeHeight}px` }}
                title={`Recargas: ₡${month.recharges.toLocaleString()}`}
              />
              <div
                className="w-4 bg-gradient-to-t from-rose-500 to-pink-400 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                style={{ height: `${expenseHeight}px` }}
                title={`Gastos: ₡${month.expenses.toLocaleString()}`}
              />
            </div>
            <span className="text-xs text-white/60">{month.month}</span>
          </div>
        );
      })}
    </div>
  );

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
            <div className="rounded-2xl border border-white/15 bg-white/5 p-2">
              💳
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                Mi Wallet Pro
              </h1>
              <p className="text-xs text-white/60">
                Finanzas inteligentes + Crypto
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowExport(true)}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 px-4 py-2 text-sm font-bold text-white shadow-lg hover:scale-[1.02] transition"
            >
              📊 Exportar
            </button>
            <button
              onClick={() => setShowAddFunds(true)}
              className="rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-4 py-2 text-sm font-bold text-white shadow-lg hover:scale-[1.02] transition"
            >
              + Recargar
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8">
        {/* Enhanced Tabs */}
        <section
          className={clsx(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl overflow-x-auto">
            {[
              { id: "overview", label: "Resumen", icon: "📊" },
              { id: "insights", label: "Insights", icon: "🧠" },
              { id: "history", label: "Historial", icon: "📋" },
              { id: "methods", label: "Métodos", icon: "💳" },
              { id: "crypto", label: "Crypto", icon: "₿" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={clsx(
                  "flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Enhanced Balance Card */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-cyan-600/20 p-8 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(6,182,212,.2),transparent_40%)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-emerald-300/80 text-xs font-medium mb-2 tracking-wider">
                      Saldo disponible
                    </p>
                    <p className="text-5xl font-black bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                      ₡{walletStats.balance.toLocaleString("es-CR")}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-emerald-300">
                        {insights.spendingTrend === "down" ? "📉" : "📈"}{" "}
                        {insights.spendingChange} que el mes anterior
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/15 p-4">
                    <div className="text-3xl">💰</div>
                  </div>
                </div>

                {/* Financial Badges */}
                <div className="mb-6">
                  <p className="text-xs text-emerald-300/80 mb-3">
                    Logros financieros
                  </p>
                  <div className="flex gap-2">
                    {financialBadges
                      .filter((b) => b.unlocked)
                      .map((badge) => (
                        <div
                          key={badge.id}
                          className={`rounded-lg bg-gradient-to-r ${badge.color} p-2 text-sm font-medium animate-pulse`}
                          title={badge.description}
                        >
                          {badge.icon}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    {
                      label: "Recargar",
                      icon: "⬆",
                      action: () => setShowAddFunds(true),
                    },
                    {
                      label: "Retirar",
                      icon: "⬇",
                      action: () => alert("Acción demo: Retirar"),
                    },
                    {
                      label: "Transferir",
                      icon: "🔁",
                      action: () => alert("Acción demo: Transferir"),
                    },
                    {
                      label: "Crypto",
                      icon: "₿",
                      action: () => setActiveTab("crypto"),
                    },
                  ].map((a) => (
                    <button
                      key={a.label}
                      onClick={a.action}
                      className="group rounded-2xl border border-white/10 bg-white/10 p-4 text-center hover:bg-white/20 transition-all"
                    >
                      <div className="text-2xl mb-1 group-hover:scale-110 transition">
                        {a.icon}
                      </div>
                      <p className="text-xs text-white/80">{a.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs text-white/60">Meta de ahorro</p>
                <p className="text-2xl font-bold">
                  ₡{walletStats.savingsGoal.toLocaleString()}
                </p>
                <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    style={{ width: `${insights.savingsRate}%` }}
                  />
                </div>
                <p className="text-xs text-emerald-400 mt-1">
                  {insights.savingsRate}% completado
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs text-white/60">Bonos acumulados</p>
                <p className="text-2xl font-bold text-yellow-300">
                  ₡{walletStats.bonusEarned.toLocaleString()}
                </p>
                <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                    style={{ width: "45%" }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs text-white/60">Crypto Portfolio</p>
                <p className="text-2xl font-bold text-orange-300">
                  ₡
                  {cryptoBalances
                    .reduce((sum, crypto) => sum + crypto.value, 0)
                    .toLocaleString()}
                </p>
                <p className="text-xs text-emerald-400 mt-1">
                  +8.3% esta semana
                </p>
              </div>
            </div>

            {/* Combined Chart */}
            <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Recargas vs Gastos</h3>
                  <p className="text-xs text-white/60">Últimos 5 meses</p>
                </div>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-400 rounded"></div>
                    <span className="text-white/70">Recargas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-rose-500 to-pink-400 rounded"></div>
                    <span className="text-white/70">Gastos</span>
                  </div>
                </div>
              </div>
              <CombinedChart />
            </div>
          </section>
        )}

        {/* INSIGHTS TAB */}
        {activeTab === "insights" && (
          <section className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Insights Financieros
              </h3>
              <p className="text-white/60">
                Análisis inteligente de tus hábitos de gasto
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Spending Insight */}
              <div
                className={`rounded-2xl border backdrop-blur-xl p-6 ${
                  insights.spendingTrend === "down"
                    ? "border-emerald-500/30 bg-emerald-500/10"
                    : "border-orange-500/30 bg-orange-500/10"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      insights.spendingTrend === "down"
                        ? "bg-emerald-500/20"
                        : "bg-orange-500/20"
                    }`}
                  >
                    {insights.spendingTrend === "down" ? "📉" : "📈"}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Gasto Mensual</h4>
                    <p
                      className={`text-sm ${
                        insights.spendingTrend === "down"
                          ? "text-emerald-300"
                          : "text-orange-300"
                      }`}
                    >
                      vs mes anterior
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-2">
                  {insights.spendingChange}
                </p>
                <p className="text-sm text-white/70">
                  {insights.spendingTrend === "down"
                    ? "¡Excelente control de gastos! Continúa así."
                    : "Considera revisar tus gastos este mes."}
                </p>
              </div>

              {/* Highest Trip */}
              <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl">
                    🚗
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Viaje Más Caro</h4>
                    <p className="text-sm text-purple-300">Este mes</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-2">
                  {insights.highestTrip}
                </p>
                <p className="text-sm text-white/70">
                  Aeropuerto → Centro (Premium)
                </p>
              </div>

              {/* Savings Rate */}
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-2xl">
                    💎
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Tasa de Ahorro</h4>
                    <p className="text-sm text-cyan-300">Promedio mensual</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-2">
                  {insights.savingsRate}%
                </p>
                <p className="text-sm text-white/70">
                  Vas camino a tu meta de ₡30,000
                </p>
              </div>

              {/* Average Spend */}
              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Gasto Promedio</h4>
                    <p className="text-sm text-blue-300">Por mes</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-2">
                  {insights.avgSpend}
                </p>
                <p className="text-sm text-white/70">
                  Consistente en los últimos 5 meses
                </p>
              </div>

              {/* Recommendation */}
              <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-2xl">
                    💡
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Recomendación</h4>
                    <p className="text-sm text-yellow-300">Tip inteligente</p>
                  </div>
                </div>
                <p className="text-sm text-white/70">
                  Usa más RideShare en lugar de Premium para ahorrar hasta
                  ₡2,500 al mes
                </p>
              </div>

              {/* Crypto Performance */}
              <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 backdrop-blur-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-2xl">
                    ₿
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Crypto Portfolio</h4>
                    <p className="text-sm text-orange-300">Rendimiento</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-emerald-400 mb-2">
                  +8.3%
                </p>
                <p className="text-sm text-white/70">
                  Esta semana - RideCoin lidera con +12.5%
                </p>
              </div>
            </div>

            {/* Financial Badges Section */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Logros Financieros
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {financialBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={clsx(
                      "rounded-2xl border backdrop-blur-xl p-4 transition-all hover:scale-105",
                      badge.unlocked
                        ? `border-white/20 bg-gradient-to-br ${badge.color} bg-opacity-20`
                        : "border-white/10 bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={clsx(
                          "w-14 h-14 rounded-xl flex items-center justify-center text-2xl",
                          badge.unlocked
                            ? `bg-gradient-to-r ${badge.color}`
                            : "bg-white/10"
                        )}
                      >
                        {badge.unlocked ? badge.icon : "🔒"}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={clsx(
                            "font-bold",
                            badge.unlocked ? "text-white" : "text-white/50"
                          )}
                        >
                          {badge.name}
                        </h4>
                        <p
                          className={clsx(
                            "text-sm",
                            badge.unlocked ? "text-white/70" : "text-white/40"
                          )}
                        >
                          {badge.description}
                        </p>
                        {!badge.unlocked &&
                          badge.progress !== undefined &&
                          badge.maxProgress && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-white/50 mb-1">
                                <span>Progreso</span>
                                <span>
                                  {badge.progress}/{badge.maxProgress}
                                </span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full bg-gradient-to-r ${badge.color}`}
                                  style={{
                                    width: `${
                                      (badge.progress / badge.maxProgress) * 100
                                    }%`,
                                  }}
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
          </section>
        )}

        {/* HISTORY TAB */}
        {activeTab === "history" && (
          <section className="space-y-4">
            {/* Filtros */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {(
                    [
                      "Todos",
                      "Viajes",
                      "Recargas",
                      "Reembolsos",
                      "Bonos",
                      "Retiros",
                    ] as const
                  ).map((f) => (
                    <button
                      key={f}
                      onClick={() => setHistoryFilter(f)}
                      className={clsx(
                        "rounded-full px-3 py-1 text-xs border transition",
                        historyFilter === f
                          ? "border-cyan-400 bg-cyan-500/20 text-cyan-200"
                          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
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
                        historyPeriod === p
                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    value={historyQuery}
                    onChange={(e) => setHistoryQuery(e.target.value)}
                    placeholder="Buscar..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm placeholder:text-white/50 focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    onClick={() => setSortDesc((v) => !v)}
                    className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs hover:bg-white/20"
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
                <p className="text-white/70">No hay transacciones</p>
              </div>
            ) : (
              <div className="space-y-3">
                {historyFiltered.map((t) => (
                  <div
                    key={t.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:bg-white/10 transition"
                  >
                    <div
                      className={clsx(
                        "absolute left-0 top-0 h-full w-1 bg-gradient-to-b",
                        typePill[t.type]
                      )}
                    />
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
                          <span
                            className={clsx("text-xs", statusColor[t.status])}
                          >
                            {t.status === "completed"
                              ? "Completado"
                              : t.status === "pending"
                              ? "Pendiente"
                              : "Fallido"}
                          </span>
                          <span className="text-xs text-white/50">
                            • {t.date} {t.time && `• ${t.time}`}
                          </span>
                        </div>
                        <p className="font-medium">{t.description}</p>
                        <div className="mt-1 flex flex-wrap gap-3 text-xs text-white/60">
                          {t.reference && <span>Ref: {t.reference}</span>}
                          {t.tripId && <span>Viaje: {t.tripId}</span>}
                          {t.paymentMethod && (
                            <span>Método: {t.paymentMethod}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={clsx(
                            "text-xl font-bold",
                            posNeg(t.amount)
                          )}
                        >
                          {t.amount > 0 ? "+" : ""}₡
                          {Math.abs(t.amount).toLocaleString("es-CR")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* METHODS TAB */}
        {activeTab === "methods" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Métodos de pago</h3>
              <button
                onClick={() => setShowAddMethod(true)}
                className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-bold hover:scale-[1.02] transition"
              >
                + Agregar
              </button>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((m) => (
                <div
                  key={m.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:bg-white/10 transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2 text-lg">
                        {m.icon}
                      </div>
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
                        <p className="text-xs text-white/60">
                          {m.type === "card"
                            ? "Tarjeta"
                            : m.type === "bank"
                            ? "Banco"
                            : m.type === "digital"
                            ? "Digital"
                            : "Crypto"}
                        </p>
                        {m.balance && (
                          <p className="text-sm text-emerald-400 mt-1">
                            Saldo: ₡{m.balance.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!m.isDefault && (
                        <button
                          onClick={() => setDefaultMethod(m.id)}
                          className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
                        >
                          Principal
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
          </section>
        )}

        {/* CRYPTO TAB */}
        {activeTab === "crypto" && (
          <section className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Portfolio Crypto
              </h3>
              <p className="text-white/60">
                Gestiona tus criptomonedas y RideCoin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cryptoBalances.map((crypto) => (
                <div
                  key={crypto.symbol}
                  className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl p-6 hover:scale-105 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold">
                        {crypto.symbol[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{crypto.name}</h4>
                        <p className="text-xs text-white/60">{crypto.symbol}</p>
                      </div>
                    </div>
                    <span
                      className={clsx(
                        "text-sm font-bold",
                        crypto.change.startsWith("+")
                          ? "text-emerald-400"
                          : "text-rose-400"
                      )}
                    >
                      {crypto.change}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-white/60">Balance</span>
                      <span className="text-sm font-medium text-white">
                        {crypto.balance} {crypto.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-white/60">Valor</span>
                      <span className="text-lg font-bold text-white">
                        ₡{crypto.value.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button className="rounded-lg bg-emerald-500/20 py-2 text-xs font-medium text-emerald-300 hover:bg-emerald-500/30">
                      Comprar
                    </button>
                    <button className="rounded-lg bg-white/10 py-2 text-xs font-medium text-white hover:bg-white/20">
                      Vender
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🚀</div>
                <div>
                  <h4 className="font-bold text-white">RideCoin (RIDE)</h4>
                  <p className="text-sm text-blue-300">
                    Token oficial de RideNow
                  </p>
                </div>
              </div>
              <p className="text-sm text-white/70 mb-4">
                Gana RideCoins en cada viaje y úsalos para descuentos
                especiales. 1 RIDE = ₡3
              </p>
              <button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-sm font-bold text-white hover:from-blue-600 hover:to-cyan-600 transition">
                Más información sobre RIDE
              </button>
            </div>
          </section>
        )}
      </main>

      {/* MODAL: Export */}
      {showExport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-900/95 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h4 className="text-lg font-bold">Exportar Historial</h4>
              <button
                onClick={() => setShowExport(false)}
                className="rounded-xl border border-white/15 bg-white/10 p-2 hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-white/70">
                Selecciona el formato de exportación
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleExport("excel")}
                  className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 hover:bg-green-500/20 transition-all"
                >
                  <div className="text-4xl mb-2">📊</div>
                  <p className="font-bold text-white">Excel</p>
                  <p className="text-xs text-white/60">.xlsx</p>
                </button>

                <button
                  onClick={() => handleExport("pdf")}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 hover:bg-red-500/20 transition-all"
                >
                  <div className="text-4xl mb-2">📄</div>
                  <p className="font-bold text-white">PDF</p>
                  <p className="text-xs text-white/60">.pdf</p>
                </button>
              </div>

              <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                <p className="text-xs text-blue-200">
                  💡 El archivo incluirá todas las transacciones filtradas
                  actualmente
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Funds */}
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
                  onChange={(e) =>
                    setRechargeAmount(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-500 focus:outline-none"
                />
              </div>

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
                      <span className="text-xs text-emerald-300">
                        Seleccionado
                      </span>
                    </div>
                  ))}
              </div>

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
                  Recargar{" "}
                  {rechargeAmount
                    ? `₡${parseInt(rechargeAmount).toLocaleString("es-CR")}`
                    : ""}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Method */}
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
                {
                  type: "Tarjeta",
                  icon: "💳",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  type: "Banco",
                  icon: "🏦",
                  color: "from-purple-500 to-violet-500",
                },
                {
                  type: "SINPE",
                  icon: "📱",
                  color: "from-emerald-500 to-green-500",
                },
                {
                  type: "Crypto",
                  icon: "₿",
                  color: "from-orange-500 to-yellow-500",
                },
              ].map((m) => (
                <button
                  key={m.type}
                  className="rounded-xl border border-white/15 bg-white/5 p-4 hover:bg-white/10 transition"
                  onClick={() => alert(`Demo: agregar ${m.type}`)}
                >
                  <div
                    className={clsx(
                      "mb-2 inline-flex rounded-lg bg-gradient-to-r p-2 text-xl",
                      m.color
                    )}
                  >
                    {m.icon}
                  </div>
                  <p className="text-sm font-medium">{m.type}</p>
                </button>
              ))}
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
            { name: "Inicio", icon: "🏠", active: false },
            { name: "Viajes", icon: "🧭", active: false },
            { name: "Wallet", icon: "💳", active: true },
            { name: "Perfil", icon: "👤", active: false },
          ].map((tab) => (
            <button
              key={tab.name}
              className={clsx(
                "flex flex-col items-center gap-1 py-4 text-xs font-medium transition-all",
                tab.active
                  ? "text-emerald-400"
                  : "text-white/60 hover:text-white"
              )}
            >
              <div
                className={clsx(
                  "rounded-xl p-2 transition-all",
                  tab.active
                    ? "bg-emerald-500/20 text-lg"
                    : "text-base hover:bg-white/10"
                )}
              >
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
