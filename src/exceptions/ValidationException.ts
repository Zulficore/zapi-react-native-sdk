import { ZAPIException } from './ZAPIException';

/**
 * Validation Exception - Doğrulama hatası
 * 
 * Bu sınıf veri doğrulama ile ilgili hataları temsil eder.
 * 400 HTTP status kodu ile birlikte gelir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * try {
 *     await zapi.auth.register({ email: 'invalid-email' });
 * } catch (error) {
 *     if (error instanceof ValidationException) {
 *         console.log('Doğrulama hatası:', error.message);
 *         console.log('Hatalı alanlar:', error.invalidFields);
 *     }
 * }
 */
export class ValidationException extends ZAPIException {
  public readonly invalidFields: string[];

  constructor(
    message: string = 'Doğrulama hatası',
    code: string | number = 'VALIDATION_ERROR',
    responseData?: any,
    httpStatusCode: number = 400,
    field?: string
  ) {
    super(message, code, responseData, httpStatusCode, field);
    this.name = 'ValidationException';
    
    // Hatalı alanları çıkar
    this.invalidFields = this.extractInvalidFields(responseData);
  }

  get errorType(): string {
    return 'ValidationException';
  }

  /**
   * Hatalı alanları çıkarır
   */
  private extractInvalidFields(responseData?: any): string[] {
    if (!responseData) return [];

    const fields: string[] = [];

    // responseData.errors'dan alanları çıkar
    if (responseData.errors && typeof responseData.errors === 'object') {
      fields.push(...Object.keys(responseData.errors));
    }

    // responseData.details'dan alanları çıkar
    if (responseData.details && Array.isArray(responseData.details)) {
      responseData.details.forEach((detail: any) => {
        if (detail.field && !fields.includes(detail.field)) {
          fields.push(detail.field);
        }
      });
    }

    return fields;
  }

  /**
   * Belirli bir alan için hata mesajını döndürür
   */
  getFieldError(fieldName: string): string | null {
    if (!this.responseData?.errors?.[fieldName]) return null;
    
    const fieldError = this.responseData.errors[fieldName];
    return Array.isArray(fieldError) ? fieldError[0] : fieldError;
  }

  /**
   * Tüm alan hatalarını döndürür
   */
  getFieldErrors(): Record<string, string[]> {
    if (!this.responseData?.errors) return {};

    const fieldErrors: Record<string, string[]> = {};
    
    Object.keys(this.responseData.errors).forEach(field => {
      const error = this.responseData.errors[field];
      fieldErrors[field] = Array.isArray(error) ? error : [error];
    });

    return fieldErrors;
  }
}
