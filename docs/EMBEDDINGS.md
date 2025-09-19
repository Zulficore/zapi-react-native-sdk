# Embeddings Endpoint

Vektör işlemleri endpoint'i - Metin vektörleştirme ve benzerlik hesaplama.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const embeddings = zapi.embeddings;
```

## Metodlar

### 1. create(input: string | string[], model: string, options: any)

Metin vektörleştirme yapar

**Parametreler:**
- `input: string | string[]` - Vektörleştirilecek metin(ler)
- `model: string` - Kullanılacak model (varsayılan: 'text-embedding-ada-002')
- `options: any` - Ek seçenekler (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tek metin vektörleştirme
const result = await embeddings.create(
  "Bu bir örnek metindir",
  "text-embedding-ada-002",
  {
    encodingFormat: "float",
    dimensions: 1536
  }
);

// Çoklu metin vektörleştirme
const result = await embeddings.create([
  "İlk metin",
  "İkinci metin", 
  "Üçüncü metin"
], "text-embedding-ada-002");

if (result.success) {
  console.log('Vektörler oluşturuldu:', result.data);
  result.data.data.forEach((embedding, index) => {
    console.log(`Metin ${index + 1}: ${embedding.embedding.length} boyutlu vektör`);
  });
} else {
  console.error('Vektör oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "object": "list",
    "data": [
      {
        "object": "embedding",
        "index": 0,
        "embedding": [
          0.0023064255,
          -0.009327292,
          -0.0028842222,
          0.0079875815,
          -0.003980931,
          0.008693044,
          -0.002442498,
          0.0019856712,
          0.006732445,
          -0.0038944454,
          -0.0012345678,
          0.0045678901,
          0.0023456789,
          -0.0078901234,
          0.0012345678,
          -0.0034567890,
          0.0056789012,
          -0.0018901234,
          0.0034567890,
          -0.0023456789
        ],
        "usage": {
          "promptTokens": 8,
          "totalTokens": 8
        }
      }
    ],
    "model": "text-embedding-ada-002",
    "usage": {
      "promptTokens": 8,
      "totalTokens": 8
    },
    "metadata": {
      "dimensions": 1536,
      "encodingFormat": "float",
      "createdAt": "2024-01-15T10:30:00Z",
      "processingTime": 150
    }
  },
  "message": "Vektörler başarıyla oluşturuldu"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "EMBEDDING_CREATION_FAILED",
    "message": "Vektör oluşturulamadı"
  }
}
```

---

## Embedding Modelleri

| Model | Açıklama | Boyut | Fiyat |
|-------|----------|-------|-------|
| `text-embedding-ada-002` | OpenAI Ada v2 | 1536 | $0.0001/1K token |
| `text-embedding-3-small` | OpenAI 3 Small | 1536 | $0.00002/1K token |
| `text-embedding-3-large` | OpenAI 3 Large | 3072 | $0.00013/1K token |

## Kodlama Formatları

| Format | Açıklama |
|--------|----------|
| `float` | Float32 dizisi |
| `base64` | Base64 kodlanmış |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `EMBEDDING_CREATION_FAILED` | Vektör oluşturulamadı |
| `INVALID_INPUT` | Geçersiz giriş |
| `INVALID_MODEL` | Geçersiz model |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Vektör verilerini güvenli bir şekilde saklayın
- Hassas metinleri vektörleştirmeyin
- Rate limiting uygulayın
- Düzenli güvenlik güncellemeleri yapın

## Embedding Yönetimi

```typescript
// Tek metin vektörleştirme
const embedding = await embeddings.create("Örnek metin");

// Çoklu metin vektörleştirme
const embeddings = await embeddings.create([
  "İlk metin",
  "İkinci metin"
]);

// Özel model ile
const customEmbedding = await embeddings.create(
  "Metin",
  "text-embedding-3-large",
  { dimensions: 3072 }
);
```
