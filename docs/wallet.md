# Wallet Payments

## Creating a Wallet Charge

Wallet charges generate a QR code or deep link that opens the PicPay app for payment.

```typescript
import { PicPayClient, PaymentSource, PaymentType, DocumentType } from '@bizcommerce/picpay-checkout-sdk';

const client = new PicPayClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  sandbox: true,
});

const wallet = await client.wallet.createCharge({
  paymentSource: PaymentSource.GATEWAY,
  merchantChargeId: 'unique-order-id',
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    documentType: DocumentType.CPF,
    documentNumber: '12345678901',
  },
  transactions: [{
    paymentType: PaymentType.WALLET,
    amount: 3000,
  }],
  notificationUrl: 'https://yoursite.com/webhooks/picpay',
});

const { qrCode, qrCodeBase64, deepLink, expiresAt } = wallet.transactions[0].wallet;

// qrCode: QR code text content
// qrCodeBase64: QR code image as base64 PNG
// deepLink: URL to open PicPay app directly (mobile)
// expiresAt: ISO 8601 expiration timestamp
```

## Mobile Deep Link

On mobile devices, redirect the user to the deep link to open PicPay directly:

```typescript
if (deepLink) {
  window.location.href = deepLink;
}
```

## Payment Confirmation

Wallet payments are confirmed via webhooks. See [Webhooks](./webhooks.md).
