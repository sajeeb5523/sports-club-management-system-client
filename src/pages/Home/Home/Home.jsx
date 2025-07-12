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
            <Location></Location>
            <Capons></Capons>
        </div>
    );
};

export default Home;