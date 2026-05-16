// Run: npm run db:migrate
// Requires POSTGRES_URL in .env.local (copied from Vercel dashboard)
import { config } from 'dotenv';
config({ path: '.env.local' });

const { sql } = await import('@vercel/postgres');

console.log('Running migration…');

await sql`
  CREATE TABLE IF NOT EXISTS licenses (
    id          SERIAL PRIMARY KEY,
    key         TEXT UNIQUE NOT NULL,
    email       TEXT NOT NULL,
    plan        TEXT NOT NULL DEFAULT 'pro',
    key_half    TEXT NOT NULL,
    valid_until DATE NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked     BOOLEAN NOT NULL DEFAULT FALSE
  )
`;

await sql`CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(key)`;

console.log('✓ Table licenses ready');
process.exit(0);
