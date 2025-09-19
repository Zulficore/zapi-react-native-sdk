# Notifications Endpoint

Bildirim yönetimi endpoint'leri - Email, SMS gönderimi, toplu bildirimler, log takibi ve analitik.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const notifications = zapi.notifications;
```

## Metodlar

### 1. list(options: any)

Bildirim loglarını listeler

**Parametreler:**
- `options: any` - Filtreleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm bildirimleri getir
const result = await notifications.list();

// Filtreleme ile getir
const result = await notifications.list({
  limit: 10,
  offset: 0,
  type: "email",
  status: "sent"
});

if (result.success) {
  console.log('Bildirim logları:', result.data);
} else {
  console.error('Bildirim listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_123",
        "type": "email",
        "recipient": "user@example.com",
        "subject": "Hoş Geldiniz",
        "status": "sent",
        "sentAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  },
  "message": "Bildirim logları başarıyla listelendi"
}
```

---

### 2. sendEmail(data: any)

Email gönderir

**Parametreler:**
- `data: any` - Email bilgileri

**Örnek Kullanım:**

```typescript
const result = await notifications.sendEmail({
  to: "user@example.com",
  subject: "Hoş Geldiniz",
  html: "<h1>Hoş geldiniz!</h1><p>Hesabınız başarıyla oluşturuldu.</p>",
  text: "Hoş geldiniz! Hesabınız başarıyla oluşturuldu.",
  from: "noreply@example.com",
  replyTo: "support@example.com"
});

if (result.success) {
  console.log('Email gönderildi:', result.data);
} else {
  console.error('Email gönderme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "notif_123",
    "type": "email",
    "recipient": "user@example.com",
    "subject": "Hoş Geldiniz",
    "status": "sent",
    "sentAt": "2024-01-15T10:30:00Z"
  },
  "message": "Email başarıyla gönderildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_EMAIL_ADDRESS",
    "message": "Geçersiz email adresi"
  }
}
```

---

### 3. sendBulkEmail(data: any)

Toplu email gönderir

**Parametreler:**
- `data: any` - Toplu email bilgileri

**Örnek Kullanım:**

```typescript
const result = await notifications.sendBulkEmail({
  recipients: [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com"
  ],
  subject: "Önemli Duyuru",
  html: "<h1>Önemli Duyuru</h1><p>Sistem bakımı yapılacaktır.</p>",
  text: "Önemli Duyuru: Sistem bakımı yapılacaktır.",
  from: "noreply@example.com"
});

if (result.success) {
  console.log('Toplu email gönderildi:', result.data);
} else {
  console.error('Toplu email gönderme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "batchId": "batch_123",
    "totalRecipients": 3,
    "sentCount": 3,
    "failedCount": 0,
    "status": "completed",
    "sentAt": "2024-01-15T10:30:00Z"
  },
  "message": "Toplu email başarıyla gönderildi"
}
```

---

### 4. sendSMS(data: any)

SMS gönderir

**Parametreler:**
- `data: any` - SMS bilgileri

**Örnek Kullanım:**

```typescript
const result = await notifications.sendSMS({
  to: "+905551234567",
  message: "Hoş geldiniz! Hesabınız başarıyla oluşturuldu.",
  from: "ZAPI"
});

if (result.success) {
  console.log('SMS gönderildi:', result.data);
} else {
  console.error('SMS gönderme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "notif_123",
    "type": "sms",
    "recipient": "+905551234567",
    "message": "Hoş geldiniz! Hesabınız başarıyla oluşturuldu.",
    "status": "sent",
    "sentAt": "2024-01-15T10:30:00Z"
  },
  "message": "SMS başarıyla gönderildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PHONE_NUMBER",
    "message": "Geçersiz telefon numarası"
  }
}
```

---

### 5. sendBulkSMS(data: any)

Toplu SMS gönderir

**Parametreler:**
- `data: any` - Toplu SMS bilgileri

**Örnek Kullanım:**

