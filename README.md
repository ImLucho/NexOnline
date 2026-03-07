# NexOnline Sovereign (Versión Comunicación Total)

Plataforma de comunicación profesional con estética futurista y paneles neon.

## Estructura del proyecto

```txt
NexOnline/
├── .github/
│   └── workflows/
│       └── deploy-frontend-pages.yml
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── Dashboard.jsx
│       ├── main.jsx
│       └── styles.css
└── README.md
```

---

## No tengo Node.js: ¿cómo lo uso igual?

Sí puedes usarlo sin instalar Node.js en tu computadora.

### Opción A (recomendada): publicar el frontend con GitHub Pages

> Esta opción NO requiere Node local. GitHub Actions compila por ti en la nube.

1. Crea un repositorio en GitHub y sube este proyecto.
2. Asegúrate de usar la rama `main`.
3. En GitHub entra a **Settings → Pages**.
4. En **Build and deployment**, elige **GitHub Actions**.
5. Haz push a `main`.
6. Espera a que termine el workflow `Deploy Frontend to GitHub Pages`.
7. Tu web quedará en:
   - `https://TU_USUARIO.github.io/TU_REPO/`

El workflow ya está incluido en:
- `.github/workflows/deploy-frontend-pages.yml`

### Opción B: ver/editar sin instalar nada

- Editar online: `https://github.dev/TU_USUARIO/TU_REPO`
- También puedes usar GitHub Codespaces (entorno cloud con Node preinstalado).

---

## Importante sobre backend

GitHub Pages solo sirve frontend estático.

Para tener chat/DMs/llamadas en tiempo real, debes desplegar `backend/server.js` en un servicio Node (por ejemplo: Render, Railway, Fly.io, VPS).

Variables recomendadas para backend en producción:

- `PORT=4000`
- `CLIENT_ORIGIN=https://TU_USUARIO.github.io`

---

## Si SÍ tienes Node.js (uso local)

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Funciones implementadas

- Inbox de DMs con estado en línea.
- Directorio de servidores con botón para crear/unirse.
- Canales en vivo y campo `Activa a message...`.
- Lógica de notificaciones no leídas.
- Señalización base para llamadas/compartir pantalla vía Socket.io.
- Modo Ghost para ocultar eventos de typing/seen.
- Barra inferior de estadísticas globales.
- UI responsive con Tailwind (desktop a mobile).
