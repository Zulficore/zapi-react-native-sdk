# Content Endpoint - 14 Metod

İçerik yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
İçerikleri listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `search` (string): Arama terimi
  - `type` (string): İçerik tipi
  - `status` (string): İçerik durumu

**Detaylı Örnek:**
```typescript
const content = await zapi.content.list({
  limit: 10,
  page: 1,
  search: 'article',
  type: 'text',
  status: 'published'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "İçerikler getirildi",
  "data": {
    "content": [
      {
        "id": "content_64f8a1b2c3d4e5f6g7h8i9j0",
        "title": "AI ve Gelecek",
        "type": "text",
        "status": "published",
        "content": "Yapay zeka teknolojisi hızla gelişiyor...",
        "author": {
          "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "tags": ["ai", "technology", "future"],
        "category": "technology",
        "views": 1250,
        "likes": 45,
        "createdAt": "2024-01-01T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
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

### 2. create(data: any): Promise<ApiResponse>
Yeni içerik oluşturur.

**Parametreler:**
- `data` (any): İçerik verileri
  - `title` (string): Başlık
  - `type` (string): İçerik tipi
  - `content` (string): İçerik
  - `tags` (string[]): Etiketler

**Detaylı Örnek:**
```typescript
const create = await zapi.content.create({
  title: 'Yeni Makale',
  type: 'text',
  content: 'Bu yeni bir makale içeriğidir...',
  tags: ['yeni', 'makale', 'test'],
  category: 'technology'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "İçerik başarıyla oluşturuldu",
  "data": {
    "content": {
      "id": "content_64f8a1b2c3d4e5f6g7h8i9j1",
      "title": "Yeni Makale",
      "type": "text",
      "status": "draft",
      "content": "Bu yeni bir makale içeriğidir...",
      "author": {
        "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "tags": ["yeni", "makale", "test"],
      "category": "technology",
      "views": 0,
      "likes": 0,
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(contentId: string): Promise<ApiResponse>
Belirli bir içeriğin detaylarını getirir.

**Parametreler:**
- `contentId` (string): İçerik ID'si

**Detaylı Örnek:**
```typescript
const content = await zapi.content.get('content_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "İçerik detayları getirildi",
  "data": {
    "content": {
      "id": "content_64f8a1b2c3d4e5f6g7h8i9j0",
      "title": "AI ve Gelecek",
      "type": "text",
      "status": "published",
      "content": "Yapay zeka teknolojisi hızla gelişiyor...",
      "author": {
        "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "tags": ["ai", "technology", "future"],
      "category": "technology",
      "views": 1250,
      "likes": 45,
      "comments": [
        {
          "id": "comment_64f8a1b2c3d4e5f6g7h8i9j0",
          "content": "Çok güzel bir makale!",
          "author": "Jane Doe",
          "createdAt": "2024-01-15T10:30:00Z"
        }
      ],
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. update(contentId: string, data: any): Promise<ApiResponse>
Belirli bir içeriği günceller.

**Parametreler:**
- `contentId` (string): İçerik ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.content.update('content_64f8a1b2c3d4e5f6g7h8i9j0', {
  title: 'AI ve Gelecek - Güncellenmiş',
  content: 'Yapay zeka teknolojisi hızla gelişiyor ve gelecekte...',
  tags: ['ai', 'technology', 'future', 'updated'],
  status: 'published'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "İçerik başarıyla güncellendi",
  "data": {
    "content": {
      "id": "content_64f8a1b2c3d4e5f6g7h8i9j0",
      "title": "AI ve Gelecek - Güncellenmiş",
      "type": "text",
      "status": "published",
      "content": "Yapay zeka teknolojisi hızla gelişiyor ve gelecekte...",
      "author": {
        "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "tags": ["ai", "technology", "future", "updated"],
      "category": "technology",
      "views": 1250,
      "likes": 45,
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 5. delete(contentId: string): Promise<ApiResponse>
Belirli bir içeriği siler.

**Parametreler:**
- `contentId` (string): İçerik ID'si

**Detaylı Örnek:**
```typescript
const deleteContent = await zapi.content.delete('content_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "İçerik başarıyla silindi",
  "data": {
    "deleted": {
      "id": "content_64f8a1b2c3d4e5f6g7h8i9j0",
      "title": "AI ve Gelecek - Güncellenmiş",
      "deletedAt": "2024-01-15T10:40:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. publish(contentId: string): Promise<ApiResponse>
Belirli bir içeriği yayınlar.

**Parametreler:**
- `contentId` (string): İçerik ID'si

**Detaylı Örnek:**
```typescript
const publish = await zapi.content.publish('content_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "İçerik başarıyla yayınlandı",
  "data": {
    "content": {
      "id": "content_64f8a1b2c3d4e5f6g7h8i9j0",
      "title": "AI ve Gelecek - Güncellenmiş",
      "status": "published",
      "publishedAt": "2024-01-15T10:40:00Z",
      "publishedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 7. unpublish(contentId: string): Promise<ApiResponse>
Belirli bir içeriği yayından kaldırır.

**Parametreler:**
- `contentId` (string): İçerik ID'si

**Detaylı Örnek:**
```typescript
const unpublish = await zapi.content.unpublish('content_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "İçerik başarıyla yayından kaldırıldı",
  "data": {
    "content": {
      "id": "content_64f8a1b2c3d4e5f6g7h8i9j0",
      "title": "AI ve Gelecek - Güncellenmiş",
      "status": "draft",
      "unpublishedAt": "2024-01-15T10:40:00Z",
      "unpublishedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 8. like(contentId: string): Promise<ApiResponse>
Belirli bir içeriği beğenir.

**Parametreler:**
- `contentId` (string): İçerik ID'si

**Detaylı Örnek:**
```typescript
const like = await zapi.content.like('content_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "İçerik beğenildi",
  "data": {
    "like": {
      "contentId": "content_64f8a1b2c3d4e5f6g7h8i9j0",
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "likedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 9. unlike(contentId: string): Promise<ApiResponse>
Belirli bir içeriğin beğenisini kaldırır.

**Parametreler:**
- `contentId` (string): İçerik ID'si

**Detaylı Örnek:**
```typescript
const unlike = await zapi.content.unlike('content_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "İçerik beğenisi kaldırıldı",
  "data": {
    "unlike": {
      "contentId": "content_64f8a1b2c3d4e5f6g7h8i9j0",
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "unlikedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 10. comment(contentId: string, data: any): Promise<ApiResponse>
Belirli bir içeriğe yorum yapar.

**Parametreler:**
- `contentId` (string): İçerik ID'si
- `data` (any): Yorum verileri
  - `content` (string): Yorum içeriği

**Detaylı Örnek:**
```typescript
const comment = await zapi.content.comment('content_64f8a1b2c3d4e5f6g7h8i9j0', {
  content: 'Çok güzel bir makale!'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yorum başarıyla eklendi",
  "data": {
    "comment": {
      "id": "comment_64f8a1b2c3d4e5f6g7h8i9j1",
      "contentId": "content_64f8a1b2c3d4e5f6g7h8i9j0",
      "content": "Çok güzel bir makale!",
      "author": {
        "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 11. getComments(contentId: string): Promise<ApiResponse>
Belirli bir içeriğin yorumlarını getirir.

**Parametreler:**
- `contentId` (string): İçerik ID'si

**Detaylı Örnek:**
```typescript
const comments = await zapi.content.getComments('content_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yorumlar getirildi",
  "data": {
    "comments": [
      {
        "id": "comment_64f8a1b2c3d4e5f6g7h8i9j0",
        "content": "Çok güzel bir makale!",
        "author": {
          "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1
  }
}
*/
```

### 12. getMetadata(contentId: string, path: string): Promise<ApiResponse>
İçerik metadata bilgilerini getirir.

**Parametreler:**
- `contentId` (string): İçerik ID'si
- `path` (string): Metadata path'i

**Detaylı Örnek:**
```typescript
const metadata = await zapi.content.getMetadata('content_64f8a1b2c3d4e5f6g7h8i9j0', 'seo');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata getirildi",
  "data": {
    "metadata": {
      "contentId": "content_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "seo",
      "value": {
        "metaDescription": "AI ve gelecek hakkında kapsamlı makale",
        "keywords": ["ai", "yapay zeka", "gelecek", "teknoloji"],
        "ogTitle": "AI ve Gelecek",
        "ogDescription": "Yapay zeka teknolojisi hızla gelişiyor..."
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 13. updateMetadata(contentId: string, path: string, value: any): Promise<ApiResponse>
İçerik metadata bilgilerini günceller.

**Parametreler:**
- `contentId` (string): İçerik ID'si
- `path` (string): Metadata path'i
- `value` (any): Güncellenecek değer

**Detaylı Örnek:**
```typescript
const updateMetadata = await zapi.content.updateMetadata('content_64f8a1b2c3d4e5f6g7h8i9j0', 'seo', {
  metaDescription: 'AI ve gelecek hakkında güncellenmiş makale',
  keywords: ['ai', 'yapay zeka', 'gelecek', 'teknoloji', 'güncellenmiş'],
  ogTitle: 'AI ve Gelecek - Güncellenmiş',
  ogDescription: 'Yapay zeka teknolojisi hızla gelişiyor ve gelecekte...'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata başarıyla güncellendi",
  "data": {
    "metadata": {
      "contentId": "content_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "seo",
      "value": {
        "metaDescription": "AI ve gelecek hakkında güncellenmiş makale",
        "keywords": ["ai", "yapay zeka", "gelecek", "teknoloji", "güncellenmiş"],
        "ogTitle": "AI ve Gelecek - Güncellenmiş",
        "ogDescription": "Yapay zeka teknolojisi hızla gelişiyor ve gelecekte..."
      },
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 14. deleteMetadata(contentId: string, path: string): Promise<ApiResponse>
İçerik metadata bilgilerini siler.

**Parametreler:**
- `contentId` (string): İçerik ID'si
- `path` (string): Metadata path'i

**Detaylı Örnek:**
```typescript
const deleteMetadata = await zapi.content.deleteMetadata('content_64f8a1b2c3d4e5f6g7h8i9j0', 'seo');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata başarıyla silindi",
  "data": {
    "deleted": {
      "contentId": "content_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "seo",
      "deletedAt": "2024-01-15T10:40:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
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
  // 1. İçerikleri listele
  const content = await zapi.content.list({
    limit: 10,
    page: 1,
    type: 'text',
    status: 'published'
  });
  console.log('Toplam içerik:', content.data.pagination.totalItems);
  
  // 2. Yeni içerik oluştur
  const create = await zapi.content.create({
    title: 'Yeni Makale',
    type: 'text',
    content: 'Bu yeni bir makale içeriğidir...',
    tags: ['yeni', 'makale', 'test'],
    category: 'technology'
  });
  const contentId = create.data.content.id;
  console.log('Yeni içerik oluşturuldu:', contentId);
  
  // 3. İçerik detayını getir
  const contentDetail = await zapi.content.get(contentId);
  console.log('İçerik başlığı:', contentDetail.data.content.title);
  console.log('İçerik durumu:', contentDetail.data.content.status);
  
  // 4. İçerik güncelle
  const update = await zapi.content.update(contentId, {
    title: 'Yeni Makale - Güncellenmiş',
    content: 'Bu güncellenmiş bir makale içeriğidir...',
    tags: ['yeni', 'makale', 'test', 'güncellenmiş']
  });
  console.log('İçerik güncellendi:', update.data.content.updatedAt);
  
  // 5. İçerik yayınla
  const publish = await zapi.content.publish(contentId);
  console.log('İçerik yayınlandı:', publish.data.content.publishedAt);
  
  // 6. İçerik beğen
  const like = await zapi.content.like(contentId);
  console.log('İçerik beğenildi:', like.data.like.likedAt);
  
  // 7. Yorum yap
  const comment = await zapi.content.comment(contentId, {
    content: 'Çok güzel bir makale!'
  });
  console.log('Yorum eklendi:', comment.data.comment.id);
  
  // 8. Yorumları getir
  const comments = await zapi.content.getComments(contentId);
  console.log('Toplam yorum:', comments.data.total);
  
  // 9. Metadata getir
  const metadata = await zapi.content.getMetadata(contentId, 'seo');
  console.log('SEO açıklaması:', metadata.data.metadata.value.metaDescription);
  
  // 10. Metadata güncelle
  const updateMetadata = await zapi.content.updateMetadata(contentId, 'seo', {
    metaDescription: 'Yeni makale hakkında SEO açıklaması',
    keywords: ['yeni', 'makale', 'seo', 'test']
  });
  console.log('Metadata güncellendi:', updateMetadata.data.metadata.updatedAt);
  
  // 11. İçerik beğenisini kaldır
  const unlike = await zapi.content.unlike(contentId);
  console.log('Beğeni kaldırıldı:', unlike.data.unlike.unlikedAt);
  
  // 12. İçerik yayından kaldır
  const unpublish = await zapi.content.unpublish(contentId);
  console.log('İçerik yayından kaldırıldı:', unpublish.data.content.unpublishedAt);
  
  // 13. Metadata sil
  const deleteMetadata = await zapi.content.deleteMetadata(contentId, 'seo');
  console.log('Metadata silindi:', deleteMetadata.data.deleted.deletedAt);
  
  // 14. İçerik sil
  const deleteContent = await zapi.content.delete(contentId);
  console.log('İçerik silindi:', deleteContent.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
