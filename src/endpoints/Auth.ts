import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ApiResponse,
} from '../types';

/**
 * Auth - Kimlik doğrulama endpoint'leri
 * 
 * Bu sınıf kullanıcı kaydı, giriş, şifre sıfırlama, email/telefon doğrulama,
 * OTP işlemleri ve profil yönetimi için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const auth = zapi.auth;
 * const login = await auth.login('user@example.com', 'password');
 * zapi.setBearerToken(login.data.token);
 */
export class Auth extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Kullanıcı kaydı yapar
   */
  async register(data: any): Promise<ApiResponse> {
    // Orijinal API'ye uygun header ekle
    const headers: any = {};
    if (data.appId) {
      headers['x-app-id'] = data.appId;
      delete data.appId; // Header'a ekledikten sonra data'dan çıkar
    }
    
    return this.getHttpClient().post('/auth/register', data, headers);
  }

  /**
   * Kullanıcı girişi yapar
   */
  async login(email: string | null = null, phone: string | null = null, password: string, options: any = {}): Promise<ApiResponse> {
    const data: any = { password, ...options };
    
    if (email) {
      data.email = email;
    }
    
    if (phone) {
      data.phone = phone;
    }
    
    // Orijinal API'ye uygun header ekle
    const headers: any = {};
    if (options.appId) {
      headers['x-app-id'] = options.appId;
      delete data.appId; // Header'a ekledikten sonra data'dan çıkar
    }
    
    return this.getHttpClient().post('/auth/login', data, headers);
  }

  /**
   * Email veya telefon doğrulama kodu gönderir
   */
  async sendVerification(email: string | null, phone: string | null, type: string): Promise<ApiResponse> {
    return this.getHttpClient().post('/auth/send-verification', {
      email,
      phone,
      type,
    });
  }

  /**
   * Email doğrulama token ile doğrulama yapar
   */
  async verifyEmail(token: string): Promise<ApiResponse> {
    return this.getHttpClient().post('/auth/verify-email', {
      token,
    });
  }

  /**
   * Genel doğrulama işlemi yapar
   */
  async verify(email: string | null, phone: string | null, code: string, type: string): Promise<ApiResponse> {
    return this.getHttpClient().post('/auth/verify', {
      email,
      phone,
      code,
      type,
    });
  }

  /**
   * Şifre sıfırlama isteği gönderir
   */

  /**
   * Şifre sıfırlama işlemini tamamlar
   */
  async forgotPassword(email: string | null = null, phone: string | null = null): Promise<ApiResponse> {
    const data: any = {};
    
    if (email) {
      data.email = email;
    }
    
    if (phone) {
      data.phone = phone;
    }
    
    return this.getHttpClient().post('/auth/forgot-password', data);
  }

  async resetPassword(code: string, newPassword: string): Promise<ApiResponse> {
    return this.getHttpClient().post('/auth/reset-password', {
      code,
      newPassword,
    });
  }

  /**
   * Şifre değiştirme işlemi yapar
   */

  /**
   * OTP (One-Time Password) gönderir
   */
  async sendOTP(mail: string | null = null, phone: string | null = null, phonePrefix: string = '90', firstName: string = '', lastName: string = '', name: string = '', surname: string = '', appId: string | null = null): Promise<ApiResponse> {
    const data: any = {};
    
    if (mail) {
      data.mail = mail;
    }
    
    if (phone) {
      data.phone = phone;
      data.phonePrefix = phonePrefix;
    }
    
    if (firstName) {
      data.firstName = firstName;
    }
    
    if (lastName) {
      data.lastName = lastName;
    }
    
    if (name) {
      data.name = name;
    }
    
    if (surname) {
      data.surname = surname;
    }
    
    // Orijinal API'ye uygun header ekle
    const headers: any = {};
    if (appId) {
      headers['x-app-id'] = appId;
    }
    
    return this.getHttpClient().post('/auth/otp', data, headers);
  }

  /**
   * OTP doğrulama işlemi yapar
   */
  async verifyOTP(phone: string | null = null, phonePrefix: string | null = null, email: string | null = null, otpCode: string): Promise<ApiResponse> {
    const data: any = { otpCode };
    
    if (phone) {
      data.phone = phone;
    }
    
    if (phonePrefix !== null) {
      data.phonePrefix = phonePrefix;
    }
    
    if (email) {
      data.email = email;
    }
    
    return this.getHttpClient().post('/auth/otp-verify', data);
  }

  /**
   * Token yenileme işlemi yapar
   */
  async getProfile(): Promise<ApiResponse> {
    return this.getHttpClient().get('/auth/profile');
  }

  async updateProfile(data: any): Promise<ApiResponse> {
    return this.getHttpClient().put('/auth/profile', data);
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse> {
    return this.getHttpClient().post('/auth/refresh', {
      refreshToken,
    });
  }

  /**
   * Kullanıcı çıkışı yapar
   */
  async logout(): Promise<ApiResponse> {
    return this.getHttpClient().get('/auth/logout');
  }

  /**
   * JWT token doğrulama işlemi yapar
   */
  async verifyToken(token: string): Promise<ApiResponse> {
    return this.getHttpClient().post('/auth/verify-token', {
      token,
    });
  }

  /**
   * Şifre değiştirme işlemi yapar
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    return this.getHttpClient().post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  /**
   * Token yenileme işlemi yapar
   */
  async refresh(refreshToken: string): Promise<ApiResponse> {
    return this.getHttpClient().post('/auth/refresh', {
      refreshToken,
    });
  }

  /**
   * Auth servisi sağlık kontrolü
   */
  async health(): Promise<ApiResponse> {
    return this.getHttpClient().get('/auth/health');
  }
}
