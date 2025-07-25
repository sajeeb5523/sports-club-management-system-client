import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import StripeCheckout from './StripeCheckout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const ApprovedBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [selectedBooking, setSelectedBooking] = useState(null);

    // fetch confirmed bookings for the logged-in user
    const {
        data: bookings = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['confirmedBookings', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/booking');
            // filter for confirmed bookings for the logged-in user and not paid
            return res.data.filter(b => b.status === 'confirmed' && b.email === user.email && !b.paid);
        },
    });

    // mutation for confirming payment
    const paymentMutation = useMutation({
        mutationFn: async (id) => {
            // Simulate payment process (replace with real payment integration if needed)
            await axiosSecure.patch(`/booking/approve/${id}`, { status: 'confirmed' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['confirmedBookings', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['approvedBookings', user?.email] });
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
            <h2 className="text-2xl font-bold mb-5">Approved Bookings: {bookings.length}</h2>
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
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
                            onClick={() => setSelectedBooking(booking)}
                        >
                            Pay Now
                        </button>
                    </div>
                ))}
            </div>
            {selectedBooking && (
                <Elements stripe={stripePromise}>
                    <StripeCheckout
                        booking={selectedBooking}
                        onSuccess={() => {
                            setSelectedBooking(null);
                            queryClient.invalidateQueries({ queryKey: ['confirmedBookings', user?.email] });
                            queryClient.invalidateQueries({ queryKey: ['approvedBookings', user?.email] });
                        }}
                        onClose={() => setSelectedBooking(null)}
                    />
                </Elements>
            )}
        </div>
    );
};

export default ApprovedBookings;