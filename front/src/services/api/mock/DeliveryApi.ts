/**
 * Mock implementation of the Delivery API
 * @module DeliveryAPI
 */

import { DeliveryDTO, DeliveryStatusUpdateDTO } from '../../Types';

let mockDeliveries: DeliveryDTO[] = [];

/**
 * Simulates updating the delivery status.
 * @param {DeliveryStatusUpdateDTO} updateData - The data for updating the delivery status.
 * @returns {Promise<DeliveryDTO>} A promise that resolves with the updated delivery data.
 */
export const updateDeliveryStatus = async (updateData: DeliveryStatusUpdateDTO): Promise<DeliveryDTO> => {
  console.log('Using mock updateDeliveryStatus');
  const delivery = mockDeliveries.find(d => d.orderId === updateData.orderId);
  if (delivery) {
    delivery.status = updateData.status;
    return delivery;
  }
  throw new Error('Delivery not found');
};

/**
 * Simulates fetching delivery information for an order.
 * @param {string} orderId - The ID of the order.
 * @returns {Promise<DeliveryDTO>} A promise that resolves with the delivery data.
 */
export const getDeliveryInfo = async (orderId: string): Promise<DeliveryDTO> => {
  console.log('Using mock getDeliveryInfo');
  const delivery = mockDeliveries.find(d => d.orderId === orderId);
  if (delivery) {
    return delivery;
  }
  throw new Error('Delivery not found');
};