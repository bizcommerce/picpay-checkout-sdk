import {
  PaymentSource,
  PaymentType,
  DocumentType,
  TransactionStatus,
  ChargeStatus,
} from '../../src/index.js';
import type {
  CreditCardAuthRequest,
  CreditCardAuthResponse,
  PixChargeRequest,
  PixChargeResponse,
  WalletChargeRequest,
  WalletChargeResponse,
  ChargeResponse,
  RefundResponse,
  Customer,
  WebhookEvent,
} from '../../src/index.js';

export const TEST_CARD_VISA = '4111111111111111';
export const TEST_CARD_MASTERCARD = '5500000000000004';

export const TEST_CONFIG = {
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
  sandbox: true,
};

export const TOKEN_RESPONSE = {
  access_token: 'test-access-token-123',
  token_type: 'Bearer',
  expires_in: 300,
};

export const MOCK_CUSTOMER: Customer = {
  name: 'John Doe',
  email: 'john@example.com',
  documentType: DocumentType.CPF,
  documentNumber: '12345678901',
  phone: { country: '55', area: '11', number: '999999999' },
  address: {
    street: 'Rua Teste',
    number: '123',
    neighborhood: 'Centro',
    city: 'Sao Paulo',
    state: 'SP',
    country: 'BR',
    zipCode: '01001000',
  },
};

export const CREDIT_CARD_AUTH_REQUEST: CreditCardAuthRequest = {
  paymentSource: PaymentSource.GATEWAY,
  merchantChargeId: 'order-001',
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
};

export const CREDIT_CARD_AUTH_RESPONSE: CreditCardAuthResponse = {
  chargeId: 'charge-uuid-001',
  merchantChargeId: 'order-001',
  status: 'AUTHORIZED',
  transactions: [
    {
      transactionId: 'txn-uuid-001',
      paymentType: PaymentType.CREDIT,
      status: TransactionStatus.AUTHORIZED,
      amount: 1000,
      credit: {
        installments: 1,
        brand: 'VISA' as never,
        lastDigits: '1111',
        authorizationCode: 'AUTH123',
        nsu: 'NSU456',
      },
    },
  ],
};

export const PIX_CHARGE_REQUEST: PixChargeRequest = {
  paymentSource: PaymentSource.GATEWAY,
  merchantChargeId: 'order-002',
  customer: MOCK_CUSTOMER,
  transactions: [
    {
      paymentType: PaymentType.PIX,
      amount: 5000,
    },
  ],
};

export const PIX_CHARGE_RESPONSE: PixChargeResponse = {
  chargeId: 'charge-uuid-002',
  merchantChargeId: 'order-002',
  status: 'CREATED',
  transactions: [
    {
      transactionId: 'txn-uuid-002',
      paymentType: PaymentType.PIX,
      status: TransactionStatus.CREATED,
      amount: 5000,
      pix: {
        qrCode: '00020101021226850014br.gov.bcb.pix...',
        qrCodeBase64: 'data:image/png;base64,iVBOR...',
        expiresAt: '2026-03-05T18:00:00Z',
      },
    },
  ],
};

export const WALLET_CHARGE_REQUEST: WalletChargeRequest = {
  paymentSource: PaymentSource.GATEWAY,
  merchantChargeId: 'order-003',
  customer: MOCK_CUSTOMER,
  transactions: [
    {
      paymentType: PaymentType.WALLET,
      amount: 3000,
    },
  ],
};

export const WALLET_CHARGE_RESPONSE: WalletChargeResponse = {
  chargeId: 'charge-uuid-003',
  merchantChargeId: 'order-003',
  status: 'CREATED',
  transactions: [
    {
      transactionId: 'txn-uuid-003',
      paymentType: PaymentType.WALLET,
      status: TransactionStatus.CREATED,
      amount: 3000,
      wallet: {
        qrCode: 'picpay://checkout?token=abc123',
        qrCodeBase64: 'data:image/png;base64,iVBOR...',
        deepLink: 'picpay://checkout?token=abc123',
        expiresAt: '2026-03-05T18:00:00Z',
      },
    },
  ],
};

export const CHARGE_RESPONSE: ChargeResponse = {
  chargeId: 'charge-uuid-001',
  merchantChargeId: 'order-001',
  status: ChargeStatus.AUTHORIZED,
  transactions: [
    {
      transactionId: 'txn-uuid-001',
      paymentType: PaymentType.CREDIT,
      status: TransactionStatus.AUTHORIZED,
      amount: 1000,
    },
  ],
};

