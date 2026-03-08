# Webhooks

## Setup

When creating a charge, pass a `notificationUrl` to receive webhook events:

```typescript
const charge = await client.pix.createCharge({
  // ...
  notificationUrl: 'https://yoursite.com/webhooks/picpay',
});
```

## Handling Webhooks

```typescript
import { WebhookHandler, ChargeStatus } from '@bizcommerce/picpay-checkout-sdk';

const handler = new WebhookHandler();

// Express.js example
app.post('/webhooks/picpay', (req, res) => {
  try {
    const event = handler.parse(req.body);

    console.log('Event:', event.event);
    console.log('Charge ID:', event.data.chargeId);
    console.log('Status:', event.data.status);

    if (handler.isChargeStatus(event, ChargeStatus.PAID)) {
      // Payment confirmed - fulfill the order
    } else if (handler.isChargeStatus(event, ChargeStatus.CANCELLED)) {
      // Payment cancelled
    } else if (handler.isChargeStatus(event, ChargeStatus.REFUNDED)) {
      // Payment refunded
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Invalid webhook payload:', error);
    res.status(400).send('Invalid payload');
  }
});
```

## Webhook Event Structure

```json
{
  "event": "charge.paid",
  "timestamp": "2026-03-05T12:00:00Z",
  "data": {
    "chargeId": "uuid",
    "merchantChargeId": "your-order-id",
    "status": "PAID",
    "transactions": [
      {
        "transactionId": "uuid",
        "paymentType": "PIX",
        "status": "PAID",
        "amount": 5000
      }
    ]
  }
}
```

## Charge Statuses

| Status | Description |
|--------|-------------|
| `CREATED` | Charge created, awaiting payment |
| `AUTHORIZED` | Credit card pre-authorized |
| `PAID` | Payment confirmed |
| `REFUNDED` | Fully refunded |
| `PARTIALLY_REFUNDED` | Partially refunded |
| `CANCELLED` | Charge cancelled |
| `EXPIRED` | Charge expired |
