export interface PicPayConfig {
  clientId: string;
  clientSecret: string;
  sandbox?: boolean;
  timeout?: number;
  fetch?: typeof globalThis.fetch;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
