# Users Endpoint

Kullanıcı yönetimi endpoint'leri - Kullanıcı listesi, detayları, güncelleme, silme ve metadata yönetimi.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const users = zapi.users;
```

## Metodlar

### 1. list(options: any)

Kullanıcıları listeler

**Parametreler:**
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await users.list({
  page: 1,
  limit: 20,
  search: "john",
  status: "active",
  role: "user",
  sortBy: "createdAt",
  sortOrder: "desc"
});

if (result.success) {
  console.log('Kullanıcılar:', result.data);
  result.data.users.forEach(user => {
    console.log(`- ${user.firstName} ${user.lastName} (${user.email})`);
  });
} else {
  console.error('Kullanıcı listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "email": "john.doe@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "phone": "+905551234567",
        "phonePrefix": "+90",
        "role": "user",
        "status": "active",
        "isEmailVerified": true,
        "isPhoneVerified": true,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "lastLoginAt": "2024-01-15T10:30:00Z",
        "profile": {
          "avatar": "https://example.com/avatar.jpg",
          "bio": "Software Developer",
          "website": "https://johndoe.com",
          "location": "Istanbul, Turkey"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    },
    "filters": {
      "status": "active",
      "role": "user",
      "search": "john"
    }
  },
  "message": "Kullanıcılar başarıyla listelendi"
}
```

---

### 2. getStats()

Kullanıcı istatistiklerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await users.getStats();

if (result.success) {
  console.log('Kullanıcı istatistikleri:', result.data);
  const { totalUsers, activeUsers, newUsers, verifiedUsers } = result.data;
} else {
  console.error('İstatistik getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "totalUsers": 1500,
    "activeUsers": 1200,
    "inactiveUsers": 300,
    "newUsers": 50,
    "verifiedUsers": 1400,
    "unverifiedUsers": 100,
    "byRole": {
      "admin": 5,
      "moderator": 25,
      "user": 1470
    },
    "byStatus": {
      "active": 1200,
      "inactive": 300
    },
    "byVerification": {
      "emailVerified": 1400,
      "phoneVerified": 1300,
      "bothVerified": 1250
    },
    "growth": {
      "last7Days": 25,
      "last30Days": 100,
      "last90Days": 300
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Kullanıcı istatistikleri başarıyla getirildi"
}
```

---

### 3. get(userId: string)

Belirli bir kullanıcıyı getirir

**Parametreler:**
- `userId: string` - Kullanıcı ID'si

**Örnek Kullanım:**

```typescript
const result = await users.get("user_123");

if (result.success) {
  console.log('Kullanıcı detayları:', result.data);
  const { email, firstName, lastName, profile, settings } = result.data;
} else {
  console.error('Kullanıcı getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+905551234567",
    "phonePrefix": "+90",
    "role": "user",
    "status": "active",
    "isEmailVerified": true,
    "isPhoneVerified": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "lastLoginAt": "2024-01-15T10:30:00Z",
    "profile": {
      "avatar": "https://example.com/avatar.jpg",
      "bio": "Software Developer",
      "website": "https://johndoe.com",
      "location": "Istanbul, Turkey",
      "birthDate": "1990-05-15",
      "gender": "male"
    },
    "settings": {
      "notifications": {
        "email": true,
        "push": true,
        "sms": false
      },
      "privacy": {
        "profileVisible": true,
        "emailVisible": false
      },
      "preferences": {
        "language": "tr",
        "timezone": "Europe/Istanbul",
        "theme": "light"
      }
    },
    "usage": {
      "totalRequests": 1500,
      "lastRequestAt": "2024-01-15T10:30:00Z",
      "storageUsed": "2.5GB"
    }
  },
  "message": "Kullanıcı başarıyla getirildi"
}
```

---

### 4. update(userId: string, data: any)

Kullanıcıyı günceller

**Parametreler:**
- `userId: string` - Kullanıcı ID'si
- `data: any` - Güncellenecek veriler

**Örnek Kullanım:**

```typescript
const result = await users.update("user_123", {
  firstName: "Jane",
  lastName: "Smith",
  profile: {
    bio: "Updated bio",
    website: "https://janesmith.com"
  },
  settings: {
    notifications: {
      email: false,
      push: true
    }
  }
});

if (result.success) {
  console.log('Kullanıcı güncellendi:', result.data);
} else {
  console.error('Kullanıcı güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "john.doe@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+905551234567",
    "phonePrefix": "+90",
    "role": "user",
    "status": "active",
    "updatedAt": "2024-01-15T10:30:00Z",
    "profile": {
      "avatar": "https://example.com/avatar.jpg",
      "bio": "Updated bio",
      "website": "https://janesmith.com",
      "location": "Istanbul, Turkey"
    },
    "settings": {
      "notifications": {
        "email": false,
        "push": true,
        "sms": false
      }
    }
  },
  "message": "Kullanıcı başarıyla güncellendi"
}
```

---

### 5. delete(userId: string)

Kullanıcıyı siler

**Parametreler:**
- `userId: string` - Kullanıcı ID'si

**Örnek Kullanım:**

```typescript
const result = await users.delete("user_123");

if (result.success) {
  console.log('Kullanıcı silindi');
} else {
  console.error('Kullanıcı silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "deletedUserId": "user_123",
    "deletedAt": "2024-01-15T10:30:00Z",
    "deletedBy": "admin_456"
  },
  "message": "Kullanıcı başarıyla silindi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "USER_DELETION_FAILED",
    "message": "Kullanıcı silinemedi"
  }
}
```

---

### 6. getMetadata(userId: string, path: string)

Kullanıcı metadata bilgilerini getirir

**Parametreler:**
- `userId: string` - Kullanıcı ID'si
- `path: string` - Metadata yolu (varsayılan: '')

**Örnek Kullanım:**

```typescript
// Tüm metadata'yı getir
const result = await users.getMetadata("user_123");

// Belirli bir path'i getir
const result = await users.getMetadata("user_123", "preferences.theme");

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
    "preferences": {
      "theme": "dark",
      "language": "tr",
      "timezone": "Europe/Istanbul",
      "dateFormat": "DD/MM/YYYY"
    },
    "customFields": {
      "department": "Engineering",
      "employeeId": "EMP001",
      "manager": "manager_456"
    },
    "tags": ["vip", "beta-tester", "premium"],
    "notes": "Important customer",
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Metadata başarıyla getirildi"
}
```

---

### 7. updateMetadata(userId: string, path: string, value: any)

Kullanıcı metadata bilgilerini günceller

**Parametreler:**
- `userId: string` - Kullanıcı ID'si
- `path: string` - Metadata yolu
- `value: any` - Güncellenecek değer

**Örnek Kullanım:**

```typescript
const result = await users.updateMetadata("user_123", "preferences.theme", "light");

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
    "preferences": {
      "theme": "light",
      "language": "tr",
      "timezone": "Europe/Istanbul",
      "dateFormat": "DD/MM/YYYY"
    }
  },
  "message": "Metadata başarıyla güncellendi"
}
```

---

### 8. deleteMetadata(userId: string, path: string)

Kullanıcı metadata bilgilerini siler

**Parametreler:**
- `userId: string` - Kullanıcı ID'si
- `path: string` - Metadata yolu

**Örnek Kullanım:**

```typescript
const result = await users.deleteMetadata("user_123", "customFields.employeeId");

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

