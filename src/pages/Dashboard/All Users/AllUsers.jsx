import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaSearch, FaUser, FaCrown, FaUserShield, FaTrash, FaUsers } from 'react-icons/fa';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    // fetch all users
    const { data: users = [], isLoading, isError, error } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // search filtered users
    const filteredUsers = useMemo(() => {
        if (!search.trim()) return users;
        return users.filter(user =>
            user.displayName?.toLowerCase().includes(search.toLowerCase()) ||
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    // delete user mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.delete(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allUsers'] });
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'User has been deleted.',
                timer: 1500,
                showConfirmButton: false
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete user.',
            });
        }
    });

    // role update mutation
    const roleUpdateMutation = useMutation({
        mutationFn: async ({ email, role }) => {
            return axiosSecure.patch(`/users/${email}`, { role });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allUsers'] });
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'User role has been updated.',
                timer: 1500,
                showConfirmButton: false
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update user role.',
            });
        }
    });

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete ${user.displayName || user.name || user.email}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(user._id);
            }
        });
    };

    const handleRoleUpdate = (user, newRole) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Change ${user.displayName || user.name || user.email}'s role to ${newRole}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                roleUpdateMutation.mutate({ email: user.email, role: newRole });
            }
        });
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin':
                return <FaUserShield className="text-red-500" />;
            case 'member':
                return <FaCrown className="text-yellow-500" />;
            default:
                return <FaUser className="text-gray-500" />;
        }
    };

    const getRoleBadge = (role, isMember) => {
        if (role === 'admin') {
            return <span className="badge badge-error badge-sm">Admin</span>;
        }
        if (isMember) {
            return <span className="badge badge-warning badge-sm">Member</span>;
        }
        return <span className="badge badge-ghost badge-sm">User</span>;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="alert alert-error">
                <span>Error loading users: {error?.message}</span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                {/* <h1 className="text-3xl font-bold text-gray-800 mb-2">All Users</h1> */}
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-green-700">
                    <FaUsers className="inline-block" /> All Users
                </h2>
                <p className="text-gray-600">Manage all registered users and their roles</p>
            </div>

            {/* search Bar */}
            <div className="mb-6">
                <div className="relative w-full">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full pl-10 pr-4"
                    />
                </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="stat bg-base-100 rounded-lg shadow">
                    <div className="stat-figure text-primary">
                        <FaUser className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-primary">{users.length}</div>
                </div>
                <div className="stat bg-base-100 rounded-lg shadow">
                    <div className="stat-figure text-warning">
                        <FaCrown className="text-3xl" />
                    </div>
                    <div className="stat-title">Members</div>
                    <div className="stat-value text-warning">{users.filter(u => u.isMember).length}</div>
                </div>
                <div className="stat bg-base-100 rounded-lg shadow">
                    <div className="stat-figure text-error">
                        <FaUserShield className="text-3xl" />
                    </div>
                    <div className="stat-title">Admins</div>
                    <div className="stat-value text-error">{users.filter(u => u.role === 'admin').length}</div>
                </div>
            </div>

            {/* users table */}
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Member Status</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">No users found.</td>
                            </tr>
                        ) : filteredUsers.map((user, idx) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td>{idx + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                                                {user.displayName ? user.displayName.charAt(0).toUpperCase() :
                                                    user.name ? user.name.charAt(0).toUpperCase() :
                                                        user.email.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-semibold">
                                                {user.displayName || user.name || 'No Name'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        {getRoleIcon(user.role)}
                                        {getRoleBadge(user.role, user.isMember)}
                                    </div>
                                </td>
                                <td>
                                    {user.isMember ? (
                                        <span className="text-green-600 font-semibold">✓ Member</span>
                                    ) : (
                                        <span className="text-gray-500">User</span>
                                    )}
                                </td>
                                <td>
                                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        {user.role !== 'admin' && (
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => handleRoleUpdate(user, 'admin')}
                                                disabled={roleUpdateMutation.isLoading}
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        {user.role === 'admin' && (
                                            <button
                                                className="btn btn-sm btn-info"
                                                onClick={() => handleRoleUpdate(user, 'user')}
                                                disabled={roleUpdateMutation.isLoading}
                                            >
                                                Remove Admin
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleDelete(user)}
                                            disabled={deleteMutation.isLoading}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;