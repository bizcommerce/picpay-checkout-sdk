import type { DocumentType } from './common.js';

export interface Phone {
  country: string;
  area: string;
  number: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Customer {
  name: string;
  email: string;
  documentType: DocumentType;
  documentNumber: string;
  phone?: Phone;
  address?: Address;
}

export interface DeviceInformation {
  ip?: string;
  sessionId?: string;
}
