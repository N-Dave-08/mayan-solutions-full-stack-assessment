# Mayan Solutions — Full Stack Assessment

Opinionated README with clear setup, dependency, and run instructions for this Next.js + Prisma assessment project.

## Requirements

- Node.js v18 or newer
- pnpm (recommended) — npm or yarn will also work
- PostgreSQL (or a compatible PG server) and a `DATABASE_URL` connection string

## Dependencies

Runtime dependencies (from `package.json`):

- `next` — 16.2.7
- `react` — 19.2.4
- `react-dom` — 19.2.4
- `@prisma/client` — ^7.8.0
- `@prisma/adapter-pg` — ^7.8.0
- `pg` — ^8.21.0
- `@tanstack/react-query` — ^5.101.0
- `lucide-react` — ^1.3.0
- `zod` — ^4.4.3
- `zustand` — ^5.0.14

Dev dependencies (from `package.json`):

- `prisma` — ^7.8.0
- `typescript` — ^5
- `eslint` — ^9
- `eslint-config-next` — 16.2.7
- `jest` — ^30.4.2
- `ts-jest` — ^29.4.11
- `@types/node` — ^20
- `@types/react` — ^19
- `@types/react-dom` — ^19
- `husky` — ^9.1.7
- `tailwindcss` — ^4
- `daisyui` — ^5.5.20
- `dotenv` — ^17.4.2

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

## Docker

- Run a Postgres container for local development (placeholders used for credentials):

```bash
docker run -d --name mayan-postgres \
	-e POSTGRES_PASSWORD=your_db_password \
	-e POSTGRES_USER=your_db_user \
	-e POSTGRES_DB=your_db_name \
	-p 5432:5432 postgres:latest
```

- Example `docker-compose.yml` for Postgres (optional):

```yaml
version: "3.8"
services:
  db:
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_USER: your_db_user
      POSTGRES_PASSWORD: your_db_password
      POSTGRES_DB: your_db_name
    ports:
      - 5432:5432
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

- Notes:
  - Ensure `DATABASE_URL` in your `.env` matches the container placeholders (replace with real values before running).
  - I can add a `Dockerfile` and `docker-compose.yml` for fully containerized app + DB if you'd like.
