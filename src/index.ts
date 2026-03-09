// Main client
export { PicPayClient } from './client.js';

// Webhook handler
export { WebhookHandler } from './webhooks/webhook-handler.js';

// Error classes
export {
  PicPayError,
  PicPayAuthError,
  PicPayValidationError,
} from './errors/picpay-error.js';
export type { PicPayErrorDetail } from './errors/picpay-error.js';

// Enums
export {
  PaymentSource,
  PaymentType,
  ChargeStatus,
  TransactionStatus,
  DocumentType,
  CardBrand,
} from './types/common.js';

// Config
export type { PicPayConfig, TokenResponse } from './types/config.js';

// Customer types
export { PhoneType } from './types/customer.js';
export type { Customer, Phone, Address, DeviceInformation } from './types/customer.js';

// Credit card types
export type {
  CreditCardData,
  CreditDetails,
  CreditCardTransaction,
  CreditCardAuthRequest,
  CreditTransactionResponseData,
  CreditCardTransactionResponse,
  CreditCardAuthResponse,
  CaptureRequest,
} from './types/credit-card.js';

// PIX types
export type {
  PixTransaction,
  PixChargeRequest,
  PixResponseData,
  PixTransactionResponse,
  PixChargeResponse,
} from './types/pix.js';

// Wallet types
export type {
  WalletTransaction,
  WalletChargeRequest,
  WalletResponseData,
  WalletTransactionResponse,
  WalletChargeResponse,
} from './types/wallet.js';

// Charge types
export type {
  ChargeTransactionResponse,
  ChargeResponse,
  RefundRequest,
  RefundResponse,
} from './types/charge.js';

// Webhook types
export type {
  WebhookTransaction,
  WebhookPayload,
  WebhookEvent,
} from './types/webhook.js';
