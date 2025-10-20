import React from 'react';
import { Box, Container, Typography, Grid, Button, Card, CardContent, CardMedia, TextField } from '@mui/material';
import { SportsSoccer, SportsBasketball, SportsTennis, Pool, FitnessCenter, Star, StarHalf } from '@mui/icons-material';
import Banner from '../Banner/Banner';
import AboutClub from '../AboutClub/AboutClub';
import Location from '../Location/Location';
import Capons from '../Capons/Capons';

const membershipPlans = [
    { id: 1, name: 'Basic', price: 49, features: ['Access to gym', '2 classes/week', 'Basic facilities'] },
    { id: 2, name: 'Premium', price: 89, features: ['Unlimited access', 'All classes', 'Premium facilities', 'Personal trainer discount'] },
];


const Home = () => {
    const [email, setEmail] = React.useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Handle subscription logic here
        alert(`Thank you for subscribing with ${email}`);
        setEmail('');
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<Star key={i} color="warning" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<StarHalf key={i} color="warning" />);
            } else {
                stars.push(<Star key={i} color="disabled" />);
            }
        }
        return stars;
    };

    return (
        <div className="min-h-screen">
            <Banner></Banner>
            <AboutClub></AboutClub>
            <div className='bg-gradient-to-br from-gray-50 to-blue-100'>
                <Location></Location>
                <Capons></Capons>
            </div>
        </div >
    );
};

export default Home;