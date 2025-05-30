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
