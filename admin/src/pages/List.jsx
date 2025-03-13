import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // প্রতি পেজে ৫টা আইটেম দেখাবে

  const fetchList = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  };

  const removeProducts = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // পেজিনেশনের জন্য ডাটা ফিল্টার করা হচ্ছে
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedList = list.slice(indexOfFirstItem, indexOfLastItem);

  // মোট কতগুলো পেজ লাগবে
  const totalPages = Math.ceil(list.length / itemsPerPage);

  // পেজ চেঞ্জ করার ফাংশন
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-sm '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Author</b>
          <b>Price</b>
          <b>Old Price</b>
          <b className='text-center'>Action</b>
        </div>

        {
          paginatedList.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] sm:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center gap-3 py-1 px-2 border border-gray-200 text-sm'>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.author}</p>
              <p>{currency}{item.price}</p>
              <p>{currency}{item.oldPrice}</p>
              <p onClick={() => removeProducts(item._id)} className='text-right md:text-center cursor-pointer text-lg text-red-500'>X</p>
            </div>
          ))
        }

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i} 
              onClick={() => handlePageChange(i + 1)} 
              className={`mx-1 px-3 py-1 cursor-pointer ${currentPage === i + 1 ? 'bg-[#18032A] text-white' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default List;
