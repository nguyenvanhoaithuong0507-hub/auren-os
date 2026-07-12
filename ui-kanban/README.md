# ui-kanban — Joke generator (proxy + enhanced client)

This folder contains a small joke generator feature with:

- server: a tiny Express proxy that fetches jokes from public APIs (icanhazdadjoke, JokeAPI)
- client: a React component that calls `/api/joke`, keeps a local history, and lets users like jokes

Files added in this branch:
- server/index.ts — Express proxy (TypeScript)
- src/components/JokeGeneratorEnhanced.tsx — enhanced React component (history + like)
- src/components/joke-enhanced.css — styles for the component

Quick run (development)

1) Server
- Move to ui-kanban/server
- Install deps (from repo root or inside ui-kanban/server):
  npm install express cors

- Run server (Node 18+ supports global fetch):
  npx ts-node server/index.ts

The server listens on port 4000 by default and exposes: GET /api/joke

2) Client (Vite React app)
- If you already use Vite, add the component to your app and in dev mode add a proxy in vite.config.ts:

  // vite.config.ts
  export default defineConfig({
    server: { proxy: { '/api': 'http://localhost:4000' } },
    plugins: [react()]
  })

- Import the component: `import JokeGeneratorEnhanced from './components/JokeGeneratorEnhanced'`

Notes
- The server is a basic proxy to avoid CORS and to centralize upstream calls. You can deploy it as a small serverless function or part of your backend.
- LocalStorage keys: history and likes in `ui-kanban` are namespaced.

