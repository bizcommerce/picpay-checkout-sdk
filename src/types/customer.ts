import type { DocumentType } from './common.js';

export enum PhoneType {
  MOBILE = 'MOBILE',
  LANDLINE = 'LANDLINE',
}

export interface Phone {
  countryCode: string;
  areaCode: string;
  number: string;
  type: PhoneType;
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
  document: string;
  phone?: Phone;
  address?: Address;
}

export interface DeviceInformation {
  ip?: string;
  sessionId?: string;
}
