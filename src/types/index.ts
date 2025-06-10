import { WeatherData } from '@atombrenner/openmeteo';

export interface GeoLocation {
    id: number; // Unique ID for this location
    name: string; // Location name (localized if possible)
    latitude: number; // Geographical WGS84 latitude
    longitude: number; // Geographical WGS84 longitude
    elevation: number; // Elevation above mean sea level
    timezone: string; // Time zone using tz database definitions
    feature_code: string; // Type of location based on GeoNames feature_code
    country_code: string; // ISO 3166-1 alpha-2 country code (e.g., "DE")
    country: string; // Country name (localized if possible)
    country_id: number; // Unique ID for the country
    population: number; // Number of inhabitants
    postcodes: string[]; // List of postcodes

    // Administrative areas (names, localized if possible)
    admin1: string;
    admin2: string;
    admin3: string;
    admin4: string;

    // Administrative area IDs
    admin1_id: number;
    admin2_id: number;
    admin3_id: number;
    admin4_id: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WeatherCode =
    | 0
    | 1
    | 2
    | 3
    | 45
    | 48
    | 51
    | 53
    | 55
    | 56
    | 57
    | 61
    | 63
    | 65
    | 66
    | 67
    | 71
    | 73
    | 75
    | 77
    | 80
    | 81
    | 82
    | 85
    | 86
    | 95
    | 96
    | 99;

export interface AirQualityData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
        time: string;
        interval: string;
        uv_index: string;
        uv_index_clear_sky: string;
        us_aqi: string;
    };
    current: {
        time: string; // ISO 8601 format
        interval: number; // in seconds
        uv_index: number;
        uv_index_clear_sky: number;
        us_aqi: number;
    };
}

export interface IWeatherData
    extends WeatherData<
        'precipitation' | 'temperature_2m',
        'weather_code' | 'temperature_2m_max' | 'temperature_2m_min',
        | 'temperature_2m'
        | 'weather_code'
        | 'precipitation'
        | 'relative_humidity_2m'
        | 'apparent_temperature'
        | 'wind_speed_10m'
        | 'wind_direction_10m'
        | 'surface_pressure'
    > {
    aq: AirQualityData;
}

export interface PlaceResult {
    place_id: string;
    description: string;
}

export interface GeocodingData {
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}
