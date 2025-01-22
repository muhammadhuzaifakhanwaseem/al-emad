"use client"
import { useEffect, useState } from 'react';
import BookingFormModal from '../components/BookingFormModal';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useSearchParams } from 'next/navigation';
import SiteLayout from '../components/Layouts/SiteLayout';
import AuthGuard from '../components/AuthGuard';
const BokingPage = () => {

    const searchParams = useSearchParams();

    const carSlug = searchParams.get('carSlug');
    const carId = searchParams.get('carId');
    const carName = searchParams.get('carName');
    const carModel = searchParams.get('carModel');

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <AuthGuard>
            <SiteLayout>
                <LocalizationProvider className="w-100" dateAdapter={AdapterDayjs}>
                    {
                        carSlug && carId && carName && carModel ? (
                            <BookingFormModal
                                className="w-100"
                                carSlug={carSlug}
                                carId={carId}
                                carName={carName}
                                carModel={carModel}
                            />
                        ) : (
                            "Required Parameter Is Not Fetched. Please Try Again."
                        )
                    }
                </LocalizationProvider>
            </SiteLayout>
        </AuthGuard>
    );
};

export default BokingPage;
