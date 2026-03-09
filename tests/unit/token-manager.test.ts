import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TokenManager } from '../../src/auth/token-manager.js';
import { PicPayAuthError } from '../../src/errors/picpay-error.js';
import { TOKEN_RESPONSE, TEST_CONFIG, createMockFetch } from '../mocks/fixtures.js';

const BASE_URL = 'https://checkout-api-sandbox.picpay.com';

describe('TokenManager', () => {
  let mockFetch: ReturnType<typeof createMockFetch>;

  beforeEach(() => {
    mockFetch = createMockFetch([{ status: 200, body: TOKEN_RESPONSE }]);
  });

  it('should fetch a new token on first call', async () => {
    const manager = new TokenManager({ ...TEST_CONFIG, fetch: mockFetch }, BASE_URL);
    const token = await manager.getToken();

    expect(token).toBe(TOKEN_RESPONSE.access_token);
    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_URL}/oauth2/token`,
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('should return cached token on subsequent calls', async () => {
    const manager = new TokenManager({ ...TEST_CONFIG, fetch: mockFetch }, BASE_URL);

    await manager.getToken();
    await manager.getToken();

    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it('should refresh token when expired', async () => {
    const shortLivedToken = { ...TOKEN_RESPONSE, expires_in: 0 };
    const freshToken = { ...TOKEN_RESPONSE, access_token: 'fresh-token' };
    mockFetch = createMockFetch([
      { status: 200, body: shortLivedToken },
      { status: 200, body: freshToken },
    ]);

    const manager = new TokenManager({ ...TEST_CONFIG, fetch: mockFetch }, BASE_URL);

    await manager.getToken();
    const token = await manager.getToken();

    expect(token).toBe('fresh-token');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should deduplicate concurrent refresh requests', async () => {
    const manager = new TokenManager({ ...TEST_CONFIG, fetch: mockFetch }, BASE_URL);

    const [token1, token2, token3] = await Promise.all([
      manager.getToken(),
      manager.getToken(),
      manager.getToken(),
    ]);

    expect(token1).toBe(TOKEN_RESPONSE.access_token);
    expect(token2).toBe(TOKEN_RESPONSE.access_token);
    expect(token3).toBe(TOKEN_RESPONSE.access_token);
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it('should throw PicPayAuthError on failed token request', async () => {
    mockFetch = createMockFetch([{ status: 401, body: { error: 'invalid_client' } }]);
    const manager = new TokenManager({ ...TEST_CONFIG, fetch: mockFetch }, BASE_URL);

    await expect(manager.getToken()).rejects.toThrow(PicPayAuthError);
  });

  it('should invalidate cached token', async () => {
    const manager = new TokenManager({ ...TEST_CONFIG, fetch: mockFetch }, BASE_URL);

    await manager.getToken();
    manager.invalidate();
    await manager.getToken();

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should send correct JSON body in token request', async () => {
    const manager = new TokenManager({ ...TEST_CONFIG, fetch: mockFetch }, BASE_URL);
    await manager.getToken();

    const [, options] = mockFetch.mock.calls[0]!;
    expect(options?.headers).toEqual({ 'Content-Type': 'application/json' });

    const body = JSON.parse(options?.body as string) as Record<string, string>;
    expect(body.grant_type).toBe('client_credentials');
    expect(body.client_id).toBe(TEST_CONFIG.clientId);
    expect(body.client_secret).toBe(TEST_CONFIG.clientSecret);
  });
});
