import type { ChargeStatus, TransactionStatus, PaymentType } from './common.js';

export interface ChargeTransactionResponse {
  transactionId: string;
  paymentType: PaymentType;
  status: TransactionStatus;
  amount: number;
  [key: string]: unknown;
}

export interface ChargeResponse {
  chargeId: string;
  merchantChargeId: string;
  status: ChargeStatus;
  transactions: ChargeTransactionResponse[];
}

export interface RefundRequest {
  amount?: number;
}

export interface RefundResponse {
  chargeId: string;
  merchantChargeId: string;
  status: ChargeStatus;
  transactions: ChargeTransactionResponse[];
}
