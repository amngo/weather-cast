import { loadingAtom, temperatureUnitAtom, weatherDataAtom } from '@/atoms';
import { TEMPERATURE_SCALE, WEATHER_CODES } from '@/lib/constants';
import { WeatherCode } from '@/types';
import { useAtomValue } from 'jotai';
import { MoveDown, MoveUp } from 'lucide-react';
import Loader from './Loader/Loader';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import Background from './Background/Background';

function getTemperatureCategory(temp: number, tempUnit: string) {
    const tempC = tempUnit === 'fahrenheit' ? ((temp - 32) * 5) / 9 : temp;
    return TEMPERATURE_SCALE.find(
        ({ rangeC }) => tempC >= rangeC[0] && tempC <= rangeC[1]
    );
}

export default function CurrentWeather() {
    const weatherData = useAtomValue(weatherDataAtom);
    const loading = useAtomValue(loadingAtom);
    const temperatureUnit = useAtomValue(temperatureUnitAtom);
    const currentTemp = Math.round(weatherData?.current.temperature_2m || 0);
    const category = getTemperatureCategory(currentTemp || 0, temperatureUnit);

    return (
        <section className="overflow-hidden relative h-full rounded-lg p-6">
            <div className="flex flex-col text-white z-10 relative h-full">
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key="loader"
                            className="flex items-center justify-center h-full"
                        >
                            <Loader />
                        </motion.div>
                    )}
                    {!loading && weatherData && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key="current-weather"
                            className=""
                        >
                            <div className="text-sm">
                                {new Date().toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true,
                                    timeZone: weatherData.timezone,
                                })}
                            </div>
                            <Image
                                src={`/assets/${weatherData?.current.weather_code}.svg`}
                                alt="weather icon"
                                width={48}
                                height={48}
                                className="w-48 h-48"
                            />
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-5xl">
                                        {currentTemp}°
                                    </span>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <MoveUp size={16} />
                                            <span className="text-lg">85°</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MoveDown size={16} />
                                            <span className="text-lg">62°</span>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text font-semibold">
                                    {
                                        WEATHER_CODES[
                                            weatherData?.current
                                                .weather_code as WeatherCode
                                        ]
                                    }
                                </h2>
                                <div>
                                    Feels like{' '}
                                    {Math.round(
                                        weatherData.current.apparent_temperature
                                    )}
                                    °
                                </div>
                                <div className="flex flex-col mt-2">
                                    <div
                                        className={`${category?.tailwindColor} font-bold`}
                                    >
                                        {category?.label}
                                    </div>
                                    <p
                                        className={`text-xs ${category?.tailwindColor}`}
                                    >
                                        {category?.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Background />
        </section>
    );
}
