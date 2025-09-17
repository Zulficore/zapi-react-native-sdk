import { BaseEndpoint } from './BaseEndpoint';
import { ApiResponse } from '../types';

/**
 * Users Endpoint
 * 
 * Bu sınıf kullanıcı yönetimi işlemlerini yönetir.
 */
export class Users extends BaseEndpoint {
  /**
   * Kullanıcıları listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/users', options);
  }

  /**
   * Kullanıcı istatistiklerini getirir
   */
  async getStats(): Promise<ApiResponse> {
    return this.getHttpClient().get('/users/stats');
  }

  /**
   * Belirli bir kullanıcıyı getirir
   */
  async get(userId: string): Promise<ApiResponse> {
    if (!userId) {
      throw new Error('Kullanıcı ID boş olamaz');
    }
    
    return this.getHttpClient().get(`/users/${userId}`);
  }

  /**
   * Kullanıcı günceller
   */
  async update(userId: string, data: any): Promise<ApiResponse> {
    if (!userId) {
      throw new Error('Kullanıcı ID boş olamaz');
    }
    
    return this.getHttpClient().put(`/users/${userId}`, data);
  }

  /**
   * Kullanıcı siler
   */
  async delete(userId: string): Promise<ApiResponse> {
    if (!userId) {
      throw new Error('Kullanıcı ID boş olamaz');
    }
    
    return this.getHttpClient().delete(`/users/${userId}`);
  }

  /**
   * Kullanıcı metadata'sını getirir
   */
  async getMetadata(userId: string, path: string = ''): Promise<ApiResponse> {
    if (!userId) {
      throw new Error('Kullanıcı ID boş olamaz');
    }
    
    const endpoint = `/users/${userId}/metadata${path ? `/${path}` : ''}`;
    return this.getHttpClient().get(endpoint);
  }

  /**
   * Kullanıcı metadata'sını günceller
   */
  async updateMetadata(userId: string, path: string, value: any): Promise<ApiResponse> {
    if (!userId) {
      throw new Error('Kullanıcı ID boş olamaz');
    }
    
    if (!path) {
      throw new Error('Metadata path boş olamaz');
    }
    
    return this.getHttpClient().put(`/users/${userId}/metadata/${path}`, { value });
  }

  /**
   * Kullanıcı metadata'sını siler
   */
  async deleteMetadata(userId: string, path: string): Promise<ApiResponse> {
    if (!userId) {
      throw new Error('Kullanıcı ID boş olamaz');
    }
    
    if (!path) {
      throw new Error('Metadata path boş olamaz');
    }
    
    return this.getHttpClient().delete(`/users/${userId}/metadata/${path}`);
  }
}
