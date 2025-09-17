import { BaseEndpoint } from './BaseEndpoint';
import { ApiResponse } from '../types';

/**
 * Video Endpoint
 * 
 * Bu sınıf video analizi ve transkripsiyon işlemlerini yönetir.
 */
export class Video extends BaseEndpoint {
  /**
   * Video analizi yapar
   */
  async analyze(filePath: string, options: any = {}): Promise<ApiResponse> {
    if (!filePath) {
      throw new Error('Video dosya yolu boş olamaz');
    }
    
    const data = { filePath, ...options };
    return this.getHttpClient().post('/video/analyze', data);
  }

  /**
   * Video transkripsiyon yapar
   */
  async transcribe(filePath: string, options: any = {}): Promise<ApiResponse> {
    if (!filePath) {
      throw new Error('Video dosya yolu boş olamaz');
    }
    
    const data = { filePath, ...options };
    return this.getHttpClient().post('/video/transcribe', data);
  }
}
