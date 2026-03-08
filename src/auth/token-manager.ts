import type { PicPayConfig, TokenResponse } from '../types/config.js';
import { PicPayAuthError } from '../errors/picpay-error.js';

const TOKEN_EXPIRY_BUFFER_MS = 30_000;

export class TokenManager {
  private accessToken: string | null = null;
  private expiresAt = 0;
  private refreshPromise: Promise<string> | null = null;

  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly tokenUrl: string;
  private readonly fetchFn: typeof globalThis.fetch;

  constructor(config: PicPayConfig, baseUrl: string) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.tokenUrl = `${baseUrl}/oauth2/token`;
    this.fetchFn = config.fetch ?? globalThis.fetch;
  }

  async getToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.expiresAt) {
      return this.accessToken;
    }
    return this.refresh();
  }

  private async refresh(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.fetchToken();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async fetchToken(): Promise<string> {
    const response = await this.fetchFn(this.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }).toString(),
    });

    if (!response.ok) {
      throw new PicPayAuthError(
        `Token request failed with status ${response.status}`,
      );
    }

    const data = (await response.json()) as TokenResponse;
    this.accessToken = data.access_token;
    this.expiresAt = Date.now() + data.expires_in * 1000 - TOKEN_EXPIRY_BUFFER_MS;

    return this.accessToken;
  }

  invalidate(): void {
    this.accessToken = null;
    this.expiresAt = 0;
  }
}
