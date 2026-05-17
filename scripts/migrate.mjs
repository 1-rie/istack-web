// Run: npm run db:migrate
// Requires .env.production — run `npx vercel env pull .env.production --environment=production` first

import pg from 'pg';

const url = process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL;
if (!url) {
  console.error('No POSTGRES_URL_NON_POOLING or POSTGRES_URL found');
  process.exit(1);
}

const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();

console.log('Running migration…');

await client.query(`
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
`);

await client.query(`CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(key)`);

await client.end();
console.log('✓ Table licenses ready');
process.exit(0);
