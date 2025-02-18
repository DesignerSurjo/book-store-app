import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const UserTable = ({ token }) => {
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <p className="mb-2">All Users List</p>
            <div className="flex flex-col gap-2 ">
                <div className="hidden md:grid grid-cols-[2fr_3fr_3fr] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-sm">
                    <b>Name</b>
                    <b>Email</b>
                    {/* <b>Password</b> */}
                    <b className="text-center">Action</b>
                </div>

                {users.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[2fr_3fr_3fr] items-center gap-3 py-1 px-2 border border-gray-200 text-sm"
                    >
                        <p>{item.name}</p>
                        <p>{item.email}</p>
                        {/* <p>{item.password}</p> */}
                        <p
                            onClick={() => deleteUser(item._id)}
                            className="text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700"
                        >
                            ✖
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserTable;