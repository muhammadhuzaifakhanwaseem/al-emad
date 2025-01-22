"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }) {
    const router = useRouter();
    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem('auth'));
        if (!isLoggedIn || !isLoggedIn.token) {
            router.push('/login');
        }
    }, [router]);

    return <>{children}</>;
}
