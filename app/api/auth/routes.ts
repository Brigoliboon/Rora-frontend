import { headers } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(){
    const heads = await headers();
    const authorization = heads.get('authorization');

    // Forward the incoming cookies (e.g., session token) to the FastAPI backend.
    const fastapiBase = process.env.FASTAPI_URL ?? 'http://localhost:8000';
    const fastapiEndpoint = `${fastapiBase.replace(/\/*$/, '')}/api/v1/mannequin`;

    if (!authorization) {
        return NextResponse.json({ error: heads }, { status: 401 });
    }


}