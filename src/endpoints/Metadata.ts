import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';
import { ValidationException } from '../exceptions';

/**
 * Metadata - Genel metadata yönetimi endpoint'leri
 * 
 * Bu sınıf genel metadata işlemlerini yönetmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class Metadata extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Metadata bilgilerini getirir
   */
  async get(entityType: string, entityId: string, path: string = ''): Promise<ApiResponse> {
    if (!entityType || entityType.trim() === '') {
      throw new ValidationException('Entity type boş olamaz');
    }

    if (!entityId || entityId.trim() === '') {
      throw new ValidationException('Entity ID boş olamaz');
    }

    const endpoint = path ? `/metadata/${entityType}/${entityId}/${path}` : `/metadata/${entityType}/${entityId}`;
    return this.getHttpClient().get(endpoint);
  }

  /**
   * Metadata bilgilerini günceller
   */
  async update(entityType: string, entityId: string, path: string, value: any): Promise<ApiResponse> {
    if (!entityType || entityType.trim() === '') {
      throw new ValidationException('Entity type boş olamaz');
    }

    if (!entityId || entityId.trim() === '') {
      throw new ValidationException('Entity ID boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Metadata path boş olamaz');
    }

    return this.getHttpClient().put(`/metadata/${entityType}/${entityId}/${path}`, { value });
  }

  /**
   * Metadata bilgilerini kısmi olarak günceller
   */
  async patch(entityType: string, entityId: string, path: string, value: any): Promise<ApiResponse> {
    if (!entityType || entityType.trim() === '') {
      throw new ValidationException('Entity type boş olamaz');
    }

    if (!entityId || entityId.trim() === '') {
      throw new ValidationException('Entity ID boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Metadata path boş olamaz');
    }

    return this.getHttpClient().patch(`/metadata/${entityType}/${entityId}/${path}`, { value });
  }

  /**
   * Metadata bilgilerini siler
   */
  async delete(entityType: string, entityId: string, path: string): Promise<ApiResponse> {
    if (!entityType || entityType.trim() === '') {
      throw new ValidationException('Entity type boş olamaz');
    }

    if (!entityId || entityId.trim() === '') {
      throw new ValidationException('Entity ID boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Metadata path boş olamaz');
    }

    return this.getHttpClient().delete(`/metadata/${entityType}/${entityId}/${path}`);
  }

}
