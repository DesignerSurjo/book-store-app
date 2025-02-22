import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem.jsx';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [BestSeller, setBestSeller] = useState([]);
    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0,5));
    }, [products])
    return (
        <div className=' my-10'>
            <div className=' text-center py-8 text-3xl'>
                <Title
                    text1={'BEST'} text2={'SELLERS'}
                ></Title>
                <p className=' w-3/4 m-auto text-xs sm:text-base text-gray-600'>
                Explore our most sought-after pieces, loved by our customers for their exceptional quality and timeless design. These top-rated selections embody elegance.</p>

            </div>

            <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-5 gap-y-6'>
                {
                    BestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} oldPrice={item.oldPrice} price={item.price}></ProductItem>
                    ))
                }

            </div>


        </div>
    )
}

export default BestSeller