export function getWeekdayFromTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
}

export function isDaytime(unixTimestamp: number, timeZone = 'UTC') {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone,
    });

    const localHour = parseInt(formatter.format(date), 10);

    // Define "daytime" between 6 AM and 6 PM
    return localHour >= 6 && localHour < 18;
}

export function getTimeOfDay(unixTimestamp: number, timeZone = 'UTC') {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone,
    });

    const hour = parseInt(formatter.format(date), 10);

    if (hour >= 5 && hour < 12) {
        return 'morning';
    } else if (hour === 12) {
        return 'noon';
    } else if (hour > 12 && hour < 17) {
        return 'afternoon';
    } else if (hour >= 17 && hour < 21) {
        return 'evening';
    } else {
        return 'night';
    }
}

export function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export function getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export function getCurrentFormattedTimeInTimeZone(timeZone = 'UTC') {
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone,
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(new Date());
}

export function getDateFromUnixTimestamp(unixTimestamp: number, timeZone = 'UTC') {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone,
    };
    return date.toLocaleDateString('en-US', options);
}

export function getWeatherClass(
    weatherCode: number,
    timeOfDay: 'morning' | 'noon' | 'afternoon' | 'evening' | 'night'
): string {
    switch (weatherCode) {
        case 0:
        case 1:
        case 2:
            return timeOfDay;
    }

    const weatherClasses: Record<number, string> = {
        2: 'cloudy',
        3: 'cloudy',
        45: 'foggy',
        48: 'foggy',
        51: 'raining',
        53: 'raining',
        55: 'raining',
        56: 'raining',
        57: 'raining',
        61: 'raining',
        63: 'raining',
        65: 'raining',
        66: 'raining',
        67: 'raining',
        71: 'snowing',
        73: 'snowing',
        75: 'snowing',
        77: 'snowing',
        80: 'raining',
        81: 'raining',
        82: 'raining',
        85: 'snowing',
        86: 'snowing',
        95: 'thunderstorm',
        96: 'thunderstorm',
        99: 'thunderstorm',
    };

    return weatherClasses[weatherCode] || '';
}
