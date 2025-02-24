import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

const AddCoupon = ({ token }) => {
    const [coupon, setCoupon] = useState({
        code: "",
        discountType: "percentage",
        discountValue: "",
        minCartAmount: "",
        startDate: "",
        expiryDate: "",
        oneTimeUse: false // Added oneTimeUse field to the state
    });
    const [message, setMessage] = useState('');

    const handleCreateCoupon = async () => {
        if (!coupon.code || !coupon.discountValue || !coupon.startDate || !coupon.expiryDate) {
            setMessage('⚠️ All fields are required!');
            return;
        }
    
        try {
            setMessage('⏳ Creating coupon...');
            const response = await axios.post(
                backendUrl + "/api/coupon/create", 
                coupon, 
                { headers: { token } }
            );
            setMessage("✅ Coupon created successfully!");
    
            // Clear all fields after successful coupon creation
            setCoupon({
                code: "",
                discountType: "percentage",
                discountValue: "",
                minCartAmount: "",
                startDate: "",
                expiryDate: "",
                oneTimeUse: false // Reset oneTimeUse field
            });
    
        } catch (error) {
            setMessage("❌ Error creating coupon!");
        }
    };
    

    return (
        <div className="p-5 border bg-white shadow-md rounded-md max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-3 text-center">Add New Coupon</h2>
            
            <input 
                type="text" 
                placeholder="Coupon Code" 
                value={coupon.code} 
                onChange={(e) => setCoupon({ ...coupon, code: e.target.value })}
                className="border p-2 rounded w-full mb-3"
            />
            
            <select 
                value={coupon.discountType} 
                onChange={(e) => setCoupon({ ...coupon, discountType: e.target.value })}
                className="border p-2 rounded w-full mb-3"
            >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
            </select>

            <input 
                type="number" 
                placeholder="Discount Value" 
                value={coupon.discountValue} 
                onChange={(e) => setCoupon({ ...coupon, discountValue: e.target.value })}
                className="border p-2 rounded w-full mb-3"
            />
            
            <input 
                type="number" 
                placeholder="Min Cart Amount" 
                value={coupon.minCartAmount} 
                onChange={(e) => setCoupon({ ...coupon, minCartAmount: e.target.value })}
                className="border p-2 rounded w-full mb-3"
            />

            <input 
                type="date" 
                placeholder="Start Date" 
                value={coupon.startDate} 
                onChange={(e) => setCoupon({ ...coupon, startDate: e.target.value })}
                className="border p-2 rounded w-full mb-3"
            />

            <input 
                type="date" 
                placeholder="Expiry Date" 
                value={coupon.expiryDate} 
                onChange={(e) => setCoupon({ ...coupon, expiryDate: e.target.value })}
                className="border p-2 rounded w-full mb-3"
            />

            {/* One-Time Use Checkbox */}
            <div className="flex items-center mb-3">
                <input 
                    type="checkbox" 
                    checked={coupon.oneTimeUse} 
                    onChange={(e) => setCoupon({ ...coupon, oneTimeUse: e.target.checked })}
                    className="mr-2"
                />
                <label>One-time use only</label>
            </div>

            <button 
                onClick={handleCreateCoupon} 
                className="bg-[#721587] cursor-pointer text-white p-2 rounded w-full transition"
            >
                Create Coupon
            </button>

            {message && <p className="text-center mt-2 text-red-500">{message}</p>}
        </div>
    );
};

export default AddCoupon;
