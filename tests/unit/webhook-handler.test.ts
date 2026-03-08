import { describe, it, expect } from 'vitest';
import { WebhookHandler } from '../../src/webhooks/webhook-handler.js';
import { PicPayValidationError, ChargeStatus } from '../../src/index.js';
import { WEBHOOK_EVENT } from '../mocks/fixtures.js';

describe('WebhookHandler', () => {
  const handler = new WebhookHandler();

  it('should parse a valid webhook event from string', () => {
    const result = handler.parse(JSON.stringify(WEBHOOK_EVENT));

    expect(result.event).toBe('charge.paid');
    expect(result.data.chargeId).toBe('charge-uuid-001');
    expect(result.data.status).toBe(ChargeStatus.PAID);
  });

  it('should parse a valid webhook event from object', () => {
    const result = handler.parse(WEBHOOK_EVENT as unknown as Record<string, unknown>);

    expect(result.event).toBe('charge.paid');
  });

  it('should throw on invalid payload', () => {
    expect(() => handler.parse('{}')).toThrow(PicPayValidationError);
    expect(() => handler.parse('{"event": "test"}')).toThrow(PicPayValidationError);
    expect(() => handler.parse('not json')).toThrow();
  });

  it('should throw on missing required fields', () => {
    const incomplete = {
      event: 'charge.paid',
      timestamp: '2026-03-05T12:00:00Z',
      data: { chargeId: 'test' },
    };

    expect(() => handler.parse(incomplete as Record<string, unknown>)).toThrow(
      PicPayValidationError,
    );
  });

  it('should check charge status', () => {
    expect(handler.isChargeStatus(WEBHOOK_EVENT, ChargeStatus.PAID)).toBe(true);
    expect(handler.isChargeStatus(WEBHOOK_EVENT, ChargeStatus.REFUNDED)).toBe(false);
  });
});
