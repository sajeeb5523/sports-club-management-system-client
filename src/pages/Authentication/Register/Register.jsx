import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [profilePic, setProfilePic] = useState('');
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Register successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`${location.state ? location.state : '/'}`)

                // update userinfo in the database
                const userInfo = {
                    email: data.email,
                    role: 'user',
                    isMember: false,
                    memberSince: null,
                    lastBookingDate: null,
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                }

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log('user update info', userRes.data);

                // update user profile in the firebase
                const userProfile = {
                    displayName: data.name,
                    photoUrl: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('profile name pic updated');
                    })
                    .catch(error => {
                        console.log(error);
                    })

            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image);

        const formData = new FormData();
        formData.append('image', image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgae_upload_key}`
        const res = await axios.post(imageUploadUrl, formData);

        setProfilePic(res.data.data.url);
    }

    return (
        <div className="card bg-base-200 w-full max-w-sm mx-auto my-10 shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-4xl text-center font-bold">Create an account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* name field */}
                        <label className="label">Your Name</label>
                        <input
                            type="text" {...register('name', { required: true })}
                            className="input"
                            placeholder="Your Name"
                        />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Name is required</p>
                        }

                        {/* photo field */}
                        <label className="label">Your photo</label>
                        <input
                            onChange={handleImageUpload}
                            type='file'
                            className="file-input"
                            placeholder="Your profile picture"
                        />

                        {/* email field */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email', {
                                required: true
                            })}
                            className="input"
                            placeholder="Email"
                        />
                        {
                            errors?.email === 'required' && <p className='text-red-500'>Email is required</p>
                        }

                        {/* password field */}
                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 8
                            })}
                            className="input"
                            placeholder="Password"
                        />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 8 characters or longer</p>
                        }

                        <button className="btn btn-neutral mt-4">Signup</button>
                    </fieldset>
                    <p className='mt-2'>Already have an account? <Link to='/login' className='btn btn-link text-blue-600'>Login</Link></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>

    );
};

export default Register; 