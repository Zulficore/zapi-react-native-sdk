# Embeddings Endpoint - 1 Metod

Embedding yönetimi için kullanılan endpoint.

## Metodlar

### 1. create(data: any): Promise<ApiResponse>
Yeni embedding oluşturur.

**Parametreler:**
- `data` (any): Embedding verileri
  - `text` (string): Metin
  - `model` (string): Model adı
  - `dimensions` (number): Boyut sayısı
  - `metadata` (any): Ek veriler

**Detaylı Örnek:**
```typescript
const create = await zapi.embeddings.create({
  text: 'ZAPI is a powerful AI API platform',
  model: 'text-embedding-ada-002',
  dimensions: 1536,
  metadata: {
    category: 'description',
    language: 'en',
    source: 'api'
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Embedding başarıyla oluşturuldu",
  "data": {
    "embedding": {
      "id": "emb_64f8a1b2c3d4e5f6g7h8i9j0",
      "text": "ZAPI is a powerful AI API platform",
      "model": "text-embedding-ada-002",
      "dimensions": 1536,
      "vector": [0.1, 0.2, 0.3, ...],
      "metadata": {
        "category": "description",
        "language": "en",
        "source": "api"
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
  // Embedding oluştur
  const create = await zapi.embeddings.create({
    text: 'ZAPI is a powerful AI API platform',
    model: 'text-embedding-ada-002',
    dimensions: 1536,
    metadata: {
      category: 'description',
      language: 'en',
      source: 'api'
    }
  });
  console.log('Embedding oluşturuldu:', create.data.embedding.id);
  console.log('Model:', create.data.embedding.model);
  console.log('Boyut:', create.data.embedding.dimensions);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
