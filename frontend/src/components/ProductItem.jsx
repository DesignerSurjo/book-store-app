import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price,oldPrice}) => {
 const {currency} = useContext(ShopContext);
  return (
    <Link className=' text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className=' overflow-hidden border border-gray-200 py-5 px-3 '>
            <img className=' hover:scale-110 transition-normal duration-[0.3s] ease-in-out delay-[0s] shadow-2xl transform' src={image} alt=""  />
            <p className=' pt-3 pb-1 font-medium text-base text-center truncate'>{name}</p>
            <div className='flex items-center justify-center gap-1'>
            <p className=' text-[18px] font-bold  text-[#C31C37]'><span className='font-bold text-[#C31C37] text-[18px]'>{currency}</span>{price}</p>
            <p className=' text-[14px] font-thin  text-[#737373] line-through'><span className='font-thin line-through text-[#737373] text-[14px]'>{currency}</span>{oldPrice}</p>
            </div>
            
        </div>
    </Link>
  )
}

export default ProductItem