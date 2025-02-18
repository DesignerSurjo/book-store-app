import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import ProductItem from '../components/ProductItem';
import { useEffect } from 'react';
import Title from '../components/Title';
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // ক্যাটাগরি অনুযায়ী ফিল্টার করা
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    // সাব ক্যাটাগরি (Author) অনুযায়ী ফিল্টার করা
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };


  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch,products])




  return (
    
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200'>   

      {/* filter option */}

      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 uppercase'>Filters
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
          />
        </p>
        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={'উপন্যাস'}
                className="w-3"
                onChange={(e) => toggleCategory(e)}
              />
              উপন্যাস
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={'গল্প'}
                className="w-3"
                onChange={(e) => toggleCategory(e)}
              />
              গল্প
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={'কবিতা'}
                className="w-3"
                onChange={(e) => toggleCategory(e)}
              />
              কবিতা
            </p>
          </div>
        </div>

        {/* sub category */}

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">Authors</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={'শরৎচন্দ্র চট্টোপাধ্যায়'}
                className="w-3"
                onChange={(e) => toggleSubCategory(e)}
              />
              শরৎচন্দ্র চট্টোপাধ্যায়
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={'হুমায়ূন আহমেদ'}
                className="w-3"
                onChange={(e) => toggleSubCategory(e)}
              />
              হুমায়ূন আহমেদ
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={'মানিক বন্দ্যোপাধ্যায়'}
                className="w-3"
                onChange={(e) => toggleSubCategory(e)}
              />
              মানিক বন্দ্যোপাধ্যায়
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={'রবীন্দ্রনাথ ঠাকুর'}
                className="w-3"
                onChange={(e) => toggleSubCategory(e)}
              />
              রবীন্দ্রনাথ ঠাকুর </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={'মোস্তাক আহমেদ'}
                className="w-3"
                onChange={(e) => toggleSubCategory(e)}
              />
              মোস্তাক আহমেদ </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={' আউয়াল চৌধুরী'}
                className="w-3"
                onChange={(e) => toggleSubCategory(e)}
              />
               আউয়াল চৌধুরী </p>
           
          </div>
        </div>
      </div>

      {/* right side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTION'} />
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-5 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              oldPrice={item.oldPrice}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection