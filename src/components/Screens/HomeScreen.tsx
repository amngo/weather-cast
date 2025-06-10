'use client';
import { fetchWeatherData } from '@atombrenner/openmeteo';
import WeatherInfo from '../WeatherInfo/WeatherInfo';
import LocationSearch from '../LocationSearch';
import { useAtomValue, useSetAtom } from 'jotai';
import {
    loadingAtom,
    locationAtom,
    temperatureUnitAtom,
    weatherDataAtom,
} from '@/atoms';
import { useQuery } from '@tanstack/react-query';
import CurrentWeather from '../CurrentWeather';
import { useEffect } from 'react';
import Background from '../Background/Background';
import Forecast from '../ForecastSummary/ForecastSummary';
import TemperatureUnitSelect from '../TemperatureUnitSelect';
import { getAirQuality } from '@/lib/api';
import { AirQualityData, IWeatherData } from '@/types';
import TemperatureChart from '../WeatherChart/TemperatureChart';

function HomeScreen() {
    const location = useAtomValue(locationAtom);
    const temperatureUnit = useAtomValue(temperatureUnitAtom);
    const setWeatherData = useSetAtom(weatherDataAtom);
    const setLoading = useSetAtom(loadingAtom);

    const { data: weatherData, isLoading } = useQuery({
        queryKey: ['weatherData', location.lat, location.lng, temperatureUnit],
        queryFn: async (): Promise<IWeatherData> => {
            const weather = fetchWeatherData({
                latitude: location.lat,
                longitude: location.lng,
                current: [
                    'weather_code',
                    'temperature_2m',
                    'relative_humidity_2m',
                    'apparent_temperature',
                    'wind_speed_10m',
                    'wind_direction_10m',
                    'surface_pressure',
                    'precipitation',
                    // @ts-expect-error precipitation_probability not in type but required by API
                    'precipitation_probability',
                    // @ts-expect-error visibility not in type but required by API
                    'visibility',
                ],
                daily: [
                    'weather_code',
                    'temperature_2m_max',
                    'temperature_2m_min',
                    // @ts-expect-error apparent_temperature_max not in type but required by API
                    'temperature_2m_mean',
                    // @ts-expect-error apparent_temperature_max not in type but required by API
                    'uv_index_max',
                ],
                hourly: ['temperature_2m'],
                minutely: ['temperature_2m'],
                forecast_days: 7,
                temperature_unit: temperatureUnit,
                timezone: 'auto',
            });

            const aq = getAirQuality(location.lat, location.lng);

            const [weatherData, airQualityData] = await Promise.all([
                weather,
                aq,
            ]);

            return {
                ...weatherData,
                aq: airQualityData as AirQualityData,
            };
        },
    });

    console.log('Weather Data:', weatherData);

    useEffect(() => {
        setWeatherData(weatherData);
    }, [weatherData, setWeatherData]);

    useEffect(() => {
        setLoading(isLoading);
    }, [setLoading, isLoading]);

    return (
        <div className="grid grid-cols-[350px_800px] grid-rows-[min-content_450px_500px] items-start bg-black h-full p-6 gap-4">
            <div className="col-span-2 px-4 py-2 rounded-2xl relative overflow-hidden h-auto">
                <div className="z-10 relative flex items-center justify-between gap-2">
                    <LocationSearch />
                    <TemperatureUnitSelect />
                </div>
                <Background />
            </div>
            <CurrentWeather />
            <WeatherInfo />
            <Forecast />
            <TemperatureChart />
        </div>
    );
}

export default HomeScreen;
