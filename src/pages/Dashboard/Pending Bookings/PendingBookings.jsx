import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PendingBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // fetch pending bookings for the logged-in user
    const {
        data: bookings = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['pendingBookings', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/booking');
            // filter for pending bookings for the logged-in user
            return res.data.filter(b => b.status === 'pending' && b.email === user.email);
        },
    });

    console.log(bookings);

    // mutation for cancelling a booking
    const cancelMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/booking/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pendingBookings', user?.email] });
        },
    });

    const handleCancel = (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        cancelMutation.mutate(id);
    };

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error: {error?.message || 'Failed to load bookings.'}</div>;
    if (!bookings.length) return <div>No pending bookings found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Pending Bookings: {bookings.length}</h2>
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
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
                            onClick={() => handleCancel(booking._id)}
                            disabled={cancelMutation.isLoading}
                        >
                            {cancelMutation.isLoading ? 'Cancelling...' : 'Cancel'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PendingBookings;