import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, ListOptions, PaginatedResponse, ValidationException } from '../types';

/**
 * Logs - Log yönetimi endpoint'leri
 * 
 * Bu sınıf sistem loglarını listeleme, görüntüleme ve yönetme işlemleri için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class Logs extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Logları listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/logs', options);
  }

  /**
   * Log detaylarını getirir
   */
  async get(logId: string): Promise<ApiResponse> {
    if (!logId || logId.trim() === '') {
      throw new ValidationException('Log ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/logs/${logId}`);
  }


  /**
   * Log temizleme işlemi yapar
   */
  async cleanup(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().delete('/logs/cleanup', options);
  }

  /**
   * Tüm logları temizler
   */
  async clear(): Promise<ApiResponse> {
    return this.getHttpClient().delete('/logs/clear');
  }

  /**
   * Log istatistiklerini getirir
   */
  async getStats(): Promise<ApiResponse> {
    return this.getHttpClient().get('/logs/stats');
  }
}
