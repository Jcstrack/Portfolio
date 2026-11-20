# syntax=docker/dockerfile:1.7

# Etapa 1: valida el código y ejecuta las pruebas.
FROM node:24-alpine AS validation

WORKDIR /app

COPY package.json ./
COPY src ./src
COPY data ./data
COPY test ./test

RUN npm run check && npm test


# Etapa 2: crea la imagen mínima de producción.
FROM node:24-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3001

COPY --from=validation --chown=node:node /app/package.json ./
COPY --from=validation --chown=node:node /app/src ./src
COPY --from=validation --chown=node:node /app/data ./data

USER node

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3001/api/v1/health').then((response) => { if (!response.ok) process.exit(1) }).catch(() => process.exit(1))"

CMD ["node", "src/server.js"]
