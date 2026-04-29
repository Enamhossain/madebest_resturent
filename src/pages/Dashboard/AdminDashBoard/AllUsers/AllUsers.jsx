import React, { memo, useState } from 'react';
import useAxiosSecure from '../../../../hooks/AxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import swal from 'sweetalert';
import { FaUserShield, FaTrash, FaEdit, FaUserCircle, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const AllUsers = memo(() => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data?.data || res.data || [];
        }
    });

    // Mutations for actions
    const adminMutation = useMutation({
        mutationFn: (userId) => axiosSecure.patch(`/users/admin/${userId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['admin-users']);
            swal("Success!", "User role updated to Administrator.", "success");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (userId) => axiosSecure.delete(`/users/${userId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['admin-users']);
            swal("Deleted!", "User account has been removed.", "success");
        }
    });

    const handleMakeAdmin = (user) => {
        swal({
            title: "Elevate to Admin?",
            text: `Are you sure you want to grant administrator access to ${user.email}?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirm) => {
            if (confirm) {
                adminMutation.mutate(user._id);
            }
        });
    };

    const handleDelete = (user) => {
        swal({
            title: "Terminate Account?",
            text: `This action cannot be undone. User ${user.email} will be permanently removed.`,
            icon: "error",
            buttons: true,
            dangerMode: true,
        }).then((confirm) => {
            if (confirm) {
                deleteMutation.mutate(user._id);
            }
        });
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-16 bg-gray-50 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">User Directory</h2>
                    <p className="text-gray-500 mt-1">Manage platform access and user roles.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <FaUserShield className="text-orange-500" />
                    <span className="font-bold text-gray-700">{users.length}</span>
                    <span className="text-gray-400 text-sm font-medium">Active Users</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Profile</th>
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Email Address</th>
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Access Role</th>
                                <th className="px-6 py-5 text-right text-[11px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((item, idx) => (
                                <tr key={idx} className="group hover:bg-orange-50/30 transition-colors">
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm ring-1 ring-gray-100 overflow-hidden">
                                                {item.avatar || item.photoURL ? (
                                                    <img src={item.avatar || item.photoURL} className="w-full h-full object-cover" alt="" />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                        <FaUserCircle size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 leading-none">
                                                    {item.name || `${item.first_name || ''} ${item.last_name || ''}`.trim() || 'User'}
                                                </p>
                                                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mt-1">ID: ...{item._id?.slice(-6)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaEnvelope size={12} className="text-gray-300" />
                                            <span className="text-sm font-medium">{item.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        {item.role === 'admin' ? (
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-wider">
                                                <FaShieldAlt size={10} />
                                                Administrator
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => handleMakeAdmin(item)}
                                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all shadow-sm active:scale-95"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-orange-100 hover:text-orange-600 transition-all active:scale-95"
                                                title="Edit User"
                                            >
                                                <FaEdit size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(item)}
                                                className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-600 hover:text-white transition-all active:scale-95"
                                                title="Delete User"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {users.length === 0 && (
                    <div className="p-20 text-center">
                        <FaUserCircle className="mx-auto text-gray-200 mb-4" size={64} />
                        <h3 className="text-lg font-bold text-gray-900">No users found</h3>
                        <p className="text-gray-500 text-sm">Your user directory is currently empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
});

AllUsers.displayName = 'AllUsers';

export default AllUsers;
