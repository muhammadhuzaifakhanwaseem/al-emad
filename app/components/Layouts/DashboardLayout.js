"use client";

import React, { useState } from "react";
import { 
    Box, 
    Typography, 
    Divider, 
    Container, 
    Drawer, 
    List, 
    ListItem, 
    ListItemText, 
    IconButton, 
    AppBar, 
    Toolbar 
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const menuItems = [
        { text: "My Bookings", path: "/dashboard/bookings" },
        { text: "Profile", path: "/dashboard/profile" },
        { text: "Change Password", path: "/dashboard/password-change" },
        { text: "Home", path: "/" },
    ];

    return (
        <Container maxWidth="xl" style={{ height: "100vh", padding: 0 }}>
            {/* AppBar for Mobile */}
            <AppBar position="fixed" color="primary" sx={{ display: { lg: "none" } }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleSidebarToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Drawer
                variant="temporary"
                open={isSidebarOpen}
                onClose={handleSidebarToggle}
                sx={{
                    display: { xs: "block", lg: "none" },
                    "& .MuiDrawer-paper": { width: 250 },
                }}
            >
                <Box p={2}>
                    <IconButton onClick={handleSidebarToggle} sx={{ mb: 2 }}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h5" mb={2}>
                        Dashboard
                    </Typography>
                    <Divider />
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                key={item.text}
                                button
                                component={Link}
                                href={item.path}
                                sx={{
                                    color: router.pathname === item.path ? "primary.main" : "inherit",
                                    fontWeight: router.pathname === item.path ? "bold" : "normal",
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Permanent Sidebar for Larger Screens */}
            <Box
                sx={{
                    display: { xs: "none", lg: "block" },
                    width: "250px",
                    position: "fixed",
                    height: "100vh",
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    padding: 2,
                }}
            >
                <Typography variant="h5" mb={2}>
                    Dashboard
                </Typography>
                <Divider />
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            button
                            component={Link}
                            href={item.path}
                            sx={{
                                color: router.pathname === item.path ? "primary.main" : "inherit",
                                fontWeight: router.pathname === item.path ? "bold" : "normal",
                            }}
                        >
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    marginLeft: { lg: "250px" },
                    padding: 0,
                    marginTop: { xs: 8, lg: 0 }, // Adjust margin for AppBar on mobile
                }}
            >
                {children}
            </Box>
        </Container>
    );
};

export default DashboardLayout;
