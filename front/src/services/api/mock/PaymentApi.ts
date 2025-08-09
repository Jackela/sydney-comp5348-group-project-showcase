/**
 * Mock implementation of the Payment API
 * @module PaymentAPI
 */

import { PaymentDTO } from '../../Types';

let mockPayments: PaymentDTO[] = [];

/**
 * Simulates creating a payment request.
 * @param {PaymentDTO} paymentData - The payment data.
 * @returns {Promise<PaymentDTO>} A promise that resolves with the created payment.
 */
export const createPayment = async (paymentData: Omit<PaymentDTO, 'paymentId'>): Promise<PaymentDTO> => {
  console.log('Using mock createPayment');
  const newPayment: PaymentDTO = {
    paymentId: String(mockPayments.length + 1),
    ...paymentData,
    status: 'Pending'
  };
  mockPayments.push(newPayment);
  return newPayment;
};

/**
 * Simulates fetching payment status for an order.
 * @param {string} orderId - The ID of the order.
 * @returns {Promise<PaymentDTO>} A promise that resolves with the payment data.
 */
export const getPaymentStatus = async (orderId: string): Promise<PaymentDTO> => {
  console.log('Using mock getPaymentStatus');
  const payment = mockPayments.find(p => p.orderId === orderId);
  if (payment) {
    return payment;
  }
  throw new Error('Payment not found');
};