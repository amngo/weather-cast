import { WIND_SPEED_SCALE } from '@/lib/constants';
import { Navigation2 } from 'lucide-react';
import InfoLayout from './InfoLayout';

function getCompassDirection(degrees: number) {
    const directions = [
        'N',
        'NNE',
        'NE',
        'ENE',
        'E',
        'ESE',
        'SE',
        'SSE',
        'S',
        'SSW',
        'SW',
        'WSW',
        'W',
        'WNW',
        'NW',
        'NNW',
    ];

    const index = Math.round((degrees % 360) / 22.5) % 16;
    return directions[index];
}

function getWindLevel(speed: number) {
    return WIND_SPEED_SCALE.find(
        ({ range }) => speed >= range[0] && speed <= range[1]
    );
}

export default function WindSpeed({
    value,
    direction,
}: {
    value: number;
    direction: number;
}) {
    const result = getWindLevel(Math.round(value));
    const directionLabel = getCompassDirection(direction);

    return (
        <InfoLayout title="Wind Speed" description={result?.description}>
            <div className="flex gap-2 justify-between items-center h-full">
                <div>
                    <div className="font-semibold flex gap-1 items-baseline">
                        <span className="text-4xl">{Math.round(value)}</span>
                        <span className="text-lg">mph</span>
                    </div>
                    <p className="mt-1 text-xs">{result?.label || 'Unknown'}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Navigation2
                        size={20}
                        style={{ transform: `rotate(${direction}deg)` }}
                    />
                    <span className="text-xs">{directionLabel}</span>
                </div>
            </div>
        </InfoLayout>
    );
}
