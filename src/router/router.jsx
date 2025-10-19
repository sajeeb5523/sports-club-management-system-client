import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Courts from "../pages/Courts/Courts";
import PrivateRoute from '../routes/PrivateRoutes'
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import PendingBookings from "../pages/Dashboard/Pending Bookings/PendingBookings";
import ApprovedBookings from "../pages/Dashboard/Approved Bookings/ApprovedBookings";
import ConfirmedBookings from "../pages/Dashboard/Confirmed Bookings/ConfirmedBookings";
import PaymentHistory from "../pages/Dashboard/Payment History/PaymentHistory";
import MakeAnnouncement from "../pages/Dashboard/Make Announcement/MakeAnnouncement";
import AdminProfile from "../pages/Dashboard/Admin Profile/AdminProfile";
import ManageMembers from "../pages/Dashboard/Manage Members/ManageMembers";
import AllUsers from "../pages/Dashboard/All Users/AllUsers";
import ManageCourts from "../pages/Dashboard/Manage Courts/ManageCourts";
import ManageCoupons from "../pages/Dashboard/Manage Coupons/ManageCoupons";
import ManageBookings from "../pages/Dashboard/Manage Bookings/ManageBookings";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import MemberRoute from "../routes/MemberRoute";
import Activities from "../pages/Activities/Activities";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/courts',
                Component: Courts,
            },
            {
                path: '/activities',
                Component: Activities,
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/forbidden',
                Component: Forbidden,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome,
            },
            {
                path: 'my-profile',
                Component: MyProfile,
            },
            {
                path: 'pending-bookings',
                Component: PendingBookings,
            },
            {
                path: 'confirmed-bookings',
                Component: ConfirmedBookings,
            },
            {
                path: 'make-announcement',
                Component: MakeAnnouncement,
            },

            // member only routes
            {
                path: 'my-profile',
                Component: MyProfile,
            },
            {
                path: 'pending-bookings',
                Component: PendingBookings,
            },
            {
                path: 'approved-bookings',
                Component: ApprovedBookings,
            },
            {
                path: 'confirmed-bookings',
                element: <MemberRoute><ConfirmedBookings></ConfirmedBookings></MemberRoute>,
            },
            {
                path: 'payment-history',
                element: <MemberRoute><PaymentHistory></PaymentHistory></MemberRoute>,
            },
            {
                path: 'make-announcement',
                Component: MakeAnnouncement,
            },

            // admin only routes
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>,
            },
            {
                path: 'manage-members',
                element: <AdminRoute><ManageMembers></ManageMembers></AdminRoute>,
            },
            {
                path: 'all-users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
            },
            {
                path: 'manage-courts',
                element: <AdminRoute><ManageCourts></ManageCourts></AdminRoute>,
            },
            {
                path: 'manage-bookings',
                element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute>,
            },
            {
                path: 'manage-coupons',
                element: <AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>,
            },
            {
                path: 'make-announcement',
                element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>,
            },
        ]
    },
]);