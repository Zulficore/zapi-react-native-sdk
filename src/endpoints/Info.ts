import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';

/**
 * Info - Sistem bilgi endpoint'leri
 * 
 * Bu sınıf sistem sağlık durumu, metrikler ve AI model bilgilerini getirmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const info = zapi.info;
 * const health = await info.getHealth();
 * const metrics = await info.getMetrics();
 */
export class Info extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Sistem sağlık durumunu getirir
   */
  async getHealth(): Promise<ApiResponse> {
    return this.getHttpClient().get('/info/health');
  }

  /**
   * Sistem metriklerini getirir
   */
  async getMetrics(): Promise<ApiResponse> {
    return this.getHttpClient().get('/info/metrics');
  }

  /**
   * Sistem durumunu getirir
   */
  async getStatus(): Promise<ApiResponse> {
    return this.getHttpClient().get('/info/status');
  }

  /**
   * AI modelleri ve sağlayıcılarını listeler
   */
  async getAIModels(): Promise<ApiResponse> {
    return this.getHttpClient().get('/info/aimodels');
  }
}
