import  { useState } from 'react';
import useAxiosSecure from '../../../../hooks/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import swal from 'sweetalert';
import Loading from '../../../../Component/Loading';

function AllUsers() {
    // const radios = ["Write and Read", "Read only", "Write only"];
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/users', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}` // Add a space after 'Bearer'
                    }
                });
                // Handle pagination response
                return res.data?.data || res.data || [];
            } catch (error) {
                // Handle errors appropriately
                console.error('Error fetching users:', error);
                throw error;
            }
        }
    });

    if (isLoading) {
        return <Loading />;
    }
    

    // State to track user being edited
    const [editingUser, setEditingUser] = useState(null);

    const handleEdit = (user) => {
        setEditingUser(user);
        // Perform edit action, for example, open a modal with user details for editing
    };

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    swal({
                        title: `Are you sure? Make Admin ${user.email}`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((willDelete) => {
                        if (willDelete) {
                            swal("User Successfully Admin  !", {
                                icon: "success",
                            });
                        } else {
                            swal("Your imaginary file is safe!");
                        }
                    });
                }
                refetch();
            });
    };
    const handleDelete = user => {
        axiosSecure.delete(`/users/${user._id}`)
            .then(res => {
                console.log(res);
                // Check the response status and show a success message if necessary
                if (res.status === 200) {
                    swal("Success!", "Item deleted successfully", "success");
                    // Refetch data to update the UI
                    refetch();
                } else {
                    // Handle other status codes if necessary
                    swal("Error", "Failed to delete item", "error");
                }
            })
            .catch(error => {
                console.error("Error deleting item:", error);
                // Handle error
                swal("Error", "Failed to delete item", "error");
            });
    };

    return (
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto w-full">
            <h2 className='text-center'>TOTAL USER :{users.length} </h2>
            <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                        <th className="py-3 px-6">Username</th>
                        <th className="py-3 px-6">Email</th>
                        <th className="py-3 px-6">Role</th>
                        <th className="py-3 px-6">Action</th>
                        <th className="py-3 px-6"></th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                    {users.map((item, idx) => (
                        <tr key={idx}>
                            <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                <img src={item.avatar} className="w-10 h-10 rounded-full" />
                                <div>
                                    <span className="block text-gray-700 text-sm font-medium">{item.name} {item.first_name} {item.last_name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                    {
                                        item.role === 'admin' ? 'Admin' :
                                            <select
                                                name="role"
                                                id="role"
                                                defaultValue='Select user role'
                                                className="mt-3 bg-white text-black block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            >
                                                <option disabled>Select user role</option>
                                                {/* Iterate over radio items to create options */}
                                                <option onClick={() => handleMakeAdmin(item)} value="Admin">Admin</option>
                                            </select>
                                    }
                                </div>

                            </td>
                            <td className="text-right px-6 whitespace-nowrap">
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleEdit(item); }}
                                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                                >
                                    Edit
                                </a>
                                <button
                                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                                    onClick={() => handleDelete(item)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllUsers;
