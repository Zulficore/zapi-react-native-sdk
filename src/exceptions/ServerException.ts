import { ZAPIException } from './ZAPIException';

/**
 * Server Exception - Sunucu hatası
 * 
 * Bu sınıf sunucu tarafındaki hataları temsil eder.
 * 5xx HTTP status kodları ile birlikte gelir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * try {
 *     await zapi.responses.create(data);
 * } catch (error) {
 *     if (error instanceof ServerException) {
 *         console.log('Sunucu hatası:', error.message);
 *         console.log('Hata kodu:', error.errorCode);
 *     }
 * }
 */
export class ServerException extends ZAPIException {
  public readonly serverError: string | undefined;
  public readonly requestId: string | undefined;
  public readonly timestamp: string | undefined;

  constructor(
    message: string = 'Sunucu hatası',
    code: string | number = 'SERVER_ERROR',
    responseData?: any,
    httpStatusCode?: number,
    field?: string
  ) {
    // HTTP status kodunu 500 olarak ayarla eğer belirtilmemişse
    const statusCode = httpStatusCode || 500;
    
    super(message, code, responseData, statusCode, field);
    this.name = 'ServerException';
    
    // Sunucu hata bilgilerini çıkar
    this.serverError = responseData?.serverError || responseData?.error;
    this.requestId = responseData?.requestId;
    this.timestamp = responseData?.timestamp;
  }

  override get errorType(): string {
    return 'ServerException';
  }

  /**
   * HTTP status kodunun 5xx aralığında olup olmadığını kontrol eder
   */
  get isServerError(): boolean {
    return this.httpStatusCode !== undefined && this.httpStatusCode >= 500 && this.httpStatusCode < 600;
  }

  /**
   * Hatanın geçici olup olmadığını kontrol eder
   */
  get isTemporary(): boolean {
    if (!this.httpStatusCode) return false;
    
    // 502, 503, 504 geçici hatalar olarak kabul edilir
    return [502, 503, 504].includes(this.httpStatusCode);
  }

  /**
   * Sunucu hata bilgilerini döndürür
   */
  get serverInfo(): {
    serverError?: string;
    requestId?: string;
    timestamp?: string;
    isTemporary: boolean;
  } {
    const result: {
      serverError?: string;
      requestId?: string;
      timestamp?: string;
      isTemporary: boolean;
    } = {
      isTemporary: this.isTemporary,
    };
    
    if (this.serverError !== undefined) result.serverError = this.serverError;
    if (this.requestId !== undefined) result.requestId = this.requestId;
    if (this.timestamp !== undefined) result.timestamp = this.timestamp;
    
    return result;
  }

  /**
   * Hatanın yeniden denenebilir olup olmadığını döndürür
   */
  get isRetryable(): boolean {
    return this.isTemporary || this.httpStatusCode === 500;
  }
}
