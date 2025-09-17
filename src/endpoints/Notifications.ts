import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, NotificationRequest, NotificationResponse, ListOptions, PaginatedResponse, ValidationException } from '../types';

/**
 * Notifications - Bildirim yönetimi endpoint'leri
 * 
 * Bu sınıf e-posta ve SMS bildirimleri göndermek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class Notifications extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Bildirim loglarını listeler
   */
  async list(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/notifications', options);
  }

  /**
   * E-posta bildirimi gönderir
   */
  async sendEmail(data: any): Promise<ApiResponse> {
    // Orijinal API'ye uygun header ekle
    const headers: any = {};
    if (data.appId) {
      headers['x-app-id'] = data.appId;
      delete data.appId; // Header'a ekledikten sonra data'dan çıkar
    }
    
    return this.getHttpClient().post('/notifications/email/send', data, headers);
  }

  /**
   * Toplu e-posta bildirimi gönderir
   */
  async sendBulkEmail(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/notifications/email/send-bulk', data);
  }

  /**
   * SMS bildirimi gönderir
   */
  async sendSMS(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/notifications/sms/send', data);
  }

  /**
   * Toplu SMS bildirimi gönderir
   */
  async sendBulkSMS(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/notifications/sms/send-bulk', data);
  }

  /**
   * Bildirim log detaylarını getirir
   */
  async getLog(logId: string): Promise<ApiResponse> {
    if (!logId || logId.trim() === '') {
      throw new ValidationException('Log ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/notifications/logs/${logId}`);
  }

  /**
   * Bildirim analitiğini getirir
   */
  async getAnalytics(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/notifications/analytics', options);
  }

  /**
   * Başarısız bildirimi yeniden dener
   */
  async retry(logId: string): Promise<ApiResponse> {
    if (!logId || logId.trim() === '') {
      throw new ValidationException('Log ID\'si boş olamaz');
    }

    return this.getHttpClient().post(`/notifications/retry/${logId}`);
  }

  /**
   * Bildirim ayarlarını getirir
   */
  async getSettings(): Promise<ApiResponse> {
    return this.getHttpClient().get('/notifications/settings');
  }

  /**
   * Bildirim ayarlarını günceller
   */
  async updateSettings(data: any): Promise<ApiResponse> {
    return this.getHttpClient().put('/notifications/settings', data);
  }

  /**
   * E-posta açılma takibini getirir
   */
  async trackEmail(trackingId: string): Promise<ApiResponse> {
    if (!trackingId || trackingId.trim() === '') {
      throw new ValidationException('Tracking ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/notifications/track/email/${trackingId}`);
  }

  /**
   * Bildirim takibini getirir
   */
  async track(logId: string): Promise<ApiResponse> {
    if (!logId || logId.trim() === '') {
      throw new ValidationException('Log ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/notifications/track/${logId}`);
  }
}
