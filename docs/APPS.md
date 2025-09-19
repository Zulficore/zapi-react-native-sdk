# Apps Endpoint

Uygulama yönetimi endpoint'leri - Uygulama oluşturma, güncelleme, silme, istatistikler ve metadata yönetimi.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const apps = zapi.apps;
```

## Metodlar

### 1. list(options: any)

Uygulamaları listeler

**Parametreler:**
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await apps.list({
  page: 1,
  limit: 10,
  search: "my app",
  status: "active"
});

if (result.success) {
  console.log('Uygulamalar:', result.data);
  result.data.apps.forEach(app => {
    console.log(`- ${app.name} (${app.id})`);
  });
} else {
  console.error('Uygulama listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "apps": [
      {
        "id": "app_123",
        "name": "My Mobile App",
        "description": "Mobil uygulamam",
        "status": "active",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "owner": {
          "id": "user_123",
          "email": "owner@example.com"
        },
        "usage": {
          "requests": 1500,
          "limit": 10000
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  },
  "message": "Uygulamalar başarıyla listelendi"
}
```

---

### 2. create(data: any)

Yeni uygulama oluşturur

**Parametreler:**
- `data: any` - Uygulama verileri

**Örnek Kullanım:**

```typescript
const result = await apps.create({
  name: "Yeni Uygulamam",
  description: "Bu benim yeni uygulamam",
  type: "mobile",
  platform: "react-native",
  settings: {
    allowRegistration: true,
    requireEmailVerification: true,
    maxUsers: 1000
  }
});

if (result.success) {
  console.log('Uygulama oluşturuldu:', result.data);
  const { id, name, apiKey } = result.data;
} else {
  console.error('Uygulama oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "app_456",
    "name": "Yeni Uygulamam",
    "description": "Bu benim yeni uygulamam",
    "type": "mobile",
    "platform": "react-native",
    "status": "active",
    "apiKey": "ak_1234567890abcdef",
    "createdAt": "2024-01-15T10:30:00Z",
    "settings": {
      "allowRegistration": true,
      "requireEmailVerification": true,
      "maxUsers": 1000
    }
  },
  "message": "Uygulama başarıyla oluşturuldu"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "APP_CREATION_FAILED",
    "message": "Uygulama oluşturulamadı"
  }
}
```

---

### 3. get(appId: string)

Belirli bir uygulamayı getirir

**Parametreler:**
- `appId: string` - Uygulama ID'si

**Örnek Kullanım:**

```typescript
const result = await apps.get("app_123");

if (result.success) {
  console.log('Uygulama detayları:', result.data);
  const { name, description, status, settings } = result.data;
} else {
  console.error('Uygulama getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "app_123",
    "name": "My Mobile App",
    "description": "Mobil uygulamam",
    "type": "mobile",
    "platform": "react-native",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "owner": {
      "id": "user_123",
      "email": "owner@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "settings": {
      "allowRegistration": true,
      "requireEmailVerification": true,
      "maxUsers": 1000,
      "features": {
        "pushNotifications": true,
        "analytics": true,
        "crashReporting": true
      }
    },
    "usage": {
      "requests": 1500,
      "limit": 10000,
      "users": 45,
      "storage": "2.5GB"
    }
  },
  "message": "Uygulama başarıyla getirildi"
}
```

---

### 4. update(appId: string, data: any)

Uygulamayı günceller

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `data: any` - Güncellenecek veriler

**Örnek Kullanım:**

```typescript
const result = await apps.update("app_123", {
  name: "Güncellenmiş Uygulama Adı",
  description: "Yeni açıklama",
  settings: {
    allowRegistration: false,
    maxUsers: 2000
  }
});

if (result.success) {
  console.log('Uygulama güncellendi:', result.data);
} else {
  console.error('Uygulama güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "app_123",
    "name": "Güncellenmiş Uygulama Adı",
    "description": "Yeni açıklama",
    "status": "active",
    "updatedAt": "2024-01-15T10:30:00Z",
    "settings": {
      "allowRegistration": false,
      "requireEmailVerification": true,
      "maxUsers": 2000
    }
  },
  "message": "Uygulama başarıyla güncellendi"
}
```

