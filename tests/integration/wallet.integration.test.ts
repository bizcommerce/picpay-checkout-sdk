import { describe, it, expect, beforeAll } from 'vitest';
import { PicPayClient, PaymentSource, PaymentType } from '../../src/index.js';
import type { WalletChargeRequest } from '../../src/index.js';
import { getIntegrationClient } from './setup.js';
import { MOCK_CUSTOMER } from '../mocks/fixtures.js';

describe('Wallet Integration', () => {
  let client: PicPayClient;

  beforeAll(() => {
    client = getIntegrationClient();
  });

  it('should create a wallet charge', async () => {
    const request: WalletChargeRequest = {
      paymentSource: PaymentSource.GATEWAY,
      merchantChargeId: `test-wallet-${Date.now()}`,
      customer: MOCK_CUSTOMER,
      transactions: [
        {
          paymentType: PaymentType.WALLET,
          amount: 100,
        },
      ],
    };

    const result = await client.wallet.createCharge(request);

    expect(result.chargeId).toBeTruthy();
    expect(result.transactions[0]?.wallet.qrCode).toBeTruthy();
  });
});
