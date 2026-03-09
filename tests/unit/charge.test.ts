import { describe, it, expect, beforeEach } from 'vitest';
import { PicPayClient, ChargeStatus } from '../../src/index.js';
import {
  TEST_CONFIG,
  TOKEN_RESPONSE,
  CHARGE_RESPONSE,
  REFUND_RESPONSE,
  createMockFetch,
} from '../mocks/fixtures.js';

describe('ChargeResource', () => {
  let client: PicPayClient;
  let mockFetch: ReturnType<typeof createMockFetch>;

  beforeEach(() => {
    mockFetch = createMockFetch([
      { status: 200, body: TOKEN_RESPONSE },
      { status: 200, body: CHARGE_RESPONSE },
    ]);
    client = new PicPayClient({ ...TEST_CONFIG, fetch: mockFetch });
  });

  it('should find a charge by merchantChargeId', async () => {
    const result = await client.charge.find('order-001');

    expect(result.id).toBe(CHARGE_RESPONSE.id);
    expect(result.chargeStatus).toBe(ChargeStatus.PAID);
  });

  it('should call the correct endpoint for find', async () => {
    await client.charge.find('order-001');

    const [url, options] = mockFetch.mock.calls[1]!;
    expect(url).toContain('/api/v1/charge/order-001');
    expect(options?.method).toBe('GET');
  });

  it('should URL-encode the merchantChargeId', async () => {
    await client.charge.find('order/special&chars');

    const [url] = mockFetch.mock.calls[1]!;
    expect(url).toContain('/api/v1/charge/order%2Fspecial%26chars');
  });

  it('should refund a charge', async () => {
    mockFetch = createMockFetch([
      { status: 200, body: TOKEN_RESPONSE },
      { status: 200, body: REFUND_RESPONSE },
    ]);
    client = new PicPayClient({ ...TEST_CONFIG, fetch: mockFetch });

    const result = await client.charge.refund('order-001');

    const [url, options] = mockFetch.mock.calls[1]!;
    expect(url).toContain('/api/v1/charge/order-001/refund');
    expect(options?.method).toBe('POST');
    expect(result.chargeStatus).toBe(ChargeStatus.PARTIAL);
  });

  it('should refund with partial amount', async () => {
    mockFetch = createMockFetch([
      { status: 200, body: TOKEN_RESPONSE },
      { status: 200, body: REFUND_RESPONSE },
    ]);
    client = new PicPayClient({ ...TEST_CONFIG, fetch: mockFetch });

    await client.charge.refund('order-001', { amount: 500 });

    const [, options] = mockFetch.mock.calls[1]!;
    const body = JSON.parse(options?.body as string);
    expect(body.amount).toBe(500);
  });
});
