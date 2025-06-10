import { HUMIDITY_SCALE } from '@/lib/constants';
import { Droplet } from 'lucide-react';
import InfoLayout from './InfoLayout';

function getHumidityLabel(value: number) {
    return HUMIDITY_SCALE.find(
        ({ range }) => value >= range[0] && value <= range[1]
    );
}

export default function Humidity({ value }: { value: number }) {
    const result = getHumidityLabel(Math.round(value));

    return (
        <InfoLayout title="Humidity" description={result?.effects}>
            <div className="font-semibold flex items-center">
                <Droplet size={32} />
                <div>
                    <span className="text-4xl">{Math.round(value)}</span>
                    <span className="text-xl">%</span>
                </div>
            </div>
            <p className="mt-1 text-xs">{result?.label || 'Unknown'}</p>
        </InfoLayout>
    );
}
