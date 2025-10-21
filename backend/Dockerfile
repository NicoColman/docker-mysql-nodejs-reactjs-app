# Multi-stage build para optimizar tamaño
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar solo package files primero (mejor cache)
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

# Stage final
FROM node:18-alpine

WORKDIR /app

# Copiar desde builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/*.js ./
COPY --from=builder /app/package*.json ./

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production

# Comando de inicio
CMD ["node", "server.js"]