import { NextRequest, NextResponse } from 'next/server';
import { findLicense } from '@/lib/db';

// GET /api/v1/license/validate?key=ISTACK-XXXX-YYYY-ZZZZ
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');

  if (!key) {
    return NextResponse.json(
      { valid: false, error: 'Missing license key' },
      { status: 400 }
    );
  }

  try {
    const license = await findLicense(key);

    if (!license) {
      return NextResponse.json(
        { valid: false, error: 'License not found or expired' },
        { status: 200 } // 200 so CLI can read the JSON body
      );
    }

    return NextResponse.json({
      valid:       true,
      email:       license.email,
      plan:        license.plan,
      valid_until: license.valid_until,
      key_half:    license.key_half,
    });
  } catch (err) {
    console.error('License validate error:', err);
    return NextResponse.json(
      { valid: false, error: 'Server error — please try again' },
      { status: 500 }
    );
  }
}
