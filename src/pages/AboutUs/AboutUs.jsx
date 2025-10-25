import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Typography } from '@mui/material';

const teamMembers = [
    {
        id: 1,
        name: 'John Smith',
        role: 'Founder & CEO',
        image: 'https://i.ibb.co/d02r6QrK/smith.jpg',
        bio: '20+ years of experience in sports management and coaching',
        social: {
            facebook: '#',
            twitter: '#',
            instagram: '#',
            linkedin: '#'
        }
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        role: 'Head Tennis Coach',
        image: 'https://i.ibb.co/Q3S83q5z/Sarah-Johnson.jpg',
        bio: 'Former professional player and certified instructor',
        social: {
            facebook: '#',
            twitter: '#',
            instagram: '#',
            linkedin: '#'
        }
    },
    {
        id: 3,
        name: 'Mike Davis',
        role: 'Swimming Coach',
        image: 'https://i.ibb.co/fdFT4STK/Mike-Davis.jpg',
        bio: 'Olympic-level training and certification in swimming coaching',
        social: {
            facebook: '#',
            twitter: '#',
            instagram: '#',
            linkedin: '#'
        }
    },
    {
        id: 4,
        name: 'Lisa Chen',
        role: 'Fitness Director',
        image: 'https://i.ibb.co/w1b6hWb/Lisa-Chen.jpg',
        bio: 'Certified personal trainer and nutrition specialist',
        social: {
            facebook: '#',
            twitter: '#',
            instagram: '#',
            linkedin: '#'
        }
    },
];

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        About Our Team
                    </Typography>

                    <p className="text-xl max-w-3xl mx-auto">
                        Meet the passionate professionals dedicated to your fitness journey and sports excellence.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 px-5">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    src={member.image}
                                    alt={member.name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white text-sm">{member.bio}</p>
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{member.role}</p>
                                <div className="flex justify-center space-x-4">
                                    {Object.entries(member.social).map(([platform, url]) => {
                                        const Icon = {
                                            facebook: FaFacebook,
                                            twitter: FaTwitter,
                                            instagram: FaInstagram,
                                            linkedin: FaLinkedin
                                        }[platform];

                                        return (
                                            <a
                                                key={platform}
                                                href={url}
                                                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                                aria-label={platform}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Icon className="h-5 w-5" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className='px-5'>
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
                        <h3 className="text-3xl font-bold mb-4">Ready to join our community?</h3>
                        <p className="text-blue-100 max-w-2xl mx-auto">
                            Become a member today and start your journey towards better health and fitness with our expert team by your side.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;