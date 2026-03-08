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

export interface PixTransactionResponse {
  transactionId: string;
  paymentType: PaymentType.PIX;
  status: TransactionStatus;
  amount: number;
  pix: {
    qrCode: string;
    qrCodeBase64: string;
    expiresAt: string;
  };
}

export interface PixChargeResponse {
  chargeId: string;
  merchantChargeId: string;
  status: string;
  transactions: PixTransactionResponse[];
}
