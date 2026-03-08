# @bizcommerce/picpay-checkout-sdk

TypeScript SDK for PicPay Checkout API (Transparent Checkout). Supports credit card, PIX, and wallet payments.

## Installation

```bash
npm install @bizcommerce/picpay-checkout-sdk
```

## Quick Start

```typescript
import { PicPayClient, PaymentSource, PaymentType, DocumentType } from '@bizcommerce/picpay-checkout-sdk';

const client = new PicPayClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  sandbox: true, // false for production
});
```

## Credit Card

```typescript
const auth = await client.creditCard.authorize({
  paymentSource: PaymentSource.GATEWAY,
  merchantChargeId: 'order-001',
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    documentType: DocumentType.CPF,
    documentNumber: '12345678901',
  },
  transactions: [{
    paymentType: PaymentType.CREDIT,
    amount: 1000, // R$ 10.00 in cents
    credit: {
      installments: 1,
      card: {
        number: '4111111111111111',
        holder: 'JOHN DOE',
        expirationMonth: '12',
        expirationYear: '2030',
        cvv: '123',
      },
    },
  }],
});

// Capture pre-authorized charge
await client.creditCard.capture('order-001');

// Partial capture
await client.creditCard.capture('order-001', { amount: 500 });
```

## PIX

```typescript
const pix = await client.pix.createCharge({
  paymentSource: PaymentSource.GATEWAY,
  merchantChargeId: 'order-002',
  customer: { /* ... */ },
  transactions: [{
    paymentType: PaymentType.PIX,
    amount: 5000,
  }],
});

console.log(pix.transactions[0].pix.qrCode);       // Copy-paste code
console.log(pix.transactions[0].pix.qrCodeBase64);  // QR code image
```

## Wallet

```typescript
const wallet = await client.wallet.createCharge({
  paymentSource: PaymentSource.GATEWAY,
  merchantChargeId: 'order-003',
  customer: { /* ... */ },
  transactions: [{
    paymentType: PaymentType.WALLET,
    amount: 3000,
  }],
});
```

## Charge Operations

```typescript
// Find charge status
const charge = await client.charge.find('order-001');

// Full refund
await client.charge.refund('order-001');

// Partial refund
await client.charge.refund('order-001', { amount: 500 });
```

## Webhooks

```typescript
import { WebhookHandler, ChargeStatus } from '@bizcommerce/picpay-checkout-sdk';

const handler = new WebhookHandler();

// In your webhook endpoint
const event = handler.parse(req.body);

if (handler.isChargeStatus(event, ChargeStatus.PAID)) {
  // Handle payment confirmation
}
```

## Error Handling

```typescript
import { PicPayError, PicPayAuthError, PicPayValidationError } from '@bizcommerce/picpay-checkout-sdk';

try {
  await client.creditCard.authorize(request);
} catch (error) {
  if (error instanceof PicPayValidationError) {
    console.log(error.details); // Field-level errors
  } else if (error instanceof PicPayAuthError) {
    console.log('Authentication failed');
  } else if (error instanceof PicPayError) {
    console.log(error.statusCode, error.message);
  }
}
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `clientId` | `string` | required | PicPay OAuth client ID |
| `clientSecret` | `string` | required | PicPay OAuth client secret |
| `sandbox` | `boolean` | `false` | Use sandbox environment |
| `timeout` | `number` | `30000` | Request timeout in ms |
| `fetch` | `typeof fetch` | `globalThis.fetch` | Custom fetch implementation |

## Documentation

- [Credit Card](./docs/credit-card.md)
- [PIX](./docs/pix.md)
- [Wallet](./docs/wallet.md)
- [Webhooks](./docs/webhooks.md)
- [Testing](./docs/testing.md)

## Requirements

- Node.js 18+ (native fetch support)
- TypeScript 5.7+ (recommended)

## License

MIT