---

### 5. delete(appId: string)

Uygulamayı siler

**Parametreler:**
- `appId: string` - Uygulama ID'si

**Örnek Kullanım:**

```typescript
const result = await apps.delete("app_123");

if (result.success) {
  console.log('Uygulama silindi');
} else {
  console.error('Uygulama silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "Uygulama başarıyla silindi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "APP_DELETION_FAILED",
    "message": "Uygulama silinemedi"
  }
}
```

---

### 6. getStats(options: any)

Tüm uygulamaların istatistiklerini getirir

**Parametreler:**
- `options: any` - İstatistik seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await apps.getStats({
  period: "30d",
  includeInactive: false
});

if (result.success) {
  console.log('Genel istatistikler:', result.data);
  const { totalApps, activeApps, totalRequests, totalUsers } = result.data;
} else {
  console.error('İstatistik getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "totalApps": 25,
    "activeApps": 20,
    "inactiveApps": 5,
    "totalRequests": 150000,
    "totalUsers": 5000,
    "totalStorage": "50GB",
    "period": "30d",
    "growth": {
      "apps": 5,
      "requests": 15000,
      "users": 500
    },
    "topApps": [
      {
        "id": "app_123",
        "name": "My Mobile App",
        "requests": 25000,
        "users": 1000
      }
    ]
  },
  "message": "İstatistikler başarıyla getirildi"
}
```

---

### 7. getAppStats(appId: string, options: any)

Belirli bir uygulamanın istatistiklerini getirir

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `options: any` - İstatistik seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await apps.getAppStats("app_123", {
  period: "7d",
  includeDetails: true
});

if (result.success) {
  console.log('Uygulama istatistikleri:', result.data);
  const { requests, users, errors, performance } = result.data;
} else {
  console.error('Uygulama istatistik hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "appId": "app_123",
    "period": "7d",
    "requests": {
      "total": 15000,
      "successful": 14800,
      "failed": 200,
      "averageResponseTime": 150
    },
    "users": {
      "total": 1000,
      "active": 800,
      "new": 50,
      "retention": 85
    },
    "errors": {
      "total": 200,
      "byType": {
        "validation": 100,
        "authentication": 50,
        "server": 50
      }
    },
    "performance": {
      "uptime": 99.9,
      "averageLoadTime": 150,
      "peakLoadTime": 300
    },
    "endpoints": [
      {
        "name": "auth.login",
        "requests": 5000,
        "averageResponseTime": 100
      },
      {
        "name": "user.profile",
        "requests": 3000,
        "averageResponseTime": 80
      }
    ]
  },
  "message": "Uygulama istatistikleri başarıyla getirildi"
}
```

---

### 8. resetUsage(appId: string)

Uygulamanın kullanım istatistiklerini sıfırlar

**Parametreler:**
- `appId: string` - Uygulama ID'si

**Örnek Kullanım:**

```typescript
const result = await apps.resetUsage("app_123");

if (result.success) {
  console.log('Kullanım istatistikleri sıfırlandı');
} else {
  console.error('Kullanım sıfırlama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "appId": "app_123",
    "resetAt": "2024-01-15T10:30:00Z",
    "resetBy": "user_123"
  },
  "message": "Kullanım istatistikleri başarıyla sıfırlandı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "USAGE_RESET_FAILED",
    "message": "Kullanım sıfırlama başarısız"
  }
}
```

---

### 9. getMetadata(appId: string, path: string)

Uygulama metadata bilgilerini getirir

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Metadata yolu (varsayılan: '')

**Örnek Kullanım:**

```typescript
// Tüm metadata'yı getir
const result = await apps.getMetadata("app_123");

// Belirli bir path'i getir
const result = await apps.getMetadata("app_123", "settings.theme");

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
      "theme": "dark",
      "language": "tr",
      "notifications": {
        "email": true,
        "push": true,
        "sms": false
      }
    },
    "features": {
      "analytics": true,
      "crashReporting": true,
      "betaFeatures": false
    },
    "integrations": {
      "firebase": {
        "enabled": true,
        "projectId": "my-project"
      },
      "stripe": {
        "enabled": false
      }
    }
  },
  "message": "Metadata başarıyla getirildi"
}
```

