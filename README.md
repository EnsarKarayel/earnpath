# EarnPath

EarnPath is a global web and mobile platform that gives people a practical 30-day route to income. A user shares their city, language, education, device access, time budget and strengths; EarnPath ranks realistic work paths, builds a plan, and prepares application assets.

The repository contains both the original static prototype and the production monorepo foundation.

## Product Promise

Your 30-day route to income.

## Stack

- Web: Next.js
- Mobile: Expo / React Native for iOS and Android
- Database: Supabase / Postgres
- Auth and storage: Supabase
- Shared route engine: `packages/core`
- Translations: `packages/i18n`
- Deployment: Vercel + Supabase + Expo EAS

## Repository Layout

```text
apps/web        Next.js web app
apps/mobile     Expo iOS/Android app
packages/core   Shared scoring and plan engine
packages/i18n   Locale registry and translation files
packages/db     Supabase client and database types
supabase        Postgres migrations and setup notes
docs            Product, architecture and launch documentation
```

## Current State

- Static prototype exists in the repository root.
- Production web app scaffold exists in `apps/web`.
- Production mobile app scaffold exists in `apps/mobile`.
- Shared route engine exists in `packages/core`.
- Supabase schema and RLS policies exist in `supabase/migrations`.
- Starter locales exist for Turkish, English, Arabic, German, Spanish, French, Russian, Portuguese and Hindi.

## Next Step

Create the remote services, then connect the app:

1. Supabase project
2. Vercel project for `apps/web`
3. Expo project for `apps/mobile`
4. Stripe or iyzico payment account
5. Apple Developer and Google Play accounts when store builds are ready

See [docs/NEXT_ACTIONS.md](docs/NEXT_ACTIONS.md) and [docs/REMOTE_SETUP.md](docs/REMOTE_SETUP.md).
