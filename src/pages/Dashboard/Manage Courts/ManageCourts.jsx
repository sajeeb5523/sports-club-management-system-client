import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import tennis1Image from '../../../assets/tennis court-1.jpg';
import tennis2Image from '../../../assets/tennis court-2.jpg';
import badminton1Image from '../../../assets/badminton court-1.jpg';
import badminton2Image from '../../../assets/badminton court-2.jpg';
import squash1Image from '../../../assets/squash court-1.jpg';
import squash2Image from '../../../assets/squash court-2.jpg';

const ManageCourts = () => {
    const [courts, setCourts] = useState([
        {
            id: 1,
            name: "Tennis Court 1",
            type: "Tennis",
            image: tennis1Image,
            price: 1200,
            slots: [
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        },
        {
            id: 2,
            name: "Tennis Court 2",
            type: "Tennis",
            image: tennis2Image,
            price: 1200,
            slots: [
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        },
        {
            id: 3,
            name: "Badminton Court 1",
            type: "Badminton",
            image: badminton1Image,
            price: 800,
            slots: [
                "08:00 AM - 09:00 AM",
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "01:00 PM - 02:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        },
        {
            id: 4,
            name: "Badminton Court 2",
            type: "Badminton",
            image: badminton2Image,
            price: 800,
            slots: [
                "08:00 AM - 09:00 AM",
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "01:00 PM - 02:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        },
        {
            id: 5,
            name: "Squash Court 1",
            type: "Squash",
            image: squash1Image,
            price: 1000,
            slots: [
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        },
        {
            id: 6,
            name: "Squash Court 2",
            type: "Squash",
            image: squash2Image,
            price: 1000,
            slots: [
                "09:00 AM - 10:00 AM",
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "02:00 PM - 03:00 PM",
                "03:00 PM - 04:00 PM",
                "04:00 PM - 05:00 PM"
            ]
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingCourt, setEditingCourt] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        price: '',
        slots: []
    });
    const [newSlot, setNewSlot] = useState('');

    const courtTypes = ['Tennis', 'Badminton', 'Squash'];
    const defaultImages = {
        Tennis: tennis1Image,
        Badminton: badminton1Image,
        Squash: squash1Image
    };

    // handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // add new slot to form
    const addSlot = () => {
        if (newSlot.trim() && !formData.slots.includes(newSlot.trim())) {
            setFormData(prev => ({
                ...prev,
                slots: [...prev.slots, newSlot.trim()]
            }));
            setNewSlot('');
        }
    };

    // remove slot from form
    const removeSlot = (slotToRemove) => {
        setFormData(prev => ({
            ...prev,
            slots: prev.slots.filter(slot => slot !== slotToRemove)
        }));
    };

    // open modal for adding new court
    const openAddModal = () => {
        setEditingCourt(null);
        setFormData({
            name: '',
            type: '',
            price: '',
            slots: []
        });
        setShowModal(true);
    };

    // open modal for editing court
    const openEditModal = (court) => {
        setEditingCourt(court);
        setFormData({
            name: court.name,
            type: court.type,
            price: court.price.toString(),
            slots: [...court.slots]
        });
        setShowModal(true);
    };

    // close modal
    const closeModal = () => {
        setShowModal(false);
        setEditingCourt(null);
        setFormData({
            name: '',
            type: '',
            price: '',
            slots: []
        });
        setNewSlot('');
    };

    // save court (add or update)
    const saveCourt = () => {
        if (!formData.name || !formData.type || !formData.price || formData.slots.length === 0) {
            toast.error('Please fill all fields and add at least one slot');
            return;
        }

        const courtData = {
            name: formData.name,
            type: formData.type,
            price: parseInt(formData.price),
            slots: formData.slots,
            image: defaultImages[formData.type]
        };

        if (editingCourt) {
            // update existing court
            setCourts(prev => prev.map(court => 
                court.id === editingCourt.id 
                    ? { ...courtData, id: editingCourt.id }
                    : court
            ));
            toast.success('Court updated successfully!');
        } else {
            // add new court
            const newId = Math.max(...courts.map(c => c.id)) + 1;
            setCourts(prev => [...prev, { ...courtData, id: newId }]);
            toast.success('Court added successfully!');
        }

        closeModal();
    };

    // delete court
    const deleteCourt = (courtId) => {
        if (window.confirm('Are you sure you want to delete this court?')) {
            setCourts(prev => prev.filter(court => court.id !== courtId));
            toast.success('Court deleted successfully!');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Courts</h1>
                <button
                    onClick={openAddModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    Add New Court
                </button>
            </div>

            {/* courts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courts.map((court) => (
                    <div key={court.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src={court.image} 
                            alt={court.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{court.name}</h3>
                            <p className="text-gray-600 mb-2">Type: {court.type}</p>
                            <p className="text-lg font-bold text-green-600 mb-3">৳{court.price}/hour</p>
                            
                            <div className="mb-4">
                                <h4 className="font-medium text-gray-700 mb-2">Available Slots:</h4>
                                <div className="flex flex-wrap gap-1">
                                    {court.slots.slice(0, 3).map((slot, index) => (
                                        <span key={index} className="bg-gray-100 text-xs px-2 py-1 rounded">
                                            {slot}
                                        </span>
                                    ))}
                                    {court.slots.length > 3 && (
                                        <span className="bg-gray-100 text-xs px-2 py-1 rounded">
                                            +{court.slots.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditModal(court)}
                                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded font-medium transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCourt(court.id)}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">
                            {editingCourt ? 'Edit Court' : 'Add New Court'}
                        </h2>

                        <div className="space-y-4">
                            {/* court name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Court Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter court name"
                                />
                            </div>

                            {/* court type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Court Type
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select court type</option>
                                    {courtTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price per Hour (৳)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter price"
                                />
                            </div>

                            {/* slots */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Available Slots
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={newSlot}
                                        onChange={(e) => setNewSlot(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., 09:00 AM - 10:00 AM"
                                    />
                                    <button
                                        type="button"
                                        onClick={addSlot}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                    {formData.slots.map((slot, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
                                            <span className="text-sm">{slot}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeSlot(slot)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={closeModal}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveCourt}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition-colors"
                            >
                                {editingCourt ? 'Update' : 'Add'} Court
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCourts;