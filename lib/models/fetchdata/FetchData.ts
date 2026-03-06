import { PatternPayload, RequestType } from "./type";

async function request(url: string, session_token: string, method: string = 'GET', type: RequestType, payload: PatternPayload | null = null) {
    const ROOT = 'http://localhost:8000'
    const full_url = type == RequestType.SERVER ? ROOT + url : url
    const header: RequestInit = {
        method,
        headers: {
            Authorization: `Bearer ${session_token}`,
            'Content-Type': 'application/json',
        },
    };

    if (method !== 'GET') {
        header.body = JSON.stringify(payload);
    }

    try {
        const request = await fetch(full_url,
            header
        )

        console.debug('URL: ' + ROOT + url)

        if (!request.ok) {
            const error = await request.text(); // or request.json()
            throw new Error(error || `HTTP ${request.status}`);
        }

        const data = request
        return data
    } catch (e) {
        console.error(e)
        throw e
    }
}

export class Request {

}

export class RequestMannequin {
    call_type: RequestType
    endpoint: string

    constructor(call_type: RequestType) {
        this.call_type = call_type
        this.endpoint = call_type == RequestType.SERVER ? '/api/v1/mannequin' : '/api/mannequin'
    }

    async getDefault(session_token: string, type: 'male' | 'female' | 'neutral' = 'male') {
        const method = 'GET'
        const endpoint = `${this.endpoint}/default?type=${type}&includes_model=true&includes_measurements=true`
        const req = await request(endpoint, session_token, method, this.call_type, null)

        return await req.json()
    }

    // TODO: eview
    async getMannequin(mannequin_id: string, session_token: string) {
        const method = 'GET'
        const endpoint = `${this.endpoint}/${mannequin_id}`
        const req = await request(endpoint, session_token, method, this.call_type)

        return await req.json()
    }
}

export class RequestPattern {
    call_type: RequestType
    endpoint: string

    constructor(call_type: RequestType) {
        this.call_type = call_type
        this.endpoint = call_type == RequestType.SERVER ? '/api/v1/pattern' : '/api/pattern'
    }

    async getDefault(session_token: string) {
        const method = 'GET'
        const endpoint = `${this.endpoint}/default`
        const req = await request(endpoint, session_token, method, this.call_type)

        return await req.json()
    }

    async getDefaultBlob(session_token: string) {
        const method = 'GET'
        const endpoint = `${this.endpoint}/default`
        const req = await request(endpoint, session_token, method, this.call_type)

        return await req.blob()
    }


    // TODO: Review
    async getPattern(pattern_id: string, session_token: string) {
        const method = 'GET'
        const endpoint = `${this.endpoint}/${pattern_id}`
        const req = await request(endpoint, session_token, method, this.call_type)

        return await req.json()
    }

    // TODO: Review
    async generatePattern(pattern_payload: PatternPayload, session_token: string, mannequin_batch_uid: string | null = null, draft: boolean = false) {
        const method = 'POST'
        let endpoint = `${this.endpoint}/generate?draft=${draft}`
        
        if (mannequin_batch_uid) {
            endpoint += `&mannequin_batch_uid=${mannequin_batch_uid}`
        }

        const req = await request(endpoint, session_token, method, this.call_type, pattern_payload)

        return await req.json()
    }

    async previewPattern(pattern_payload: PatternPayload, session_token: string, mannequin_batch_uid: string | null = null) {
        const method = 'POST'
        let endpoint = `${this.endpoint}/generate?draft=true`
        
        if (mannequin_batch_uid) {
            endpoint += `&mannequin_batch_uid=${mannequin_batch_uid}`
        }

        const req = await request(endpoint, session_token, method, this.call_type, pattern_payload)

        return req
    }

    // Save pattern - generates and uploads the garment pattern to the backend
    async savePattern(pattern_payload: PatternPayload, session_token: string, mannequin_batch_uid: string | null = null) {
        const method = 'POST'
        let endpoint = `${this.endpoint}/generate?draft=false`
        
        if (mannequin_batch_uid) {
            endpoint += `&mannequin_batch_uid=${mannequin_batch_uid}`
        }

        const req = await request(endpoint, session_token, method, this.call_type, pattern_payload)

        return await req.json()
    }
}
