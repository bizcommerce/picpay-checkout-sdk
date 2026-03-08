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

export interface WalletTransactionResponse {
  transactionId: string;
  paymentType: PaymentType.WALLET;
  status: TransactionStatus;
  amount: number;
  wallet: {
    qrCode: string;
    qrCodeBase64: string;
    deepLink?: string;
    expiresAt: string;
  };
}

export interface WalletChargeResponse {
  chargeId: string;
  merchantChargeId: string;
  status: string;
  transactions: WalletTransactionResponse[];
}
