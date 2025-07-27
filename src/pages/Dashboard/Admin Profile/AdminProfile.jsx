import React from 'react'; import useUserData from '../../../hooks/useUserData';
import useAuth from '../../../hooks/useAuth';
import useAdminStats from '../../../hooks/useAdminStats';
import { FaUserShield, FaCrown, FaEnvelope, FaCheckCircle, FaUser } from 'react-icons/fa';
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
        <div className="max-w-5xl ml-5 w-full mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 border">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {userData.displayName || userData.name || user?.displayName || 'Admin'}
                    <FaCrown className="text-yellow-500" title="Admin" />
                </h2>

                <div className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope />
                    <span>{userData.email || user?.email}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    {userData.photoURL || user?.photoURL ? (
                        <img
                            src={userData.photoURL || user?.photoURL}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-3xl">
                            <FaUser />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 text-indigo-700 font-semibold">
                    <span className="text-lg">Total Courts:</span>
                    <span className="text-2xl font-bold">{courts.length}</span>
                </div>

                <div className="flex items-center gap-2 text-pink-700 font-semibold">
                    <span className="text-lg">Total Users:</span>
                    <span className="text-2xl font-bold">{usersCount}</span>
                </div>
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                    <span className="text-lg">Total Members:</span>
                    <span className="text-2xl font-bold">{membersCount}</span>
                </div>

            </div>

        </div>
    );
};

export default AdminProfile;