"use client";
import { useEffect, useState } from 'react';
import { Container, CircularProgress, Typography, Button, Card, Chip, Tooltip, CardContent, Alert, Grid, Box, Pagination } from '@mui/material';
import CarCards from './components/carCards';
import { useSearchParams } from 'next/navigation';
import { useLoading } from './context/LoadingContext';
import SiteLayout from './components/Layouts/SiteLayout';
import { useApi } from "./context/ApiContext";
import { LocalGasStation, CalendarToday, AccessTime } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

const limit = 6;

const Home = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const { setLoading } = useLoading();

    const { getCars } = useApi();
    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [imageBasePath, setImageBasePath] = useState('');

    const [totalPages, setTotalPages] = useState(0);

    async function loadCars(page, limit) {
        try {
            const response = await getCars(page, limit);
            const { cars: carsData, total } = response.data.cars || {};
            setCars(carsData || []);
            setImageBasePath(`${response?.data?.cars?.base_url}/${response?.data?.cars?.image_path}/`);
            setTotalPages(Math.ceil(response?.data?.cars?.total / limit));
        } catch (error) {
            console.error("Error loading cars:", error);
        }
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        loadCars(value, limit);
    };

    useEffect(() => {
        loadCars(currentPage, limit);
    }, [currentPage]); // Trigger API call when page or page size changes

    return (
        <SiteLayout>
            <Box sx={{ position: 'relative', pt: 5, pb: 3, px: 2 }}>
                {/* Message Alert */}
                {message && <Alert severity="success" sx={{ position: 'absolute', top: 10, right: 10, width: 'auto' }}>{message}</Alert>}

                {/* Hero Section */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Car Rentals Made Easy
                    </Typography>
                    <Typography variant="h2" color="textSecondary" sx={{ mb: 3 }}>
                        Find the perfect car for your journey
                    </Typography>
                    <Button variant="contained" color="primary" size="large">
                        Browse Our Fleet
                    </Button>
                </Box>
                {cars?.length === 0 ? (
                    ""
                ) : (
                    <Grid container spacing={4}>
                        {cars.map((car, index) => (
                            <Grid item={true} xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ boxShadow: 3, borderRadius: 2, '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }, transition: '0.3s ease' }}>
                                    <CardContent>
                                        {/* Car Features */}
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Chip label={car.fuel_type} color="primary" size="small" icon={<LocalGasStation />} sx={{ fontWeight: 'bold' }} />
                                            <Tooltip title="Car availability" placement="top">
                                                <Chip label={car.is_available ? 'Available' : 'Not Available'} color={car.is_available ? 'success' : 'error'} size="small" />
                                            </Tooltip>
                                        </Box>

                                        {/* Car Image */}
                                        <Image
                                            src={imageBasePath + car.image}
                                            alt={car.car_name}
                                            width={450}
                                            height={270}
                                            style={{
                                                width: '100%',
                                                objectFit: 'cover',
                                                marginTop: 8
                                            }}
                                        />

                                        {/* Car Name */}
                                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                                            {car.car_name}
                                        </Typography>

                                        {/* Car Model */}
                                        <Typography variant="body1" color="textSecondary">
                                            {car.car_model}
                                        </Typography>

                                        {/* Pricing */}
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="body2" color="textPrimary" fontWeight="bold">
                                                Pricing
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Daily
                                                    </Typography>
                                                    <Typography variant="body2" color="textPrimary">
                                                        ${JSON.parse(car.pricing)?.daily?.current_price}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Weekly
                                                    </Typography>
                                                    <Typography variant="body2" color="textPrimary">
                                                        ${JSON.parse(car.pricing)?.weekly?.current_price}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Monthly
                                                    </Typography>
                                                    <Typography variant="body2" color="textPrimary">
                                                        ${JSON.parse(car.pricing)?.monthly?.current_price}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                        {/* Action Button */}
                                        <Link href={`/car/${car.id}`}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                sx={{ mt: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
                                                endIcon={<AccessTime />}
                                            >
                                                View Details
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
            <div className='container'>
                <div className='row justify-content-center'>
                    <Pagination
                        count={totalPages} // Total pages
                        page={currentPage} // Current page
                        onChange={handlePageChange} // Handle page change
                        color="primary"
                        size="large"
                        shape="circular"
                    />
                </div>
            </div>

        </SiteLayout>
    );
};

export default Home;
