import WeekdayItem from './WeekdayItem';
import Background from '../Background/Background';
import { useAtomValue } from 'jotai';
import { loadingAtom, weatherDataAtom } from '@/atoms';
import { AnimatePresence, motion } from 'motion/react';
import Loader from '../Loader/Loader';

export default function Forecast() {
    const weatherData = useAtomValue(weatherDataAtom);
    const loading = useAtomValue(loadingAtom);

    return (
        <section className="h-full flex flex-col">
            <h2 className="font-bold text-lg mb-4 ml-4">7 Day Forecast</h2>
            <div className="p-4 rounded-2xl relative overflow-hidden flex-1">
                <div className="z-10 relative items-center justify-center h-full">
                    <AnimatePresence mode="wait">
                        {loading && (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full flex items-center justify-center"
                            >
                                <Loader />
                            </motion.div>
                        )}
                        {!loading && weatherData && (
                            <motion.div
                                key="forecast"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-2 h-full items-center justify-center"
                            >
                                {Array.from({ length: 7 }).map((_, index) => (
                                    <WeekdayItem
                                        weather={
                                            weatherData.daily.weather_code[
                                                index
                                            ]
                                        }
                                        key={index}
                                        time={weatherData.daily.time[index]}
                                        tempMax={
                                            weatherData.daily
                                                .temperature_2m_max[index]
                                        }
                                        tempMin={
                                            weatherData.daily
                                                .temperature_2m_min[index]
                                        }
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <Background />
            </div>
        </section>
    );
}
