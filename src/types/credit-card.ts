import type { PaymentSource, PaymentType, TransactionStatus, CardBrand } from './common.js';
import type { Customer, DeviceInformation } from './customer.js';

export interface CreditCardData {
  number: string;
  holder: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
}

export interface CreditDetails {
  installments: number;
  card: CreditCardData;
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

export interface CreditCardTransactionResponse {
  transactionId: string;
  paymentType: PaymentType.CREDIT;
  status: TransactionStatus;
  amount: number;
  credit: {
    installments: number;
    brand: CardBrand;
    lastDigits: string;
    authorizationCode?: string;
    nsu?: string;
  };
}

export interface CreditCardAuthResponse {
  chargeId: string;
  merchantChargeId: string;
  status: string;
  transactions: CreditCardTransactionResponse[];
}

export interface CaptureRequest {
  amount?: number;
}
