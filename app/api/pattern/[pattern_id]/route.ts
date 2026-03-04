import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Proxy GET /api/pattern/{pattern_id} to FastAPI service.
 * Forwards the Authorization header and returns the stub response.
 */
export async function GET(request: Request) {
  const heads = await headers();
  const authorization = heads.get('authorization');

  const fastapiBase = process.env.FASTAPI_URL ?? 'http://localhost:8000';
  // Extract pattern_id from the URL path.
  const { pathname } = new URL(request.url);
  const parts = pathname.split('/');
  const patternId = parts[parts.length - 1];

  const fastapiEndpoint = `${fastapiBase.replace(/\/*$/, '')}/api/v1/pattern/${patternId}`;

  if (!authorization) {
    return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 });
  }

  const token = authorization.replace('Bearer ', '');

  const fastapiRes = await fetch(fastapiEndpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      accept: 'application/json',
    },
  });

  if (!fastapiRes.ok) {
    const errorText = await fastapiRes.text();
    return new NextResponse(errorText, { status: fastapiRes.status });
  }

  const data = await fastapiRes.json();
  return NextResponse.json(data, { status: fastapiRes.status });
}
