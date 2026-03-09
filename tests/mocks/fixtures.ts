import {
  PaymentSource,
  PaymentType,
  DocumentType,
  PhoneType,
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
  document: '12345678901',
  phone: { countryCode: '55', areaCode: '11', number: '999999999', type: PhoneType.MOBILE },
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
        cardNumber: TEST_CARD_VISA,
        cardholderName: 'JOHN DOE',
        cardholderDocument: '12345678901',
        expirationMonth: 12,
        expirationYear: 2030,
        cvv: '123',
      },
    },
  ],
};

export const CREDIT_CARD_AUTH_RESPONSE: CreditCardAuthResponse = {
  merchantChargeId: 'order-001',
  id: 'charge-uuid-001',
  chargeStatus: 'PAID',
  amount: 1000,
  originalAmount: 1000,
  refundedAmount: 0,
  transactions: [
    {
      paymentType: PaymentType.CREDIT,
      amount: 1000,
      originalAmount: 1000,
      refundedAmount: 0,
      transactionStatus: TransactionStatus.PAID,
      createdAt: '2026-03-05T12:00:00-03:00',
      updatedAt: '2026-03-05T12:00:00-03:00',
      transactionId: '000000001',
      softDescriptor: null,
      errorMessage: 'APROVADA',
      mac: null,
      credit: {
        nsu: null,
        cardNumber: '411111******1111',
        authorizationCode: null,
        authorizationResponseCode: null,
        reasonCode: '00',
        reasonMessage: 'APROVADA',
        brand: 'VISA' as never,
        cardholderName: 'JOHN DOE',
        cardholderDocument: '123********',
        expirationMonth: 12,
        expirationYear: 2030,
        installmentNumber: 0,
        issuerTransactionId: null,
        installmentType: 'NONE',
      },
      wallet: null,
      pix: null,
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
  merchantChargeId: 'order-002',
  id: 'charge-uuid-002',
  chargeStatus: 'PRE_AUTHORIZED',
  amount: 5000,
  originalAmount: 5000,
  refundedAmount: 0,
  transactions: [
    {
      paymentType: PaymentType.PIX,
      amount: 5000,
      originalAmount: 5000,
      refundedAmount: 0,
      transactionStatus: TransactionStatus.PENDING,
      createdAt: '2026-03-05T12:00:00-03:00',
      updatedAt: '2026-03-05T12:00:00-03:00',
      transactionId: 'txn-uuid-002',
      errorMessage: null,
      credit: null,
      pix: {
        qrCode: '00020101021226850014br.gov.bcb.pix...',
        qrCodeBase64: 'iVBOR...',
        endToEndId: null,
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
  merchantChargeId: 'order-003',
  id: 'charge-uuid-003',
  chargeStatus: 'PRE_AUTHORIZED',
  amount: 3000,
  originalAmount: 3000,
  refundedAmount: 0,
  transactions: [
    {
      paymentType: PaymentType.WALLET,
      amount: 3000,
      originalAmount: 3000,
      refundedAmount: 0,
      transactionStatus: TransactionStatus.PENDING,
      createdAt: '2026-03-05T12:00:00-03:00',
      updatedAt: '2026-03-05T12:00:00-03:00',
      transactionId: 'txn-uuid-003',
      softDescriptor: null,
      errorMessage: null,
      mac: null,
      credit: null,
      wallet: {
        qrCode: 'picpay://checkout?token=abc123',
        qrCodeBase64: 'data:image/png;base64,iVBOR...',
        expiresAt: '2026-03-05T18:00:00Z',
      },
      pix: null,
    },
  ],
};

export const CHARGE_RESPONSE: ChargeResponse = {
  merchantChargeId: 'order-001',
  id: 'charge-uuid-001',
  chargeStatus: ChargeStatus.PAID,
  amount: 1000,
  originalAmount: 1000,
  refundedAmount: 0,
  transactions: [
    {
      paymentType: PaymentType.CREDIT,
      amount: 1000,
      originalAmount: 1000,
      refundedAmount: 0,
      transactionStatus: TransactionStatus.PAID,
      createdAt: '2026-03-05T12:00:00-03:00',
      updatedAt: '2026-03-05T12:00:00-03:00',
      transactionId: '000000001',
      softDescriptor: null,
      errorMessage: null,
      mac: null,
      credit: null,
      wallet: null,
      pix: null,
    },
  ],
};

export const REFUND_RESPONSE: RefundResponse = {
  merchantChargeId: 'order-001',
  id: 'charge-uuid-001',
  chargeStatus: ChargeStatus.PARTIAL,
  amount: 500,
  originalAmount: 1000,
  refundedAmount: 500,
  transactions: [
    {
      paymentType: PaymentType.CREDIT,
      amount: 500,
      originalAmount: 1000,
      refundedAmount: 500,
      transactionStatus: TransactionStatus.PARTIALLY_REFUNDED,
      createdAt: '2026-03-05T12:00:00-03:00',
      updatedAt: '2026-03-05T12:00:01-03:00',
      transactionId: '000000001',
      softDescriptor: null,
      errorMessage: null,
      mac: null,
      credit: null,
      wallet: null,
      pix: null,
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
