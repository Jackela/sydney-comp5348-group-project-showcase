/**
 * Header component for the application
 * @module Header
 */

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { ROUTES } from '../constants/Routes';

/**
 * Header component that displays navigation links
 * @returns {JSX.Element} The rendered Header component
 */
const Header: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <header className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <Link href={ROUTES.HOME} className="text-3xl font-bold mb-4 md:mb-0">E-Shop</Link>
        <nav>
          <ul className="flex flex-wrap justify-center space-x-4">
            <li><Link href={ROUTES.PRODUCTS} className="hover:text-blue-200 text-lg">Products</Link></li>
            <li><Link href={ROUTES.CART} className="hover:text-blue-200 text-lg">Cart</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link href={ROUTES.PROFILE} className="hover:text-blue-200 text-lg">Profile</Link></li>
                <li><Link href={ROUTES.HOME} className="hover:text-blue-200 text-lg">Logout</Link></li>
              </>
            ) : (
              <>
                <li><Link href={ROUTES.LOGIN} className="hover:text-blue-200 text-lg">Login</Link></li>
                <li><Link href={ROUTES.REGISTER} className="hover:text-blue-200 text-lg">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;