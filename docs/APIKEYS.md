# APIKeys Endpoint - 9 Metod

API anahtarı yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
API anahtarlarını listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `search` (string): Arama terimi
  - `status` (string): Anahtar durumu

**Detaylı Örnek:**
```typescript
const apiKeys = await zapi.apiKeys.list({
  limit: 10,
  page: 1,
  search: 'production',
  status: 'active'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "API anahtarları getirildi",
  "data": {
    "apiKeys": [
      {
        "id": "key_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "Production API Key",
        "key": "zapi_***",
        "status": "active",
        "permissions": ["read", "write"],
        "rateLimit": {
          "requestsPerMinute": 100,
          "requestsPerHour": 1000,
          "requestsPerDay": 10000
        },
        "usage": {
          "totalRequests": 1250,
          "lastUsed": "2024-01-15T10:30:00Z"
        },
        "expiresAt": "2024-12-31T23:59:59Z",
        "createdAt": "2024-01-01T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 15,
      "itemsPerPage": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
*/
```

### 2. create(data: any): Promise<ApiResponse>
Yeni API anahtarı oluşturur.

**Parametreler:**
- `data` (any): Anahtar verileri
  - `name` (string): Anahtar adı
  - `permissions` (string[]): İzinler
  - `rateLimit` (any): Hız sınırları

