import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';
import { ValidationException } from '../exceptions';

/**
 * Embeddings - Metin embedding endpoint'leri
 * 
 * Bu sınıf metin embedding işlemleri için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const embeddings = zapi.embeddings;
 * const embedding = await embeddings.create('Merhaba dünya');
 */
export class Embeddings extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Metin embedding oluşturur
   */
  async create(input: string | string[], model: string = 'text-embedding-ada-002', options: any = {}): Promise<ApiResponse> {
    if (!input || (Array.isArray(input) && input.length === 0) || (typeof input === 'string' && input.trim() === '')) {
      throw new ValidationException('Input boş olamaz');
    }

    return this.getHttpClient().post('/embeddings', {
      input,
      model,
      ...options
    });
  }
}
