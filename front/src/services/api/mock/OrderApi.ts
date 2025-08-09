/**
 * Mock implementation of the Order API
 * @module OrderAPI
 */

import { OrderDTO, OrderRequestDTO } from '../../Types';

// Declare a single mockOrders array to hold all orders
let mockOrders: OrderDTO[] = [];

/**
 * Simulates creating an order.
 * @param {OrderRequestDTO} orderData - The data for creating an order.
 * @returns {Promise<OrderDTO>} A promise that resolves with the created order.
 */
export const createOrder = async (
  orderData: OrderRequestDTO
): Promise<OrderDTO> => {
  console.log('Using mock createOrder');

  // Calculate total based on product prices (assuming orderData contains this information)
  const total = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const newOrder: OrderDTO = {
    id: String(mockOrders.length + 1), // Generate a new order ID
    userId: orderData.userId, // Use user ID from the request
    status: 'Processing',
    total, // Calculated total
    createdAt: new Date().toISOString(),
    orderItems: orderData.items.map((item, index) => ({
      orderItemId: String(index + 1),
      orderId: String(mockOrders.length + 1),
      productId: item.productId,
      warehouseId: '1', // Assuming warehouse with ID 1 for mock data
      quantity: item.quantity,
      price: item.price, // Use the price from the order request
    })),
    paymentStatus: 'Pending',
    shippingStatus: 'Not Shipped',
  };

  // Add the new order to the mock order list
  mockOrders.push(newOrder);

  return newOrder;
};

/**
 * Simulates fetching an order by ID.
 * @param {string} orderId - The ID of the order to fetch.
 * @returns {Promise<OrderDTO>} A promise that resolves with the order data.
 */
export const getOrderById = async (orderId: string): Promise<OrderDTO> => {
  console.log('Using mock getOrderById');

  // Find the order by ID
  const order = mockOrders.find((o) => o.id === orderId);

  // If the order is found, return it
  if (order) {
    return order;
  }

  // Otherwise, throw an error indicating the order was not found
  throw new Error('Order not found');
};

/**
 * Simulates cancelling an order.
 * @param {string} orderId - The ID of the order to cancel.
 * @returns {Promise<OrderDTO>} A promise that resolves with the cancelled order.
 */
export const cancelOrder = async (orderId: string): Promise<OrderDTO> => {
  console.log('Using mock cancelOrder');

  // Find the order by ID
  const order = mockOrders.find((o) => o.id === orderId);

  if (order) {
    order.status = 'Cancelled';
    return order;
  }

  // If the order is not found, throw an error
  throw new Error('Order not found');
};

/**
 * Simulates fetching all orders for a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<OrderDTO[]>} A promise that resolves with an array of user orders.
 */
export const getUserOrders = async (userId: string): Promise<OrderDTO[]> => {
  console.log('Using mock getUserOrders');

  // Return all orders for the given user
  return mockOrders.filter((o) => o.userId === userId);
};
