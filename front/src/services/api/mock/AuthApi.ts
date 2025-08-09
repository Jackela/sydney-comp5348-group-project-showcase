/**
 * Mock implementation of the Auth API
 * @module AuthAPI
 */

import { AuthRequestDTO, AuthResponseDTO, UserDTO } from '../../Types';

const mockUsers: (UserDTO & { password: string })[] = [
  { id: '1', username: 'testuser', email: 'testuser@example.com', password: 'password123' },
  { id: '2', username: 'customer', email: 'customer@example.com', password: 'COMP5348' }
];

/**
 * Simulates a login request.
 * @param {AuthRequestDTO} authRequest - The login credentials.
 * @returns {Promise<AuthResponseDTO>} A promise that resolves with the auth response.
 */
export const login = async (authRequest: AuthRequestDTO): Promise<AuthResponseDTO> => {
  console.log('Using mock login');
  const user = mockUsers.find(u => u.username === authRequest.username && u.password === authRequest.password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return {
      token: 'mock-token',
      user: userWithoutPassword
    };
  }
  throw new Error('Invalid credentials');
};

/**
 * Simulates a logout request.
 * @returns {Promise<void>} A promise that resolves when logout is successful.
 */
export const logout = async (): Promise<void> => {
  console.log('Using mock logout');
  // In a real implementation, this would invalidate the token
};

/**
 * Simulates creating an admin account.
 * @param {AuthRequestDTO} authRequest - The admin account credentials.
 * @returns {Promise<void>} A promise that resolves when the admin account is created.
 */
export const createAdminAccount = async (authRequest: AuthRequestDTO): Promise<void> => {
  console.log('Using mock createAdminAccount');
  // In a real implementation, this would create an admin account
};

/**
 * Simulates creating a regular user account.
 * @param {AuthRequestDTO} authRequest - The user account credentials.
 * @returns {Promise<void>} A promise that resolves when the user account is created.
 */
export const createUserAccount = async (authRequest: AuthRequestDTO): Promise<void> => {
  console.log('Using mock createUserAccount');
  // In a real implementation, this would create a regular user account
};