# Credit Card Payments

## Authorization

The credit card authorization creates a pre-authorized charge. The amount is reserved on the customer's card but not captured until you explicitly request it.

```typescript
import { PicPayClient, PaymentSource, PaymentType, DocumentType } from '@bizcommerce/picpay-checkout-sdk';

const client = new PicPayClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  sandbox: true,
});

const auth = await client.creditCard.authorize({
  paymentSource: PaymentSource.GATEWAY,
  merchantChargeId: 'unique-order-id',
  customer: {
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
  },
  transactions: [{
    paymentType: PaymentType.CREDIT,
    amount: 1000,
    credit: {
      installments: 3,
      card: {
        number: '4111111111111111',
        holder: 'JOHN DOE',
        expirationMonth: '12',
        expirationYear: '2030',
        cvv: '123',
      },
      softDescriptor: 'MYSTORE',
    },
  }],
  notificationUrl: 'https://yoursite.com/webhooks/picpay',
});

console.log(auth.chargeId);
console.log(auth.transactions[0].credit.authorizationCode);
```

## Capture

After authorization, capture the charge to finalize the payment.

```typescript
// Full capture
const result = await client.creditCard.capture('unique-order-id');

// Partial capture (capture less than authorized)
const partial = await client.creditCard.capture('unique-order-id', { amount: 500 });
```

## Refund

See [Charge Operations](./charge.md) for refund documentation, as refunds work across all payment types.
