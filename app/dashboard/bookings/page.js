"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Avatar, Divider, Chip, IconButton } from "@mui/material";
import { useLoading } from '../../context/LoadingContext';
import axios from "axios";
import SiteLayout from "@/app/components/Layouts/SiteLayout";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import DashboardHeader from "@/app/components/DashboardHeader";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DoneIcon from "@mui/icons-material/Done";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const DashboardBookingsPage = () => {
    const { setLoading } = useLoading();
    const [bookings, setBookings] = useState();
    const fetchBookings = async (token) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error("Token not found. Please log in.");
            }
            const response = await axios.get("/api/my/bookings", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response?.data) {
                setBookings(response?.data);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("auth"));
        fetchBookings(localData?.token);
    }, []);

    return (
        <DashboardLayout>
            <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                <DashboardHeader title="My Bookings" />
                <Grid container spacing={3}>
                    {bookings?.data?.map((booking) => (
                        <Grid item xs={12} sm={6} md={4} key={booking.id}>
                            <Card
                                sx={{
                                    boxShadow: 3,
                                    transition: "transform 0.2s ease",
                                    "&:hover": {
                                        transform: "scale(1.02)",
                                    },
                                }}
                            >
                                <CardContent>
                                    {/* Booking ID */}
                                    <Typography variant="h6" gutterBottom color="primary">
                                        Booking ID: {booking.id}
                                    </Typography>

                                    {/* User Info */}
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Avatar
                                            src={booking.user.userImage}
                                            alt={booking.user.fullname}
                                            sx={{ width: 60, height: 60, marginRight: 2 }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle1">{booking.user.fullname}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {booking.user.email}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Car Details */}
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <DirectionsCarIcon sx={{ marginRight: 1 }} />
                                        <Typography variant="body1" fontWeight="bold" mr={2}>
                                            {booking.cars.car_name}
                                        </Typography>
                                        <Chip label={booking.cars.car_model} color="info" size="small" />
                                    </Box>

                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Engine:</strong> {booking.cars.engine_size} | {booking.cars.transmission}
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />

                                    {/* Booking Dates */}
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <CalendarTodayIcon sx={{ marginRight: 1 }} />
                                        <Typography variant="body1" mr={2}>
                                            <strong>Start Date:</strong>{" "}
                                            {new Date(booking.start_date).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>End Date:</strong>{" "}
                                            {new Date(booking.end_date).toLocaleDateString()}
                                        </Typography>
                                    </Box>

                                    {/* Status */}
                                    <Box display="flex" alignItems="center" mb={2}>
                                        {booking.status === 0 ? (
                                            <Chip
                                                label="Pending"
                                                color="warning"
                                                icon={<PendingActionsIcon />}
                                            />
                                        ) : (
                                            <Chip
                                                label="Completed"
                                                color="success"
                                                icon={<DoneIcon />}
                                            />
                                        )}
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    {/* Contact & Address */}
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <LocationOnIcon sx={{ marginRight: 1 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Address:</strong> {booking.address}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center" mb={2}>
                                        <PhoneIcon sx={{ marginRight: 1 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Phone:</strong> {booking.phone}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </DashboardLayout>
    );
};

export default DashboardBookingsPage;
