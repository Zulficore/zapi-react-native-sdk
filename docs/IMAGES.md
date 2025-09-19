# Images Endpoint

Görsel işleme endpoint'i - AI ile görsel oluşturma, düzenleme ve varyasyon işlemleri.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const images = zapi.images;
```

## Metodlar

### 1. generations(data: any)

AI ile yeni görsel oluşturur

**Parametreler:**
- `data: any` - Görsel oluşturma verisi

**Örnek Kullanım:**

```typescript
// Yeni görsel oluştur
const result = await images.generations({
  prompt: "A beautiful sunset over a mountain landscape with a lake in the foreground",
  n: 1,
  size: "1024x1024",
  quality: "standard",
  style: "vivid",
  response_format: "url",
  user: "user123"
});

if (result.success) {
  console.log('Görsel oluşturuldu:', result.data);
  result.data.data.forEach((image, index) => {
    console.log(`Görsel ${index + 1}: ${image.url}`);
  });
} else {
  console.error('Görsel oluşturma hatası:', result.error);
}

// Çoklu görsel oluştur
const multipleImages = await images.generations({
  prompt: "A futuristic city with flying cars and neon lights",
  n: 4,
  size: "512x512",
  quality: "hd",
  style: "natural",
  response_format: "b64_json"
});

// Yüksek kalite görsel
const hdImage = await images.generations({
  prompt: "A detailed portrait of a cyberpunk character",
  n: 1,
  size: "1024x1024",
  quality: "hd",
  style: "vivid",
  response_format: "url"
});

// Farklı boyutlarda görsel
const squareImage = await images.generations({
  prompt: "A cute cat sitting on a windowsill",
  n: 1,
  size: "1024x1024",
  quality: "standard",
  style: "natural"
});

const portraitImage = await images.generations({
  prompt: "A tall building in a modern city",
  n: 1,
  size: "1024x1792",
  quality: "standard",
  style: "vivid"
});

const landscapeImage = await images.generations({
  prompt: "A wide landscape view of a valley",
  n: 1,
  size: "1792x1024",
  quality: "standard",
  style: "natural"
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "created": 1705312800,
    "data": [
      {
        "revised_prompt": "A beautiful sunset over a mountain landscape with a crystal-clear lake in the foreground, warm orange and pink sky colors, peaceful atmosphere",
        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-xyz/user-abc/img-abc123.png"
      }
    ],
    "metadata": {
      "model": "dall-e-3",
      "size": "1024x1024",
      "quality": "standard",
      "style": "vivid",
      "prompt_tokens": 25,
      "completion_tokens": 1,
      "total_tokens": 26,
      "processing_time": 15.2,
      "cost": 0.04
    }
  },
  "message": "Görsel başarıyla oluşturuldu"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "IMAGE_GENERATION_FAILED",
    "message": "Görsel oluşturulamadı"
  }
}
```

---

### 2. edits(data: any)

Mevcut görseli düzenler

**Parametreler:**
- `data: any` - Görsel düzenleme verisi

**Örnek Kullanım:**

```typescript
// Görsel düzenle
const result = await images.edits({
  image: {
    uri: "https://example.com/image.jpg",
    type: "image/jpeg",
    name: "original.jpg"
  },
  mask: {
    uri: "https://example.com/mask.png",
    type: "image/png",
    name: "mask.png"
  },
  prompt: "Add a beautiful rainbow in the sky",
  n: 1,
  size: "1024x1024",
  response_format: "url",
  user: "user123"
});

if (result.success) {
  console.log('Görsel düzenlendi:', result.data);
  result.data.data.forEach((image, index) => {
    console.log(`Düzenlenmiş görsel ${index + 1}: ${image.url}`);
  });
} else {
  console.error('Görsel düzenleme hatası:', result.error);
}

// Base64 görsel ile düzenleme
const base64Edit = await images.edits({
  image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  mask: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  prompt: "Remove the background and make it transparent",
  n: 1,
  size: "1024x1024",
  response_format: "b64_json"
});

// Çoklu düzenleme
const multipleEdits = await images.edits({
  image: {
    uri: "https://example.com/photo.jpg",
    type: "image/jpeg",
    name: "photo.jpg"
  },
  mask: {
    uri: "https://example.com/area_mask.png",
    type: "image/png",
    name: "mask.png"
  },
  prompt: "Change the color of the car to red",
  n: 3,
  size: "1024x1024",
  response_format: "url"
});

// Farklı boyutlarda düzenleme
const squareEdit = await images.edits({
  image: {
    uri: "https://example.com/square.jpg",
    type: "image/jpeg",
    name: "square.jpg"
  },
  mask: {
    uri: "https://example.com/square_mask.png",
    type: "image/png",
    name: "square_mask.png"
  },
  prompt: "Add flowers around the edges",
  n: 1,
  size: "1024x1024",
  response_format: "url"
});

const portraitEdit = await images.edits({
  image: {
    uri: "https://example.com/portrait.jpg",
    type: "image/jpeg",
    name: "portrait.jpg"
  },
  mask: {
    uri: "https://example.com/portrait_mask.png",
    type: "image/png",
    name: "portrait_mask.png"
  },
  prompt: "Change the background to a beach scene",
  n: 1,
  size: "1024x1792",
  response_format: "url"
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "created": 1705312800,
    "data": [
      {
        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-xyz/user-abc/img-def456.png"
      }
    ],
    "metadata": {
      "model": "dall-e-2",
      "size": "1024x1024",
      "prompt_tokens": 8,
      "completion_tokens": 1,
      "total_tokens": 9,
      "processing_time": 12.5,
      "cost": 0.02
    }
  },
  "message": "Görsel başarıyla düzenlendi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "IMAGE_EDIT_FAILED",
    "message": "Görsel düzenlenemedi"
  }
}
```

---

### 3. variations(data: any)

Mevcut görselin varyasyonlarını oluşturur

**Parametreler:**
- `data: any` - Görsel varyasyon verisi

**Örnek Kullanım:**

```typescript
// Görsel varyasyonları oluştur
const result = await images.variations({
  image: {
    uri: "https://example.com/original.jpg",
    type: "image/jpeg",
    name: "original.jpg"
  },
  n: 4,
  size: "1024x1024",
  response_format: "url",
  user: "user123"
});

