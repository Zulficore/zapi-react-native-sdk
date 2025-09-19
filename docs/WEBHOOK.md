# Webhook Endpoint

Webhook yönetimi endpoint'leri - Webhook oluşturma, listeleme, silme ve test etme.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const webhook = zapi.webhook;
```

## Metodlar

### 1. list(options: any)

Webhook'ları listeler

**Parametreler:**
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await webhook.list({
  page: 1,
  limit: 20,
  status: "active",
  event: "user.created",
  sortBy: "createdAt",
  sortOrder: "desc"
});

if (result.success) {
  console.log('Webhook\'lar:', result.data);
  result.data.webhooks.forEach(webhook => {
    console.log(`- ${webhook.name} (${webhook.event}) -> ${webhook.url}`);
  });
} else {
  console.error('Webhook listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "webhooks": [
      {
        "id": "webhook_123",
        "name": "User Registration Webhook",
        "event": "user.created",
        "url": "https://myapp.com/webhooks/user-created",
        "status": "active",
        "secret": "whsec_1234567890abcdef",
        "headers": {
          "Content-Type": "application/json",
          "X-Custom-Header": "MyApp"
        },
        "retryPolicy": {
          "maxRetries": 3,
          "retryDelay": 5000,
          "backoffMultiplier": 2
        },
        "filters": {
          "userId": "user_123",
          "userType": "premium"
        },
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "lastTriggered": "2024-01-15T10:30:00Z",
        "triggerCount": 15,
        "successCount": 14,
        "failureCount": 1,
        "successRate": 93.3
      },
      {
        "id": "webhook_456",
        "name": "Payment Success Webhook",
        "event": "payment.completed",
        "url": "https://myapp.com/webhooks/payment-success",
        "status": "active",
        "secret": "whsec_abcdef1234567890",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer token123"
        },
        "retryPolicy": {
          "maxRetries": 5,
          "retryDelay": 10000,
          "backoffMultiplier": 1.5
        },
        "filters": {
          "amount": { "min": 100 },
          "currency": "USD"
        },
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "lastTriggered": "2024-01-15T10:30:00Z",
        "triggerCount": 8,
        "successCount": 8,
        "failureCount": 0,
        "successRate": 100.0
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 25,
      "pages": 2
    },
    "summary": {
      "totalWebhooks": 25,
      "activeWebhooks": 20,
      "inactiveWebhooks": 5,
      "totalTriggers": 150,
      "successRate": 95.2
    }
  },
  "message": "Webhook'lar başarıyla listelendi"
}
```

---

### 2. create(data: any)

Yeni webhook oluşturur

**Parametreler:**
- `data: any` - Webhook verileri

**Örnek Kullanım:**

```typescript
const result = await webhook.create({
  name: "Order Status Webhook",
  event: "order.updated",
  url: "https://myapp.com/webhooks/order-status",
  secret: "my-secret-key",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "my-api-key"
  },
  retryPolicy: {
    maxRetries: 3,
    retryDelay: 5000,
    backoffMultiplier: 2
  },
  filters: {
    orderStatus: "completed",
    orderValue: { "min": 50 }
  },
  enabled: true
});

if (result.success) {
  console.log('Webhook oluşturuldu:', result.data);
  const { id, name, secret, event } = result.data;
} else {
  console.error('Webhook oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "webhook_789",
    "name": "Order Status Webhook",
    "event": "order.updated",
    "url": "https://myapp.com/webhooks/order-status",
    "status": "active",
    "secret": "whsec_7890123456abcdef",
    "headers": {
      "Content-Type": "application/json",
      "X-API-Key": "my-api-key"
    },
    "retryPolicy": {
      "maxRetries": 3,
      "retryDelay": 5000,
      "backoffMultiplier": 2
    },
    "filters": {
      "orderStatus": "completed",
      "orderValue": { "min": 50 }
    },
    "enabled": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "triggerCount": 0,
    "successCount": 0,
    "failureCount": 0,
    "successRate": 0
  },
  "message": "Webhook başarıyla oluşturuldu"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "WEBHOOK_CREATION_FAILED",
    "message": "Webhook oluşturulamadı - Geçersiz URL"
  }
}
```

---

### 3. delete(webhookId: string)

Webhook'u siler

**Parametreler:**
- `webhookId: string` - Webhook ID'si

