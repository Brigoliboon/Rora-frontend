import { RequestMannequin } from '@/lib/models/fetchdata/FetchData';
import { RequestType } from '@/lib/models/fetchdata/type';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const heads = await headers();
    const authorization = heads.get('authorization');

    if (!authorization) {
        return NextResponse.json({ error: heads }, { status: 401 });
    }
    
    const token = authorization.replace("Bearer ", "")

    const response = await new RequestMannequin(RequestType.SERVER).getDefault(token)

    return NextResponse.json(response, {status:200})
}
