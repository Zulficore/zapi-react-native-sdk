# Subscription Endpoint - 6 Metod

Abonelik yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Abonelikleri listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `status` (string): Abonelik durumu
  - `planId` (string): Plan ID'si

**Detaylı Örnek:**
```typescript
const subscriptions = await zapi.subscription.list({
  limit: 10,
  page: 1,
  status: 'active',
  planId: 'plan_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Abonelikler getirildi",
  "data": {
    "subscriptions": [
      {
        "id": "sub_64f8a1b2c3d4e5f6g7h8i9j0",
        "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "planId": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
        "status": "active",
        "startDate": "2024-01-01T00:00:00Z",
        "endDate": "2024-02-01T00:00:00Z",
        "renewalDate": "2024-02-01T00:00:00Z",
        "canceledAt": null,
        "canceledBy": null,
        "paymentMethod": {
          "type": "credit_card",
          "last4": "4242",
          "brand": "visa"
        },
        "billing": {
          "amount": 29.99,
          "currency": "USD",
          "interval": "monthly",
          "nextBilling": "2024-02-01T00:00:00Z"
        },
        "usage": {
          "current": 1250,
          "limit": 10000,
          "resetDate": "2024-02-01T00:00:00Z"
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:40:00Z"
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
Yeni abonelik oluşturur.

**Parametreler:**
- `data` (any): Abonelik verileri
  - `userId` (string): Kullanıcı ID'si
  - `planId` (string): Plan ID'si
  - `paymentMethod` (any): Ödeme yöntemi
  - `billing` (any): Faturalama bilgileri

**Detaylı Örnek:**
```typescript
const create = await zapi.subscription.create({
  userId: 'user_64f8a1b2c3d4e5f6g7h8i9j0',
  planId: 'plan_64f8a1b2c3d4e5f6g7h8i9j0',
  paymentMethod: {
    type: 'credit_card',
    token: 'pm_1234567890'
  },
  billing: {
    amount: 29.99,
    currency: 'USD',
    interval: 'monthly'
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Abonelik başarıyla oluşturuldu",
  "data": {
    "subscription": {
      "id": "sub_64f8a1b2c3d4e5f6g7h8i9j1",
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "planId": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
      "status": "active",
      "startDate": "2024-01-15T10:40:00Z",
      "endDate": "2024-02-15T10:40:00Z",
      "renewalDate": "2024-02-15T10:40:00Z",
      "canceledAt": null,
      "canceledBy": null,
      "paymentMethod": {
        "type": "credit_card",
        "last4": "4242",
        "brand": "visa"
      },
      "billing": {
        "amount": 29.99,
        "currency": "USD",
        "interval": "monthly",
        "nextBilling": "2024-02-15T10:40:00Z"
      },
      "usage": {
        "current": 0,
        "limit": 10000,
        "resetDate": "2024-02-15T10:40:00Z"
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(subscriptionId: string): Promise<ApiResponse>
Belirli bir aboneliğin detaylarını getirir.

**Parametreler:**
- `subscriptionId` (string): Abonelik ID'si

**Detaylı Örnek:**
```typescript
const subscription = await zapi.subscription.get('sub_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Abonelik detayları getirildi",
  "data": {
    "subscription": {
      "id": "sub_64f8a1b2c3d4e5f6g7h8i9j0",
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "planId": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
      "status": "active",
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2024-02-01T00:00:00Z",
      "renewalDate": "2024-02-01T00:00:00Z",
      "canceledAt": null,
      "canceledBy": null,
      "paymentMethod": {
        "type": "credit_card",
        "last4": "4242",
        "brand": "visa"
      },
      "billing": {
        "amount": 29.99,
        "currency": "USD",
        "interval": "monthly",
        "nextBilling": "2024-02-01T00:00:00Z"
      },
      "usage": {
        "current": 1250,
        "limit": 10000,
        "resetDate": "2024-02-01T00:00:00Z"
      },
      "history": [
        {
          "action": "created",
          "timestamp": "2024-01-01T00:00:00Z",
          "details": "Subscription created"
        },
        {
          "action": "renewed",
          "timestamp": "2024-01-01T00:00:00Z",
          "details": "Subscription renewed"
        }
      ],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 4. update(subscriptionId: string, data: any): Promise<ApiResponse>
Belirli bir aboneliği günceller.

**Parametreler:**
- `subscriptionId` (string): Abonelik ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.subscription.update('sub_64f8a1b2c3d4e5f6g7h8i9j0', {
  planId: 'plan_64f8a1b2c3d4e5f6g7h8i9j1',
  paymentMethod: {
    type: 'credit_card',
    token: 'pm_0987654321'
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Abonelik başarıyla güncellendi",
  "data": {
    "subscription": {
      "id": "sub_64f8a1b2c3d4e5f6g7h8i9j0",
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "planId": "plan_64f8a1b2c3d4e5f6g7h8i9j1",
      "status": "active",
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2024-02-01T00:00:00Z",
      "renewalDate": "2024-02-01T00:00:00Z",
      "canceledAt": null,
      "canceledBy": null,
      "paymentMethod": {
        "type": "credit_card",
        "last4": "1234",
        "brand": "mastercard"
      },
      "billing": {
        "amount": 49.99,
        "currency": "USD",
        "interval": "monthly",
        "nextBilling": "2024-02-01T00:00:00Z"
      },
      "usage": {
        "current": 1250,
        "limit": 50000,
        "resetDate": "2024-02-01T00:00:00Z"
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/
```

### 5. cancel(subscriptionId: string, reason: string = ''): Promise<ApiResponse>
Belirli bir aboneliği iptal eder.

**Parametreler:**
- `subscriptionId` (string): Abonelik ID'si
- `reason` (string): İptal nedeni

**Detaylı Örnek:**
```typescript
const cancel = await zapi.subscription.cancel('sub_64f8a1b2c3d4e5f6g7h8i9j0', 'User requested cancellation');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Abonelik başarıyla iptal edildi",
  "data": {
    "subscription": {
      "id": "sub_64f8a1b2c3d4e5f6g7h8i9j0",
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "planId": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
      "status": "canceled",
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2024-02-01T00:00:00Z",
      "renewalDate": "2024-02-01T00:00:00Z",
      "canceledAt": "2024-01-15T10:45:00Z",
      "canceledBy": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "cancelReason": "User requested cancellation",
      "paymentMethod": {
        "type": "credit_card",
        "last4": "4242",
        "brand": "visa"
      },
      "billing": {
        "amount": 29.99,
        "currency": "USD",
        "interval": "monthly",
        "nextBilling": null
      },
      "usage": {
        "current": 1250,
        "limit": 10000,
        "resetDate": "2024-02-01T00:00:00Z"
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/
```

### 6. getStats(options: any = {}): Promise<ApiResponse>
Abonelik istatistiklerini getirir.

**Parametreler:**
- `options` (any): İstatistik seçenekleri
  - `period` (string): İstatistik periyodu
  - `dateFrom` (string): Başlangıç tarihi
  - `dateTo` (string): Bitiş tarihi

**Detaylı Örnek:**
```typescript
const stats = await zapi.subscription.getStats({
  period: 'monthly',
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Abonelik istatistikleri getirildi",
  "data": {
    "stats": {
      "period": "monthly",
      "dateRange": {
        "from": "2024-01-01",
        "to": "2024-01-31"
      },
      "overview": {
        "totalSubscriptions": 1250,
        "activeSubscriptions": 1180,
        "canceledSubscriptions": 70,
        "newSubscriptions": 150,
        "revenue": 35450.00,
        "averageRevenue": 28.36
      },
      "breakdown": {
        "byStatus": [
          {
            "status": "active",
            "count": 1180,
            "percentage": 94.4
          },
          {
            "status": "canceled",
            "count": 70,
            "percentage": 5.6
          }
        ],
        "byPlan": [
          {
            "planId": "plan_64f8a1b2c3d4e5f6g7h8i9j0",
            "planName": "Basic",
            "count": 800,
            "revenue": 23992.00
          },
          {
            "planId": "plan_64f8a1b2c3d4e5f6g7h8i9j1",
            "planName": "Pro",
            "count": 380,
            "revenue": 19000.00
          }
        ]
      },
      "trends": {
        "subscriptionGrowth": "increasing",
        "revenueGrowth": "increasing",
        "churnRate": 5.6
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
  // 1. Abonelikleri listele
  const subscriptions = await zapi.subscription.list({
    limit: 10,
    page: 1,
    status: 'active'
  });
  console.log('Toplam abonelik:', subscriptions.data.pagination.totalItems);
  
  // 2. Yeni abonelik oluştur
  const create = await zapi.subscription.create({
    userId: 'user_64f8a1b2c3d4e5f6g7h8i9j0',
    planId: 'plan_64f8a1b2c3d4e5f6g7h8i9j0',
    paymentMethod: {
      type: 'credit_card',
      token: 'pm_1234567890'
    },
    billing: {
      amount: 29.99,
      currency: 'USD',
      interval: 'monthly'
    }
  });
  const subscriptionId = create.data.subscription.id;
  console.log('Yeni abonelik oluşturuldu:', subscriptionId);
  
  // 3. Abonelik detayını getir
  const subscription = await zapi.subscription.get(subscriptionId);
  console.log('Abonelik durumu:', subscription.data.subscription.status);
  console.log('Plan ID:', subscription.data.subscription.planId);
  console.log('Faturalama:', subscription.data.subscription.billing.amount);
  
  // 4. Abonelik güncelle
  const update = await zapi.subscription.update(subscriptionId, {
    planId: 'plan_64f8a1b2c3d4e5f6g7h8i9j1',
    paymentMethod: {
      type: 'credit_card',
      token: 'pm_0987654321'
    }
  });
  console.log('Abonelik güncellendi:', update.data.subscription.updatedAt);
  
  // 5. İstatistikleri getir
  const stats = await zapi.subscription.getStats({
    period: 'monthly',
    dateFrom: '2024-01-01',
    dateTo: '2024-01-31'
  });
  console.log('Toplam abonelik:', stats.data.stats.overview.totalSubscriptions);
  console.log('Aktif abonelik:', stats.data.stats.overview.activeSubscriptions);
  console.log('Gelir:', stats.data.stats.overview.revenue);
  console.log('Churn oranı:', stats.data.stats.trends.churnRate);
  
  // 6. Abonelik iptal et
  const cancel = await zapi.subscription.cancel(subscriptionId, 'User requested cancellation');
  console.log('Abonelik iptal edildi:', cancel.data.subscription.canceledAt);
  console.log('İptal nedeni:', cancel.data.subscription.cancelReason);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```