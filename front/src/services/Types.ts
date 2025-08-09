/**
 * Data Transfer Objects (DTOs) for the e-commerce application
 * @module Types
 */

export interface UserDTO {
  id: string;
  username: string;
  email: string;
}

export interface AuthRequestDTO {
  username: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  user: UserDTO;
}

export interface ProductDTO {
  productId: string;
  name: string;
  description: string;
  price: number;
}

export interface OrderItemDTO {
  orderItemId: string;
  orderId: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  price: number;
}

export interface OrderDTO {
  id: string;
  userId: string;
  status: string;
  total: number;
  createdAt: string;
  orderItems: OrderItemDTO[];
  paymentStatus: string;
  shippingStatus: string;
  warehouses: []
}

export interface OrderRequestDTO {
  productId: string;
  quantity: number;
}

export interface PaymentDTO {
  paymentId: string;
  orderId: string;
  amount: number;
  status: string;
}

export interface DeliveryDTO {
  deliveryId: string;
  orderId: string;
  status: string;
  trackingNumber: string;
}

export interface DeliveryStatusUpdateDTO {
  orderId: string;
  status: string;
}

export interface InventoryDTO {
  productId: string;
  warehouseId: string;
  quantity: number;
}

export interface WarehouseDTO {
  warehouseId: string;
  name: string;
  location: string;
}

export type ShippingStatus = 'Not Shipped' | 'Processing' | 'Shipped' | 'Delivered';