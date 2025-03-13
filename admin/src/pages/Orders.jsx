import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // প্রতি পেজে ৫টি অর্ডার দেখাবে

  const fetchAllOrders = async () => {
    if (!token) return;
    
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching orders.");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating status.");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(backendUrl + '/api/order/delete-order', {
        headers: { token },
        data: { orderId }
      });

      if (response.data.success) {
        setOrders(orders.filter(order => order._id !== orderId));
        toast.success("Order deleted successfully");
      } else {
        toast.error(response.data.message || "Error deleting order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // পেজিনেশন লজিক
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {paginatedOrders.map((order, index) => (
          <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
            <img className='w-12' src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => (
                  <p key={index} className='py-0.5'>{item.name} x {item.quantity} <span>{item.size}</span>{index < order.items.length - 1 ? ',' : ''}</p>
                ))}
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstName} {order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
              <p className='mt-3'>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Time: {new Date(order.date).toLocaleTimeString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <p onClick={() => deleteOrder(order._id)} className='text-right md:text-center cursor-pointer text-lg text-red-500'>X</p>
          </div>
        ))}

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i} 
              onClick={() => handlePageChange(i + 1)} 
              className={`mx-1 px-3 py-1 cursor-pointer  ${currentPage === i + 1 ? 'bg-[#18032A] text-white ' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
