import { ZAPIError } from '../types';

/**
 * ZAPI Exception - Ana exception sınıfı
 * 
 * Bu sınıf ZAPI SDK'sında oluşan tüm hatalar için temel exception sınıfıdır.
 * HTTP status kodları ve API yanıt verilerini içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * try {
 *     await zapi.user.getProfile();
 * } catch (error) {
 *     if (error instanceof ZAPIException) {
 *         console.log('Hata:', error.message);
 *         console.log('HTTP Status:', error.httpStatusCode);
 *     }
 * }
 */
export class ZAPIException extends Error {
  public readonly responseData?: any;
  public readonly httpStatusCode: number | undefined;
  public readonly errorCode: string | number | undefined;
  public readonly errorDetails: any | undefined;
  public readonly field: string | undefined;

  constructor(
    message: string = '',
    code: string | number = 0,
    responseData?: any,
    httpStatusCode?: number,
    field?: string
  ) {
    super(message);
    this.name = 'ZAPIException';
    this.errorCode = code;
    this.responseData = responseData;
    this.httpStatusCode = httpStatusCode;
    this.field = field;
    this.errorDetails = responseData?.details || responseData?.errors;

    // Stack trace'ı koru
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ZAPIException);
    }
  }

  /**
   * Hata türünü döndürür
   */
  get errorType(): string {
    return 'ZAPIException';
  }

  /**
   * Hata mesajını detaylı olarak döndürür
   */
  get detailedMessage(): string {
    let message = this.message;

    if (this.httpStatusCode) {
      message += ` (HTTP ${this.httpStatusCode})`;
    }

    if (this.errorCode) {
      message += ` [${this.errorCode}]`;
    }

    if (this.field) {
      message += ` (Field: ${this.field})`;
    }

    return message;
  }

  /**
   * Hata bilgilerini object olarak döndürür
   */
  toObject(): ZAPIError {
    const result: ZAPIError = {
      type: this.errorType,
      message: this.message,
      code: this.errorCode || 0,
    };
    
    if (this.httpStatusCode !== undefined) result.httpStatusCode = this.httpStatusCode;
    if (this.errorDetails !== undefined) result.details = this.errorDetails;
    if (this.field !== undefined) result.field = this.field;
    if (this.stack !== undefined) result.stack = this.stack;
    
    return result;
  }

  /**
   * Hata bilgilerini JSON string olarak döndürür
   */
  toJSON(): string {
    return JSON.stringify(this.toObject(), null, 2);
  }

  /**
   * String representation
   */
  override toString(): string {
    return this.detailedMessage;
  }
}
