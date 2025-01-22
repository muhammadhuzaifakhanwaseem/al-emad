"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, TextField, Button } from "@mui/material";
import AuthGuard from "@/app/components/AuthGuard";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import Image from "next/image";
import axios from "axios";
import { useLoading } from '../../context/LoadingContext';
import SiteLayout from "@/app/components/Layouts/SiteLayout";
import DashboardHeader from "@/app/components/DashboardHeader";

const DashboardProfilePage = () => {
    const { setLoading } = useLoading();
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        mobile: "",
        mobile_code: "",
        country: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        image: "",
    });

    const fetchUserData = async (token) => {
        setLoading(true)
        try {

            if (!token) {
                throw new Error("Token not found. Please log in.");
            }
            const response = await axios.get("/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response?.data?.data?.fetch_status) {
                setUserData(response.data);
                setFormData({
                    firstname: response.data?.data?.user_info?.firstname || "",
                    lastname: response.data?.data?.user_info?.lastname || "",
                    username: response.data?.data?.user_info?.username || "",
                    email: response.data?.data?.user_info?.email || "",
                    mobile: response.data?.data?.user_info?.mobile || "",
                    mobile_code: response.data?.data?.user_info?.mobile_code || "",
                    country: response.data?.data?.user_info?.country || "",
                    city: response.data?.data?.user_info?.address?.city || "",
                    state: response.data?.data?.user_info?.address?.state || "",
                    zip: response.data?.data?.user_info?.address?.zip || "",
                    address: response.data?.data?.user_info?.address?.address || "",
                });
                setPreviewImage(
                    response.data?.data?.image_base_path + response.data?.data?.user_info?.image
                );
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError(err.message);
        }
    };

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("auth"));
        fetchUserData(localData?.token);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const localData = JSON.parse(localStorage.getItem("auth"));
            const token = localData?.token;

            if (!token) {
                throw new Error("Token not found. Please log in.");
            }

            const formDataToSend = new FormData();
            formDataToSend.append("firstname", formData.firstname);
            formDataToSend.append("lastname", formData.lastname);
            formDataToSend.append("username", formData.username);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("mobile", formData.mobile);
            formDataToSend.append("mobile_code", formData.mobile_code);
            formDataToSend.append("country", formData.country);
            formDataToSend.append("address", formData.address);
            formDataToSend.append("city", formData.city);
            formDataToSend.append("state", formData.state);
            formDataToSend.append("zip", formData.zip);

            // Append image if it exists
            if (document.getElementById("profile-image").files[0]) {
                const imageFile = document.getElementById("profile-image").files[0];
                formDataToSend.append("image", imageFile);
            }

            const response = await axios.post(
                "/api/user/profile/update",
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response?.data?.data?.update_status === true) {
                console.log(response?.data)
                localStorage.setItem("auth", JSON.stringify(response?.data?.data));
            } else {
                throw new Error(response?.data?.message || "Failed to update profile.");
            }
        } catch (err) {
            setError(err.message || "An error occurred.");
            console.error("Error updating profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const [previewImage, setPreviewImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [error, setError] = useState(null);

    return (
        <AuthGuard>
            <DashboardLayout>
                <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                    <DashboardHeader title="My Profile" />
                    {userData ? (
                        <form onSubmit={handleFormSubmit}>
                            <div className="row">
                                <div className="col-lg-4 text-center">
                                    <input
                                        id="profile-image"
                                        type="file"
                                        className="d-none"
                                        onChange={handleImageChange}
                                    />
                                    <label htmlFor="profile-image">
                                        <Image
                                            src={previewImage}
                                            alt="Profile Picture"
                                            className="rounded-circle object-fit-cover"
                                            width={150}
                                            height={150}
                                        />
                                    </label>
                                </div>
                                <div className="col-lg-8">
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Mobile Code"
                                        name="mobile_code"
                                        value={formData.mobile_code}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Mobile"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="City"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Zip"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                    <TextField
                                        fullWidth
                                        label="State"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginTop: 2 }}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        ""
                    )}
                </Box>
            </DashboardLayout>
        </AuthGuard>
    );
};

export default DashboardProfilePage;