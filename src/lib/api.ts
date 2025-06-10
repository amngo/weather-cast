export async function getPlaces(input: string) {
    const params = new URLSearchParams({
        input,
    });

    try {
        const response = await fetch(`/api/places?${params.toString()}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        throw error;
    }
}

export async function getGeocoding(placeId: string) {
    const params = new URLSearchParams({
        place_id: placeId,
    });

    try {
        const response = await fetch(`/api/geocoding?${params.toString()}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        throw error;
    }
}

export async function getReverseGeocoding(lat: number, lng: number) {
    const params = new URLSearchParams({
        latlng: `${lat},${lng}`,
    });

    try {
        const response = await fetch(`/api/geocoding?${params.toString()}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching reverse geolocation data:', error);
        throw error;
    }
}

export async function getLocationImage(placeId: string) {
    const params = new URLSearchParams({
        place_id: placeId,
    });

    try {
        const response = await fetch(`/api/photos?${params.toString()}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching location image:', error);
        throw error;
    }
}

export async function getAirQuality(lat: number, lng: number) {
    const params = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lng),
        current: 'uv_index,uv_index_clear_sky,us_aqi',
    });

    try {
        const response = await fetch(
            `https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching air quality data:', error);
        throw error;
    }
}
