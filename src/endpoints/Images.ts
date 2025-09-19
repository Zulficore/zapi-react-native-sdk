import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';
import { ValidationException } from '../exceptions';

/**
 * Images - Resim işleme endpoint'leri
 * 
 * Bu sınıf AI ile resim oluşturma, düzenleme ve varyasyon işlemleri için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const images = zapi.images;
 * const image = await images.generate('Güzel bir manzara');
 */
export class Images extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * AI ile resim oluşturur
   */
  async generations(data: any): Promise<ApiResponse> {
    if (!data.prompt || data.prompt.trim() === '') {
      throw new ValidationException('Prompt boş olamaz');
    }

    return this.getHttpClient().post('/images/generations', data);
  }

  /**
   * Resmi düzenler
   */
  async edits(data: any): Promise<ApiResponse> {
    if (!data.image || !data.prompt) {
      throw new ValidationException('Image ve prompt boş olamaz');
    }

    return this.getHttpClient().post('/images/edits', data);
  }

  /**
   * Resim varyasyonları oluşturur
   */
  async variations(data: any): Promise<ApiResponse> {
    if (!data.image) {
      throw new ValidationException('Image boş olamaz');
    }

    return this.getHttpClient().post('/images/variations', data);
  }
}
