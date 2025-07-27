import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
})

const useAxiosSecure = () => {
    const { user } = useAuth();

    axiosSecure.interceptors.request.use(config => {
        // const token = localStorage.getItem('accessToken');
        config.headers.Authorization = `Bearer ${user.accessToken}`
        // if (token) {
        // }
        return config;
    }, error => {
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;