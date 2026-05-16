import { customAlphabet } from 'nanoid';

// ISTACK-A3B2-XY91-4KLP — readable, unambiguous chars
const alpha = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 4);

export function generateLicenseKey(): string {
  return `ISTACK-${alpha()}-${alpha()}-${alpha()}`;
}
