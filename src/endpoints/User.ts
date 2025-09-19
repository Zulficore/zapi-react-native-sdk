import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';
import { ValidationException } from '../exceptions';

/**
 * User - Kullanıcı yönetimi endpoint'leri
 * 
 * Bu sınıf kullanıcı profil yönetimi, avatar işlemleri, kullanım istatistikleri,
 * AI yanıtları ve hesap yönetimi için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const user = zapi.user;
 * const profile = await user.getProfile();
 * await user.updateProfile({ firstName: 'Yeni Ad' });
 */
export class User extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Kullanıcının profil bilgilerini getirir
   */
  async getProfile(): Promise<ApiResponse> {
    return this.getHttpClient().get('/user/profile');
  }

  /**
   * Kullanıcı profil bilgilerini günceller
   */
  async updateProfile(data: any): Promise<ApiResponse> {
    return this.getHttpClient().put('/user/profile', data);
  }

  /**
   * Kullanıcı avatar resmi yükler
   */
  async uploadAvatar(filePath: string): Promise<ApiResponse> {
    if (!filePath || filePath.trim() === '') {
      throw new ValidationException('Avatar dosya yolu boş olamaz');
    }

    // React Native'de mime type kontrolü farklı olabilir
    // Burada basit dosya uzantısı kontrolü yapıyoruz
    const extension = filePath.split('.').pop()?.toLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    if (!extension || !validExtensions.includes(extension)) {
      throw new ValidationException('Desteklenmeyen dosya formatı: ' + extension);
    }

    return this.getHttpClient().postMultipart('/user/avatar', {}, { avatar: { uri: filePath, type: 'image/jpeg', name: 'avatar' } });
  }

  /**
   * Kullanıcının avatar resmini siler
   */
  async deleteAvatar(): Promise<ApiResponse> {
    return this.getHttpClient().delete('/user/avatar');
  }

  /**
   * Kullanıcının kullanım istatistiklerini getirir
   */
  async getUsage(): Promise<ApiResponse> {
    return this.getHttpClient().get('/user/usage');
  }

  /**
   * Kullanıcının AI yanıtlarını listeler
   */
  async getResponses(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/user/responses', options);
  }

  /**
   * Belirli bir AI yanıtının detaylarını getirir
   */
  async getResponse(responseId: string): Promise<ApiResponse> {
    if (!responseId || responseId.trim() === '') {
      throw new ValidationException('Yanıt ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/user/responses/${responseId}`);
  }

  /**
   * Belirli bir AI yanıtını siler
   */
  async deleteResponse(responseId: string): Promise<ApiResponse> {
    if (!responseId || responseId.trim() === '') {
      throw new ValidationException('Yanıt ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/user/responses/${responseId}`);
  }

  /**
   * Belirli bir AI yanıtını export eder
   */

  /**
   * Kullanıcının en son AI yanıtını getirir
   */
  async getLastResponse(): Promise<ApiResponse> {
    return this.getHttpClient().get('/user/lastresponse');
  }

  /**
   * Kullanıcı hesabını deaktive eder
   */

  /**
   * Kullanıcı hesabını kalıcı olarak siler
   */
  async deleteAccount(): Promise<ApiResponse> {
    return this.getHttpClient().delete('/user/account');
  }

  /**
   * Kullanıcının metadata bilgilerini getirir
   */
  async getMetadata(path: string = ''): Promise<ApiResponse> {
    const endpoint = path ? `/user/metadata/${path}` : '/user/metadata';
    return this.getHttpClient().get(endpoint);
  }

  /**
   * Kullanıcının metadata bilgilerini günceller
   */
  async updateMetadata(path: string, value: any): Promise<ApiResponse> {
    if (!path || path.trim() === '') {
      throw new ValidationException('Metadata path boş olamaz');
    }

    return this.getHttpClient().put(`/user/metadata/${path}`, value);
  }

  /**
   * Kullanıcının metadata bilgilerini kısmi olarak günceller
   */
  async patchMetadata(path: string, value: any): Promise<ApiResponse> {
    if (!path || path.trim() === '') {
      throw new ValidationException('Metadata path boş olamaz');
    }

    return this.getHttpClient().patch(`/user/metadata/${path}`, value);
  }

  /**
   * Kullanıcının metadata bilgilerini siler
   */
  async deleteMetadata(path: string): Promise<ApiResponse> {
    if (!path || path.trim() === '') {
      throw new ValidationException('Metadata path boş olamaz');
    }

    return this.getHttpClient().delete(`/user/metadata/${path}`);
  }

  /**
   * Kullanıcının konuşmalarını listeler
   */
  async getConversations(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/user/conversations', options);
  }

  /**
   * Belirli bir konuşmayı getirir
   */
  async getConversation(responseId: string): Promise<ApiResponse> {
    return this.getHttpClient().get(`/user/conversations/${responseId}`);
  }
}
