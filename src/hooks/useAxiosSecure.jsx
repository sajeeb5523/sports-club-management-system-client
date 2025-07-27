import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
})

const useAxiosSecure = () => {
    const { user } = useAuth();

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
    return axiosSecure;
};

export default useAxiosSecure;