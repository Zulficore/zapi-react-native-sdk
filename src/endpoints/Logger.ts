import { BaseEndpoint } from './BaseEndpoint';
import { ApiResponse } from '../types/ApiResponse';
import { ValidationException } from '../exceptions/ValidationException';

/**
 * Logger Endpoint
 * 
 * Bu sınıf logger işlemlerini yönetir.
 */
export class Logger extends BaseEndpoint {
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
