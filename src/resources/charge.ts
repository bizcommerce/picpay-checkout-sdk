import { BaseResource } from './base-resource.js';
import type { ChargeResponse, RefundRequest, RefundResponse } from '../types/charge.js';

export class ChargeResource extends BaseResource {
  async find(merchantChargeId: string): Promise<ChargeResponse> {
    return this.get<ChargeResponse>(
      `/api/v1/charge/${encodeURIComponent(merchantChargeId)}`,
    );
  }

  async refund(
    merchantChargeId: string,
    request?: RefundRequest,
  ): Promise<RefundResponse> {
    return this.post<RefundResponse>(
      `/api/v1/charge/${encodeURIComponent(merchantChargeId)}/refund`,
      request,
    );
  }
}
