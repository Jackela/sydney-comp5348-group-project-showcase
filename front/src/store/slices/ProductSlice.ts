/**
 * Product Slice for managing product state
 * @module ProductSlice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDTO } from '../../services/Types';

/**
 * Product State interface
 */
interface ProductState {
  products: ProductDTO[];
  loading: boolean;
  error: string | null;
}

/**
 * Initial state for products
 */
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

/**
 * Product slice
 */
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    /**
     * Set loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    /**
     * Set products
     */
    setProducts: (state, action: PayloadAction<ProductDTO[]>) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    /**
     * Set error state
     */
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    /**
     * Add a new product
     */
    addProduct: (state, action: PayloadAction<ProductDTO>) => {
      state.products.push(action.payload);
    },
    /**
     * Update an existing product
     */
    updateProduct: (state, action: PayloadAction<ProductDTO>) => {
      const index = state.products.findIndex(product => product.productId === action.payload.productId);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    /**
     * Remove a product
     */
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.productId !== action.payload);
    },
  },
});

export const {
  setLoading,
  setProducts,
  setError,
  addProduct,
  updateProduct,
  removeProduct
} = productSlice.actions;

export default productSlice.reducer;