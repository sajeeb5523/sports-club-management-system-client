import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useUserData from '../../../hooks/useUserData';
import useUserRole from '../../../hooks/useUserRole';
import { TbLogout } from "react-icons/tb";
import { MdDashboard, MdMenu } from "react-icons/md";
import { FaCrown } from "react-icons/fa";
import Swal from 'sweetalert2';
import Logo from '../Logo/Logo';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { userData } = useUserData();
    const { role } = useUserRole();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const handleLogout = () => {
        console.log('user logout');
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logout successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch((error) => {
                console.log(error);
            });
    }
    // close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Navigation items for non-logged in users
    const guestNavItems = (
        <>
            <li><NavLink to='/' className="hover:text-black transition-colors">Home</NavLink></li>
            <li><NavLink to='/courts' className="hover:text-black transition-colors">Courts</NavLink></li>
            <li><NavLink to='/about' className="hover:text-black transition-colors">About</NavLink></li>
        </>
    );

    // Navigation items for logged in users
    const userNavItems = (
        <>
            <li><NavLink to='/' className="hover:text-black transition-colors">Home</NavLink></li>
            <li><NavLink to='/courts' className="hover:text-black transition-colors">Courts</NavLink></li>
            <li><NavLink to='/activities' className="hover:text-black transition-colors">Activities</NavLink></li>
            <li><NavLink to='/events' className="hover:text-black transition-colors">Events</NavLink></li>
            <li><NavLink to='/contact' className="hover:text-black transition-colors">Contact</NavLink></li>
        </>
    );

    const navItems = user ? userNavItems : guestNavItems;
    return (
        <div className="w-full bg-gradient-to-r from-primary to-secondary text-white sticky top-0 z-50 shadow-lg">
            <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white hover:bg-white/10">
                            <MdMenu className="text-2xl" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow-lg">
                            {navItems}
                        </ul>
                    </div>
                    <div className='flex items-center '>
                        <span><Logo></Logo></span>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg space-x-2">
                        {navItems}
                    </ul>
                </div>

                <div className='ml-10'>
                </div>
                <div className='login_btn flex items-center gap-2 navbar-end'>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <div className="relative">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        className='w-12 h-12 rounded-full cursor-pointer border-2 border-gray-200 hover:border-gray-300 transition-colors object-cover'
                                        alt="Profile"
                                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div
                                    className={`w-12 h-12 rounded-full cursor-pointer border-2 border-gray-200 hover:border-gray-300 transition-colors bg-gray-300 flex items-center justify-center text-gray-600 font-semibold ${user.photoURL ? 'hidden' : 'flex'}`}
                                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                                >
                                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                                </div>
                                {userData?.isMember && (
                                    <div className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                        <FaCrown className="w-3 h-3" />
                                    </div>
                                )}
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 bg-base-100 shadow-lg rounded-lg w-64 border border-gray-200 z-50">
                                    <div className="p-4 border-b border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-gray-800">{user.displayName || 'User'}</p>
                                                    {role === 'admin' && (
                                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                                            Admin
                                                        </span>
                                                    )}
                                                    {role === 'member' && (
                                                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                                            Member
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                            {userData?.isMember && (
                                                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                                    <FaCrown className="w-3 h-3" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <ul className="menu menu-sm p-2 gap-1 text-black">
                                        <li>
                                            <NavLink to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                                                <MdDashboard className="text-lg text-primary" />
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors w-full text-left"
                                            >
                                                <TbLogout className="text-lg text-red-500" />
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink to='/login' className='btn btn-outline btn-primary text-white hover:bg-white hover:text-primary sm:w-auto px-6 py-2 rounded-lg border-2 border-white hover:border-white'>Login</NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;