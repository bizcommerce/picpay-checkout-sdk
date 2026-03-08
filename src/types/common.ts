export enum PaymentSource {
  GATEWAY = 'GATEWAY',
}

export enum PaymentType {
  CREDIT = 'CREDIT',
  PIX = 'PIX',
  WALLET = 'WALLET',
}

export enum ChargeStatus {
  CREATED = 'CREATED',
  AUTHORIZED = 'AUTHORIZED',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export enum TransactionStatus {
  CREATED = 'CREATED',
  AUTHORIZED = 'AUTHORIZED',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  CANCELLED = 'CANCELLED',
  DENIED = 'DENIED',
  EXPIRED = 'EXPIRED',
}

export enum DocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export enum CardBrand {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  ELO = 'ELO',
  AMEX = 'AMEX',
  HIPERCARD = 'HIPERCARD',
}
