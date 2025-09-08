#!/bin/bash

# Define la URL de la base de datos SQLite
export DATABASE_URL="file:./packages/database/prisma/dev.db"

# Inicia la aplicación web en modo desarrollo
echo "Iniciando la aplicación web..."
cd apps/web && pnpm dev