export const REFUND_RESPONSE: RefundResponse = {
  chargeId: 'charge-uuid-001',
  merchantChargeId: 'order-001',
  status: ChargeStatus.REFUNDED,
  transactions: [
    {
      transactionId: 'txn-uuid-001',
      paymentType: PaymentType.CREDIT,
      status: TransactionStatus.REFUNDED,
      amount: 1000,
    },
  ],
};

export const WEBHOOK_EVENT: WebhookEvent = {
  event: 'charge.paid',
  timestamp: '2026-03-05T12:00:00Z',
  data: {
    chargeId: 'charge-uuid-001',
    merchantChargeId: 'order-001',
    status: ChargeStatus.PAID,
    transactions: [
      {
        transactionId: 'txn-uuid-001',
        paymentType: PaymentType.CREDIT,
        status: TransactionStatus.PAID,
        amount: 1000,
      },
    ],
  },
};

export function createIntegrationMockFetch(): typeof globalThis.fetch {
  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();
    const method = init?.method ?? 'GET';
    const body = init?.body ? String(init.body) : '';

    const route = (pattern: RegExp, httpMethod: string) =>
      method === httpMethod && pattern.test(url);

    let responseBody: unknown;

    if (route(/\/oauth2\/token$/, 'POST')) {
      responseBody = TOKEN_RESPONSE;
    } else if (route(/\/api\/v1\/charge\/authorization$/, 'POST')) {
      const parsed = JSON.parse(body) as { merchantChargeId?: string };
      responseBody = {
        ...CREDIT_CARD_AUTH_RESPONSE,
        merchantChargeId: parsed.merchantChargeId ?? CREDIT_CARD_AUTH_RESPONSE.merchantChargeId,
      };
    } else if (route(/\/api\/v1\/charge\/pix$/, 'POST')) {
      const parsed = JSON.parse(body) as { merchantChargeId?: string };
      responseBody = {
        ...PIX_CHARGE_RESPONSE,
        merchantChargeId: parsed.merchantChargeId ?? PIX_CHARGE_RESPONSE.merchantChargeId,
      };
    } else if (route(/\/api\/v1\/charge\/wallet$/, 'POST')) {
      const parsed = JSON.parse(body) as { merchantChargeId?: string };
      responseBody = {
        ...WALLET_CHARGE_RESPONSE,
        merchantChargeId: parsed.merchantChargeId ?? WALLET_CHARGE_RESPONSE.merchantChargeId,
      };
    } else if (route(/\/api\/v1\/charge\/[^/]+\/refund$/, 'POST')) {
      const match = url.match(/\/api\/v1\/charge\/([^/]+)\/refund$/);
      const merchantChargeId = match ? decodeURIComponent(match[1]!) : REFUND_RESPONSE.merchantChargeId;
      responseBody = {
        ...REFUND_RESPONSE,
        merchantChargeId,
      };
    } else if (route(/\/api\/v1\/charge\/[^/]+$/, 'GET')) {
      const match = url.match(/\/api\/v1\/charge\/([^/]+)$/);
      const merchantChargeId = match ? decodeURIComponent(match[1]!) : CHARGE_RESPONSE.merchantChargeId;
      responseBody = {
        ...CHARGE_RESPONSE,
        merchantChargeId,
      };
    } else {
      return {
        ok: false,
        status: 404,
        json: async () => ({ message: 'Not found' }),
        headers: new Headers(),
      } as Response;
    }

    return {
      ok: true,
      status: 200,
      json: async () => responseBody,
      headers: new Headers(),
    } as Response;
  }) as typeof globalThis.fetch;
}

export function createMockFetch(responses: Array<{ status: number; body: unknown; headers?: Record<string, string> }>) {
  let callIndex = 0;

  const mockFetch = vi.fn(async () => {
    const responseConfig = responses[callIndex] ?? responses[responses.length - 1]!;
    callIndex++;

    return {
      ok: responseConfig.status >= 200 && responseConfig.status < 300,
      status: responseConfig.status,
      json: async () => responseConfig.body,
      headers: new Headers(responseConfig.headers ?? {}),
    } as Response;
  });

  return mockFetch;
}
