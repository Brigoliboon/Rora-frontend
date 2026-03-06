import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Proxy GET /api/pattern to a FastAPI service running in a separate environment.
 * The FastAPI base URL is read from the FASTAPI_URL environment variable (defaults to
 * http://localhost:8000). The user's cookies are forwarded for session validation.
 */
export async function GET() {
    const heads = await headers();
    const authorization = heads.get('authorization');

    // Forward the incoming cookies (e.g., session token) to the FastAPI backend.
    const fastapiBase = process.env.FASTAPI_URL ?? 'http://localhost:8000';
    const fastapiEndpoint = `${fastapiBase.replace(/\/*$/, '')}/api/v1/pattern`;

    if (!authorization) {
        return NextResponse.json({ error: heads }, { status: 401 });
    }

    const token = authorization.replace("Bearer ", "")

        const fastapiRes = await fetch(fastapiEndpoint, {
        method: 'GET',
        headers: {
            // Preserve cookies for authentication/authorization on the FastAPI side.
            // Forward the Accept header to indicate we expect JSON.
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            accept: 'application/json',
        },
        });
    
        // If FastAPI returns an error status, forward it to the client.
        if (!fastapiRes.ok) {
        const errorText = await fastapiRes.text();
        return new NextResponse(errorText, { status: fastapiRes.status });
    }

    const data = await fastapiRes.json();
    // Return the JSON payload exactly as received from FastAPI.
    return NextResponse.json(data, { status: fastapiRes.status });
}

/**
 * Proxy POST /api/pattern to the FastAPI backend to save/generate a pattern.
 * This endpoint generates the pattern using the design parameters and uploads
 * the garment pattern to the backend storage.
 */
export async function POST(req: NextRequest) {
    const supabaseCookie = createClient(cookies());
    const {
        data: { session: cookieSession }
    } = await supabaseCookie.auth.getSession();

    const token = cookieSession?.access_token;
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { designs, mannequin_batch_uid } = body;

    const fastapiBase = process.env.FASTAPI_URL ?? 'http://localhost:8000';
    let fastapiEndpoint = `${fastapiBase.replace(/\/*$/, '')}/api/v1/pattern/generate`;

    // Add mannequin_batch_uid to query params if provided
    if (mannequin_batch_uid) {
        fastapiEndpoint += `?mannequin_batch_uid=${mannequin_batch_uid}`;
    }

    // Prepare the payload for the backend - pass designs directly
    const payload = designs;

    const fastapiRes = await fetch(fastapiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!fastapiRes.ok) {
        const errorText = await fastapiRes.text();
        return new NextResponse(errorText, { status: fastapiRes.status });
    }

    const data = await fastapiRes.json();
    console.log('Save pattern response:', data);
    return NextResponse.json(data, { status: fastapiRes.status });
}
