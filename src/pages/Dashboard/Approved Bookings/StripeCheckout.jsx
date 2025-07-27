import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

// coupons from Capons.jsx
const availableCoupons = [
  { code: 'ABC', discount: 5 },
  { code: 'WELCOME10', discount: 10 },
  { code: 'SUMMER15', discount: 15 },
  { code: 'VIP20', discount: 20 },
];

const StripeCheckout = ({ booking, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');

  // calculate final price after coupon discount
  const originalPrice = booking.total;
  const discountAmount = appliedCoupon ? (originalPrice * appliedCoupon.discount / 100) : 0;
  const finalPrice = originalPrice - discountAmount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setCouponLoading(true);
    setCouponError('');

    // find the coupon in available coupons
    const foundCoupon = availableCoupons.find(
      coupon => coupon.code.toUpperCase() === couponCode.trim().toUpperCase()
    );

    if (foundCoupon) {
      setAppliedCoupon(foundCoupon);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Please see the correct coupon code in the home section');
      setAppliedCoupon(null);
    }

    setCouponLoading(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // 1. create PaymentIntent on backend with final price
      const { data } = await axiosSecure.post('/create-payment-intent', {
        amount: finalPrice * 100, // stripe expects amount in cents
        couponCode: appliedCoupon ? couponCode : null,
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
        await axiosSecure.patch(`/booking/approve/${booking._id}`, {
          status: 'confirmed',
          paid: true,
          couponCode: appliedCoupon ? couponCode : null,
          discountAmount: discountAmount
        });
        // 4. store payment data in the database
        await axiosSecure.post('/payments', {
          bookingId: booking._id,
          email: booking.email,
          amount: finalPrice,
          discount: discountAmount,
          coupon: appliedCoupon ? couponCode : null,
          paymentIntentId: paymentIntent.id,
          date: new Date().toISOString(),
        });
        // 5. update user to member status
        await axiosSecure.patch(`/users/${booking.email}`, {
          isMember: true,
          memberSince: new Date().toISOString(),
          lastBookingDate: new Date().toISOString()
        });
        // 6. invalidate user data query to refresh member status
        queryClient.invalidateQueries({ queryKey: ['userData', booking.email] });

        // 7. show success message with member status
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Payment successful! Your booking is confirmed and you are now a member!',
          showConfirmButton: false,
          timer: 3000
        });
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
        <h2 className="text-xl font-bold mb-4">Booking Payment</h2>

        {/* Coupon Code Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              disabled={appliedCoupon !== null}
            />
            {!appliedCoupon ? (
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={couponLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
              >
                {couponLoading ? 'Applying...' : 'Apply'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Remove
              </button>
            )}
          </div>
          {couponError && <div className="text-red-500 text-sm mt-1">{couponError}</div>}
          {appliedCoupon && (
            <div className="text-green-600 text-sm mt-1">
              ✓ Coupon applied! {appliedCoupon.discount}% discount
            </div>
          )}

          {/* Available Coupons Display */}

        </div>

        {/* Booking Details Section */}
        <div className="mb-6 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={booking.email}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Court Type</label>
            <input
              type="text"
              value={booking.courtType}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slots</label>
            <input
              type="text"
              value={booking.slots}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Original Price:</span>
                <span className="text-sm text-gray-700">৳{originalPrice}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Discount ({appliedCoupon.discount}%):</span>
                  <span className="text-sm text-green-600">-৳{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-1">
                <span className="font-medium text-gray-700">Final Price:</span>
                <span className="font-medium text-gray-900">৳{finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="text"
              value={new Date(booking.date).toLocaleDateString()}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
            />
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
            <CardElement className="p-3 border border-gray-300 rounded" />
          </div>

          {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition-colors"
            disabled={!stripe || loading}
          >
            {loading ? 'Processing Payment...' : `Pay ৳${finalPrice.toFixed(2)}`}
          </button>
        </form>

        <button
          className="mt-4 w-full text-gray-500 hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StripeCheckout; 