import { HttpClient } from './http/HttpClient';
import { ZAPIConfig, DeviceInfo, HttpClientConfig } from './types';
import { ZAPIException } from './exceptions';

// Endpoint imports
import { Auth } from './endpoints/Auth';
import { User } from './endpoints/User';
import { Admin } from './endpoints/Admin';
import { Apps } from './endpoints/Apps';
import { AIProvider } from './endpoints/AIProvider';
import { APIKeys } from './endpoints/APIKeys';
import { Audio } from './endpoints/Audio';
import { AuthFirebase } from './endpoints/AuthFirebase';
import { AuthOAuth } from './endpoints/AuthOAuth';
import { Backup } from './endpoints/Backup';
import { Config } from './endpoints/Config';
import { Content } from './endpoints/Content';
import { Debug } from './endpoints/Debug';
import { Docs } from './endpoints/Docs';
import { Embeddings } from './endpoints/Embeddings';
import { Images } from './endpoints/Images';
import { Info } from './endpoints/Info';
import { Logs } from './endpoints/Logs';
import { MailTemplates } from './endpoints/MailTemplates';
import { Notifications } from './endpoints/Notifications';
import { Plans } from './endpoints/Plans';
import { Realtime } from './endpoints/Realtime';
import { Roles } from './endpoints/Roles';
import { Subscription } from './endpoints/Subscription';
import { System } from './endpoints/System';
import { Upload } from './endpoints/Upload';
import { Responses } from './endpoints/Responses';
import { Webhook } from './endpoints/Webhook';
import { Functions } from './endpoints/Functions';
import { OAuthMetadata } from './endpoints/OAuthMetadata';
import { Metadata } from './endpoints/Metadata';
import { Video } from './endpoints/Video';
import { Users } from './endpoints/Users';
import { Logger } from './endpoints/Logger';
import { AppleTest } from './endpoints/AppleTest';

/**
 * ZAPI React Native SDK - Ana sınıf
 * 
 * Bu sınıf ZAPI servislerine erişim için ana giriş noktasıdır.
 * Tüm endpoint sınıflarına erişim sağlar ve HTTP client'ı yönetir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const zapi = new ZAPI({
 *   apiKey: 'your_api_key',
 *   appId: 'your_app_id'
 * });
 * 
 * const profile = await zapi.user.getProfile();
 */
export class ZAPI {
  private config: ZAPIConfig;
  private httpClient: HttpClient;
  private deviceInfo?: DeviceInfo;

  // Endpoint instances
  public auth!: Auth;
  public user!: User;
  public admin!: Admin;
  public apps!: Apps;
  public aiProvider!: AIProvider;
  public apiKeys!: APIKeys;
  public audio!: Audio;
  public authFirebase!: AuthFirebase;
  public authOAuth!: AuthOAuth;
  public backup!: Backup;
  public configEndpoint!: Config;
  public content!: Content;
  public debugEndpoint!: Debug;
  public docs!: Docs;
  public embeddings!: Embeddings;
  public images!: Images;
  public info!: Info;
  public logs!: Logs;
  public mailTemplates!: MailTemplates;
  public notifications!: Notifications;
  public plans!: Plans;
  public realtime!: Realtime;
  public roles!: Roles;
  public subscription!: Subscription;
  public system!: System;
  public upload!: Upload;
  public responses!: Responses;
  public webhook!: Webhook;
  public functions!: Functions;
  public oauthMetadata!: OAuthMetadata;
  public metadata!: Metadata;
  public video!: Video;
  public users!: Users;
  public logger!: Logger;
  public appleTest!: AppleTest;

  constructor(apiKey: string, appId: string, baseUrl?: string, options: any = {}) {
    if (!apiKey || apiKey.trim() === '') {
      throw new ZAPIException('API anahtarı boş olamaz', 'INVALID_API_KEY');
    }
    
    if (!appId || appId.trim() === '') {
      throw new ZAPIException('Uygulama ID\'si boş olamaz', 'INVALID_APP_ID');
    }
    
    this.config = {
      apiKey,
      appId,
      baseUrl: baseUrl || 'https://dev.zulficoresystem.net',
      timeout: options.timeout || 30,
      debug: options.debug || false,
      bearerToken: options.bearerToken,
      storage: options.storage,
    };

    this.deviceInfo = options.deviceInfo;
    this.httpClient = this.createHttpClient();
    this.initializeEndpoints();
  }


