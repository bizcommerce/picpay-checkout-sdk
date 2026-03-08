import { describe, it, expect, beforeAll } from 'vitest';
import {
  PicPayClient,
  PaymentSource,
  PaymentType,
  DocumentType,
} from '../../src/index.js';
import type { CreditCardAuthRequest } from '../../src/index.js';
import { getIntegrationClient } from './setup.js';
import { TEST_CARD_VISA, MOCK_CUSTOMER } from '../mocks/fixtures.js';

describe('Credit Card Integration', () => {
  let client: PicPayClient;

  beforeAll(() => {
    client = getIntegrationClient();
  });

  it('should authorize a credit card payment', async () => {
    const request: CreditCardAuthRequest = {
      paymentSource: PaymentSource.GATEWAY,
      merchantChargeId: `test-cc-${Date.now()}`,
      customer: MOCK_CUSTOMER,
      transactions: [
        {
          paymentType: PaymentType.CREDIT,
          amount: 100,
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
    };

    const result = await client.creditCard.authorize(request);

    expect(result.chargeId).toBeTruthy();
    expect(result.merchantChargeId).toBe(request.merchantChargeId);
    expect(result.transactions).toHaveLength(1);
  });
});
