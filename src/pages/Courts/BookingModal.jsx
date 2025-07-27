import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const BookingModal = ({ court, onClose }) => {
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // get today's date for min date attribute
    const today = new Date().toISOString().split('T')[0];

    const handleSlotToggle = (slot) => {
        setSelectedSlots(prev =>
            prev.includes(slot)
                ? prev.filter(s => s !== slot)
                : [...prev, slot]
        );
    };

    const calculateTotalPrice = () => {
        return selectedSlots.length * court.price;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({
            court: court.name,
            date: selectedDate,
            slots: selectedSlots,
            total: calculateTotalPrice()
        });

        if (selectedSlots.length === 0) {
            alert('Please select at least one time slot');
            return;
        }

        if (!selectedDate) {
            alert('Please select a date');
            return;
        }

        setIsSubmitting(true);

        try {
            const bookingData = {
                courtId: court._id,
                courtName: court.name,
                courtType: court.type,
                date: selectedDate,
                slots: selectedSlots,
                total: calculateTotalPrice(),
                email: user.email,
            };
            const res = await axiosSecure.post('/booking', bookingData);
            console.log('Booking response:', res.data);
            console.log(bookingData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Booking Pending",
                    text: "Your booking request has been sent and is pending admin approval.",
                    icon: "info",
                    timer: 2000,
                    showConfirmButton: false,
                });
                onClose();
            } else {
                alert('Booking failed. Please try again.');
                console.error('Booking failed response:', res.data);
            }
        } catch (error) {
            alert('Booking failed. Please try again.');
            console.error('Booking error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[1000] p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[modalSlideIn_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-6 border-b-2 border-gray-100 bg-gradient-to-tr from-indigo-500 to-purple-700 text-white rounded-t-2xl">
                    <h2 className="m-0 text-2xl font-bold">Book {court.name}</h2>
                    <button className="bg-transparent border-none text-white text-3xl cursor-pointer p-0 w-10 h-10 flex items-center justify-center rounded-full transition hover:bg-white/20" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="mb-8">
                        <h3 className="text-gray-800 mb-4 text-lg font-semibold border-b-2 border-gray-200 pb-2">Court Information</h3>
                        <div className="bg-gray-100 rounded-lg p-6">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                <label className="font-semibold text-gray-700">Court Name:</label>
                                <span className="text-gray-800 font-medium">{court.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                <label className="font-semibold text-gray-700">Court Type:</label>
                                <span className="text-gray-800 font-medium">{court.type}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 last:border-b-0">
                                <label className="font-semibold text-gray-700">Price per Session:</label>
                                <span className="text-gray-800 font-medium">৳{court.price}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-gray-800 mb-4 text-lg font-semibold border-b-2 border-gray-200 pb-2">Booking Details</h3>

                        <div className="mb-6">
                            <label htmlFor="booking-date" className="block mb-2 font-semibold text-gray-800">Select Date:</label>
                            <input
                                type="date"
                                id="booking-date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={today}
                                required
                                className="w-full p-3 border-2 border-gray-200 rounded-lg text-base bg-white transition focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-gray-800">Select Time Slots:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                {court.slots.map((slot, index) => (
                                    <div key={index} className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer transition hover:border-indigo-500 hover:bg-indigo-50">
                                        <input
                                            type="checkbox"
                                            id={`slot-${index}`}
                                            checked={selectedSlots.includes(slot)}
                                            onChange={() => handleSlotToggle(slot)}
                                            className="w-5 h-5 accent-indigo-500"
                                        />
                                        <label htmlFor={`slot-${index}`} className="m-0 cursor-pointer font-medium text-gray-800 flex-1 select-none">
                                            {slot}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedSlots.length > 0 && (
                            <div className="bg-gradient-to-tr from-indigo-500 to-purple-700 text-white rounded-xl p-6 mt-6">
                                <h4 className="m-0 mb-4 text-lg font-semibold">Booking Summary</h4>
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center py-2 border-b border-white/20">
                                        <span>Selected Slots:</span>
                                        <span>{selectedSlots.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-white/20">
                                        <span>Price per Slot:</span>
                                        <span>৳{court.price}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 font-bold text-lg border-t-2 border-white/30 border-b-0 pt-4 mt-2">
                                        <span>Total Amount:</span>
                                        <span>৳{calculateTotalPrice()}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 mt-8 pt-6 border-t-2 border-gray-100 sm:flex-row flex-col">
                        <button
                            type="button"
                            className="flex-1 py-3 bg-gray-600 text-white rounded-lg text-base font-semibold uppercase tracking-wide transition hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-lg text-base font-semibold uppercase tracking-wide transition hover:from-green-700 hover:to-green-600 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={isSubmitting || selectedSlots.length === 0 || !selectedDate}
                        >
                            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;