```typescript
const result = await notifications.sendBulkSMS({
  recipients: [
    "+905551234567",
    "+905559876543",
    "+905556543210"
  ],
  message: "Önemli Duyuru: Sistem bakımı yapılacaktır.",
  from: "ZAPI"
});

if (result.success) {
  console.log('Toplu SMS gönderildi:', result.data);
} else {
  console.error('Toplu SMS gönderme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "batchId": "batch_123",
    "totalRecipients": 3,
    "sentCount": 3,
    "failedCount": 0,
    "status": "completed",
    "sentAt": "2024-01-15T10:30:00Z"
  },
  "message": "Toplu SMS başarıyla gönderildi"
}
```

---

### 6. getLog(logId: string)

Bildirim log detayını getirir

**Parametreler:**
- `logId: string` - Log ID'si

**Örnek Kullanım:**

```typescript
const result = await notifications.getLog("notif_123");

if (result.success) {
  console.log('Log detayı:', result.data);
} else {
  console.error('Log getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "notif_123",
    "type": "email",
    "recipient": "user@example.com",
    "subject": "Hoş Geldiniz",
    "content": "<h1>Hoş geldiniz!</h1>",
    "status": "sent",
    "sentAt": "2024-01-15T10:30:00Z",
    "deliveredAt": "2024-01-15T10:30:05Z",
    "openedAt": "2024-01-15T10:35:00Z",
    "clickedAt": "2024-01-15T10:36:00Z"
  },
  "message": "Log detayı başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "LOG_NOT_FOUND",
    "message": "Log bulunamadı"
  }
}
```

---

### 7. getAnalytics(options: any)

Bildirim analitiklerini getirir

**Parametreler:**
- `options: any` - Analitik seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Genel analitikler
const result = await notifications.getAnalytics();

// Tarih aralığı ile analitikler
const result = await notifications.getAnalytics({
  dateFrom: "2024-01-01",
  dateTo: "2024-01-31",
  type: "email"
});

if (result.success) {
  console.log('Analitikler:', result.data);
} else {
  console.error('Analitik getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "totalSent": 1500,
    "totalDelivered": 1450,
    "totalOpened": 1200,
    "totalClicked": 300,
    "deliveryRate": 96.67,
    "openRate": 82.76,
    "clickRate": 25.0,
    "byType": {
      "email": {
        "sent": 1000,
        "delivered": 950,
        "opened": 800,
        "clicked": 200
      },
      "sms": {
        "sent": 500,
        "delivered": 500,
        "opened": 400,
        "clicked": 100
      }
    }
  },
  "message": "Analitikler başarıyla getirildi"
}
```

---

### 8. retry(logId: string)

Başarısız bildirimi tekrar gönderir

**Parametreler:**
- `logId: string` - Log ID'si

**Örnek Kullanım:**

```typescript
const result = await notifications.retry("notif_123");

if (result.success) {
  console.log('Bildirim tekrar gönderildi:', result.data);
} else {
  console.error('Tekrar gönderme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "notif_124",
    "originalLogId": "notif_123",
    "type": "email",
    "recipient": "user@example.com",
    "status": "sent",
    "sentAt": "2024-01-15T10:30:00Z"
  },
  "message": "Bildirim başarıyla tekrar gönderildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "RETRY_FAILED",
    "message": "Tekrar gönderme başarısız"
  }
}
```

---

### 9. getSettings()

Bildirim ayarlarını getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await notifications.getSettings();

if (result.success) {
  console.log('Bildirim ayarları:', result.data);
} else {
  console.error('Ayar getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "email": {
      "enabled": true,
      "fromAddress": "noreply@example.com",
      "replyTo": "support@example.com",
      "dailyLimit": 1000
    },
    "sms": {
      "enabled": true,
      "fromNumber": "ZAPI",
      "dailyLimit": 500
    },
    "webhook": {
      "enabled": false,
      "url": null
    }
  },
  "message": "Bildirim ayarları başarıyla getirildi"
}
```

---

### 10. updateSettings(data: any)

Bildirim ayarlarını günceller

**Parametreler:**
- `data: any` - Güncellenecek ayarlar

**Örnek Kullanım:**

