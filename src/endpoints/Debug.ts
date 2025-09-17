import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';

/**
 * Debug - Debug endpoint'leri
 * 
 * Bu sınıf geliştirme ortamı için debug bilgilerini getirmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const debug = zapi.debug;
 * const models = await debug.getModels();
 * const providerManager = await debug.getProviderManager();
 */
export class Debug extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * AI modellerini getirir
   */
  async getModels(): Promise<ApiResponse> {
    return this.getHttpClient().get('/debug/models');
  }

  /**
   * Provider manager bilgilerini getirir
   */
}
