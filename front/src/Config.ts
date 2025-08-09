/**
 * Configuration module for the application.
 * @module config
 */

/**
 * API configuration
 */
export const API_CONFIG = {
  /** Base URL for API requests */
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  /** Timeout for API requests in milliseconds */
  TIMEOUT: 5000,
};

/**
 * Authentication configuration
 */
export const AUTH_CONFIG = {
  /** Name of the token stored in local storage */
  TOKEN_KEY: 'auth_token',
  /** Expiration time for the token in seconds */
  TOKEN_EXPIRATION: 3600,
};

/**
 * Product configuration
 */
export const PRODUCT_CONFIG = {
  /** Default number of products to display per page */
  DEFAULT_PAGE_SIZE: 10,
  /** Maximum number of products that can be ordered at once */
  MAX_ORDER_QUANTITY: 100,
};

/**
 * Order configuration
 */
export const ORDER_CONFIG = {
  /** Minimum order amount for free shipping */
  FREE_SHIPPING_THRESHOLD: 50,
  /** Standard shipping cost */
  STANDARD_SHIPPING_COST: 5.99,
};

/**
 * Application-wide configuration
 */
export const APP_CONFIG = {
  /** Application name */
  APP_NAME: 'E-Shop',
  /** Application version */
  VERSION: '1.0.0',
  /** Default language for the application */
  DEFAULT_LANGUAGE: 'en',
};