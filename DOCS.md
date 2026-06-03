# Task Management Application - Project Setup Guide

## Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- DaisyUI
- Zustand (planned)

### Backend

- Next.js Route Handlers (REST API)

### Database

- PostgreSQL

### ORM

- Prisma

### Testing

- Jest (planned)

---

# 1. Create Next.js Project

Create a new Next.js application:

```bash
npx create-next-app@latest mayan-solutions-full-stack-assessment
```

Recommended options:

```text
✔ TypeScript
✔ ESLint
✔ Tailwind CSS
✔ App Router
✔ src directory
✔ Import alias (@/*)
```

Navigate into the project:

```bash
cd mayan-solutions-full-stack-assessment
```

---

# 2. Install Required Dependencies

Install Prisma and PostgreSQL packages:

```bash
pnpm add @prisma/client
pnpm add -D prisma
```

Additional packages:

```bash
pnpm add lucide-react
pnpm add daisyui
```

---

# 3. Run PostgreSQL Using Docker

Start PostgreSQL in Docker:

```bash
docker run -d --name mayan-postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_USER=postgres -e POSTGRES_DB=course_db -p 5432:5432 postgres:latest
```

Verify the container is running:

```bash
docker ps
```

Expected output:

```text
CONTAINER ID   IMAGE             STATUS
8761e1729ce1   postgres:latest   Up ...
```

---

# 4. Create Environment Variables

Create:

```text
.env
```

Add:

```env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/course_db"
```

---

# 5. Initialize Prisma

Initialize Prisma:

```bash
npx prisma init
```

This creates:

```text
prisma/
  schema.prisma
```

---

# 6. Configure Prisma Schema

Update:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

enum TaskStatus {
  active
  inactive
}

model Task {
  id          String     @id @default(uuid())
  title       String
  description String?
  status      TaskStatus @default(active)
  isCompleted Boolean    @default(false)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

---

# 7. Create Migration

Generate migration:

```bash
npx prisma migrate dev --name init
```

This creates:

```text
prisma/
└── migrations/
    └── 20260603124953_init/
        └── migration.sql
```

---

# 8. Generate Prisma Client

Generate Prisma Client:

```bash
npx prisma generate
```

---

# 9. Verify Database

Open Prisma Studio:

```bash
npx prisma studio
```

Prisma Studio runs at:

```text
http://localhost:5555
```

---

# 10. Create Prisma Singleton

Create:

```text
src/lib/prisma.ts
```

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
```

---

# 11. Create Tasks API

Create:

```text
src/app/api/tasks/route.ts
```

### GET Tasks

```ts
export async function GET() {
  const tasks = await db.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(tasks);
}
```

### POST Task

```ts
export async function POST(request: Request) {
  const body = await request.json();

  const task = await db.task.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return Response.json(task);
}
```

---

# 12. Test API

Start development server:

```bash
pnpm dev
```

Read Tasks:

```http
GET http://localhost:3000/api/tasks
```

Create Task:

```http
POST http://localhost:3000/api/tasks
Content-Type: application/json

{
  "title": "Build API",
  "description": "Implement GET and POST endpoints"
}
```

Update Task:

```http
PATCH http://localhost:3000/api/tasks/[id]
Content-Type: application/json

{
  "title": "Update TITLE",
  "description": "Implement GET and POST endpoints",
  "isCompleted": true
}
```

Delete Task:

```http
DELETE http://localhost:3000/api/tasks/[id]

```

---

# 13. Current UI Progress

Implemented:

- Task list UI
- DaisyUI tabs
- Active filter
- Inactive filter
- Completed filter
- Task card layout
- Lucide icons

Current task data is mocked locally inside:

```text
src/app/page.tsx
```

---

# Next Steps

## Backend

- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/[id]
- DELETE /api/tasks/[id]
- Toggle Complete API

## Frontend

- Create Task Modal
- Edit Task Modal
- Delete Confirmation
- Fetch API Integration
- Zustand Store

## Testing

- Jest Setup
- API Tests
- Store Tests

## Documentation

- Installation Guide
- API Documentation
- Swagger Integration
- Deployment Instructions
