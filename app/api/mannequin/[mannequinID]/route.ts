import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ mannequinID: string }> }
) {
  const supabaseCookie = createClient(cookies());
  const {
    data: { session: cookieSession }
  } = await supabaseCookie.auth.getSession();

  const token = cookieSession?.access_token;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Await the params promise to get the mannequinID
  const { mannequinID } = await params;

  const fastapiBase = process.env.FASTAPI_URL ?? 'http://localhost:8000';
  const fastapiEndpoint = `${fastapiBase.replace(/\/*$/, '')}/api/v1/mannequin/${mannequinID}`;

  const fastapiRes = await fetch(fastapiEndpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!fastapiRes.ok) {
    const errorText = await fastapiRes.text();
    return new NextResponse(errorText, { status: fastapiRes.status });
  }

  const data = await fastapiRes.json();
  console.log(data)
  // Return the data directly without extra wrapping
  return NextResponse.json(data, { status: fastapiRes.status });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ mannequinID: string }> }
) {
  const supabaseCookie = createClient(cookies());
  const {
    data: { session: cookieSession }
  } = await supabaseCookie.auth.getSession();

  const token = cookieSession?.access_token;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Await the params promise to get the mannequinID
  const { mannequinID } = await params;

  const body = await req.json();

  const fastapiBase = process.env.FASTAPI_URL ?? 'http://localhost:8000';
  const fastapiEndpoint = `${fastapiBase.replace(/\/*$/, '')}/api/v1/mannequin/${mannequinID}`;

  const fastapiRes = await fetch(fastapiEndpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!fastapiRes.ok) {
    const errorText = await fastapiRes.text();
    return new NextResponse(errorText, { status: fastapiRes.status });
  }

  const data = await fastapiRes.json();
  console.log(data)
  return NextResponse.json(data, { status: fastapiRes.status });
}
