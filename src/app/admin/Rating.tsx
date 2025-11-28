"use client";

import React from "react";
import { Star, TrendingUp, Users } from "lucide-react";

interface RatingStats {
  average: number;
  totalRatings: number;
  distribution: Record<number, number>;
}

interface TopDriver {
  name: string;
  avatar: string;
  avgRating: number;
  trips: number;
}

interface RatingProps {
  ratingStats: RatingStats;
  topDrivers: TopDriver[];
}

export default function Rating({ ratingStats, topDrivers }: RatingProps) {
  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
          ⭐ Sistema de Calificaciones
        </h3>
        <p className="text-white/60">Análisis detallado de ratings y rendimiento</p>
      </div>

      {/* Rating Promedio */}
      <div className="relative rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-amber-500/20 p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 animate-pulse"></div>

        <div className="relative z-10 flex items-center justify-center mb-6">
          <div className="text-center">
            <p className="text-yellow-300 font-medium mb-2">Rating Promedio General</p>

            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-7xl font-black text-white drop-shadow-lg">
                {ratingStats.average}
              </span>

              <div className="flex flex-col items-center">
                <div className="flex text-yellow-400 text-4xl mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`${star <= Math.floor(ratingStats.average)
                        ? "animate-pulse"
                        : "opacity-30"
                        } transition-all duration-500`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-sm text-yellow-200">Excelente</p>
              </div>
            </div>

            <p className="text-white/80 font-medium">
              Basado en {ratingStats.totalRatings} calificaciones
            </p>
          </div>
        </div>
      </div>

      {/* Distribución + estadísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de distribución */}
        <div className="lg:col-span-2 rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
          <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            Distribución de Calificaciones
          </h4>

          <div className="space-y-4">
            {Object.entries(ratingStats.distribution)
              .reverse()
              .map(([rating, count]) => {
                const percentage = (count / ratingStats.totalRatings) * 100;

                return (
                  <div key={rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-20">
                      <span className="text-white font-medium">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>

                    <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="text-right w-16">
                      <span className="text-white font-bold">{count}</span>
                      <span className="text-white/60 text-xs ml-1">
                        ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 text-center">
            <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>

            <h5 className="font-bold text-white mb-1">Satisfacción</h5>

            <p className="text-3xl font-black text-green-400">
              {(
                ((ratingStats.distribution[4] || 0) +
                  (ratingStats.distribution[5] || 0)) /
                ratingStats.totalRatings *
                100
              ).toFixed(1)}
              %
            </p>

            <p className="text-xs text-white/60">4–5 estrellas</p>
          </div>

          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-400" />
            </div>

            <h5 className="font-bold text-white mb-1">Conductores</h5>
            <p className="text-3xl font-black text-blue-400">{topDrivers.length}</p>
            <p className="text-xs text-white/60">Activos</p>
          </div>
        </div>
      </div>

      {/* Top Conductores */}
      <div className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
        <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400" />
          Ranking de Conductores
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topDrivers.map((driver, i) => (
            <div
              key={i}
              className="group relative rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 hover:from-white/10 hover:to-white/15 transition-all duration-300 cursor-pointer"
            >
              {/* Badge ranking */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-black font-black text-sm">
                #{i + 1}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {driver.avatar}
                  </div>

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
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= Math.floor(driver.avgRating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-yellow-400 font-medium">
                      ({driver.avgRating})
                    </span>
                  </div>

                  <p className="text-white/60 text-sm mt-1">
                    {driver.trips} viajes completados
                  </p>
                </div>
              </div>

              {/* Mini estadísticas */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <p className="text-white/60 text-xs">Eficiencia</p>
                  <p className="text-cyan-400 font-bold">
                    {((driver.avgRating / 5) * 100).toFixed(0)}%
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-white/60 text-xs">Experiencia</p>
                  <p className="text-purple-400 font-bold">
                    {driver.trips > 10
                      ? "Alta"
                      : driver.trips > 5
                      ? "Media"
                      : "Nueva"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
