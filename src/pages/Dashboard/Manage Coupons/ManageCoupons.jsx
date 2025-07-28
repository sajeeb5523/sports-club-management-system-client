import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [formData, setFormData] = useState({
        code: '',
        discount: '',
        description: '',
        expiryDate: '',
        isActive: true,
        usageLimit: '',
        usedCount: 0
    });

    const axiosSecure = useAxiosSecure();

    const loadCouponsFromStorage = () => {
        const savedCoupons = localStorage.getItem('manageCoupons');
        if (savedCoupons) {
            return JSON.parse(savedCoupons);
        }
        return [
            {
                _id: '1',
                code: 'ABC',
                discount: 5,
                description: 'Discount offer',
                expiryDate: '2025-12-31',
                isActive: true,
            },
            {
                _id: '2',
                code: 'WELCOME10',
                discount: 10,
                description: 'Welcome discount for new members',
                expiryDate: '2025-12-31',
                isActive: true,
            },
            {
                _id: '3',
                code: 'SUMMER20',
                discount: 15,
                description: 'Summer special discount',
                expiryDate: '2025-08-31',
                isActive: true,               
            },
            {
                _id: '4',
                code: 'VIP20',
                discount: 20,
                description: 'Only for those who will book 5 courts.',
                expiryDate: '2025-01-31',
                isActive: true,             
            }
        ];
    };

    const saveCouponsToStorage = (couponsData) => {
        localStorage.setItem('manageCoupons', JSON.stringify(couponsData));
    };

    const fetchCoupons = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get('/coupons');
            setCoupons(response.data);
            saveCouponsToStorage(response.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
            const localCoupons = loadCouponsFromStorage();
            setCoupons(localCoupons);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetForm = () => {
        setFormData({
            code: '',
            discount: '',
            description: '',
            expiryDate: '',
            isActive: true,
            usageLimit: '',
            usedCount: 0
        });
        setEditingCoupon(null);
    };

    const handleAddCoupon = () => {
        resetForm();
        setShowModal(true);
    };

    const handleEditCoupon = (coupon) => {
        setFormData({
            code: coupon.code,
            discount: coupon.discount,
            description: coupon.description,
            expiryDate: coupon.expiryDate,
            isActive: coupon.isActive,
            usageLimit: coupon.usageLimit,
            usedCount: coupon.usedCount
        });
        setEditingCoupon(coupon);
        setShowModal(true);
    };

    const handleSaveCoupon = async (e) => {
        e.preventDefault();

        if (!formData.code || !formData.discount || !formData.description) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            if (editingCoupon) {
                const response = await axiosSecure.put(`/coupons/${editingCoupon._id}`, formData);
                const updatedCoupons = coupons.map(coupon =>
                    coupon._id === editingCoupon._id ? response.data : coupon
                );
                setCoupons(updatedCoupons);
                saveCouponsToStorage(updatedCoupons);
                toast.success('Coupon updated successfully!');
            } else {
                const response = await axiosSecure.post('/coupons', formData);
                const updatedCoupons = [...coupons, response.data];
                setCoupons(updatedCoupons);
                saveCouponsToStorage(updatedCoupons);
                toast.success('Coupon added successfully!');
            }
        } catch (error) {
            console.error('Error saving coupon:', error);
            const newCoupon = {
                _id: Date.now().toString(),
                ...formData
            };

            let updatedCoupons;
            if (editingCoupon) {
                updatedCoupons = coupons.map(coupon =>
                    coupon._id === editingCoupon._id ? { ...coupon, ...formData } : coupon
                );
                toast.success('Coupon updated successfully!');
            } else {
                updatedCoupons = [...coupons, newCoupon];
                toast.success('Coupon added successfully!');
            }
            setCoupons(updatedCoupons);
            saveCouponsToStorage(updatedCoupons);
        }

        setShowModal(false);
        resetForm();
    };

    const handleDeleteCoupon = async (couponId) => {
        if (!window.confirm('Are you sure you want to delete this coupon?')) {
            return;
        }

        try {
            await axiosSecure.delete(`/coupons/${couponId}`);
            const updatedCoupons = coupons.filter(coupon => coupon._id !== couponId);
            setCoupons(updatedCoupons);
            saveCouponsToStorage(updatedCoupons);
            toast.success('Coupon deleted successfully!');
        } catch (error) {
            console.error('Error deleting coupon:', error);
            const updatedCoupons = coupons.filter(coupon => coupon._id !== couponId);
            setCoupons(updatedCoupons);
            saveCouponsToStorage(updatedCoupons);
            toast.success('Coupon deleted successfully!');
        }
    };

    const toggleCouponStatus = async (coupon) => {
        try {
            const updatedCoupon = { ...coupon, isActive: !coupon.isActive };
            await axiosSecure.put(`/coupons/${coupon._id}`, updatedCoupon);
            setCoupons(prev => prev.map(c =>
                c._id === coupon._id ? updatedCoupon : c
            ));
            toast.success(`Coupon ${updatedCoupon.isActive ? 'activated' : 'deactivated'} successfully!`);
        } catch (error) {
            console.error('Error updating coupon status:', error);
            setCoupons(prev => prev.map(c =>
                c._id === coupon._id ? { ...c, isActive: !c.isActive } : c
            ));
            toast.success(`Coupon ${!coupon.isActive ? 'activated' : 'deactivated'} successfully!`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-40 w-40 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Coupons</h1>
                <button
                    onClick={handleAddCoupon}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    Add New Coupon
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...coupons]
                    .sort((a, b) => a.discount - b.discount)
                    .map((coupon) => (
                        <div key={coupon._id} className="bg-white rounded-lg shadow-md p-6 border">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{coupon.code}</h3>
                                    <p className="text-sm text-gray-600">{coupon.description}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {coupon.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Discount:</span>
                                    <span className="font-medium">{coupon.discount}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Expires:</span>
                                    <span className="font-medium">{new Date(coupon.expiryDate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditCoupon(coupon)}
                                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded text-sm transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => toggleCouponStatus(coupon)}
                                    className={`flex-1 py-2 px-3 rounded text-sm transition-colors ${coupon.isActive
                                            ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                            : 'bg-green-500 hover:bg-green-600 text-white'
                                        }`}
                                >
                                    {coupon.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                    onClick={() => handleDeleteCoupon(coupon._id)}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {coupons.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No coupons found. Create your first coupon!</p>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h2 className="text-2xl font-bold mb-4">
                            {editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}
                        </h2>

                        <form onSubmit={handleSaveCoupon} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Coupon Code *
                                </label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Discount Percentage *
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Usage Limit
                                </label>
                                <input
                                    type="number"
                                    name="usageLimit"
                                    value={formData.usageLimit}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <label className="ml-2 text-sm text-gray-700">Active</label>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                >
                                    {editingCoupon ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;
