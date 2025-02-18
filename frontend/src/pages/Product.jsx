import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
export const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');


  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId); // Find the product
    if (product) {
      setProductData(product);
      setImage(product.image[0]); // Set first image
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);


  return productData ? (
    <div className='border-t-2 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-5 sm:gap-5  flex-col sm:flex-row'>


        <div className=' flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (

                <img onClick={() => setImage(item)} src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />

              ))
            }

          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-[350px] h-[430px] border px-2 py-3 border-gray-300 hover:scale-110 transition-normal duration-[0.3s] ease-in-out delay-[0s] shadow-2xl transform' />

          </div>
        </div>

        <div className='flex-1'>
          <div className='font-medium text-2xl mt-2'>
            <h1>{productData.name}</h1>


            <div className=' text-[17px] mt-3 '>
              <p className='text-gray-400 text-base '>by <span className='text-[#C31C37] font-medium'>{productData.subCategory}</span></p>
            </div>
            <div className=' text-[17px] mt-3 '>
              <p className='text-gray-400 text-base '>Category: <span className='text-[#C31C37] font-medium'>{productData.category}</span></p>
            </div>

          </div>

          <div className=' flex items-center gap-1 mt-3.5'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />

          </div>

          <div className='flex gap-3'>
            <p className='mt-5 text-2xl font-thin line-through text-[#C31C37]'>{currency}{productData.oldPrice}</p>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>

          </div>
          <p className=' mt-5 text-[#333] md:w-4/5'>{productData.description}</p>

          {/* <div className='flex gap-2 my-5'>
            
            <img src={assets.success} alt="" />
            <p className='text-base text-[#333]'>{productData.stock}</p>

          </div> */}

          <button
            onClick={() => {
              addToCart(productData._id);
              toast.success('Item has been added to cart');
            }}
            className='bg-[#C31C37] mt-10 text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'
          >
            ADD TO CART
          </button>



          <hr className="mt-8 sm:w-4/5 text-[#333]" />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>✅ 100% Original product.</p>
            <p>✅ Cash on delivery is available on this product.</p>
            <p>✅ Easy return and exchange policy within 7 days.</p>
          </div>

        </div>



      </div>

    </div>
  ) : <div className=' opacity-0'>

  </div>
}
