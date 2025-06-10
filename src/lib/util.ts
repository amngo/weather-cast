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

export function getDateFromUnixTimestamp(
    unixTimestamp: number,
    timeZone = 'UTC'
) {
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

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}
