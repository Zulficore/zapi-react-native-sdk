import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, SystemConfig } from '../types';

/**
 * Config - Konfigürasyon endpoint'leri
 * 
 * Bu sınıf frontend konfigürasyon bilgilerini getirmek için
 * endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const config = zapi.config;
 * const settings = await config.get();
 * console.log('WebSocket URL:', settings.wsUrl);
 */
export class Config extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Frontend konfigürasyon bilgilerini getirir
   */
  async get(): Promise<ApiResponse> {
    return this.getHttpClient().get('/config');
  }
}
