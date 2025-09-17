import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';

/**
 * System - Sistem yönetimi endpoint'leri
 * 
 * Bu sınıf temel sistem yönetimi işlemleri için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class System extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Sistemi yeniden başlatır
   */
  async restart(): Promise<ApiResponse> {
    return this.getHttpClient().post('/system/restart');
  }

  /**
   * Sistem durumunu getirir
   */
  async getStatus(): Promise<ApiResponse> {
    return this.getHttpClient().get('/system/status');
  }

  /**
   * Bellek kullanımını getirir
   */
  async getMemory(): Promise<ApiResponse> {
    return this.getHttpClient().get('/system/memory');
  }
}
