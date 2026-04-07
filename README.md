# Learnfinity

Learnfinity is a monorepo with a React web app and a PocketBase backend.

## Apps

- `apps/web`: Vite + React frontend
- `apps/mobile`: Expo + React Native learner app
- `apps/pocketbase`: PocketBase app, migrations, and hooks

## Getting started

```bash
npm install
npm run dev
```

This starts the frontend and PocketBase together from the workspace root.

To run the mobile app:

```bash
npm install
npm run dev:mobile
```

Create `apps/mobile/.env` from `apps/mobile/.env.example` and point `EXPO_PUBLIC_POCKETBASE_URL` at your PocketBase instance.

## Useful scripts

```bash
npm run dev
npm run build
npm run lint
npm run start
npm run dev:mobile
```
