import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import MemberInfo from '../MemberInfo/MemberInfo';
import { FaCalendarAlt, FaCheckCircle, FaClock, FaMoneyBill } from 'react-icons/fa';

const DashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // fetch user's booking statistics
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['userStats', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`booking?email=${user.email}`);
            const bookings = res.data;
            
            return {
                totalBookings: bookings.length,
                pendingBookings: bookings.filter(b => b.status === 'pending').length,
                confirmedBookings: bookings.filter(b => b.status === 'confirmed' && b.paid).length,
                totalSpent: bookings.filter(b => b.paid).reduce((sum, b) => sum + (b.total || 0), 0)
            };
        },
    });

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back, {user?.displayName || 'User'}!</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                        </div>
                        <FaCalendarAlt className="w-8 h-8 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
                        </div>
                        <FaClock className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Confirmed</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.confirmedBookings}</p>
                        </div>
                        <FaCheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Spent</p>
                            <p className="text-2xl font-bold text-gray-900">৳{stats.totalSpent}</p>
                        </div>
                        <FaMoneyBill className="w-8 h-8 text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Member Information */}
            <div className="mb-8">
                <MemberInfo />
            </div>
        </div>
    );
};

export default DashboardHome; 