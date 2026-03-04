import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
    const supabaseCookie = createClient(cookies());
    const {
        data: { session: cookieSession }
    } = await supabaseCookie.auth.getSession();

    const token = cookieSession?.access_token;
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const fastapiBase = process.env.FASTAPI_URL ?? 'http://localhost:8000';
    
    // If no ID provided, fetch all mannequins for the user
    if (!id) {
        const fastapiEndpoint = `${fastapiBase.replace(/\/*$/, '')}/api/v1/mannequin/all`;

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
        return NextResponse.json(data, { status: fastapiRes.status });
    }

    // Fetch specific mannequin by ID
    const fastapiEndpoint = `${fastapiBase.replace(/\/*$/, '')}/api/v1/mannequin/${id}`;

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
    return NextResponse.json(data, { status: fastapiRes.status });
}

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
    const { name, body_type, measurements } = body;

    const fastapiBase = process.env.FASTAPI_URL ?? 'http://localhost:8000';
    const fastapiEndpoint = `${fastapiBase.replace(/\/*$/, '')}/api/v1/mannequin/generate`;

    // Prepare the payload for the backend
    const payload = {
        body_type: body_type || 'neutral',
        measurements: measurements
    };

    // Add name to the payload if provided
    if (name) {
        payload.name = name;
    }

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
    console.log(data)
    return NextResponse.json(data, { status: fastapiRes.status });
}
