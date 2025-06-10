function LocationCardItem({
    imgSrc,
    title,
}: {
    imgSrc: string;
    title: string;
}) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-36 h-48">
                <img src={imgSrc} className="w-full h-full rounded-lg" />
            </div>

            <h2 className="text-sm">{title}</h2>
        </div>
    );
}

export default LocationCardItem;
