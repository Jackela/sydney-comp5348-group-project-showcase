/**
 * Footer component for the application
 * @module Footer
 */

import React from 'react';
import Link from 'next/link';

/**
 * Footer component that displays site links and copyright information
 * @returns {JSX.Element} The rendered Footer component
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-300">Home</Link></li>
              <li><Link href="/products" className="hover:text-blue-300">Products</Link></li>
              <li><Link href="/cart" className="hover:text-blue-300">Cart</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-blue-300">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-blue-300">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-blue-300">Returns & Exchanges</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 E-Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;