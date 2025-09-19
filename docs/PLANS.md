# Plans Endpoint

Plan yönetimi endpoint'leri - Plan oluşturma, güncelleme, karşılaştırma, abone listesi ve analitik.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const plans = zapi.plans;
```

## Metodlar

### 1. list(options: any)

Planları listeler

**Parametreler:**
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await plans.list({
  status: "active",
  category: "premium",
  sortBy: "price",
  sortOrder: "asc"
});

if (result.success) {
  console.log('Planlar:', result.data);
  result.data.plans.forEach(plan => {
    console.log(`- ${plan.name}: ${plan.price} ${plan.currency}`);
  });
} else {
  console.error('Plan listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "plans": [
      {
        "id": "plan_123",
        "name": "Basic Plan",
        "description": "Temel özellikler için ideal",
        "price": 9.99,
        "currency": "USD",
        "billingCycle": "monthly",
        "status": "active",
        "category": "basic",
        "features": [
          "1000 API calls/month",
          "Email support",
          "Basic analytics"
        ],
        "limits": {
          "apiCalls": 1000,
          "storage": "1GB",
          "users": 10
        },
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      {
        "id": "plan_456",
        "name": "Pro Plan",
        "description": "Gelişmiş özellikler için",
        "price": 29.99,
        "currency": "USD",
        "billingCycle": "monthly",
        "status": "active",
        "category": "premium",
        "features": [
          "10000 API calls/month",
          "Priority support",
          "Advanced analytics",
          "Custom integrations"
        ],
        "limits": {
          "apiCalls": 10000,
          "storage": "10GB",
          "users": 100
        },
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 2,
    "categories": ["basic", "premium", "enterprise"]
  },
  "message": "Planlar başarıyla listelendi"
}
```

---

### 2. compare(planIds: string[])

Planları karşılaştırır

**Parametreler:**
- `planIds: string[]` - Karşılaştırılacak plan ID'leri

**Örnek Kullanım:**

```typescript
const result = await plans.compare(["plan_123", "plan_456", "plan_789"]);

if (result.success) {
  console.log('Plan karşılaştırması:', result.data);
  const { comparison, recommendations } = result.data;
} else {
  console.error('Plan karşılaştırma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "comparison": [
      {
        "id": "plan_123",
        "name": "Basic Plan",
        "price": 9.99,
        "currency": "USD",
        "billingCycle": "monthly",
        "features": [
          "1000 API calls/month",
          "Email support",
          "Basic analytics"
        ],
        "limits": {
          "apiCalls": 1000,
          "storage": "1GB",
          "users": 10
        },
        "score": 7.5
      },
      {
        "id": "plan_456",
        "name": "Pro Plan",
        "price": 29.99,
        "currency": "USD",
        "billingCycle": "monthly",
        "features": [
          "10000 API calls/month",
          "Priority support",
          "Advanced analytics",
          "Custom integrations"
        ],
        "limits": {
          "apiCalls": 10000,
          "storage": "10GB",
          "users": 100
        },
        "score": 8.8
      }
    ],
    "recommendations": {
      "bestValue": "plan_456",
      "mostPopular": "plan_123",
      "bestForEnterprise": "plan_789"
    },
    "comparisonDate": "2024-01-15T10:30:00Z"
  },
  "message": "Plan karşılaştırması başarıyla oluşturuldu"
}
```

---

### 3. create(data: any)

Yeni plan oluşturur

**Parametreler:**
- `data: any` - Plan verileri

**Örnek Kullanım:**