**Örnek Kullanım:**

```typescript
const result = await webhook.delete("webhook_123");

if (result.success) {
  console.log('Webhook silindi:', result.data);
  const { id, name, deletedAt } = result.data;
} else {
  console.error('Webhook silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "webhook_123",
    "name": "User Registration Webhook",
    "event": "user.created",
    "url": "https://myapp.com/webhooks/user-created",
    "deletedAt": "2024-01-15T10:30:00Z",
    "deletedBy": "user_456",
    "statistics": {
      "totalTriggers": 15,
      "successCount": 14,
      "failureCount": 1,
      "successRate": 93.3
    }
  },
  "message": "Webhook başarıyla silindi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "WEBHOOK_DELETION_FAILED",
    "message": "Webhook silinemedi - Webhook bulunamadı"
  }
}
```

---

### 4. test(webhookId: string)

Webhook'u test eder

**Parametreler:**
- `webhookId: string` - Webhook ID'si

**Örnek Kullanım:**

```typescript
const result = await webhook.test("webhook_123");

if (result.success) {
  console.log('Webhook test sonucu:', result.data);
  const { status, response, duration, timestamp } = result.data;
} else {
  console.error('Webhook test hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "webhookId": "webhook_123",
    "status": "success",
    "response": {
      "statusCode": 200,
      "headers": {
        "content-type": "application/json",
        "content-length": "25"
      },
      "body": "{\"status\":\"received\"}"
    },
    "duration": 250,
    "timestamp": "2024-01-15T10:30:00Z",
    "testPayload": {
      "event": "user.created",
      "data": {
        "id": "user_123",
        "email": "test@example.com",
        "firstName": "Test",
        "lastName": "User"
      },
      "timestamp": "2024-01-15T10:30:00Z"
    },
    "retryAttempts": 0,
    "error": null
  },
  "message": "Webhook test başarılı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "data": {
    "webhookId": "webhook_123",
    "status": "failed",
    "response": {
      "statusCode": 500,
      "headers": {
        "content-type": "text/html"
      },
      "body": "Internal Server Error"
    },
    "duration": 5000,
    "timestamp": "2024-01-15T10:30:00Z",
    "testPayload": {
      "event": "user.created",
      "data": {
        "id": "user_123",
        "email": "test@example.com"
      }
    },
    "retryAttempts": 3,
    "error": "Connection timeout"
  },
  "error": {
    "code": "WEBHOOK_TEST_FAILED",
    "message": "Webhook test başarısız - Sunucu hatası"
  }
}
```

---

## Webhook Olayları

| Olay | Açıklama | Veri |
|------|----------|------|
| `user.created` | Kullanıcı oluşturuldu | Kullanıcı bilgileri |
| `user.updated` | Kullanıcı güncellendi | Güncellenmiş bilgiler |
| `user.deleted` | Kullanıcı silindi | Kullanıcı ID'si |
| `payment.completed` | Ödeme tamamlandı | Ödeme bilgileri |
| `payment.failed` | Ödeme başarısız | Hata bilgileri |
| `order.created` | Sipariş oluşturuldu | Sipariş bilgileri |
| `order.updated` | Sipariş güncellendi | Güncellenmiş sipariş |
| `order.cancelled` | Sipariş iptal edildi | İptal nedeni |
| `subscription.created` | Abonelik oluşturuldu | Abonelik bilgileri |
| `subscription.cancelled` | Abonelik iptal edildi | İptal bilgileri |

## Webhook Durumları

| Durum | Açıklama |
|-------|----------|
| `active` | Aktif |
| `inactive` | Pasif |
| `paused` | Duraklatılmış |
| `failed` | Başarısız |

## Yeniden Deneme Politikaları

| Parametre | Açıklama | Varsayılan |
|-----------|----------|------------|
| `maxRetries` | Maksimum deneme sayısı | 3 |
| `retryDelay` | Deneme aralığı (ms) | 5000 |
| `backoffMultiplier` | Geri çekilme çarpanı | 2 |

## Webhook Filtreleri

