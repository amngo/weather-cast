import { UV_INDEX_SCALE } from '@/lib/constants';
import { clamp } from '@/lib/util';

function getUVInfo(index: number) {
    return UV_INDEX_SCALE.find(
        ({ range }) => index >= range[0] && index <= range[1]
    );
}

export default function UVIndex({ value }: { value: number }) {
    const uv = getUVInfo(value);

    return (
        <section className="px-6 py-4 rounded-2xl flex flex-col glass text-foreground">
            <h2 className="font-light">UV Index</h2>
            <div className="relative mt-2 flex justify-center">
                <svg
                    className="size-40 rotate-180"
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Background Circle (Gauge) */}
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className={`stroke-current text-${uv?.color}-100`}
                        strokeWidth="2"
                        strokeDasharray="50 100"
                    ></circle>

                    {/* Gauge Progress */}
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className={`stroke-current text-${uv?.color}-400`}
                        strokeWidth="2"
                        strokeDasharray={`${clamp(value, 0, 10) * 5} 100`}
                    ></circle>
                </svg>

                {/* Value Text */}
                <div className="absolute top-8 start-1/2 transform -translate-x-1/2 text-center">
                    <span
                        className={`font-semibold text-4xl text-shadow-${uv?.color}-300 text-${uv?.color}-300 text-shadow-[0_0_20px]`}
                    >
                        {value}
                    </span>
                    <span className={`text-${uv?.color}-300 block text-xs`}>
                        {uv?.level}
                    </span>
                    <p
                        className={`mt-2 text-xs font-light text-muted-foreground w-[225px]`}
                    >
                        {uv?.risk}
                    </p>
                </div>
            </div>
        </section>
    );
}
