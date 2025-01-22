"use client"
import React from 'react';
import { CircularProgress } from '@mui/material';
import { useLoading } from '../context/LoadingContext';

export default function Loading() {
    const { loading } = useLoading();

    if (!loading) return null; // Don't render anything if not loading

    return (
        <div style={styles.overlay}>
            {/* You can choose either MUI CircularProgress or Bootstrap Spinner */}
            <CircularProgress style={styles.spinner} />
            {/* Or use Bootstrap's spinner: */}
            {/* <Spinner animation="border" style={styles.spinner} /> */}
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    spinner: {
        width: '50px',
        height: '50px',
    },
};
