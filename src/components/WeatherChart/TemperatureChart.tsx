'use client';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import Background from '../Background/Background';
import { useAtomValue } from 'jotai';
import { loadingAtom, weatherDataAtom } from '@/atoms';
import { AnimatePresence, motion } from 'motion/react';
import Loader from '../Loader/Loader';
import { Area, AreaChart, ReferenceLine, XAxis, YAxis } from 'recharts';
import { useState } from 'react';

export const description = 'A linear area chart';

const chartConfig = {
    temp: {
        label: 'Temperature',
        color: 'white',
    },
} satisfies ChartConfig;

export default function TemperatureChart() {
    const data = useAtomValue(weatherDataAtom);
    const loading = useAtomValue(loadingAtom);
    const currentHour = new Date().toLocaleTimeString([], {
        hour: 'numeric',
        timeZone: data?.timezone,
    });
    const [referenceLine, setReferenceLine] = useState<string | undefined>();

    const formattedData = data?.hourly.time
        .slice(0, 24)
        .map((time, index) => {
            return {
                date: new Date(time * 1000).toLocaleTimeString([], {
                    hour: 'numeric',
                }),
                temp: Math.round(data?.hourly.temperature_2m[index]),
            };
        })
        .filter((item) => !Number.isNaN(item.temp));

    return (
        <section className="h-full flex flex-col">
            <h2 className="font-bold text-lg mb-4 ml-4">
                {'Temperature Chart (Today)'}
            </h2>
            <div className="rounded-2xl overflow-hidden relative h-full">
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <AnimatePresence mode="wait">
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key="loader"
                            >
                                <Loader />
                            </motion.div>
                        )}

                        {!loading && data && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key="chart"
                                className="w-full h-auto p-6"
                            >
                                <ChartContainer config={chartConfig}>
                                    <AreaChart
                                        accessibilityLayer
                                        data={formattedData}
                                        margin={{
                                            left: -15,
                                        }}
                                        onMouseMove={(event) => {
                                            setReferenceLine(event.activeLabel);
                                        }}
                                        onMouseLeave={() => {
                                            setReferenceLine(undefined);
                                        }}
                                    >
                                        <ReferenceLine
                                            x={currentHour}
                                            stroke="var(--color-temp)"
                                            strokeDasharray={4}
                                        />
                                        <ReferenceLine
                                            x={referenceLine}
                                            stroke="var(--color-temp)"
                                            opacity={0.5}
                                        />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                        />
                                        <YAxis
                                            domain={['auto', 'auto']}
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) =>
                                                `${value}°`
                                            }
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    indicator="dot"
                                                    formatter={(value) =>
                                                        `Temperature: ${value}°`
                                                    }
                                                    labelFormatter={(label) =>
                                                        `Time: ${label}`
                                                    }
                                                />
                                            }
                                        />
                                        <defs>
                                            <linearGradient
                                                id="fillTemp"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="var(--color-temp)"
                                                    stopOpacity={0.95}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="var(--color-temp)"
                                                    stopOpacity={0.05}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            dataKey="temp"
                                            type="natural"
                                            fill="url(#fillTemp)"
                                            stroke="var(--color-temp)"
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <Background />
            </div>
        </section>
    );
}
