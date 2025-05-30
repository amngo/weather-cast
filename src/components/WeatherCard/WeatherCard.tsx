import { WeatherData } from '@atombrenner/openmeteo';
import { WEATHER_CODES } from '@/lib/constants';
import {
    getCurrentFormattedTimeInTimeZone,
    getDateFromUnixTimestamp,
    getTimeOfDay,
    getWeatherClass,
    isDaytime,
} from '@/lib/util';
import Image from 'next/image';
import './WeatherCard.css';
import ForecastItem from '../ForecastItem';

function WeatherCard({
    data,
    location,
}: {
    data: WeatherData<
        'precipitation' | 'temperature_2m',
        'weather_code' | 'temperature_2m_max' | 'temperature_2m_min',
        'temperature_2m' | 'weather_code'
    >;
    location: string;
}) {
    const timeOfDay = isDaytime(data.current.time, data.timezone)
        ? 'day'
        : 'night';

    const timeCategory = getTimeOfDay(data.current.time, data.timezone);
    const color = getWeatherClass(data.current.weather_code, timeCategory);

    console.log(
        `WeatherCard: ${data.current.weather_code} - ${timeOfDay} - ${color} - ${location}`
    );

    return (
        <div
            className={`text-white bg-gradient-to-t shadow-lg rounded-lg p-6 w-[400px] h-[300px] mx-auto grid grid-cols-2 grid-rows-3 ${color}`}
        >
            <section className="flex flex-col gap-1 col-span-1 row-span-1">
                <h2 className="font-bold text-lg flex items-center gap-1">
                    {location}
                </h2>
                <h3 className="font-semibold">
                    {
                        WEATHER_CODES[data.current.weather_code][timeOfDay]
                            .description
                    }
                </h3>
            </section>
            <section className="flex gap-2 items-center self-start justify-self-end col-span-1 row-span-1">
                <Image
                    src={
                        WEATHER_CODES[data.current.weather_code][timeOfDay]
                            .image
                    }
                    alt="Weather Icon"
                    width={64}
                    height={64}
                />
                <div className="text-5xl">
                    {Math.ceil(data.current.temperature_2m)}°
                </div>
            </section>
            <section className="grid grid-cols-7 gap-2 col-span-2 row-span-1">
                {Array.from({ length: 7 }, (_, i) => (
                    <ForecastItem
                        key={i}
                        date={data.daily.time[i]}
                        weatherCode={data.daily.weather_code[i]}
                        maxTemp={data.daily.temperature_2m_max[i]}
                        minTemp={data.daily.temperature_2m_min[i]}
                    />
                ))}
            </section>
            <section className="col-span-2 row-span-1 self-end">
                <h2 className="text-xl font-semibold">
                    {getCurrentFormattedTimeInTimeZone(data.timezone)}
                </h2>
                <p className="text-sm">
                    {getDateFromUnixTimestamp(data.current.time, data.timezone)}
                </p>
            </section>
            {/* <section className="self-end place-self-end">
                <p className="text-5xl">
                    {Math.ceil(data.current.temperature_2m)}°
                </p>
            </section> */}
        </div>
    );
}

export default WeatherCard;
