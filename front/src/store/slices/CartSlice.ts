/**
 * Cart Slice for managing shopping cart state
 * @module CartSlice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDTO } from '../../services/Types';

/**
 * Cart Item interface
 */
interface CartItem extends ProductDTO {
  quantity: number;
}

/**
 * Cart State interface
 */
interface CartState {
  items: CartItem[];
}

/**
 * Initial state for cart
 */
const initialState: CartState = {
  items: [],
};

/**
 * Cart slice
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add an item to the cart
     */
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    /**
     * Remove an item from the cart
     */
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    /**
     * Update the quantity of an item in the cart
     */
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find(item => item.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    /**
     * Clear all items from the cart
     */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;