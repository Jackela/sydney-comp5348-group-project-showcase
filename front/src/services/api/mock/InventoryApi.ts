/**
 * Mock implementation of the Inventory API
 * @module InventoryAPI
 */

import { InventoryDTO } from '../../Types';

let mockInventory: InventoryDTO[] = [
  { productId: '1', warehouseId: '1', quantity: 100 },
  { productId: '2', warehouseId: '1', quantity: 50 },
  { productId: '3', warehouseId: '2', quantity: 75 },
];

/**
 * Simulates fetching available inventory information.
 * @returns {Promise<InventoryDTO[]>} A promise that resolves with available inventory data.
 */
export const getAvailableInventory = async (): Promise<InventoryDTO[]> => {
  console.log('Using mock getAvailableInventory');
  return mockInventory.filter(item => item.quantity > 0);
};

/**
 * Simulates deducting product quantity from inventory.
 * @param {string} productId - The ID of the product.
 * @param {number} quantity - The quantity to deduct.
 * @returns {Promise<InventoryDTO>} A promise that resolves with the updated inventory data.
 */
export const deductInventory = async (productId: string, quantity: number): Promise<InventoryDTO> => {
  console.log('Using mock deductInventory');
  const inventoryItem = mockInventory.find(item => item.productId === productId);
  if (inventoryItem && inventoryItem.quantity >= quantity) {
    inventoryItem.quantity -= quantity;
    return inventoryItem;
  }
  throw new Error('Insufficient inventory');
};

/**
 * Simulates adding product quantity to inventory.
 * @param {string} productId - The ID of the product.
 * @param {number} quantity - The quantity to add.
 * @returns {Promise<InventoryDTO>} A promise that resolves with the updated inventory data.
 */
export const addInventory = async (productId: string, quantity: number): Promise<InventoryDTO> => {
  console.log('Using mock addInventory');
  const inventoryItem = mockInventory.find(item => item.productId === productId);
  if (inventoryItem) {
    inventoryItem.quantity += quantity;
    return inventoryItem;
  }
  throw new Error('Product not found in inventory');
};

/**
 * Simulates fetching inventory information for all warehouses.
 * @returns {Promise<InventoryDTO[]>} A promise that resolves with inventory data for all warehouses.
 */
export const getWarehousesInventory = async (): Promise<InventoryDTO[]> => {
  console.log('Using mock getWarehousesInventory');
  return mockInventory;
};

/**
 * Simulates checking inventory status for a specific product.
 * @param {string} productId - The ID of the product.
 * @returns {Promise<InventoryDTO[]>} A promise that resolves with inventory data for the specified product.
 */
export const checkInventoryStatus = async (productId: string): Promise<InventoryDTO[]> => {
  console.log('Using mock checkInventoryStatus');
  return mockInventory.filter(item => item.productId === productId);
};

/**
 * Simulates fetching inventory information for a specific warehouse.
 * @param {string} warehouseId - The ID of the warehouse.
 * @returns {Promise<InventoryDTO[]>} A promise that resolves with inventory data for the specified warehouse.
 */
export const getWarehouseInventory = async (warehouseId: string): Promise<InventoryDTO[]> => {
  console.log('Using mock getWarehouseInventory');
  return mockInventory.filter(item => item.warehouseId === warehouseId);
};

/**
 * Simulates fetching all inventory information.
 * @returns {Promise<InventoryDTO[]>} A promise that resolves with all inventory data.
 */
export const getAllInventory = async (): Promise<InventoryDTO[]> => {
  console.log('Using mock getAllInventory');
  return mockInventory;
};