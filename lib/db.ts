import { sql } from '@vercel/postgres';

export type License = {
  id: number;
  key: string;
  email: string;
  plan: string;
  key_half: string;
  valid_until: string;
  created_at: string;
  revoked: boolean;
};

export async function findLicense(key: string): Promise<License | null> {
  const { rows } = await sql<License>`
    SELECT * FROM licenses
    WHERE key = ${key}
      AND revoked = false
      AND valid_until >= CURRENT_DATE
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function createLicense(params: {
  key: string;
  email: string;
  plan: string;
  validDays: number;
}): Promise<License> {
  const keyHalf = process.env.LICENSE_KEY_HALF!;
  const { rows } = await sql<License>`
    INSERT INTO licenses (key, email, plan, key_half, valid_until)
    VALUES (
      ${params.key},
      ${params.email},
      ${params.plan},
      ${keyHalf},
      CURRENT_DATE + INTERVAL '1 day' * ${params.validDays}
    )
    RETURNING *
  `;
  return rows[0]!;
}

export async function revokeLicense(key: string): Promise<void> {
  await sql`UPDATE licenses SET revoked = true WHERE key = ${key}`;
}

// Run once to create the table — call via: npm run db:migrate
export async function migrate(): Promise<void> {
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
}
