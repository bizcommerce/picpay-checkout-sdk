export interface PicPayErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

export class PicPayError extends Error {
  public readonly statusCode: number;
  public readonly details: PicPayErrorDetail[];
  public readonly requestId?: string;

  constructor(
    message: string,
    statusCode: number,
    details: PicPayErrorDetail[] = [],
    requestId?: string,
  ) {
    super(message);
    this.name = 'PicPayError';
    this.statusCode = statusCode;
    this.details = details;
    this.requestId = requestId;
  }
}

export class PicPayAuthError extends PicPayError {
  constructor(message = 'Authentication failed', requestId?: string) {
    super(message, 401, [], requestId);
    this.name = 'PicPayAuthError';
  }
}

export class PicPayValidationError extends PicPayError {
  constructor(
    message: string,
    details: PicPayErrorDetail[] = [],
    requestId?: string,
  ) {
    super(message, 400, details, requestId);
    this.name = 'PicPayValidationError';
  }
}
