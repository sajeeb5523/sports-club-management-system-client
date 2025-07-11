import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { TbLogout } from "react-icons/tb";
import Swal from 'sweetalert2';

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
                <a className="btn btn-ghost text-xl">SCMS</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>

            <div className='ml-10'>
            </div>
            <div className='login_btn flex items-center gap-2 navbar-end'>

                <div className="relative group">
                    <img src={`${user ? user.photoURL : ''}`} className='w-12 rounded-full cursor-pointer' alt="" />
                    {user && (
                        <div className="absolute right-0 top-full mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <div className="bg-base-100 shadow-lg rounded-lg w-23 hover:opacity-100 hover:visible">
                                <ul className="menu menu-sm p-2 gap-1.5">
                                    <p className='text-center'> {user.displayName}</p>
                                    <li>
                                        <button onClick={handleLogout} className="btn w-full ">
                                            <TbLogout />Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {
                    !user && <>
                        <NavLink to='/login' className='btn sm:w-auto px-3 py-2 rounded-lg'>Login</NavLink>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;