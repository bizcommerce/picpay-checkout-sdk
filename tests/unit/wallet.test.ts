import { describe, it, expect, beforeEach } from 'vitest';
import { PicPayClient } from '../../src/client.js';
import {
  TEST_CONFIG,
  TOKEN_RESPONSE,
  WALLET_CHARGE_REQUEST,
  WALLET_CHARGE_RESPONSE,
  createMockFetch,
} from '../mocks/fixtures.js';

describe('WalletResource', () => {
  let client: PicPayClient;
  let mockFetch: ReturnType<typeof createMockFetch>;

  beforeEach(() => {
    mockFetch = createMockFetch([
      { status: 200, body: TOKEN_RESPONSE },
      { status: 200, body: WALLET_CHARGE_RESPONSE },
    ]);
    client = new PicPayClient({ ...TEST_CONFIG, fetch: mockFetch });
  });

  it('should create a wallet charge', async () => {
    const result = await client.wallet.createCharge(WALLET_CHARGE_REQUEST);

    expect(result.id).toBe(WALLET_CHARGE_RESPONSE.id);
    expect(result.merchantChargeId).toBe('order-003');
    expect(result.transactions).toHaveLength(1);
    expect(result.transactions[0]?.wallet.qrCode).toBeTruthy();
  });

  it('should call the correct endpoint', async () => {
    await client.wallet.createCharge(WALLET_CHARGE_REQUEST);

    const [url, options] = mockFetch.mock.calls[1]!;
    expect(url).toContain('/api/v1/charge/wallet');
    expect(options?.method).toBe('POST');
  });
});
