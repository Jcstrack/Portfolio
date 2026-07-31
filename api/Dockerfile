# Usa la sintaxis 1.7 de Dockerfile mediante BuildKit.
# syntax=docker/dockerfile:1.7


# Etapa 1: valida el código y ejecuta las pruebas.
FROM node:24-alpine AS validation

# Define /app como carpeta de trabajo.
WORKDIR /app

# Copia los archivos necesarios para validar la aplicación.
COPY package.json ./
COPY src ./src
COPY data ./data
COPY test ./test

# Ejecuta la revisión del código y luego las pruebas.
# npm test solo se ejecuta si npm run check termina correctamente.
RUN npm run check && npm test


# Etapa 2: crea la imagen final de producción.
FROM node:24-alpine AS runtime

# Define /app como carpeta de trabajo.
WORKDIR /app

# Configura Node.js en producción, acepta conexiones externas
# y establece el puerto interno de la aplicación.
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3001

# Copia desde la etapa de validación solo los archivos necesarios.
# --chown asigna los archivos al usuario y grupo node.
COPY --from=validation --chown=node:node /app/package.json ./
COPY --from=validation --chown=node:node /app/src ./src
COPY --from=validation --chown=node:node /app/data ./data

# Ejecuta la aplicación como usuario node en lugar de root.
USER node

# Documenta que la aplicación escucha en el puerto 3001.
EXPOSE 3001

# HEALTHCHECK verifica automáticamente si la API sigue funcionando.
# Espera 5 segundos y consulta el endpoint cada 30 segundos.
# Cada comprobación puede tardar hasta 3 segundos.
# Tras 3 fallos consecutivos, Docker marca el contenedor como unhealthy.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3001/api/v1/health').then((response) => { if (!response.ok) process.exit(1) }).catch(() => process.exit(1))"

# Inicia el servidor de Node.js.
CMD ["node", "src/server.js"]