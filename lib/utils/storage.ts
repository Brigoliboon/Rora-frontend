/**
 * Fetches an authenticated storage URL from the backend and then
 * fetches the actual file blob from Supabase.
 * 
 * @param token - Authentication token (Bearer)
 * @param path - Object path in the bucket
 * @param bucket - Supabase bucket name
 * @returns Promise<Blob>
 */
export async function fetchStorageBlob(token: string, batch_id: string, filename: string, bucket: string): Promise<Blob> {
    const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabase_url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
    // console.log(token)
    // Construct direct path to authenticated object
    const full_url = `${supabase_url}/storage/v1/object/authenticated/${bucket}/${batch_id}/${filename}`;

    console.log(full_url)
    const response = await fetch(full_url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch file from Supabase: ${response.statusText}`);
    }

    return await response.blob();
}
