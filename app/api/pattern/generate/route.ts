import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Proxy POST /api/pattern/generate to FastAPI service.
 * Forwards the JSON body and Authorization header.
 */
export async function POST(request: Request) {
  const heads = await headers();
  const authorization = heads.get('authorization');

  const fastapiBase = process.env.FASTAPI_URL ?? 'http://localhost:8000';
  const fastapiEndpoint = `${fastapiBase.replace(/\/*$/, '')}/api/v1/pattern/generate`;

  if (!authorization) {
    return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 });
  }

  const token = authorization.replace('Bearer ', '');
  const body = await request.json();

  const fastapiRes = await fetch(fastapiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!fastapiRes.ok) {
    const errorText = await fastapiRes.text();
    return new NextResponse(errorText, { status: fastapiRes.status });
  }

  const data = await fastapiRes.json();
  return NextResponse.json(data, { status: fastapiRes.status });
}
