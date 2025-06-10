import { CarouselItem } from '../ui/carousel';

function LocationCard({ imgSrc, title }: { imgSrc: string; title: string }) {
    return (
        <CarouselItem className="flex flex-col items-center gap-2 basis-1/6">
            <div className="w-full h-24 relative rounded overflow-hidden shadow">
                <img src={imgSrc} className="w-full h-full" />
                <div className="text-xs absolute bottom-0 right-0 rounded-tl-md bg-background/75 backdrop-blur-lg py-1 px-2">
                    10:30 AM
                </div>
                <div className="font-bold text-xs absolute top-0 right-0 rounded-bl-md bg-background/75 backdrop-blur-lg py-1 px-2">
                    68°
                </div>
            </div>

            <h2 className="text-xs font-bold">{title}</h2>
        </CarouselItem>
    );
}

export default LocationCard;
