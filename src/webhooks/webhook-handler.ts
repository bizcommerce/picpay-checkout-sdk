import type { WebhookEvent } from '../types/webhook.js';
import { PicPayValidationError } from '../errors/picpay-error.js';
import type { ChargeStatus } from '../types/common.js';

export class WebhookHandler {
  parse(rawBody: string | Record<string, unknown>): WebhookEvent {
    const data = typeof rawBody === 'string'
      ? (JSON.parse(rawBody) as unknown)
      : rawBody;

    if (!isWebhookEvent(data)) {
      throw new PicPayValidationError('Invalid webhook payload', [
        { message: 'Payload does not match expected webhook event structure' },
      ]);
    }

    return data;
  }

  isChargeStatus(event: WebhookEvent, status: ChargeStatus): boolean {
    return event.data.status === status;
  }
}

function isWebhookEvent(data: unknown): data is WebhookEvent {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj['event'] === 'string' &&
    typeof obj['timestamp'] === 'string' &&
    typeof obj['data'] === 'object' &&
    obj['data'] !== null &&
    isWebhookPayload(obj['data'] as Record<string, unknown>)
  );
}

function isWebhookPayload(data: Record<string, unknown>): boolean {
  return (
    typeof data['chargeId'] === 'string' &&
    typeof data['merchantChargeId'] === 'string' &&
    typeof data['status'] === 'string' &&
    Array.isArray(data['transactions'])
  );
}
