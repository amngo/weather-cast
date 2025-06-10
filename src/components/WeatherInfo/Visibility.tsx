import { VISIBILITY_SCALE } from '@/lib/constants';
import InfoLayout from './InfoLayout';

function getVisibilityCategoryMeters(visibilityMeters: number) {
    return VISIBILITY_SCALE.find(
        ({ range }) =>
            visibilityMeters >= range[0] && visibilityMeters <= range[1]
    );
}

export default function Visibility({ value }: { value: number }) {
    const visibility = getVisibilityCategoryMeters(value);

    return (
        <InfoLayout title="Visibility" description={visibility?.description}>
            <div className="flex gap-2 justify-between items-center h-full">
                <div>
                    <div className="font-semibold flex gap-1 items-baseline">
                        <span className="text-4xl">{value / 1000}</span>
                        <span className="text-lg">km</span>
                    </div>

                    <p className="mt-1 text-xs">
                        {visibility?.label || 'Unknown'}
                    </p>
                </div>
            </div>
        </InfoLayout>
    );
}
