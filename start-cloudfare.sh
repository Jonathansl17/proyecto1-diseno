#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/jserver/proyectmanagement"
NODE_BIN="/usr/bin/node"
PNPM_BIN="/usr/local/bin/pnpm"

# 1) Ir al proyecto
cd "$APP_DIR"

# 2) Cargar .env (si existe)
if command -v dotenvx >/dev/null 2>&1 && [ -f .env ]; then
  eval "$(dotenvx run -- env | sed -n 's/^\([^=]\+\)=\(.*\)$/export \1='\''\2'\''/p')"
elif [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env
  set +a
fi

# 3) Matar procesos previos
pkill -f "$NODE_BIN .*proyectmanagement/server.js" || true
pkill -f "$PNPM_BIN run dev" || true

# 4) (Opcional) Comprobar Postgres si usas PG*
if command -v pg_isready >/dev/null 2>&1; then
  pg_isready -h "${PGHOST:-localhost}" -p "${PGPORT:-5432}" || echo "Aviso: pg_isready no OK, continúo…"
fi

# 5) Iniciar backend (Node)
nohup $NODE_BIN "$APP_DIR/server.js" > "$APP_DIR/logs-node.out" 2>&1 &

# 6) Iniciar frontend (Vite en 5174)
nohup $PNPM_BIN run dev -- --host > "$APP_DIR/logs-vite.out" 2>&1 &

# 7) Mostrar PIDs y checks básicos
sleep 1
echo "Node PID: $(pgrep -f "$NODE_BIN .*proyectmanagement/server.js" | paste -sd, -)"
echo "Vite PID: $(pgrep -f "$PNPM_BIN run dev" | paste -sd, -)"
echo "Logs: $APP_DIR/logs-node.out  |  $APP_DIR/logs-vite.out"
