import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
const Order = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setorderData] = useState([])

  const loadOrderData = async () => {
    try {

      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['time'] = order.time
            allOrdersItem.push(item)

          })
        })
        setorderData(allOrdersItem.reverse());

      }

    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message })
    }
  }

  
  useEffect(() => {
    loadOrderData()
  }, [token])
  return (
    <div className=' border-t border-gray-200 pt-16'>
      <div className=' text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}></Title>

      </div>
      <div>
        {
         orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-gray-200 border-b text-[#333] flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-10 sm:w-20' src={item.image} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>

                  <div className='flex items-center gap-3 mt-1 text-base text-gray-500'>
                    <p className='text-lg text-[#C31C37] line-through'>{currency}{item.oldPrice}</p>
                    <p className='text-lg text-[#333]'>{currency}{item.price}</p>

                    {/* <p>Size: {item.size}</p> */}

                  </div>
                  <p className=' mt-1 text-[#333]'>Quantity: <span className=' text-[#C31C37]'>{item.quantity}</span></p>
                  <p className=' mt-1'>Payment: <span className='text-[#C31C37]'>{item.paymentMethod}</span></p>
                  <p className=' mt-1'>Date: <span className='text-[#C31C37]'>{new Date(item.date).toDateString()}
                  </span></p>
                  <p className='mt-1'>Time: <span className='text-[#C31C37]'>{new Date(item.date).toLocaleTimeString()}</span></p>
                  
                </div>
              </div>

              <div className='md:w-1/2 flex justify-between px-5'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>

                </div>
                <button onClick={loadOrderData} className='border border-gray-300 cursor-pointer px-2 py-2 text-sm font-medium rounded-sm'>Track Order</button>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order