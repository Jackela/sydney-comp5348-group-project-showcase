/**
 * Product Details page component.
 * Displays detailed information about a specific product and handles ordering.
 *
 * @returns {JSX.Element} The rendered product details page
 */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { API } from '../services/api';
import { ProductDTO } from '../services/types';
import { RootState } from '../store/store';
import { ROUTES } from '../constants/Routes';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [quantity, setQuantity] = useState(1);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await API.product.getProducts();
        const foundProduct = products.find((p) => p.productId === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          toast.error('Product not found');
          navigate(ROUTES.PRODUCTS);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  /**
   * Handles quantity change in the input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Math.max(1, parseInt(e.target.value)));
  };

  /**
   * Handles the "Proceed to Order" button click.
   * Redirects to login if not authenticated, otherwise proceeds to order confirmation.
   */
  const handleProceedToOrder = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to place an order');
      navigate(ROUTES.LOGIN, { state: { from: location.pathname } });
    } else if (product) {
      navigate(ROUTES.ORDER_CONFIRMATION, {
        state: { product, quantity },
      });
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={`https://via.placeholder.com/400x400?text=${product.name}`}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-4">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="border rounded px-2 py-1 w-16 text-center"
            />
          </div>
          <button
            onClick={handleProceedToOrder}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Proceed to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