```typescript
const result = await plans.create({
  name: "Enterprise Plan",
  description: "Büyük işletmeler için",
  price: 99.99,
  currency: "USD",
  billingCycle: "monthly",
  category: "enterprise",
  features: [
    "Unlimited API calls",
    "24/7 phone support",
    "Custom integrations",
    "Dedicated account manager"
  ],
  limits: {
    apiCalls: -1, // -1 = unlimited
    storage: "100GB",
    users: 1000
  },
  settings: {
    allowUpgrade: true,
    allowDowngrade: false,
    trialDays: 14
  }
});

if (result.success) {
  console.log('Plan oluşturuldu:', result.data);
  const { id, name, price } = result.data;
} else {
  console.error('Plan oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "plan_789",
    "name": "Enterprise Plan",
    "description": "Büyük işletmeler için",
    "price": 99.99,
    "currency": "USD",
    "billingCycle": "monthly",
    "status": "active",
    "category": "enterprise",
    "features": [
      "Unlimited API calls",
      "24/7 phone support",
      "Custom integrations",
      "Dedicated account manager"
    ],
    "limits": {
      "apiCalls": -1,
      "storage": "100GB",
      "users": 1000
    },
    "settings": {
      "allowUpgrade": true,
      "allowDowngrade": false,
      "trialDays": 14
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Plan başarıyla oluşturuldu"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "PLAN_CREATION_FAILED",
    "message": "Plan oluşturulamadı"
  }
}
```

---

### 4. get(planId: string)

Belirli bir planı getirir

**Parametreler:**
- `planId: string` - Plan ID'si

**Örnek Kullanım:**

```typescript
const result = await plans.get("plan_123");

if (result.success) {
  console.log('Plan detayları:', result.data);
  const { name, price, features, limits } = result.data;
} else {
  console.error('Plan getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "plan_123",
    "name": "Basic Plan",
    "description": "Temel özellikler için ideal",
    "price": 9.99,
    "currency": "USD",
    "billingCycle": "monthly",
    "status": "active",
    "category": "basic",
    "features": [
      "1000 API calls/month",
      "Email support",
      "Basic analytics"
    ],
    "limits": {
      "apiCalls": 1000,
      "storage": "1GB",
      "users": 10
    },
    "settings": {
      "allowUpgrade": true,
      "allowDowngrade": true,
      "trialDays": 7
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "subscribers": {
      "total": 150,
      "active": 140,
      "trial": 10
    }
  },
  "message": "Plan başarıyla getirildi"
}
```

---

### 5. update(planId: string, data: any)

Planı günceller

**Parametreler:**
- `planId: string` - Plan ID'si
- `data: any` - Güncellenecek veriler

**Örnek Kullanım:**

```typescript
const result = await plans.update("plan_123", {
  name: "Updated Basic Plan",
  price: 12.99,
  features: [
    "1500 API calls/month",
    "Email support",
    "Basic analytics",
    "Priority support"
  ],
  limits: {
    apiCalls: 1500,
    storage: "2GB",
    users: 15
  }
});

if (result.success) {
  console.log('Plan güncellendi:', result.data);
} else {
  console.error('Plan güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "plan_123",
    "name": "Updated Basic Plan",
    "description": "Temel özellikler için ideal",
    "price": 12.99,
    "currency": "USD",
    "billingCycle": "monthly",
    "status": "active",
    "category": "basic",
    "features": [
      "1500 API calls/month",
      "Email support",
      "Basic analytics",
      "Priority support"
    ],
    "limits": {
      "apiCalls": 1500,
      "storage": "2GB",
      "users": 15
    },
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Plan başarıyla güncellendi"
}
```

---

### 6. delete(planId: string)

Planı siler

**Parametreler:**
- `planId: string` - Plan ID'si

**Örnek Kullanım:**

```typescript
const result = await plans.delete("plan_123");

if (result.success) {
  console.log('Plan silindi');
} else {
  console.error('Plan silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "deletedPlanId": "plan_123",
    "deletedAt": "2024-01-15T10:30:00Z",
    "deletedBy": "admin_456",
    "affectedSubscribers": 0
  },
  "message": "Plan başarıyla silindi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "PLAN_DELETION_FAILED",
    "message": "Plan silinemedi - Aktif aboneler var"
  }
}
```

---

