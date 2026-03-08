import { describe, it, expect, beforeAll } from 'vitest';
import { PicPayClient, PaymentSource, PaymentType } from '../../src/index.js';
import { getIntegrationClient } from './setup.js';
import { MOCK_CUSTOMER, TEST_CARD_VISA } from '../mocks/fixtures.js';

describe('Charge Integration', () => {
  let client: PicPayClient;
  let merchantChargeId: string;

  beforeAll(async () => {
    client = getIntegrationClient();
    merchantChargeId = `test-charge-${Date.now()}`;

    await client.creditCard.authorize({
      paymentSource: PaymentSource.GATEWAY,
      merchantChargeId,
      customer: MOCK_CUSTOMER,
      transactions: [
        {
          paymentType: PaymentType.CREDIT,
          amount: 1000,
          credit: {
            installments: 1,
            card: {
              number: TEST_CARD_VISA,
              holder: 'JOHN DOE',
              expirationMonth: '12',
              expirationYear: '2030',
              cvv: '123',
            },
          },
        },
      ],
    });
  });

  it('should find a charge by merchantChargeId', async () => {
    const result = await client.charge.find(merchantChargeId);

    expect(result.chargeId).toBeTruthy();
    expect(result.merchantChargeId).toBe(merchantChargeId);
  });

  it('should refund a charge', async () => {
    const result = await client.charge.refund(merchantChargeId, { amount: 500 });

    expect(result.chargeId).toBeTruthy();
  });
});
