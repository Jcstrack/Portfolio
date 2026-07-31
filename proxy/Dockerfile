# syntax=docker/dockerfile:1.7

# Etapa 1: valida la configuración de Nginx.
FROM nginx:alpine AS validation

# Copia la configuración original.
COPY nginx.conf /tmp/default.conf

# Reemplaza temporalmente los DNS internos y valida la sintaxis.
# El archivo original en /tmp/default.conf no se modifica.
RUN sed \
      -e 's/server frontend:80;/server 127.0.0.1:80;/' \
      -e 's/server api:3001;/server 127.0.0.1:3001;/' \
      /tmp/default.conf > /etc/nginx/conf.d/default.conf \
    && nginx -t

# Etapa 2: imagen final que ejecutará Nginx.
FROM nginx:alpine AS runtime

# Copia la configuración original con frontend y api.
COPY --from=validation /tmp/default.conf /etc/nginx/conf.d/default.conf

# Puerto usado por Nginx dentro del contenedor.
EXPOSE 80

# HEALTHCHECK[comprobación de salud] comprueba automáticamente si el contenedor sigue funcionando.
# Espera 5 segundos al iniciar y luego consulta /healthz cada 30 segundos.
# Cada comprobación puede tardar como máximo 3 segundos.
# Si falla 3 veces seguidas, Docker marca el contenedor como unhealthy.
# wget --spider verifica la URL sin descargar su contenido.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/healthz || exit 1

# Ejecuta Nginx en primer plano para mantener activo el contenedor.
CMD ["nginx", "-g", "daemon off;"]