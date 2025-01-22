'use client';
import React, { useEffect, useState } from "react";
import {
    Box, TextField, Button, Typography, MenuItem, Alert,
} from "@mui/material";
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useLoading } from '../context/LoadingContext';
import Link from "next/link";

export default function RegisterPage() {

    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem('auth'));
        if (isLoggedIn?.token) {
            router.push('/');
        }
    }, [router]);

    const { setLoading } = useLoading();

    const [responseMessage, setResponseMessage] = useState()
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        mobile_code: "",
        phone: "",
        password: "",
        // address: { "state": "", "city": "", "zip": "", "address": "" },
        address: "",
        country: "",
        agree: "on",
    });

    const countries = [
        { code: "USA", name: "United States" },
        { code: "Pakistan", name: "Pakistan" },
        { code: "INDIA", name: "India" },
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit() {
        setResponseMessage('')
        setLoading(true);
        try {
            const formData1 = new FormData();
            formData1.append('firstname', formData.firstname);
            formData1.append('lastname', formData.lastname);
            formData1.append('email', formData.email);
            formData1.append('password', formData.password);
            formData1.append('country', formData.country);
            formData1.append('credentials', formData.email);
            formData1.append('mobile_code', formData.mobile_code);
            formData1.append('phone', formData.phone);
            formData1.append('agree', 'on');
            formData1.append('username', formData.username);

            const response = await axios.post('/api/register', formData1, {
                headers: { 'Content-Type': 'multipart/form-data' },
                redirect: "follow",
                body: formData1,
            });

            setResponseMessage(response?.data?.message?.success);
            if (response?.data?.data?.register_status == true) {
                setTimeout(() => {
                    router.push(`/login?email=${encodeURIComponent(formData.email)}`);
                }, 3000);
            }
        } catch (error) {
            console.log('Error:', error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">

            <div className="p-2 rounded position-fixed top-0 end-0 m-3">
                {responseMessage && responseMessage.map((item, index) => (
                    <Alert className="mb-2" severity="info" key={index}>{item}</Alert>
                ))}
            </div>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "white",
                }}
            >
                <Typography variant="h4" gutterBottom align="center">
                    Register
                </Typography>
                <div className="row">
                    <div className="mb-3 col-lg-6">
                        <TextField
                            label="First Name"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </div>
                    <div className="mb-3 col-lg-6">
                        <TextField
                            label="Last Name"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </div>
                    <div className="mb-3 col-lg-6">
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </div>
                    <div className="mb-3 col-lg-6">
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            type="email"
                        />
                    </div>
                    <div className="mb-3 col-lg-6">
                        <TextField
                            type="number"
                            label="Mobile Code"
                            name="mobile_code"
                            value={formData.mobile_code}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </div>
                    <div className="mb-3 col-lg-6">
                        <TextField
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            fullWidth
                            type="number"
                        />
                    </div>
                    <div className="mb-3 col-lg-6">
                        <TextField
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            fullWidth
                            type="password"
                        />
                    </div>
                    <div className="mb-3 col-lg-6">
                        <TextField
                            select
                            label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            fullWidth
                        >
                            {countries.map((country) => (
                                <MenuItem key={country.code} value={country.code}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div lg={12} className="mb-3 col">
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={2}
                        />
                    </div>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    Register
                </Button>
                <small className="d-block mt-3">Already have an account? <Link href="/login">Login</Link></small>
            </Box>
        </div>
    );
}