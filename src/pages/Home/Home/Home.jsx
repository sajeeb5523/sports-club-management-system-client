import React from 'react';
import Location from '../Location/Location';
import Banner from '../Banner/Banner';
import AboutClub from '../AboutClub/AboutClub';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutClub></AboutClub>
            <Location></Location>
        </div>
    );
};

export default Home;