if (result.success) {
  console.log('Görsel varyasyonları oluşturuldu:', result.data);
  result.data.data.forEach((image, index) => {
    console.log(`Varyasyon ${index + 1}: ${image.url}`);
  });
} else {
  console.error('Görsel varyasyon hatası:', result.error);
}

// Base64 görsel ile varyasyon
const base64Variations = await images.variations({
  image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  n: 3,
  size: "1024x1024",
  response_format: "b64_json"
});

// Farklı boyutlarda varyasyon
const squareVariations = await images.variations({
  image: {
    uri: "https://example.com/square.jpg",
    type: "image/jpeg",
    name: "square.jpg"
  },
  n: 2,
  size: "1024x1024",
  response_format: "url"
});

const portraitVariations = await images.variations({
  image: {
    uri: "https://example.com/portrait.jpg",
    type: "image/jpeg",
    name: "portrait.jpg"
  },
  n: 3,
  size: "1024x1792",
  response_format: "url"
});

const landscapeVariations = await images.variations({
  image: {
    uri: "https://example.com/landscape.jpg",
    type: "image/jpeg",
    name: "landscape.jpg"
  },
  n: 2,
  size: "1792x1024",
  response_format: "url"
});

// Çoklu varyasyon
const multipleVariations = await images.variations({
  image: {
    uri: "https://example.com/artwork.jpg",
    type: "image/jpeg",
    name: "artwork.jpg"
  },
  n: 6,
  size: "1024x1024",
  response_format: "url"
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "created": 1705312800,
    "data": [
      {
        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-xyz/user-abc/img-ghi789.png"
      },
      {
        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-xyz/user-abc/img-jkl012.png"
      },
      {
        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-xyz/user-abc/img-mno345.png"
      },
      {
        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-xyz/user-abc/img-pqr678.png"
      }
    ],
    "metadata": {
      "model": "dall-e-2",
      "size": "1024x1024",
      "prompt_tokens": 0,
      "completion_tokens": 4,
      "total_tokens": 4,
      "processing_time": 18.3,
      "cost": 0.08
    }
  },
  "message": "Görsel varyasyonları başarıyla oluşturuldu"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "IMAGE_VARIATION_FAILED",
    "message": "Görsel varyasyonları oluşturulamadı"
  }
}
```

---

## Görsel Boyutları

| Boyut | Açıklama | Kullanım |
|-------|----------|----------|
| `1024x1024` | Kare | Profil fotoğrafları, avatarlar |
| `1024x1792` | Portre | Dikey görseller, posterler |
| `1792x1024` | Manzara | Yatay görseller, bannerlar |
| `512x512` | Küçük kare | Thumbnail, önizleme |
| `256x256` | Mini kare | İkon, küçük önizleme |

## Görsel Kaliteleri

| Kalite | Açıklama | Fiyat |
|--------|----------|-------|
| `standard` | Standart kalite | $0.04 |
| `hd` | Yüksek kalite | $0.08 |

## Görsel Stilleri

| Stil | Açıklama |
|------|----------|
| `vivid` | Canlı, renkli |
| `natural` | Doğal, gerçekçi |

## Yanıt Formatları

| Format | Açıklama |
|--------|----------|
| `url` | URL linki |
| `b64_json` | Base64 kodlanmış |

## Desteklenen Dosya Türleri

### Giriş Formatları
- **JPEG** (.jpg, .jpeg)
- **PNG** (.png)
- **WebP** (.webp)

### Çıkış Formatları
- **PNG** (varsayılan)
- **JPEG** (isteğe bağlı)

## Dosya Boyut Limitleri

| İşlem | Maksimum Boyut |
|-------|----------------|
| Generations | - |
| Edits | 20MB |
| Variations | 20MB |

## Görsel İşleme Limitleri

| Limit | Değer |
|-------|-------|
| Maksimum görsel sayısı | 10 |
| Maksimum prompt uzunluğu | 1000 karakter |
| Maksimum dosya boyutu | 20MB |
| Maksimum çözünürlük | 1792x1792 |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `IMAGE_GENERATION_FAILED` | Görsel oluşturulamadı |
| `IMAGE_EDIT_FAILED` | Görsel düzenlenemedi |
| `IMAGE_VARIATION_FAILED` | Görsel varyasyonları oluşturulamadı |
| `INVALID_IMAGE_FORMAT` | Geçersiz görsel formatı |
| `IMAGE_TOO_LARGE` | Görsel çok büyük |
| `INVALID_PROMPT` | Geçersiz prompt |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Görsel içeriklerini kontrol edin
- Telif hakkı ihlali yapmayın
- Uygunsuz içerik oluşturmayın
- Görsel verilerini güvenli saklayın

## Görsel İşleme Yönetimi

```typescript
// Yeni görsel oluştur
const newImage = await images.generations({
  prompt: "A beautiful landscape",
  n: 1,
  size: "1024x1024"
});

// Görsel düzenle
const editedImage = await images.edits({
  image: { uri: "https://example.com/image.jpg" },
  mask: { uri: "https://example.com/mask.png" },
  prompt: "Add a rainbow"
});

// Görsel varyasyonları oluştur
const variations = await images.variations({
  image: { uri: "https://example.com/original.jpg" },
  n: 4
});
```
