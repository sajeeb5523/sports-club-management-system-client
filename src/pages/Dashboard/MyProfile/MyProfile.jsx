import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { FaUser, FaEnvelope, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MyProfile = () => {
    const { user } = useAuth();

    // format the registration date
    const formatRegistrationDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get user display name only
    

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="mt-2 text-gray-600">Manage your account information and settings</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                        <div className="flex items-center space-x-6">
                            {/* Profile Image */}
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user?.displayName}
                                            className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
                                        />
                                    ) : (
                                        <FaUser className="w-12 h-12 text-white/80" />
                                    )}
                                </div>

                            </div>

                            {/* User Info */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white">{user?.displayName}</h2>
                                <div className="flex items-center mt-1">
                                    {user?.emailVerified ? (
                                        <div className="flex items-center text-white">
                                            <FaCheckCircle className="w-4 h-4 mr-2" />
                                            <span>Verified Account</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-red-300">
                                            <FaTimesCircle className="w-4 h-4 mr-2" />
                                            <span>Unverified Account</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="px-6 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    Personal Information
                                </h3>

                                {/* Display Name */}
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaUser className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500">Name</p>
                                        <p className="text-gray-900">{user?.displayName}</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <FaEnvelope className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500">Email Address</p>
                                        <p className="text-gray-900">{user?.email || 'N/A'}</p>
                                        {user?.emailVerified && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                                ✓ Verified
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Registration Date */}
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <FaCalendarAlt className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500">Registration Date</p>
                                        <p className="text-gray-900">
                                            {formatRegistrationDate(user?.metadata?.creationTime)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;