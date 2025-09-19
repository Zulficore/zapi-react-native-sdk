import { ZAPIException } from './ZAPIException';

/**
 * Rate Limit Exception - Rate limit hatası
 * 
 * Bu sınıf rate limiting ile ilgili hataları temsil eder.
 * 429 HTTP status kodu ile birlikte gelir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * try {
 *     await zapi.responses.create(requests);
 * } catch (error) {
 *     if (error instanceof RateLimitException) {
 *         console.log('Rate limit aşıldı:', error.message);
 *         console.log('Yeniden deneme süresi:', error.retryAfter);
 *     }
 * }
 */
export class RateLimitException extends ZAPIException {
  public readonly retryAfter: number | undefined;
  public readonly limit: number | undefined;
  public readonly remaining: number | undefined;
  public readonly resetTime: number | undefined;

  constructor(
    message: string = 'Rate limit aşıldı',
    code: string | number = 'RATE_LIMIT_ERROR',
    responseData?: any,
    httpStatusCode: number = 429,
    field?: string
  ) {
    super(message, code, responseData, httpStatusCode, field);
    this.name = 'RateLimitException';
    
    // Rate limit bilgilerini çıkar
    this.retryAfter = this.extractRetryAfter(responseData);
    this.limit = responseData?.limit;
    this.remaining = responseData?.remaining;
    this.resetTime = responseData?.resetTime;
  }

  override get errorType(): string {
    return 'RateLimitException';
  }

  /**
   * Yeniden deneme süresini çıkarır
   */
  private extractRetryAfter(responseData?: any): number | undefined {
    if (!responseData) return undefined;

    // Retry-After header'ından
    if (responseData.retryAfter) {
      return parseInt(responseData.retryAfter.toString(), 10);
    }

    // Reset time'dan hesapla
    if (responseData.resetTime) {
      const now = Date.now();
      const resetTime = responseData.resetTime * 1000; // Unix timestamp'i ms'ye çevir
      return Math.max(0, Math.ceil((resetTime - now) / 1000));
    }

    return undefined;
  }

  /**
   * Yeniden deneme için bekleme süresini milisaniye cinsinden döndürür
   */
  get retryAfterMs(): number | undefined {
    return this.retryAfter ? this.retryAfter * 1000 : undefined;
  }

  /**
   * Rate limit bilgilerini döndürür
   */
  get rateLimitInfo(): {
    limit?: number;
    remaining?: number;
    resetTime?: number;
    retryAfter?: number;
  } {
    const result: {
      limit?: number;
      remaining?: number;
      resetTime?: number;
      retryAfter?: number;
    } = {};
    
    if (this.limit !== undefined) result.limit = this.limit;
    if (this.remaining !== undefined) result.remaining = this.remaining;
    if (this.resetTime !== undefined) result.resetTime = this.resetTime;
    if (this.retryAfter !== undefined) result.retryAfter = this.retryAfter;
    
    return result;
  }

  /**
   * Rate limit'in ne zaman sıfırlanacağını döndürür
   */
  get resetDate(): Date | undefined {
    return this.resetTime ? new Date(this.resetTime * 1000) : undefined;
  }
}
