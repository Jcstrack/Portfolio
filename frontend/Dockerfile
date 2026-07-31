# Usa la sintaxis 1.7 de Dockerfile mediante BuildKit.
# syntax=docker/dockerfile:1.7


# Etapa 1: instala las dependencias del proyecto.
FROM node:24-alpine AS dependencies

# Define /app como carpeta de trabajo dentro de la imagen.
WORKDIR /app

# Copia primero los archivos de dependencias para aprovechar la caché.
COPY package.json package-lock.json ./

# Instala exactamente las versiones de package-lock.json.
# La caché de npm acelera futuras construcciones.
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund


# Etapa 2: construye la aplicación para producción.
FROM dependencies AS build

# Copia todo el código fuente dentro de /app.
COPY . .

# Define la URL de la API durante la construcción.
# Puede cambiarse usando: docker build --build-arg VITE_API_URL=/otra-ruta .
ARG VITE_API_URL=/api/v1

# Convierte el argumento en una variable disponible para Vite.
ENV VITE_API_URL=${VITE_API_URL}

# Genera los archivos estáticos de producción en /app/dist.
RUN npm run build


# Etapa 3: ejecuta la aplicación usando Nginx.
FROM nginx:alpine AS runtime

# Copia la configuración personalizada de Nginx.
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copia únicamente los archivos compilados desde la etapa build.
COPY --from=build /app/dist /usr/share/nginx/html

# Comprueba que la configuración de Nginx sea válida.
RUN nginx -t

# Documenta que Nginx escucha en el puerto 80.
EXPOSE 80

# HEALTHCHECK comprueba automáticamente si el contenedor funciona.
# Espera 5 segundos y luego consulta /healthz cada 30 segundos.
# Cada prueba puede tardar hasta 3 segundos.
# Tras 3 fallos consecutivos, Docker lo marca como unhealthy.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/healthz || exit 1

# Ejecuta Nginx en primer plano para mantener activo el contenedor.
CMD ["nginx", "-g", "daemon off;"]