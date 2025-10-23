import React from 'react';
import Banner from '../Banner/Banner';
import AboutClub from '../AboutClub/AboutClub';
import Location from '../Location/Location';
import Capons from '../Capons/Capons';

const Home = () => {

    return (
        <div className="min-h-screen">
            <Banner></Banner>
            <AboutClub></AboutClub>
            <div className='bg-gradient-to-br from-gray-50 to-blue-100'>
                <Location></Location>
                <Capons></Capons>
            </div>
        </div >
    );
};

export default Home;