---

### 10. updateMetadata(appId: string, path: string, value: any)

Uygulama metadata bilgilerini günceller

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Metadata yolu
- `value: any` - Güncellenecek değer

**Örnek Kullanım:**

```typescript
const result = await apps.updateMetadata("app_123", "settings.theme", "light");

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
      "theme": "light",
      "language": "tr",
      "notifications": {
        "email": true,
        "push": true,
        "sms": false
      }
    }
  },
  "message": "Metadata başarıyla güncellendi"
}
```

---

### 11. patchMetadata(appId: string, path: string, value: any)

Uygulama metadata bilgilerini kısmi olarak günceller

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Metadata yolu
- `value: any` - Güncellenecek değer

**Örnek Kullanım:**

```typescript
const result = await apps.patchMetadata("app_123", "settings.notifications.sms", true);

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
      "theme": "light",
      "language": "tr",
      "notifications": {
        "email": true,
        "push": true,
        "sms": true
      }
    }
  },
  "message": "Metadata başarıyla güncellendi"
}
```

---

### 12. deleteMetadata(appId: string, path: string)

Uygulama metadata bilgilerini siler

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Metadata yolu

**Örnek Kullanım:**

```typescript
const result = await apps.deleteMetadata("app_123", "settings.notifications.sms");

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

## Uygulama Türleri

| Tür | Açıklama | Özellikler |
|-----|----------|------------|
| `mobile` | Mobil uygulama | Push notifications, offline support |
| `web` | Web uygulaması | Browser compatibility, SEO |
| `desktop` | Masaüstü uygulaması | System integration, file access |
| `api` | API servisi | Rate limiting, authentication |
| `bot` | Bot uygulaması | Webhook support, automation |

## Uygulama Durumları

| Durum | Açıklama |
|-------|----------|
| `active` | Aktif ve çalışıyor |
| `inactive` | Pasif, çalışmıyor |
| `suspended` | Askıya alınmış |
| `pending` | Onay bekliyor |
| `maintenance` | Bakım modunda |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `APP_NOT_FOUND` | Uygulama bulunamadı |
| `APP_CREATION_FAILED` | Uygulama oluşturulamadı |
| `APP_UPDATE_FAILED` | Uygulama güncellenemedi |
| `APP_DELETION_FAILED` | Uygulama silinemedi |
| `USAGE_RESET_FAILED` | Kullanım sıfırlama başarısız |
| `INVALID_APP_ID` | Geçersiz uygulama ID'si |
| `APP_ALREADY_EXISTS` | Uygulama zaten mevcut |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- API anahtarlarını güvenli bir yerde saklayın
- Uygulama ayarlarını dikkatli yapılandırın
- Kullanıcı verilerini güvenli bir şekilde işleyin
- Metadata'da hassas bilgileri saklamayın
- Düzenli olarak güvenlik güncellemeleri yapın

## Uygulama Yönetimi

```typescript
// Uygulama oluşturma
const newApp = await apps.create({
  name: "My App",
  type: "mobile",
  platform: "react-native"
});

// Uygulama güncelleme
await apps.update("app_123", {
  name: "Updated App Name",
  settings: { allowRegistration: false }
});

// İstatistikleri görüntüleme
const stats = await apps.getAppStats("app_123", {
  period: "30d"
});

// Metadata yönetimi
await apps.updateMetadata("app_123", "settings.theme", "dark");
```

## Performans İzleme

```typescript
// Uygulama performansını izleme
const performance = await apps.getAppStats("app_123", {
  period: "7d",
  includeDetails: true
});

console.log('Uptime:', performance.data.performance.uptime);
console.log('Average Response Time:', performance.data.performance.averageLoadTime);
console.log('Error Rate:', performance.data.errors.total / performance.data.requests.total);
```
