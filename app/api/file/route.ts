import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { fetchStorageBlob } from '@/lib/utils/storage';

import { createClient } from '@/utils/supabase/server';
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const batch_id = searchParams.get('batch');
    const filename = searchParams.get('filename');
    const bucket = searchParams.get('bucket') || 'garments';

    if (!batch_id || !filename) {
        return NextResponse.json({ error: "Missing required parameters (batch, filename)" }, { status: 400 });
    }

    const supabaseCookie = createClient(cookies());

    const {
        data: { session: cookieSession }
    } = await supabaseCookie.auth.getSession();

    const token = cookieSession?.access_token;
    console.log(token)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const blob = await fetchStorageBlob(token, batch_id, filename, bucket);

        // Determine content type based on extension
        let contentType = 'application/octet-stream';
        if (filename.endsWith('.svg')) contentType = 'image/svg+xml';
        else if (filename.endsWith('.png')) contentType = 'image/png';
        else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) contentType = 'image/jpeg';
        else if (filename.endsWith('.ply')) contentType = 'application/x-ply';
        else if (filename.endsWith('.obj')) contentType = 'text/plain';

        return new Response(blob, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (error: any) {
        console.error('Error fetching file:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
