import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useUserData from '../../../hooks/useUserData';
import { FaBullhorn } from 'react-icons/fa';

const MakeAnnouncement = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [form, setForm] = useState({ title: '', message: '' });
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', message: '' });
    const { userData, isLoading: userDataLoading } = useUserData();

    // Fetch all announcements
    const { data: announcements = [], isLoading, isError, error } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            return res.data;
        },
    });

    // Add announcement
    const addMutation = useMutation({
        mutationFn: async (data) => {
            return axiosSecure.post('/announcements', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['announcements']);
            setForm({ title: '', message: '' });
            Swal.fire('Added!', 'Announcement added successfully.', 'success');
        },
        onError: () => {
            Swal.fire('Error', 'Failed to add announcement.', 'error');
        }
    });

    // Delete announcement
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.delete(`/announcements/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['announcements']);
            Swal.fire('Deleted!', 'Announcement deleted.', 'success');
        },
        onError: () => {
            Swal.fire('Error', 'Failed to delete announcement.', 'error');
        }
    });

    // Update announcement
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            return axiosSecure.patch(`/announcements/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['announcements']);
            setEditingId(null);
            Swal.fire('Updated!', 'Announcement updated.', 'success');
        },
        onError: () => {
            Swal.fire('Error', 'Failed to update announcement.', 'error');
        }
    });

    const handleAdd = (e) => {
        e.preventDefault();
        if (!form.title || !form.message) return Swal.fire('Error', 'All fields required.', 'error');
        addMutation.mutate(form);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    const handleEdit = (announcement) => {
        setEditingId(announcement._id);
        setEditForm({ title: announcement.title, message: announcement.message });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!editForm.title || !editForm.message) return Swal.fire('Error', 'All fields required.', 'error');
        updateMutation.mutate({ id: editingId, data: editForm });
    };

    if (isLoading || userDataLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error?.message || 'Failed to load announcements.'}</div>;

    return (
        <div className=" p-6">
            {/* <h2 className="text-2xl font-bold mb-4"></h2> */}
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-green-700">
                <FaBullhorn className="inline-block" /> Make Announcement
            </h2>
            {/* Only show form if admin */}
            {userData?.role === 'admin' && (
                <form onSubmit={handleAdd} className="mb-6 bg-gray-100 p-4 rounded">
                    <input
                        type="text"
                        placeholder="Title"
                        className="border p-2 mr-2 mb-2 w-full"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Message"
                        className="border p-2 mr-2 mb-2 w-full"
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
                </form>
            )}
            {/* Announcements List */}
            <div>
                {announcements.length === 0 && <div>No announcements found.</div>}
                {announcements.map(a => (
                    <div key={a._id} className="mb-4 p-4 border rounded bg-white">
                        {editingId === a._id && userData?.role === 'admin' ? (
                            <form onSubmit={handleUpdate} className="mb-2">
                                <input
                                    type="text"
                                    className="border p-2 mr-2 mb-2 w-full"
                                    value={editForm.title}
                                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                />
                                <textarea
                                    className="border p-2 mr-2 mb-2 w-full"
                                    value={editForm.message}
                                    onChange={e => setEditForm({ ...editForm, message: e.target.value })}
                                />
                                <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded mr-2">Update</button>
                                <button type="button" className="bg-gray-400 text-white px-3 py-1 rounded" onClick={() => setEditingId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <div className="font-semibold text-lg">{a.title}</div>
                                <div className="mb-2 whitespace-pre-wrap">{a.message}</div>
                                {/* Only admin can see edit/delete buttons */}
                                {userData?.role === 'admin' && (
                                    <>
                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEdit(a)}>Edit</button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(a._id)}>Delete</button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MakeAnnouncement;