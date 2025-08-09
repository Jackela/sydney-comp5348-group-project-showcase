/**
 * Cart page component
 * @module Cart
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../store/Store';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/slices/CartSlice';
import { toast } from 'react-toastify';
import { ROUTES } from '../constants/Routes';

/**
 * Cart component that displays the user's shopping cart and allows for item management
 * @returns {JSX.Element} The rendered cart page
 */
const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
    toast.info('Item removed from cart');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    } else {
      handleRemoveItem(productId);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info('Cart cleared');
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href={ROUTES.PRODUCTS} className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center">
              <img
                src={`https://via.placeholder.com/100x100?text=${item.name}`}
                alt={item.name}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() =>
                  handleUpdateQuantity(item.productId, item.quantity - 1)
                }
                className="px-2 py-1 bg-gray-200 rounded-l"
              >
                -
              </button>
              <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
              <button
                onClick={() =>
                  handleUpdateQuantity(item.productId, item.quantity + 1)
                }
                className="px-2 py-1 bg-gray-200 rounded-r"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-800"
        >
          Clear Cart
        </button>
        <div className="text-xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Link
          href={ROUTES.CHECKOUT}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
