export type PatternPayload = {
    name:string,
    design: Record<string, JSON>
}

export class RequestType  {
    static FRONT:string = 'front'
    static SERVER:string = 'server'
}