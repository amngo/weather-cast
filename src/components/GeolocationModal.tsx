'use client';

import { getGeolocation } from '@/lib/api';
import { useDebounce } from '@/lib/hooks';
import { getFlagEmoji } from '@/lib/util';
import { GeoLocation } from '@/types';
import NiceModal from '@ebay/nice-modal-react';
import { Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

const GeolocationModal = NiceModal.create(() => {
    const modal = NiceModal.useModal();

    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 500);
    const [results, setResults] = useState<GeoLocation[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSelect = (result: GeoLocation) => {
        modal.resolve([
            result.latitude,
            result.longitude,
            result.name,
            result.timezone,
        ]);
        modal.hide();
    };

    useEffect(() => {
        // Reset results when modal is opened
        setInput('');
        setResults([]);
        // Clear any previous debounce timeout
        return () => {
            setInput('');
            setResults([]);
        };
    }, [modal.visible]);

    useEffect(() => {
        const getGeolocationResults = async () => {
            const response = await getGeolocation(debouncedInput);
            if (response && response.results) {
                setResults(response.results);
            } else {
                setResults([]);
            }
            console.log(response);
        };

        if (debouncedInput.trim() !== '' && debouncedInput.length > 1) {
            getGeolocationResults();
        } else {
            setResults([]);
        }
    }, [debouncedInput]);

    return (
        <AnimatePresence>
            {modal.visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
                    onClick={() => modal.hide()} // Close on overlay click
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        className="bg-white rounded-lg p-6 max-w-2xl w-full"
                        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
                    >
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={handleChange}
                                autoFocus
                                placeholder="Enter a town, city, state, or country"
                                className="w-full py-2 pl-10 pr-2 border border-gray-300 rounded"
                            />
                            <Search
                                size={18}
                                className="absolute left-3 top-3"
                            />
                        </div>
                        <div className="mt-4">
                            {results.length > 0 ? (
                                <ul className="space-y-2">
                                    {results.map((result) => (
                                        <li
                                            onClick={() => handleSelect(result)}
                                            key={result.id}
                                            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                                        >
                                            <div className="grid grid-cols-[min-content_1fr_1fr_1fr] gap-4 items-center justify-items-start overflow-hidden">
                                                <span className="text-2xl">
                                                    {getFlagEmoji(
                                                        result.country_code
                                                    )}
                                                </span>
                                                <div className="flex w-full truncate">
                                                    <strong className="truncate">
                                                        {result.name}
                                                    </strong>
                                                </div>

                                                <div className="flex w-full truncate">
                                                    <span className="truncate">
                                                        {result.admin1}
                                                    </span>
                                                </div>
                                                <div className="flex w-full truncate">
                                                    <span className="truncate">
                                                        {result.admin2}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">
                                    No results found
                                </p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

export default GeolocationModal;
