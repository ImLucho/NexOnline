const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

const state = {
  users: new Map(),
  channels: {
    'general-chat': [],
    'voice-lobby': [],
    'media-share': [],
    'dev-talk': [],
  },
  dms: new Map(),
  servers: [
    { id: 'nex-core', name: 'Nex Core', members: 42 },
    { id: 'pro-devs', name: 'Pro Devs', members: 180 },
  ],
};

const getDMKey = (a, b) => [a, b].sort().join(':');

app.get('/api/stats', (_req, res) => {
  const onlineFriends = [...state.users.values()].filter((u) => u.online).length;
  const activeServers = state.servers.length;
  const globalUsers = Math.max(onlineFriends * 3, 128);

  res.json({ activeServers, onlineFriends, globalUsers });
});

app.get('/api/servers', (_req, res) => {
  res.json(state.servers);
});

app.post('/api/servers', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Nombre del servidor requerido' });

  const serverRecord = {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    members: 1,
  };

  state.servers.push(serverRecord);
  io.emit('server:created', serverRecord);
  return res.status(201).json(serverRecord);
});

io.on('connection', (socket) => {
  socket.on('user:join', ({ userId, username, avatar, ghostMode = false }) => {
    state.users.set(userId, {
      id: userId,
      username,
      avatar,
      ghostMode,
      online: true,
      socketId: socket.id,
    });

    socket.broadcast.emit('presence:update', { userId, online: true });
    io.emit('stats:refresh');
  });

  socket.on('user:ghost-mode', ({ userId, ghostMode }) => {
    const user = state.users.get(userId);
    if (!user) return;
    user.ghostMode = !!ghostMode;
    io.emit('user:ghost-mode', { userId, ghostMode: user.ghostMode });
  });

  socket.on('channel:join', (channel) => {
    socket.join(channel);
  });

  socket.on('message:channel', ({ channel, userId, username, body }) => {
    const message = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      channel,
      userId,
      username,
      body,
      createdAt: new Date().toISOString(),
    };

    state.channels[channel] = state.channels[channel] || [];
    state.channels[channel].push(message);
    io.to(channel).emit('message:channel', message);
    io.emit('notification:unread', { type: 'channel', channel });
  });

  socket.on('message:dm', ({ from, to, body }) => {
    const key = getDMKey(from, to);
    const message = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      from,
      to,
      body,
      createdAt: new Date().toISOString(),
      seen: false,
      typingVisible: !(state.users.get(from)?.ghostMode),
    };

    const dmList = state.dms.get(key) || [];
    dmList.push(message);
    state.dms.set(key, dmList);

    io.emit('message:dm', message);
    io.emit('notification:unread', { type: 'dm', from, to });
  });

  socket.on('call:signal', ({ to, from, signal, shareScreen = false }) => {
    io.emit('call:signal', { to, from, signal, shareScreen });
  });

  socket.on('typing', ({ from, to, channel }) => {
    const user = state.users.get(from);
    if (!user || user.ghostMode) return;
    io.emit('typing', { from, to, channel });
  });

  socket.on('disconnect', () => {
    const userEntry = [...state.users.entries()].find(([, user]) => user.socketId === socket.id);
    if (!userEntry) return;

    const [userId, user] = userEntry;
    user.online = false;
    io.emit('presence:update', { userId, online: false });
    io.emit('stats:refresh');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`NexOnline API escuchando en puerto ${PORT}`);
});
