import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';
import { ValidationException } from '../exceptions';

/**
 * AIProvider - AI sağlayıcı yönetimi endpoint'leri
 * 
 * Bu sınıf AI sağlayıcıları ve modellerini yönetmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const aiProvider = zapi.aiProvider;
 * const providers = await aiProvider.list();
 * const models = await aiProvider.getModels();
 */
export class AIProvider extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * AI sağlayıcılarını listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    // Orijinal API'ye uygun header ekle
    const headers: any = {};
    if (options.appId) {
      headers['x-app-id'] = options.appId;
      delete options.appId; // Header'a ekledikten sonra data'dan çıkar
    }
    
    return this.getHttpClient().get('/ai-provider', options, headers);
  }

  /**
   * Yeni AI sağlayıcı oluşturur
   */
  async create(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/ai-provider/providers', data);
  }

  /**
   * AI sağlayıcı detaylarını getirir
   */
  async get(providerId: string): Promise<ApiResponse> {
    if (!providerId || providerId.trim() === '') {
      throw new ValidationException('Sağlayıcı ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/ai-provider/providers/${providerId}`);
  }

  /**
   * AI sağlayıcı bilgilerini günceller
   */
  async update(providerId: string, data: any): Promise<ApiResponse> {
    if (!providerId || providerId.trim() === '') {
      throw new ValidationException('Sağlayıcı ID\'si boş olamaz');
    }

    return this.getHttpClient().put(`/ai-provider/providers/${providerId}`, data);
  }

  /**
   * AI sağlayıcıyı siler
   */
  async delete(providerId: string): Promise<ApiResponse> {
    if (!providerId || providerId.trim() === '') {
      throw new ValidationException('Sağlayıcı ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/ai-provider/providers/${providerId}`);
  }

  /**
   * AI sağlayıcıyı test eder
   */

  /**
   * AI modellerini listeler
   */
  async testProvider(providerId: string, overrideKey: string | null = null): Promise<ApiResponse> {
    if (!providerId || providerId.trim() === '') {
      throw new ValidationException('Sağlayıcı ID\'si boş olamaz');
    }
    
    const data: any = {};
    if (overrideKey) {
      data.override_key = overrideKey;
    }
    
    return this.getHttpClient().post(`/ai-provider/providers/${providerId}/test`, data);
  }

  async getModels(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/ai-provider/models', options);
  }

  /**
   * AI model detaylarını getirir
   */
  async getModel(modelId: string): Promise<ApiResponse> {
    if (!modelId || modelId.trim() === '') {
      throw new ValidationException('Model ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/ai-provider/models/${modelId}`);
  }

  /**
   * AI model bilgilerini günceller
   */
  async updateModel(modelId: string, data: any): Promise<ApiResponse> {
    if (!modelId || modelId.trim() === '') {
      throw new ValidationException('Model ID\'si boş olamaz');
    }

    return this.getHttpClient().put(`/ai-provider/models/${modelId}`, data);
  }

  /**
   * AI modeli siler
   */
  async deleteModel(modelId: string): Promise<ApiResponse> {
    if (!modelId || modelId.trim() === '') {
      throw new ValidationException('Model ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/ai-provider/models/${modelId}`);
  }

  /**
   * Varsayılan modelleri getirir
   */
  async getDefaultModels(): Promise<ApiResponse> {
    return this.getHttpClient().get('/ai-providers/models/defaults');
  }

  /**
   * Yeni model oluşturur
   */

  /**
   * Model testi yapar
   */
  async testModel(modelId: string): Promise<ApiResponse> {
    if (!modelId) {
      throw new Error('Model ID boş olamaz');
    }
    
    return this.getHttpClient().post(`/ai-provider/models/${modelId}/test`);
  }


  /**
   * Cache'i temizler
   */
  async clearCache(): Promise<ApiResponse> {
    return this.getHttpClient().post('/ai-provider/cache/clear');
  }
}
