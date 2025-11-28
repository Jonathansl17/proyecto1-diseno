"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import {
  Car,
  DollarSign,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";

interface Stats {
  totalTrips: number;
  completedTrips: number;
  activeTrips: number;
  scheduledTrips: number;
  totalRevenue: number;
  avgTripValue: number;
  totalDrivers: number;
}

interface RevenueItem {
  date: string;
  revenue: number;
  trips: number;
}

interface CityItem {
  name: string;
  value: number;
  percentage: number;
}

interface HourItem {
  period: string;
  trips: number;
}

interface AnalyticsProps {
  stats: Stats;
  revenueData: RevenueItem[];
  cityData: CityItem[];
  hourlyData: HourItem[];
  COLORS: string[];
}

export default function Analytics({
  stats,
  revenueData,
  cityData,
  hourlyData,
  COLORS,
}: AnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          📊 Dashboard de Estadísticas
        </h3>
        <p className="text-white/60">
          Análisis completo de tu actividad de viajes
        </p>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Viajes */}
        <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Car className="w-6 h-6 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Total Viajes</span>
          </div>
          <p className="text-3xl font-black text-white">{stats.totalTrips}</p>
          <p className="text-xs text-white/60">
            +{stats.completedTrips} completados
          </p>
        </div>

        {/* Ingresos */}
        <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-6 h-6 text-green-400" />
            <span className="text-sm font-medium text-green-300">
              Ingresos Totales
            </span>
          </div>
          <p className="text-3xl font-black text-white">
            ₡{stats.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-white/60">
            Promedio: ₡{Math.round(stats.avgTripValue).toLocaleString()}
          </p>
        </div>

        {/* Conductores */}
        <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Conductores
            </span>
          </div>
          <p className="text-3xl font-black text-white">{stats.totalDrivers}</p>
          <p className="text-xs text-white/60">Conductores registrados</p>
        </div>

        {/* Viajes activos */}
        <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-orange-400" />
            <span className="text-sm font-medium text-orange-300">Activos</span>
          </div>
          <p className="text-3xl font-black text-white">{stats.activeTrips}</p>
          <p className="text-xs text-white/60">Viajes en curso</p>
        </div>
      </div>

      {/* Ingresos por Día */}
      <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Ingresos de los Últimos 7 Días
        </h4>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={(value) => `₡${value.toLocaleString()}`}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
                formatter={(value: any) => [
                  `₡${value.toLocaleString()}`,
                  "Ingresos",
                ]}
              />

              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#06B6D4"
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribuciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución por ciudades */}
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
                  label={({ name, percentage }) =>
                    `${name}: ${percentage}%`
                  }
                  outerRadius={80}
                  dataKey="value"
                >
                  {cityData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por horario */}
        <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Distribución por Horario
          </h4>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

                <XAxis dataKey="period" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />

                <Bar
                  dataKey="trips"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
