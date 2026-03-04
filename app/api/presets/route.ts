import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
    const heads = await headers();
    const authorization = heads.get('authorization');
    const token = authorization?.replace("Bearer ", "");

    const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    try {
        // 1. Fetch enriched presets from backend
        const presetsResponse = await fetch(`${backendBaseUrl}/api/v1/presets/`, {
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });

        if (!presetsResponse.ok) {
            throw new Error('Failed to fetch presets from backend');
        }

        const presets = await presetsResponse.json();
        return NextResponse.json(presets);
    } catch (error: any) {
        console.error('Error in presets GET endpoint:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
