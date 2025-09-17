# Responses Endpoint - 9 Metod

Yanıt yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Yanıtları listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `status` (string): Yanıt durumu
  - `type` (string): Yanıt tipi

**Detaylı Örnek:**
```typescript
const responses = await zapi.responses.list({
  limit: 10,
  page: 1,
  status: 'active',
  type: 'template'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yanıtlar getirildi",
  "data": {
    "responses": [
      {
        "id": "resp_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "Welcome Response",
        "type": "template",
        "status": "active",
        "content": "Hoş geldiniz! Size nasıl yardımcı olabilirim?",
        "metadata": {
          "category": "greeting",
          "language": "tr",
          "tags": ["welcome", "greeting", "help"]
        },
        "usage": {
          "count": 1250,
          "lastUsed": "2024-01-15T10:40:00Z"
        },
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
Yeni yanıt oluşturur.

**Parametreler:**
- `data` (any): Yanıt verileri
  - `name` (string): Yanıt adı
  - `type` (string): Yanıt tipi
  - `content` (string): Yanıt içeriği
  - `metadata` (any): Ek veriler

**Detaylı Örnek:**
```typescript
const create = await zapi.responses.create({
  name: 'Error Response',
  type: 'template',
  content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
  metadata: {
    category: 'error',
    language: 'tr',
    tags: ['error', 'apology', 'retry']
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yanıt başarıyla oluşturuldu",
  "data": {
    "response": {
      "id": "resp_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Error Response",
      "type": "template",
      "status": "active",
      "content": "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
      "metadata": {
        "category": "error",
        "language": "tr",
        "tags": ["error", "apology", "retry"]
      },
      "usage": {
        "count": 0,
        "lastUsed": null
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(responseId: string): Promise<ApiResponse>
Belirli bir yanıtın detaylarını getirir.

**Parametreler:**
- `responseId` (string): Yanıt ID'si

**Detaylı Örnek:**
```typescript
const response = await zapi.responses.get('resp_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yanıt detayları getirildi",
  "data": {
    "response": {
      "id": "resp_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Welcome Response",
      "type": "template",
      "status": "active",
      "content": "Hoş geldiniz! Size nasıl yardımcı olabilirim?",
      "metadata": {
        "category": "greeting",
        "language": "tr",
        "tags": ["welcome", "greeting", "help"]
      },
      "usage": {
        "count": 1250,
        "lastUsed": "2024-01-15T10:40:00Z"
      },
      "variations": [
        {
          "id": "var_64f8a1b2c3d4e5f6g7h8i9j0",
          "content": "Merhaba! Size nasıl yardımcı olabilirim?",
          "language": "tr"
        }
      ],
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. update(responseId: string, data: any): Promise<ApiResponse>
Belirli bir yanıtı günceller.

**Parametreler:**
- `responseId` (string): Yanıt ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.responses.update('resp_64f8a1b2c3d4e5f6g7h8i9j0', {
  name: 'Updated Welcome Response',
  content: 'Hoş geldiniz! Size nasıl yardımcı olabilirim? Lütfen sorularınızı sorun.',
  metadata: {
    category: 'greeting',
    language: 'tr',
    tags: ['welcome', 'greeting', 'help', 'questions']
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yanıt başarıyla güncellendi",
  "data": {
    "response": {
      "id": "resp_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Updated Welcome Response",
      "type": "template",
      "status": "active",
      "content": "Hoş geldiniz! Size nasıl yardımcı olabilirim? Lütfen sorularınızı sorun.",
      "metadata": {
        "category": "greeting",
        "language": "tr",
        "tags": ["welcome", "greeting", "help", "questions"]
      },
      "usage": {
        "count": 1250,
        "lastUsed": "2024-01-15T10:40:00Z"
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/
```

### 5. delete(responseId: string): Promise<ApiResponse>
Belirli bir yanıtı siler.

**Parametreler:**
- `responseId` (string): Yanıt ID'si

**Detaylı Örnek:**
```typescript
const deleteResponse = await zapi.responses.delete('resp_64f8a1b2c3d4e5f6g7h8i9j1');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yanıt başarıyla silindi",
  "data": {
    "deleted": {
      "id": "resp_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Error Response",
      "deletedAt": "2024-01-15T10:45:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. activate(responseId: string): Promise<ApiResponse>
Belirli bir yanıtı aktif eder.

**Parametreler:**
- `responseId` (string): Yanıt ID'si

**Detaylı Örnek:**
```typescript
const activate = await zapi.responses.activate('resp_64f8a1b2c3d4e5f6g7h8i9j1');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yanıt başarıyla aktif edildi",
  "data": {
    "response": {
      "id": "resp_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Error Response",
      "status": "active",
      "activatedAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/
```

### 7. deactivate(responseId: string): Promise<ApiResponse>
Belirli bir yanıtı pasif eder.

**Parametreler:**
- `responseId` (string): Yanıt ID'si

**Detaylı Örnek:**
```typescript
const deactivate = await zapi.responses.deactivate('resp_64f8a1b2c3d4e5f6g7h8i9j1');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yanıt başarıyla pasif edildi",
  "data": {
    "response": {
      "id": "resp_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Error Response",
      "status": "inactive",
      "deactivatedAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/
```

### 8. getStats(options: any = {}): Promise<ApiResponse>
Yanıt istatistiklerini getirir.

**Parametreler:**
- `options` (any): İstatistik seçenekleri
  - `period` (string): İstatistik periyodu
  - `dateFrom` (string): Başlangıç tarihi
  - `dateTo` (string): Bitiş tarihi

**Detaylı Örnek:**
```typescript
const stats = await zapi.responses.getStats({
  period: 'monthly',
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yanıt istatistikleri getirildi",
  "data": {
    "stats": {
      "period": "monthly",
      "dateRange": {
        "from": "2024-01-01",
        "to": "2024-01-31"
      },
      "overview": {
        "totalResponses": 45,
        "activeResponses": 40,
        "inactiveResponses": 5,
        "totalUsage": 12500,
        "averageUsage": 277.8
      },
      "breakdown": {
        "byType": [
          {
            "type": "template",
            "count": 30,
            "usage": 8000
          },
          {
            "type": "dynamic",
            "count": 15,
            "usage": 4500
          }
        ],
        "byCategory": [
          {
            "category": "greeting",
            "count": 10,
            "usage": 3000
          },
          {
            "category": "error",
            "count": 8,
            "usage": 2500
          }
        ]
      },
      "topResponses": [
        {
          "id": "resp_64f8a1b2c3d4e5f6g7h8i9j0",
          "name": "Welcome Response",
          "usage": 1250
        }
      ]
    }
  }
}
*/
```

### 9. getMetadata(responseId: string, path: string): Promise<ApiResponse>
Yanıtın metadata bilgilerini getirir.

**Parametreler:**
- `responseId` (string): Yanıt ID'si
- `path` (string): Metadata path'i

**Detaylı Örnek:**
```typescript
const metadata = await zapi.responses.getMetadata('resp_64f8a1b2c3d4e5f6g7h8i9j0', 'custom');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata getirildi",
  "data": {
    "metadata": {
      "responseId": "resp_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "custom",
      "value": {
        "priority": "high",
        "context": "first_interaction",
        "fallback": true
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
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
  // 1. Yanıtları listele
  const responses = await zapi.responses.list({ limit: 10, status: 'active' });
  console.log('Toplam yanıt:', responses.data.pagination.totalItems);
  
  // 2. Yeni yanıt oluştur
  const create = await zapi.responses.create({
    name: 'Error Response',
    type: 'template',
    content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
    metadata: {
      category: 'error',
      language: 'tr',
      tags: ['error', 'apology', 'retry']
    }
  });
  const responseId = create.data.response.id;
  console.log('Yeni yanıt oluşturuldu:', responseId);
  
  // 3. Yanıt detayını getir
  const response = await zapi.responses.get(responseId);
  console.log('Yanıt:', response.data.response.name);
  console.log('İçerik:', response.data.response.content);
  
  // 4. Yanıt güncelle
  const update = await zapi.responses.update(responseId, {
    name: 'Updated Error Response',
    content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin. Sorun devam ederse destek ekibimizle iletişime geçin.'
  });
  console.log('Yanıt güncellendi:', update.data.response.updatedAt);
  
  // 5. Yanıt aktif et
  const activate = await zapi.responses.activate(responseId);
  console.log('Yanıt aktif edildi:', activate.data.response.activatedAt);
  
  // 6. İstatistikleri getir
  const stats = await zapi.responses.getStats({
    period: 'monthly',
    dateFrom: '2024-01-01',
    dateTo: '2024-01-31'
  });
  console.log('Toplam yanıt:', stats.data.stats.overview.totalResponses);
  console.log('Toplam kullanım:', stats.data.stats.overview.totalUsage);
  
  // 7. Metadata getir
  const metadata = await zapi.responses.getMetadata(responseId, 'custom');
  console.log('Metadata:', metadata.data.metadata.value.priority);
  
  // 8. Yanıt pasif et
  const deactivate = await zapi.responses.deactivate(responseId);
  console.log('Yanıt pasif edildi:', deactivate.data.response.deactivatedAt);
  
  // 9. Yanıt sil
  const deleteResponse = await zapi.responses.delete(responseId);
  console.log('Yanıt silindi:', deleteResponse.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
