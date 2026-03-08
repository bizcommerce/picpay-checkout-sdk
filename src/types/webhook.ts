import type { ChargeStatus, TransactionStatus, PaymentType } from './common.js';

export interface WebhookTransaction {
  transactionId: string;
  paymentType: PaymentType;
  status: TransactionStatus;
  amount: number;
}

export interface WebhookPayload {
  chargeId: string;
  merchantChargeId: string;
  status: ChargeStatus;
  transactions: WebhookTransaction[];
}

export interface WebhookEvent {
  event: string;
  timestamp: string;
  data: WebhookPayload;
}
