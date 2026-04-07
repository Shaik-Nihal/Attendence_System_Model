# Apollo University Portal (Attendance System)

A role-based university attendance and student services portal built with React, TypeScript, Vite, and Tailwind CSS.

## Overview

This project provides the foundation for a multi-role academic portal for:
- Students
- Faculty
- Admins

Current implementation includes a complete login flow (mocked), protected routing, and a shared dashboard layout. Additional student-focused modules are scaffolded and ready for integration.

## Current Status

Implemented and working in development:
- Role selection and login UI
- Mock authentication with role-based user state
- Protected route guard
- Dashboard shell with sidebar and header
- Basic dashboard welcome screen

Scaffolded but not fully integrated into app routing:
- Student modules (announcements, fees, grievances, leave, outpass, profile, results)
- Additional sidebar routes

Build status note:
- The production build currently reports TypeScript/module issues in scaffolded student modules.
- The core login and dashboard flow runs in development.

## Tech Stack

- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- Zustand (state management)
- React Router
- React Query
- React Hook Form + Zod
- Framer Motion

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open the app in your browser:

   ```text
   http://localhost:5173
   ```

If port 5173 is busy, Vite automatically chooses the next available port.

## Demo Login

Use the login page with any of the built-in roles:
- Student
- Faculty
- Admin

Default mock credentials:
- Email: auto-filled based on selected role
- Password: password1

## Available Scripts

- Start dev server:

  ```bash
  npm run dev
  ```

- Build for production:

  ```bash
  npm run build
  ```

- Preview production build:

  ```bash
  npm run preview
  ```

- Run lint checks:

  ```bash
  npm run lint
  ```

## Project Structure

```text
src/
  components/
    auth/
    layout/
    student/
    ui/
  pages/
  store/
  stores/
  types/
  lib/
```

Notes:
- `src/store/authStore.ts` powers the current login and route protection flow.
- `src/stores/authStore.ts` exists as an alternate persisted store implementation.

## Troubleshooting

### Linux: ENOSPC file watcher limit

If you see an error like:
- `ENOSPC: System limit for number of file watchers reached`

Run dev server in polling mode:

```bash
CHOKIDAR_USEPOLLING=true CHOKIDAR_INTERVAL=1000 npm run dev -- --host 0.0.0.0 --port 5173
```

### Dependency install corruption

If Vite fails resolving a package entry (for example `react-hook-form`), reinstall cleanly:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Production build errors in scaffolded modules

Current scaffolded student modules expect:
- Path alias support for imports starting with `@/`
- Extra packages such as `@tremor/react` and `tailwind-merge`

To make `npm run build` pass, align aliases in TypeScript/Vite and install all required packages used by scaffolded files.

## Roadmap

- Complete role-based route coverage
- Connect scaffolded modules to backend APIs
- Add attendance analytics and reports
- Add test suite (unit/integration)
- Harden auth/token flow for production

## License

No license file is currently defined in this repository.
