import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaUser, FaClock, FaCheckCircle, FaClipboardCheck, FaMoneyBill, FaBullhorn, FaUserShield, FaUsers, FaCrown, FaTicketAlt } from 'react-icons/fa';
import Logo from '../pages/Shared/Logo/Logo';
import useUserRole from '../hooks/useUserRole';
import { MdManageSearch, MdOutlinePendingActions } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';

// Add global styles to remove focus outline for NavLink components
const globalStyles = `
  .nav-link:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

const DashboardLayout = () => {

    const { role, roleLoading } = useUserRole();
    console.log(role);

    // function to close sidebar on mobile after navigation
    const handleNavClick = () => {
        // only close on mobile devices (when drawer is not always open)
        const drawerToggle = document.getElementById('my-drawer-2');
        if (drawerToggle && window.innerWidth < 1024) {
            drawerToggle.checked = false;
        }
    };

    return (
        <>
            <style>{globalStyles}</style>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">

                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                        <div className="flex-none">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2 lg:hidden"></div>
                    </div>
                    {/* Page content here */}
                    <Outlet></Outlet>
                    {/* Page content here */}

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <Logo></Logo>
                        <li className='mt-3'>
                            <NavLink
                                to='/dashboard'
                                end
                                onClick={handleNavClick}
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                }
                            >
                                <FaHome className="inline-block mr-2" />Home
                            </NavLink>
                        </li>

                        {/* default user links - only show for non-members */}
                        {!roleLoading && role !== 'member' && role !== 'admin' &&
                            <>
                                <li>
                                    <NavLink
                                        to='/dashboard/my-profile'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaUser className="inline-block mr-2" />My Profile
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/pending-bookings'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaClock className="inline-block mr-2" />Pending Bookings
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/approved-bookings'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaCheckCircle className="inline-block mr-2" />Approved Bookings
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/make-announcement'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaBullhorn className="inline-block mr-2" />Announcement
                                    </NavLink>
                                </li>
                            </>
                        }

                        {/* member links */}
                        {!roleLoading && role === 'member' &&
                            <>
                                <li>
                                    <NavLink
                                        to='/dashboard/my-profile'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaUser className="inline-block mr-2" />My Profile
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/pending-bookings'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaClock className="inline-block mr-2" />Pending Bookings
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/approved-bookings'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaCheckCircle className="inline-block mr-2" />Approved Bookings
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/confirmed-bookings'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaClipboardCheck className="inline-block mr-2" />Confirmed Bookings
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/payment-history'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaMoneyBill className="inline-block mr-2" />Payment History
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/make-announcement'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaBullhorn className="inline-block mr-2" />Announcement
                                    </NavLink>
                                </li>
                            </>
                        }


                        {/* admin links */}
                        {!roleLoading && role === 'admin' &&
                            <>
                                <li>
                                    <NavLink
                                        to='/dashboard/admin-profile'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaUserShield className="inline-block mr-2" />Admin Profile
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/pending-bookings'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <MdOutlinePendingActions className="inline-block mr-2" />Manage Booking Approval
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/manage-members'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaCrown className="inline-block mr-2" />Manage Members
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/all-users'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaUsers className="inline-block mr-2" />All Users
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/manage-courts'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <MdManageSearch className="inline-block mr-2" />Manage Courts
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/manage-bookings'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <GiConfirmed className="inline-block mr-2" />Manage Bookings
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/manage-coupons'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaTicketAlt className="inline-block mr-2" />Manage Coupons
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to='/dashboard/make-announcement'
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
                                        }
                                    >
                                        <FaBullhorn className="inline-block mr-2" />Make Announcement
                                    </NavLink>
                                </li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;