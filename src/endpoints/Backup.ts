import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, ListOptions, PaginatedResponse, ValidationException } from '../types';

/**
 * Backup - Backup yönetimi endpoint'leri
 * 
 * Bu sınıf backup listeleme, detay görüntüleme ve silme işlemleri için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const backup = zapi.backup;
 * const backups = await backup.list();
 * const backupDetail = await backup.get('backup_123');
 */
export class Backup extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Backup'ları listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/backup', options);
  }

  /**
   * Backup detaylarını getirir
   */
  async get(backupId: string): Promise<ApiResponse> {
    if (!backupId || backupId.trim() === '') {
      throw new ValidationException('Backup ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/backup/${backupId}`);
  }

  /**
   * Backup'ı siler
   */
  async delete(backupId: string): Promise<ApiResponse> {
    if (!backupId || backupId.trim() === '') {
      throw new ValidationException('Backup ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/backup/${backupId}`);
  }


  /**
   * Belirli bir kaydın backup'larını getirir
   */
  async getRecordBackups(model: string, recordId: string): Promise<ApiResponse> {
    if (!model || model.trim() === '') {
      throw new ValidationException('Model adı boş olamaz');
    }

    if (!recordId || recordId.trim() === '') {
      throw new ValidationException('Kayıt ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/backup/record/${model}/${recordId}`);
  }
}
