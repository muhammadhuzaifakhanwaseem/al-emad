"use client";

import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import axios from "axios";

const PasswordChange = () => {
    const [formData, setFormData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear field-specific error
        setFormErrors((prev) => ({ ...prev, [name]: null }));
    };

    // Validate form
    const validateForm = () => {
        const errors = {};
        if (!formData.current_password) {
            errors.current_password = "Current password is required.";
        }
        if (formData.password.length < 8) {
            errors.password = "New password must be at least 8 characters long.";
        }
        if (formData.password !== formData.password_confirmation) {
            errors.password_confirmation = "Passwords do not match.";
        }
        return errors;
    };

    // Handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validate inputs
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setLoading(true);

        const localData = JSON.parse(localStorage.getItem("auth"));
        const token = localData?.token;

        if (!token) {
            setError("Token not found. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "/api/user/password/update",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setSuccess("Password changed successfully!");
                setFormData({
                    current_password: "",
                    password: "",
                    password_confirmation: "",
                });
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}

            <TextField
                fullWidth
                type="password"
                label="Current Password"
                name="current_password"
                value={formData.current_password}
                onChange={handleInputChange}
                required
                margin="normal"
                error={!!formErrors.current_password}
                helperText={formErrors.current_password}
            />
            <TextField
                fullWidth
                type="password"
                label="New Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                margin="normal"
                error={!!formErrors.password}
                helperText={formErrors.password}
            />
            <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                required
                margin="normal"
                error={!!formErrors.password_confirmation}
                helperText={formErrors.password_confirmation}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
                sx={{ mt: 2 }}
            >
                {loading ? "Changing Password..." : "Change Password"}
            </Button>
        </form>
    );
};

export default PasswordChange;
