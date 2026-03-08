import { describe, it, expect } from 'vitest';
import {
  PicPayError,
  PicPayAuthError,
  PicPayValidationError,
} from '../../src/errors/picpay-error.js';

describe('PicPayError', () => {
  it('should create a base error', () => {
    const error = new PicPayError('Something failed', 500, [], 'req-123');

    expect(error.message).toBe('Something failed');
    expect(error.statusCode).toBe(500);
    expect(error.details).toEqual([]);
    expect(error.requestId).toBe('req-123');
    expect(error.name).toBe('PicPayError');
    expect(error).toBeInstanceOf(Error);
  });

  it('should create an auth error', () => {
    const error = new PicPayAuthError('Invalid credentials', 'req-456');

    expect(error.message).toBe('Invalid credentials');
    expect(error.statusCode).toBe(401);
    expect(error.name).toBe('PicPayAuthError');
    expect(error).toBeInstanceOf(PicPayError);
  });

  it('should create auth error with default message', () => {
    const error = new PicPayAuthError();

    expect(error.message).toBe('Authentication failed');
  });

  it('should create a validation error with details', () => {
    const details = [
      { field: 'amount', message: 'Amount is required', code: 'REQUIRED' },
      { field: 'email', message: 'Invalid email format' },
    ];
    const error = new PicPayValidationError('Validation failed', details);

    expect(error.message).toBe('Validation failed');
    expect(error.statusCode).toBe(400);
    expect(error.details).toHaveLength(2);
    expect(error.details[0]?.field).toBe('amount');
    expect(error.name).toBe('PicPayValidationError');
    expect(error).toBeInstanceOf(PicPayError);
  });
});
