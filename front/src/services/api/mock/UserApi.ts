/**
 * Mock implementation of the User API
 * @module UserAPI
 */

import { UserDTO } from '../../Types';

const mockUsers: UserDTO[] = [
  { id: '1', username: 'testuser', email: 'testuser@example.com' },
  { id: '2', username: 'customer', email: 'customer@example.com' }
];

/**
 * Simulates user registration.
 * @param {UserDTO} userData - The user data for registration.
 * @returns {Promise<UserDTO>} A promise that resolves with the registered user data.
 */
export const register = async (userData: Omit<UserDTO, 'id'>): Promise<UserDTO> => {
  console.log('Using mock register');
  const newUser: UserDTO = {
    id: String(mockUsers.length + 1),
    ...userData
  };
  mockUsers.push(newUser);
  return newUser;
};

/**
 * Simulates fetching a user by ID.
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<UserDTO>} A promise that resolves with the user data.
 */
export const getUserById = async (userId: string): Promise<UserDTO> => {
  console.log('Using mock getUserById');
  const user = mockUsers.find(u => u.id === userId);
  if (user) {
    return user;
  }
  throw new Error('User not found');
};