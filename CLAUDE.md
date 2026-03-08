# @bizcommerce/picpay-checkout-sdk

## Project Overview
TypeScript SDK for PicPay Checkout API (Transparent Checkout). Zero runtime dependencies, uses native `fetch`.

## Commands
- `npm run build` - Build with tsup (ESM + CJS + dts)
- `npm test` - Run unit tests (vitest)
- `npm run test:watch` - Watch mode
- `npm run test:integration` - Integration tests (requires PICPAY_CLIENT_ID + PICPAY_CLIENT_SECRET)
- `npm run typecheck` - TypeScript type checking

## Architecture
- **Facade pattern**: `PicPayClient` composes resource classes (CreditCard, Pix, Wallet, Charge)
- **BaseResource**: Shared HTTP helpers with auth header injection and error handling
- **TokenManager**: OAuth2 client_credentials with auto-refresh and concurrent request deduplication
- **No external HTTP deps**: Uses native `fetch` (Node 18+), accepts custom fetch via config

## Conventions
- Amounts are in **cents** (integer)
- All API paths use `encodeURIComponent` for dynamic segments
- Types are organized by payment method in `src/types/`
- Tests mock `fetch` via `createMockFetch` helper in `tests/mocks/fixtures.ts`

## PicPay API
- Production: `https://checkout-api.picpay.com`
- Sandbox: `https://checkout-api-sandbox.picpay.com`
- Tokens expire every 5 minutes (300s)
