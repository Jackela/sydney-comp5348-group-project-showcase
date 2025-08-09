/**
 * Main API module that exports all API functions
 * @module API
 */

import * as AuthAPI from './mock/AuthApi';
import * as UserAPI from './mock/UserApi';
import * as ProductAPI from './mock/ProductApi';
import * as OrderAPI from './mock/OrderApi';
import * as PaymentAPI from './mock/PaymentApi';
import * as DeliveryAPI from './mock/DeliveryApi';
import * as InventoryAPI from './mock/InventoryApi';
import * as WarehouseAPI from './mock/WarehouseApi';

const API_MODE = process.env.NEXT_PUBLIC_API_MODE || 'mock';

/**
 * API object containing all API functions
 */
export const API = {
  auth: API_MODE === 'mock' ? AuthAPI : AuthAPI,
  user: API_MODE === 'mock' ? UserAPI : UserAPI,
  product: API_MODE === 'mock' ? ProductAPI : ProductAPI,
  order: API_MODE === 'mock' ? OrderAPI : OrderAPI,
  payment: API_MODE === 'mock' ? PaymentAPI : PaymentAPI,
  delivery: API_MODE === 'mock' ? DeliveryAPI : DeliveryAPI,
  inventory: API_MODE === 'mock' ? InventoryAPI : InventoryAPI,
  warehouse: API_MODE === 'mock' ? WarehouseAPI : WarehouseAPI,
};