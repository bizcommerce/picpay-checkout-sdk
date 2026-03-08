import { BaseResource } from './base-resource.js';
import type {
  CreditCardAuthRequest,
  CreditCardAuthResponse,
  CaptureRequest,
} from '../types/credit-card.js';
import type { ChargeResponse } from '../types/charge.js';

export class CreditCardResource extends BaseResource {
  async authorize(request: CreditCardAuthRequest): Promise<CreditCardAuthResponse> {
    return this.post<CreditCardAuthResponse>(
      '/api/v1/charge/authorization',
      request,
    );
  }

  async capture(
    merchantChargeId: string,
    request?: CaptureRequest,
  ): Promise<ChargeResponse> {
    return this.post<ChargeResponse>(
      `/api/v1/charge/${encodeURIComponent(merchantChargeId)}/capture`,
      request,
    );
  }
}
