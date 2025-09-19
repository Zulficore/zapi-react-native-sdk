# Audio Endpoint

Ses işleme endpoint'i - Metin-ses dönüşümü, ses-metin dönüşümü ve çeviri işlemleri.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const audio = zapi.audio;
```

## Metodlar

### 1. speech(data: any)

Metni sese dönüştürür (Text-to-Speech)

**Parametreler:**
- `data: any` - TTS verisi

**Örnek Kullanım:**

```typescript
const result = await audio.speech({
  model: "tts-1",
  input: "Merhaba, bu bir test mesajıdır.",
  voice: "alloy",
  response_format: "mp3",
  speed: 1.0
});

if (result.success) {
  console.log('Ses dosyası oluşturuldu:', result.data);
} else {
  console.error('Ses oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "audio": "base64_audio_data...",
    "metadata": {
      "model": "tts-1",
      "voice": "alloy",
      "format": "mp3",
      "duration": 3.2,
      "cost": 0.015
    }
  }
}
```

---

### 2. transcriptions(data: any)

Sesi metne dönüştürür (Speech-to-Text)

**Parametreler:**
- `data: any` - STT verisi

**Örnek Kullanım:**

```typescript
const result = await audio.transcriptions({
  file: {
    uri: "https://example.com/audio.mp3",
    type: "audio/mpeg",
    name: "audio.mp3"
  },
  model: "whisper-1",
  language: "tr",
  prompt: "Bu bir teknik terim içeren ses dosyasıdır.",
  response_format: "json",
  temperature: 0.0
});

if (result.success) {
  console.log('Transkript:', result.data.text);
} else {
  console.error('Transkript hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "text": "Merhaba, bu bir test mesajıdır.",
    "metadata": {
      "model": "whisper-1",
      "language": "tr",
      "duration": 3.2,
      "cost": 0.006
    }
  }
}
```

---

### 3. translations(data: any)

Sesi başka dile çevirir (Speech Translation)

**Parametreler:**
- `data: any` - Çeviri verisi

**Örnek Kullanım:**

```typescript
const result = await audio.translations({
  file: {
    uri: "https://example.com/audio.mp3",
    type: "audio/mpeg",
    name: "audio.mp3"
  },
  model: "whisper-1",
  prompt: "Bu bir İngilizce konuşma kaydıdır.",
  response_format: "json",
  temperature: 0.0
});

if (result.success) {
  console.log('Çeviri:', result.data.text);
} else {
  console.error('Çeviri hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "text": "Hello, this is a test message.",
    "metadata": {
      "model": "whisper-1",
      "source_language": "tr",
      "target_language": "en",
      "duration": 3.2,
      "cost": 0.006
    }
  }
}
```

---

## TTS Modelleri

| Model | Açıklama | Fiyat |
|-------|----------|-------|
| `tts-1` | Hızlı TTS | $0.015/1K karakter |
| `tts-1-hd` | Yüksek kalite TTS | $0.030/1K karakter |

## TTS Sesler

| Ses | Açıklama |
|-----|----------|
| `alloy` | Nötr, profesyonel |
| `echo` | Sıcak, samimi |
| `fable` | Hikaye anlatıcısı |
| `onyx` | Derin, otoriter |
| `nova` | Genç, enerjik |
| `shimmer` | Yumuşak, sakin |

## Ses Formatları

| Format | Açıklama |
|--------|----------|
| `mp3` | MP3 ses dosyası |
| `opus` | Opus ses dosyası |
| `aac` | AAC ses dosyası |
| `flac` | FLAC ses dosyası |

## STT Modelleri

| Model | Açıklama | Fiyat |
|-------|----------|-------|
| `whisper-1` | Whisper v1 | $0.006/dakika |

## Desteklenen Diller

| Dil | Kod |
|-----|-----|
| Türkçe | `tr` |
| İngilizce | `en` |
| Almanca | `de` |
| Fransızca | `fr` |
| İspanyolca | `es` |
| İtalyanca | `it` |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `AUDIO_PROCESSING_FAILED` | Ses işleme başarısız |
| `INVALID_AUDIO_FORMAT` | Geçersiz ses formatı |
| `AUDIO_TOO_LARGE` | Ses dosyası çok büyük |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek |

## Güvenlik Notları

- Ses dosyalarını güvenli saklayın
- Telif hakkı ihlali yapmayın
- Hassas bilgileri ses dosyalarında bulundurmayın

## Ses İşleme Yönetimi

```typescript
// Metni sese dönüştür
const speech = await audio.speech({
  model: "tts-1",
  input: "Merhaba dünya",
  voice: "alloy"
});

// Sesi metne dönüştür
const transcript = await audio.transcriptions({
  file: { uri: "audio.mp3" },
  model: "whisper-1"
});

// Sesi çevir
const translation = await audio.translations({
  file: { uri: "audio.mp3" },
  model: "whisper-1"
});
```
