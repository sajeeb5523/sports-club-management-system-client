import React from 'react';
import Location from '../Location/Location';
import Banner from '../Banner/Banner';
import AboutClub from '../AboutClub/AboutClub';
import Capons from '../Capons/Capons';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutClub></AboutClub>
            <div className='bg-gradient-to-br from-gray-50 to-blue-100'>
                <Location></Location>
                <Capons></Capons>
            </div>
        </div>
    );
};

export default Home;