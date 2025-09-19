import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';
import { ValidationException } from '../exceptions';

/**
 * Webhook - Webhook yönetimi endpoint'leri
 * 
 * Bu sınıf webhook'ları yönetmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class Webhook extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Webhook'ları listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/webhooks', options);
  }

  /**
   * Yeni webhook oluşturur
   */
  async create(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/webhooks', data);
  }

  /**
   * Webhook detaylarını getirir
   */

  /**
   * Webhook bilgilerini günceller
   */

  /**
   * Webhook'u siler
   */
  async delete(webhookId: string): Promise<ApiResponse> {
    if (!webhookId || webhookId.trim() === '') {
      throw new ValidationException('Webhook ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/webhooks/${webhookId}`);
  }

  /**
   * Webhook'u test eder
   */
  async test(webhookId: string): Promise<ApiResponse> {
    if (!webhookId || webhookId.trim() === '') {
      throw new ValidationException('Webhook ID\'si boş olamaz');
    }

    return this.getHttpClient().post(`/webhooks/${webhookId}/test`);
  }

}