### 7. getSubscribers(planId: string, options: any)

Planın abonelerini listeler

**Parametreler:**
- `planId: string` - Plan ID'si
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await plans.getSubscribers("plan_123", {
  page: 1,
  limit: 20,
  status: "active",
  sortBy: "subscribedAt",
  sortOrder: "desc"
});

if (result.success) {
  console.log('Plan aboneleri:', result.data);
  result.data.subscribers.forEach(subscriber => {
    console.log(`- ${subscriber.user.email} (${subscriber.status})`);
  });
} else {
  console.error('Abone listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "planId": "plan_123",
    "planName": "Basic Plan",
    "subscribers": [
      {
        "id": "sub_123",
        "user": {
          "id": "user_123",
          "email": "john@example.com",
          "firstName": "John",
          "lastName": "Doe"
        },
        "status": "active",
        "subscribedAt": "2024-01-15T10:30:00Z",
        "expiresAt": "2024-02-15T10:30:00Z",
        "billingCycle": "monthly",
        "price": 9.99,
        "currency": "USD"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    },
    "summary": {
      "totalSubscribers": 150,
      "activeSubscribers": 140,
      "trialSubscribers": 10,
      "cancelledSubscribers": 5
    }
  },
  "message": "Plan aboneleri başarıyla listelendi"
}
```

---

### 8. getAnalytics(planId: string, options: any)

Plan analitiklerini getirir

**Parametreler:**
- `planId: string` - Plan ID'si
- `options: any` - Analitik seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await plans.getAnalytics("plan_123", {
  period: "30d",
  includeRevenue: true,
  includeChurn: true
});

if (result.success) {
  console.log('Plan analitikleri:', result.data);
  const { revenue, subscribers, churn, growth } = result.data;
} else {
  console.error('Analitik getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "planId": "plan_123",
    "planName": "Basic Plan",
    "period": "30d",
    "revenue": {
      "total": 1498.50,
      "currency": "USD",
      "monthly": 1498.50,
      "growth": 15.5
    },
    "subscribers": {
      "total": 150,
      "new": 25,
      "cancelled": 5,
      "growth": 20,
      "growthRate": 15.4
    },
    "churn": {
      "rate": 3.3,
      "cancelled": 5,
      "retention": 96.7
    },
    "usage": {
      "averageApiCalls": 850,
      "averageStorage": "1.2GB",
      "averageUsers": 8
    },
    "conversion": {
      "trialToPaid": 85.0,
      "freeToPaid": 12.5
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Plan analitikleri başarıyla getirildi"
}
```

---

### 9. getMetadata(planId: string, path: string)

Plan metadata bilgilerini getirir

**Parametreler:**
- `planId: string` - Plan ID'si
- `path: string` - Metadata yolu (varsayılan: '')

**Örnek Kullanım:**

```typescript
// Tüm metadata'yı getir
const result = await plans.getMetadata("plan_123");

// Belirli bir path'i getir
const result = await plans.getMetadata("plan_123", "settings.trialDays");

if (result.success) {
  console.log('Metadata:', result.data);
} else {
  console.error('Metadata getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "settings": {
      "trialDays": 7,
      "allowUpgrade": true,
      "allowDowngrade": true,
      "autoRenew": true
    },
    "customFields": {
      "targetAudience": "small-business",
      "popularity": "high",
      "recommended": true
    },
    "tags": ["popular", "basic", "starter"],
    "notes": "En popüler plan",
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Metadata başarıyla getirildi"
}
```

---

### 10. updateMetadata(planId: string, path: string, value: any)

Plan metadata bilgilerini günceller

**Parametreler:**
- `planId: string` - Plan ID'si
- `path: string` - Metadata yolu
- `value: any` - Güncellenecek değer

**Örnek Kullanım:**

```typescript
const result = await plans.updateMetadata("plan_123", "settings.trialDays", 14);

if (result.success) {
  console.log('Metadata güncellendi:', result.data);
} else {
  console.error('Metadata güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "settings": {
      "trialDays": 14,
      "allowUpgrade": true,
      "allowDowngrade": true,
      "autoRenew": true
    }
  },
  "message": "Metadata başarıyla güncellendi"
}
```

---

### 11. deleteMetadata(planId: string, path: string)

Plan metadata bilgilerini siler

**Parametreler:**
- `planId: string` - Plan ID'si
- `path: string` - Metadata yolu

**Örnek Kullanım:**

```typescript
const result = await plans.deleteMetadata("plan_123", "customFields.targetAudience");

if (result.success) {
  console.log('Metadata silindi');
} else {
  console.error('Metadata silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "Metadata başarıyla silindi"
}
```

---

## Plan Kategorileri

| Kategori | Açıklama | Hedef Kitle |
|----------|----------|-------------|
| `basic` | Temel plan | Bireysel kullanıcılar |
| `premium` | Gelişmiş plan | Küçük işletmeler |
| `enterprise` | Kurumsal plan | Büyük işletmeler |
| `custom` | Özel plan | Özel gereksinimler |

## Plan Durumları

| Durum | Açıklama |
|-------|----------|
| `active` | Aktif ve satışta |
| `inactive` | Pasif, satışta değil |
| `draft` | Taslak |
| `archived` | Arşivlenmiş |

## Faturalama Döngüleri

| Döngü | Açıklama |
|-------|----------|
| `monthly` | Aylık |
| `quarterly` | Üç aylık |
| `yearly` | Yıllık |
| `lifetime` | Yaşam boyu |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `PLAN_NOT_FOUND` | Plan bulunamadı |
| `PLAN_CREATION_FAILED` | Plan oluşturulamadı |
| `PLAN_UPDATE_FAILED` | Plan güncellenemedi |
| `PLAN_DELETION_FAILED` | Plan silinemedi |
| `INVALID_PLAN_ID` | Geçersiz plan ID'si |
| `PLAN_ALREADY_EXISTS` | Plan zaten mevcut |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `INVALID_PLAN_DATA` | Geçersiz plan verisi |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Plan fiyatlarını güvenli bir şekilde yönetin
- Abone verilerini koruyun
- Faturalama bilgilerini güvenli tutun
- Plan değişikliklerini loglayın
- Düzenli olarak güvenlik denetimleri yapın

## Plan Yönetimi

```typescript
// Plan oluşturma
const newPlan = await plans.create({
  name: "Starter Plan",
  price: 5.99,
  currency: "USD",
  billingCycle: "monthly",
  features: ["500 API calls/month", "Email support"]
});

// Plan güncelleme
await plans.update("plan_123", {
  price: 7.99,
  features: ["750 API calls/month", "Email support", "Basic analytics"]
});

// Plan karşılaştırma
const comparison = await plans.compare(["plan_123", "plan_456"]);

// Abone listesi
const subscribers = await plans.getSubscribers("plan_123", {
  status: "active"
});
```

## Analitik ve Raporlama

```typescript
// Plan analitikleri
const analytics = await plans.getAnalytics("plan_123", {
  period: "30d",
  includeRevenue: true
});

console.log('Toplam gelir:', analytics.data.revenue.total);
console.log('Abone büyümesi:', analytics.data.subscribers.growth);
console.log('Churn oranı:', analytics.data.churn.rate);

// Gelir analizi
const revenue = analytics.data.revenue;
console.log('Aylık gelir:', revenue.monthly);
console.log('Büyüme oranı:', revenue.growth + '%');
```

## Plan Özellikleri

```typescript
// Özellik yönetimi
const plan = await plans.get("plan_123");

// Özellik kontrolü
const hasFeature = plan.data.features.includes("Priority support");
const hasLimit = plan.data.limits.apiCalls > 1000;

// Limit kontrolü
const isWithinLimit = currentUsage < plan.data.limits.apiCalls;
```
