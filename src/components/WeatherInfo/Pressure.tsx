import { PRESSURE_SCALE } from '@/lib/constants';
import InfoLayout from './InfoLayout';

function hpaToInHg(hpa: number) {
    return +(hpa * 0.029529983071445).toFixed(2);
}

function getPressureInfo(pressure: number) {
    return PRESSURE_SCALE.find(
        ({ range }) => pressure >= range[0] && pressure <= range[1]
    );
}

export default function Pressure({ value }: { value: number }) {
    const result = getPressureInfo(Math.round(value));

    return (
        <InfoLayout title="Surface Pressure" description={result?.description}>
            <div
                className={`flex gap-1 items-baseline font-semibold text-4xl text-${result?.color}`}
            >
                <span
                    className={`text-shadow-${result?.color} text-shadow-[0_0_20px]`}
                >
                    {hpaToInHg(value)}
                </span>
                <span className="text-lg">inHg</span>
            </div>

            <p className={`text-xs text-${result?.color} mt-1`}>
                {result?.label || 'Unknown'}
            </p>
        </InfoLayout>
    );
}
