import HomeScreen from '@/components/Screens/HomeScreen';
import { Suspense } from 'react';

export default async function Home() {
    return (
        <Suspense>
            <HomeScreen />
        </Suspense>
    );
}
