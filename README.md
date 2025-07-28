# SCMS-BD - Sports Club Management System

A comprehensive web application for managing sports club operations, including court bookings, member management, payment processing, and administrative functions.

## 🌐 Live Site
**URL:** [https://sports-club-management-s-def4a.web.app/](https://sports-club-management-s-def4a.web.app/)

## 👨‍💼 Admin Credentials
**Username:** sajeebaljabed@gmail.com  
**Password:** Sajeeb12

## ✨ Key Features

• **User Authentication & Authorization** - Secure login/registration with Firebase authentication and role-based access control

• **Court Booking System** - Interactive court reservation with real-time availability, booking confirmation, and payment integration

• **Membership Management** - Complete member registration, profile management, and membership status tracking

• **Payment Processing** - Integrated Stripe payment gateway for membership fees and court bookings with receipt generation

• **Coupon System** - Dynamic coupon creation, validation, and automatic usage tracking for discounts and promotions

• **Admin Dashboard** - Comprehensive administrative panel for managing users, bookings, courts, and system announcements

• **Booking Management** - Advanced booking system with pending, confirmed, and approved booking workflows

• **Interactive Maps** - Leaflet integration for location services and court mapping functionality

• **Real-time Notifications** - Toast notifications and alerts for booking confirmations, payment status, and system updates

• **Responsive Design** - Mobile-first design with Tailwind CSS and DaisyUI components for optimal user experience

• **Data Analytics** - User activity tracking, booking statistics, and payment history with detailed reporting

• **Role-based Access Control** - Separate interfaces for admins, members, and regular users with appropriate permissions

• **Announcement System** - Admin capability to create and manage system-wide announcements for users

• **Profile Management** - Comprehensive user profile system with photo uploads and personal information management

• **Payment History** - Detailed transaction history with filtering and search capabilities for users and admins

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, Tailwind CSS, DaisyUI
- **State Management:** TanStack Query (React Query)
- **Authentication:** Firebase Auth
- **Payment:** Stripe Integration
- **Maps:** React Leaflet
- **Forms:** React Hook Form
- **Notifications:** React Hot Toast, SweetAlert2
- **HTTP Client:** Axios with interceptors
- **Icons:** React Icons
- **Routing:** React Router

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm
- Firebase project setup
- Stripe account for payments


## 📱 User Roles & Access

### Admin
- Full system access
- User management
- Court management
- Booking oversight
- Coupon creation
- System announcements

### Member
- Court booking privileges
- Payment history access
- Profile management
- Exclusive member features

### Regular User
- Basic profile access
- View courts and pricing
- Registration for membership

## 🔧 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── Authentication/ # Login/Register pages
│   ├── Dashboard/      # Admin/User dashboards
│   ├── Courts/         # Court-related pages
│   └── Home/           # Landing page components
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── utils/              # Utility functions
├── routes/             # Route configurations
└── api/                # API integration
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email sajeebaljabed1@gmail.com or create an issue in the repository.

---

**Developed with ❤️ for efficient sports club management**