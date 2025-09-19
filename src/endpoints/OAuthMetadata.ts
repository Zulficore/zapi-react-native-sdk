import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';
import { ValidationException } from '../exceptions';

/**
 * OAuthMetadata - OAuth metadata yönetimi endpoint'leri
 * 
 * Bu sınıf OAuth metadata'larını yönetmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class OAuthMetadata extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * OAuth metadata bilgilerini getirir
   */
  async get(appId: string, path: string = ''): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('App ID boş olamaz');
    }

    const endpoint = path ? `/oauth/metadata/${appId}/${path}` : `/oauth/metadata/${appId}`;
    return this.getHttpClient().get(endpoint);
  }

  /**
   * OAuth metadata bilgilerini günceller
   */
  async update(appId: string, path: string, value: any): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('App ID boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Path boş olamaz');
    }

    return this.getHttpClient().put(`/oauth/metadata/${appId}/${path}`, { value });
  }

  /**
   * OAuth metadata bilgilerini kısmi olarak günceller
   */
  async patch(appId: string, path: string, value: any): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('App ID boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Path boş olamaz');
    }

    return this.getHttpClient().patch(`/oauth/metadata/${appId}/${path}`, { value });
  }

  /**
   * OAuth metadata bilgilerini siler
   */
  async delete(appId: string, path: string): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('App ID boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Path boş olamaz');
    }

    return this.getHttpClient().delete(`/oauth/metadata/${appId}/${path}`);
  }

}