| Filtre | Açıklama | Örnek |
|--------|----------|-------|
| `userId` | Kullanıcı ID'si | `user_123` |
| `userType` | Kullanıcı türü | `premium` |
| `amount` | Tutar aralığı | `{ "min": 100, "max": 1000 }` |
| `currency` | Para birimi | `USD` |
| `orderStatus` | Sipariş durumu | `completed` |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `WEBHOOK_NOT_FOUND` | Webhook bulunamadı |
| `WEBHOOK_CREATION_FAILED` | Webhook oluşturulamadı |
| `WEBHOOK_DELETION_FAILED` | Webhook silinemedi |
| `WEBHOOK_TEST_FAILED` | Webhook test başarısız |
| `INVALID_WEBHOOK_ID` | Geçersiz webhook ID'si |
| `INVALID_URL` | Geçersiz URL |
| `INVALID_EVENT` | Geçersiz olay |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Webhook URL'lerini güvenli tutun
- Secret key'leri güvenli bir yerde saklayın
- HTTPS kullanın
- Webhook imzalarını doğrulayın
- Düzenli olarak güvenlik denetimleri yapın

## Webhook Yönetimi

```typescript
// Webhook listesi
const webhooks = await webhook.list({
  status: "active",
  event: "user.created"
});

// Webhook oluşturma
const newWebhook = await webhook.create({
  name: "User Webhook",
  event: "user.created",
  url: "https://myapp.com/webhooks/user",
  secret: "my-secret"
});

// Webhook test etme
const testResult = await webhook.test("webhook_123");

// Webhook silme
await webhook.delete("webhook_123");
```

## Webhook Test Etme

```typescript
// Webhook test sonucu
const testResult = await webhook.test("webhook_123");

if (testResult.success) {
  console.log('Test başarılı:', testResult.data.status);
  console.log('Yanıt süresi:', testResult.data.duration + 'ms');
  console.log('HTTP durum kodu:', testResult.data.response.statusCode);
} else {
  console.error('Test başarısız:', testResult.error.message);
  
  // Hata detayları
  const errorData = testResult.data;
  console.log('Hata durumu:', errorData.status);
  console.log('Deneme sayısı:', errorData.retryAttempts);
  console.log('Hata mesajı:', errorData.error);
}
```

## Webhook İstatistikleri

```typescript
// Webhook listesi ve istatistikler
const webhooks = await webhook.list();

// Başarı oranı analizi
webhooks.data.webhooks.forEach(webhook => {
  console.log(`${webhook.name}: ${webhook.successRate}% başarı`);
  
  if (webhook.successRate < 90) {
    console.warn(`Düşük başarı oranı: ${webhook.name}`);
  }
});

// Genel istatistikler
const summary = webhooks.data.summary;
console.log('Toplam webhook:', summary.totalWebhooks);
console.log('Aktif webhook:', summary.activeWebhooks);
console.log('Genel başarı oranı:', summary.successRate + '%');
```

## Webhook Filtreleme

```typescript
// Olay bazlı filtreleme
const userWebhooks = await webhook.list({
  event: "user.created"
});

// Durum bazlı filtreleme
const activeWebhooks = await webhook.list({
  status: "active"
});

// Karma filtreleme
const filteredWebhooks = await webhook.list({
  event: "payment.completed",
  status: "active",
  limit: 10
});
```

## Webhook Yeniden Deneme

```typescript
// Webhook oluşturma - yeniden deneme politikası
const webhook = await webhook.create({
  name: "Payment Webhook",
  event: "payment.completed",
  url: "https://myapp.com/webhooks/payment",
  retryPolicy: {
    maxRetries: 5,        // 5 kez dene
    retryDelay: 10000,    // 10 saniye bekle
    backoffMultiplier: 1.5 // Her denemede %50 artır
  }
});

// Yeniden deneme hesaplama
// 1. deneme: 10 saniye
// 2. deneme: 15 saniye (10 * 1.5)
// 3. deneme: 22.5 saniye (15 * 1.5)
// 4. deneme: 33.75 saniye (22.5 * 1.5)
// 5. deneme: 50.625 saniye (33.75 * 1.5)
```

## Webhook Güvenlik

```typescript
// Webhook oluşturma - güvenlik ayarları
const secureWebhook = await webhook.create({
  name: "Secure Webhook",
  event: "user.created",
  url: "https://myapp.com/webhooks/secure",
  secret: "strong-secret-key-here",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123",
    "X-Webhook-Signature": "sha256=..."
  }
});

// Webhook imza doğrulama (alıcı tarafında)
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === expectedSignature;
}
```
