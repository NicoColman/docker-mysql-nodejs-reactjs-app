# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Build de producción
RUN npm run build

# Stage 2: Servir con nginx
FROM nginx:alpine

# Copiar build al directorio de nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuración personalizada de nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Nginx se inicia automáticamente
CMD ["nginx", "-g", "daemon off;"]