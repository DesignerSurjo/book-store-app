import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

const Dashboard = ({ token }) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  // ডাটা ফেচ করার ফাংশন
  const fetchDashboardData = async () => {
    try {
      const productResponse = await axios.post(backendUrl + '/api/product/list');
      if (productResponse.data.success) {
        setTotalProducts(productResponse.data.products.length);
      }

      const orderResponse = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (orderResponse.data.success) {
        const orders = orderResponse.data.orders;
        setTotalOrders(orders.length);

        const revenue = orders.reduce((acc, order) => acc + order.amount, 0);
        setTotalRevenue(revenue);
      }

      const userResponse = await axios.get(backendUrl + '/api/user/users', { headers: { token } });
      if (userResponse.data.success) {
        setTotalUsers(userResponse.data.users.length);
      }
    } catch (error) {
      console.log(error);
      toast.error('ডাটা ফেচ করতে গিয়ে সমস্যা হয়েছে');
    }
  };

  // পোলিং এর মাধ্যমে ডাটা আপডেট করা
  useEffect(() => {
    fetchDashboardData(); // প্রথম ডাটা ফেচ

    const interval = setInterval(() => {
      fetchDashboardData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const pieData = [
    { name: 'Total Orders', value: totalOrders, color: '#ff6384' },
    { name: 'Total Products', value: totalProducts, color: '#36a2eb' },
    { name: 'Total Users', value: totalUsers, color: '#ffce56' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Earning</h3>
          <p className="text-2xl font-bold">{currency}{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Admin Stats Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Legend />
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />

                ))}
              </Pie>
              <Tooltip />

            </PieChart>
          </ResponsiveContainer>


        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Total Earnings</h3>



          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[{ month: 'Total Earnings', value: totalRevenue }]}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="value" stroke="#36a2eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
