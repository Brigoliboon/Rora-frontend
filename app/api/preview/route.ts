import { RequestPattern } from '@/lib/models/fetchdata/FetchData';
import { RequestType } from '@/lib/models/fetchdata/type';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * POST /api/preview
 * Receives parsed YAML data (as JSON) from the sidebar values hook
 * and processes it for preview generation.
 */
export async function POST(request: Request, include_specifications = false) {
    const heads = await headers();
    const authorization = heads.get('authorization');

    console.log(authorization)
    if (!authorization) {
      return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 });
    }
  
    const token = authorization.replace('Bearer ', '');

    const body = await request.json();
    console.log(body.design.meta.upper)
    // Validate that we received data
    if (!body) {
      return NextResponse.json(
        { error: 'No data provided' },
        { status: 400 }
      );
    }
    body['name'] = 'preview'
    const mannequin_batch_uid = body.mannequin_batch_uid || null;
    const r = await new RequestPattern(RequestType.SERVER).previewPattern(body, token, mannequin_batch_uid)
    
    // Return SVG data as base64 encoded string
    const svgBytes = await r.arrayBuffer()
    const svgBase64 = Buffer.from(svgBytes).toString('base64');
    const dataUrl = `data:image/png;base64,${svgBase64}`;

    // console.log(dataUrl)
    return NextResponse.json({ patternURL: dataUrl }, {status: 200})
}

