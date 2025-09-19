import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';

/**
 * Logger Endpoint
 * 
 * Bu sınıf logger işlemlerini yönetir.
 */
export class Logger extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }
  /**
   * Logger bilgilerini getirir
   * 
   * Bu metod logger bilgilerini getirir.
   * 
   * @returns Promise<ApiResponse> Logger bilgileri
   * @throws ValidationException Geçersiz parametre
   * @throws ZAPIException Sunucu hatası
   * 
   * @example
   * const logger = await zapi.logger.get();
   * console.log('Logger durumu:', logger.data.status);
   */
  async get(): Promise<ApiResponse> {
    return this.getHttpClient().get('/logger');
  }

  /**
   * Logger istatistiklerini getirir
   * 
   * Bu metod logger istatistiklerini getirir.
   * 
   * @returns Promise<ApiResponse> Logger istatistikleri
   * @throws ValidationException Geçersiz parametre
   * @throws ZAPIException Sunucu hatası
   * 
   * @example
   * const stats = await zapi.logger.getStats();
   * console.log('Toplam log:', stats.data.totalLogs);
   */
  async getStats(): Promise<ApiResponse> {
    return this.getHttpClient().get('/logger/stats');
  }
}
