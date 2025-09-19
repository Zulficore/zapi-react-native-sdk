import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';
import { ValidationException } from '../exceptions';

/**
 * Functions - Kullanıcı fonksiyonları endpoint'leri
 * 
 * Bu sınıf kullanıcı tanımlı fonksiyonları yönetmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class Functions extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Fonksiyonları listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    // Orijinal API'ye uygun header ekle
    const headers: any = {};
    if (options.appId) {
      headers['x-app-id'] = options.appId;
      delete options.appId; // Header'a ekledikten sonra data'dan çıkar
    }
    
    return this.getHttpClient().get('/functions', options, headers);
  }

  /**
   * Yeni fonksiyon oluşturur
   */
  async create(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/functions', data);
  }

  /**
   * Fonksiyon detaylarını getirir
   */
  async get(functionId: string): Promise<ApiResponse> {
    if (!functionId || functionId.trim() === '') {
      throw new ValidationException('Fonksiyon ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/functions/${functionId}`);
  }

  /**
   * Fonksiyon bilgilerini günceller
   */
  async update(functionId: string, data: any): Promise<ApiResponse> {
    if (!functionId || functionId.trim() === '') {
      throw new ValidationException('Fonksiyon ID\'si boş olamaz');
    }

    return this.getHttpClient().put(`/functions/${functionId}`, data);
  }

  /**
   * Fonksiyonu siler
   */
  async delete(functionId: string): Promise<ApiResponse> {
    if (!functionId || functionId.trim() === '') {
      throw new ValidationException('Fonksiyon ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/functions/${functionId}`);
  }

  /**
   * Fonksiyonu çalıştırır
   */
  async execute(functionId: string, data: any = {}): Promise<ApiResponse> {
    if (!functionId || functionId.trim() === '') {
      throw new ValidationException('Fonksiyon ID\'si boş olamaz');
    }

    return this.getHttpClient().post(`/functions/${functionId}/execute`, data);
  }

  /**
   * Fonksiyon durumunu değiştirir
   */
  async toggleStatus(functionId: string): Promise<ApiResponse> {
    if (!functionId || functionId.trim() === '') {
      throw new ValidationException('Fonksiyon ID\'si boş olamaz');
    }

    return this.getHttpClient().patch(`/functions/${functionId}/toggle-status`);
  }

  /**
   * Fonksiyon test eder
   */
  async test(functionId: string, data: any = {}): Promise<ApiResponse> {
    if (!functionId || functionId.trim() === '') {
      throw new ValidationException('Fonksiyon ID\'si boş olamaz');
    }

    return this.getHttpClient().post(`/functions/${functionId}/test`, data);
  }

}
