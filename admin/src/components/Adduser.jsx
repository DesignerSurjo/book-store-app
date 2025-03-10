import React, { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(backendUrl + "/api/user/register", {
                name,
                email,
                password,
            });

            if (response.data.success) {
                toast.success("User Successfully Registered");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] max-w-md m-auto mt-14 mb-20 gap-6 text-gray-800"
        >
            {/* Heading */}
            <div className="inline-flex items-center gap-2 mb-4 mt-10">
                <p className="text-3xl text-[#C31C37] font-semibold">Add User</p>
            </div>

            {/* Name Field */}
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-600">
                    Name
                </label>
                <input
                    type="text"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C31C37] focus:outline-none transition duration-300"
                    placeholder="Enter user's name"
                    required
                />
            </div>

            {/* Email Field */}
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-600">
                    Email
                </label>
                <input
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C31C37] focus:outline-none transition duration-300"
                    placeholder="Enter user's email"
                    required
                />
            </div>

            {/* Password Field */}
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-600">
                    Password
                </label>
                <input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C31C37] focus:outline-none transition duration-300"
                    placeholder="Enter password"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-[#C31C37] text-white px-8 py-2 cursor-pointer rounded-md font-light mt-4 hover:bg-[#333] transition duration-300"
            >
                Add User
            </button>
        </form>
    );
};

export default AddUser;
