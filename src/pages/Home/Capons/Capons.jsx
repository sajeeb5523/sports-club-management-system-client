import React from 'react';

const coupons = [
    { code: 'ABC', discount: 5 },
    { code: 'WELCOME10', discount: 10 },
    { code: 'SUMMER15', discount: 15 },
    { code: 'VIP20', discount: 20 },
];

const Capons = () => {
    return (
        <div style={{ background: 'linear-gradient(90deg, #f9d423 0%, #ff4e50 100%)', padding: '2rem 0', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', margin: '2rem 0' }}>
            <h2 style={{ textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem', letterSpacing: '2px' }}>🎁 Special Promotions & Discount Coupons 🎁</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                {coupons.map((coupon) => (
                    <div key={coupon.code} style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem 2rem', minWidth: '200px', boxShadow: '0 2px 12px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#ff4e50', marginBottom: '0.5rem', letterSpacing: '1px' }}>Coupon</span>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: '#f9d423', marginBottom: '0.5rem', letterSpacing: '2px' }}>{coupon.code}</span>
                        <span style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}>Get <b>{coupon.discount}%</b> OFF</span>
                        <span style={{ fontSize: '0.9rem', color: '#888' }}>Use at checkout</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Capons;