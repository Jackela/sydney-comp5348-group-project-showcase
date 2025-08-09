/**
 * Store configuration for the application
 * @module Store
 */

import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authReducer from './slices/AuthSlice';
import cartReducer from './slices/CartSlice';
import orderReducer from './slices/OrderSlice';
import productReducer from './slices/ProductSlice';
import totalReducer from './slices/TotalSlice'; // 导入 totalSlice
import warehouseReducer from './slices/WarehouseSlice'

const combinedReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  products: productReducer,
  total: totalReducer,
  warehouse: warehouseReducer,
});

const reducer = (state: ReturnType<typeof combinedReducer> | undefined, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // 保留当前的 state
      ...action.payload, // 合并服务器和客户端的 state
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

/**
 * Creates the Redux store
 * @returns {ReturnType<typeof configureStore>} The configured store
 */
export const makeStore = () =>
    configureStore({
      reducer,
      devTools: process.env.NODE_ENV !== 'production',
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

// 创建 Next.js 的 Redux wrapper
export const wrapper = createWrapper<AppStore>(makeStore);
