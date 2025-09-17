import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, ApiKey, ListOptions, PaginatedResponse, ValidationException } from '../types';

/**
 * APIKeys - API anahtarı yönetimi endpoint'leri
 * 
 * Bu sınıf API anahtarlarını yönetmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const apiKeys = zapi.apiKeys;
 * const keys = await apiKeys.list();
 * const newKey = await apiKeys.create({ name: 'Yeni Anahtar' });
 */
export class APIKeys extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * API anahtarlarını listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/api-keys', options);
  }

  /**
   * Yeni API anahtarı oluşturur
   */
  async create(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/api-keys', data);
  }

  /**
   * API anahtarı detaylarını getirir
   */
  async get(keyId: string): Promise<ApiResponse> {
    if (!keyId || keyId.trim() === '') {
      throw new ValidationException('API anahtarı ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/api-keys/${keyId}`);
  }

  /**
   * API anahtarı bilgilerini günceller
   */
  async update(keyId: string, data: any): Promise<ApiResponse> {
    if (!keyId || keyId.trim() === '') {
      throw new ValidationException('API anahtarı ID\'si boş olamaz');
    }

    return this.getHttpClient().put(`/api-keys/${keyId}`, data);
  }

  /**
   * API anahtarını siler
   */
  async delete(keyId: string): Promise<ApiResponse> {
    if (!keyId || keyId.trim() === '') {
      throw new ValidationException('API anahtarı ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/api-keys/${keyId}`);
  }

  /**
   * API anahtarı kullanım istatistiklerini getirir
   */
  async getUsage(keyId: string): Promise<ApiResponse> {
    if (!keyId || keyId.trim() === '') {
      throw new ValidationException('API anahtarı ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/api-keys/${keyId}/usage`);
  }

  /**
   * Mevcut roller listesini getirir
   */
  async getAvailableRoles(): Promise<ApiResponse> {
    return this.getHttpClient().get('/api-keys/roles/available');
  }

  /**
   * API anahtarını yeniler
   */
  async rotate(keyId: string): Promise<ApiResponse> {
    if (!keyId || keyId.trim() === '') {
      throw new ValidationException('API anahtarı ID\'si boş olamaz');
    }

    return this.getHttpClient().post(`/api-keys/${keyId}/rotate`);
  }

  /**
   * API anahtarı ile arama yapar
   */
  async lookup(apiKey: string): Promise<ApiResponse> {
    if (!apiKey || apiKey.trim() === '') {
      throw new ValidationException('API anahtarı boş olamaz');
    }

    return this.getHttpClient().get(`/api-keys/key/${apiKey}`);
  }

  /**
   * API anahtarı durumunu değiştirir
   */
}
