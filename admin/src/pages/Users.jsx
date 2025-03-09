import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const UserTable = ({ token }) => {
    const [users, setUsers] = useState([]);
    
    // Function to fetch users
    const fetchUsers = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/user/users", {
                headers: { token },
            });
            if (response.data.success) {
                setUsers(response.data.users);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch users");
        }
    };

    // Function to delete a user
    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${backendUrl}/api/user/users/${userId}`, {
                headers: { token },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchUsers();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete user");
        }
    };

    // Function to update a user's role
    const updateUserRole = async (userId, newRole) => {
        try {
            const response = await axios.put(
                `${backendUrl}/api/user/users/${userId}`,
                { role: newRole },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success("Role updated successfully");
                fetchUsers(); // Refresh the user list after update
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update role");
        }
    };

    // UseEffect to fetch users initially
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <p className="mb-2 text-lg font-semibold">All Users List</p>
            <div className="overflow-x-auto hidden md:block">
                <div className="flex flex-col gap-2">
                    <div className="hidden md:grid grid-cols-[2fr_3fr_3fr_2fr] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-sm">
                        <b>Name</b>
                        <b>Email</b>
                        <b>Role</b>
                        <b className="text-center">Action</b>
                    </div>

                    {users.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[2fr_3fr_3fr_2fr] items-center gap-3 py-1 px-2 border border-gray-200 text-sm"
                        >
                            <p>{item.name}</p>
                            <p>{item.email}</p>

                            {/* Role Dropdown */}
                            <select
                                value={item.role}
                                onChange={(e) => updateUserRole(item._id, e.target.value)}
                                className="border border-gray-300 rounded-md p-1"
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>

                            <p
                                onClick={() => deleteUser(item._id)}
                                className="text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700"
                            >
                                ✖
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* For Small Screens (Mobile Devices) */}
            <div className="m-10 md:hidden">
                {users.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-3 mb-2 rounded-md shadow-sm border border-gray-200"
                    >
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Name:</span>
                            <span>{item.name}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Email:</span>
                            <span>{item.email}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Role:</span>
                            <select
                                value={item.role}
                                onChange={(e) => updateUserRole(item._id, e.target.value)}
                                className="border border-gray-300 rounded-md p-1"
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <span
                                onClick={() => deleteUser(item._id)}
                                className="text-lg text-red-500 cursor-pointer"
                            >
                                ✖ Delete
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserTable;
