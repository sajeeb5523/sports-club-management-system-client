import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { GiConfirmed } from "react-icons/gi";


const ManageBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const {
        data: bookings = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['allConfirmedPaidBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('booking');
            // filter for confirmed and paid bookings only
            return res.data.filter(b => b.status === 'confirmed' && b.paid);
        },
    });

    // Filter bookings based on search term (by court name/title)
    const filteredBookings = useMemo(() => {
        if (!searchTerm.trim()) return bookings;
        return bookings.filter(booking =>
            booking.courtName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.courtType?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [bookings, searchTerm]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-lg">Loading bookings...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-red-500 text-lg">
                    Error: {error?.message || 'Failed to load bookings.'}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-green-700">
                    <GiConfirmed className="inline-block" /> Manage Confirmed Bookings
                </h2>
                <p className="text-gray-600 mb-4">
                    All confirmed bookings with completed payments ({bookings.length} total)
                </p>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="Search by court name or type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            {filteredBookings.length === 0 ? (
                <div className="flex items-center justify-center min-h-[30vh]">
                    <div className="text-center">
                        <div className="text-gray-500 text-lg mb-2">
                            {searchTerm ? 'No bookings found matching your search.' : 'No confirmed bookings found.'}
                        </div>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-blue-500 hover:text-blue-700 underline"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="mb-4 text-sm text-gray-600">
                        Showing {filteredBookings.length} of {bookings.length} bookings
                        {searchTerm && ` for "${searchTerm}"`}
                    </div>

                    <div className="grid gap-6">
                        {filteredBookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                    {booking.courtName}
                                                </h3>
                                                <div className="space-y-1 text-sm text-gray-600">
                                                    <div>
                                                        <span className="font-medium">Type:</span> {booking.courtType}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Date:</span> {booking.date}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Slots:</span> {booking.slots?.join(', ') || 'N/A'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="space-y-1 text-sm text-gray-600">
                                                    <div>
                                                        <span className="font-medium">Booked by:</span> {booking.email}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Total Price:</span>
                                                        <span className="text-green-600 font-semibold ml-1">
                                                            ৳{booking.total}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">Status:</span>
                                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                            Confirmed & Paid
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageBookings;