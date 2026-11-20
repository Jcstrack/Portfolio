# Portfolio Frontend

Frontend del portfolio de Juan Carlos Ulloa, desarrollado con React 18, Vite 5
y Tailwind CSS. Consume la API del proyecto para mostrar el inventario de 47
skills y se distribuye como una SPA mediante Nginx.

## Requisitos

- Node.js 24
- npm 11
- API disponible en `http://localhost:3001` durante desarrollo

## Uso local

```bash
npm install
npm run dev
```

Vite inicia en `http://localhost:5173` y redirige `/api` hacia la API local.

## Scripts

```bash
npm run dev
npm run lint
npm test
npm run test:watch
npm run build
npm run preview
```

- `lint`: valida el código con ESLint.
- `test`: ejecuta las pruebas una vez con Vitest.
- `test:watch`: mantiene Vitest observando cambios.
- `build`: genera los bundles modernos y de compatibilidad en `dist/`.

## Pruebas

Las pruebas utilizan Vitest, Testing Library y JSDOM. Actualmente cubren:

- respuestas válidas, errores de red y respuestas inválidas de Portfolio API;
- renderizado, filtros y reintento del inventario de skills;
- semántica, contenido y cierre con `Escape` del modal de experiencia.

## Compatibilidad

El build de producción utiliza `@vitejs/plugin-legacy` y Autoprefixer. Se
generan scripts modernos y un bundle alternativo con polyfills para:

- Chrome 64 o posterior;
- Edge 79 o posterior;
- Firefox 67 o posterior;
- Safari e iOS 12 o posterior.

Internet Explorer 11 no está soportado. Los estilos incluyen fallbacks para
`dvh`, preferencias de movimiento reducido y unidades de viewport antiguas.

## Rendimiento

- Cada página se carga bajo demanda mediante `React.lazy`.
- Los enlaces precargan su página al recibir foco, hover o interacción táctil.
- La página de contacto utiliza enlaces nativos y no descarga librerías de
  formularios ni servicios de correo externos.
- La lista de habilidades se conserva cinco minutos en memoria para evitar
  solicitudes y estados de carga repetidos durante la navegación.
- Las imágenes del timeline utilizan carga diferida.
- El Service Worker conserva el shell y los assets visitados para navegación
  con conectividad limitada.
- Los assets con hash reciben caché inmutable de un año desde Nginx.
- Las animaciones usan transformaciones y opacidad, sin desenfoques grandes
  que obliguen a repintar la interfaz en cada fotograma.
- Las ilustraciones de About son locales y no dependen de servidores externos.

## Variables de entorno

```env
VITE_API_URL=/api/v1
VITE_WHATSAPP_NUMBER=
```

`VITE_WHATSAPP_NUMBER` debe contener el número internacional solo con dígitos,
por ejemplo `56912345678`. Al ser el destino de un enlace público, el número
queda visible en el bundle del navegador aunque el archivo `.env` esté ignorado.

La página ofrece enlaces directos a WhatsApp, correo, teléfono y LinkedIn, sin
depender de EmailJS. Docker monta `frontend/.env` como secreto únicamente
durante el build. Cuando cambies una variable, fuerza la reconstrucción para
evitar reutilizar una capa anterior:

```bash
docker compose build --no-cache frontend
docker compose up -d --no-deps --force-recreate frontend proxy
```

## Estructura

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── test/
│   └── translations/
├── Dockerfile
├── package.json
└── vite.config.js
```

## Docker

Desde la raíz `PORTFOLIO/`:

```bash
docker compose up --build
```

El frontend queda disponible a través del proxy en
`http://localhost:8090`. Nginx resuelve todas las rutas de React hacia
`index.html`.
