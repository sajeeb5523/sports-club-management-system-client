import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // basic validation
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setStatus({ type: 'error', text: 'Please fill in all fields.' });
            return;
        }
        // placeholder submit action
        console.log('Contact form submitted', form);
        setStatus({ type: 'success', text: 'Message sent. We will contact you soon.' });
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-100">
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Box sx={{ mb: -1, textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Get in Touch
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph>
                        Have a question or want to join an event? Send us a message and we'll get back to you.
                    </Typography>
                </Box>

                <div className='mt-10'>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
                        {status && (
                            <Alert severity={status.type} onClose={() => setStatus(null)}>
                                {status.text}
                            </Alert>
                        )}

                        <TextField
                            label="Full name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email address"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            required
                        />

                        <Box sx={{ textAlign: 'right' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Send Message
                            </Button>
                        </Box>
                    </Box>
                </div>

            </Container>
        </div>
    );
};

export default Contact;