import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const ConfirmedBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    
    const {
        data: bookings = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['confirmedPaidBookings', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/booking');
            return res.data.filter(b => b.status === 'confirmed' && b.email === user.email && b.paid);
        },
    });

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error: {error?.message || 'Failed to load bookings.'}</div>;
    if (!bookings.length) return (
        <div className="flex items-center justify-center min-h-[100vh]">
            <div className="text-center text-lg">
                No confirmed bookings found.
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl p-4">
            <h2 className="text-2xl font-bold mb-5">Confirmed Bookings: {bookings.length}</h2>
            <div className="space-y-6">
                {bookings.map(booking => (
                    <div key={booking._id} className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div><span className="font-semibold">Court:</span> {booking.courtName} ({booking.courtType})</div>
                            <div><span className="font-semibold">Date:</span> {booking.date}</div>
                            <div><span className="font-semibold">Slots:</span> {booking.slots && booking.slots.join(', ')}</div>
                            <div><span className="font-semibold">Total Price:</span> ৳{booking.total}</div>
                            <div><span className="font-semibold">Booked By:</span> {booking.email}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConfirmedBookings;