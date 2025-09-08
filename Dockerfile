FROM node:20-alpine

# Instalar herramientas adicionales
RUN apk add --no-cache git bash curl python3 make g++ \
    postgresql-client redis-cli

# Crear usuario no-root
RUN adduser -D node && \
    mkdir -p /workspace && \
    chown -R node:node /workspace

# Instalar pnpm globalmente
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# Establecer directorio de trabajo
WORKDIR /workspace

# Cambiar al usuario no-root
USER node

# Configurar pnpm
RUN pnpm config set store-dir /workspace/.pnpm-store

EXPOSE 3000 4000 5000
CMD [ "bash" ]
