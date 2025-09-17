import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, FileUploadRequest, FileUploadResponse, ValidationException } from '../types';

/**
 * Upload - Dosya yükleme endpoint'leri
 * 
 * Bu sınıf dosya yükleme, listeleme ve yönetme işlemleri için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class Upload extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Dosya yükler
   */
  async upload(filePath: string, options: any = {}): Promise<ApiResponse> {
    if (!filePath || filePath.trim() === '') {
      throw new ValidationException('Dosya yolu boş olamaz');
    }

    return this.getHttpClient().postMultipart('/upload', options || {}, { file: filePath });
  }

  /**
   * Yüklenen dosyaları listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/upload', options);
  }

  /**
   * Dosya detaylarını getirir
   */
  async get(fileId: string): Promise<ApiResponse> {
    if (!fileId || fileId.trim() === '') {
      throw new ValidationException('Dosya ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/upload/${fileId}`);
  }

  /**
   * Dosyayı siler
   */
  async delete(fileId: string): Promise<ApiResponse> {
    if (!fileId || fileId.trim() === '') {
      throw new ValidationException('Dosya ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/upload/${fileId}`);
  }

  /**
   * Upload istatistiklerini getirir
   */
  async getStats(): Promise<ApiResponse> {
    return this.getHttpClient().get('/upload/stats');
  }

  /**
   * Orphaned dosyaları temizler
   */
  async cleanup(): Promise<ApiResponse> {
    return this.getHttpClient().delete('/upload/cleanup');
  }

  /**
   * Upload progress bilgilerini getirir
   */
  async getProgress(uploadId: string): Promise<ApiResponse> {
    if (!uploadId || uploadId.trim() === '') {
      throw new ValidationException('Upload ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/upload/progress/${uploadId}`);
  }

  /**
   * Tüm upload progress bilgilerini getirir
   */
  async getAllProgress(): Promise<ApiResponse> {
    return this.getHttpClient().get('/upload/progress/all');
  }

  /**
   * Signed URL oluşturur
   */
  async createSignedUrl(fileId: string, options: any = {}): Promise<ApiResponse> {
    if (!fileId || fileId.trim() === '') {
      throw new ValidationException('Dosya ID\'si boş olamaz');
    }

    return this.getHttpClient().post(`/upload/url/${fileId}`, options);
  }
}
