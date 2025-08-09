/**
 * User Account page component
 * @module UserAccount
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { RootState } from '../store/store';
import { ROUTES } from '../constants/Routes';
import { clearUser } from '../store/slices/AuthSlice';
import { logout } from '../services/api/AuthAPI';

/**
 * UserAccount component that displays the authenticated user's information
 * and handles the logout process.
 *
 * @returns {JSX.Element} The rendered user account page.
 */
const UserAccount: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Get user information and authentication state from Redux store
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  /**
   * Handles user logout by calling the logout API, clearing the user state,
   * and redirecting to the home page.
   */
  const handleLogout = async () => {
    try {
      await logout(); // Simulate logout request
      dispatch(clearUser()); // Clear the user from Redux state
      toast.success('Logged out successfully.');
      router.push(ROUTES.HOME); // Redirect to home page
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  if (!isAuthenticated) {
    router.push(ROUTES.LOGIN); // Redirect to login page if not authenticated
    return null;
  }

  return (
    <>
      <Head>
        <title>E-Shop - User Account</title>
      </Head>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Account</h1>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <p className="border rounded px-3 py-2">{user?.username}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <p className="border rounded px-3 py-2">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default UserAccount;
