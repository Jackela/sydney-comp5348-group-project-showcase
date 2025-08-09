import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { API } from '../../services/api/Index';
import { ProductDTO } from '../../services/Types';
import { RootState } from '../../store/Store';
import { ROUTES } from '../../constants/Routes';
import { addToCart } from '../../store/slices/CartSlice';
import axios from "axios";

interface ProductDetailsProps {
  product: ProductDTO | null;
  error?: string;
}

/**
 * ProductDetails component renders detailed information about a product.
 *
 * @component
 * @param {ProductDetailsProps} props - The product details and optional error message.
 * @returns {JSX.Element} The rendered product details component.
 */
const ProductDetails: React.FC<ProductDetailsProps> = ({ product, error }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-8">Product not found.</div>;
  }

  /**
   * Handles quantity change for the product.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Math.max(1, parseInt(e.target.value)));
  };

  /**
   * Handles adding the product to the cart.
   */
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success('Product added to cart');
  };

  /**
   * Handles "Buy Now" action, redirecting to login if user is not authenticated.
   */
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to place an order');
      router.push({
        pathname: ROUTES.LOGIN,
        query: { returnUrl: router.asPath },
      });
    } else {
      dispatch(addToCart({ ...product, quantity }));
      router.push(ROUTES.CHECKOUT);
    }
  };

  return (
    <>
      <Head>
        <title>E-Shop - {product.name}</title>
        <meta name="description" content={product.description} />
      </Head>
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
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Fetches product data server-side for rendering product details page.
 *
 * @param {object} context - The Next.js context object.
 * @returns {Promise<object>} Props containing product details or error message.
 */
export const getServerSideProps: GetServerSideProps<ProductDetailsProps> = async (context) => {
  const { id } = context.params as { id: string };
  try {
    // 发起请求并提取数据部分
    const response = await axios.get(`http://localhost:8080/products/${id}`);
    const product: ProductDTO = response.data;

    // 返回数据部分作为 props
    return { props: { product } };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return {
      props: {
        product: null,
        error: 'Failed to fetch product details. Please try again later.',
      },
    };
  }
};

export default ProductDetails;
