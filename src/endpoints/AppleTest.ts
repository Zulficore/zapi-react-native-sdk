import { BaseEndpoint } from './BaseEndpoint';
import { ApiResponse } from '../types/ApiResponse';
import { ValidationException } from '../exceptions/ValidationException';

/**
 * AppleTest Endpoint
 * 
 * Bu sınıf Apple test işlemlerini yönetir.
 */
export class AppleTest extends BaseEndpoint {
  /**
   * Apple test sayfasını getirir
   * 
   * Bu metod Apple test sayfasını getirir.
   * 
   * @returns Promise<ApiResponse> Apple test sayfası
   * @throws ValidationException Geçersiz parametre
   * @throws ZAPIException Sunucu hatası
   * 
   * @example
   * const page = await zapi.appleTest.get();
   * console.log('Apple test sayfası:', page.data.html);
   */
  async get(): Promise<ApiResponse> {
    return this.getHttpClient().get('/apple-test');
  }

  /**
   * Apple test sayfasını getirir
   * 
   * Bu metod Apple test sayfasını getirir.
   * 
   * @returns Promise<ApiResponse> Apple test sayfası
   * @throws ValidationException Geçersiz parametre
   * @throws ZAPIException Sunucu hatası
   * 
   * @example
   * const page = await zapi.appleTest.getTest();
   * console.log('Apple test sayfası:', page.data.html);
   */
  async getTest(): Promise<ApiResponse> {
    return this.getHttpClient().get('/apple-test/test');
  }

  /**
   * Apple konfigürasyonunu ayarlar
   * 
   * Bu metod Apple konfigürasyonunu ayarlar.
   * 
   * @param data Konfigürasyon verileri
   * @returns Promise<ApiResponse> Konfigürasyon sonucu
   * @throws ValidationException Geçersiz parametre
   * @throws ZAPIException Sunucu hatası
   * 
   * @example
   * const config = await zapi.appleTest.setConfig({
   *   clientId: 'your_client_id',
   *   teamId: 'your_team_id'
   * });
   * console.log('Konfigürasyon ayarlandı:', config.data.message);
   */
  async setConfig(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/apple-test/config', data);
  }

  /**
   * Apple URL oluşturur
   * 
   * Bu metod Apple URL oluşturur.
   * 
   * @param data URL verileri
   * @returns Promise<ApiResponse> URL sonucu
   * @throws ValidationException Geçersiz parametre
   * @throws ZAPIException Sunucu hatası
   * 
   * @example
   * const url = await zapi.appleTest.generateUrl({
   *   redirectUri: 'https://example.com/callback'
   * });
   * console.log('Apple URL:', url.data.url);
   */
  async generateUrl(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/apple-test/generate-url', data);
  }

  /**
   * Apple secret test eder
   * 
   * Bu metod Apple secret test eder.
   * 
   * @param data Secret verileri
   * @returns Promise<ApiResponse> Test sonucu
   * @throws ValidationException Geçersiz parametre
   * @throws ZAPIException Sunucu hatası
   * 
   * @example
   * const test = await zapi.appleTest.testSecret({
   *   clientSecret: 'your_client_secret'
   * });
   * console.log('Secret test sonucu:', test.data.message);
   */
  async testSecret(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/apple-test/test-secret', data);
  }

  /**
   * Apple callback işlemi yapar
   * 
   * Bu metod Apple callback işlemi yapar.
   * 
   * @param data Callback verileri
   * @returns Promise<ApiResponse> Callback sonucu
   * @throws ValidationException Geçersiz parametre
   * @throws ZAPIException Sunucu hatası
   * 
   * @example
   * const callback = await zapi.appleTest.handleCallback({
   *   code: 'authorization_code',
   *   state: 'state_value'
   * });
   * console.log('Callback işlemi:', callback.data.message);
   */
  async handleCallback(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/apple-test/callback', data);
  }

  /**
   * Apple token değişimi yapar
   * 
   * Bu metod Apple token değişimi yapar.
   * 
   * @param data Token verileri
   * @returns Promise<ApiResponse> Token sonucu
   * @throws ValidationException Geçersiz parametre
   * @throws ZAPIException Sunucu hatası
   * 
   * @example
   * const token = await zapi.appleTest.exchangeToken({
   *   code: 'authorization_code',
   *   clientId: 'your_client_id'
   * });
   * console.log('Token:', token.data.access_token);
   */
  async exchangeToken(data: any): Promise<ApiResponse> {
    return this.getHttpClient().post('/apple-test/exchange-token', data);
  }
}
