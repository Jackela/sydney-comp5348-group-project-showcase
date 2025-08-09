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
  auth: AuthAPI,
  user: UserAPI,
  product: ProductAPI,
  order: OrderAPI,
  payment: PaymentAPI,
  delivery: DeliveryAPI,
  inventory: InventoryAPI,
  warehouse: WarehouseAPI,
};

