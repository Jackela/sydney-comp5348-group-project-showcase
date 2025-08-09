import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../services/api';
import { setUser, clearUser } from '../store/slices/authSlice';
import { ROUTES } from '../constants/routes';
import { handleError } from '../utils/errorHandler';

/**
 * Custom hook for handling authentication-related operations.
 * 
 * @returns {Object} An object containing authentication functions and loading state.
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Attempts to log in a user.
   * 
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<boolean>} A promise that resolves to true if login is successful, false otherwise.
   */
  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await API.auth.login({ username, password });
      dispatch(setUser(response.user));
      localStorage.setItem('token', response.token);
      toast.success('Login successful!');
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  /**
   * Registers a new user.
   * 
   * @param {string} username - The username for the new user.
   * @param {string} email - The email for the new user.
   * @param {string} password - The password for the new user.
   */
  const register = useCallback(async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      await API.auth.register(username, email, password);
      toast.success('Registration successful! Please log in.');
      navigate(ROUTES.LOGIN);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Logs out the current user.
   */
  const logout = useCallback(() => {
    dispatch(clearUser());
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate(ROUTES.HOME);
  }, [dispatch, navigate]);

  return { login, register, logout, loading };
};