<INSTRUCTIONS>
You are working in `d:\image-editor-clone`, a Next.js (App Router) + React + TypeScript project styled with Tailwind CSS and shadcn/ui components.

## Quick start
- Install deps: `pnpm install`
- Run dev: `pnpm dev`
- Lint: `pnpm lint`
- Build/start: `pnpm build` then `pnpm start`

## Project structure
- `app/`: Next.js routes/layout and global styles.
- `components/`: page sections and `components/ui/` shadcn-style primitives.
- `hooks/`: reusable React hooks.
- `lib/`: small shared utilities.
- `public/`: static assets.
- `styles/`: additional CSS if needed.

## Conventions
- Prefer existing `components/ui/*` primitives and Tailwind utility classes over new bespoke components.
- Keep UI components presentational; put reusable logic in `hooks/` or `lib/`.
- Use path alias `@/*` (configured in `tsconfig.json`) for imports.
- Avoid introducing new libraries unless necessary; match existing patterns.

## Notes
- `next.config.mjs` currently ignores TypeScript build errors; keep TypeScript types clean anyway.
</INSTRUCTIONS>
