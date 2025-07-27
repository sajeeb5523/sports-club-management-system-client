import React from 'react';
import useUserData from '../../../hooks/useUserData';
import { FaCrown, FaGift, FaPercent, FaClock, FaStar } from 'react-icons/fa';

const MemberInfo = () => {
    const { userData, isLoading } = useUserData();

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!userData?.isMember) {
        return (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 border border-blue-200">
                <div className="text-center">
                    <FaCrown className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Become a Member</h3>
                    <p className="text-gray-600 mb-4">
                        Book your first court and become a member to unlock exclusive benefits!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <FaGift className="text-green-500" />
                            <span>Exclusive Discounts</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaPercent className="text-blue-500" />
                            <span>Priority Booking</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaStar className="text-yellow-500" />
                            <span>Member Perks</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow p-6 border border-yellow-200">
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-500 text-white rounded-full p-3">
                    <FaCrown className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Active Member</h3>
                    <p className="text-gray-600 text-sm">
                        Member since {new Date(userData.memberSince).toLocaleDateString()}
                    </p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <FaGift className="text-green-500" />
                        Member Benefits
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Exclusive court booking discounts</li>
                        <li>• Priority booking slots</li>
                        <li>• Special member-only events</li>
                        <li>• Free equipment rental</li>
                    </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <FaClock className="text-blue-500" />
                        Recent Activity
                    </h4>
                    <div className="text-sm text-gray-600">
                        <p>Last booking: {userData.lastBookingDate ? 
                            new Date(userData.lastBookingDate).toLocaleDateString() : 
                            'No recent bookings'
                        }</p>
                        <p className="mt-2 text-xs text-gray-500">
                            Keep booking to maintain your member status!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberInfo; 