  /**
   * HTTP client'ı oluşturur
   */
  private createHttpClient(): HttpClient {
    const httpConfig: HttpClientConfig = {
      baseUrl: this.config.baseUrl!,
      apiKey: this.config.apiKey,
      appId: this.config.appId,
      timeout: this.config.timeout!,
      debug: this.config.debug!,
    };
    
    if (this.config.bearerToken !== undefined) {
      httpConfig.bearerToken = this.config.bearerToken;
    }

    return new HttpClient(httpConfig, this.deviceInfo);
  }

  /**
   * Endpoint sınıflarını başlatır
   */
  private initializeEndpoints(): void {
    this.auth = new Auth(this);
    this.user = new User(this);
    this.admin = new Admin(this);
    this.apps = new Apps(this);
    this.aiProvider = new AIProvider(this);
    this.apiKeys = new APIKeys(this);
    this.audio = new Audio(this);
    this.authFirebase = new AuthFirebase(this);
    this.authOAuth = new AuthOAuth(this);
    this.backup = new Backup(this);
    this.configEndpoint = new Config(this);
    this.content = new Content(this);
    this.debugEndpoint = new Debug(this);
    this.docs = new Docs(this);
    this.embeddings = new Embeddings(this);
    this.images = new Images(this);
    this.info = new Info(this);
    this.logs = new Logs(this);
    this.mailTemplates = new MailTemplates(this);
    this.notifications = new Notifications(this);
    this.plans = new Plans(this);
    this.realtime = new Realtime(this);
    this.roles = new Roles(this);
    this.subscription = new Subscription(this);
    this.system = new System(this);
    this.upload = new Upload(this);
    this.responses = new Responses(this);
    this.webhook = new Webhook(this);
    this.functions = new Functions(this);
    this.oauthMetadata = new OAuthMetadata(this);
    this.metadata = new Metadata(this);
    this.video = new Video(this);
    this.users = new Users(this);
    this.logger = new Logger(this);
    this.appleTest = new AppleTest(this);
  }

  /**
   * API anahtarını günceller
   */
  setApiKey(apiKey: string): this {
    if (!apiKey || apiKey.trim() === '') {
      throw new ZAPIException('API anahtarı boş olamaz', 'INVALID_API_KEY');
    }

    this.config.apiKey = apiKey;
    this.httpClient.setApiKey(apiKey);
    return this;
  }

  /**
   * Uygulama ID'sini günceller
   */
  setAppId(appId: string): this {
    if (!appId || appId.trim() === '') {
      throw new ZAPIException('Uygulama ID\'si boş olamaz', 'INVALID_APP_ID');
    }

    this.config.appId = appId;
    this.httpClient.setAppId(appId);
    return this;
  }

  /**
   * Base URL'i günceller
   */
  setBaseUrl(baseUrl: string): this {
    this.config.baseUrl = baseUrl;
    this.httpClient.setBaseUrl(baseUrl);
    return this;
  }

  /**
   * Bearer token'ı ayarlar
   */
  setBearerToken(bearerToken: string): this {
    this.config.bearerToken = bearerToken;
    this.httpClient.setBearerToken(bearerToken);
    return this;
  }

  /**
   * Debug modunu ayarlar
   */
  setDebug(debug: boolean): this {
    this.config.debug = debug;
    this.httpClient.setDebug(debug);
    return this;
  }

  /**
   * Timeout süresini ayarlar
   */
  setTimeout(timeout: number): this {
    if (timeout <= 0) {
      throw new ZAPIException('Timeout süresi 0\'dan büyük olmalıdır', 'INVALID_TIMEOUT');
    }

    this.config.timeout = timeout;
    this.httpClient.setTimeout(timeout);
    return this;
  }

  /**
   * Device info'yu günceller
   */
  setDeviceInfo(deviceInfo: DeviceInfo): this {
    this.deviceInfo = deviceInfo;
    this.httpClient.setDeviceInfo(deviceInfo);
    return this;
  }

  /**
   * Storage provider'ı ayarlar
   */
  setStorage(storage: ZAPIConfig['storage']): this {
    if (storage !== undefined) {
      this.config.storage = storage;
    }
    return this;
  }

