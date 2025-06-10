const GOOGLE_PLACES_ENDPOINT =
    'https://maps.googleapis.com/maps/api/place/autocomplete/json';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const params = {
        input: searchParams.get('input') || '',
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
        types: 'locality',
    };

    const data = await fetch(
        `${GOOGLE_PLACES_ENDPOINT}?${new URLSearchParams(params)}`
    ).then((res) => res.json());

    return Response.json(data);
}
