# syntax=docker/dockerfile:1.7

# Etapa 1: valida la configuración de Nginx.
FROM nginx:alpine AS validation

COPY nginx.conf /tmp/default.conf

RUN sed \
      -e 's/server frontend:80;/server 127.0.0.1:80;/' \
      -e 's/server api:3001;/server 127.0.0.1:3001;/' \
      /tmp/default.conf > /etc/nginx/conf.d/default.conf \
    && nginx -t


# Etapa 2: conserva la configuración original para la red de Compose.
FROM nginx:alpine AS runtime

COPY --from=validation /tmp/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
