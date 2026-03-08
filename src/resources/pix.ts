import { BaseResource } from './base-resource.js';
import type { PixChargeRequest, PixChargeResponse } from '../types/pix.js';

export class PixResource extends BaseResource {
  async createCharge(request: PixChargeRequest): Promise<PixChargeResponse> {
    return this.post<PixChargeResponse>('/api/v1/charge/pix', request);
  }
}
