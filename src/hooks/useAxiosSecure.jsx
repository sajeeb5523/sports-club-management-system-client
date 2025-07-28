import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        let token = user?.accessToken;
        if (!token) {
            token = localStorage.getItem('accessToken');
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.response?.status || error.status;
        
        // only redirect to forbidden for actual authorization issues
        // skip redirect if it's during payment processing or role updates
        if (status === 403) {
            const url = error.config?.url || '';
            const isPaymentRelated = url.includes('/payments') || url.includes('/booking/pay') || url.includes('/users/');
            
            // add a small delay to allow for role cache updates during payment
            if (isPaymentRelated) {
                console.warn('403 error during payment/user update - role cache may be updating');
                // don't redirect immediately for payment-related 403s
                setTimeout(() => {
                    // only redirect if we're not in a payment flow
                    if (!window.location.pathname.includes('/dashboard/approved-bookings')) {
                        navigate('/forbidden');
                    }
                }, 1000);
            } else {
                navigate('/forbidden');
            }
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;