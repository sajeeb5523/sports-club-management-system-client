import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const Events = () => {
    const events = [
        {
            id: 1,
            title: "Summer Football League",
            date: "November 15, 2025",
            image: "https://i.ibb.co.com/tpDsQszb/Summer-Football-League.webp",
            description: "Join our premier football league featuring weekly matches and professional coaching sessions for all skill levels."
        },
        {
            id: 2,
            title: "Elite Swimming Championship",
            date: "December 1, 2025",
            image: "https://i.ibb.co.com/v6SF3mTf/Elite-Swimming-Championship.jpg",
            description: "Compete in our championship with 50m and 100m freestyle, backstroke, and butterfly events. Open to all age groups."
        },
        {
            id: 3,
            title: "Grand Slam Tennis Open",
            date: "December 10, 2025",
            image: "https://i.ibb.co.com/ycMGn5Xr/Grand-Slam-Tennis-Open.jpg",
            description: "Experience the thrill of competitive tennis in our open tournament. Singles and doubles categories available."
        },
        {
            id: 4,
            title: "Basketball Pro-Am",
            date: "January 5, 2026",
            image: "https://i.ibb.co.com/0p1ChVJc/Basketball-Pro-Am.jpg",
            description: "Showcase your basketball skills in our professional-amateur tournament with cash prizes for top performers."
        },
        {
            id: 5,
            title: "Marathon Challenge",
            date: "January 20, 2026",
            image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Test your endurance in our annual marathon through scenic routes with full medical support and hydration stations."
        },
        {
            id: 6,
            title: "Badminton Premier League",
            date: "February 1, 2026",
            image: "https://i.ibb.co.com/Jjj0xf5H/Badminton-Premier-League.jpg",
            description: "Join our badminton league featuring singles and doubles matches with professional scoring and officiating."
        }
    ];

    return (
        <div className="container mx-auto px-6 bg-gradient-to-br from-gray-50 to-blue-100">
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ mb: -1, textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Exciting Sports Events
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph>
                        Join our upcoming tournaments and competitions. Register now to secure your spot!
                    </Typography>
                </Box>
            </Container>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-2">
                {events.map(event => (
                    <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 mb-8">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{event.date}</p>
                            <p className="text-gray-700 mb-4">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;