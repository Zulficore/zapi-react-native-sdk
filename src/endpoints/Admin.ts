import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, ListOptions, PaginatedResponse, ValidationException } from '../types';

/**
 * Admin - Yönetici endpoint'leri
 * 
 * Bu sınıf sistem yönetimi, kuyruk yönetimi, cron işlemleri,
 * sağlık kontrolü ve backup/restore işlemleri için endpoint'leri içerir.
 * Sadece admin ve superadmin yetkisine sahip kullanıcılar erişebilir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const admin = zapi.admin;
 * const dashboard = await admin.getDashboard();
 * const queue = await admin.getQueue();
 */
export class Admin extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Admin dashboard bilgilerini getirir
   */
  async getDashboard(): Promise<ApiResponse> {
    return this.getHttpClient().get('/admin/dashboard');
  }

  /**
   * Kuyruk bilgilerini getirir
   */

  /**
   * Cron işlemlerini listeler
   */

  /**
   * Cron işlemini tetikler
   */

  /**
   * Aylık sıfırlama cron işlemini tetikler
   */

  /**
   * Sistem sağlık kontrolü yapar
   */

  /**
   * Sistem metriklerini getirir
   */

  /**
   * Cache temizleme işlemi yapar
   */
  async clearCache(pattern: string | null = null): Promise<ApiResponse> {
    const data: any = {};
    if (pattern) {
      data.pattern = pattern;
    }
    
    return this.getHttpClient().post('/admin/system/cache/clear', data);
  }

  /**
   * Backup oluşturur
   */

  /**
   * Backup'ı geri yükler
   */

  /**
   * Admin istatistiklerini getirir
   */
  async getStats(): Promise<ApiResponse> {
    return this.getHttpClient().get('/admin/stats');
  }

  /**
   * Queue istatistiklerini getirir
   */
  async getQueueStats(): Promise<ApiResponse> {
    return this.getHttpClient().get('/admin/queue/stats');
  }

  /**
   * Queue'yu duraklatır
   */
  async pauseQueue(): Promise<ApiResponse> {
    return this.getHttpClient().post('/admin/queue/pause');
  }

  /**
   * Queue'yu devam ettirir
   */
  async resumeQueue(): Promise<ApiResponse> {
    return this.getHttpClient().post('/admin/queue/resume');
  }

  /**
   * Queue'yu temizler
   */
  async cleanQueue(type: string = 'completed'): Promise<ApiResponse> {
    return this.getHttpClient().post('/admin/queue/clean', { type });
  }

  /**
   * Cron job durumunu getirir
   */
  async getCronStatus(): Promise<ApiResponse> {
    return this.getHttpClient().get('/admin/cron/status');
  }

  /**
   * Belirli bir cron job'ı başlatır
   */
  async startCron(jobName: string): Promise<ApiResponse> {
    if (!jobName) {
      throw new Error('Job adı boş olamaz');
    }
    
    return this.getHttpClient().post(`/admin/cron/${jobName}/start`);
  }

  /**
   * Belirli bir cron job'ı durdurur
   */
  async stopCron(jobName: string): Promise<ApiResponse> {
    if (!jobName) {
      throw new Error('Job adı boş olamaz');
    }
    
    return this.getHttpClient().post(`/admin/cron/${jobName}/stop`);
  }

  /**
   * Günlük sıfırlama işlemini tetikler
   */
  async triggerDailyReset(): Promise<ApiResponse> {
    return this.getHttpClient().post('/admin/cron/trigger/daily-reset');
  }

  /**
   * Sistem bilgilerini getirir
   */
  async getSystemInfo(): Promise<ApiResponse> {
    return this.getHttpClient().get('/admin/system/info');
  }

  async getBackup(key: string): Promise<ApiResponse> {
    if (!key || key.trim() === '') {
      throw new ValidationException('Backup key boş olamaz');
    }
    
    return this.getHttpClient().get('/admin/system/backup', { key });
  }

  async getRestore(key: string, backup: string | null = null, tables: string | null = null): Promise<ApiResponse> {
    if (!key || key.trim() === '') {
      throw new ValidationException('Backup key boş olamaz');
    }
    
    const params: any = { key };
    if (backup) {
      params.backup = backup;
    }
    if (tables) {
      params.tables = tables;
    }
    
    return this.getHttpClient().get('/admin/system/restore', params);
  }

  /**
   * Aylık sıfırlama cron işlemini tetikler
   */
  async triggerMonthlyReset(): Promise<ApiResponse> {
    return this.getHttpClient().post('/admin/cron/trigger/monthly-reset');
  }

  /**
   * Sistem backup bilgilerini getirir
   */
  async getBackup(key: string): Promise<ApiResponse> {
    return this.getHttpClient().get('/admin/system/backup', { key });
  }

  /**
   * Sistem restore bilgilerini getirir
   */
  async getRestore(key: string, backup: string | null = null, tables: string | null = null): Promise<ApiResponse> {
    const params: any = { key };
    if (backup) params.backup = backup;
    if (tables) params.tables = tables;
    
    return this.getHttpClient().get('/admin/system/restore', params);
  }
}