```typescript
const result = await notifications.updateSettings({
  email: {
    enabled: true,
    fromAddress: "noreply@myapp.com",
    replyTo: "support@myapp.com",
    dailyLimit: 2000
  },
  sms: {
    enabled: true,
    fromNumber: "MYAPP",
    dailyLimit: 1000
  }
});

if (result.success) {
  console.log('Ayarlar güncellendi:', result.data);
} else {
  console.error('Ayar güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "email": {
      "enabled": true,
      "fromAddress": "noreply@myapp.com",
      "replyTo": "support@myapp.com",
      "dailyLimit": 2000
    },
    "sms": {
      "enabled": true,
      "fromNumber": "MYAPP",
      "dailyLimit": 1000
    }
  },
  "message": "Bildirim ayarları başarıyla güncellendi"
}
```

---

### 11. trackEmail(trackingId: string)

Email takip bilgilerini getirir

**Parametreler:**
- `trackingId: string` - Takip ID'si

**Örnek Kullanım:**

```typescript
const result = await notifications.trackEmail("track_123");

if (result.success) {
  console.log('Email takip bilgileri:', result.data);
} else {
  console.error('Email takip hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "trackingId": "track_123",
    "emailId": "notif_123",
    "recipient": "user@example.com",
    "status": "opened",
    "sentAt": "2024-01-15T10:30:00Z",
    "deliveredAt": "2024-01-15T10:30:05Z",
    "openedAt": "2024-01-15T10:35:00Z",
    "clickedAt": "2024-01-15T10:36:00Z",
    "openCount": 3,
    "clickCount": 1
  },
  "message": "Email takip bilgileri başarıyla getirildi"
}
```

---

### 12. track(logId: string)

Bildirim takip bilgilerini getirir

**Parametreler:**
- `logId: string` - Log ID'si

**Örnek Kullanım:**

```typescript
const result = await notifications.track("notif_123");

if (result.success) {
  console.log('Takip bilgileri:', result.data);
} else {
  console.error('Takip hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "notif_123",
    "type": "email",
    "recipient": "user@example.com",
    "status": "delivered",
    "sentAt": "2024-01-15T10:30:00Z",
    "deliveredAt": "2024-01-15T10:30:05Z",
    "openedAt": null,
    "clickedAt": null,
    "events": [
      {
        "type": "sent",
        "timestamp": "2024-01-15T10:30:00Z"
      },
      {
        "type": "delivered",
        "timestamp": "2024-01-15T10:30:05Z"
      }
    ]
  },
  "message": "Takip bilgileri başarıyla getirildi"
}
```

---

## Bildirim Tipleri

| Tip | Açıklama |
|-----|----------|
| `email` | Email bildirimi |
| `sms` | SMS bildirimi |
| `push` | Push bildirimi |
| `webhook` | Webhook bildirimi |

## Bildirim Durumları

| Durum | Açıklama |
|-------|----------|
| `pending` | Beklemede |
| `sent` | Gönderildi |
| `delivered` | Teslim edildi |
| `opened` | Açıldı |
| `clicked` | Tıklandı |
| `failed` | Başarısız |
| `bounced` | Geri döndü |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `INVALID_EMAIL_ADDRESS` | Geçersiz email adresi |
| `INVALID_PHONE_NUMBER` | Geçersiz telefon numarası |
| `LOG_NOT_FOUND` | Log bulunamadı |
| `RETRY_FAILED` | Tekrar gönderme başarısız |
| `DAILY_LIMIT_EXCEEDED` | Günlük limit aşıldı |
| `INVALID_TEMPLATE` | Geçersiz şablon |
| `RECIPIENT_BLOCKED` | Alıcı engellenmiş |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Webhook Bildirimleri

Email açılma ve tıklama olayları için webhook:

```typescript
// Webhook ayarları
await notifications.updateSettings({
  webhook: {
    enabled: true,
    url: "https://myapp.com/webhook/notifications",
    events: ["opened", "clicked"]
  }
});
```

## Toplu İşlemler

Toplu email/SMS gönderirken dikkat edilecekler:

- Günlük limitler kontrol edilir
- Geçersiz adresler otomatik filtrelenir
- Başarısız gönderimler ayrı raporlanır
- Rate limiting uygulanır
