# Modern Next.js Starter

This is a modern Next.js starter template, using the latest Next.js features, community favorite packages, and best practices.
You can use this template to quickly get started with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app):

```bash
pnpm dlx create-next-app -e https://github.com/winstonpurnomo/next-starter
```

## Features

- Next.js 15 with App Router
- Authentication with [Better Auth](https://better-auth.com)
  - Own your entire authentication flow that lives on your database
  - Built-in implementations for email and password, OAuth, SSO and more
  - Open-source and free to use
- Database with [Drizzle ORM](https://orm.drizzle.team)
  - Performant, type-safe ORM
  - Drizzle Studio for managing your database
- Styling with [Tailwind CSS](https://tailwindcss.com) and [Shadcn UI](https://ui.shadcn.com)
  - Tailwind CSS allows you to write custom CSS in-line with your components, so you don't have to context switch between TSX and CSS
  - Shadcn UI is a starter kit for building your own component library
- Form handling with [TanStack React Form](https://tanstack.com/form) and [Valibot](https://valibot.dev)
  - Composable, type-safe form handling with Standard Schema validation
  - Write less boilerplate
- Linting and formatting with [Ultracite](https://ultracite.ai) and [Biome](https://biome.dev)
  - Biome is a modern, performant TypeScript linter and formatter written in Rust
  - Ultracite is a zero-config Biome preset to get Biome running quickly with no-nonsense defaults
- Testing with [Vitest](https://vitest.dev) and Browser Mode.
  - Super-fast, Jest-compatible testing with hot reloading for tests
  - Browser mode lets you run tests in a browser environment and see your components in action
- Modular, type-safe backend with [oRPC](https://orpc.unnoq.com)
  - Easy-to-use, end-to-end type-safety for your backend
  - Modularity that makes it easy to change server frameworks if necessary, with built-in support for Next.js, Express, H3, Hono, Fastify, and more

## Getting Started

After running `create-next-app`, create the `.env` file:

```bash
cp .env.example .env
```

Then, run the migrations:

```bash
pnpm db:push
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also run the tests:

```bash
pnpm run test:browser
```

## Project Structure

```
next-starter/
├── README.md
|── src/
|   ├── app/                    # Next.js App Router pages
|   |   ├── api/                # API routes -- Auth and oRPC
|   |   ├── app/                # Authenticated routes
|   |   ├── login/              # Login page
|   |   ├── register/           # Register page
|   |   ├── page.tsx            # Landing page
|   |   ├── layout.tsx          # Layout wrapper
|   |   ├── providers.tsx       # Providers for all pages
|   ├── components/             # Reusable components
|   |   ├── ui/                 # shadcn/ui components
|   ├── db/                     # Database schema and config
|   ├── hooks/                  # Custom React hooks
|   ├── lib/                    # Client-side utilities
|   |── models/                 # Valibot models
|   |── rpc/                    # oRPC implementations
|   ├── server/                 # Server-side utilities
|   ├── test/                   # Testing utilities
|── .env.example                # Environment variables
|── .gitignore                  # gitignore
|── biome.jsonc                 # Biome configuration
├── components.json             # Shadcn UI configuration
├── drizzle.config.ts           # Drizzle configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.json         # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── vitest.config.mts           # Vitest configuration
```

To customize the authentication flow, you can modify the `src/server/auth.ts` file, and its corresponding client caller in `src/lib/auth.ts`. Then, run `pnpm run auth:generate` to regenerate the database models.

## Extending the starter

Everything included in this starter is free, open-source software only. That said, it is not everything you need to build a production-ready app.

- Logging: [Sentry](https://sentry.io) is my personal recommendation for tracking errors in production
- Analytics: [PostHog](https://posthog.com) is my go-to for analytics
- Deployment: [Vercel](https://vercel.com) is probably the easiest way to host a Next.js app
