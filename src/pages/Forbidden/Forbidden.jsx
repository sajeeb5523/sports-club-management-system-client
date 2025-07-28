import React from 'react';
import { useNavigate } from 'react-router';

const Forbidden = () => {
    const navigate = useNavigate();
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
            color: '#222',
            padding: '2rem',
        }}>
            <h1 style={{ fontSize: '7rem', fontWeight: 'bold', margin: 0, color: '#ff4d4f', letterSpacing: '2px' }}>403</h1>
            <h2 style={{ fontSize: '2.5rem', margin: '1rem 0 0.5rem 0', fontWeight: 600 }}>Access Forbidden</h2>
            <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem', maxWidth: 400, textAlign: 'center' }}>
                Sorry, you don&apos;t have permission to access this page.<br />
                Please contact your administrator if you believe this is a mistake.
            </p>
            <button
                onClick={() => navigate('/')}
                style={{
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    background: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'background 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#d9363e'}
                onMouseOut={e => e.currentTarget.style.background = '#ff4d4f'}
            >
                Go to Homepage
            </button>
        </div>
    );
};

export default Forbidden;