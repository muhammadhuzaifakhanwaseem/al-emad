"use client";

import React from "react";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { usePathname } from "next/navigation";

const DashboardHeader = ({ title }) => {
    const pathname = usePathname();

    // Generate breadcrumbs based on the current path
    const generateBreadcrumbs = () => {
        const pathArray = pathname.split("/").filter((x) => x);
        return pathArray.map((path, index) => {
            const isLast = index === pathArray.length - 1;
            const linkPath = "/" + pathArray.slice(0, index + 1).join("/");
            const formattedPath = path.replace("-", " ").toUpperCase();

            return isLast ? (
                <Typography key={linkPath} color="text.primary">
                    {formattedPath}
                </Typography>
            ) : (
                <Link
                    key={linkPath}
                    href={linkPath}
                    color="inherit"
                    underline="hover"
                    sx={{ textTransform: "capitalize" }}
                >
                    {path.replace("-", " ")}
                </Link>
            );
        });
    };

    return (
        <Box sx={{ mb: 3 }}>
            {/* Page Title */}
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>

            {/* Breadcrumbs */}
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {generateBreadcrumbs()}
            </Breadcrumbs>
        </Box>
    );
};

export default DashboardHeader;
