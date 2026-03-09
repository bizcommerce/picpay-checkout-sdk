import type { PaymentSource, PaymentType, TransactionStatus } from './common.js';
import type { Customer, DeviceInformation } from './customer.js';

export interface WalletTransaction {
  paymentType: PaymentType.WALLET;
  amount: number;
}

export interface WalletChargeRequest {
  paymentSource: PaymentSource;
  merchantChargeId: string;
  customer: Customer;
  device?: DeviceInformation;
  transactions: WalletTransaction[];
  notificationUrl?: string;
}

export interface WalletResponseData {
  qrCode: string;
  qrCodeBase64: string;
  expiresAt: string;
}

export interface WalletTransactionResponse {
  paymentType: PaymentType.WALLET;
  amount: number;
  originalAmount: number;
  refundedAmount: number;
  transactionStatus: TransactionStatus;
  createdAt: string;
  updatedAt: string;
  transactionId: string;
  softDescriptor: string | null;
  errorMessage: string | null;
  mac: string | null;
  credit: null;
  wallet: WalletResponseData;
  pix: null;
}

export interface WalletChargeResponse {
  merchantChargeId: string;
  id: string;
  chargeStatus: string;
  amount: number;
  originalAmount: number;
  refundedAmount: number;
  transactions: WalletTransactionResponse[];
}
