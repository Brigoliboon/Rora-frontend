import { RequestPattern } from '@/lib/models/fetchdata/FetchData';
import { RequestType } from '@/lib/models/fetchdata/type';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { fetchStorageBlob } from '@/lib/utils/storage';


export async function GET() {
    const heads = await headers();
    const authorization = heads.get('authorization');

    if (!authorization) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authorization.replace("Bearer ", "");

    try {
        // 1. Get the pattern metadata from the backend
        const patternMetadataRes = await new RequestPattern(RequestType.SERVER).getDefault(token);
        const { bucket, path } = patternMetadataRes;

        if (!bucket || !path) {
            throw new Error('Pattern metadata (bucket/path) missing from backend response');
        }

        // 2. Get the file blob using the storage helper
        // path typically follows "batch_id/filename" format
        const [batchId, ...rest] = path.split('/');
        const filename = rest.join('/');

        const blob = await fetchStorageBlob(token, batchId, filename, bucket);


        // 3. Return the blob as a response
        return new Response(blob, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (error: any) {
        console.error('Error in default pattern endpoint:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

