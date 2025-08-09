/**
 * Order Slice for managing order state
 * @module OrderSlice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderDTO } from '../../services/Types';

/**
 * Order State interface
 */
interface OrderState {
  orders: OrderDTO[];
  currentOrder: OrderDTO | null;
}

/**
 * Initial state for orders
 */
const initialState: OrderState = {
  orders: [],
  currentOrder: null,
};

/**
 * Order slice
 */
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    /**
     * Add a new order
     */
    addOrder: (state, action: PayloadAction<OrderDTO>) => {
      console.log("state:", state);
      state.orders.push(action.payload);
      state.currentOrder = action.payload;
    },
    /**
     * Set the current order
     */
    setCurrentOrder: (state, action: PayloadAction<OrderDTO>) => {
      state.currentOrder = action.payload;
    },
    /**
     * Clear the current order
     */
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    /**
     * Update an existing order
     */
    updateOrder: (state, action: PayloadAction<OrderDTO>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
        if (state.currentOrder && state.currentOrder.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
      }
    },
  },
});

export const { addOrder, setCurrentOrder, clearCurrentOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;