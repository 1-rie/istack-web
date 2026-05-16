import { NextRequest, NextResponse } from 'next/server';
import { createLicense, revokeLicense } from '@/lib/db';
import { generateLicenseKey } from '@/lib/keygen';

// POST /api/v1/license/create
// Header: Authorization: Bearer <ADMIN_SECRET>
// Body: { email, plan?, validDays? }
//
// POST /api/v1/license/create  { action: "revoke", key: "ISTACK-..." }

function isAdmin(req: NextRequest): boolean {
  const auth = req.headers.get('authorization') ?? '';
  return auth === `Bearer ${process.env.ADMIN_SECRET}`;
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as {
    action?: 'create' | 'revoke';
    email?: string;
    plan?: string;
    validDays?: number;
    key?: string;
  };

  try {
    // Revoke
    if (body.action === 'revoke') {
      if (!body.key) return NextResponse.json({ error: 'Missing key' }, { status: 400 });
      await revokeLicense(body.key);
      return NextResponse.json({ revoked: true, key: body.key });
    }

    // Create (default action)
    if (!body.email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const license = await createLicense({
      key:       generateLicenseKey(),
      email:     body.email,
      plan:      body.plan ?? 'pro',
      validDays: body.validDays ?? 365,
    });

    return NextResponse.json({
      key:         license.key,
      email:       license.email,
      plan:        license.plan,
      valid_until: license.valid_until,
    }, { status: 201 });

  } catch (err) {
    console.error('License create error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
