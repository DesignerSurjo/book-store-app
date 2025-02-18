import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (currentState === 'Sign Up') {
                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password, });

                if (response.data.success) {
                    toast.success('User Successfully Registered')
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                } else {
                    toast.error(response.data.message)
                }
            } else {
                const response = await axios.post(backendUrl + '/api/user/login', { email, password, });
                if (response.data.success) {
                    toast.success('User Successfully Login')
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                } else {
                    toast.error(response.data.message)
                }

            }
        } catch (error) {
            console.log(error);
            toast.error(response.data.message)
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])
    return (
        <form onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 mb-20 gap-6 text-gray-800"
        >
            {/* Heading */}
            <div className="inline-flex items-center gap-2 mb-4 mt-10">
                <p className="text-3xl text-[#C31C37] font-semibold">{currentState}</p>
            </div>

            {/* Name Field (only for Sign Up) */}
            {currentState === "Sign Up" && (
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-600">
                        Name
                    </label>
                    <input

                        type="text"
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C31C37] focus:outline-none transition duration-300"
                        placeholder="Enter your name"
                        required
                    />
                </div>
            )}

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
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    required
                />
            </div>

            {/* Links for Login/Sign Up and Forgot Password */}
            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className="cursor-pointer hover:underline text-[#C31C37]">
                    Forgot your password?
                </p>

                {currentState === "Login" ? (
                    <p
                        onClick={() => setCurrentState("Sign Up")}
                        className="cursor-pointer hover:text-[#C31C37] transition duration-300"
                    >
                        Create account
                    </p>
                ) : (
                    <p
                        onClick={() => setCurrentState("Login")}
                        className="cursor-pointer hover:text-[#C31C37] transition duration-300"
                    >
                        Login Here
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-[#C31C37] text-white px-8 py-2 cursor-pointer rounded-md font-light mt-4 hover:bg-[#333] transition duration-300"
            >
                {currentState === "Login" ? "Sign In" : "Sign Up"}
            </button>
        </form>

    )
}

export default Login