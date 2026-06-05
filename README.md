This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Assessment Setup

**Prerequisites**

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- A PostgreSQL database and a `DATABASE_URL` connection string

**Local setup**

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file with your Postgres connection string:

```bash
# Example .env
DATABASE_URL=postgresql://user:password@localhost:5432/database
```

3. Generate Prisma client:

```bash
pnpm exec prisma generate
```

4. Apply database migrations (use `migrate deploy` to apply existing migrations non-interactively):

```bash
pnpm exec prisma migrate deploy
```

If you are actively developing and want to run migrations interactively, you can use:

```bash
pnpm exec prisma migrate dev
```

5. Start the development server:

```bash
pnpm dev
```

**Build / Production**

```bash
pnpm build
pnpm start
```

## Tests

This project includes unit tests for API routes and validation logic using Jest.

Run tests locally with:

```bash
pnpm exec jest --runInBand
```

You can also run Jest via npx:

```bash
npx jest --runInBand
```

## Notes

- Ensure `DATABASE_URL` is set before running the app or tests that hit the database.
- If you want sample data for demoing, consider adding a small seed script using Prisma.
- To lint the project:

```bash
pnpm exec eslint .
```
