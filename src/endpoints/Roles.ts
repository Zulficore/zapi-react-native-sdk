import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';
import { ValidationException } from '../exceptions';

/**
 * Roles - Rol yönetimi endpoint'leri
 * 
 * Bu sınıf kullanıcı rollerini yönetmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class Roles extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Rolleri listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/roles', options);
  }

  /**
   * Yeni rol oluşturur
   */
  async create(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/roles', data);
  }

  /**
   * Rol detaylarını getirir
   */
  async get(roleId: string): Promise<ApiResponse> {
    if (!roleId || roleId.trim() === '') {
      throw new ValidationException('Rol ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/roles/${roleId}`);
  }

  /**
   * Rol bilgilerini günceller
   */
  async update(roleId: string, data: any): Promise<ApiResponse> {
    if (!roleId || roleId.trim() === '') {
      throw new ValidationException('Rol ID\'si boş olamaz');
    }

    return this.getHttpClient().put(`/roles/${roleId}`, data);
  }

  /**
   * Rolü siler
   */
  async delete(roleId: string): Promise<ApiResponse> {
    if (!roleId || roleId.trim() === '') {
      throw new ValidationException('Rol ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/roles/${roleId}`);
  }

  /**
   * Rol kullanıcılarını listeler
   */
  async getUsers(roleId: string, options: any = {}): Promise<ApiResponse> {
    if (!roleId || roleId.trim() === '') {
      throw new ValidationException('Rol ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/roles/${roleId}/users`, options);
  }

  /**
   * Mevcut yetkileri listeler
   */
  async getAvailablePermissions(): Promise<ApiResponse> {
    return this.getHttpClient().get('/roles/permissions/available');
  }

  /**
   * Rol analitiğini getirir
   */
  async getAnalytics(): Promise<ApiResponse> {
    return this.getHttpClient().get('/roles/analytics');
  }
}
