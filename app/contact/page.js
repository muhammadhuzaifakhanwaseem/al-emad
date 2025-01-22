"use client"
import { Container, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import SiteLayout from '../components/Layouts/SiteLayout';

const ContactPage = () => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent!');
    };

    return (
        <SiteLayout>
            <Container>
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Your Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Your Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Your Message"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Container>
        </SiteLayout>
    );
};

export default ContactPage;
