# Subscription Endpoint

Abonelik yönetimi endpoint'leri - Abonelik oluşturma, iptal etme, yenileme, analitik ve yükseltme kontrolü.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const subscription = zapi.subscription;
```

## Metodlar

### 1. create(data: any)

Yeni abonelik oluşturur

**Parametreler:**
- `data: any` - Abonelik verileri

**Örnek Kullanım:**

```typescript
const result = await subscription.create({
  planId: "plan_123",
  billingCycle: "monthly",
  paymentMethod: "credit_card",
  paymentDetails: {
    cardNumber: "4111111111111111",
    expiryMonth: "12",
    expiryYear: "2025",
    cvv: "123",
    cardholderName: "John Doe"
  },
  billingAddress: {
    street: "123 Main St",
    city: "Istanbul",
    country: "Turkey",
    postalCode: "34000"
  },
  startDate: "2024-01-15",
  trialDays: 7,
  autoRenew: true
});

if (result.success) {
  console.log('Abonelik oluşturuldu:', result.data);
  const { id, status, nextBillingDate } = result.data;
} else {
  console.error('Abonelik oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "sub_123",
    "planId": "plan_123",
    "planName": "Basic Plan",
    "userId": "user_123",
    "status": "active",
    "billingCycle": "monthly",
    "price": 9.99,
    "currency": "USD",
    "startDate": "2024-01-15T10:30:00Z",
    "nextBillingDate": "2024-02-15T10:30:00Z",
    "trialEndDate": "2024-01-22T10:30:00Z",
    "isTrial": true,
    "autoRenew": true,
    "paymentMethod": "credit_card",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Abonelik başarıyla oluşturuldu"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "SUBSCRIPTION_CREATION_FAILED",
    "message": "Abonelik oluşturulamadı - Ödeme başarısız"
  }
}
```

---

### 2. cancel(reason: string)

Aboneliği iptal eder

**Parametreler:**
- `reason: string` - İptal nedeni (varsayılan: '')

**Örnek Kullanım:**

```typescript
const result = await subscription.cancel("Fiyat çok yüksek");

if (result.success) {
  console.log('Abonelik iptal edildi:', result.data);
  const { id, status, cancellationDate } = result.data;
} else {
  console.error('Abonelik iptal hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "sub_123",
    "status": "cancelled",
    "cancellationDate": "2024-01-15T10:30:00Z",
    "cancellationReason": "Fiyat çok yüksek",
    "effectiveDate": "2024-02-15T10:30:00Z",
    "refundAmount": 0,
    "refundReason": "No refund for current period"
  },
  "message": "Abonelik başarıyla iptal edildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "SUBSCRIPTION_CANCELLATION_FAILED",
    "message": "Abonelik iptal edilemedi"
  }
}
```

---

### 3. renew(data: any)

Aboneliği yeniler

**Parametreler:**
- `data: any` - Yenileme verileri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await subscription.renew({
  paymentMethod: "credit_card",
  paymentDetails: {
    cardNumber: "4111111111111111",
    expiryMonth: "12",
    expiryYear: "2025",
    cvv: "123"
  },
  extendPeriod: "1 month"
});

if (result.success) {
  console.log('Abonelik yenilendi:', result.data);
  const { id, status, nextBillingDate } = result.data;
} else {
  console.error('Abonelik yenileme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "sub_123",
    "status": "active",
    "renewedAt": "2024-01-15T10:30:00Z",
    "nextBillingDate": "2024-03-15T10:30:00Z",
    "paymentAmount": 9.99,
    "currency": "USD",
    "paymentStatus": "successful",
    "autoRenew": true
  },
  "message": "Abonelik başarıyla yenilendi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "SUBSCRIPTION_RENEWAL_FAILED",
    "message": "Abonelik yenilenemedi - Ödeme başarısız"
  }
}
```

---

### 4. getAnalytics(options: any)

Abonelik analitiklerini getirir

**Parametreler:**
- `options: any` - Analitik seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await subscription.getAnalytics({
  period: "30d",
  includeRevenue: true,
  includeUsage: true
});

if (result.success) {
  console.log('Abonelik analitikleri:', result.data);
  const { revenue, usage, trends } = result.data;
} else {
  console.error('Analitik getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "period": "30d",
    "revenue": {
      "total": 9.99,
      "currency": "USD",
      "monthly": 9.99,
      "growth": 0
    },
    "usage": {
      "apiCalls": 750,
      "storage": "1.2GB",
      "users": 8,
      "limit": {
        "apiCalls": 1000,
        "storage": "1GB",
        "users": 10
      }
    },
    "trends": {
      "apiCallsGrowth": 15.5,
      "storageGrowth": 8.2,
      "userGrowth": 12.0
    },
    "billing": {
      "nextBillingDate": "2024-02-15T10:30:00Z",
      "billingCycle": "monthly",
      "autoRenew": true,
      "paymentMethod": "credit_card"
    },
    "status": {
      "current": "active",
      "trial": false,
      "cancelled": false
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Abonelik analitikleri başarıyla getirildi"
}
```

---

### 5. getDetails()

Abonelik detaylarını getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await subscription.getDetails();

if (result.success) {
  console.log('Abonelik detayları:', result.data);
  const { plan, billing, usage, history } = result.data;
} else {
  console.error('Abonelik detay hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "sub_123",
    "plan": {
      "id": "plan_123",
      "name": "Basic Plan",
      "description": "Temel özellikler için ideal",
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
      }
    },
    "billing": {
      "status": "active",
      "startDate": "2024-01-15T10:30:00Z",
      "nextBillingDate": "2024-02-15T10:30:00Z",
      "trialEndDate": "2024-01-22T10:30:00Z",
      "isTrial": false,
      "autoRenew": true,
      "paymentMethod": "credit_card",
      "billingAddress": {
        "street": "123 Main St",
        "city": "Istanbul",
        "country": "Turkey",
        "postalCode": "34000"
      }
    },
    "usage": {
      "apiCalls": {
        "used": 750,
        "limit": 1000,
        "percentage": 75
      },
      "storage": {
        "used": "1.2GB",
        "limit": "1GB",
        "percentage": 120
      },
      "users": {
        "used": 8,
        "limit": 10,
        "percentage": 80
      }
    },
    "history": [
      {
        "date": "2024-01-15T10:30:00Z",
        "action": "created",
        "description": "Abonelik oluşturuldu"
      },
      {
        "date": "2024-01-22T10:30:00Z",
        "action": "trial_ended",
        "description": "Deneme süresi sona erdi"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Abonelik detayları başarıyla getirildi"
}
```

---

### 6. checkUpgrade()

Abonelik yükseltme seçeneklerini kontrol eder

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await subscription.checkUpgrade();

if (result.success) {
  console.log('Yükseltme seçenekleri:', result.data);
  const { availableUpgrades, recommendations, benefits } = result.data;
} else {
  console.error('Yükseltme kontrol hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "currentPlan": {
      "id": "plan_123",
      "name": "Basic Plan",
      "price": 9.99,
      "currency": "USD"
    },
    "availableUpgrades": [
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
        "benefits": [
          "10x daha fazla API çağrısı",
          "Öncelikli destek",
          "Gelişmiş analitikler"
        ],
        "upgradePrice": 20.00,
        "savings": "33% daha uygun"
      },
      {
        "id": "plan_789",
        "name": "Enterprise Plan",
        "price": 99.99,
        "currency": "USD",
        "billingCycle": "monthly",
        "features": [
          "Unlimited API calls",
          "24/7 phone support",
          "Custom integrations",
          "Dedicated account manager"
        ],
        "benefits": [
          "Sınırsız API çağrısı",
          "7/24 telefon desteği",
          "Özel entegrasyonlar"
        ],
        "upgradePrice": 90.00,
        "savings": "10% daha uygun"
      }
    ],
    "recommendations": {
      "bestValue": "plan_456",
      "mostPopular": "plan_456",
      "bestForGrowth": "plan_789"
    },
    "upgradeBenefits": {
      "immediate": [
        "Daha fazla API çağrısı",
        "Öncelikli destek",
        "Gelişmiş özellikler"
      ],
      "longTerm": [
        "Daha iyi performans",
        "Özel entegrasyonlar",
        "Dedicated account manager"
      ]
    },
    "lastChecked": "2024-01-15T10:30:00Z"
  },
  "message": "Yükseltme seçenekleri başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "UPGRADE_CHECK_FAILED",
    "message": "Yükseltme seçenekleri kontrol edilemedi"
  }
}
```

---

## Abonelik Durumları

| Durum | Açıklama |
|-------|----------|
| `active` | Aktif abonelik |
| `trial` | Deneme süresi |
| `cancelled` | İptal edilmiş |
| `expired` | Süresi dolmuş |
| `suspended` | Askıya alınmış |
| `pending` | Onay bekliyor |

## Ödeme Yöntemleri

| Yöntem | Açıklama |
|--------|----------|
| `credit_card` | Kredi kartı |
| `debit_card` | Banka kartı |
| `paypal` | PayPal |
| `bank_transfer` | Banka havalesi |
| `crypto` | Kripto para |

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
| `SUBSCRIPTION_NOT_FOUND` | Abonelik bulunamadı |
| `SUBSCRIPTION_CREATION_FAILED` | Abonelik oluşturulamadı |
| `SUBSCRIPTION_CANCELLATION_FAILED` | Abonelik iptal edilemedi |
| `SUBSCRIPTION_RENEWAL_FAILED` | Abonelik yenilenemedi |
| `UPGRADE_CHECK_FAILED` | Yükseltme kontrol edilemedi |
| `PAYMENT_FAILED` | Ödeme başarısız |
| `INVALID_PAYMENT_METHOD` | Geçersiz ödeme yöntemi |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Ödeme bilgilerini güvenli bir şekilde işleyin
- PCI DSS standartlarına uyun
- Abonelik verilerini koruyun
- Ödeme işlemlerini loglayın
- Düzenli olarak güvenlik denetimleri yapın

## Abonelik Yönetimi

```typescript
// Abonelik oluşturma
const newSubscription = await subscription.create({
  planId: "plan_123",
  billingCycle: "monthly",
  paymentMethod: "credit_card"
});

