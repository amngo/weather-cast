import { useAtom } from 'jotai';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { temperatureUnitAtom } from '@/atoms';
import { TemperatureUnit } from '@/types';

export default function TemperatureUnitSelect() {
    const [temperatureUnit, setTemperatureUnit] = useAtom(temperatureUnitAtom);

    return (
        <Select
            defaultValue="fahrenheit"
            onValueChange={(value: TemperatureUnit) =>
                setTemperatureUnit(value)
            }
            value={temperatureUnit}
        >
            <SelectTrigger className="w-auto glass">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="fahrenheit">
                        {'Temperature Unit (°F)'}
                    </SelectItem>
                    <SelectItem value="celsius">
                        {'Temperature Unit (°C)'}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
