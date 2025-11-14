import { Typography } from '@mui/material';
import React from 'react';
import Location from '../Location/Location';
import Capons from '../Capons/Capons';

const AboutClub = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">

            {/* hero section */}
            {/* <div className="text-black py-8 px-5 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-30"></div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="text-center">
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'second.main' }}>
                            About Our Club
                        </Typography>
                         <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded"></div>
                    </div>

                    <p className="text-xl md:text-2xl opacity-90 leading-relaxed">Building champions, fostering community, and promoting excellence in sports since 2020</p>
                </div>
            </div> */}

            {/* main content */}
            <div className="max-w-7xl mx-auto px-6 py-15 pb-0.5">

                {/* history section */}
                <section className="mb-15">
                    <div className="text-center mb-10">
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Our History
                        </Typography>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded"></div>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* timeline line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 transform -translate-x-1/2 md:block hidden"></div>

                        <div className="space-y-12">
                            {/* 2020 */}
                            <div className="flex items-center relative md:flex-row flex-col md:items-start md:pl-16">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg text-center shadow-lg relative z-10 md:static min-w-20">
                                    2020
                                </div>
                                <div className="bg-gray-50 p-8 rounded-2xl ml-8 flex-1 shadow-lg md:ml-8 mt-6 md:mt-0 border-l-4 border-blue-500">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Foundation</h3>
                                    <p className="text-gray-600 leading-relaxed">Our club was established with a vision to provide world-class sports facilities and training programs for the community.</p>
                                </div>
                            </div>

                            {/* 2021 */}
                            <div className="flex items-center relative md:flex-row-reverse flex-col md:items-start md:pr-16">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg text-center shadow-lg relative z-10 md:static min-w-20">
                                    2021
                                </div>
                                <div className="bg-gray-50 p-8 rounded-2xl mr-8 flex-1 shadow-lg md:mr-8 mt-6 md:mt-0 border-r-4 border-purple-500">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">First Championship</h3>
                                    <p className="text-gray-600 leading-relaxed">Our tennis team won the regional championship, marking the beginning of our legacy in competitive sports.</p>
                                </div>
                            </div>

                            {/* 2022 */}
                            <div className="flex items-center relative md:flex-row flex-col md:items-start md:pl-16">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg text-center shadow-lg relative z-10 md:static min-w-20">
                                    2022
                                </div>
                                <div className="bg-gray-50 p-8 rounded-2xl ml-8 flex-1 shadow-lg md:ml-8 mt-6 md:mt-0 border-l-4 border-blue-500">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Expansion</h3>
                                    <p className="text-gray-600 leading-relaxed">Added state-of-the-art swimming facilities and expanded our coaching staff to include Olympic-level trainers.</p>
                                </div>
                            </div>

                            {/* 2023 */}
                            <div className="flex items-center relative md:flex-row-reverse flex-col md:items-start md:pr-16">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg text-center shadow-lg relative z-10 md:static min-w-20">
                                    2023
                                </div>
                                <div className="bg-gray-50 p-8 rounded-2xl mr-8 flex-1 shadow-lg md:mr-8 mt-6 md:mt-0 border-r-4 border-purple-500">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Digital Transformation</h3>
                                    <p className="text-gray-600 leading-relaxed">Launched our comprehensive sports club management system to better serve our members and streamline operations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* mission & vision section */}
                <section className="mb-15">
                    <div className="text-center mb-12">
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Mission & Vision
                        </Typography>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10 mt-8">

                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-10 rounded-3xl text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white opacity-10 rounded-full transform rotate-45 scale-0 group-hover:scale-110 transition-transform duration-300"></div>
                            <div className="text-5xl mb-5">🎯</div>
                            <h3 className="text-3xl font-bold mb-5">Our Mission</h3>
                            <p className="text-lg leading-relaxed opacity-90">To inspire and empower individuals of all ages and skill levels to achieve their full potential in sports while fostering a supportive community that values excellence, integrity, and personal growth.</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-10 rounded-3xl text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white opacity-10 rounded-full transform rotate-45 scale-0 group-hover:scale-110 transition-transform duration-300"></div>
                            <div className="text-5xl mb-5">🌟</div>
                            <h3 className="text-3xl font-bold mb-5">Our Vision</h3>
                            <p className="text-lg leading-relaxed opacity-90">To be the premier sports club in the region, recognized for developing champions, promoting healthy lifestyles, and creating an inclusive environment where everyone can pursue their athletic dreams.</p>
                        </div>
                    </div>
                </section>

                {/* values section */}
                <section className="mb-15">
                    <div className="text-center mb-12">

                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Our Core Values
                        </Typography>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        <div className="bg-gray-50 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-2 border-gray-200 hover:border-blue-500">
                            <div className="text-5xl mb-5">🏆</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">Excellence</h4>
                            <p className="text-gray-600 leading-relaxed">We strive for excellence in everything we do, from training programs to facility maintenance.</p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-2 border-gray-200 hover:border-blue-500">
                            <div className="text-5xl mb-5">🤝</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">Community</h4>
                            <p className="text-gray-600 leading-relaxed">Building strong relationships and fostering a sense of belonging among our members.</p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-2 border-gray-200 hover:border-blue-500">
                            <div className="text-5xl mb-5">💪</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">Resilience</h4>
                            <p className="text-gray-600 leading-relaxed">Encouraging perseverance and mental strength in the face of challenges.</p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-2 border-gray-200 hover:border-blue-500">
                            <div className="text-5xl mb-5">🎓</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">Education</h4>
                            <p className="text-gray-600 leading-relaxed">Providing comprehensive training and knowledge to develop well-rounded athletes.</p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-2 border-gray-200 hover:border-blue-500">
                            <div className="text-5xl mb-5">🌱</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">Growth</h4>
                            <p className="text-gray-600 leading-relaxed">Supporting continuous improvement and personal development for all members.</p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-2 border-gray-200 hover:border-blue-500">
                            <div className="text-5xl mb-5">❤️</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">Passion</h4>
                            <p className="text-gray-600 leading-relaxed">Instilling love for sports and physical activity in every individual we serve.</p>
                        </div>
                    </div>
                </section>

                {/* facilities section */}
                <section className="mb-15">
                    <div className="text-center mb-12">

                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Our Facilities
                        </Typography>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white p-6 rounded-2xl text-center border-2 border-gray-200 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1 hover:shadow-lg">
                            <div className="text-4xl mb-4">🎾</div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Tennis Courts</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">6 professional-grade courts with lighting for evening play</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl text-center border-2 border-gray-200 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1 hover:shadow-lg">
                            <div className="text-4xl mb-4">🏊‍♂️</div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Swimming Pool</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">Olympic-size pool with diving boards and swim lanes</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl text-center border-2 border-gray-200 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1 hover:shadow-lg">
                            <div className="text-4xl mb-4">🏋️‍♂️</div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Fitness Center</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">State-of-the-art equipment and personal training services</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl text-center border-2 border-gray-200 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1 hover:shadow-lg">
                            <div className="text-4xl mb-4">🏀</div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Basketball Court</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">Indoor court with professional flooring and equipment</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl text-center border-2 border-gray-200 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1 hover:shadow-lg">
                            <div className="text-4xl mb-4">⚽</div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Soccer Field</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">Full-size outdoor field with proper drainage and maintenance</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl text-center border-2 border-gray-200 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1 hover:shadow-lg">
                            <div className="text-4xl mb-4">🏓</div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Table Tennis</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">Multiple tables for recreational and competitive play</p>
                        </div>
                    </div>
                </section>

                {/* team section */}
                <section className="mb-15">

                    <div className="text-center mb-12">
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Our Team
                        </Typography>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                        <div className="bg-white p-8 rounded-3xl text-center shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-200">
                            <img src="https://i.ibb.co/d02r6QrK/smith.jpg" alt="" className='mb-5 rounded-2xl' />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">John Smith</h4>
                            <p className="text-blue-500 font-semibold mb-4">Founder & CEO</p>
                            <p className="text-gray-600 text-sm leading-relaxed">20+ years of experience in sports management</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl text-center shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-200">
                            <img src="https://i.ibb.co/Q3S83q5z/Sarah-Johnson.jpg" alt="" className='mb-5 rounded-2xl' />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Sarah Johnson</h4>
                            <p className="text-blue-500 font-semibold mb-4">Head Tennis Coach</p>
                            <p className="text-gray-600 text-sm leading-relaxed">Former professional player and certified instructor</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl text-center shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-200">
                            <img src="https://i.ibb.co/fdFT4STK/Mike-Davis.jpg" alt="" className='mb-5 rounded-2xl' />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Mike Davis</h4>
                            <p className="text-blue-500 font-semibold mb-4">Swimming Coach</p>
                            <p className="text-gray-600 text-sm leading-relaxed">Olympic-level training and certification</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl text-center shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-200">
                            <img src="https://i.ibb.co/w1b6hWb/Lisa-Chen.jpg" alt="" className='mb-5 rounded-2xl' />
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Lisa Chen</h4>
                            <p className="text-blue-500 font-semibold mb-4">Fitness Director</p>
                            <p className="text-gray-600 text-sm leading-relaxed">Certified personal trainer and nutrition specialist</p>
                        </div>
                    </div>
                </section>

                {/* contact section */}
                {/* <section className=" text-black">
                    <div className="text-center mb-8">

                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Get In Touch
                        </Typography>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded"></div>
                        <p className="text-xl mt-6 opacity-90">We'd love to hear from you. Contact us for any inquiries.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex items-center bg-white text-black bg-opacity-15 p-6 rounded-2xl backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 group">
                                <div className="text-4xl mr-6 min-w-16 group-hover:scale-110 transition-transform duration-300">📍</div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-semibold mb-2">Address</h4>
                                    <p className="opacity-90 leading-relaxed text-sm">House #456, Road #15, Sector #7<br />Uttara, Dhaka-1230<br />Dhaka, Bangladesh</p>
                                </div>
                            </div>

                            <div className="flex items-center bg-white text-black bg-opacity-15 p-6 rounded-2xl backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 group">
                                <div className="text-4xl mr-6 min-w-16 group-hover:scale-110 transition-transform duration-300">📞</div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-semibold mb-2">Phone</h4>
                                    <p className="opacity-90 leading-relaxed text-lg font-medium">+8801571-595523</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center bg-white text-black bg-opacity-15 p-6 rounded-2xl backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 group">
                                <div className="text-4xl mr-6 min-w-16 group-hover:scale-110 transition-transform duration-300">✉️</div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-semibold mb-2">Email</h4>
                                    <p className="opacity-90 leading-relaxed text-lg font-medium">sajeebaljabed1@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center bg-white text-black bg-opacity-15 p-6 rounded-2xl backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 group">
                                <div className="text-4xl mr-6 min-w-16 group-hover:scale-110 transition-transform duration-300">🕒</div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-semibold mb-2">Hours</h4>
                                    <p className="opacity-90 leading-relaxed text-lg font-medium"> Sat: 9:00 AM - 2:00 PM <br /> Sun-Thu: 9:00 AM - 6:00 PM <br /> Fri: <span className='text-red-500'>Closed</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}


                <Location></Location>
                <Capons></Capons>

            </div>
        </div>
    );
};

export default AboutClub;