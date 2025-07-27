import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: payments = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            if (!user?.email) throw new Error('User not logged in');
            try {
                const res = await axiosSecure.get(`payments?email=${user.email}`);
                // Debug: log the data
                console.log('Payment API response:', res.data);
                if (!Array.isArray(res.data)) {
                    throw new Error('Invalid payment data format');
                }
                return res.data.filter(p => p.email === user.email);
            } catch (err) {
                // Debug: log the error
                console.error('Payment history fetch error:', err);
                throw err;
            }
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error?.message || 'Failed to load payment history.'}</div>;
    if (!payments.length) return <div className="text-center py-10">No payment history found.</div>;

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-5">Payment History</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Amount</th>
                        <th className="px-4 py-2 border">Discount</th>
                        <th className="px-4 py-2 border">Coupon</th>
                        <th className="px-4 py-2 border">Payment ID</th>
                        <th className="px-4 py-2 border">Booking ID</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.paymentIntentId}>
                            <td className="px-4 py-2 border">{new Date(payment.date).toLocaleString()}</td>
                            <td className="px-4 py-2 border">৳{payment.amount}</td>
                            <td className="px-4 py-2 border">{payment.discount || 0}</td>
                            <td className="px-4 py-2 border">{payment.coupon || '-'}</td>
                            <td className="px-4 py-2 border">{payment.paymentIntentId}</td>
                            <td className="px-4 py-2 border">{payment.bookingId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;