import { describe, it, expect, beforeAll } from 'vitest';
import { PicPayClient, PaymentSource, PaymentType } from '../../src/index.js';
import type { PixChargeRequest } from '../../src/index.js';
import { getIntegrationClient } from './setup.js';
import { MOCK_CUSTOMER } from '../mocks/fixtures.js';

describe('PIX Integration', () => {
  let client: PicPayClient;

  beforeAll(() => {
    client = getIntegrationClient();
  });

  it('should create a PIX charge', async () => {
    const request: PixChargeRequest = {
      paymentSource: PaymentSource.GATEWAY,
      merchantChargeId: `test-pix-${Date.now()}`,
      customer: MOCK_CUSTOMER,
      transactions: [
        {
          paymentType: PaymentType.PIX,
          amount: 100,
        },
      ],
    };

    const result = await client.pix.createCharge(request);

    expect(result.id).toBeTruthy();
    expect(result.transactions[0]?.pix.qrCode).toBeTruthy();
    expect(result.transactions[0]?.pix.qrCodeBase64).toBeTruthy();
  });
});
