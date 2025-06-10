import { cn } from '@/lib/utils';
import { MoveDown, MoveUp } from 'lucide-react';

function WeekdayItem({
    weather,
    time,
    tempMax,
    tempMin,
}: {
    weather: number;
    time: number;
    tempMax: number;
    tempMin: number;
}) {
    const date = new Date(time * 1000);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
    };
    let day = date.toLocaleDateString('en-US', options).split(',')[0];
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });

    // If date is today, use "Today" instead of the day name
    if (
        formattedDate ===
        new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })
    ) {
        day = 'Today';
    }

    // If date is yesterday, use "Yesterday" instead of the day name
    if (
        formattedDate ===
        new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })
    ) {
        day = 'Yesterday';
    }

    return (
        <div
            className={cn(
                'grid grid-cols-[auto_1fr_1fr_1fr] items-center justify-between gap-4 px-4 py-2 glass rounded-lg text-foreground h-full w-full',
                day === 'Today' && 'border-black border-2'
            )}
        >
            <img
                src={`/assets/${weather}.svg`}
                alt="Weather Icon"
                className="w-8 h-8"
            />
            <h2 className="text-xs font-semibold">{day}</h2>
            <h2 className="text-xs text-muted-foreground">{formattedDate}</h2>

            <div className="text-xs flex justify-between w-full">
                <div className="flex items-center">
                    <MoveUp size={10} />
                    <span>{Math.round(tempMax)}°</span>
                </div>

                <div className="flex items-center">
                    <MoveDown size={10} />
                    <span>{Math.round(tempMin)}°</span>
                </div>
            </div>
        </div>
    );
}

export default WeekdayItem;
