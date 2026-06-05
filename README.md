# Mayan Solutions — Full Stack Assessment

Opinionated README with clear setup, dependency, and run instructions for this Next.js + Prisma assessment project.

## Requirements

- Node.js v18 or newer
- pnpm (recommended) — npm or yarn will also work
- PostgreSQL (or a compatible PG server) and a `DATABASE_URL` connection string

## Quick start

1. Clone the repo and change directory:

```bash
git clone <repo-url>
cd mayan-solutions-full-stack-assessment
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the project root with your Postgres connection string:

```env
# Example .env
DATABASE_URL=postgresql://user:password@localhost:5432/database
```

4. Generate the Prisma client and apply migrations:

```bash
pnpm exec prisma generate
pnpm exec prisma migrate deploy
```

Notes:

- Use `pnpm exec prisma migrate dev` while actively developing to run migrations and update the shadow DB.
- If you need seed data, add a seed script and run it after migrations.

## Run the app

- Development (hot-reload):

```bash
pnpm dev
```

- Build for production:

```bash
pnpm build
pnpm start
```

Open http://localhost:3000 in your browser during development.

## Tests

This repository uses Jest for unit tests (API routes and validation logic).

Run tests locally:

```bash
pnpm exec jest --runInBand
```

## Linting & formatting

- Lint the project:

```bash
pnpm exec eslint .
```

Husky and lint-staged are configured to run on commits if set up.

## Useful scripts

- `pnpm dev` — run Next.js in development mode
- `pnpm build` — create a production build
- `pnpm start` — start the production server
- `pnpm exec prisma generate` — (re)generate Prisma client
- `pnpm exec prisma migrate deploy` — apply migrations

(See `package.json` for the authoritative script list.)

## Environment variables

- `DATABASE_URL` — Postgres connection string used by Prisma

Add other environment values as needed for external integrations.

## Troubleshooting

- If Prisma commands fail, ensure `DATABASE_URL` is correct and Postgres is running.
- If TypeScript/build errors occur after changing Prisma schema, run `pnpm exec prisma generate`.

## Contributing

If you make changes, please run lint and tests before opening a PR:

```bash
pnpm exec eslint .
pnpm exec jest --runInBand
```

---

If you want, I can also add a small `pnpm` script for running tests (`test`) and one for generating/migrating the DB (`db:setup`). Would you like me to add those to `package.json` now?
