import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import useUserData from '../../hooks/useUserData';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BookingModal from './BookingModal';
import tennis1Image from '../../assets/tennis court-1.jpg';
import tennis2Image from '../../assets/tennis court-2.jpg';
import badminton1Image from '../../assets/badminton court-1.jpg';
import badminton2Image from '../../assets/badminton court-2.jpg';
import squash1Image from '../../assets/squash court-1.jpg';
import squash2Image from '../../assets/squash court-2.jpg';
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material';

const Courts = () => {
    const { user } = useContext(AuthContext);
    const { userData } = useUserData();
    const navigate = useNavigate();
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const axiosSecure = useAxiosSecure();

    // image mapping for court types
    const getCourtImage = (courtName, courtType) => {
        const name = courtName.toLowerCase();
        const type = courtType.toLowerCase();

        if (type.includes('tennis')) {
            return name.includes('1') ? tennis1Image : tennis2Image;
        } else if (type.includes('badminton')) {
            return name.includes('1') ? badminton1Image : badminton2Image;
        } else if (type.includes('squash')) {
            return name.includes('1') ? squash1Image : squash2Image;
        }
        return tennis1Image; // default fallback
    };

    // fetch courts data from backend
    const { data: courts = [], isLoading, error } = useQuery({
        queryKey: ['courts'],
        queryFn: async () => {
            const response = await axiosSecure.get('/courts');
            return response.data.map(court => ({
                ...court,
                image: getCourtImage(court.name, court.type),
                slots: court.slots || [
                    "09:00 AM - 10:00 AM",
                    "10:00 AM - 11:00 AM",
                    "11:00 AM - 12:00 PM",
                    "02:00 PM - 03:00 PM",
                    "03:00 PM - 04:00 PM",
                    "04:00 PM - 05:00 PM"
                ]
            }));
        }
    });

    const handleBookNow = (court) => {
        if (!user) {
            // redirect to login page for logged out users
            navigate('/login');
            return;
        }

        // open booking modal for logged in users
        setSelectedCourt(court);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourt(null);
    };

    // loading state
    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-8 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold">Loading Courts...</h2>
                </div>
            </div>
        );
    }

    // error state
    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-8 min-h-screen bg-gradient-to-br from-indigo-400 to-purple-700 flex items-center justify-center">
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">⚠️ Error Loading Courts</h2>
                    <p className="text-lg mb-4">Unable to fetch court information. Please try again later.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
            <div className="text-center mb-12 text-white">
                <Container maxWidth="xl">
                    <Box sx={{ mb: -1, textAlign: 'center' }}>
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Available Courts
                        </Typography>
                        <Typography variant="h6" color="text.secondary" paragraph>
                            Book your favorite court and enjoy your game!
                        </Typography>
                    </Box>
                </Container>

                {userData?.isMember && (
                    <div className="inline-flex items-center gap-2 mt-4 bg-yellow-500 text-white px-4 py-2 rounded-full">
                        <span className="text-lg">👑</span>
                        <span className="font-semibold">Member Discount Available!</span>
                    </div>
                )}
            </div>

            <div className="flex justify-center mb-12 -mt-3">
                <ButtonGroup variant="contained" aria-label="Sort by price">
                    <Button
                        onClick={() => setSortOrder('asc')}
                        color={sortOrder === 'asc' ? 'primary' : 'inherit'}
                        sx={{ textTransform: 'none' }}
                    >
                        Price: Low to High
                    </Button>
                    <Button
                        onClick={() => setSortOrder('desc')}
                        color={sortOrder === 'desc' ? 'primary' : 'inherit'}
                        sx={{ textTransform: 'none' }}
                    >
                        Price: High to Low
                    </Button>
                </ButtonGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 -mt-2 px-4 max-w-7xl mx-auto">
                {[...courts]
                    .sort((a, b) => {
                        if (sortOrder === 'asc') {
                            return a.price - b.price;
                        } else {
                            return b.price - a.price;
                        }
                    })
                    .map((court) => (
                        <div key={court.id} className="bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 relative hover:-translate-y-2 hover:shadow-3xl mx-2 flex flex-col h-full">
                            <div className="relative h-52 overflow-hidden">
                                <img src={court.image} alt={court.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-400 to-orange-600 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md">
                                    {court.type}
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{court.name}</h3>
                                <p className="text-gray-500 mb-6 text-base">{court.type} Court</p>
                                <div className="mb-6">
                                    <label htmlFor={`slot-${court.id}`} className="block mb-2 font-semibold text-gray-800">Available Slots:</label>
                                    <select id={`slot-${court.id}`} className="w-full p-3 border-2 border-gray-200 rounded-lg text-base bg-white focus:outline-none focus:border-indigo-400 focus:shadow-md">
                                        <option value="">Select a time slot</option>
                                        {court.slots.map((slot, index) => (
                                            <option key={index} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-2xl font-bold text-green-600">৳{court.price}</span>
                                    <span className="text-gray-500 text-sm">per session</span>
                                </div>
                                <div className="mt-auto pt-4">
                                    <button
                                        className="w-full py-3 bg-gradient-to-r from-indigo-400 to-purple-700 text-white rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 uppercase tracking-wider hover:from-indigo-500 hover:to-purple-900 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                                        onClick={() => handleBookNow(court)}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {isModalOpen && selectedCourt && (
                <BookingModal
                    court={selectedCourt}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Courts;