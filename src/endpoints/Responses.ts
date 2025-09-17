import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import {
  AIResponseRequest,
  AIResponse,
  ApiResponse,
  ListOptions,
  SearchOptions,
  PaginatedResponse,
} from '../types';

/**
 * Responses - AI yanıtları endpoint'leri
 * 
 * Bu sınıf AI yanıtları oluşturma, listeleme, detay görüntüleme,
 * silme ve export işlemleri için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const responses = zapi.responses;
 * const response = await responses.create({
 *   model: 'gpt-3.5-turbo',
 *   messages: [{ role: 'user', content: 'Merhaba' }]
 * });
 */
export class Responses extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * AI yanıtı oluşturur
   */
  async create(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/responses', data);
  }

  /**
   * AI yanıtlarını listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/responses', options);
  }

  /**
   * AI yanıt detaylarını getirir
   */
  async get(responseId: string): Promise<ApiResponse> {
    if (!responseId || responseId.trim() === '') {
      throw new Error('Yanıt ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/responses/${responseId}`);
  }

  /**
   * AI yanıtını günceller
   */

  /**
   * AI yanıtını siler
   */
  async delete(responseId: string): Promise<ApiResponse> {
    if (!responseId || responseId.trim() === '') {
      throw new Error('Yanıt ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/responses/${responseId}`);
  }

  /**
   * AI yanıtını export eder
   */

  /**
   * AI yanıt istatistiklerini getirir
   */
  async getStats(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/responses/stats', options);
  }

  /**
   * AI yanıt arama yapar
   */
  async search(options: any): Promise<ApiResponse> {
    if (!options.query || options.query.trim() === '') {
      throw new Error('Arama sorgusu boş olamaz');
    }

    return this.getHttpClient().get('/responses/search', options);
  }

  /**
   * AI yanıt kategorilerini listeler
   */

  /**
   * AI yanıtını favorilere ekler/çıkarır
   */

  /**
   * AI yanıtını paylaşır
   */
}
