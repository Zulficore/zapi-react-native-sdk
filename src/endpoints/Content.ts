import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, ListOptions, PaginatedResponse, ValidationException } from '../types';

/**
 * Content - İçerik yönetimi endpoint'leri
 * 
 * Bu sınıf içerik oluşturma, güncelleme, silme, listeleme ve arama işlemleri için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const content = zapi.content;
 * const contents = await content.list();
 * const newContent = await content.create({ title: 'Yeni İçerik' });
 */
export class Content extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * İçerikleri listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/content', options);
  }

  /**
   * Yeni içerik oluşturur
   */
  async create(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/content', data);
  }

  /**
   * İçerik detaylarını getirir
   */
  async get(contentId: string): Promise<ApiResponse> {
    if (!contentId || contentId.trim() === '') {
      throw new ValidationException('İçerik ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/content/${contentId}`);
  }

  /**
   * İçerik bilgilerini günceller
   */
  async update(contentId: string, data: any): Promise<ApiResponse> {
    if (!contentId || contentId.trim() === '') {
      throw new ValidationException('İçerik ID\'si boş olamaz');
    }

    return this.getHttpClient().put(`/content/${contentId}`, data);
  }

  /**
   * İçeriği siler
   */
  async delete(contentId: string): Promise<ApiResponse> {
    if (!contentId || contentId.trim() === '') {
      throw new ValidationException('İçerik ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/content/${contentId}`);
  }


  /**
   * İçerik kategorilerini listeler
   */
  async getCategories(): Promise<ApiResponse> {
    return this.getHttpClient().get('/content/categories');
  }



  /**
   * İçerik türlerini listeler
   */
  async getTypes(): Promise<ApiResponse> {
    return this.getHttpClient().get('/content/types/list');
  }

  /**
   * İçerik dillerini listeler
   */
  async getLanguages(): Promise<ApiResponse> {
    return this.getHttpClient().get('/content/languages/list');
  }

  /**
   * Gelişmiş içerik arama yapar
   */
  async searchAdvanced(options: any): Promise<ApiResponse> {
    return this.getHttpClient().get('/content/search/advanced', options);
  }

  /**
   * İçerik istatistiklerini getirir
   */
  async getStats(): Promise<ApiResponse> {
    return this.getHttpClient().get('/content/stats');
  }

  /**
   * İçerik metadata bilgilerini getirir
   */
  async getMetadata(contentId: string, path: string = ''): Promise<ApiResponse> {
    if (!contentId || contentId.trim() === '') {
      throw new ValidationException('İçerik ID\'si boş olamaz');
    }

    const endpoint = path ? `/content/${contentId}/metadata/${path}` : `/content/${contentId}/metadata`;
    return this.getHttpClient().get(endpoint);
  }

  /**
   * İçerik metadata bilgilerini günceller
   */
  async updateMetadata(contentId: string, path: string, value: any): Promise<ApiResponse> {
    if (!contentId || contentId.trim() === '') {
      throw new ValidationException('İçerik ID\'si boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Path boş olamaz');
    }

    return this.getHttpClient().put(`/content/${contentId}/metadata/${path}`, { value });
  }

  /**
   * İçerik metadata bilgilerini kısmi günceller
   */

  /**
   * İçerik metadata bilgilerini siler
   */
  async deleteMetadata(contentId: string, path: string): Promise<ApiResponse> {
    if (!contentId || contentId.trim() === '') {
      throw new ValidationException('İçerik ID\'si boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Path boş olamaz');
    }

    return this.getHttpClient().delete(`/content/${contentId}/metadata/${path}`);
  }

  /**
   * Genel içeriği getirir
   */
  async getPublic(slug: string): Promise<ApiResponse> {
    if (!slug || slug.trim() === '') {
      throw new ValidationException('Slug boş olamaz');
    }

    return this.getHttpClient().get(`/content/public/${slug}`);
  }
}
