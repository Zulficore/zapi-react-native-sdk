import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, Plan, ListOptions, PaginatedResponse, ValidationException } from '../types';

/**
 * Plans - Abonelik planı yönetimi endpoint'leri
 * 
 * Bu sınıf abonelik planlarını yönetmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class Plans extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Planları listeler (public)
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/plans', options);
  }

  /**
   * Plan karşılaştırması getirir (public)
   */
  async compare(planIds: string[]): Promise<ApiResponse> {
    return this.getHttpClient().get('/plans/compare', { plans: planIds });
  }

  /**
   * Yeni plan oluşturur (admin)
   */
  async create(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/plans', data);
  }

  /**
   * Plan detaylarını getirir
   */
  async get(planId: string): Promise<ApiResponse> {
    if (!planId || planId.trim() === '') {
      throw new ValidationException('Plan ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/plans/${planId}`);
  }

  /**
   * Plan bilgilerini günceller (admin)
   */
  async update(planId: string, data: any): Promise<ApiResponse> {
    if (!planId || planId.trim() === '') {
      throw new ValidationException('Plan ID\'si boş olamaz');
    }

    return this.getHttpClient().put(`/plans/${planId}`, data);
  }

  /**
   * Planı siler (admin)
   */
  async delete(planId: string): Promise<ApiResponse> {
    if (!planId || planId.trim() === '') {
      throw new ValidationException('Plan ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/plans/${planId}`);
  }

  /**
   * Plan durumunu değiştirir (admin)
   */

  /**
   * Plan abonelerini listeler (admin)
   */
  async getSubscribers(planId: string, options: any = {}): Promise<ApiResponse> {
    if (!planId || planId.trim() === '') {
      throw new ValidationException('Plan ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/plans/subscribers/${planId}`, options);
  }

  /**
   * Plan analitiğini getirir (admin)
   */
  async getAnalytics(planId: string, options: any = {}): Promise<ApiResponse> {
    if (!planId || planId.trim() === '') {
      throw new ValidationException('Plan ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/plans/analytics/${planId}`, options);
  }

  /**
   * Plan metadata bilgilerini getirir
   */
  async getMetadata(planId: string, path: string = ''): Promise<ApiResponse> {
    if (!planId || planId.trim() === '') {
      throw new ValidationException('Plan ID\'si boş olamaz');
    }

    const endpoint = path ? `/plans/${planId}/metadata/${path}` : `/plans/${planId}/metadata`;
    return this.getHttpClient().get(endpoint);
  }

  /**
   * Plan metadata bilgilerini günceller
   */
  async updateMetadata(planId: string, path: string, value: any): Promise<ApiResponse> {
    if (!planId || planId.trim() === '') {
      throw new ValidationException('Plan ID\'si boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Metadata path boş olamaz');
    }

    return this.getHttpClient().put(`/plans/${planId}/metadata/${path}`, { value });
  }

  /**
   * Plan metadata bilgilerini kısmi olarak günceller
   */

  /**
   * Plan metadata bilgilerini siler
   */
  async deleteMetadata(planId: string, path: string): Promise<ApiResponse> {
    if (!planId || planId.trim() === '') {
      throw new ValidationException('Plan ID\'si boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Metadata path boş olamaz');
    }

    return this.getHttpClient().delete(`/plans/${planId}/metadata/${path}`);
  }
}
