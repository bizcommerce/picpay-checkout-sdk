import { BaseResource } from './base-resource.js';
import type { WalletChargeRequest, WalletChargeResponse } from '../types/wallet.js';

export class WalletResource extends BaseResource {
  async createCharge(request: WalletChargeRequest): Promise<WalletChargeResponse> {
    return this.post<WalletChargeResponse>('/api/v1/charge/wallet', request);
  }
}
