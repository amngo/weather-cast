import { getWeekdayFromTimestamp } from '@/lib/util';
import Image from 'next/image';

function ForecastItem({
    date,
    weatherCode,
    maxTemp,
    minTemp,
}: {
    date: number;
    weatherCode: number;
    maxTemp: number;
    minTemp: number;
}) {
    const weekday = getWeekdayFromTimestamp(date);

    return (
        <div className="flex flex-col items-center bg-white/10 p-2 rounded-md">
            <p className="text-xs font-bold">{weekday}</p>
            <Image
                src={`/assets/icons/${weatherCode}.svg`}
                alt="Weather Icon"
                width={24}
                height={24}
                className="my-1"
            />
            <p className="text-sm">{Math.ceil(maxTemp)}°</p>
            <p className="text-xs">{Math.ceil(minTemp)}°</p>
        </div>
    );
}

export default ForecastItem;
