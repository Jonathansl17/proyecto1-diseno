#!/usr/bin/env bash
set -euo pipefail

FRONT_DIR="/home/jserver/proyecto1-diseno"
BACK_DIR="/home/jserver/proyecto1-diseno/server"
NPM_BIN="/usr/bin/npm"

# 1) Matar procesos previos
pkill -f "npm run server:dev" || true
pkill -f "npm run dev" || true

# 2) Iniciar backend
cd "$BACK_DIR"
nohup $NPM_BIN run server:dev > "$BACK_DIR/logs-backend.out" 2>&1 &

# 3) Iniciar frontend en puerto 5174
cd "$FRONT_DIR"
nohup $NPM_BIN run dev > "$FRONT_DIR/logs-frontend.out" 2>&1 &

# 4) Mostrar PIDs
sleep 1
echo "Backend PID: $(pgrep -f 'npm run server:dev' | paste -sd, -)"
echo "Frontend PID: $(pgrep -f 'npm run dev' | paste -sd, -)"
echo "Logs backend:   $BACK_DIR/logs-backend.out"
echo "Logs frontend:  $FRONT_DIR/logs-frontend.out"
