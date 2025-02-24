import React, { useContext } from 'react'
import Title from './Title';
import { ShopContext } from "../context/ShopContext"; 

const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);
    const subTotal = getCartAmount();
    const total = subTotal + delivery_fee;
  return (
    <div className=' w-full'>
        <div className="text-2xl">
            <Title text1={'CART'} text2={'TOTALS'}></Title>
        </div>
        <div className=' flex flex-col gap-2 mt-2 text-sm'>
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency}{subTotal.toFixed(2)}</p>
            </div>
            <hr className='text-gray-200'/>

            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{delivery_fee > 0 ? `${currency}${delivery_fee.toFixed(2)}` : 'Free'}</p>
            </div>
            <hr className='text-gray-200'/>
            <div className="flex justify-between">
                <p>Total</p>
                <p>{currency}{total.toFixed(2)}</p>
            </div>

        </div>

        
    </div>
  )
}

export default CartTotal