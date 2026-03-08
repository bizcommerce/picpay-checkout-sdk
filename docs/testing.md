# Testing

## Unit Tests

Run unit tests (uses mocked fetch):

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## Integration Tests

Integration tests run against PicPay's sandbox environment and require credentials:

```bash
PICPAY_CLIENT_ID=your-sandbox-client-id \
PICPAY_CLIENT_SECRET=your-sandbox-client-secret \
npm run test:integration
```

## Test Card Numbers

| Card Number | Brand | Behavior |
|-------------|-------|----------|
| `4111111111111111` | Visa | Approved |
| `5500000000000004` | Mastercard | Approved |

## Type Checking

```bash
npm run typecheck
```

## Build

```bash
npm run build
```

Produces `dist/` with ESM (`.mjs`), CJS (`.js`), and TypeScript declarations (`.d.ts`).
