import type { PicPayConfig } from './types/config.js';
import { TokenManager } from './auth/token-manager.js';
import { CreditCardResource } from './resources/credit-card.js';
import { PixResource } from './resources/pix.js';
import { WalletResource } from './resources/wallet.js';
import { ChargeResource } from './resources/charge.js';

const PRODUCTION_URL = 'https://checkout-api.picpay.com';
const SANDBOX_URL = 'https://checkout-api-sandbox.picpay.com';
const DEFAULT_TIMEOUT = 30_000;

export class PicPayClient {
  public readonly creditCard: CreditCardResource;
  public readonly pix: PixResource;
  public readonly wallet: WalletResource;
  public readonly charge: ChargeResource;

  constructor(config: PicPayConfig) {
    const baseUrl = config.sandbox ? SANDBOX_URL : PRODUCTION_URL;
    const timeout = config.timeout ?? DEFAULT_TIMEOUT;
    const fetchFn = config.fetch ?? globalThis.fetch;
    const tokenManager = new TokenManager(config, baseUrl);

    this.creditCard = new CreditCardResource(baseUrl, tokenManager, fetchFn, timeout);
    this.pix = new PixResource(baseUrl, tokenManager, fetchFn, timeout);
    this.wallet = new WalletResource(baseUrl, tokenManager, fetchFn, timeout);
    this.charge = new ChargeResource(baseUrl, tokenManager, fetchFn, timeout);
  }
}
