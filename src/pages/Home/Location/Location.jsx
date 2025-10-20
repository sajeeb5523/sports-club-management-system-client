import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaDirections, FaGlobe } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Typography } from '@mui/material';

// fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Location = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    // company location details
    const locationData = {
        name: "SCMS Bangladesh",
        address: "House #456, Road #15, Sector #7",
        area: "Uttara, Dhaka-1230",
        city: "Dhaka",
        country: "Bangladesh",
        phone: "+8801571-595523",
        email: "sajeebaljabed1@gmail.com",
        website: "www.scms-bd.com",
        coordinates: {
            lat: 23.8709,
            lng: 90.4015
        },
        workingHours: {
            weekdays: "9:00 AM - 6:00 PM",
            saturday: "9:00 AM - 2:00 PM",
            sunday: "Closed"
        }
    };

    // function to open Google Maps with directions
    const openGoogleMaps = () => {
        const { lat, lng } = locationData.coordinates;
        const address = encodeURIComponent(`${locationData.address}, ${locationData.area}, ${locationData.city}, ${locationData.country}`);
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${address}`;
        window.open(url, '_blank');
    };

    // function to copy address to clipboard
    const copyAddress = () => {
        const fullAddress = `${locationData.address}, ${locationData.area}, ${locationData.city}, ${locationData.country}`;
        navigator.clipboard.writeText(fullAddress).then(() => {
            alert('Address copied to clipboard!');
        });
    };

    // use default Google Maps style marker
    const customIcon = new L.Icon({
        iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    useEffect(() => {
        setIsMapLoaded(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
            <div className="container mx-auto px-4">
                {/* header section */}
                <div className="text-center mb-12">
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Our Location
                    </Typography>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-8">
                        Visit us at our headquarters in the heart of Dhaka. We're conveniently located
                        in Uttara, easily accessible from all parts of the city.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* address details card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Address Details</h2>
                        </div>

                        <div className="space-y-6">
                            {/* company name */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {locationData.name}
                                </h3>
                            </div>

                            {/* full address */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700 leading-relaxed">
                                    <span className="font-medium">{locationData.address}</span><br />
                                    <span className="font-medium">{locationData.area}</span><br />
                                    <span className="font-medium">{locationData.city}, {locationData.country}</span>
                                </p>
                                <button
                                    onClick={copyAddress}
                                    className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    Copy Address
                                </button>
                            </div>

                            {/* contact information */}
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <FaPhone className="text-green-600 mr-3" />
                                    <a href={`tel:${locationData.phone}`} className="text-gray-700 hover:text-green-600">
                                        {locationData.phone}
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="text-blue-600 mr-3" />
                                    <a href={`mailto:${locationData.email}`} className="text-gray-700 hover:text-blue-600">
                                        {locationData.email}
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <FaGlobe className="text-purple-600 mr-3" />
                                    <a href={`https://${locationData.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-600">
                                        {locationData.website}
                                    </a>
                                </div>
                            </div>

                            {/* working hours */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                    <FaClock className="mr-2" />
                                    Working Hours
                                </h4>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Saturday:</span>
                                        <span className="font-medium">{locationData.workingHours.saturday}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Sunday - Thursday:</span>
                                        <span className="font-medium">{locationData.workingHours.weekdays}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Friday:</span>
                                        <span className="font-medium text-red-600">{locationData.workingHours.sunday}</span>
                                    </div>
                                </div>
                            </div>

                            {/* navigation button */}
                            <button
                                onClick={openGoogleMaps}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                            >
                                <FaDirections className="mr-2" />
                                Get Directions
                            </button>
                        </div>
                    </div>

                    {/* map section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Location Map</h2>
                                <p className="text-gray-600">
                                    Click on the marker to see our location details
                                </p>
                            </div>
                        </div>

                        <div className="relative h-96">
                            {isMapLoaded && (
                                <MapContainer
                                    center={[locationData.coordinates.lat, locationData.coordinates.lng]}
                                    zoom={16}
                                    style={{ height: '100%', width: '100%' }}
                                    className="z-10"
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker
                                        position={[locationData.coordinates.lat, locationData.coordinates.lng]}
                                        icon={customIcon}
                                    >
                                        <Popup>
                                            <div className="text-center">
                                                <h3 className="font-bold text-lg text-gray-800 mb-2">
                                                    {locationData.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-3">
                                                    {locationData.address}<br />
                                                    {locationData.area}<br />
                                                    {locationData.city}, {locationData.country}
                                                </p>
                                                <button
                                                    onClick={openGoogleMaps}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition duration-300"
                                                >
                                                    Get Directions
                                                </button>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            )}

                            {/* loading overlay */}
                            {!isMapLoaded && (
                                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                        <p className="text-gray-600">Loading map...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* additional information */}
                <div className="bg-white rounded-2xl shadow-xl p-8">

                    <div className="text-center mb-12">
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Getting Here
                        </Typography>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* public transport */}
                        <div className="text-center p-6 bg-green-50 rounded-lg border border-gray-200">
                            <div className="bg-green-100 p-3 rounded-full inline-block mb-4 ">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Public Transport</h3>
                            <p className="text-gray-600 text-sm">
                                Easily accessible by bus, rickshaw, and ride-sharing services.
                                Nearest bus stop is 5 minutes walk away.
                            </p>
                        </div>

                        {/* parking */}
                        <div className="text-center p-6 bg-blue-50 rounded-lg border border-gray-200">
                            <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-14 0h14" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Parking</h3>
                            <p className="text-gray-600 text-sm">
                                Free parking available for visitors.
                                Secure parking area with 24/7 surveillance.
                            </p>
                        </div>

                        {/* accessibility */}
                        <div className="text-center p-6 bg-purple-50 rounded-lg border border-gray-200">
                            <div className="bg-purple-100 p-3 rounded-full inline-block mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Accessibility</h3>
                            <p className="text-gray-600 text-sm">
                                Wheelchair accessible entrance and facilities.
                                Elevator available to all floors.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;