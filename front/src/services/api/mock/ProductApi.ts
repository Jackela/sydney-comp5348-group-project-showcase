/**
 * Mock implementation of the Product API
 * @module ProductAPI
 */

import { ProductDTO } from '../../Types';

const mockProducts: ProductDTO[] = [
  {
    productId: '1',
    name: 'Smartphone X',
    description: 'Latest model with advanced features',
    price: 999.99
  },
  {
    productId: '2',
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1499.99
  },
  {
    productId: '3',
    name: 'Wireless Headphones',
    description: 'Premium sound quality with noise cancellation',
    price: 249.99
  }
];

/**
 * Retrieves all products.
 * @returns {Promise<ProductDTO[]>} A promise that resolves with an array of products.
 */
export const getProducts = async (): Promise<ProductDTO[]> => {
  console.log('Using mock getProducts');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 100); // Simulate a 100ms delay
  });
};

/**
 * Retrieves a product by its ID.
 * @param {string} id - The ID of the product to retrieve.
 * @returns {Promise<ProductDTO | null>} A promise that resolves with the product or null if not found.
 */
export const getProductById = async (id: string): Promise<ProductDTO | null> => {
  console.log(`Using mock getProductById for id: ${id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.productId === id);
      resolve(product || null);
    }, 100); // Simulate a 100ms delay
  });
};