**Detaylı Örnek:**
```typescript
const create = await zapi.apiKeys.create({
  name: 'Development API Key',
  permissions: ['read', 'write'],
  rateLimit: {
    requestsPerMinute: 50,
    requestsPerHour: 500,
    requestsPerDay: 5000
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "API anahtarı başarıyla oluşturuldu",
  "data": {
    "apiKey": {
      "id": "key_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Development API Key",
      "key": "zapi_new_***",
      "status": "active",
      "permissions": ["read", "write"],
      "rateLimit": {
        "requestsPerMinute": 50,
        "requestsPerHour": 500,
        "requestsPerDay": 5000
      },
      "usage": {
        "totalRequests": 0,
        "lastUsed": null
      },
      "expiresAt": "2024-12-31T23:59:59Z",
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(keyId: string): Promise<ApiResponse>
Belirli bir anahtarın detaylarını getirir.

**Parametreler:**
- `keyId` (string): Anahtar ID'si

**Detaylı Örnek:**
```typescript
const apiKey = await zapi.apiKeys.get('key_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "API anahtarı detayları getirildi",
  "data": {
    "apiKey": {
      "id": "key_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Production API Key",
      "key": "zapi_***",
      "status": "active",
      "permissions": ["read", "write"],
      "rateLimit": {
        "requestsPerMinute": 100,
        "requestsPerHour": 1000,
        "requestsPerDay": 10000
      },
      "usage": {
        "totalRequests": 1250,
        "lastUsed": "2024-01-15T10:30:00Z"
      },
      "expiresAt": "2024-12-31T23:59:59Z",
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. update(keyId: string, data: any): Promise<ApiResponse>
Belirli bir anahtarı günceller.

**Parametreler:**
- `keyId` (string): Anahtar ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.apiKeys.update('key_64f8a1b2c3d4e5f6g7h8i9j0', {
  name: 'Updated Production API Key',
  permissions: ['read', 'write', 'admin'],
  rateLimit: {
    requestsPerMinute: 150,
    requestsPerHour: 1500,
    requestsPerDay: 15000
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "API anahtarı başarıyla güncellendi",
  "data": {
    "apiKey": {
      "id": "key_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Updated Production API Key",
      "key": "zapi_***",
      "status": "active",
      "permissions": ["read", "write", "admin"],
      "rateLimit": {
        "requestsPerMinute": 150,
        "requestsPerHour": 1500,
        "requestsPerDay": 15000
      },
      "usage": {
        "totalRequests": 1250,
        "lastUsed": "2024-01-15T10:30:00Z"
      },
      "expiresAt": "2024-12-31T23:59:59Z",
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 5. delete(keyId: string): Promise<ApiResponse>
Belirli bir anahtarı siler.

**Parametreler:**
- `keyId` (string): Anahtar ID'si

**Detaylı Örnek:**
```typescript
const deleteKey = await zapi.apiKeys.delete('key_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "API anahtarı başarıyla silindi",
  "data": {
    "deleted": {
      "id": "key_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Updated Production API Key",
      "deletedAt": "2024-01-15T10:40:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. activate(keyId: string): Promise<ApiResponse>
Belirli bir anahtarı aktif eder.

**Parametreler:**
- `keyId` (string): Anahtar ID'si

**Detaylı Örnek:**
```typescript
const activate = await zapi.apiKeys.activate('key_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "API anahtarı başarıyla aktif edildi",
  "data": {
    "apiKey": {
      "id": "key_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Updated Production API Key",
      "status": "active",
      "activatedAt": "2024-01-15T10:40:00Z",
      "activatedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 7. deactivate(keyId: string): Promise<ApiResponse>
Belirli bir anahtarı pasif eder.

**Parametreler:**
- `keyId` (string): Anahtar ID'si

**Detaylı Örnek:**
```typescript
const deactivate = await zapi.apiKeys.deactivate('key_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "API anahtarı başarıyla pasif edildi",
  "data": {
    "apiKey": {
      "id": "key_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Updated Production API Key",
      "status": "inactive",
      "deactivatedAt": "2024-01-15T10:40:00Z",
      "deactivatedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 8. regenerate(keyId: string): Promise<ApiResponse>
Belirli bir anahtarı yeniden oluşturur.

**Parametreler:**
- `keyId` (string): Anahtar ID'si

**Detaylı Örnek:**
```typescript
const regenerate = await zapi.apiKeys.regenerate('key_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "API anahtarı başarıyla yeniden oluşturuldu",
  "data": {
    "apiKey": {
      "id": "key_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Updated Production API Key",
      "key": "zapi_new_***",
      "status": "active",
      "permissions": ["read", "write", "admin"],
      "rateLimit": {
        "requestsPerMinute": 150,
        "requestsPerHour": 1500,
        "requestsPerDay": 15000
      },
      "usage": {
        "totalRequests": 0,
        "lastUsed": null
      },
      "expiresAt": "2024-12-31T23:59:59Z",
      "regeneratedAt": "2024-01-15T10:40:00Z",
      "regeneratedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 9. getUsage(keyId: string): Promise<ApiResponse>
Anahtar kullanım bilgilerini getirir.

**Parametreler:**
- `keyId` (string): Anahtar ID'si

**Detaylı Örnek:**
```typescript
const usage = await zapi.apiKeys.getUsage('key_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Anahtar kullanım bilgileri getirildi",
  "data": {
    "usage": {
      "keyId": "key_64f8a1b2c3d4e5f6g7h8i9j0",
      "summary": {
        "totalRequests": 1250,
        "requestsToday": 45,
        "requestsThisWeek": 320,
        "requestsThisMonth": 1250
      },
      "breakdown": {
        "byEndpoint": [
          {
            "endpoint": "chat",
            "requests": 800,
            "percentage": 64.0
          },
          {
            "endpoint": "images",
            "requests": 300,
            "percentage": 24.0
          },
          {
            "endpoint": "audio",
            "requests": 150,
            "percentage": 12.0
          }
        ],
        "byDay": [
          {
            "date": "2024-01-15",
            "requests": 45
          },
          {
            "date": "2024-01-14",
            "requests": 38
          }
        ]
      },
      "rateLimit": {
        "current": {
          "requestsPerMinute": 15,
          "requestsPerHour": 150,
          "requestsPerDay": 1250
        },
        "limit": {
          "requestsPerMinute": 150,
          "requestsPerHour": 1500,
          "requestsPerDay": 15000
        }
      }
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
  // 1. API anahtarlarını listele
  const apiKeys = await zapi.apiKeys.list({
    limit: 10,
    page: 1,
    status: 'active'
  });
  console.log('Toplam anahtar:', apiKeys.data.pagination.totalItems);
  
  // 2. Yeni API anahtarı oluştur
  const create = await zapi.apiKeys.create({
    name: 'Development API Key',
    permissions: ['read', 'write'],
    rateLimit: {
      requestsPerMinute: 50,
      requestsPerHour: 500,
      requestsPerDay: 5000
    }
  });
  const keyId = create.data.apiKey.id;
  console.log('Yeni anahtar oluşturuldu:', keyId);
  
  // 3. Anahtar detayını getir
  const apiKey = await zapi.apiKeys.get(keyId);
  console.log('Anahtar adı:', apiKey.data.apiKey.name);
  console.log('Durum:', apiKey.data.apiKey.status);
  
  // 4. Anahtar güncelle
  const update = await zapi.apiKeys.update(keyId, {
    name: 'Updated Development API Key',
    permissions: ['read', 'write', 'admin'],
    rateLimit: {
      requestsPerMinute: 100,
      requestsPerHour: 1000,
      requestsPerDay: 10000
    }
  });
  console.log('Anahtar güncellendi:', update.data.apiKey.updatedAt);
  
  // 5. Anahtar aktif et
  const activate = await zapi.apiKeys.activate(keyId);
  console.log('Anahtar aktif edildi:', activate.data.apiKey.activatedAt);
  
  // 6. Anahtar kullanım bilgilerini getir
  const usage = await zapi.apiKeys.getUsage(keyId);
  console.log('Toplam istek:', usage.data.usage.summary.totalRequests);
  console.log('Bugünkü istek:', usage.data.usage.summary.requestsToday);
  
  // 7. Anahtar yeniden oluştur
  const regenerate = await zapi.apiKeys.regenerate(keyId);
  console.log('Anahtar yeniden oluşturuldu:', regenerate.data.apiKey.regeneratedAt);
  
  // 8. Anahtar pasif et
  const deactivate = await zapi.apiKeys.deactivate(keyId);
  console.log('Anahtar pasif edildi:', deactivate.data.apiKey.deactivatedAt);
  
  // 9. Anahtar sil
  const deleteKey = await zapi.apiKeys.delete(keyId);
  console.log('Anahtar silindi:', deleteKey.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
