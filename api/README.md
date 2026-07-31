# Portfolio API

API de contenido para el portfolio de Juan Carlos Ulloa. Está construida con
Node.js nativo y no requiere instalar dependencias.

## Requisitos

- Node.js 20 o superior.
- El proyecto utiliza Node.js 24 en WSL2.

## Iniciar en WSL2

```bash
cd /mnt/c/Users/juaul/OneDrive/Escritorio/PROYECTO/PORTFOLIO/api
cp .env.example .env
npm run dev
```

La API quedará disponible en:

```text
http://localhost:3001/api/v1
```

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/v1/health` | Estado de la API |
| GET | `/api/v1/profile?lang=es` | Perfil en español o inglés |
| GET | `/api/v1/content?lang=es` | Todos los textos editables |
| GET | `/api/v1/content/:section?lang=es` | Textos de una sección |
| GET | `/api/v1/categories?lang=es` | Nombres de las categorías |
| GET | `/api/v1/skills` | Lista completa de 47 skills |
| GET | `/api/v1/skills?category=frontend` | Skills por categoría |
| GET | `/api/v1/skills?q=react` | Skills por búsqueda |
| GET | `/api/v1/skills/react-js` | Una skill por ID |

Los filtros `category` y `q` se pueden combinar.

## Consumir desde React

Crea o actualiza el archivo `.env` del frontend:

```env
VITE_API_URL=http://localhost:3001/api/v1
```

Ejemplo:

```js
const apiUrl = import.meta.env.VITE_API_URL

const response = await fetch(`${apiUrl}/skills?category=frontend`)

if (!response.ok) {
  throw new Error('No fue posible cargar las skills')
}

const { data: skills, meta } = await response.json()
```

## Editar los datos

- Skills: `data/skills.json`
- Perfil, textos y categorías: `data/content.json`

La API lee estos archivos en cada petición. Durante el desarrollo puedes
modificarlos y recargar el frontend sin reconstruir la API.

## Configuración

Variables disponibles en `.env`:

```env
PORT=3001
HOST=0.0.0.0
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Para producción, agrega el dominio real del frontend a `ALLOWED_ORIGINS`.

## Verificación

```bash
npm run check
npm test
```

Esta primera versión es de solo lectura. Para recibir formularios o modificar
contenido desde Internet se debe agregar autenticación, validación, rate limit
y un proveedor de correo o una base de datos.
