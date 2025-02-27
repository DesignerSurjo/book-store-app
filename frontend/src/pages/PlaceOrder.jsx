import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import CouponApply from '../components/CouponApply';
const PlaceOrder = () => {
    const [method, setMethod] = useState('cod')
    const [discount, setDiscount] = useState(0)
    const { navigate, products,
        delivery_fee,
        cartItems,
        setCartItems,
        getCartAmount,
        backendUrl,
        token, currency } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target

        setFormData((data) => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            let orderItems = [];

            // cartItems অবজেক্টের উপর একক লুপ
            for (const itemId in cartItems) {
                if (cartItems[itemId] > 0) {
                    // products থেকে সঠিক আইটেম খুঁজে বের করা
                    const itemInfo = structuredClone(products.find(product => product._id === itemId));

                    if (itemInfo) {
                        itemInfo.quantity = cartItems[itemId];  // কুইন্টিটি অ্যাসাইন করা
                        orderItems.push(itemInfo);
                    }
                }
            }

            let subTotal = getCartAmount();
            let finalTotal = Math.max(subTotal + delivery_fee - discount, 1)

            let orderData = {
                address: formData,
                items: orderItems,
                subTotal: subTotal,
                delivery_fee: delivery_fee,
                discount: discount,
                amount: finalTotal
            };

            switch (method) {
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });

                    if (response.data.success) {
                        setCartItems({});
                        navigate('/order');
                    } else {
                        toast.error(response.data.message);
                    }
                    break;


                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data;
                        window.location.replace(session_url);
                    } else {
                        toast.error(responseStripe.data.message);
                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200'>
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFO'}></Title>

                </div>

                <div className='flex gap-3'>
                    <input required name='firstName' onChange={onChangeHandler}
                        value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='First Name' />
                    <input required name='lastName' onChange={onChangeHandler}
                        value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Last Name' />

                </div>
                <input required name='email' onChange={onChangeHandler}
                    value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="email" placeholder='Enter Email' />
                <input required name='street' onChange={onChangeHandler}
                    value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Street' />


                <div className='flex gap-3'>
                    <input required name='city' onChange={onChangeHandler}
                        value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='City' />
                    <input required name='state' onChange={onChangeHandler}
                        value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='State' />

                </div>

                <div className='flex gap-3'>
                    <input required name='zipcode' onChange={onChangeHandler}
                        value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Zipcode' />
                    <input required name='country' onChange={onChangeHandler}
                        value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Country' />

                </div>

                <input required name='phone' onChange={onChangeHandler}
                    value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Phone' />
            </div>

            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal></CartTotal>
                    <CouponApply setDiscount={setDiscount} cartTotal={getCartAmount()}></CouponApply>

                    <div className='flex justify-between font-semibold mt-4'>
                        <p>Discount</p>
                        <p>-{discount > 0 ? `৳${discount.toFixed(2)}` : `৳0.00`}</p>
                    </div>
                    <div className="flex justify-between font-bold mt-2 text-lg">
                        <p>Final Total</p>
                        <p>{currency}{Math.max(getCartAmount() + delivery_fee - discount, 1).toFixed(2)}</p> {/* ✅ Fix applied */}
                    </div>
                </div>
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'}></Title>
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border border-gray-200  rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />

                        </div>

                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border  border-gray-200 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className=' text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>

                        </div>
                    </div>

                    <div className=' w-full md:text-end text-center mt-10 '>
                        <button type='submit' className=' bg-[#C31C37] cursor-pointer rounded-md text-white px-16 py-3 text-sm active:bg-gray-700'>PLACE ORDER</button>
                    </div>

                </div>

            </div>
        </form>
    )
}

export default PlaceOrder