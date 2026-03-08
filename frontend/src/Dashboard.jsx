import { useMemo, useState } from 'react';

const dms = [
  { id: 'u-01', name: 'Laura Ops', online: true },
  { id: 'u-02', name: 'Miguel Infra', online: false },
  { id: 'u-03', name: 'Sara Product', online: true },
];

const channels = ['#General-Chat', '#Voice-Lobby', '#Media-Share', '#Dev-Talk'];

const directory = [
  { id: 'sv-1', name: 'Freelance Network', members: 1430 },
  { id: 'sv-2', name: 'Global CTO Circle', members: 804 },
  { id: 'sv-3', name: 'Nex Builders', members: 2140 },
];

const serverIcons = ['NX', 'AI', 'DEV', 'OPS'];

export default function Dashboard() {
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  const [unread, setUnread] = useState(6);
  const [ghostMode, setGhostMode] = useState(false);

  const stats = useMemo(
    () => ({ activeServers: 12, onlineFriends: dms.filter((u) => u.online).length, globalUsers: 28452 }),
    []
  );

  return (
    <main className="min-h-screen p-3 sm:p-5 lg:p-6">
      <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-3 md:grid-cols-[82px_1fr] xl:grid-cols-[82px_1.2fr_0.9fr]">
        <aside className="rounded-2xl border border-neon-border bg-neon-panel/90 p-3 shadow-glow backdrop-blur">
          <nav className="flex h-full flex-col items-center justify-between gap-4">
            <div className="flex flex-col items-center gap-3 text-xl">
              {['🏠', '🗂️', '🔎', '⚙️'].map((item) => (
                <button key={item} className="h-11 w-11 rounded-xl border border-neon-border bg-[#12233a] hover:border-neon-cyan">
                  {item}
                </button>
              ))}
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <img className="h-11 w-11 rounded-full border-2 border-neon-green object-cover" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHFvNHBobzVxanQ4a2c3dnQ2MHFmNG95ODI0NXQ5OHM3M3JrdzYxbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/9J7tdYltWyXIY/giphy.gif" alt="Avatar GIF" />
              <span className="text-xs text-neon-green">Ghost {ghostMode ? 'ON' : 'OFF'}</span>
            </div>
          </nav>
        </aside>

        <section className="grid grid-cols-1 gap-3 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-2xl border border-neon-border bg-neon-panel/90 p-4 shadow-glow">
            <header className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-[0.2em] text-neon-cyan">ACTIVE DIRECT MESSAGES</h2>
              <button className="rounded-lg border border-neon-border px-3 py-1 text-xs">Nueva DM</button>
            </header>
            <ul className="space-y-2">
              {dms.map((dm) => (
                <li key={dm.id} className="flex items-center justify-between rounded-xl border border-neon-border bg-[#0a1423] p-3">
                  <div className="flex items-center gap-3">
                    <span className="relative inline-block h-9 w-9 rounded-full bg-slate-600">
                      <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0a1423] ${dm.online ? 'bg-neon-green' : 'bg-slate-500'}`} />
                    </span>
                    <div>
                      <p className="text-sm">{dm.name}</p>
                      <p className="text-xs text-slate-400">{dm.online ? 'En línea' : 'Desconectado'}</p>
                    </div>
                  </div>
                  <button className="text-xs text-neon-cyan">Abrir</button>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-neon-border bg-neon-panel/90 p-4 shadow-glow">
            <header className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-[0.2em] text-neon-green">SERVER DIRECTORY</h2>
              <button className="rounded-lg border border-neon-border px-3 py-1 text-xs">+ Crear/Unirse</button>
            </header>
            <ul className="space-y-2">
              {directory.map((server) => (
                <li key={server.id} className="rounded-xl border border-neon-border bg-[#0a1423] p-3">
                  <p className="text-sm">{server.name}</p>
                  <p className="text-xs text-slate-400">{server.members.toLocaleString('es-ES')} miembros</p>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <aside className="rounded-2xl border border-neon-border bg-neon-panel/90 p-4 shadow-glow xl:block">
          <header className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-[0.15em] text-neon-cyan">COMUNICACIÓN EN VIVO</h3>
            <button
              className="relative rounded-lg border border-neon-border px-3 py-1 text-sm"
              onClick={() => setUnread(0)}
            >
              🔔 {unread > 0 && <span className="ml-1 rounded bg-red-500 px-1 text-xs">{unread}</span>}
            </button>
          </header>

          <div className="mb-3 flex flex-wrap gap-2">
            {serverIcons.map((icon) => (
              <button key={icon} className="h-10 w-10 rounded-xl border border-neon-border bg-[#112136] text-xs">
                {icon}
              </button>
            ))}
            <button className="h-10 w-10 rounded-xl border border-dashed border-neon-green text-neon-green">+</button>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
            <button className="rounded-lg border border-neon-border bg-[#12233a] p-2">Llamada de voz</button>
            <button className="rounded-lg border border-neon-border bg-[#12233a] p-2">Compartir pantalla</button>
          </div>

          <ul className="mb-3 grid grid-cols-2 gap-2 text-xs">
            {channels.map((channel) => (
              <li key={channel}>
                <button
                  onClick={() => setActiveChannel(channel)}
                  className={`w-full rounded-lg border p-2 ${activeChannel === channel ? 'border-neon-cyan bg-[#173454]' : 'border-neon-border bg-[#0b1626]'}`}
                >
                  {channel}
                </button>
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-neon-border bg-[#091120] p-3">
            <p className="mb-2 text-xs text-slate-400">Canal activo: {activeChannel}</p>
            <div className="mb-2 h-36 rounded-lg border border-neon-border bg-[#050c18] p-2 text-sm text-slate-300">
              <p><strong>Laura Ops:</strong> Revisión del despliegue completada ✅</p>
            </div>
            <input
              className="w-full rounded-lg border border-neon-border bg-[#102038] p-2 text-sm outline-none placeholder:text-slate-400"
              placeholder="Activa a message..."
            />
          </div>

          <label className="mt-3 flex items-center gap-2 text-xs text-slate-300">
            <input type="checkbox" checked={ghostMode} onChange={(e) => setGhostMode(e.target.checked)} />
            Activar Ghost Mode (oculta typing/seen)
          </label>
        </aside>
      </section>

      <footer className="mx-auto mt-3 flex max-w-[1600px] flex-wrap gap-4 rounded-2xl border border-neon-border bg-neon-panel/90 px-4 py-3 text-xs tracking-wide text-neon-cyan">
        <span>ACTIVE SERVERS: {stats.activeServers}</span>
        <span>ONLINE FRIENDS: {stats.onlineFriends}</span>
        <span>GLOBAL USERS: {stats.globalUsers.toLocaleString('es-ES')}</span>
      </footer>
    </main>
  );
}
