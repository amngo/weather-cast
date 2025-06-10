import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/lib/hooks';
import { getGeocoding, getPlaces, getReverseGeocoding } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { locationAtom } from '@/atoms';
import { LocateIcon, MapPin } from 'lucide-react';
import { PlaceResult, GeocodingData } from '@/types';

export default function LocationSearch() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 500);
    const [results, setResults] = useState<PlaceResult[]>([]);
    const [location, setLocation] = useAtom(locationAtom);

    const { data, isLoading } = useQuery({
        queryKey: ['places', debouncedInput],
        queryFn: () => getPlaces(debouncedInput),
        enabled: debouncedInput.trim() !== '' && debouncedInput.length > 1,
    });

    const { data: geocodeData } = useQuery({
        queryKey: ['geocoding', location.lat, location.lng],
        queryFn: () => getReverseGeocoding(location.lat, location.lng),
    });

    const handleSelect = async (result: PlaceResult) => {
        const geocodingData: GeocodingData = await getGeocoding(
            result.place_id
        );
        setLocation({
            lat: geocodingData.geometry.location.lat,
            lng: geocodingData.geometry.location.lng,
            placeId: result.place_id,
            name: result.description,
        });
        setOpen(false);
    };

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
    };

    const handleCurrentLocation = async () => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by this browser.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                setLocation((prev) => ({
                    ...prev,
                    lat: latitude,
                    lng: longitude,
                }));
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );
    };

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    useEffect(() => {
        if (!open) {
            setInput('');
            setResults([]);
        }
    }, [open]);

    useEffect(() => {
        handleCurrentLocation();
    }, []);

    useEffect(() => {
        if (data && data.predictions) {
            setResults(data.predictions);
        } else {
            setResults([]);
        }
    }, [data]);

    useEffect(() => {
        if (geocodeData) {
            setLocation((prev) => ({
                ...prev,
                name: geocodeData.formatted_address || 'Unknown Location',
                placeId: geocodeData.place_id || '',
            }));
        }
    }, [geocodeData, setLocation]);

    return (
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
            <Button variant="glass" onClick={handleCurrentLocation}>
                <LocateIcon size={12} />
            </Button>
            <Button
                variant="glass"
                className="justify-between w-[400px]"
                onClick={() => setOpen(true)}
            >
                <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <div className="grid">
                        <span className="text-xs truncate">
                            {location.name}
                        </span>
                    </div>
                </div>

                <kbd className="bg-background text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                    <span className="text-xs">⌘</span>J
                </kbd>
            </Button>
            <Command shouldFilter={false}>
                <CommandDialog open={open} onOpenChange={handleOpenChange}>
                    <CommandInput
                        placeholder="Type a location..."
                        value={input}
                        onValueChange={setInput}
                    />
                    {debouncedInput && (
                        <CommandList>
                            {!isLoading && (
                                <CommandEmpty>No results found.</CommandEmpty>
                            )}

                            <CommandGroup heading="Results">
                                {results.map((result) => (
                                    <CommandItem
                                        key={result.place_id}
                                        value={result.description}
                                        onSelect={() => handleSelect(result)}
                                    >
                                        <span className="truncate">
                                            {result.description}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    )}
                </CommandDialog>
            </Command>
        </div>
    );
}
