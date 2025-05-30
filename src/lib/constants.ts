export const WEATHER_CODES: {
    [code: number]: {
        day: { description: string; image: string };
        night: { description: string; image: string };
    };
} = {
    0: {
        day: { description: 'Clear', image: '/assets/icons/0-day.svg' },
        night: { description: 'Clear', image: '/assets/icons/0-night.svg' },
    },
    1: {
        day: { description: 'Mainly Clear', image: '/assets/icons/1-day.svg' },
        night: {
            description: 'Mainly Clear',
            image: '/assets/icons/1-night.svg',
        },
    },
    2: {
        day: { description: 'Partly Cloudy', image: '/assets/icons/2-day.svg' },
        night: {
            description: 'Partly Cloudy',
            image: '/assets/icons/2-night.svg',
        },
    },
    3: {
        day: { description: 'Cloudy', image: '/assets/icons/3.svg' },
        night: { description: 'Cloudy', image: '/assets/icons/3.svg' },
    },
    45: {
        day: { description: 'Foggy', image: '/assets/icons/45.svg' },
        night: { description: 'Foggy', image: '/assets/icons/45.svg' },
    },
    48: {
        day: { description: 'Rime Fog', image: '/assets/icons/45.svg' },
        night: { description: 'Rime Fog', image: '/assets/icons/45.svg' },
    },
    51: {
        day: { description: 'Light Drizzle', image: '/assets/icons/51.svg' },
        night: { description: 'Light Drizzle', image: '/assets/icons/51.svg' },
    },
    53: {
        day: { description: 'Drizzle', image: '/assets/icons/51.svg' },
        night: { description: 'Drizzle', image: '/assets/icons/51.svg' },
    },
    55: {
        day: { description: 'Heavy Drizzle', image: '/assets/icons/51.svg' },
        night: { description: 'Heavy Drizzle', image: '/assets/icons/51.svg' },
    },
    56: {
        day: {
            description: 'Light Freezing Drizzle',
            image: '/assets/icons/51.svg',
        },
        night: {
            description: 'Light Freezing Drizzle',
            image: '/assets/icons/51.svg',
        },
    },
    57: {
        day: { description: 'Freezing Drizzle', image: '/assets/icons/51.svg' },
        night: {
            description: 'Freezing Drizzle',
            image: '/assets/icons/51.svg',
        },
    },
    61: {
        day: { description: 'Light Rain', image: '/assets/icons/61.svg' },
        night: { description: 'Light Rain', image: '/assets/icons/61.svg' },
    },
    63: {
        day: { description: 'Rain', image: '/assets/icons/61.svg' },
        night: { description: 'Rain', image: '/assets/icons/61.svg' },
    },
    65: {
        day: { description: 'Heavy Rain', image: '/assets/icons/65.svg' },
        night: { description: 'Heavy Rain', image: '/assets/icons/65.svg' },
    },
    66: {
        day: {
            description: 'Light Freezing Rain',
            image: '/assets/icons/65.svg',
        },
        night: {
            description: 'Light Freezing Rain',
            image: '/assets/icons/65.svg',
        },
    },
    67: {
        day: { description: 'Freezing Rain', image: '/assets/icons/65.svg' },
        night: { description: 'Freezing Rain', image: '/assets/icons/65.svg' },
    },
    71: {
        day: { description: 'Light Snow', image: '/assets/icons/71.svg' },
        night: { description: 'Light Snow', image: '/assets/icons/71.svg' },
    },
    73: {
        day: { description: 'Snow', image: '/assets/icons/71.svg' },
        night: { description: 'Snow', image: '/assets/icons/71.svg' },
    },
    75: {
        day: { description: 'Heavy Snow', image: '/assets/icons/71.svg' },
        night: { description: 'Heavy Snow', image: '/assets/icons/71.svg' },
    },
    77: {
        day: { description: 'Snow Grains', image: '/assets/icons/77.svg' },
        night: { description: 'Snow Grains', image: '/assets/icons/77.svg' },
    },
    80: {
        day: { description: 'Light Showers', image: '/assets/icons/65.svg' },
        night: { description: 'Light Showers', image: '/assets/icons/65.svg' },
    },
    81: {
        day: { description: 'Showers', image: '/assets/icons/65.svg' },
        night: { description: 'Showers', image: '/assets/icons/65.svg' },
    },
    82: {
        day: { description: 'Heavy Showers', image: '/assets/icons/65.svg' },
        night: { description: 'Heavy Showers', image: '/assets/icons/65.svg' },
    },
    85: {
        day: {
            description: 'Light Snow Showers',
            image: '/assets/icons/85.svg',
        },
        night: {
            description: 'Light Snow Showers',
            image: '/assets/icons/85.svg',
        },
    },
    86: {
        day: { description: 'Snow Showers', image: '/assets/icons/86.svg' },
        night: { description: 'Snow Showers', image: '/assets/icons/86.svg' },
    },
    95: {
        day: { description: 'Thunderstorm', image: '/assets/icons/95.svg' },
        night: { description: 'Thunderstorm', image: '/assets/icons/95.svg' },
    },
    96: {
        day: {
            description: 'Light Thunderstorms With Hail',
            image: '/assets/icons/97.svg',
        },
        night: {
            description: 'Light Thunderstorms With Hail',
            image: '/assets/icons/97.svg',
        },
    },
    97: {
        day: {
            description: 'Thunderstorm With Rain',
            image: '/assets/icons/97.svg',
        },
        night: {
            description: 'Thunderstorm With Rain',
            image: '/assets/icons/97.svg',
        },
    },
    99: {
        day: {
            description: 'Thunderstorm With Hail',
            image: '/assets/icons/97.svg',
        },
        night: {
            description: 'Thunderstorm With Hail',
            image: '/assets/icons/97.svg',
        },
    },
};
