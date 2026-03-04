import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

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
