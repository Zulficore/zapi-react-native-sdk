# Plans Endpoint - 11 Metod

Plan yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Planları listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `status` (string): Plan durumu
  - `type` (string): Plan tipi

**Detaylı Örnek:**
```typescript
const plans = await zapi.plans.list({
  limit: 10,
  page: 1,
  status: 'active',
  type: 'monthly'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Planlar getirildi",
  "data": {
    "plans": [
      {
        "id": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "Premium Plan",
        "type": "monthly",
        "status": "active",
        "price": 29.99,
        "currency": "USD",
        "features": [
          "10,000 API requests",
          "Priority support",
          "Advanced analytics"
        ],
        "limits": {
          "requests": 10000,
          "storage": "10GB",
          "users": 100
        },
        "description": "Perfect for growing businesses",
        "popular": true,
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
Yeni plan oluşturur.

**Parametreler:**
- `data` (any): Plan verileri
  - `name` (string): Plan adı
  - `type` (string): Plan tipi
  - `price` (number): Fiyat
  - `features` (string[]): Özellikler

**Detaylı Örnek:**
```typescript
const create = await zapi.plans.create({
  name: 'Enterprise Plan',
  type: 'yearly',
  price: 299.99,
  currency: 'USD',
  features: [
    '100,000 API requests',
    '24/7 Priority support',
    'Advanced analytics',
    'Custom integrations'
  ],
  limits: {
    requests: 100000,
    storage: '100GB',
    users: 1000
  },
  description: 'For large enterprises'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Plan başarıyla oluşturuldu",
  "data": {
    "plan": {
      "id": "plan_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Enterprise Plan",
      "type": "yearly",
      "status": "active",
      "price": 299.99,
      "currency": "USD",
      "features": [
        "100,000 API requests",
        "24/7 Priority support",
        "Advanced analytics",
        "Custom integrations"
      ],
      "limits": {
        "requests": 100000,
        "storage": "100GB",
        "users": 1000
      },
      "description": "For large enterprises",
      "popular": false,
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(planId: string): Promise<ApiResponse>
Belirli bir planın detaylarını getirir.

**Parametreler:**
- `planId` (string): Plan ID'si

**Detaylı Örnek:**
```typescript
const plan = await zapi.plans.get('plan_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Plan detayları getirildi",
  "data": {
    "plan": {
      "id": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Premium Plan",
      "type": "monthly",
      "status": "active",
      "price": 29.99,
      "currency": "USD",
      "features": [
        "10,000 API requests",
        "Priority support",
        "Advanced analytics"
      ],
      "limits": {
        "requests": 10000,
        "storage": "10GB",
        "users": 100
      },
      "description": "Perfect for growing businesses",
      "popular": true,
      "stats": {
        "totalSubscribers": 1250,
        "activeSubscribers": 1180,
        "revenue": 36975.00
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. update(planId: string, data: any): Promise<ApiResponse>
Belirli bir planı günceller.

**Parametreler:**
- `planId` (string): Plan ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.plans.update('plan_64f8a1b2c3d4e5f6g7h8i9j0', {
  name: 'Premium Plan Updated',
  price: 34.99,
  features: [
    '15,000 API requests',
    'Priority support',
    'Advanced analytics',
    'Custom dashboards'
  ],
  limits: {
    requests: 15000,
    storage: '15GB',
    users: 150
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Plan başarıyla güncellendi",
  "data": {
    "plan": {
      "id": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Premium Plan Updated",
      "type": "monthly",
      "status": "active",
      "price": 34.99,
      "currency": "USD",
      "features": [
        "15,000 API requests",
        "Priority support",
        "Advanced analytics",
        "Custom dashboards"
      ],
      "limits": {
        "requests": 15000,
        "storage": "15GB",
        "users": 150
      },
      "description": "Perfect for growing businesses",
      "popular": true,
      "stats": {
        "totalSubscribers": 1250,
        "activeSubscribers": 1180,
        "revenue": 36975.00
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 5. delete(planId: string): Promise<ApiResponse>
Belirli bir planı siler.

**Parametreler:**
- `planId` (string): Plan ID'si

**Detaylı Örnek:**
```typescript
const deletePlan = await zapi.plans.delete('plan_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Plan başarıyla silindi",
  "data": {
    "deleted": {
      "id": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Premium Plan Updated",
      "deletedAt": "2024-01-15T10:40:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. activate(planId: string): Promise<ApiResponse>
Belirli bir planı aktif eder.

**Parametreler:**
- `planId` (string): Plan ID'si

**Detaylı Örnek:**
```typescript
const activate = await zapi.plans.activate('plan_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Plan başarıyla aktif edildi",
  "data": {
    "plan": {
      "id": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Premium Plan Updated",
      "status": "active",
      "activatedAt": "2024-01-15T10:40:00Z",
      "activatedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 7. deactivate(planId: string): Promise<ApiResponse>
Belirli bir planı pasif eder.

**Parametreler:**
- `planId` (string): Plan ID'si

**Detaylı Örnek:**
```typescript
const deactivate = await zapi.plans.deactivate('plan_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Plan başarıyla pasif edildi",
  "data": {
    "plan": {
      "id": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Premium Plan Updated",
      "status": "inactive",
      "deactivatedAt": "2024-01-15T10:40:00Z",
      "deactivatedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 8. getSubscribers(planId: string): Promise<ApiResponse>
Plan abonelerini getirir.

**Parametreler:**
- `planId` (string): Plan ID'si

**Detaylı Örnek:**
```typescript
const subscribers = await zapi.plans.getSubscribers('plan_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Plan aboneleri getirildi",
  "data": {
    "subscribers": [
      {
        "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "John Doe",
        "email": "john@example.com",
        "subscribedAt": "2024-01-01T10:30:00Z",
        "status": "active",
        "nextBilling": "2024-02-01T10:30:00Z"
      }
    ],
    "total": 1250,
    "active": 1180,
    "inactive": 70
  }
}
*/
```

### 9. getStats(planId: string): Promise<ApiResponse>
Plan istatistiklerini getirir.

**Parametreler:**
- `planId` (string): Plan ID'si

**Detaylı Örnek:**
```typescript
const stats = await zapi.plans.getStats('plan_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Plan istatistikleri getirildi",
  "data": {
    "stats": {
      "planId": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
      "subscribers": {
        "total": 1250,
        "active": 1180,
        "inactive": 70,
        "newThisMonth": 125,
        "churnRate": 5.6
      },
      "revenue": {
        "total": 36975.00,
        "thisMonth": 3150.00,
        "lastMonth": 2980.00,
        "growth": 5.7
      },
      "usage": {
        "averageRequests": 7500,
        "averageStorage": "7.5GB",
        "averageUsers": 75
      },
      "conversion": {
        "trialToSubscription": 15.5,
        "freeToSubscription": 8.2
      }
    }
  }
}
*/
```

### 10. getMetadata(planId: string, path: string): Promise<ApiResponse>
Plan metadata bilgilerini getirir.

**Parametreler:**
- `planId` (string): Plan ID'si
- `path` (string): Metadata path'i

**Detaylı Örnek:**
```typescript
const metadata = await zapi.plans.getMetadata('plan_64f8a1b2c3d4e5f6g7h8i9j0', 'features');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata getirildi",
  "data": {
    "metadata": {
      "planId": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "features",
      "value": {
        "apiAccess": true,
        "prioritySupport": true,
        "analytics": true,
        "customIntegrations": false,
        "whiteLabel": false,
        "sla": "99.9%",
        "supportHours": "9-17 GMT"
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 11. updateMetadata(planId: string, path: string, value: any): Promise<ApiResponse>
Plan metadata bilgilerini günceller.

**Parametreler:**
- `planId` (string): Plan ID'si
- `path` (string): Metadata path'i
- `value` (any): Güncellenecek değer

**Detaylı Örnek:**
```typescript
const updateMetadata = await zapi.plans.updateMetadata('plan_64f8a1b2c3d4e5f6g7h8i9j0', 'features', {
  apiAccess: true,
  prioritySupport: true,
  analytics: true,
  customIntegrations: true,
  whiteLabel: false,
  sla: '99.95%',
  supportHours: '24/7'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata başarıyla güncellendi",
  "data": {
    "metadata": {
      "planId": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "features",
      "value": {
        "apiAccess": true,
        "prioritySupport": true,
        "analytics": true,
        "customIntegrations": true,
        "whiteLabel": false,
        "sla": "99.95%",
        "supportHours": "24/7"
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
  // 1. Planları listele
  const plans = await zapi.plans.list({
    limit: 10,
    page: 1,
    status: 'active'
  });
  console.log('Toplam plan:', plans.data.pagination.totalItems);
  
  // 2. Yeni plan oluştur
  const create = await zapi.plans.create({
    name: 'Enterprise Plan',
    type: 'yearly',
    price: 299.99,
    currency: 'USD',
    features: ['100,000 API requests', '24/7 support'],
    limits: { requests: 100000, storage: '100GB', users: 1000 }
  });
  const planId = create.data.plan.id;
  console.log('Yeni plan oluşturuldu:', planId);
  
  // 3. Plan detayını getir
  const plan = await zapi.plans.get(planId);
  console.log('Plan adı:', plan.data.plan.name);
  console.log('Plan fiyatı:', plan.data.plan.price);
  
  // 4. Plan güncelle
  const update = await zapi.plans.update(planId, {
    name: 'Enterprise Plan Updated',
    price: 349.99,
    features: ['150,000 API requests', '24/7 support', 'Custom integrations']
  });
  console.log('Plan güncellendi:', update.data.plan.updatedAt);
  
  // 5. Plan aktif et
  const activate = await zapi.plans.activate(planId);
  console.log('Plan aktif edildi:', activate.data.plan.activatedAt);
  
  // 6. Plan abonelerini getir
  const subscribers = await zapi.plans.getSubscribers(planId);
  console.log('Toplam abone:', subscribers.data.total);
  console.log('Aktif abone:', subscribers.data.active);
  
  // 7. Plan istatistiklerini getir
  const stats = await zapi.plans.getStats(planId);
  console.log('Toplam gelir:', stats.data.stats.revenue.total);
  console.log('Churn oranı:', stats.data.stats.subscribers.churnRate);
  
  // 8. Metadata getir
  const metadata = await zapi.plans.getMetadata(planId, 'features');
  console.log('API erişimi:', metadata.data.metadata.value.apiAccess);
  console.log('SLA:', metadata.data.metadata.value.sla);
  
  // 9. Metadata güncelle
  const updateMetadata = await zapi.plans.updateMetadata(planId, 'features', {
    apiAccess: true,
    prioritySupport: true,
    analytics: true,
    customIntegrations: true,
    sla: '99.99%'
  });
  console.log('Metadata güncellendi:', updateMetadata.data.metadata.updatedAt);
  
  // 10. Plan pasif et
  const deactivate = await zapi.plans.deactivate(planId);
  console.log('Plan pasif edildi:', deactivate.data.plan.deactivatedAt);
  
  // 11. Plan sil
  const deletePlan = await zapi.plans.delete(planId);
  console.log('Plan silindi:', deletePlan.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
