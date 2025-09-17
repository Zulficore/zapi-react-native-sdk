import { ZAPI } from '../ZAPI';

/**
 * Base Endpoint - Tüm endpoint sınıfları için temel sınıf
 * 
 * Bu sınıf tüm endpoint sınıflarının ortak işlevselliğini sağlar.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export abstract class BaseEndpoint {
  protected zapi: ZAPI;

  constructor(zapi: ZAPI) {
    this.zapi = zapi;
  }

  /**
   * HTTP client'ı döndürür
   */
  protected getHttpClient() {
    return this.zapi.getHttpClient();
  }
}
