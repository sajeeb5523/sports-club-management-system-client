import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Courts from "../pages/Courts/Courts";
import PrivateRoute from '../routes/PrivateRoutes'
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import PendingBookings from "../pages/Dashboard/Pending Bookings/PendingBookings";
import ApprovedBookings from "../pages/Dashboard/Approved Bookings/ApprovedBookings";
import ConfirmedBookings from "../pages/Dashboard/Confirmed Bookings/ConfirmedBookings";
import PaymentHistory from "../pages/Dashboard/Payment History/PaymentHistory";
import MakeAnnouncement from "../pages/Dashboard/Make Announcement/MakeAnnouncement";

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
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
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
                Component: ConfirmedBookings,
            },
            {
                path: 'payment-history',
                Component: PaymentHistory,
            },
            {
                path: 'make-announcement',
                Component: MakeAnnouncement,
            },
        ]
    },
]);