# Video Endpoint - 2 Metod

Video işleme için kullanılan endpoint.

## Metodlar

### 1. generate(data: any): Promise<ApiResponse>
Video üretir.

**Parametreler:**
- `data` (any): Video üretim verileri
  - `prompt` (string): Video açıklaması
  - `duration` (number): Video süresi
  - `model` (string): Model adı

**Detaylı Örnek:**
```typescript
const generate = await zapi.video.generate({
  prompt: 'A cat playing with a ball',
  duration: 10,
  model: 'runway-gen2'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Video başarıyla üretildi",
  "data": {
    "video": {
      "id": "vid_64f8a1b2c3d4e5f6g7h8i9j0",
      "url": "https://api.zapi.com/videos/vid_64f8a1b2c3d4e5f6g7h8i9j0.mp4",
      "prompt": "A cat playing with a ball",
      "duration": 10,
      "model": "runway-gen2",
      "format": "mp4",
      "size": "25MB",
      "resolution": "1920x1080",
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 2. analyze(data: any): Promise<ApiResponse>
Video analiz eder.

**Parametreler:**
- `data` (any): Analiz verileri
  - `video` (string): Video URL'i
  - `analysis` (string): Analiz tipi

**Detaylı Örnek:**
```typescript
const analyze = await zapi.video.analyze({
  video: 'https://example.com/video.mp4',
  analysis: 'objects'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Video analizi tamamlandı",
  "data": {
    "analysis": {
      "id": "analysis_64f8a1b2c3d4e5f6g7h8i9j0",
      "type": "objects",
      "results": {
        "objects": [
          {
            "name": "person",
            "confidence": 0.95,
            "frames": [10, 20, 30],
            "bbox": [100, 200, 300, 400]
          }
        ],
        "scene": "indoor",
        "motion": "walking"
      },
      "duration": 30,
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

## Tam Örnek Kullanım

```typescript
import { ZAPI } from 'zapi-react-native-sdk';

const zapi = new ZAPI('your-api-key', 'your-app-id', 'https://api.zapi.com');

try {
  // 1. Video üret
  const generate = await zapi.video.generate({
    prompt: 'A cat playing with a ball',
    duration: 10,
    model: 'runway-gen2'
  });
  console.log('Video URL:', generate.data.video.url);
  console.log('Süre:', generate.data.video.duration);
  
  // 2. Video analiz et
  const analyze = await zapi.video.analyze({
    video: 'https://example.com/video.mp4',
    analysis: 'objects'
  });
  console.log('Tespit edilen nesneler:', analyze.data.analysis.results.objects.length);
  console.log('Sahne:', analyze.data.analysis.results.scene);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
