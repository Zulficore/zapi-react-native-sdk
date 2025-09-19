import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';

/**
 * Subscription - Abonelik yönetimi endpoint'leri
 * 
 * Bu sınıf kullanıcı aboneliklerini yönetmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class Subscription extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Abonelik oluşturur
   */
  async create(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/subscription', data);
  }

  /**
   * Aboneliği iptal eder
   */
  async cancel(reason: string = ''): Promise<ApiResponse> {
    return this.getHttpClient().post('/subscription/cancel', { reason });
  }

  /**
   * Aboneliği yeniler
   */
  async renew(data: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().post('/subscription/renew', data);
  }

  /**
   * Abonelik analitiğini getirir
   */
  async getAnalytics(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/subscription/analytics', options);
  }

  /**
   * Abonelik detaylarını getirir
   */
  async getDetails(): Promise<ApiResponse> {
    return this.getHttpClient().get('/subscription/details');
  }

  /**
   * Upgrade kontrolü yapar
   */
  async checkUpgrade(): Promise<ApiResponse> {
    return this.getHttpClient().get('/subscription/upgrade-check');
  }
}
