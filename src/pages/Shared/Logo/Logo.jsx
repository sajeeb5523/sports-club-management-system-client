import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to='/'>
                <div className='flex items-center gap-2'>
                    <img className='w-20 h-15' src={logo} alt="" />
                    <p className='text-[32px] font-bold'>SCMS</p>
                </div>
            </Link>
        </div>
    );
};

export default Logo;