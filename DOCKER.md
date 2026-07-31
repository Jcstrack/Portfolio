# Portfolio con Docker

## Arquitectura

```text
Internet / navegador
        |
        v
proxy (Nginx, único puerto público)
        |
        +---- /api/* ----> api (Node.js, puerto interno 3001)
        |
        +---- /* --------> frontend (React + Nginx, puerto interno 80)
```

Los tres servicios utilizan una red bridge de Docker llamada `portfolio`.
Solamente `proxy` publica un puerto en el host. La API y el servidor estático no
son accesibles directamente desde fuera de la red Docker.

## Construcción multietapa

Los tres Dockerfiles aplican **multi-stage build**. Las etapas temporales se
descartan al finalizar y no forman parte de las imágenes que se ejecutan:

- `frontend`: `dependencies` instala paquetes con caché de BuildKit, `build`
  genera `dist` y `runtime` sirve únicamente esos archivos mediante Nginx.
- `api`: `validation` ejecuta comprobaciones de sintaxis y las pruebas; `runtime`
  recibe solamente `package.json`, `src` y `data`, sin copiar el directorio de
  pruebas.
- `proxy`: `validation` comprueba la configuración de Nginx con upstreams
  temporales; `runtime` recibe la configuración original.

Esta separación mantiene las herramientas de instalación, las pruebas y el
código de construcción fuera de las imágenes finales. En el frontend produce
la mayor reducción porque Node.js y `node_modules` no llegan al contenedor de
producción. En API y proxy el beneficio principal es validar durante el build y
controlar exactamente qué archivos entran en runtime.

## Estructura

```text
PORTFOLIO/
├── frontend/           # frontend React
│   ├── Dockerfile
│   └── docker/nginx.conf
├── api/                # API Node.js
│   └── Dockerfile
├── proxy/              # reverse proxy Nginx
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── .env.example
```

Los servicios de Compose se llaman `frontend`, `api` y `proxy`. Al utilizar el
nombre de proyecto `portfolio`, Docker genera nombres coherentes como
`portfolio-frontend-1`, `portfolio-api-1` y `portfolio-proxy-1`.

## Iniciar

Desde WSL2:

```bash
cd /mnt/c/Users/juaul/OneDrive/Escritorio/PROYECTO/PORTFOLIO
docker compose up --build
```

Direcciones públicas:

- Portfolio: <http://localhost:8080>
- API mediante proxy: <http://localhost:8080/api/v1>
- Health general: <http://localhost:8080/healthz>

## Ejecutar en segundo plano

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f proxy
```

## Detener

```bash
docker compose down
```

La red permanece identificada como `portfolio`. Para eliminarla cuando no tenga
contenedores conectados:

```bash
docker network rm portfolio
```

## Cambiar el puerto público

Copia `.env.example` como `.env` en esta carpeta:

```env
PORTFOLIO_PORT=8080
```

Después cambia el valor y vuelve a ejecutar `docker compose up`.

## Seguridad aplicada en el proxy

- API y frontend sin puertos publicados.
- Rate limit para `/api`.
- Límite de conexiones por IP.
- Solo `GET`, `HEAD` y `OPTIONS` hacia la API actual.
- Límite de tamaño de petición.
- Cabeceras CSP, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy` y `Permissions-Policy`.
- Ocultación de la versión de Nginx.
- Timeouts acotados para los servicios internos.

Si posteriormente se agrega `POST /api/v1/contact`, será necesario habilitar
`POST` en `proxy/nginx.conf` y añadir autenticación, validación y rate limit
específico.

## Desarrollo sin Docker

Terminal 1:

```bash
cd /mnt/c/Users/juaul/OneDrive/Escritorio/PROYECTO/PORTFOLIO/api
npm run dev
```

Terminal 2:

```bash
cd /mnt/c/Users/juaul/OneDrive/Escritorio/PROYECTO/PORTFOLIO/frontend
npm run dev
```

Vite redirige `/api` hacia `http://localhost:3001` durante el desarrollo.
