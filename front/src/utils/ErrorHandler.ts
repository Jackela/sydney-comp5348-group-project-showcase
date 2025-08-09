import { toast } from 'react-toastify';

/**
 * Custom error class for application-specific errors.
 */
export class AppError extends Error {
  /**
   * @param {string} code - Error code for identifying the type of error.
   * @param {string} message - Human-readable error message.
   */
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Centralized error handling function.
 * Logs the error, displays a toast notification, and returns an error message.
 * 
 * @param {unknown} error - The error to be handled.
 * @returns {string} A user-friendly error message.
 */
export const handleError = (error: unknown): string => {
  console.error('Error occurred:', error);

  if (error instanceof AppError) {
    toast.error(error.message);
    return error.message;
  }

  if (error instanceof Error) {
    const errorMessage = error.message || 'An unexpected error occurred';
    toast.error(errorMessage);
    return errorMessage;
  }

  const errorMessage = 'An unexpected error occurred';
  toast.error(errorMessage);
  return errorMessage;
};

/**
 * Throws a new AppError with the given code and message.
 * 
 * @param {string} code - Error code for identifying the type of error.
 * @param {string} message - Human-readable error message.
 * @throws {AppError} Always throws an AppError.
 */
export const throwAppError = (code: string, message: string): never => {
  throw new AppError(code, message);
};