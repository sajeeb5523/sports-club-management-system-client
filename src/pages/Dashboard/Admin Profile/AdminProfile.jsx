import React from 'react';
import useUserData from '../../../hooks/useUserData';
import useAuth from '../../../hooks/useAuth';
import useAdminStats from '../../../hooks/useAdminStats';
import { 
  FaUserShield, 
  FaCrown, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaUser, 
  FaIdCard, 
  FaCalendarAlt 
} from 'react-icons/fa';
import { courts } from '../../Courts/courtsData';

const AdminProfile = () => {
    const { user } = useAuth();
    const { userData, isLoading, isError, error } = useUserData();
    const { usersCount = 0, membersCount = 0 } = useAdminStats();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    if (isError || !userData) {
        return (
            <div className="text-red-600 text-center mt-8">
                Failed to load admin profile. {error?.message}
            </div>
        );
    }

    return (
        <div className=" rounded-xl overflow-hidden p-6 min-h-screen">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        {userData.photoURL || user?.photoURL ? (
                            <img
                                src={userData.photoURL || user?.photoURL}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-white text-5xl">
                                <FaUser />
                            </div>
                        )}
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-2">
                            <FaUserShield className="text-xl" />
                        </div>
                    </div>
                    
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2">
                            {userData.displayName || userData.name || user?.displayName || 'Admin'}
                            <FaCrown className="text-yellow-400" title="Admin" />
                        </h1>
                        <p className="text-blue-100 mt-1 flex items-center justify-center md:justify-start gap-2">
                            <FaEnvelope />
                            {userData.email || user?.email}
                        </p>
                        {userData.phoneNumber && (
                            <p className="text-blue-100 mt-1 flex items-center justify-center md:justify-start gap-2">
                                <FaPhone />
                                {userData.phoneNumber}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaIdCard className="text-blue-600" />
                            Personal Information
                        </h2>
                        
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 w-24">Full Name:</span>
                                <span className="font-medium">{userData.displayName || userData.name || user?.displayName || 'Not provided'}</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 w-24">Email:</span>
                                <span className="font-medium">{userData.email || user?.email || 'Not provided'}</span>
                            </div>
                            
                            {/* <div className="flex items-center gap-3">
                                <span className="text-gray-500 w-24">Phone:</span>
                                <span className="font-medium">{userData.phoneNumber || 'Not provided'}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 w-24">Address:</span>
                                <span className="font-medium">{userData.phoneNumber || 'Not provided'}</span>
                            </div> */}
                            
                            {userData.address && (
                                <div className="flex items-start gap-3">
                                    <span className="text-gray-500 w-24 mt-1">Address:</span>
                                    <span className="font-medium">{userData.address}</span>
                                </div>
                            )}
                            
                            {userData.joinedDate && (
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 w-24">Member Since:</span>
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-gray-400" />
                                        <span>{new Date(userData.joinedDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Club Statistics */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-blue-600" />
                            Club Statistics
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Courts</span>
                                    <span className="text-2xl font-bold text-indigo-600">{courts.length}</span>
                                </div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Users</span>
                                    <span className="text-2xl font-bold text-pink-600">{usersCount}</span>
                                </div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Members</span>
                                    <span className="text-2xl font-bold text-green-600">{membersCount}</span>
                                </div>
                            </div>
                            
                            {userData.lastLogin && (
                                <div className="mt-4 text-sm text-gray-500">
                                    <p>Last login: {new Date(userData.lastLogin).toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;