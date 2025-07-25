import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import BookingModal from './BookingModal';
import tennis1Image from '../../assets/tennis court-1.jpg';
import tennis2Image from '../../assets/tennis court-2.jpg';
import badminton1Image from '../../assets/badminton court-1.jpg';
import badminton2Image from '../../assets/badminton court-2.jpg';
import squash1Image from '../../assets/squash court-1.jpg';
import squash2Image from '../../assets/squash court-2.jpg';

const Courts = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const courts = [
        {
            id: 1,
            name: "Tennis Court 1",
            type: "Tennis",
            image: tennis1Image,
            price: 1200,
            slots: [
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        },
        {
            id: 2,
            name: "Tennis Court 2",
            type: "Tennis",
            image: tennis2Image,
            price: 1200,
            slots: [
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        },
        {
            id: 3,
            name: "Badminton Court 1",
            type: "Badminton",
            image: badminton1Image,
            price: 800,
            slots: [
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        },
        {
            id: 4,
            name: "Badminton Court 2",
            type: "Badminton",
            image: badminton2Image,
            price: 800,
            slots: [
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        },
        {
            id: 5,
            name: "Squash Court 1",
            type: "Squash",
            image: squash1Image,
            price: 1000,
            slots: [
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        },
        {
            id: 6,
            name: "Squash Court 2",
            type: "Squash",
            image: squash2Image,
            price: 1000,
            slots: [
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        }
    ];

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

    return (
        <div className="max-w-7xl mx-auto p-8 min-h-screen bg-gradient-to-br from-indigo-400 to-purple-700">
            <div className="text-center mb-12 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Available Courts</h1>
                <p className="text-lg md:text-xl opacity-90">Book your favorite court and enjoy your game!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {courts.map((court) => (
                    <div key={court.id} className="bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 relative hover:-translate-y-2 hover:shadow-3xl mx-2">
                        <div className="relative h-52 overflow-hidden">
                            <img src={court.image} alt={court.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-400 to-orange-600 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md">
                                {court.type}
                            </div>
                        </div>
                        <div className="p-6">
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
                            <button 
                                className="w-full py-3 bg-gradient-to-r from-indigo-400 to-purple-700 text-white rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 uppercase tracking-wider hover:from-indigo-500 hover:to-purple-900 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                                onClick={() => handleBookNow(court)}
                            >
                                Book Now
                            </button>
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