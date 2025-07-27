import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PendingBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Fetch user info including role
    const { data: userInfo, isLoading: userInfoLoading } = useQuery({
        queryKey: ['userInfo', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    // fetch pending bookings for the logged-in user
    const {
        data: bookings = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['pendingBookings', userInfo?.role === 'admin' ? 'admin' : user?.email],
        enabled: !!user?.email,
        staleTime: 10000, // 10 seconds
        refetchInterval: 5000, // 5 seconds
        queryFn: async () => {
            if (userInfo?.role === 'admin') {
                // Admin: fetch all pending bookings
                const res = await axiosSecure.get('booking?status=pending');
                return res.data;
            } else {
                // Normal user: fetch only their pending bookings
                const res = await axiosSecure.get(`booking?email=${user.email}&status=pending`);
                return res.data;
            }
        },
    });

    // console.log(bookings);

    // mutation for cancelling a booking
    const cancelMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/booking/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pendingBookings', user?.email] });
        },
    });

    // mutation for approving a booking
    const approveMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.patch(`/booking/approve/${id}`, { email: user.email });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pendingBookings', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['approvedBookings', user?.email] });
        },
    });

    const handleCancel = (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        cancelMutation.mutate(id);
    };

    const handleApprove = (id) => {
        if (!window.confirm('Are you sure you want to approve this booking?')) return;
        approveMutation.mutate(id);
    };

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error: {error?.message || 'Failed to load bookings.'}</div>;
    if (!bookings.length) return (
        <div className="flex items-center justify-center min-h-[100vh]">
            <div className="text-center text-lg">
                No pending bookings found.
            </div>
        </div>
    );

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
                            className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
                            onClick={() => handleCancel(booking._id)}
                            disabled={cancelMutation.isLoading}
                        >
                            {userInfo?.role === 'admin'
                                ? (cancelMutation.isLoading ? 'Rejecting...' : 'Reject')
                                : (cancelMutation.isLoading ? 'Cancelling...' : 'Cancel')}

                        </button>
                        {userInfoLoading ? (
                            <span>Loading...</span>
                        ) : userInfo?.role === 'admin' && (
                            <button
                                onClick={() => approveMutation.mutate(booking._id)}
                                className="px-4 py-1.5 bg-green-500 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                            >
                                Approve
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PendingBookings;