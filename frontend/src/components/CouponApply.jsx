import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const CouponApply = ({ setDiscount, cartTotal }) => {
  const [couponCode, setCouponCode] = useState('');
  const { backendUrl, token } = useContext(ShopContext); // Context থেকে token নিচ্ছি

  const applyCouponHandler = async () => {
    if (!couponCode) {
      toast.error('⚠️ Please enter a coupon code!');
      return;
    }

    if (!token) {
      toast.error('❌ Please log in to apply a coupon!');
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/coupon/apply`, {
        code: couponCode,
        cartTotal,
      }, { headers: { token } }); // শুধু token পাঠানো হয়েছে

      if (res.data.success) {
        const discountAmount = res.data.discount;
        const discountType = res.data.discountType;

        // ডিসকাউন্ট হিসাব করা
        const calculatedDiscount = discountType === 'percentage'
          ? (cartTotal * discountAmount) / 100  
          : discountAmount;  

        setDiscount(Number(calculatedDiscount));
        toast.success(`🎉 Coupon applied! Discount: ৳${calculatedDiscount.toFixed(2)}`);
        setCouponCode('');  
      } else {
        toast.error(res.data.message); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || '❌ Server Error');
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Enter Coupon Code"
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
      />
      <button
        onClick={applyCouponHandler}
        type="button"
        className="bg-[#C31C37] cursor-pointer rounded-md text-white px-4 py-2 mt-2"
      >
        Apply Coupon
      </button>
    </div>
  );
};

export default CouponApply;
