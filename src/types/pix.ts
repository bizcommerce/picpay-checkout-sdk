import type { PaymentSource, PaymentType, TransactionStatus } from './common.js';
import type { Customer, DeviceInformation } from './customer.js';

export interface PixTransaction {
  paymentType: PaymentType.PIX;
  amount: number;
  pix?: {
    expiresIn?: number;
  };
}

export interface PixChargeRequest {
  paymentSource: PaymentSource;
  merchantChargeId: string;
  customer: Customer;
  device?: DeviceInformation;
  transactions: PixTransaction[];
  notificationUrl?: string;
}

export interface PixResponseData {
  qrCode: string;
  qrCodeBase64: string;
  endToEndId: string | null;
}

export interface PixTransactionResponse {
  paymentType: PaymentType.PIX;
  amount: number;
  originalAmount: number;
  refundedAmount: number;
  transactionStatus: TransactionStatus;
  createdAt: string;
  updatedAt: string;
  transactionId: string;
  errorMessage: string | null;
  credit: null;
  pix: PixResponseData;
}

export interface PixChargeResponse {
  merchantChargeId: string;
  id: string;
  chargeStatus: string;
  amount: number;
  originalAmount: number;
  refundedAmount: number;
  transactions: PixTransactionResponse[];
}