  /**
   * Mevcut API anahtarını döndürür
   */
  getApiKey(): string {
    return this.config.apiKey;
  }

  /**
   * Mevcut Bearer token'ı döndürür
   */
  getBearerToken(): string | undefined {
    return this.config.bearerToken;
  }

  /**
   * Mevcut uygulama ID'sini döndürür
   */
  getAppId(): string {
    return this.config.appId;
  }

  /**
   * Mevcut base URL'i döndürür
   */
  getBaseUrl(): string {
    return this.config.baseUrl!;
  }

  /**
   * Debug modunun aktif olup olmadığını kontrol eder
   */
  isDebugMode(): boolean {
    return this.config.debug!;
  }

  /**
   * Mevcut timeout süresini döndürür
   */
  getTimeout(): number {
    return this.config.timeout!;
  }

  /**
   * Device info'yu döndürür
   */
  getDeviceInfo(): DeviceInfo | undefined {
    return this.deviceInfo;
  }

  /**
   * HTTP client'ı ayarlar
   */
  setHttpClient(client: HttpClient): this {
    this.httpClient = client;
    return this;
  }

  /**
   * HTTP client'ı döndürür
   */
  getHttpClient(): HttpClient {
    return this.httpClient;
  }

  /**
   * SDK versiyonunu döndürür
   */
  static getVersion(): string {
    return '1.0.0';
  }

  /**
   * SDK bilgilerini döndürür
   */
  getInfo(): {
    version: string;
    baseUrl: string;
    appId: string;
    debug: boolean;
    timeout: number;
    deviceInfo?: DeviceInfo;
    endpoints: string[];
  } {
    const result: {
      version: string;
      baseUrl: string;
      appId: string;
      debug: boolean;
      timeout: number;
      deviceInfo?: DeviceInfo;
      endpoints: string[];
    } = {
      version: ZAPI.getVersion(),
      baseUrl: this.config.baseUrl!,
      appId: this.config.appId,
      debug: this.config.debug!,
      timeout: this.config.timeout!,
      endpoints: [
        'auth', 'user', 'admin', 'apps', 'aiProvider', 'apiKeys',
        'audio', 'authFirebase', 'authOAuth', 'backup', 'config',
        'content', 'debug', 'docs', 'embeddings', 'images', 'info',
        'logs', 'mailTemplates', 'notifications', 'plans', 'realtime',
        'roles', 'subscription', 'system', 'upload', 'responses',
        'webhook', 'functions', 'oauthMetadata', 'metadata', 'video',
        'users', 'logger', 'appleTest'
      ]
    };
    
    if (this.deviceInfo !== undefined) {
      result.deviceInfo = this.deviceInfo;
    }
    
    return result;
  }

  /**
   * Konfigürasyonu döndürür (güvenlik için hassas bilgileri maskeleyerek)
   */
  getConfig(): Omit<ZAPIConfig, 'apiKey' | 'bearerToken'> & {
    apiKey: string;
    bearerToken?: string;
  } {
    const maskedApiKey = this.config.apiKey.substring(0, 8) + '...';
    const maskedBearerToken = this.config.bearerToken 
      ? this.config.bearerToken.substring(0, 20) + '...' 
      : undefined;

    const result: Omit<ZAPIConfig, 'apiKey' | 'bearerToken'> & {
      apiKey: string;
      bearerToken?: string;
    } = {
      ...this.config,
      apiKey: maskedApiKey,
    };
    
    if (maskedBearerToken !== undefined) {
      result.bearerToken = maskedBearerToken;
    }
    
    return result;
  }

  /**
   * SDK'yı temizler ve kaynakları serbest bırakır
   */
  async cleanup(): Promise<void> {
    // WebSocket bağlantılarını kapat
    if (this.realtime) {
      // Realtime endpoint'inde disconnect metodu varsa çağır
      if (typeof (this.realtime as any).disconnect === 'function') {
        await (this.realtime as any).disconnect();
      }
    }

    // Storage'dan token'ları temizle (opsiyonel)
    if (this.config.storage) {
      try {
        await this.config.storage.removeItem('zapi_bearer_token');
        await this.config.storage.removeItem('zapi_refresh_token');
      } catch (error) {
        // Storage hatalarını sessizce geç
      }
    }
  }
}
