import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, getCartCount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        tempData.push({
          _id: items,
          quantity: cartItems[items]
        });
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  const handleProceedToCheckout = () => {
    if (getCartCount() > 0) {
      navigate('/place-order');
    } else {
      alert('Your cart is empty!');
    }
  };

  return (
    <div className='border-t border-gray-200 pt-14'>
      <div className=' text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'}></Title>
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className='py-5 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className=' flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className=' text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className=' text-[17px] mt-2 '>
                      <p className='text-gray-400 text-base '>by <span className='text-[#C31C37] font-medium'>{productData.author}</span></p>
                    </div>
                    <div className=' text-[17px] mt-2 '>
                      <p className='text-gray-400 text-base '>Category: <span className='text-[#C31C37] font-medium'>{productData.category}</span></p>
                    </div>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 bg-slate-50 text-[#C31C37] line-through'>{currency}{productData.oldPrice}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, Number(e.target.value))} type="number" className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 ' min={1} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity(item._id, 0)} src={assets.bin_icon} alt="" className=' w-4 sm:w-5 cursor-pointer' />
              </div>
            )
          })
        }
      </div>

      <div className=' flex justify-end my-20'>
        <div className=' w-full sm:w-[450px]'>
          <CartTotal></CartTotal>
          <div className=' w-full text-end'>
            <button
              onClick={handleProceedToCheckout}
              className={`bg-[#C31C37] rounded-md cursor-pointer mt-10 text-white px-8 py-3 text-sm active:bg-gray-700 ${getCartCount() === 0 ? 'cursor-not-allowed' : ''}`}
              disabled={getCartCount() === 0}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
