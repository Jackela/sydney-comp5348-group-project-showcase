/**
 * Types for the Redux store
 * @module StoreTypes
 */

import { UserDTO, ProductDTO, OrderDTO } from '../services/types';

export interface AuthState {
  isAuthenticated: boolean;
  user: UserDTO | null;
}

export interface CartItem extends ProductDTO {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface OrderState {
  orders: OrderDTO[];
  currentOrder: OrderDTO | null;
}

export interface ProductState {
  products: ProductDTO[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  cart: CartState;
  order: OrderState;
  products: ProductState;
}