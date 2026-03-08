import type { TokenManager } from '../auth/token-manager.js';
import {
  PicPayError,
  PicPayAuthError,
  PicPayValidationError,
} from '../errors/picpay-error.js';
import type { PicPayErrorDetail } from '../errors/picpay-error.js';

export class BaseResource {
  constructor(
    protected readonly baseUrl: string,
    protected readonly tokenManager: TokenManager,
    protected readonly fetchFn: typeof globalThis.fetch,
    protected readonly timeout: number,
  ) {}

  protected async request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    const token = await this.tokenManager.getToken();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await this.fetchFn(`${this.baseUrl}${path}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      if (!response.ok) {
        await this.handleError(response);
      }

      return (await response.json()) as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  protected async get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  protected async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  private async handleError(response: Response): Promise<never> {
    let errorBody: { message?: string; errors?: PicPayErrorDetail[] } = {};

    try {
      errorBody = (await response.json()) as typeof errorBody;
    } catch {
      // Response may not be JSON
    }

    const message = errorBody.message ?? `Request failed with status ${response.status}`;
    const details = errorBody.errors ?? [];
    const requestId = response.headers.get('x-request-id') ?? undefined;

    if (response.status === 401) {
      this.tokenManager.invalidate();
      throw new PicPayAuthError(message, requestId);
    }

    if (response.status === 400) {
      throw new PicPayValidationError(message, details, requestId);
    }

    throw new PicPayError(message, response.status, details, requestId);
  }
}
