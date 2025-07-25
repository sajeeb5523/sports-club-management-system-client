import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const StripeCheckout = ({ booking, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // 1. create PaymentIntent on backend
      const { data } = await axiosSecure.post('/create-payment-intent', {
        amount: booking.total * 100, // stripe expects amount in cents
      });
      const clientSecret = data.clientSecret;
      // 2. confirm card payment
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: booking.email,
          },
        },
      });
      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }
      if (paymentIntent.status === 'succeeded') {
        // 3. update booking status on backend
        await axiosSecure.patch(`/booking/approve/${booking._id}`, { status: 'confirmed', paid: true });
        onSuccess();
        onClose();
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Payment failed.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Pay for Booking</h2>
        <form onSubmit={handleSubmit}>
          <CardElement className="p-2 border rounded mb-4" />
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded mt-2"
            disabled={!stripe || loading}
          >
            {loading ? 'Processing...' : `Pay ৳${booking.total}`}
          </button>
        </form>
        <button className="mt-4 text-gray-500" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default StripeCheckout; 