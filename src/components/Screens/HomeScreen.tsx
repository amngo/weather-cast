'use client';

import NiceModal from '@ebay/nice-modal-react';
import WeatherCard from '../WeatherCard/WeatherCard';
import { fetchWeatherData, WeatherData } from '@atombrenner/openmeteo';
import GeolocationModal from '../GeolocationModal';
import { useState } from 'react';

NiceModal.register('geolocation-modal', GeolocationModal);

function HomeScreen({
    data,
}: {
    data: WeatherData<
        'precipitation' | 'temperature_2m',
        'weather_code' | 'temperature_2m_max' | 'temperature_2m_min',
        'temperature_2m' | 'weather_code'
    > & {
        location: string; // or a more specific type if needed
    };
}) {
    const [weather, setWeather] = useState([data]);

    const createWeatherCard = async () => {
        const [lat, lon, location, timezone] = await NiceModal.show<
            [number, number, string, string]
        >('geolocation-modal');

        if (lat && lon) {
            const newData = await fetchWeatherData({
                latitude: lat,
                longitude: lon,
                current: ['weather_code', 'temperature_2m'],
                daily: [
                    'weather_code',
                    'temperature_2m_max',
                    'temperature_2m_min',
                ],
                hourly: ['temperature_2m', 'precipitation'],
                temperature_unit: 'fahrenheit',
                timezone,
            });
            setWeather((prev) => [...prev, { ...newData, location }]);
        }
    };

    return (
        <NiceModal.Provider>
            <div className="grid grid-cols-2 items-center gap-4">
                {weather.map((item, index) => (
                    <WeatherCard
                        key={index}
                        data={item}
                        location={item.location}
                    />
                ))}
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={createWeatherCard}
                >
                    Open Geolocation Modal
                </button>
            </div>
        </NiceModal.Provider>
    );
}

export default HomeScreen;
