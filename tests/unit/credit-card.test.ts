import { describe, it, expect, beforeEach } from 'vitest';
import { PicPayClient } from '../../src/client.js';
import { PicPayValidationError } from '../../src/errors/picpay-error.js';
import {
  TEST_CONFIG,
  TOKEN_RESPONSE,
  CREDIT_CARD_AUTH_REQUEST,
  CREDIT_CARD_AUTH_RESPONSE,
  CHARGE_RESPONSE,
  createMockFetch,
} from '../mocks/fixtures.js';

describe('CreditCardResource', () => {
  let client: PicPayClient;
  let mockFetch: ReturnType<typeof createMockFetch>;

  beforeEach(() => {
    mockFetch = createMockFetch([
      { status: 200, body: TOKEN_RESPONSE },
      { status: 200, body: CREDIT_CARD_AUTH_RESPONSE },
    ]);
    client = new PicPayClient({ ...TEST_CONFIG, fetch: mockFetch });
  });

  it('should authorize a credit card payment', async () => {
    const result = await client.creditCard.authorize(CREDIT_CARD_AUTH_REQUEST);

    expect(result.id).toBe(CREDIT_CARD_AUTH_RESPONSE.id);
    expect(result.merchantChargeId).toBe('order-001');
    expect(result.transactions).toHaveLength(1);
    expect(result.transactions[0]?.credit.cardNumber).toBe('411111******1111');
  });

  it('should call the correct endpoint for authorization', async () => {
    await client.creditCard.authorize(CREDIT_CARD_AUTH_REQUEST);

    const [url, options] = mockFetch.mock.calls[1]!;
    expect(url).toContain('/api/v1/charge/authorization');
    expect(options?.method).toBe('POST');
  });

  it('should capture a pre-authorized charge', async () => {
    mockFetch = createMockFetch([
      { status: 200, body: TOKEN_RESPONSE },
      { status: 200, body: CHARGE_RESPONSE },
    ]);
    client = new PicPayClient({ ...TEST_CONFIG, fetch: mockFetch });

    const result = await client.creditCard.capture('order-001');

    const [url] = mockFetch.mock.calls[1]!;
    expect(url).toContain('/api/v1/charge/order-001/capture');
    expect(result.id).toBe(CHARGE_RESPONSE.id);
  });

  it('should capture with partial amount', async () => {
    mockFetch = createMockFetch([
      { status: 200, body: TOKEN_RESPONSE },
      { status: 200, body: CHARGE_RESPONSE },
    ]);
    client = new PicPayClient({ ...TEST_CONFIG, fetch: mockFetch });

    await client.creditCard.capture('order-001', { amount: 500 });

    const [, options] = mockFetch.mock.calls[1]!;
    const body = JSON.parse(options?.body as string);
    expect(body.amount).toBe(500);
  });

  it('should handle validation errors', async () => {
    mockFetch = createMockFetch([
      { status: 200, body: TOKEN_RESPONSE },
      {
        status: 400,
        body: {
          message: 'Validation error',
          errors: [{ field: 'amount', message: 'Amount is required' }],
        },
      },
    ]);
    client = new PicPayClient({ ...TEST_CONFIG, fetch: mockFetch });

    await expect(
      client.creditCard.authorize(CREDIT_CARD_AUTH_REQUEST),
    ).rejects.toThrow(PicPayValidationError);
  });
});
