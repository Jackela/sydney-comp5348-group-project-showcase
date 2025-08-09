import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to E-Shop</h1>
      <p className="text-xl mb-8">Discover amazing products at unbeatable prices!</p>
      <div className="flex justify-center">
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold flex items-center hover:bg-blue-700 transition duration-300"
        >
          <ShoppingBag className="mr-2" />
          Start Shopping
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Wide Selection</h2>
          <p>Browse through our extensive catalog of high-quality products.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Fast Shipping</h2>
          <p>Get your orders delivered quickly and efficiently to your doorstep.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Secure Payments</h2>
          <p>Shop with confidence using our safe and secure payment methods.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;