// Abonelik iptal etme
await subscription.cancel("Fiyat çok yüksek");

// Abonelik yenileme
await subscription.renew({
  paymentMethod: "credit_card",
  extendPeriod: "1 month"
});

// Abonelik detayları
const details = await subscription.getDetails();
```

## Kullanım İzleme

```typescript
// Kullanım analitikleri
const analytics = await subscription.getAnalytics({
  period: "30d",
  includeUsage: true
});

console.log('API çağrıları:', analytics.data.usage.apiCalls);
console.log('Depolama:', analytics.data.usage.storage);
console.log('Kullanıcılar:', analytics.data.usage.users);

// Limit kontrolü
const usage = analytics.data.usage;
const isOverLimit = usage.storage.percentage > 100;
if (isOverLimit) {
  console.warn('Depolama limiti aşıldı!');
}
```

## Yükseltme ve Downgrade

```typescript
// Yükseltme seçenekleri
const upgrades = await subscription.checkUpgrade();

// En iyi değer önerisi
const bestValue = upgrades.data.recommendations.bestValue;
console.log('En iyi değer:', bestValue);

// Yükseltme faydaları
const benefits = upgrades.data.upgradeBenefits;
console.log('Anında faydalar:', benefits.immediate);
console.log('Uzun vadeli faydalar:', benefits.longTerm);
```

## Ödeme Yönetimi

```typescript
// Ödeme yöntemi güncelleme
await subscription.renew({
  paymentMethod: "paypal",
  paymentDetails: {
    paypalEmail: "user@example.com"
  }
});

// Otomatik yenileme ayarları
const details = await subscription.getDetails();
if (details.data.billing.autoRenew) {
  console.log('Otomatik yenileme aktif');
}
```

## Abonelik Geçmişi

```typescript
// Abonelik geçmişi
const details = await subscription.getDetails();
const history = details.data.history;

history.forEach(event => {
  console.log(`${event.date}: ${event.action} - ${event.description}`);
});
```
