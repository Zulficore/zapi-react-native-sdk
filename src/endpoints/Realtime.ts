import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, ListOptions, PaginatedResponse, ValidationException } from '../types';

/**
 * Realtime - Gerçek zamanlı sohbet endpoint'leri
 * 
 * Bu sınıf gerçek zamanlı sohbet oturumlarını yönetmek için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 */
export class Realtime extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Oturumları listeler
   */
  async getSessions(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/realtime/sessions', options);
  }

  /**
   * Oturumu devam ettirir
   */
  async resumeSession(sessionId: string): Promise<ApiResponse> {
    if (!sessionId || sessionId.trim() === '') {
      throw new ValidationException('Session ID\'si boş olamaz');
    }

    return this.getHttpClient().post(`/realtime/sessions/${sessionId}/resume`);
  }

  /**
   * Oturum geçmişini getirir
   */
  async getSessionHistory(sessionId: string, options: any = {}): Promise<ApiResponse> {
    if (!sessionId || sessionId.trim() === '') {
      throw new ValidationException('Session ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/realtime/sessions/${sessionId}/history`, options);
  }

  /**
   * Yeni oturum oluşturur
   */
  async createSession(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/realtime/sessions', data);
  }

  /**
   * Oturum detaylarını getirir
   */
  async getSession(sessionId: string): Promise<ApiResponse> {
    if (!sessionId || sessionId.trim() === '') {
      throw new ValidationException('Session ID\'si boş olamaz');
    }

    return this.getHttpClient().get(`/realtime/sessions/${sessionId}`);
  }

  /**
   * Oturumu siler
   */
  async deleteSession(sessionId: string): Promise<ApiResponse> {
    if (!sessionId || sessionId.trim() === '') {
      throw new ValidationException('Session ID\'si boş olamaz');
    }

    return this.getHttpClient().delete(`/realtime/sessions/${sessionId}`);
  }

  /**
   * Gerçek zamanlı modelleri listeler
   */
  async getModels(): Promise<ApiResponse> {
    return this.getHttpClient().get('/realtime/models');
  }

  /**
   * Stream bilgilerini getirir
   */
  async getStreamInfo(): Promise<ApiResponse> {
    return this.getHttpClient().get('/realtime/stream/info');
  }

  /**
   * Gerçek zamanlı istatistikleri getirir
   */
  async getStats(): Promise<ApiResponse> {
    return this.getHttpClient().get('/realtime/stats');
  }
}
