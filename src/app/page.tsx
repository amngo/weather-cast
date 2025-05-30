import HomeScreen from '@/components/Screens/HomeScreen';
import { fetchWeatherData } from '@atombrenner/openmeteo';
import { Suspense } from 'react';

export default async function Home() {
    const data = await fetchWeatherData({
        latitude: 33.77391,
        longitude: -117.94145,
        current: ['weather_code', 'temperature_2m'],
        daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
        hourly: ['temperature_2m', 'precipitation'],
        temperature_unit: 'fahrenheit',
        timezone: 'America/Los_Angeles',
    });

    const extendedData = {
        ...data,
        location: 'Garden Grove',
    };

    console.log(extendedData);

    return (
        <Suspense>
            <HomeScreen data={extendedData} />
        </Suspense>
    );
}
