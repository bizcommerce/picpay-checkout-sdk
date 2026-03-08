# PIX Payments

## Creating a PIX Charge

PIX charges generate a QR code that the customer scans to complete payment.

```typescript
import { PicPayClient, PaymentSource, PaymentType, DocumentType } from '@bizcommerce/picpay-checkout-sdk';

const client = new PicPayClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  sandbox: true,
});

const pix = await client.pix.createCharge({
  paymentSource: PaymentSource.GATEWAY,
  merchantChargeId: 'unique-order-id',
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    documentType: DocumentType.CPF,
    documentNumber: '12345678901',
  },
  transactions: [{
    paymentType: PaymentType.PIX,
    amount: 5000,
    pix: {
      expiresIn: 3600, // Optional: expiration in seconds
    },
  }],
  notificationUrl: 'https://yoursite.com/webhooks/picpay',
});

// Display QR code to customer
const { qrCode, qrCodeBase64, expiresAt } = pix.transactions[0].pix;

// qrCode: PIX copy-paste code (text)
// qrCodeBase64: QR code image as base64-encoded PNG
// expiresAt: ISO 8601 expiration timestamp
```

## Displaying the QR Code

### In HTML
```html
<img src="${qrCodeBase64}" alt="PIX QR Code" />
<p>Or copy the code: <code>${qrCode}</code></p>
```

### In React
```tsx
<img src={pix.transactions[0].pix.qrCodeBase64} alt="PIX QR Code" />
```

## Payment Confirmation

PIX payments are confirmed via webhooks. See [Webhooks](./webhooks.md) for setup instructions.
