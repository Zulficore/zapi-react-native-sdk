import { ZAPIException } from './ZAPIException';

/**
 * Authentication Exception - Kimlik doğrulama hatası
 * 
 * Bu sınıf kimlik doğrulama ile ilgili hataları temsil eder.
 * 401 HTTP status kodu ile birlikte gelir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * try {
 *     await zapi.auth.login('invalid@email.com', 'wrongpassword');
 * } catch (error) {
 *     if (error instanceof AuthenticationException) {
 *         console.log('Kimlik doğrulama hatası:', error.message);
 *     }
 * }
 */
export class AuthenticationException extends ZAPIException {
  constructor(
    message: string = 'Kimlik doğrulama hatası',
    code: string | number = 'AUTH_ERROR',
    responseData?: any,
    httpStatusCode: number = 401,
    field?: string
  ) {
    super(message, code, responseData, httpStatusCode, field);
    this.name = 'AuthenticationException';
  }

  override get errorType(): string {
    return 'AuthenticationException';
  }
}
