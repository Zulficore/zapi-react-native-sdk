import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, ListOptions, PaginatedResponse, ValidationException } from '../types';

/**
 * MailTemplates - E-posta şablonu yönetimi endpoint'leri
 * 
 * Bu sınıf e-posta şablonlarını yönetmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class MailTemplates extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * E-posta şablonlarını listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/mail-templates', options);
  }

  /**
   * Yeni e-posta şablonu oluşturur
   */
  async create(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/mail-templates', data);
  }

  /**
   * E-posta şablonu detaylarını getirir
   */
  async get(templateId: string): Promise<ApiResponse> {
    if (!templateId || templateId.trim() === '') {
      throw new ValidationException('Şablon ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/mail-templates/${templateId}`);
  }

  /**
   * E-posta şablonu bilgilerini günceller
   */
  async update(templateId: string, data: any): Promise<ApiResponse> {
    if (!templateId || templateId.trim() === '') {
      throw new ValidationException('Şablon ID\'si boş olamaz');
    }

    return this.getHttpClient().put(`/mail-templates/${templateId}`, data);
  }

  /**
   * E-posta şablonunu siler
   */
  async delete(templateId: string): Promise<ApiResponse> {
    if (!templateId || templateId.trim() === '') {
      throw new ValidationException('Şablon ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/mail-templates/${templateId}`);
  }

  /**
   * E-posta şablonu durumunu değiştirir
   */

  /**
   * E-posta şablonunu önizler
   */
  async preview(templateId: string, variables: any = {}): Promise<ApiResponse> {
    if (!templateId || templateId.trim() === '') {
      throw new ValidationException('Şablon ID\'si boş olamaz');
    }

    return this.getHttpClient().post(`/mail-templates/${templateId}/preview`, {
      variables
    });
  }

  /**
   * E-posta şablonunu klonlar
   */
  async clone(templateId: string, data: any = {}): Promise<ApiResponse> {
    if (!templateId || templateId.trim() === '') {
      throw new ValidationException('Şablon ID\'si boş olamaz');
    }

    return this.getHttpClient().post(`/mail-templates/${templateId}/clone`, data);
  }
}
