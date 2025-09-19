# Video Endpoint

Video işleme endpoint'i - Video analizi ve transkripsiyon işlemleri.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const video = zapi.video;
```

## Metodlar

### 1. analyze(filePath: string, options: any)

Video dosyasını analiz eder

**Parametreler:**
- `filePath: string` - Video dosya yolu
- `options: any` - Analiz seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Video analizi
const result = await video.analyze('/path/to/video.mp4', {
  features: ['objects', 'faces', 'scenes', 'emotions'],
  confidence: 0.8,
  maxResults: 100,
  language: 'tr'
});

if (result.success) {
  console.log('Video analizi:', result.data);
  
  // Tespit edilen nesneler
  result.data.objects?.forEach(obj => {
    console.log(`Nesne: ${obj.name}, Güven: ${obj.confidence}`);
  });
  
  // Tespit edilen yüzler
  result.data.faces?.forEach(face => {
    console.log(`Yüz: ${face.gender}, Yaş: ${face.age}, Duygu: ${face.emotion}`);
  });
  
  // Sahne değişiklikleri
  result.data.scenes?.forEach(scene => {
    console.log(`Sahne: ${scene.startTime}s - ${scene.endTime}s`);
  });
  
} else {
  console.error('Video analiz hatası:', result.error);
}

// Temel analiz
const basicAnalysis = await video.analyze('/path/to/video.mp4');

// Gelişmiş analiz
const advancedAnalysis = await video.analyze('/path/to/video.mp4', {
  features: ['objects', 'faces', 'scenes', 'emotions', 'text', 'audio'],
  confidence: 0.9,
  maxResults: 200,
  language: 'tr',
  includeTimestamps: true,
  generateThumbnails: true
});

// Sadece nesne tespiti
const objectDetection = await video.analyze('/path/to/video.mp4', {
  features: ['objects'],
  confidence: 0.7
});

// Sadece yüz tanıma
const faceRecognition = await video.analyze('/path/to/video.mp4', {
  features: ['faces'],
  confidence: 0.8,
  includeEmotions: true
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "videoInfo": {
      "duration": 120.5,
      "fps": 30,
      "resolution": "1920x1080",
      "format": "mp4",
      "size": 15728640,
      "bitrate": 1048576
    },
    "objects": [
      {
        "name": "person",
        "confidence": 0.95,
        "boundingBox": {
          "x": 100,
          "y": 50,
          "width": 200,
          "height": 300
        },
        "timestamp": 15.2
      },
      {
        "name": "car",
        "confidence": 0.87,
        "boundingBox": {
          "x": 300,
          "y": 200,
          "width": 150,
          "height": 100
        },
        "timestamp": 25.8
      }
    ],
    "faces": [
      {
        "gender": "male",
        "age": 35,
        "emotion": "happy",
        "confidence": 0.92,
        "boundingBox": {
          "x": 120,
          "y": 60,
          "width": 80,
          "height": 100
        },
        "timestamp": 15.2
      }
    ],
    "scenes": [
      {
        "startTime": 0,
        "endTime": 45.2,
        "description": "Indoor office environment",
        "confidence": 0.88
      },
      {
        "startTime": 45.2,
        "endTime": 120.5,
        "description": "Outdoor street scene",
        "confidence": 0.91
      }
    ],
    "emotions": [
      {
        "emotion": "happy",
        "confidence": 0.85,
        "timestamp": 15.2
      },
      {
        "emotion": "neutral",
        "confidence": 0.78,
        "timestamp": 45.8
      }
    ],
    "text": [
      {
        "text": "Welcome to our office",
        "confidence": 0.94,
        "boundingBox": {
          "x": 50,
          "y": 400,
          "width": 300,
          "height": 30
        },
        "timestamp": 5.2
      }
    ],
    "audio": {
      "language": "tr",
      "confidence": 0.92,
      "transcript": "Merhaba, ofisimize hoş geldiniz",
      "keywords": ["merhaba", "ofis", "hoş geldiniz"]
    },
    "thumbnails": [
      {
        "timestamp": 15.2,
        "url": "https://storage.zapi.com/thumbnails/video_123_15.2.jpg"
      },
      {
        "timestamp": 45.8,
        "url": "https://storage.zapi.com/thumbnails/video_123_45.8.jpg"
      }
    ],
    "metadata": {
      "processingTime": 45.2,
      "cost": 0.15,
      "model": "video-analyzer-v2"
    }
  },
  "message": "Video analizi başarıyla tamamlandı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "VIDEO_ANALYSIS_FAILED",
    "message": "Video analizi başarısız"
  }
}
```

---

### 2. transcribe(filePath: string, options: any)

Video dosyasından ses transkripsiyonu yapar

**Parametreler:**
- `filePath: string` - Video dosya yolu
- `options: any` - Transkripsiyon seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Video transkripsiyonu
const result = await video.transcribe('/path/to/video.mp4', {
  language: 'tr',
  model: 'whisper-1',
  response_format: 'json',
  temperature: 0.0,
  prompt: 'Bu bir teknik sunum videosudur.',
  includeTimestamps: true,
  includeSpeakerLabels: true
});

