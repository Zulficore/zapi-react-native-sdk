import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, App, ListOptions, PaginatedResponse, ValidationException } from '../types';

/**
 * Apps - Uygulama yönetimi endpoint'leri
 * 
 * Bu sınıf uygulama oluşturma, güncelleme, silme, listeleme,
 * istatistikler ve metadata yönetimi için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const apps = zapi.apps;
 * const appList = await apps.list();
 * const newApp = await apps.create({ name: 'Yeni Uygulama' });
 */
export class Apps extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Uygulamaları listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/apps', options);
  }

  /**
   * Yeni uygulama oluşturur
   */
  async create(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/apps', data);
  }

  /**
   * Uygulama detaylarını getirir
   */
  async get(appId: string): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('Uygulama ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/apps/${appId}`);
  }

  /**
   * Uygulama bilgilerini günceller
   */
  async update(appId: string, data: any): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('Uygulama ID\'si boş olamaz');
    }

    return this.getHttpClient().put(`/apps/${appId}`, data);
  }

  /**
   * Uygulamayı siler
   */
  async delete(appId: string): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('Uygulama ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/apps/${appId}`);
  }

  /**
   * Uygulama istatistiklerini getirir
   */
  async getStats(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/apps/stats', options);
  }

  /**
   * Belirli uygulamanın istatistiklerini getirir
   */
  async getAppStats(appId: string, options: any = {}): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('Uygulama ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/apps/stats/${appId}`, options);
  }

  /**
   * Uygulama kullanım sayaçlarını sıfırlar
   */
  async resetUsage(appId: string): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('Uygulama ID\'si boş olamaz');
    }

    return this.getHttpClient().post(`/apps/reset-usage/${appId}`);
  }

  /**
   * Uygulama durumunu değiştirir
   */

  /**
   * Uygulamanın metadata bilgilerini getirir
   */
  async getMetadata(appId: string, path: string = ''): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('Uygulama ID\'si boş olamaz');
    }

    const endpoint = path ? `/apps/${appId}/metadata/${path}` : `/apps/${appId}/metadata`;
    return this.getHttpClient().get(endpoint);
  }

  /**
   * Uygulamanın metadata bilgilerini günceller
   */
  async updateMetadata(appId: string, path: string, value: any): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('Uygulama ID\'si boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Metadata path boş olamaz');
    }

    return this.getHttpClient().put(`/apps/${appId}/metadata/${path}`, value);
  }

  /**
   * Uygulamanın metadata bilgilerini kısmi olarak günceller
   */
  async patchMetadata(appId: string, path: string, value: any): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('Uygulama ID\'si boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Metadata path boş olamaz');
    }

    return this.getHttpClient().patch(`/apps/${appId}/metadata/${path}`, value);
  }

  /**
   * Uygulamanın metadata bilgilerini siler
   */
  async deleteMetadata(appId: string, path: string): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('Uygulama ID\'si boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Metadata path boş olamaz');
    }

    return this.getHttpClient().delete(`/apps/${appId}/metadata/${path}`);
  }
}
