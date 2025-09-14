"use client";
import { useEffect, useState } from "react";

function clsx(...arr: (string | false | null | undefined)[]): string {
  return arr.filter(Boolean).join(" ");
}

interface Transaction {
  id: string;
  type: 'trip' | 'recharge' | 'refund' | 'bonus' | 'cashout';
  status: 'completed' | 'pending' | 'failed';
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
  type: 'card' | 'bank' | 'digital';
  name: string;
  last4: string;
  brand: string;
  isDefault: boolean;
  icon: string;
}

export default function WalletScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'methods'>('overview');
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const walletStats = {
    balance: 8450,
    thisMonthSpent: 12340,
    totalSpent: 124800,
    pendingRefunds: 0,
    bonusEarned: 1250
  };

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'trip',
      status: 'completed',
      amount: -2840,
      description: 'Viaje a TEC Cartago',
      date: 'Hoy',
      time: '14:25',
      tripId: 'T-001',
      paymentMethod: 'Saldo Wallet'
    },
    {
      id: '2',
      type: 'recharge',
      status: 'completed',
      amount: 10000,
      description: 'Recarga desde Visa •••• 4242',
      date: 'Hoy',
      time: '08:30',
      reference: 'RCG-2024-001'
    },
    {
      id: '3',
      type: 'trip',
      status: 'completed',
      amount: -3200,
      description: 'Viaje a Universidad de Costa Rica',
      date: 'Ayer',
      time: '09:15',
      tripId: 'T-002'
    },
    {
      id: '4',
      type: 'bonus',
      status: 'completed',
      amount: 500,
      description: 'Bono por referir amigo',
      date: 'Ayer',
      time: '16:45',
      reference: 'BONUS-REF-001'
    },
    {
      id: '5',
      type: 'refund',
      status: 'completed',
      amount: 2840,
      description: 'Reembolso viaje cancelado',
      date: '2 días',
      time: '11:20',
      tripId: 'T-003'
    },
    {
      id: '6',
      type: 'trip',
      status: 'completed',
      amount: -5650,
      description: 'Viaje desde Aeropuerto',
      date: '3 días',
      time: '16:30',
      tripId: 'T-004'
    },
    {
      id: '7',
      type: 'cashout',
      status: 'pending',
      amount: -5000,
      description: 'Retiro a cuenta bancaria',
      date: '5 días',
      time: '10:00',
      reference: 'OUT-2024-001'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      name: 'Visa',
      last4: '4242',
      brand: 'VISA',
      isDefault: true,
      icon: '💳'
    },
    {
      id: '2',
      type: 'card',
      name: 'Mastercard',
      last4: '8888',
      brand: 'MASTERCARD',
      isDefault: false,
      icon: '💳'
    },
    {
      id: '3',
      type: 'bank',
      name: 'Banco Nacional',
      last4: '1234',
      brand: 'BN',
      isDefault: false,
      icon: '🏦'
    },
    {
      id: '4',
      type: 'digital',
      name: 'SINPE Móvil',
      last4: '8765',
      brand: 'SINPE',
      isDefault: false,
      icon: '📱'
    }
  ];

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'trip': return 'from-red-500 to-pink-500';
      case 'recharge': return 'from-emerald-500 to-green-500';
      case 'refund': return 'from-blue-500 to-cyan-500';
      case 'bonus': return 'from-yellow-500 to-orange-500';
      case 'cashout': return 'from-purple-500 to-violet-500';
    }
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'trip': return '🚗';
      case 'recharge': return '⬆️';
      case 'refund': return '↩️';
      case 'bonus': return '🎁';
      case 'cashout': return '⬇️';
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return 'text-emerald-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === 'history') return true;
    return false;
  });

  const handleRecharge = () => {
    // Aquí implementarías la lógica de recarga
    console.log('Recargando:', rechargeAmount);
    setShowAddFunds(false);
    setRechargeAmount('');
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse delay-500"></div>
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
              aria-label="Volver"
            >
              ←
            </button>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Mi Wallet
              </h1>
              <p className="text-sm text-white/60">Gestiona tu dinero digital</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddFunds(true)}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2 text-sm font-bold backdrop-blur hover:from-emerald-600 hover:to-green-600 transition-all"
          >
            💰 Agregar Fondos
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8">
        {/* Balance Card */}
        <section
          className={clsx(
            "transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-emerald-600/20 backdrop-blur-xl p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-green-400/5"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-emerald-300/80 text-sm font-medium mb-2">Saldo disponible</p>
                  <p className="text-5xl font-black bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                    ₡{walletStats.balance.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/20 p-4 backdrop-blur">
                    <div className="text-3xl mb-2">💳</div>
                    <p className="text-xs text-emerald-300/80">Wallet Digital</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs text-white/60 mb-1">Este mes gastado</p>
                  <p className="text-xl font-bold text-white">₡{walletStats.thisMonthSpent.toLocaleString()}</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs text-white/60 mb-1">Bonos ganados</p>
                  <p className="text-xl font-bold text-yellow-400">₡{walletStats.bonusEarned.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section
          className={clsx(
            "grid grid-cols-4 gap-4",
            "transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {[
            { label: 'Recargar', icon: '⬆️', color: 'from-emerald-500 to-green-500', action: () => setShowAddFunds(true) },
            { label: 'Retirar', icon: '⬇️', color: 'from-purple-500 to-violet-500', action: () => {} },
            { label: 'Métodos', icon: '💳', color: 'from-blue-500 to-cyan-500', action: () => setActiveTab('methods') },
            { label: 'Historial', icon: '📊', color: 'from-yellow-500 to-orange-500', action: () => setActiveTab('history') }
          ].map((action, i) => (
            <button
              key={action.label}
              onClick={action.action}
              className="group rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 shadow-xl hover:bg-white/10 transition-all"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`rounded-xl bg-gradient-to-r ${action.color} p-3 text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <p className="text-sm font-medium text-white">{action.label}</p>
            </button>
          ))}
        </section>

        {/* Tab Navigation */}
        <section
          className={clsx(
            "transition-all duration-1000 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex gap-2 rounded-2xl border border-white/20 bg-white/5 p-2 backdrop-blur-xl">
            {[
              { id: 'overview', label: 'Resumen', count: 0 },
              { id: 'history', label: 'Historial', count: transactions.length },
              { id: 'methods', label: 'Métodos', count: paymentMethods.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={clsx(
                  "flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
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

        {/* Tab Content */}
        <section
          className={clsx(
            "transition-all duration-1000 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Recent Transactions */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Transacciones recientes</h3>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction, i) => (
                    <div
                      key={transaction.id}
                      className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 hover:bg-white/10 transition-all"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`rounded-lg bg-gradient-to-r ${getTransactionColor(transaction.type)} p-2`}>
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{transaction.description}</p>
                            <p className="text-xs text-white/60">{transaction.date} • {transaction.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={clsx(
                            "text-lg font-bold",
                            transaction.amount > 0 ? "text-emerald-400" : "text-red-400"
                          )}>
                            {transaction.amount > 0 ? '+' : ''}₡{Math.abs(transaction.amount).toLocaleString()}
                          </p>
                          <p className={clsx("text-xs", getStatusColor(transaction.status))}>
                            {transaction.status === 'completed' ? 'Completado' : 
                             transaction.status === 'pending' ? 'Pendiente' : 'Fallido'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2">📈</div>
                    <div>
                      <p className="text-2xl font-bold text-white">₡{walletStats.totalSpent.toLocaleString()}</p>
                      <p className="text-xs text-white/60">Total gastado</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 p-2">⭐</div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-400">₡{walletStats.bonusEarned.toLocaleString()}</p>
                      <p className="text-xs text-white/60">En bonos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {transactions.map((transaction, i) => (
                <div
                  key={transaction.id}
                  className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 hover:bg-white/10 transition-all"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-lg bg-gradient-to-r ${getTransactionColor(transaction.type)} p-2`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <p className="text-xs text-white/60">{transaction.date} • {transaction.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={clsx(
                        "text-xl font-bold",
                        transaction.amount > 0 ? "text-emerald-400" : "text-red-400"
                      )}>
                        {transaction.amount > 0 ? '+' : ''}₡{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <p className={clsx("text-xs", getStatusColor(transaction.status))}>
                        {transaction.status === 'completed' ? 'Completado' : 
                         transaction.status === 'pending' ? 'Pendiente' : 'Fallido'}
                      </p>
                    </div>
                  </div>
                  
                  {(transaction.reference || transaction.tripId || transaction.paymentMethod) && (
                    <div className="flex gap-4 text-xs text-white/60">
                      {transaction.reference && <span>Ref: {transaction.reference}</span>}
                      {transaction.tripId && <span>Viaje: {transaction.tripId}</span>}
                      {transaction.paymentMethod && <span>Método: {transaction.paymentMethod}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'methods' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Métodos de pago</h3>
                <button
                  onClick={() => setShowAddMethod(true)}
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-bold text-white hover:from-blue-600 hover:to-cyan-600 transition-all"
                >
                  + Agregar método
                </button>
              </div>

              {paymentMethods.map((method, i) => (
                <div
                  key={method.id}
                  className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl p-4 hover:bg-white/10 transition-all"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2 text-lg">
                        {method.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium">{method.name} •••• {method.last4}</p>
                          {method.isDefault && (
                            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/50 px-2 py-0.5 text-xs text-emerald-300">
                              Principal
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/60 capitalize">{method.type === 'card' ? 'Tarjeta' : method.type === 'bank' ? 'Banco' : 'Digital'}</p>
                      </div>
                    </div>
                    <button className="rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 transition-all">
                      Gestionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Agregar fondos</h3>
                <button
                  onClick={() => setShowAddFunds(false)}
                  className="rounded-xl border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <p className="text-sm text-white/70 mb-3">Cantidad a recargar</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {['5000', '10000', '20000'].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setRechargeAmount(amount)}
                        className={clsx(
                          "rounded-xl border p-3 text-sm font-medium transition-all",
                          rechargeAmount === amount
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                            : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                        )}
                      >
                        ₡{parseInt(amount).toLocaleString()}
                      </button>
                    ))}
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Cantidad personalizada"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value.replace(/\D/g, ''))}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Payment Method Selection */}
                <div>
                  <p className="text-sm text-white/70 mb-3">Método de pago</p>
                  <div className="space-y-2">
                    {paymentMethods.filter(m => m.isDefault).map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between rounded-xl border border-emerald-500/50 bg-emerald-500/20 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{method.icon}</span>
                          <span className="text-white font-medium">{method.name} •••• {method.last4}</span>
                        </div>
                        <span className="text-xs text-emerald-300">Seleccionado</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddFunds(false)}
                    className="flex-1 rounded-xl border border-white/30 bg-white/10 py-3 text-sm font-medium text-white hover:bg-white/20 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleRecharge}
                    disabled={!rechargeAmount}
                    className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-3 text-sm font-bold text-white hover:from-emerald-600 hover:to-green-600 transition-all disabled:opacity-50"
                  >
                    Recargar ₡{rechargeAmount ? parseInt(rechargeAmount).toLocaleString() : '0'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddMethod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Agregar método</h3>
                <button
                  onClick={() => setShowAddMethod(false)}
                  className="rounded-xl border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { type: 'Tarjeta', icon: '💳', color: 'from-blue-500 to-cyan-500' },
                  { type: 'Banco', icon: '🏦', color: 'from-purple-500 to-violet-500' },
                  { type: 'SINPE', icon: '📱', color: 'from-emerald-500 to-green-500' },
                  { type: 'PayPal', icon: '🌐', color: 'from-yellow-500 to-orange-500' }
                ].map((method) => (
                  <button
                    key={method.type}
                    className={`rounded-xl border border-white/20 bg-gradient-to-r ${method.color} bg-opacity-20 p-4 hover:bg-opacity-30 transition-all`}
                  >
                    <div className="text-2xl mb-2">{method.icon}</div>
                    <p className="text-sm font-medium text-white">{method.type}</p>
                  </button>
                ))}
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
              <div className={clsx(
                "rounded-xl p-2 transition-all",
                tab.active 
                  ? "bg-emerald-500/20 text-lg" 
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