if (result.success) {
  console.log('Video transkripsiyonu:', result.data);
  
  // Tam transkript
  console.log('Transkript:', result.data.text);
  
  // Zaman damgalı transkript
  result.data.segments?.forEach(segment => {
    console.log(`[${segment.start}s - ${segment.end}s] ${segment.text}`);
  });
  
  // Konuşmacı etiketli transkript
  result.data.speakers?.forEach(speaker => {
    console.log(`${speaker.name}: ${speaker.text}`);
  });
  
} else {
  console.error('Video transkripsiyon hatası:', result.error);
}

// Temel transkripsiyon
const basicTranscription = await video.transcribe('/path/to/video.mp4');

// Çok dilli transkripsiyon
const multiLanguageTranscription = await video.transcribe('/path/to/video.mp4', {
  language: 'auto',
  model: 'whisper-1',
  response_format: 'verbose_json'
});

// Konuşmacı tanımalı transkripsiyon
const speakerTranscription = await video.transcribe('/path/to/video.mp4', {
  language: 'tr',
  includeSpeakerLabels: true,
  maxSpeakers: 3,
  minSpeakerConfidence: 0.8
});

// Özel prompt ile transkripsiyon
const contextualTranscription = await video.transcribe('/path/to/video.mp4', {
  language: 'tr',
  prompt: 'Bu bir yazılım geliştirme eğitim videosudur. Teknik terimler içerir.',
  temperature: 0.2
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "text": "Merhaba, bugün size yazılım geliştirme hakkında bilgi vereceğim. Öncelikle temel kavramları açıklayalım.",
    "language": "tr",
    "duration": 120.5,
    "segments": [
      {
        "id": 0,
        "start": 0.0,
        "end": 5.2,
        "text": "Merhaba, bugün size yazılım geliştirme hakkında bilgi vereceğim.",
        "confidence": 0.95
      },
      {
        "id": 1,
        "start": 5.2,
        "end": 10.8,
        "text": "Öncelikle temel kavramları açıklayalım.",
        "confidence": 0.92
      }
    ],
    "speakers": [
      {
        "id": "speaker_0",
        "name": "Eğitmen",
        "segments": [
          {
            "start": 0.0,
            "end": 5.2,
            "text": "Merhaba, bugün size yazılım geliştirme hakkında bilgi vereceğim.",
            "confidence": 0.95
          }
        ]
      },
      {
        "id": "speaker_1",
        "name": "Katılımcı",
        "segments": [
          {
            "start": 5.2,
            "end": 10.8,
            "text": "Öncelikle temel kavramları açıklayalım.",
            "confidence": 0.92
          }
        ]
      }
    ],
    "keywords": [
      "yazılım",
      "geliştirme",
      "bilgi",
      "temel",
      "kavramlar"
    ],
    "sentiment": {
      "overall": "positive",
      "confidence": 0.87,
      "segments": [
        {
          "start": 0.0,
          "end": 5.2,
          "sentiment": "positive",
          "confidence": 0.89
        }
      ]
    },
    "metadata": {
      "model": "whisper-1",
      "processingTime": 25.8,
      "cost": 0.12,
      "audioQuality": "high",
      "backgroundNoise": "low"
    }
  },
  "message": "Video transkripsiyonu başarıyla tamamlandı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "VIDEO_TRANSCRIPTION_FAILED",
    "message": "Video transkripsiyonu başarısız"
  }
}
```

---

## Analiz Özellikleri

| Özellik | Açıklama |
|---------|----------|
| `objects` | Nesne tespiti |
| `faces` | Yüz tanıma |
| `scenes` | Sahne analizi |
| `emotions` | Duygu analizi |
| `text` | Metin tespiti |
| `audio` | Ses analizi |

## Video Formatları

| Format | Açıklama |
|--------|----------|
| `mp4` | MP4 video |
| `avi` | AVI video |
| `mov` | QuickTime video |
| `mkv` | Matroska video |
| `webm` | WebM video |

## Desteklenen Diller

| Dil | Kod |
|-----|-----|
| Türkçe | `tr` |
| İngilizce | `en` |
| Almanca | `de` |
| Fransızca | `fr` |
| İspanyolca | `es` |
| Otomatik | `auto` |

## Transkripsiyon Modelleri

| Model | Açıklama | Fiyat |
|-------|----------|-------|
| `whisper-1` | Whisper v1 | $0.006/dakika |

## Yanıt Formatları

| Format | Açıklama |
|--------|----------|
| `json` | JSON formatı |
| `verbose_json` | Detaylı JSON |
| `text` | Sadece metin |
| `srt` | SRT altyazı |
| `vtt` | WebVTT altyazı |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `VIDEO_ANALYSIS_FAILED` | Video analizi başarısız |
| `VIDEO_TRANSCRIPTION_FAILED` | Video transkripsiyonu başarısız |
| `INVALID_VIDEO_FORMAT` | Geçersiz video formatı |
| `VIDEO_TOO_LARGE` | Video dosyası çok büyük |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek |

## Güvenlik Notları

- Video dosyalarını güvenli saklayın
- Telif hakkı ihlali yapmayın
- Hassas bilgileri video dosyalarında bulundurmayın
- Kişisel verileri koruyun

## Video İşleme Yönetimi

```typescript
// Video analizi
const analysis = await video.analyze('/path/to/video.mp4', {
  features: ['objects', 'faces', 'scenes']
});

// Video transkripsiyonu
const transcription = await video.transcribe('/path/to/video.mp4', {
  language: 'tr',
  includeTimestamps: true
});
```
