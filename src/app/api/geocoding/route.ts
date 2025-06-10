const GOOGLE_GEOCODING_ENDPOINT =
    'https://maps.googleapis.com/maps/api/geocode/json';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const params: { [key: string]: string } = {
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    };

    if (searchParams.has('place_id')) {
        params['place_id'] = searchParams.get('place_id') || '';
    }

    if (searchParams.has('latlng')) {
        params['latlng'] = searchParams.get('latlng') || '';
        params['result_type'] = 'locality';
    }

    const data = await fetch(
        `${GOOGLE_GEOCODING_ENDPOINT}?${new URLSearchParams(params)}`
    ).then((res) => res.json());

    return Response.json(data.results[0] || null);
}
