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

## ¿Cómo uso la web? (sin Node.js)

No necesitas instalar Node en tu PC para publicar y abrir la web.

### Paso 1) Subir este proyecto a GitHub

Si todavía no lo subiste, usa estos comandos (cambia `TU_USUARIO` y `TU_REPO`):

```bash
git init
git add .
git commit -m "NexOnline inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### Paso 2) Activar GitHub Pages

1. Entra a tu repositorio en GitHub.
2. Ve a **Settings → Pages**.
3. En **Build and deployment**, selecciona **GitHub Actions**.
4. Haz un push a `main` (o ejecuta el workflow manualmente).

El workflow ya está creado en:

- `.github/workflows/deploy-frontend-pages.yml`

### Paso 3) Abrir tu web publicada

Cuando termine el workflow, tu URL será:

- `https://TU_USUARIO.github.io/TU_REPO/`

---

## ¿Y cómo la publico con chat real (backend)?

GitHub Pages solo publica frontend estático. Para tener DMs/chat/llamadas en tiempo real debes desplegar `backend/server.js` en un hosting Node (Render, Railway, Fly.io o VPS).

### Despliegue rápido sugerido del backend (Render)

1. Crea una cuenta en Render.
2. **New + → Web Service**.
3. Conecta este repositorio.
4. Configura:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Variables de entorno:
   - `PORT=4000`
   - `CLIENT_ORIGIN=https://TU_USUARIO.github.io`
6. Deploy.

Te dará una URL tipo:

- `https://nexonline-backend.onrender.com`

Luego el frontend debe apuntar a esa URL para sockets/API.

---

## ¿Cómo uso la web localmente (si algún día instalas Node)?

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

## Problemas comunes

- **No aparece la web en GitHub Pages**: revisa la pestaña **Actions** y confirma que el job terminó en verde.
- **Pantalla en blanco**: confirma que la URL termina con `/TU_REPO/` y que el build terminó bien.
- **No funciona chat en producción**: faltó desplegar backend o `CLIENT_ORIGIN` está mal configurado.

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
