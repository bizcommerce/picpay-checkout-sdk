import type { PaymentType, TransactionStatus } from './common.js';

export interface ChargeTransactionResponse {
  paymentType: PaymentType;
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
  credit: unknown;
  wallet: unknown;
  pix: unknown;
}

export interface ChargeResponse {
  merchantChargeId: string;
  id: string;
  chargeStatus: string;
  amount: number;
  originalAmount: number;
  refundedAmount: number;
  transactions: ChargeTransactionResponse[];
}

export interface RefundRequest {
  amount?: number;
}

export interface RefundResponse {
  merchantChargeId: string;
  id: string;
  chargeStatus: string;
  amount: number;
  originalAmount: number;
  refundedAmount: number;
  transactions: ChargeTransactionResponse[];
}
