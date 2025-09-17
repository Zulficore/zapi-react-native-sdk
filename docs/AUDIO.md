# Audio Endpoint - 3 Metod

Ses işleme için kullanılan endpoint.

## Metodlar

### 1. transcribe(data: any): Promise<ApiResponse>
Ses dosyasını metne çevirir.

**Parametreler:**
- `data` (any): Transkripsiyon verileri
  - `audio` (string): Ses dosyası URL'i veya base64
  - `language` (string): Dil kodu
  - `model` (string): Model adı

**Detaylı Örnek:**
```typescript
const transcribe = await zapi.audio.transcribe({
  audio: 'https://example.com/audio.mp3',
  language: 'tr',
  model: 'whisper-1'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Ses başarıyla metne çevrildi",
  "data": {
    "transcription": {
      "id": "trans_64f8a1b2c3d4e5f6g7h8i9j0",
      "text": "Merhaba, bu bir test ses dosyasıdır.",
      "language": "tr",
      "confidence": 0.95,
      "duration": 5.2,
      "model": "whisper-1",
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 2. generate(data: any): Promise<ApiResponse>
Metni sese çevirir.

**Parametreler:**
- `data` (any): Ses üretim verileri
  - `text` (string): Metin
  - `voice` (string): Ses tipi
  - `language` (string): Dil kodu

**Detaylı Örnek:**
```typescript
const generate = await zapi.audio.generate({
  text: 'Merhaba, bu bir test ses dosyasıdır.',
  voice: 'alloy',
  language: 'tr'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Ses başarıyla üretildi",
  "data": {
    "audio": {
      "id": "audio_64f8a1b2c3d4e5f6g7h8i9j0",
      "url": "https://api.zapi.com/audio/audio_64f8a1b2c3d4e5f6g7h8i9j0.mp3",
      "text": "Merhaba, bu bir test ses dosyasıdır.",
      "voice": "alloy",
      "language": "tr",
      "duration": 5.2,
      "size": "125KB",
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. analyze(data: any): Promise<ApiResponse>
Ses dosyasını analiz eder.

**Parametreler:**
- `data` (any): Analiz verileri
  - `audio` (string): Ses dosyası URL'i veya base64
  - `analysis` (string): Analiz tipi

**Detaylı Örnek:**
```typescript
const analyze = await zapi.audio.analyze({
  audio: 'https://example.com/audio.mp3',
  analysis: 'emotion'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Ses analizi tamamlandı",
  "data": {
    "analysis": {
      "id": "analysis_64f8a1b2c3d4e5f6g7h8i9j0",
      "type": "emotion",
      "results": {
        "emotion": "happy",
        "confidence": 0.85,
        "sentiment": "positive",
        "energy": 0.7
      },
      "duration": 5.2,
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
  // 1. Ses dosyasını metne çevir
  const transcribe = await zapi.audio.transcribe({
    audio: 'https://example.com/audio.mp3',
    language: 'tr',
    model: 'whisper-1'
  });
  console.log('Transkripsiyon:', transcribe.data.transcription.text);
  console.log('Güven:', transcribe.data.transcription.confidence);
  
  // 2. Metni sese çevir
  const generate = await zapi.audio.generate({
    text: 'Merhaba, bu bir test ses dosyasıdır.',
    voice: 'alloy',
    language: 'tr'
  });
  console.log('Ses URL:', generate.data.audio.url);
  console.log('Süre:', generate.data.audio.duration);
  
  // 3. Ses dosyasını analiz et
  const analyze = await zapi.audio.analyze({
    audio: 'https://example.com/audio.mp3',
    analysis: 'emotion'
  });
  console.log('Duygu:', analyze.data.analysis.results.emotion);
  console.log('Güven:', analyze.data.analysis.results.confidence);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
