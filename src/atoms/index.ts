import { IWeatherData, TemperatureUnit } from '@/types';
import { atom } from 'jotai';

export const weatherDataAtom = atom<IWeatherData>();
export const loadingAtom = atom<boolean>(false);
export const locationAtom = atom<{
    name: string;
    placeId: string;
    lat: number;
    lng: number;
}>({
    name: 'Current Location',
    placeId: '',
    lat: 0,
    lng: 0,
});

export const temperatureUnitAtom = atom<TemperatureUnit>('fahrenheit');
export const timezoneAtom = atom<string>('PST');
