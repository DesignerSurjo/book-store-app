import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem.jsx';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [LatestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        
        setLatestProducts(products.slice(0,10));
    },[products])
    return (
        <div className='my-10'>
            <div className='text-3xl text-center py-8'>

                <Title text1={'LATEST'} text2={'COLLECTION'}></Title>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Discover our newest collection, crafted with elegance and sophistication. Each piece is designed to blend style and functionality.
                </p>
            </div>

            {/* show product in product ProductItem */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6 '>
                {
                    LatestProducts.map((item,index)=>(
                        <ProductItem key={index} id={item._id} name={item.name} price={item.price} oldPrice={item.oldPrice} image={item.image}></ProductItem>
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCollection