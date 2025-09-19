# APIKeys Endpoint

API anahtarı yönetimi endpoint'leri - API anahtarı oluşturma, güncelleme, kullanım takibi ve güvenlik yönetimi.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const apiKeys = zapi.apiKeys;
```

## Metodlar

### 1. list(options: any)

API anahtarlarını listeler

**Parametreler:**
- `options: any` - Filtreleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm API anahtarlarını getir
const result = await apiKeys.list();

// Filtreleme ile getir
const result = await apiKeys.list({
  limit: 10,
  offset: 0,
  status: "active"
});

if (result.success) {
  console.log('API anahtarları:', result.data);
} else {
  console.error('API anahtarı listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "apiKeys": [
      {
        "id": "key_123",
        "name": "Production API Key",
        "key": "zapi_****",
        "status": "active",
        "roles": ["read", "write"],
        "createdAt": "2024-01-15T10:30:00Z",
        "lastUsedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  },
  "message": "API anahtarları başarıyla listelendi"
}
```

---

### 2. create(data: any)

Yeni API anahtarı oluşturur

**Parametreler:**
- `data: any` - API anahtarı bilgileri

**Örnek Kullanım:**

```typescript
const result = await apiKeys.create({
  name: "Mobile App API Key",
  description: "Mobil uygulama için API anahtarı",
  roles: ["read", "write"],
  expiresAt: "2024-12-31T23:59:59Z",
  allowedIPs: ["192.168.1.0/24"],
  rateLimit: {
    requests: 1000,
    period: "hour"
  }
});

if (result.success) {
  console.log('API anahtarı oluşturuldu:', result.data);
  // API anahtarını güvenli bir yerde saklayın
  const { key } = result.data;
} else {
  console.error('API anahtarı oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "key_123",
    "name": "Mobile App API Key",
    "key": "zapi_live_1234567890abcdef",
    "description": "Mobil uygulama için API anahtarı",
    "roles": ["read", "write"],
    "status": "active",
    "expiresAt": "2024-12-31T23:59:59Z",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "API anahtarı başarıyla oluşturuldu"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Geçersiz rol seçimi"
  }
}
```

---

### 3. get(keyId: string)

Belirli bir API anahtarını getirir

**Parametreler:**
- `keyId: string` - API anahtarı ID'si

**Örnek Kullanım:**

```typescript
const result = await apiKeys.get("key_123");

if (result.success) {
  console.log('API anahtarı detayı:', result.data);
  const { name, roles, status, usage } = result.data;
} else {
  console.error('API anahtarı getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "key_123",
    "name": "Mobile App API Key",
    "key": "zapi_****",
    "description": "Mobil uygulama için API anahtarı",
    "roles": ["read", "write"],
    "status": "active",
    "expiresAt": "2024-12-31T23:59:59Z",
    "allowedIPs": ["192.168.1.0/24"],
    "rateLimit": {
      "requests": 1000,
      "period": "hour"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "lastUsedAt": "2024-01-15T10:30:00Z"
  },
  "message": "API anahtarı başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "API_KEY_NOT_FOUND",
    "message": "API anahtarı bulunamadı"
  }
}
```

---

### 4. update(keyId: string, data: any)

API anahtarını günceller

**Parametreler:**
- `keyId: string` - API anahtarı ID'si
- `data: any` - Güncellenecek bilgiler

**Örnek Kullanım:**

```typescript
const result = await apiKeys.update("key_123", {
  name: "Updated Mobile App API Key",
  description: "Güncellenmiş mobil uygulama API anahtarı",
  roles: ["read"],
  rateLimit: {
    requests: 2000,
    period: "hour"
  }
});

if (result.success) {
  console.log('API anahtarı güncellendi:', result.data);
} else {
  console.error('API anahtarı güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "key_123",
    "name": "Updated Mobile App API Key",
    "description": "Güncellenmiş mobil uygulama API anahtarı",
    "roles": ["read"],
    "rateLimit": {
      "requests": 2000,
      "period": "hour"
    },
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "API anahtarı başarıyla güncellendi"
}
```

---

### 5. delete(keyId: string)

API anahtarını siler

**Parametreler:**
- `keyId: string` - API anahtarı ID'si

**Örnek Kullanım:**

```typescript
const result = await apiKeys.delete("key_123");

if (result.success) {
  console.log('API anahtarı silindi');
} else {
  console.error('API anahtarı silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "API anahtarı başarıyla silindi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "API_KEY_IN_USE",
    "message": "API anahtarı kullanımda olduğu için silinemiyor"
  }
}
```

---

### 6. getUsage(keyId: string)

API anahtarı kullanım istatistiklerini getirir

**Parametreler:**
- `keyId: string` - API anahtarı ID'si

**Örnek Kullanım:**

```typescript
const result = await apiKeys.getUsage("key_123");

if (result.success) {
  console.log('Kullanım istatistikleri:', result.data);
  const { currentPeriod, totalUsage, endpoints } = result.data;
} else {
  console.error('Kullanım istatistik hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "currentPeriod": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31",
      "requestsUsed": 2500,
      "requestsLimit": 10000,
      "tokensUsed": 50000,
      "tokensLimit": 100000
    },
    "totalUsage": {
      "requests": 15000,
      "tokens": 300000
    },
    "endpoints": {
      "auth": {
        "requests": 500,
        "tokens": 10000
      },
      "user": {
        "requests": 1000,
        "tokens": 20000
      }
    },
    "lastUsedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Kullanım istatistikleri başarıyla getirildi"
}
```

