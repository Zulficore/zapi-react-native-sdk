# Webhook Endpoint - 5 Metod

Webhook yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Webhook'ları listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `search` (string): Arama terimi
  - `status` (string): Webhook durumu

**Detaylı Örnek:**
```typescript
const webhooks = await zapi.webhook.list({
  limit: 10,
  page: 1,
  search: 'payment',
  status: 'active'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Webhook'lar getirildi",
  "data": {
    "webhooks": [
      {
        "id": "webhook_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "Payment Webhook",
        "url": "https://myapp.com/webhooks/payment",
        "status": "active",
        "events": ["payment.completed", "payment.failed"],
        "secret": "whsec_***",
        "retryCount": 3,
        "timeout": 30000,
        "stats": {
          "totalRequests": 1250,
          "successfulRequests": 1200,
          "failedRequests": 50,
          "lastRequest": "2024-01-15T10:30:00Z"
        },
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
Yeni webhook oluşturur.

**Parametreler:**
- `data` (any): Webhook verileri
  - `name` (string): Webhook adı
  - `url` (string): Webhook URL'i
  - `events` (string[]): Olay listesi
  - `secret` (string): Webhook secret'ı

**Detaylı Örnek:**
```typescript
const create = await zapi.webhook.create({
  name: 'User Registration Webhook',
  url: 'https://myapp.com/webhooks/user-registration',
  events: ['user.created', 'user.updated'],
  secret: 'whsec_new_secret',
  retryCount: 3,
  timeout: 30000
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Webhook başarıyla oluşturuldu",
  "data": {
    "webhook": {
      "id": "webhook_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "User Registration Webhook",
      "url": "https://myapp.com/webhooks/user-registration",
      "status": "active",
      "events": ["user.created", "user.updated"],
      "secret": "whsec_new_secret",
      "retryCount": 3,
      "timeout": 30000,
      "stats": {
        "totalRequests": 0,
        "successfulRequests": 0,
        "failedRequests": 0,
        "lastRequest": null
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(webhookId: string): Promise<ApiResponse>
Belirli bir webhook'un detaylarını getirir.

**Parametreler:**
- `webhookId` (string): Webhook ID'si

**Detaylı Örnek:**
```typescript
const webhook = await zapi.webhook.get('webhook_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Webhook detayları getirildi",
  "data": {
    "webhook": {
      "id": "webhook_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Payment Webhook",
      "url": "https://myapp.com/webhooks/payment",
      "status": "active",
      "events": ["payment.completed", "payment.failed"],
      "secret": "whsec_***",
      "retryCount": 3,
      "timeout": 30000,
      "stats": {
        "totalRequests": 1250,
        "successfulRequests": 1200,
        "failedRequests": 50,
        "lastRequest": "2024-01-15T10:30:00Z"
      },
      "recentRequests": [
        {
          "id": "req_64f8a1b2c3d4e5f6g7h8i9j0",
          "event": "payment.completed",
          "status": "success",
          "responseTime": "245ms",
          "statusCode": 200,
          "sentAt": "2024-01-15T10:30:00Z"
        }
      ],
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. update(webhookId: string, data: any): Promise<ApiResponse>
Belirli bir webhook'u günceller.

**Parametreler:**
- `webhookId` (string): Webhook ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.webhook.update('webhook_64f8a1b2c3d4e5f6g7h8i9j0', {
  name: 'Updated Payment Webhook',
  url: 'https://myapp.com/webhooks/payment-updated',
  events: ['payment.completed', 'payment.failed', 'payment.refunded'],
  retryCount: 5,
  timeout: 45000
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Webhook başarıyla güncellendi",
  "data": {
    "webhook": {
      "id": "webhook_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Updated Payment Webhook",
      "url": "https://myapp.com/webhooks/payment-updated",
      "status": "active",
      "events": ["payment.completed", "payment.failed", "payment.refunded"],
      "secret": "whsec_***",
      "retryCount": 5,
      "timeout": 45000,
      "stats": {
        "totalRequests": 1250,
        "successfulRequests": 1200,
        "failedRequests": 50,
        "lastRequest": "2024-01-15T10:30:00Z"
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 5. delete(webhookId: string): Promise<ApiResponse>
Belirli bir webhook'u siler.

**Parametreler:**
- `webhookId` (string): Webhook ID'si

**Detaylı Örnek:**
```typescript
const deleteWebhook = await zapi.webhook.delete('webhook_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Webhook başarıyla silindi",
  "data": {
    "deleted": {
      "id": "webhook_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Updated Payment Webhook",
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
  // 1. Webhook'ları listele
  const webhooks = await zapi.webhook.list({
    limit: 10,
    page: 1,
    status: 'active'
  });
  console.log('Toplam webhook:', webhooks.data.pagination.totalItems);
  
  // 2. Yeni webhook oluştur
  const create = await zapi.webhook.create({
    name: 'User Registration Webhook',
    url: 'https://myapp.com/webhooks/user-registration',
    events: ['user.created', 'user.updated'],
    secret: 'whsec_new_secret',
    retryCount: 3,
    timeout: 30000
  });
  const webhookId = create.data.webhook.id;
  console.log('Yeni webhook oluşturuldu:', webhookId);
  
  // 3. Webhook detayını getir
  const webhook = await zapi.webhook.get(webhookId);
  console.log('Webhook adı:', webhook.data.webhook.name);
  console.log('Webhook URL:', webhook.data.webhook.url);
  console.log('Webhook durumu:', webhook.data.webhook.status);
  
  // 4. Webhook güncelle
  const update = await zapi.webhook.update(webhookId, {
    name: 'Updated User Registration Webhook',
    url: 'https://myapp.com/webhooks/user-registration-updated',
    events: ['user.created', 'user.updated', 'user.deleted'],
    retryCount: 5,
    timeout: 45000
  });
  console.log('Webhook güncellendi:', update.data.webhook.updatedAt);
  
  // 5. Webhook sil
  const deleteWebhook = await zapi.webhook.delete(webhookId);
  console.log('Webhook silindi:', deleteWebhook.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
