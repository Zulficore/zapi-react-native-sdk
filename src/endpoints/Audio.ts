import { BaseEndpoint } from './BaseEndpoint';
import { ZAPI } from '../ZAPI';
import { ApiResponse, ValidationException, ZAPIException } from '../types';

/**
 * Audio - Ses işleme endpoint'leri
 * 
 * Bu sınıf ses işleme, text-to-speech, speech-to-text ve
 * ses çeviri işlemleri için endpoint'leri içerir.
 * 
 * @package ZAPI
 * @version 1.0.0
 * @author ZAPI Team
 * 
 * @example
 * const audio = zapi.audio;
 * const speech = await audio.textToSpeech('Merhaba dünya', 'tr-TR');
 */
export class Audio extends BaseEndpoint {
  constructor(zapi: ZAPI) {
    super(zapi);
  }

  /**
   * Metni sese dönüştürür
   */
  async speech(data: any): Promise<ApiResponse> {
    if (!data.input || data.input.trim() === '') {
      throw new ValidationException('Input boş olamaz');
    }

    return this.getHttpClient().post('/audio/speech', data);
  }

  /**
   * Sesi metne dönüştürür (Henüz implement edilmemiş)
   */
  async transcriptions(data: any): Promise<ApiResponse> {
    if (!data.file) {
      throw new ValidationException('File boş olamaz');
    }

    return this.getHttpClient().post('/audio/transcriptions', data);
  }

  /**
   * Ses çevirisi yapar (Henüz implement edilmemiş)
   */
  async translations(data: any): Promise<ApiResponse> {
    if (!data.file) {
      throw new ValidationException('File boş olamaz');
    }

    return this.getHttpClient().post('/audio/translations', data);
  }
}
