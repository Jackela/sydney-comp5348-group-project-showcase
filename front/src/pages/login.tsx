/**
 * Login page component
 * @module Login
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { API } from '../services/api/Index';
import { setUser } from '../store/slices/AuthSlice';
import { ROUTES } from '../constants/Routes';
import axios from "axios";

/**
 * Login component that handles user authentication and login process
 * @returns {JSX.Element} The rendered login page
 */
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        userName: username,
        password,
      });

      const { userName } = response.data;

      if (userName) {
        dispatch(setUser(response.data));
        toast.success('Login successful!');
        const returnUrl = (router.query.returnUrl as string) || ROUTES.HOME;
        await router.push(returnUrl);
      } else {
        throw new Error('Login response missing userName');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Head>
        <title>E-Shop - Login</title>
      </Head>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
