import {
  HttpClientConfig,
  RequestOptions,
  ApiResponse,
  DeviceInfo,
} from '../types';
import {
  ZAPIException,
  AuthenticationException,
  ValidationException,
  RateLimitException,
  ServerException,
} from '../exceptions';

/**
 * HTTP Client - ZAPI API istekleri için HTTP client wrapper
 * 
 * Bu sınıf ZAPI API'sine HTTP istekleri göndermek için kullanılır.
 * React Native için optimize edilmiştir ve fetch API'sini kullanır.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const client = new HttpClient({
 *   baseUrl: 'https://api.example.com',
 *   apiKey: 'your_api_key',
 *   appId: 'your_app_id'
 * });
 * 
 * const response = await client.get('/user/profile');
 */
export class HttpClient {
  private config: HttpClientConfig;
  private defaultHeaders: Record<string, string>;
  private deviceInfo?: DeviceInfo;

  constructor(config: HttpClientConfig, deviceInfo?: DeviceInfo) {
    this.config = config;
    this.deviceInfo = deviceInfo;
    this.defaultHeaders = this.buildDefaultHeaders();
  }

  /**
   * Default headers'ları oluşturur
   */
  private buildDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'User-Agent': `ZAPI-ReactNative-SDK/1.0.0`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': this.config.apiKey,
      'x-app-id': this.config.appId,
    };

    // Bearer token varsa Authorization header'ına ekle
    if (this.config.bearerToken) {
      headers['Authorization'] = `Bearer ${this.config.bearerToken}`;
    }

    // Device info varsa ekle
    if (this.deviceInfo) {
      headers['x-device-id'] = this.deviceInfo.deviceId;
      headers['x-device-type'] = this.deviceInfo.deviceType;
      headers['x-app-version'] = this.deviceInfo.appVersion;
    }

    return headers;
  }

  /**
   * URL oluşturur
   */
  private buildUrl(endpoint: string, query?: Record<string, any>): string {
    let url = `${this.config.baseUrl}/${endpoint.replace(/^\//, '')}`;

    if (query && Object.keys(query).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    return url;
  }

  /**
   * HTTP yanıtını kontrol eder ve uygun exception'ı fırlatır
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const statusCode = response.status;
    let responseData: any;

    try {
      const text = await response.text();
      responseData = text ? JSON.parse(text) : {};
    } catch (error) {
      responseData = { message: 'Invalid JSON response' };
    }

    // Başarılı yanıtlar
    if (statusCode >= 200 && statusCode < 300) {
      return responseData;
    }

    // Hata mesajını çıkar
    const message = responseData.message || responseData.error || 'Bilinmeyen hata';
    const code = responseData.code || statusCode;

    // HTTP status koduna göre uygun exception'ı fırlat
    switch (statusCode) {
      case 400:
        throw new ValidationException(
          message,
          code,
          responseData,
          statusCode
        );
      case 401:
        throw new AuthenticationException(
          message,
          code,
          responseData,
          statusCode
        );
      case 429:
        throw new RateLimitException(
          message,
          code,
          responseData,
          statusCode
        );
      case 500:
      case 502:
      case 503:
      case 504:
        throw new ServerException(
          message,
          code,
          responseData,
          statusCode
        );
      default:
        throw new ZAPIException(
          message,
          code,
          responseData,
          statusCode
        );
    }
  }

  /**
   * Fetch isteği gönderir
   */
  private async sendRequest<T>(
    url: string,
    options: RequestInit,
    requestOptions?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const timeout = requestOptions?.timeout || this.config.timeout;
    const headers = { ...this.defaultHeaders, ...options.headers };

    // Timeout için AbortController kullan
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout * 1000);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return await this.handleResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ZAPIException(
            'İstek zaman aşımına uğradı',
            'TIMEOUT_ERROR',
            null,
            408
          );
        }

        if (error.message.includes('Network request failed')) {
          throw new ZAPIException(
            'Ağ bağlantı hatası',
            'NETWORK_ERROR',
            null,
            0
          );
        }

        throw new ZAPIException(
          `İstek hatası: ${error.message}`,
          'REQUEST_ERROR',
          null,
          0
        );
      }

      throw error;
    }
  }

  /**
   * GET isteği gönderir
   */
  async get<T>(
    endpoint: string,
    query?: Record<string, any>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint, query);
    return this.sendRequest<T>(url, { method: 'GET' }, options);
  }

  /**
   * POST isteği gönderir
   */
  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const body = data ? JSON.stringify(data) : undefined;

    return this.sendRequest<T>(
      url,
      {
        method: 'POST',
        body,
      },
      options
    );
  }

  /**
   * PUT isteği gönderir
   */
  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const body = data ? JSON.stringify(data) : undefined;

    return this.sendRequest<T>(
      url,
      {
        method: 'PUT',
        body,
      },
      options
    );
  }

  /**
   * PATCH isteği gönderir
   */
  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const body = data ? JSON.stringify(data) : undefined;

    return this.sendRequest<T>(
      url,
      {
        method: 'PATCH',
        body,
      },
      options
    );
  }

  /**
   * DELETE isteği gönderir
   */
  async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    return this.sendRequest<T>(url, { method: 'DELETE' }, options);
  }

  /**
   * Multipart form data ile POST isteği gönderir
   */
  async postMultipart<T>(
    endpoint: string,
    data: Record<string, any>,
    files: Record<string, { uri: string; type: string; name: string }>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const formData = new FormData();

    // Normal verileri ekle
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // Dosyaları ekle
    Object.entries(files).forEach(([key, file]) => {
      formData.append(key, {
        uri: file.uri,
        type: file.type,
        name: file.name,
      } as any);
    });

    // Content-Type header'ını kaldır (FormData otomatik ayarlar)
    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type'];

    return this.sendRequest<T>(
      url,
      {
        method: 'POST',
        body: formData,
        headers,
      },
      options
    );
  }

  /**
   * API anahtarını günceller
   */
  setApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
    this.defaultHeaders['x-api-key'] = apiKey;
  }

  /**
   * Bearer token'ı günceller
   */
  setBearerToken(bearerToken: string): void {
    this.config.bearerToken = bearerToken;
    this.defaultHeaders['Authorization'] = `Bearer ${bearerToken}`;
  }

  /**
   * Uygulama ID'sini günceller
   */
  setAppId(appId: string): void {
    this.config.appId = appId;
    this.defaultHeaders['x-app-id'] = appId;
  }

  /**
   * Base URL'i günceller
   */
  setBaseUrl(baseUrl: string): void {
    this.config.baseUrl = baseUrl.replace(/\/$/, '');
  }

  /**
   * Timeout süresini günceller
   */
  setTimeout(timeout: number): void {
    this.config.timeout = timeout;
  }

  /**
   * Debug modunu günceller
   */
  setDebug(debug: boolean): void {
    this.config.debug = debug;
  }

  /**
   * Mevcut konfigürasyonu döndürür
   */
  getConfig(): HttpClientConfig {
    return { ...this.config };
  }

  /**
   * Device info'yu günceller
   */
  setDeviceInfo(deviceInfo: DeviceInfo): void {
    this.deviceInfo = deviceInfo;
    this.defaultHeaders['x-device-id'] = deviceInfo.deviceId;
    this.defaultHeaders['x-device-type'] = deviceInfo.deviceType;
    this.defaultHeaders['x-app-version'] = deviceInfo.appVersion;
  }
}