## Kullanıcı Rolleri

| Rol | Açıklama | Yetkiler |
|-----|----------|----------|
| `admin` | Sistem yöneticisi | Tüm yetkiler |
| `moderator` | Moderator | Kullanıcı yönetimi, içerik moderasyonu |
| `user` | Standart kullanıcı | Temel işlemler |
| `guest` | Misafir kullanıcı | Sınırlı erişim |

## Kullanıcı Durumları

| Durum | Açıklama |
|-------|----------|
| `active` | Aktif kullanıcı |
| `inactive` | Pasif kullanıcı |
| `suspended` | Askıya alınmış |
| `banned` | Yasaklanmış |
| `pending` | Onay bekliyor |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `USER_NOT_FOUND` | Kullanıcı bulunamadı |
| `USER_UPDATE_FAILED` | Kullanıcı güncellenemedi |
| `USER_DELETION_FAILED` | Kullanıcı silinemedi |
| `INVALID_USER_ID` | Geçersiz kullanıcı ID'si |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `USER_ALREADY_EXISTS` | Kullanıcı zaten mevcut |
| `INVALID_USER_DATA` | Geçersiz kullanıcı verisi |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Kullanıcı verilerini güvenli bir şekilde işleyin
- Hassas bilgileri metadata'da saklamayın
- Kullanıcı silme işlemlerini dikkatli yapın
- Kişisel verileri koruma yasalarına uyun
- Düzenli olarak güvenlik denetimleri yapın

## Kullanıcı Yönetimi

```typescript
// Kullanıcı listesi
const users = await users.list({
  page: 1,
  limit: 50,
  status: "active"
});

// Kullanıcı detayları
const user = await users.get("user_123");

// Kullanıcı güncelleme
await users.update("user_123", {
  firstName: "New Name",
  profile: { bio: "Updated bio" }
});

// Metadata yönetimi
await users.updateMetadata("user_123", "preferences.theme", "dark");
```

## İstatistik ve Analitik

```typescript
// Kullanıcı istatistikleri
const stats = await users.getStats();

console.log('Toplam kullanıcı:', stats.data.totalUsers);
console.log('Aktif kullanıcı:', stats.data.activeUsers);
console.log('Yeni kullanıcı (7 gün):', stats.data.growth.last7Days);

// Kullanıcı büyüme analizi
const growth = stats.data.growth;
console.log('Büyüme oranı:', (growth.last7Days / stats.data.totalUsers) * 100);
```

## Arama ve Filtreleme

```typescript
// Gelişmiş arama
const result = await users.list({
  search: "john",
  status: "active",
  role: "user",
  sortBy: "lastLoginAt",
  sortOrder: "desc",
  page: 1,
  limit: 20
});

// Filtreleme seçenekleri
const filters = {
  status: ["active", "inactive"],
  role: ["user", "moderator"],
  isEmailVerified: true,
  createdAfter: "2024-01-01",
  createdBefore: "2024-12-31"
};
```

## Toplu İşlemler

```typescript
// Toplu kullanıcı güncelleme
const userIds = ["user_123", "user_456", "user_789"];
for (const userId of userIds) {
  await users.update(userId, {
    settings: { notifications: { email: false } }
  });
}

// Toplu metadata güncelleme
for (const userId of userIds) {
  await users.updateMetadata(userId, "tags", ["bulk-updated"]);
}
```
