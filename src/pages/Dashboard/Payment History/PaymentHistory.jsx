import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

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

    const renderTableView = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                        <th className="px-4 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coupon</th>
                        <th className="px-4 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                        <th className="px-4 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                        <tr key={payment.paymentIntentId} className="hover:bg-gray-50">
                            <td className="px-4 py-3 border text-sm text-gray-900">{new Date(payment.date).toLocaleString()}</td>
                            <td className="px-4 py-3 border text-sm font-medium text-green-600">৳{payment.amount}</td>
                            <td className="px-4 py-3 border text-sm text-gray-900">{payment.discount || 0}</td>
                            <td className="px-4 py-3 border text-sm text-gray-900">{payment.coupon || '-'}</td>
                            <td className="px-4 py-3 border text-sm text-gray-500 font-mono">{payment.paymentIntentId}</td>
                            <td className="px-4 py-3 border text-sm text-gray-500">{payment.bookingId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderCardView = () => (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {payments.map((payment) => (
                <div key={payment.paymentIntentId} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-lg font-semibold text-green-600">৳{payment.amount}</div>
                        <div className="text-sm text-gray-500">
                            {new Date(payment.date).toLocaleDateString()}
                        </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Date & Time:</span>
                            <span className="text-gray-900">{new Date(payment.date).toLocaleString()}</span>
                        </div>
                        
                        <div className="flex justify-between">
                            <span className="text-gray-600">Discount:</span>
                            <span className="text-gray-900">{payment.discount || 0}</span>
                        </div>
                        
                        <div className="flex justify-between">
                            <span className="text-gray-600">Coupon:</span>
                            <span className="text-gray-900">{payment.coupon || '-'}</span>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-100">
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-600">Payment ID:</span>
                            </div>
                            <div className="text-xs font-mono text-gray-500 break-all">
                                {payment.paymentIntentId}
                            </div>
                        </div>
                        
                        <div className="flex justify-between">
                            <span className="text-gray-600">Booking ID:</span>
                            <span className="text-gray-900">{payment.bookingId}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
                
                {/* Layout Toggle Button */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">View:</span>
                    <button
                        onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {viewMode === 'table' ? (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <span>Card View</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18m-9 8h9" />
                                </svg>
                                <span>Table View</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
            
            {/* Render based on view mode */}
            {viewMode === 'table' ? renderTableView() : renderCardView()}
        </div>
    );
};

export default PaymentHistory;