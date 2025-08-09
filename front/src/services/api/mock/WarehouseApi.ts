/**
 * Mock implementation of the Warehouse API
 * @module WarehouseAPI
 */

import { WarehouseDTO } from '../../Types';

const mockWarehouses: WarehouseDTO[] = [
  { warehouseId: '1', name: 'Main Warehouse', location: 'New York' },
  { warehouseId: '2', name: 'West Coast Warehouse', location: 'Los Angeles' },
];

/**
 * Simulates fetching information for a specific warehouse.
 * @param {string} warehouseId - The ID of the warehouse.
 * @returns {Promise<WarehouseDTO>} A promise that resolves with the warehouse data.
 */
export const getWarehouseById = async (warehouseId: string): Promise<WarehouseDTO> => {
  console.log('Using mock getWarehouseById');
  const warehouse = mockWarehouses.find(w => w.warehouseId === warehouseId);
  if (warehouse) {
    return warehouse;
  }
  throw new Error('Warehouse not found');
};

/**
 * Simulates fetching information for all warehouses.
 * @returns {Promise<WarehouseDTO[]>} A promise that resolves with data for all warehouses.
 */
export const getAllWarehouses = async (): Promise<WarehouseDTO[]> => {
  console.log('Using mock getAllWarehouses');
  return mockWarehouses;
};