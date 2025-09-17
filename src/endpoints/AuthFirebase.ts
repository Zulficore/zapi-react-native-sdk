import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, ValidationException } from '../types';

/**
 * AuthFirebase - Firebase kimlik doğrulama endpoint'leri
 * 
 * Bu sınıf Firebase tabanlı kimlik doğrulama işlemleri için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const authFirebase = zapi.authFirebase;
 * const login = await authFirebase.loginWithGoogle('firebase_token');
 */
export class AuthFirebase extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Google ile Firebase girişi yapar
   */
  async loginWithGoogle(firebaseToken: string, options: any = {}): Promise<ApiResponse> {
    if (!firebaseToken || firebaseToken.trim() === '') {
      throw new ValidationException('Firebase token boş olamaz');
    }

    const data = {
      idToken: firebaseToken,
      ...options
    };

    // Orijinal API'ye uygun header ekle
    const headers: any = {};
    if (options.appId) {
      headers['x-app-id'] = options.appId;
      delete data.appId; // Header'a ekledikten sonra data'dan çıkar
    }

    return this.getHttpClient().post('/auth/firebase/google', data, headers);
  }

  /**
   * Apple ile Firebase girişi yapar
   */
  async loginWithApple(firebaseToken: string, options: any = {}): Promise<ApiResponse> {
    if (!firebaseToken || firebaseToken.trim() === '') {
      throw new ValidationException('Firebase token boş olamaz');
    }

    return this.getHttpClient().post('/auth/firebase/apple', {
      idToken: firebaseToken,
      ...options
    });
  }

  /**
   * Firebase token'ı yeniler
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse> {
    if (!refreshToken || refreshToken.trim() === '') {
      throw new ValidationException('Refresh token boş olamaz');
    }

    return this.getHttpClient().post('/auth/firebase/refresh', {
      refreshToken
    });
  }

  /**
   * Firebase kullanıcı profilini günceller
   */
  async updateProfile(data: any): Promise<ApiResponse> {
    return this.getHttpClient().put('/auth/firebase/profile', data);
  }

  /**
   * Firebase çıkışı yapar
   */
  async logout(): Promise<ApiResponse> {
    return this.getHttpClient().post('/auth/firebase/logout');
  }

  /**
   * Firebase Admin SDK durumunu kontrol eder
   */
  async getSDKStatus(): Promise<ApiResponse> {
    return this.getHttpClient().get('/auth/firebase/sdk-status');
  }

  /**
   * Firebase debug bilgilerini getirir
   */
  async getDebugInfo(): Promise<ApiResponse> {
    return this.getHttpClient().get('/auth/firebase/debug');
  }

  /**
   * Firebase sağlık kontrolü yapar
   */
  async healthCheck(): Promise<ApiResponse> {
    return this.getHttpClient().get('/auth/firebase/health');
  }

  /**
   * Kullanıcı durumunu getirir
   */
  async getUserStatus(): Promise<ApiResponse> {
    return this.getHttpClient().get('/auth/firebase/user/status');
  }
}
