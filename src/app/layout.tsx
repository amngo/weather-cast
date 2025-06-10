import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import QueryProvider from '@/lib/QueryProvider';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Weather Cast',
    description:
        'Weather Cast is a weather application that provides current weather conditions, forecasts, and air quality information for any location worldwide. It uses the Open-Meteo API to deliver accurate and up-to-date weather data.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${inter.variable} ${outfit.variable} antialiased`}
            >
                <main className="max-w-[1250px] mx-auto relative h-full">
                    <QueryProvider>{children}</QueryProvider>
                </main>
                <Analytics />
            </body>
        </html>
    );
}
