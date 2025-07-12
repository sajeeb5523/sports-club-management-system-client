import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { TbLogout } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import Swal from 'sweetalert2';
import Logo from '../Logo/Logo';

const Navbar = () => {
    const { user, logOut } = useAuth();
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
    const navItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/courts'>Courts</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <div className='flex items-center '>
                    <span><Logo></Logo></span>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>

            <div className='ml-10'>
            </div>
            <div className='login_btn flex items-center gap-2 navbar-end'>

                {user ? (
                    <div className="relative group">
                        <img
                            src={user.photoURL || ''}
                            className='w-12 h-12 rounded-full cursor-pointer border-2 border-gray-200 hover:border-gray-300 transition-colors'
                            alt="Profile"
                        />
                        <div className="absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <div className="bg-base-100 shadow-lg rounded-lg w-64 border border-gray-200">
                                <div className="p-4 border-b border-gray-100">
                                    <p className="font-semibold text-gray-800">{user.displayName || 'User'}</p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                                <ul className="menu menu-sm p-2 gap-1">
                                    <li>
                                        <NavLink to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                                            <MdDashboard className="text-lg" />
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors w-full text-left"
                                        >
                                            <TbLogout className="text-lg" />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <NavLink to='/login' className='btn sm:w-auto px-3 py-2 rounded-lg'>Login</NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;