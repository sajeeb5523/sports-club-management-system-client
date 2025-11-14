import React, { useState, useEffect } from 'react';
import './Banner.css';
import clubImage from '../../../assets/club.jpg';
import courtsImage from '../../../assets/courts.png';
import activitiesImage from '../../../assets/activities.png';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Club",
            subtitle: "Join our exclusive sports club",
            description: "Experience premium facilities and world-class amenities",
            image: clubImage,
            color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            id: 2,
            title: "Courts",
            subtitle: "Professional sports courts",
            description: "Multiple courts for tennis, basketball, and more",
            image: courtsImage,
            color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            id: 3,
            title: "Activities",
            subtitle: "Exciting sports activities",
            description: "From beginner to advanced, we have something for everyone",
            image: activitiesImage,
            color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // const nextSlide = () => {
    //     setCurrentSlide((prev) => (prev + 1) % slides.length);
    // };

    // const prevSlide = () => {
    //     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    // };

    return (
        <div className="banner-container">
            <div className="banner-slider">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{
                            background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <div className="slide-content">
                            <h1 className="slide-title">{slide.title}</h1>
                            <h2 className="slide-subtitle">{slide.subtitle}</h2>
                            <p className="slide-description">{slide.description}</p>
                            <button className="slide-button">See More</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
            </button>
            <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>

            {/* Dots indicator */}
            <div className="banner-dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`banner-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;