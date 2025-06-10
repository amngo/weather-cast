import { AIR_QUALITY_SCALE } from '@/lib/constants';
import InfoLayout from './InfoLayout';

function getAirQualityInfo(aqi: number) {
    return AIR_QUALITY_SCALE.find(
        ({ range }) => aqi >= range[0] && aqi <= range[1]
    );
}

export default function AirQuality({ value }: { value: number }) {
    const aq = getAirQualityInfo(value) || AIR_QUALITY_SCALE[0];

    return (
        <InfoLayout title="Air Quality" description={aq?.description}>
            <span
                className={`font-semibold text-4xl text-shadow-${aq.color}-300 text-${aq.color}-300 text-shadow-[0_0_20px]`}
            >
                {value}
            </span>

            <p className={`text-xs text-${aq.color}-300 mt-1`}>
                {aq?.label || 'Unknown'}
            </p>
        </InfoLayout>
    );
}
