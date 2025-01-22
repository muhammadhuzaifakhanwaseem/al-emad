"use client"
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useLoading } from '../context/LoadingContext';
import Link from "next/link";
export default function LoginPage() {

    const router = useRouter();
    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem('auth'));
        if (isLoggedIn?.token) {
            router.push('/');
        }
    }, [router]);

    const { setLoading } = useLoading();
    const [responseMessage, setResponseMessage] = useState()

    const searchParams = useSearchParams();
    const pmail = searchParams.get('email');

    const [formData, setFormData] = useState({
        credentials: pmail ? pmail : "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    async function loginUser(credentials, password) {
        setLoading(true);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credentials, password }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();
            const loginData = data;
            setResponseMessage(loginData?.message?.success);
            if (loginData?.data?.login_status) {
                localStorage.setItem('auth', JSON.stringify(loginData.data))
                router.push(`/?message=${encodeURIComponent('You Have Successfully Logged In!')}`);
            } else {

            }
        } catch (error) {
            console.error('Login error:', error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const credentials = formData.credentials;
        const password = formData.password;
        await loginUser(credentials, password);
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
            <div className="p-2 rounded position-fixed top-0 end-0 m-3">
                {responseMessage && responseMessage.map((item, index) => (
                    <Alert className="mb-2" severity="info" key={index}>{item}</Alert>
                ))}
            </div>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "white",
                }}
            >
                {pmail ?
                    <Alert className="position-absolute top-0 end-0 m-3">You Have Successfully Registered! Please Enter Password To Login Your Account</Alert>
                    : ""}
                <Typography variant="h4" gutterBottom align="center">
                    Login
                </Typography>
                <TextField
                    label="Email"
                    name="credentials"
                    value={formData.credentials}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    type="email"
                />

                <TextField
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    type="password"
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    Login
                </Button>
                <small className="d-block mt-3">Don't have an account? <Link href="/register">Register</Link></small>
            </Box>
        </div>
    );
};
