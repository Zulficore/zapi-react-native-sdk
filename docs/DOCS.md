# Docs Endpoint - 2 Metod

Dokümantasyon yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Dokümantasyonları listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `category` (string): Kategori
  - `status` (string): Durum

**Detaylı Örnek:**
```typescript
const docs = await zapi.docs.list({
  limit: 10,
  page: 1,
  category: 'api',
  status: 'published'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Dokümantasyonlar getirildi",
  "data": {
    "docs": [
      {
        "id": "doc_64f8a1b2c3d4e5f6g7h8i9j0",
        "title": "API Kullanım Kılavuzu",
        "slug": "api-kullanim-kilavuzu",
        "category": "api",
        "status": "published",
        "content": "API kullanımı için detaylı kılavuz...",
        "summary": "API kullanımı ve entegrasyon rehberi",
        "tags": ["api", "guide", "integration"],
        "author": {
          "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "metadata": {
          "language": "tr",
          "difficulty": "beginner",
          "estimatedReadTime": "15 minutes",
          "wordCount": 2500
        },
        "seo": {
          "metaDescription": "API kullanımı için kapsamlı kılavuz",
          "keywords": ["api", "guide", "integration"]
        },
        "stats": {
          "views": 1250,
          "likes": 45,
          "shares": 12
        },
        "createdAt": "2024-01-01T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "publishedAt": "2024-01-02T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 45,
      "itemsPerPage": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
*/
```

### 2. get(docId: string): Promise<ApiResponse>
Belirli bir dokümantasyonun detaylarını getirir.

**Parametreler:**
- `docId` (string): Dokümantasyon ID'si

**Detaylı Örnek:**
```typescript
const doc = await zapi.docs.get('doc_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Dokümantasyon detayları getirildi",
  "data": {
    "doc": {
      "id": "doc_64f8a1b2c3d4e5f6g7h8i9j0",
      "title": "API Kullanım Kılavuzu",
      "slug": "api-kullanim-kilavuzu",
      "category": "api",
      "status": "published",
      "content": "API kullanımı için detaylı kılavuz...",
      "summary": "API kullanımı ve entegrasyon rehberi",
      "tags": ["api", "guide", "integration"],
      "author": {
        "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "metadata": {
        "language": "tr",
        "difficulty": "beginner",
        "estimatedReadTime": "15 minutes",
        "wordCount": 2500
      },
      "seo": {
        "metaDescription": "API kullanımı için kapsamlı kılavuz",
        "keywords": ["api", "guide", "integration"]
      },
      "stats": {
        "views": 1250,
        "likes": 45,
        "shares": 12,
        "comments": 8
      },
      "related": [
        {
          "id": "doc_64f8a1b2c3d4e5f6g7h8i9j1",
          "title": "API Endpoint Referansı",
          "slug": "api-endpoint-referansi"
        }
      ],
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z",
      "publishedAt": "2024-01-02T10:30:00Z"
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
  // 1. Dokümantasyonları listele
  const docs = await zapi.docs.list({
    limit: 10,
    page: 1,
    category: 'api',
    status: 'published'
  });
  console.log('Toplam dokümantasyon:', docs.data.pagination.totalItems);
  
  // 2. Dokümantasyon detayını getir
  const doc = await zapi.docs.get('doc_64f8a1b2c3d4e5f6g7h8i9j0');
  console.log('Dokümantasyon:', doc.data.doc.title);
  console.log('Kategori:', doc.data.doc.category);
  console.log('Durum:', doc.data.doc.status);
  console.log('Görüntülenme:', doc.data.doc.stats.views);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
