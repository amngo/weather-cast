const GOOGLE_PLACES_ENDPOINT =
    'https://maps.googleapis.com/maps/api/place/details/json';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const params = {
        place_id: searchParams.get('place_id') || '',
        field: 'name,photos',
        types: 'locality,political',
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    };

    const res = await fetch(
        `${GOOGLE_PLACES_ENDPOINT}?${new URLSearchParams(params)}`
    );

    const data = await res.json();

    const image = await fetch(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${data.result.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );

    return Response.json({ image: image.url });
}
