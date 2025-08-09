import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { OrderDTO } from '../services/Types';
import { RootState } from '../store/Store';
import axios from 'axios';

const POLLING_INTERVAL = 1000; // 轮询间隔，单位为毫秒

const OrderConfirmation: React.FC = () => {
  const total = useSelector((state) => state.total.value);
  const warehouses = useSelector((state: RootState) => state.warehouse);
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState<OrderDTO | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // 使用useRef存储intervalId

  useEffect(() => {
    console.log("Redux Warehouses???:", warehouses); // 调试输出
    if (orderId && user) {
      // 开始轮询订单状态
      intervalRef.current = setInterval(() => {
        fetchOrderDetails(orderId as string);
      }, POLLING_INTERVAL);

      // 组件卸载时清理定时器
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [orderId, user]);

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const res = await axios.get(`http://localhost:8080/orders/${orderId}`);
      const orderDetails: OrderDTO = res.data;
      console.log("orderDetails: ", orderDetails);
      if (orderDetails) {
        setOrder(orderDetails);

        // 如果订单状态已完成或已取消，停止轮询
        if (orderDetails.status === 'COMPLETED' || orderDetails.status === 'CANCELLED') {
          toast.success('Order has been completed or cancelled.');
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } else {
        toast.error('Order details are empty.');
      }
    } catch (error: any) {
      console.error('Error fetching order details:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.errorMessage);
      } else {
        toast.error('Failed to fetch order details. Please try again.');
      }
    }
  };

  const cancelOrder = async () => {
    if (!order) {
      toast.error('Order details are not available.');
      return;
    }

    if (order.status === 'COMPLETED' || order.status === 'CANCELLED') {
      toast.error('This order cannot be cancelled.');
      return;
    }

    try {
      // 假设取消订单的API端点是 PUT /orders/:id/cancel
      console.log("order: ", order);
      console.log("total: ", total);
      console.log("warehouses: ", warehouses);

      const res = await axios.post("http://localhost:8080/orders/cancel", {
        "orderID": orderId,
        "userID": user.userId,
        "amount": total,
        "productId": order.productId,
        "warehouses": warehouses.map((item, index) => ({
          warehouseId: Number(Object.keys(item)[0]),  // 获取键并转换为数字
          quantity: item[Object.keys(item)[0]] + (index === 0 ? 9 : 4) // 增加数量
        }))
      });
      const updatedOrder: OrderDTO = res.data;

      setOrder(updatedOrder);
      toast.success('Order has been cancelled successfully.');

      // 停止轮询
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } catch (error: any) {
      console.error('Error cancelling order:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.errorMessage);
      } else {
        toast.error('Failed to cancel order. Please try again.');
      }
    }
  };

  if (!order) {
    return <div>Loading order details...</div>;
  }

  return (
      <div className="max-w-2xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">Order Detail</h1>
        <div className="border p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">Order #{order.orderId}</h2>
          {total !== undefined && <p>Total: ${total}</p>}
          <p>Status: {order.status}</p>
          {/* 这里可以根据需要添加更多的订单详情信息 */}
        </div>
        {order.status === 'PAID' && (
            <button
                onClick={cancelOrder}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 mb-4"
            >
              Cancel Order
            </button>
        )}
        <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Back to Home
        </button>
      </div>
  );
};

export default OrderConfirmation;
