/**
 * Checkout page component
 * @module Checkout
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../store/Store';
import { clearCart } from '../store/slices/CartSlice';
import { addOrder } from '../store/slices/OrderSlice';
import { toast } from 'react-toastify';
import { ROUTES } from '../constants/Routes';
import axios from "axios";
import {setTotal} from "../store/slices/TotalSlice"; // Import API for real order creation
import {addWarehouse, setWarehouses} from "../store/slices/WarehouseSlice";

/**
 * Checkout component that handles the checkout process for the user's order
 * @returns {JSX.Element} The rendered checkout page
 */
const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState({
    fullName: user?.username || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please log in to complete your order');
      await router.push(ROUTES.LOGIN);
      return;
    }

    try {
      const orderData = {
        userId: user.userId,
        status: 'CREATED',
        number: cartItems.reduce((total, item) => total + item.quantity, 0), // 计算总数量
        productId: cartItems[0]?.productId, // 假设只下单一个产品
      };

      // 调用API创建订单
      const response = await axios.post("http://localhost:8080/orders", orderData);
      const newOrder = response.data

      // 将新创建的订单添加到Redux store
      dispatch(addOrder({ ...orderData, id: newOrder.id, total: totalPrice }));
      dispatch(clearCart());
      toast.success('Order placed successfully!');

      // 设置总金额
      dispatch(setTotal(totalPrice)); // 直接传入totalPrice数字

      // 添加到仓库
      if (newOrder.warehouses.length > 0) {
        console.log("newOrder.warehouses: ", newOrder.warehouses);
        dispatch(setWarehouses(newOrder.warehouses));
      }

      // 重定向到订单确认页面
      await router.push({
        pathname: ROUTES.ORDER_CONFIRMATION,
        query: {orderId: newOrder.orderId},
      });
    } catch (error: any) {
      console.error('Error processing order:', error);
      toast.error(error.response?.data?.errorMessage || 'Failed to place order');
    }
  };

  return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* 产品信息展示部分 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
          {cartItems.length === 0 ? (
              <p>Your cart is empty. <a href={ROUTES.HOME} className="text-blue-600 hover:underline">Go shopping</a>.</p>
          ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Product</th>
                    <th className="py-2 px-4 border-b">Quantity</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    <th className="py-2 px-4 border-b">Subtotal</th>
                  </tr>
                  </thead>
                  <tbody>
                  {cartItems.map(item => (
                      <tr key={item.productId} className="text-center">
                        <td className="py-2 px-4 border-b flex items-center">
                          {/* 假设每个产品有一个图片URL */}
                          {item.imageUrl && (
                              <img src={item.imageUrl} alt={item.name} className="w-12 h-12 mr-4 object-cover" />
                          )}
                          <span>{item.name}</span>
                        </td>
                        <td className="py-2 px-4 border-b">{item.quantity}</td>
                        <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                        <td className="py-2 px-4 border-b">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
                <div className="flex justify-end mt-4">
                  <span className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</span>
                </div>
              </div>
          )}
        </div>

        {/* 结账表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                  type="text"
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Place Order
          </button>
        </form>
      </div>
  );
};

export default Checkout;
