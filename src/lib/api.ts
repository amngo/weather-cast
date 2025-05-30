const FORECAST_ENDPOINT = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_ENDPOINT = 'https://geocoding-api.open-meteo.com/v1/search';
const TEMPERATURE_UNIT = 'fahrenheit';

export async function getGeolocation(name: string) {
    const params = {
        name,
    };

    try {
        const response = await fetch(
            `${GEOCODING_ENDPOINT}?${new URLSearchParams(params)}`
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        throw error;
    }
}

export async function getWeatherForecast(latitude: number, longitude: number) {
    const params = {
        latitude: String(latitude),
        longitude: String(longitude),
        temperature_unit: TEMPERATURE_UNIT,
        current:
            'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
        hourly: 'temperature_2m,precipitation',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    };

    try {
        const response = await fetch(
            `${FORECAST_ENDPOINT}?${new URLSearchParams(params)}`
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}
