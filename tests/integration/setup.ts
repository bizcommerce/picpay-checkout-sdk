import { PicPayClient } from '../../src/index.js';
import { createIntegrationMockFetch } from '../mocks/fixtures.js';

const hasCredentials = Boolean(
  process.env['PICPAY_CLIENT_ID'] && process.env['PICPAY_CLIENT_SECRET'],
);

export const isMocked = !hasCredentials;

export function getIntegrationClient(): PicPayClient {
  if (hasCredentials) {
    return new PicPayClient({
      clientId: process.env['PICPAY_CLIENT_ID']!,
      clientSecret: process.env['PICPAY_CLIENT_SECRET']!,
      sandbox: true,
    });
  }

  return new PicPayClient({
    clientId: 'mock-client-id',
    clientSecret: 'mock-client-secret',
    sandbox: true,
    fetch: createIntegrationMockFetch(),
  });
}
