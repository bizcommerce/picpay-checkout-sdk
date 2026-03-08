import { describe, it, expect, beforeEach } from 'vitest';
import { PicPayClient } from '../../src/client.js';
import {
  TEST_CONFIG,
  TOKEN_RESPONSE,
  PIX_CHARGE_REQUEST,
  PIX_CHARGE_RESPONSE,
  createMockFetch,
} from '../mocks/fixtures.js';

describe('PixResource', () => {
  let client: PicPayClient;
  let mockFetch: ReturnType<typeof createMockFetch>;

  beforeEach(() => {
    mockFetch = createMockFetch([
      { status: 200, body: TOKEN_RESPONSE },
      { status: 200, body: PIX_CHARGE_RESPONSE },
    ]);
    client = new PicPayClient({ ...TEST_CONFIG, fetch: mockFetch });
  });

  it('should create a PIX charge', async () => {
    const result = await client.pix.createCharge(PIX_CHARGE_REQUEST);

    expect(result.chargeId).toBe(PIX_CHARGE_RESPONSE.chargeId);
    expect(result.merchantChargeId).toBe('order-002');
    expect(result.transactions).toHaveLength(1);
    expect(result.transactions[0]?.pix.qrCode).toBeTruthy();
    expect(result.transactions[0]?.pix.qrCodeBase64).toBeTruthy();
  });

  it('should call the correct endpoint', async () => {
    await client.pix.createCharge(PIX_CHARGE_REQUEST);

    const [url, options] = mockFetch.mock.calls[1]!;
    expect(url).toContain('/api/v1/charge/pix');
    expect(options?.method).toBe('POST');
  });

  it('should send correct request body', async () => {
    await client.pix.createCharge(PIX_CHARGE_REQUEST);

    const [, options] = mockFetch.mock.calls[1]!;
    const body = JSON.parse(options?.body as string);
    expect(body.paymentSource).toBe('GATEWAY');
    expect(body.transactions[0].paymentType).toBe('PIX');
    expect(body.transactions[0].amount).toBe(5000);
  });
});
