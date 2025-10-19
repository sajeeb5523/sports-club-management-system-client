import React, { useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, TextField, MenuItem, Box } from '@mui/material';
import { SportsSoccer, SportsBasketball, SportsTennis, FitnessCenter, Pool, SportsVolleyball } from '@mui/icons-material';

const activities = [
    {
        id: 1,
        title: 'Football',
        description: 'Join our football sessions for all skill levels. Improve your skills and have fun!',
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
        category: 'team',
        duration: '90 mins',
        difficulty: 'All Levels'
    },
    {
        id: 2,
        title: 'Basketball',
        description: 'Fast-paced basketball games and training sessions with experienced coaches.',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
        category: 'team',
        duration: '60 mins',
        difficulty: 'Intermediate'
    },
    {
        id: 3,
        title: 'Tennis',
        description: 'Private and group tennis lessons for players of all ages and abilities.',
        image: 'https://i.ibb.co.com/tp2K4kYN/tenis.jpg',
        category: 'individual',
        duration: '60 mins',
        difficulty: 'All Levels'
    },
    {
        id: 4,
        title: 'Swimming',
        description: 'Swimming lessons and free swim sessions in our Olympic-sized pool.',
        image: 'https://i.ibb.co.com/PswncTD4/swimming.jpg',
        category: 'individual',
        duration: '45 mins',
        difficulty: 'Beginner'
    },
    {
        id: 5,
        title: 'Gym & Fitness',
        description: 'State-of-the-art gym facilities with personal training available.',
        image: 'https://i.ibb.co.com/wZxSYG35/Gym-Fitness.jpg',
        category: 'fitness',
        duration: 'Flexible',
        difficulty: 'All Levels'
    },
    {
        id: 6,
        title: 'Volleyball',
        description: 'Beach and indoor volleyball leagues and open play sessions.',
        image: 'https://i.ibb.co.com/8LvXK6d8/volleyball.jpg',
        category: 'team',
        duration: '90 mins',
        difficulty: 'Intermediate'
    }
];

const categories = [
    { value: 'all', label: 'All Activities' },
    { value: 'team', label: 'Team Sports' },
    { value: 'individual', label: 'Individual Sports' },
    { value: 'fitness', label: 'Fitness' },
];

const difficultyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
];

const getCategoryIcon = (category) => {
    switch (category) {
        case 'team':
            return <SportsSoccer />;
        case 'individual':
            return <SportsTennis />;
        case 'fitness':
            return <FitnessCenter />;
        case 'swimming':
            return <Pool />;
        case 'basketball':
            return <SportsBasketball />;
        case 'volleyball':
            return <SportsVolleyball />;
        default:
            return <FitnessCenter />;
    }
};

const Activities = () => {
    const [category, setCategory] = useState('all');
    const [difficulty, setDifficulty] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredActivities = activities.filter(activity => {
        const matchesCategory = category === 'all' || activity.category === category;
        const matchesDifficulty = difficulty === 'all' || activity.difficulty === difficulty;
        const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesDifficulty && matchesSearch;
    });

    return (

        <div className="bg-gradient-to-br from-gray-50 to-blue-100">
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Our Activities
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph>
                        Discover and join our wide range of sports and fitness activities
                    </Typography>
                </Box>

                <Box sx={{
                    mb: 4,
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                    gap: 2,
                    maxWidth: '1000px',
                    mx: 'auto',
                    px: 2
                }}>
                    <Box sx={{ width: '100%' }}>
                        <TextField
                            select
                            fullWidth
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                }
                            }}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Box sx={{ width: '100%' }}>
                        <TextField
                            select
                            fullWidth
                            label="Difficulty"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                }
                            }}
                        >
                            {difficultyLevels.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Box sx={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Search activities..."
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                }
                            }}
                        />
                    </Box>
                </Box>

                {filteredActivities.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" color="text.secondary">
                            No activities match your filters. Try adjusting your search criteria.
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        {filteredActivities.map((activity) => (
                            <Grid item key={activity.id} xs={12} sm={6} md={4} lg={4}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={activity.image}
                                        alt={activity.title}
                                    />
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            {getCategoryIcon(activity.category)}
                                            <Typography variant="h5" component="h2" sx={{ ml: 1 }}>
                                                {activity.title}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                                            {activity.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary" display="block">
                                                    Duration: {activity.duration}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" display="block">
                                                    Level: {activity.difficulty}
                                                </Typography>
                                            </Box>
                                            <Button variant="contained" color="primary">
                                                Learn More
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </div>
    );
};

export default Activities;