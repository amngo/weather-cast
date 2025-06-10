import { useAtom } from 'jotai';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { timezoneAtom } from '@/atoms';

export default function TimezoneSelect() {
    const [timezone, setTimezone] = useAtom(timezoneAtom);

    // const getTimeZoneAbbreviation = () => {
    //     const date = new Date();
    //     const parts = Intl.DateTimeFormat('en-US', {
    //         timeZoneName: 'short',
    //     }).formatToParts(date);

    //     const tzPart = parts.find((part) => part.type === 'timeZoneName');
    //     return tzPart?.value || 'UTC';
    // };

    return (
        <Select
            defaultValue="PST"
            onValueChange={(value) => setTimezone(value)}
            value={timezone}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    <SelectItem value="EST">
                        Eastern Standard Time (EST)
                    </SelectItem>
                    <SelectItem value="CST">
                        Central Standard Time (CST)
                    </SelectItem>
                    <SelectItem value="MST">
                        Mountain Standard Time (MST)
                    </SelectItem>
                    <SelectItem value="PST">
                        Pacific Standard Time (PST)
                    </SelectItem>
                    <SelectItem value="AKST">
                        Alaska Standard Time (AKST)
                    </SelectItem>
                    <SelectItem value="HST">
                        Hawaii Standard Time (HST)
                    </SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Europe & Africa</SelectLabel>
                    <SelectItem value="GMT">
                        Greenwich Mean Time (GMT)
                    </SelectItem>
                    <SelectItem value="CET">
                        Central European Time (CET)
                    </SelectItem>
                    <SelectItem value="EET">
                        Eastern European Time (EET)
                    </SelectItem>
                    <SelectItem value="WEST">
                        Western European Summer Time (WEST)
                    </SelectItem>
                    <SelectItem value="CAT">
                        Central Africa Time (CAT)
                    </SelectItem>
                    <SelectItem value="EAT">East Africa Time (EAT)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Asia</SelectLabel>
                    <SelectItem value="MSK">Moscow Time (MSK)</SelectItem>
                    <SelectItem value="IST">
                        India Standard Time (IST)
                    </SelectItem>
                    <SelectItem value="CST_CHINA">
                        China Standard Time (CST)
                    </SelectItem>
                    <SelectItem value="JST">
                        Japan Standard Time (JST)
                    </SelectItem>
                    <SelectItem value="KST">
                        Korea Standard Time (KST)
                    </SelectItem>
                    <SelectItem value="IST_INDONESIA">
                        Indonesia Central Standard Time (WITA)
                    </SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Australia & Pacific</SelectLabel>
                    <SelectItem value="AWST">
                        Australian Western Standard Time (AWST)
                    </SelectItem>
                    <SelectItem value="ACST">
                        Australian Central Standard Time (ACST)
                    </SelectItem>
                    <SelectItem value="AEST">
                        Australian Eastern Standard Time (AEST)
                    </SelectItem>
                    <SelectItem value="NZST">
                        New Zealand Standard Time (NZST)
                    </SelectItem>
                    <SelectItem value="FJT">Fiji Time (FJT)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>South America</SelectLabel>
                    <SelectItem value="ART">Argentina Time (ART)</SelectItem>
                    <SelectItem value="BOT">Bolivia Time (BOT)</SelectItem>
                    <SelectItem value="BRT">Brasilia Time (BRT)</SelectItem>
                    <SelectItem value="CLT">
                        Chile Standard Time (CLT)
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
