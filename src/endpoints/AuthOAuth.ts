import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse } from '../types';
import { ValidationException } from '../exceptions';

/**
 * AuthOAuth - OAuth 2.0 kimlik doğrulama endpoint'leri
 * 
 * Bu sınıf OAuth 2.0 tabanlı kimlik doğrulama işlemleri için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const authOAuth = zapi.authOAuth;
 * const login = await authOAuth.initiateGoogleLogin('app_id');
 */
export class AuthOAuth extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Google OAuth girişi başlatır
   */
  async initiateGoogleLogin(appId: string, options: any = {}): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('Uygulama ID\'si boş olamaz');
    }

    return this.getHttpClient().post('/auth/oauth/google/initiate', {
      appId,
      ...options
    });
  }

  /**
   * Apple OAuth girişi başlatır
   */
  async initiateAppleLogin(appId: string, options: any = {}): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('Uygulama ID\'si boş olamaz');
    }

    return this.getHttpClient().post('/auth/oauth/apple/initiate', {
      appId,
      ...options
    });
  }


  /**
   * Google OAuth callback işlemini tamamlar
   */
  async handleGoogleCallback(code: string, state: string, options: any = {}): Promise<ApiResponse> {
    if (!code || code.trim() === '') {
      throw new ValidationException('Authorization code boş olamaz');
    }

    return this.getHttpClient().post('/auth/oauth/google/callback', {
      code,
      state,
      ...options
    });
  }

  /**
   * Apple OAuth callback işlemini tamamlar
   */
  async handleAppleCallback(code: string, state: string, options: any = {}): Promise<ApiResponse> {
    if (!code || code.trim() === '') {
      throw new ValidationException('Authorization code boş olamaz');
    }

    return this.getHttpClient().post('/auth/oauth/apple/callback', {
      code,
      state,
      ...options
    });
  }




  /**
   * OAuth hesabını bağlar
   */
  async linkAccount(provider: string, accessToken: string, options: any = {}): Promise<ApiResponse> {
    if (!provider || provider.trim() === '') {
      throw new ValidationException('Provider boş olamaz');
    }

    if (!accessToken || accessToken.trim() === '') {
      throw new ValidationException('Access token boş olamaz');
    }

    return this.getHttpClient().post(`/auth/oauth/${provider}/link`, {
      accessToken,
      ...options
    });
  }

  /**
   * OAuth hesabının bağlantısını kaldırır
   */
  async unlinkAccount(provider: string): Promise<ApiResponse> {
    if (!provider || provider.trim() === '') {
      throw new ValidationException('Provider boş olamaz');
    }

    return this.getHttpClient().post(`/auth/oauth/${provider}/unlink`);
  }

  /**
   * OAuth başarı sayfasını getirir
   */
  async getSuccessPage(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/auth/oauth/success', options);
  }

  /**
   * OAuth hata sayfasını getirir
   */
  async getErrorPage(options: any = {}): Promise<ApiResponse> {
    return this.getHttpClient().get('/auth/oauth/error', options);
  }

  /**
   * OAuth sandbox test yapar
   */
  async sandboxTest(provider: string): Promise<ApiResponse> {
    if (!provider || provider.trim() === '') {
      throw new ValidationException('Provider boş olamaz');
    }

    return this.getHttpClient().post(`/auth/oauth/${provider}/sandbox-test`);
  }

  /**
   * OAuth debug bilgilerini getirir
   */
  async getDebugInfo(provider: string): Promise<ApiResponse> {
    if (!provider || provider.trim() === '') {
      throw new ValidationException('Provider boş olamaz');
    }

    return this.getHttpClient().get(`/auth/oauth/${provider}/debug`);
  }

  /**
   * OAuth metadata bilgilerini getirir
   */
  async getMetadata(appId: string, path: string = ''): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('App ID boş olamaz');
    }

    const endpoint = path ? `/auth/oauth/${appId}/metadata/${path}` : `/auth/oauth/${appId}/metadata`;
    return this.getHttpClient().get(endpoint);
  }

  /**
   * OAuth metadata bilgilerini günceller
   */
  async updateMetadata(appId: string, path: string, value: any): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('App ID boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Path boş olamaz');
    }

    return this.getHttpClient().put(`/auth/oauth/${appId}/metadata/${path}`, { value });
  }

  /**
   * OAuth metadata bilgilerini kısmi günceller
   */
  async patchMetadata(appId: string, path: string, value: any): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('App ID boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Path boş olamaz');
    }

    return this.getHttpClient().patch(`/auth/oauth/${appId}/metadata/${path}`, { value });
  }

  /**
   * OAuth metadata bilgilerini siler
   */
  async deleteMetadata(appId: string, path: string): Promise<ApiResponse> {
    if (!appId || appId.trim() === '') {
      throw new ValidationException('App ID boş olamaz');
    }

    if (!path || path.trim() === '') {
      throw new ValidationException('Path boş olamaz');
    }

    return this.getHttpClient().delete(`/auth/oauth/${appId}/metadata/${path}`);
  }

  /**
   * OAuth sağlayıcılarını getirir
   */
  async getProviders(appId: string): Promise<ApiResponse> {
    return this.getHttpClient().get(`/auth/oauth/providers/${appId}`);
  }

  /**
   * OAuth URL oluşturur
   */
  async generateUrl(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/auth/oauth/generate-url', data);
  }

  /**
   * OAuth secret test eder
   */
  async testSecret(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/auth/oauth/test-secret', data);
  }
}
