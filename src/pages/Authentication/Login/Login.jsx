import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <div className="card bg-base-200 w-full max-w-sm mx-auto my-10 shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-4xl mx-auto font-bold">Login now!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* email field */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="input"
                            placeholder="Email"
                        />

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

                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                    <p className='mt-2'>Don’t have any account? <Link to='/register' className='btn btn-link text-blue-600'>Register</Link></p>
                </form>
            </div>
        </div>

    );
};

export default Login;