---

### 7. getAvailableRoles()

Kullanılabilir roller listesini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await apiKeys.getAvailableRoles();

if (result.success) {
  console.log('Kullanılabilir roller:', result.data);
} else {
  console.error('Rol listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "roles": [
      {
        "id": "read",
        "name": "Read Only",
        "description": "Sadece okuma yetkisi",
        "permissions": ["GET"]
      },
      {
        "id": "write",
        "name": "Read/Write",
        "description": "Okuma ve yazma yetkisi",
        "permissions": ["GET", "POST", "PUT", "PATCH"]
      },
      {
        "id": "admin",
        "name": "Admin",
        "description": "Tam yetki",
        "permissions": ["GET", "POST", "PUT", "PATCH", "DELETE"]
      }
    ]
  },
  "message": "Kullanılabilir roller başarıyla getirildi"
}
```

---

### 8. rotate(keyId: string)

API anahtarını yeniler

**Parametreler:**
- `keyId: string` - API anahtarı ID'si

**Örnek Kullanım:**

```typescript
const result = await apiKeys.rotate("key_123");

if (result.success) {
  console.log('API anahtarı yenilendi:', result.data);
  // Yeni API anahtarını güvenli bir yerde saklayın
  const { key } = result.data;
} else {
  console.error('API anahtarı yenileme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "key_123",
    "name": "Mobile App API Key",
    "key": "zapi_live_new1234567890abcdef",
    "oldKey": "zapi_live_1234567890abcdef",
    "rotatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "API anahtarı başarıyla yenilendi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "ROTATION_FAILED",
    "message": "API anahtarı yenileme başarısız"
  }
}
```

---

### 9. lookup(apiKey: string)

API anahtarı bilgilerini sorgular

**Parametreler:**
- `apiKey: string` - API anahtarı

**Örnek Kullanım:**

```typescript
const result = await apiKeys.lookup("zapi_live_1234567890abcdef");

if (result.success) {
  console.log('API anahtarı bilgileri:', result.data);
  const { name, roles, status, expiresAt } = result.data;
} else {
  console.error('API anahtarı sorgulama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "key_123",
    "name": "Mobile App API Key",
    "roles": ["read", "write"],
    "status": "active",
    "expiresAt": "2024-12-31T23:59:59Z",
    "createdAt": "2024-01-15T10:30:00Z",
    "lastUsedAt": "2024-01-15T10:30:00Z"
  },
  "message": "API anahtarı bilgileri başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Geçersiz API anahtarı"
  }
}
```

---

## API Anahtarı Tipleri

| Tip | Açıklama | Örnek |
|-----|----------|-------|
| `live` | Canlı ortam anahtarı | `zapi_live_...` |
| `test` | Test ortamı anahtarı | `zapi_test_...` |
| `sandbox` | Sandbox anahtarı | `zapi_sandbox_...` |

## API Anahtarı Durumları

| Durum | Açıklama |
|-------|----------|
| `active` | Aktif ve kullanılabilir |
| `inactive` | Pasif, kullanılamaz |
| `expired` | Süresi dolmuş |
| `revoked` | İptal edilmiş |

## Roller ve Yetkiler

| Rol | Açıklama | Yetkiler |
|-----|----------|----------|
| `read` | Sadece okuma | GET |
| `write` | Okuma ve yazma | GET, POST, PUT, PATCH |
| `admin` | Tam yetki | GET, POST, PUT, PATCH, DELETE |
| `webhook` | Webhook yetkisi | POST (sadece webhook) |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `API_KEY_NOT_FOUND` | API anahtarı bulunamadı |
| `INVALID_API_KEY` | Geçersiz API anahtarı |
| `API_KEY_EXPIRED` | API anahtarı süresi dolmuş |
| `API_KEY_REVOKED` | API anahtarı iptal edilmiş |
| `API_KEY_IN_USE` | API anahtarı kullanımda |
| `ROTATION_FAILED` | API anahtarı yenileme başarısız |
| `RATE_LIMIT_EXCEEDED` | Rate limit aşıldı |
| `IP_NOT_ALLOWED` | IP adresi izin verilen listede değil |
| `VALIDATION_ERROR` | Geçersiz parametreler |

## Güvenlik Notları

- API anahtarlarını güvenli bir yerde saklayın
- API anahtarlarını kod içinde hardcode etmeyin
- Düzenli olarak API anahtarlarını yenileyin
- Kullanılmayan API anahtarlarını silin
- IP kısıtlamaları kullanın
- Rate limiting ayarlarını uygun şekilde yapın

## Rate Limiting

API anahtarları için rate limiting:

```typescript
// Rate limit ayarları
await apiKeys.create({
  name: "High Volume API Key",
  rateLimit: {
    requests: 10000,  // Saatte 10,000 istek
    period: "hour"
  }
});
```

## IP Kısıtlamaları

Belirli IP adreslerinden erişim:

```typescript
// IP kısıtlaması
await apiKeys.create({
  name: "Office API Key",
  allowedIPs: [
    "192.168.1.0/24",    // Ofis ağı
    "10.0.0.0/8"         // VPN ağı
  ]
});
```
