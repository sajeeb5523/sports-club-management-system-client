import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-4">    
            <div className="w-full max-w-sm">
                <Link to="/" className="btn btn-ghost btn-sm">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Link>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
