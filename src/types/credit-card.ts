import type { PaymentSource, PaymentType, TransactionStatus, CardBrand } from './common.js';
import type { Customer, DeviceInformation } from './customer.js';

export interface CreditCardData {
  cardNumber: string;
  cardholderName: string;
  cardholderDocument: string;
  expirationMonth: number;
  expirationYear: number;
  cvv: string;
}

export interface CreditDetails extends CreditCardData {
  installments: number;
  softDescriptor?: string;
  capture?: boolean;
}

export interface CreditCardTransaction {
  paymentType: PaymentType.CREDIT;
  amount: number;
  credit: CreditDetails;
}

export interface CreditCardAuthRequest {
  paymentSource: PaymentSource;
  merchantChargeId: string;
  customer: Customer;
  device?: DeviceInformation;
  transactions: CreditCardTransaction[];
  notificationUrl?: string;
}

export interface CreditTransactionResponseData {
  nsu: string | null;
  cardNumber: string | null;
  authorizationCode: string | null;
  authorizationResponseCode: string | null;
  reasonCode: string | null;
  reasonMessage: string | null;
  brand: CardBrand;
  cardholderName: string | null;
  cardholderDocument: string | null;
  expirationMonth: number | null;
  expirationYear: number | null;
  installmentNumber: number;
  issuerTransactionId: string | null;
  installmentType: string;
}

export interface CreditCardTransactionResponse {
  paymentType: PaymentType.CREDIT;
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
  credit: CreditTransactionResponseData;
  wallet: null;
  pix: null;
}

export interface CreditCardAuthResponse {
  merchantChargeId: string;
  id: string;
  chargeStatus: string;
  amount: number;
  originalAmount: number;
  refundedAmount: number;
  transactions: CreditCardTransactionResponse[];
}

export interface CaptureRequest {
  amount?: number;
}
