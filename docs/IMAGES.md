# Images Endpoint - 3 Metod

Görsel işleme için kullanılan endpoint.

## Metodlar

### 1. generate(data: any): Promise<ApiResponse>
Görsel üretir.

**Parametreler:**
- `data` (any): Görsel üretim verileri
  - `prompt` (string): Görsel açıklaması
  - `size` (string): Görsel boyutu
  - `model` (string): Model adı

**Detaylı Örnek:**
```typescript
const generate = await zapi.images.generate({
  prompt: 'A beautiful sunset over the ocean',
  size: '1024x1024',
  model: 'dall-e-3'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Görsel başarıyla üretildi",
  "data": {
    "image": {
      "id": "img_64f8a1b2c3d4e5f6g7h8i9j0",
      "url": "https://api.zapi.com/images/img_64f8a1b2c3d4e5f6g7h8i9j0.png",
      "prompt": "A beautiful sunset over the ocean",
      "size": "1024x1024",
      "model": "dall-e-3",
      "format": "png",
      "size": "2.5MB",
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 2. edit(data: any): Promise<ApiResponse>
Görseli düzenler.

**Parametreler:**
- `data` (any): Düzenleme verileri
  - `image` (string): Görsel URL'i veya base64
  - `mask` (string): Maske URL'i veya base64
  - `prompt` (string): Düzenleme açıklaması

**Detaylı Örnek:**
```typescript
const edit = await zapi.images.edit({
  image: 'https://example.com/image.png',
  mask: 'https://example.com/mask.png',
  prompt: 'Add a rainbow in the sky'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Görsel başarıyla düzenlendi",
  "data": {
    "image": {
      "id": "img_64f8a1b2c3d4e5f6g7h8i9j1",
      "url": "https://api.zapi.com/images/img_64f8a1b2c3d4e5f6g7h8i9j1.png",
      "originalImage": "https://example.com/image.png",
      "prompt": "Add a rainbow in the sky",
      "size": "1024x1024",
      "format": "png",
      "size": "2.8MB",
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. analyze(data: any): Promise<ApiResponse>
Görseli analiz eder.

**Parametreler:**
- `data` (any): Analiz verileri
  - `image` (string): Görsel URL'i veya base64
  - `analysis` (string): Analiz tipi

**Detaylı Örnek:**
```typescript
const analyze = await zapi.images.analyze({
  image: 'https://example.com/image.png',
  analysis: 'objects'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Görsel analizi tamamlandı",
  "data": {
    "analysis": {
      "id": "analysis_64f8a1b2c3d4e5f6g7h8i9j0",
      "type": "objects",
      "results": {
        "objects": [
          {
            "name": "person",
            "confidence": 0.95,
            "bbox": [100, 200, 300, 400]
          },
          {
            "name": "car",
            "confidence": 0.85,
            "bbox": [500, 300, 700, 500]
          }
        ],
        "scene": "street",
        "colors": ["blue", "green", "red"]
      },
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
  // 1. Görsel üret
  const generate = await zapi.images.generate({
    prompt: 'A beautiful sunset over the ocean',
    size: '1024x1024',
    model: 'dall-e-3'
  });
  console.log('Görsel URL:', generate.data.image.url);
  console.log('Boyut:', generate.data.image.size);
  
  // 2. Görseli düzenle
  const edit = await zapi.images.edit({
    image: 'https://example.com/image.png',
    mask: 'https://example.com/mask.png',
    prompt: 'Add a rainbow in the sky'
  });
  console.log('Düzenlenmiş görsel:', edit.data.image.url);
  
  // 3. Görseli analiz et
  const analyze = await zapi.images.analyze({
    image: 'https://example.com/image.png',
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
