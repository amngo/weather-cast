import Humidity from './Humidity';
import UVIndex from './UVIndex';
import WindSpeed from './WindSpeed';
import Visibility from './Visibility';
import AirQuality from './AirQuality';
import Background from '../Background/Background';
import { useAtomValue } from 'jotai';
import { loadingAtom, weatherDataAtom } from '@/atoms';
import Loader from '../Loader/Loader';
import { AnimatePresence, motion } from 'motion/react';
import Pressure from './Pressure';

export default function WeatherInfo() {
    const data = useAtomValue(weatherDataAtom);
    const loading = useAtomValue(loadingAtom);

    return (
        <section className="overflow-hidden relative rounded-2xl h-full">
            <div className="z-10 relative p-4 h-full">
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="col-span-3 row-span-2 flex items-center h-full justify-center"
                        >
                            <Loader />
                        </motion.div>
                    )}
                    {!loading && data && (
                        <motion.div
                            key="weather-info"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-[245px_245px_245px] gap-4 grid-rows-2 h-full"
                        >
                            <UVIndex
                                value={Number(
                                    data.aq.current.uv_index.toFixed(1)
                                )}
                            />
                            <AirQuality value={data.aq.current.us_aqi} />
                            <Humidity
                                value={data.current.relative_humidity_2m}
                            />
                            <WindSpeed
                                value={data.current.wind_speed_10m}
                                direction={data.current.wind_direction_10m}
                            />
                            {/* @ts-expect-error visibility not in type but required by API */}
                            <Visibility value={data.current.visibility} />
                            <Pressure value={data.current.surface_pressure} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Background />
        </section>
    );
}
