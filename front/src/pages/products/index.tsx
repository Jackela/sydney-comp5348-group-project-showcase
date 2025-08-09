import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { ProductDTO } from '../../services/Types';
import axios from 'axios';

interface ProductListProps {
  products: ProductDTO[];
  error?: string;
}

/**
 * ProductList component renders a list of products with a link to each product's details.
 *
 * @component
 * @param {ProductListProps} props - The list of products and optional error message.
 * @returns {JSX.Element} The rendered product list component.
 */
const ProductList: React.FC<ProductListProps> = ({ products, error }) => {
  return (
      <>
        <Head>
          <title>E-Shop - Our Products</title>
          <meta
              name="description"
              content="Browse our wide selection of products"
          />
        </Head>
        <div>
          <h1 className="text-3xl font-bold mb-6">Our Products</h1>
          {error ? (
              <div className="text-center mt-8 text-red-600">{error}</div>
          ) : products.length === 0 ? (
              <div className="text-center mt-8">No products available.</div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product: ProductDTO) => (
                    <Link
                        href={`/products/${product.productId}`}
                        key={product.productId}
                    >
                      <div className="border rounded-lg overflow-hidden shadow-lg cursor-pointer">
                        <div className="p-4">
                          <h2 className="text-xl font-semibold mb-2">
                            {product.name}
                          </h2>
                          <p className="text-gray-600 mb-4">
                            ${product.price.toFixed(2)}
                          </p>
                          <p className="text-gray-500 mb-4">{product.description}</p>
                        </div>
                      </div>
                    </Link>
                ))}
              </div>
          )}
        </div>
      </>
  );
};

/**
 * Fetches the list of products from the API and provides it to the page as props.
 *
 * @returns {Promise<{ props: ProductListProps }>} Props containing products or an error message.
 */
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get("http://localhost:8080/products");

    // 提取响应中的 data 部分
    const products: ProductDTO[] = response.data;

    return { props: { products } };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return {
      props: {
        products: [],
        error: 'Failed to fetch products. Please try again later.',
      },
    };
  }
};

export default ProductList;
