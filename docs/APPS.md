# Apps Endpoint - 11 Metod

Uygulama yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Uygulamaları listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `search` (string): Arama terimi
  - `status` (string): Uygulama durumu
  - `sortBy` (string): Sıralama alanı
  - `sortOrder` (string): Sıralama yönü

**Detaylı Örnek:**
```typescript
const apps = await zapi.apps.list({
  limit: 10,
  page: 1,
  search: 'myapp',
  status: 'active',
  sortBy: 'createdAt',
  sortOrder: 'desc'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Uygulamalar getirildi",
  "data": {
    "apps": [
      {
        "id": "app_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "MyApp",
        "description": "My awesome application",
        "status": "active",
        "type": "web",
        "url": "https://myapp.com",
        "icon": "https://api.zapi.com/icons/app_64f8a1b2c3d4e5f6g7h8i9j0.png",
        "owner": {
          "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "stats": {
          "totalRequests": 1250,
          "totalUsers": 45,
          "lastActivity": "2024-01-15T10:30:00Z"
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
Yeni uygulama oluşturur.

**Parametreler:**
- `data` (any): Uygulama verileri
  - `name` (string): Uygulama adı
  - `description` (string): Açıklama
  - `type` (string): Uygulama tipi
  - `url` (string): Uygulama URL'i

**Detaylı Örnek:**
```typescript
const create = await zapi.apps.create({
  name: 'NewApp',
  description: 'My new application',
  type: 'mobile',
  url: 'https://newapp.com'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Uygulama başarıyla oluşturuldu",
  "data": {
    "app": {
      "id": "app_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "NewApp",
      "description": "My new application",
      "status": "active",
      "type": "mobile",
      "url": "https://newapp.com",
      "icon": null,
      "owner": {
        "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "stats": {
        "totalRequests": 0,
        "totalUsers": 0,
        "lastActivity": null
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(appId: string): Promise<ApiResponse>
Belirli bir uygulamanın detaylarını getirir.

**Parametreler:**
- `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const app = await zapi.apps.get('app_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Uygulama detayları getirildi",
  "data": {
    "app": {
      "id": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "MyApp",
      "description": "My awesome application",
      "status": "active",
      "type": "web",
      "url": "https://myapp.com",
      "icon": "https://api.zapi.com/icons/app_64f8a1b2c3d4e5f6g7h8i9j0.png",
      "owner": {
        "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "stats": {
        "totalRequests": 1250,
        "totalUsers": 45,
        "lastActivity": "2024-01-15T10:30:00Z"
      },
      "settings": {
        "rateLimiting": true,
        "caching": true,
        "logging": true
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. update(appId: string, data: any): Promise<ApiResponse>
Belirli bir uygulamayı günceller.

**Parametreler:**
- `appId` (string): Uygulama ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.apps.update('app_64f8a1b2c3d4e5f6g7h8i9j0', {
  name: 'MyApp Updated',
  description: 'Updated awesome application',
  url: 'https://myapp-updated.com',
  settings: {
    rateLimiting: true,
    caching: false,
    logging: true
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Uygulama başarıyla güncellendi",
  "data": {
    "app": {
      "id": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "MyApp Updated",
      "description": "Updated awesome application",
      "status": "active",
      "type": "web",
      "url": "https://myapp-updated.com",
      "icon": "https://api.zapi.com/icons/app_64f8a1b2c3d4e5f6g7h8i9j0.png",
      "owner": {
        "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "stats": {
        "totalRequests": 1250,
        "totalUsers": 45,
        "lastActivity": "2024-01-15T10:30:00Z"
      },
      "settings": {
        "rateLimiting": true,
        "caching": false,
        "logging": true
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 5. delete(appId: string): Promise<ApiResponse>
Belirli bir uygulamayı siler.

**Parametreler:**
- `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const deleteApp = await zapi.apps.delete('app_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Uygulama başarıyla silindi",
  "data": {
    "deleted": {
      "id": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "MyApp Updated",
      "deletedAt": "2024-01-15T10:40:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. activate(appId: string): Promise<ApiResponse>
Belirli bir uygulamayı aktif eder.

**Parametreler:**
- `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const activate = await zapi.apps.activate('app_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Uygulama başarıyla aktif edildi",
  "data": {
    "app": {
      "id": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "MyApp Updated",
      "status": "active",
      "activatedAt": "2024-01-15T10:40:00Z",
      "activatedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 7. deactivate(appId: string): Promise<ApiResponse>
Belirli bir uygulamayı pasif eder.

**Parametreler:**
- `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const deactivate = await zapi.apps.deactivate('app_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Uygulama başarıyla pasif edildi",
  "data": {
    "app": {
      "id": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "MyApp Updated",
      "status": "inactive",
      "deactivatedAt": "2024-01-15T10:40:00Z",
      "deactivatedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 8. getAppStats(appId: string, options: any = {}): Promise<ApiResponse>
Uygulama istatistiklerini getirir.

**Parametreler:**
- `appId` (string): Uygulama ID'si
- `options` (any): İstatistik seçenekleri

**Detaylı Örnek:**
```typescript
const appStats = await zapi.apps.getAppStats('app_64f8a1b2c3d4e5f6g7h8i9j0', {
  period: 'monthly',
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Uygulama istatistikleri getirildi",
  "data": {
    "stats": {
      "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "period": "monthly",
      "dateRange": {
        "from": "2024-01-01",
        "to": "2024-01-31"
      },
      "overview": {
        "totalRequests": 1250,
        "totalUsers": 45,
        "totalRevenue": 125.00,
        "averageResponseTime": "245ms",
        "errorRate": 0.8
      },
      "usage": {
        "requestsByDay": [
          {
            "date": "2024-01-15",
            "requests": 45,
            "users": 12
          }
        ],
        "requestsByHour": [
          {
            "hour": "10:00",
            "requests": 15,
            "users": 5
          }
        ]
      },
      "users": {
        "newUsers": 12,
        "activeUsers": 35,
        "retentionRate": 85.0
      }
    }
  }
}
*/
```

### 9. resetUsage(appId: string): Promise<ApiResponse>
Uygulama kullanımını sıfırlar.

**Parametreler:**
- `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const resetUsage = await zapi.apps.resetUsage('app_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Uygulama kullanımı sıfırlandı",
  "data": {
    "reset": {
      "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "resetAt": "2024-01-15T10:40:00Z",
      "resetBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 10. getMetadata(appId: string, path: string): Promise<ApiResponse>
Uygulama metadata bilgilerini getirir.

**Parametreler:**
- `appId` (string): Uygulama ID'si
- `path` (string): Metadata path'i

**Detaylı Örnek:**
```typescript
const metadata = await zapi.apps.getMetadata('app_64f8a1b2c3d4e5f6g7h8i9j0', 'settings');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata getirildi",
  "data": {
    "metadata": {
      "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "settings",
      "value": {
        "rateLimiting": true,
        "caching": false,
        "logging": true,
        "maxRequestsPerMinute": 100,
        "maxRequestsPerHour": 1000
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 11. updateMetadata(appId: string, path: string, value: any): Promise<ApiResponse>
Uygulama metadata bilgilerini günceller.

**Parametreler:**
- `appId` (string): Uygulama ID'si
- `path` (string): Metadata path'i
- `value` (any): Güncellenecek değer

**Detaylı Örnek:**
```typescript
const updateMetadata = await zapi.apps.updateMetadata('app_64f8a1b2c3d4e5f6g7h8i9j0', 'settings', {
  rateLimiting: true,
  caching: true,
  logging: false,
  maxRequestsPerMinute: 150,
  maxRequestsPerHour: 1500
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata başarıyla güncellendi",
  "data": {
    "metadata": {
      "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "settings",
      "value": {
        "rateLimiting": true,
        "caching": true,
        "logging": false,
        "maxRequestsPerMinute": 150,
        "maxRequestsPerHour": 1500
      },
      "updatedAt": "2024-01-15T10:40:00Z"
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
  // 1. Uygulamaları listele
  const apps = await zapi.apps.list({
    limit: 10,
    page: 1,
    status: 'active',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  console.log('Toplam uygulama:', apps.data.pagination.totalItems);
  
  // 2. Yeni uygulama oluştur
  const create = await zapi.apps.create({
    name: 'NewApp',
    description: 'My new application',
    type: 'mobile',
    url: 'https://newapp.com'
  });
  const appId = create.data.app.id;
  console.log('Yeni uygulama oluşturuldu:', appId);
  
  // 3. Uygulama detayını getir
  const app = await zapi.apps.get(appId);
  console.log('Uygulama:', app.data.app.name);
  console.log('Durum:', app.data.app.status);
  
  // 4. Uygulama güncelle
  const update = await zapi.apps.update(appId, {
    name: 'NewApp Updated',
    description: 'Updated application',
    url: 'https://newapp-updated.com'
  });
  console.log('Uygulama güncellendi:', update.data.app.updatedAt);
  
  // 5. Uygulama aktif et
  const activate = await zapi.apps.activate(appId);
  console.log('Uygulama aktif edildi:', activate.data.app.activatedAt);
  
  // 6. Uygulama istatistiklerini getir
  const appStats = await zapi.apps.getAppStats(appId, {
    period: 'monthly',
    dateFrom: '2024-01-01',
    dateTo: '2024-01-31'
  });
  console.log('Toplam istek:', appStats.data.stats.overview.totalRequests);
  console.log('Toplam kullanıcı:', appStats.data.stats.overview.totalUsers);
  
  // 7. Kullanımı sıfırla
  const resetUsage = await zapi.apps.resetUsage(appId);
  console.log('Kullanım sıfırlandı:', resetUsage.data.reset.resetAt);
  
  // 8. Metadata getir
  const metadata = await zapi.apps.getMetadata(appId, 'settings');
  console.log('Rate limiting:', metadata.data.metadata.value.rateLimiting);
  console.log('Caching:', metadata.data.metadata.value.caching);
  
  // 9. Metadata güncelle
  const updateMetadata = await zapi.apps.updateMetadata(appId, 'settings', {
    rateLimiting: true,
    caching: true,
    logging: false,
    maxRequestsPerMinute: 150
  });
  console.log('Metadata güncellendi:', updateMetadata.data.metadata.updatedAt);
  
  // 10. Uygulama pasif et
  const deactivate = await zapi.apps.deactivate(appId);
  console.log('Uygulama pasif edildi:', deactivate.data.app.deactivatedAt);
  
  // 11. Uygulama sil
  const deleteApp = await zapi.apps.delete(appId);
  console.log('Uygulama silindi:', deleteApp.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
