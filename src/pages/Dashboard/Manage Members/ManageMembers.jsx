import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrash, FaSearch, FaCrown } from 'react-icons/fa';

const ManageMembers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    // Fetch all users, filter to members only
    const { data: users = [], isLoading, isError, error } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // Filter members (isMember: true)
    const members = useMemo(
        () => {
            console.log('All users data:', users);
            const filteredMembers = Array.isArray(users) ? users.filter(u => u.isMember) : [];
            console.log('Filtered members:', filteredMembers);
            return filteredMembers;
        },
        [users]
    );

    // Search filtered members
    const filteredMembers = useMemo(() => {
        if (!search.trim()) return members;
        return members.filter(m =>
            m.name?.toLowerCase().includes(search.toLowerCase()) ||
            m.email?.toLowerCase().includes(search.toLowerCase())
        );
    }, [members, search]);

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.delete(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Member has been deleted.',
                timer: 1500,
                showConfirmButton: false
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err?.response?.data?.message || 'Failed to delete member.'
            });
        }
    });

    // Handle delete
    const handleDelete = (member) => {
        Swal.fire({
            title: `Delete ${member.name || member.email}?`,
            text: 'Are you sure you want to remove this member?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(member._id);
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-green-700">
                <FaCrown className="inline-block" /> Manage Members
            </h2>
            <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        className="input input-bordered w-full pl-10"
                        placeholder="Search members by name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-32">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : isError ? (
                <div className="text-red-600 text-center">Failed to load members. {error?.message}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Member Since</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-500">No members found.</td>
                                </tr>
                            ) : filteredMembers.map((member, idx) => (
                                <tr key={member._id} className="hover:bg-gray-50">
                                    <td>{idx + 1}</td>
                                    <td className="font-semibold">
                                        {member.displayName || member.username || '-'}
                                    </td>
                                    <td>{member.email}</td>
                                    <td>{member.memberSince ? new Date(member.memberSince).toLocaleDateString() : '-'}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-error flex items-center gap-1"
                                            onClick={() => handleDelete(member)}
                                            disabled={deleteMutation.isLoading}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageMembers;