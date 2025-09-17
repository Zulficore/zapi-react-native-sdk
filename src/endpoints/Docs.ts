import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, ValidationException } from '../types';

/**
 * Docs - Dokümantasyon endpoint'leri
 * 
 * Bu sınıf markdown dokümantasyon dosyalarını listeler ve içeriklerini getirir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const docs = zapi.docs;
 * const docsList = await docs.list();
 * const docContent = await docs.get('README.md');
 */
export class Docs extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Dokümantasyon dosyalarını listeler
   */
  async list(): Promise<ApiResponse> {
    return this.getHttpClient().get('/docs');
  }

  /**
   * Belirli bir dokümantasyon dosyasının içeriğini getirir
   */
  async get(filename: string): Promise<ApiResponse> {
    if (!filename || filename.trim() === '') {
      throw new ValidationException('Dosya adı boş olamaz');
    }

    return this.getHttpClient().get(`/api/docs/${filename}`);
  }
}
