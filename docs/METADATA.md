# Metadata Endpoint

Metadata yönetimi endpoint'i - Varlık metadata bilgilerini yönetir.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const metadata = zapi.metadata;
```

## Metodlar

### 1. get(entityType: string, entityId: string, path: string)

Varlık metadata bilgilerini getirir

**Parametreler:**
- `entityType: string` - Varlık türü (user, app, plan, etc.)
- `entityId: string` - Varlık ID'si
- `path: string` - Metadata yolu (opsiyonel)

**Örnek Kullanım:**

```typescript
// Kullanıcı metadata'sını getir
const result = await metadata.get('user', 'user123');

if (result.success) {
  console.log('Metadata bilgileri:', result.data);
  
  // Tüm metadata
  console.log('Tüm metadata:', result.data.metadata);
  
  // Belirli bir alan
  console.log('Kullanıcı tercihleri:', result.data.metadata.preferences);
  console.log('Tema ayarları:', result.data.metadata.theme);
  console.log('Bildirim ayarları:', result.data.metadata.notifications);
  
} else {
  console.error('Metadata getirme hatası:', result.error);
}

// Belirli bir metadata yolunu getir
const preferences = await metadata.get('user', 'user123', 'preferences');
const theme = await metadata.get('user', 'user123', 'theme');
const notifications = await metadata.get('user', 'user123', 'notifications');

// Uygulama metadata'sını getir
const appMetadata = await metadata.get('app', 'app456');

// Plan metadata'sını getir
const planMetadata = await metadata.get('plan', 'plan789');
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "entityType": "user",
    "entityId": "user123",
    "path": "",
    "metadata": {
      "preferences": {
        "language": "tr",
        "timezone": "Europe/Istanbul",
        "dateFormat": "DD/MM/YYYY",
        "currency": "TRY",
        "theme": "dark",
        "notifications": {
          "email": true,
          "sms": false,
          "push": true,
          "marketing": false
        },
        "privacy": {
          "profileVisibility": "public",
          "showEmail": false,
          "showPhone": false,
          "allowMessages": true
        },
        "dashboard": {
          "layout": "grid",
          "widgets": ["usage", "recent_activity", "notifications"],
          "refreshInterval": 30
        }
      },
      "customFields": {
        "department": "IT",
        "employeeId": "EMP001",
        "manager": "John Doe",
        "location": "Istanbul"
      },
      "tags": ["premium", "beta_tester", "developer"],
      "categories": ["business", "enterprise"],
      "settings": {
        "autoSave": true,
        "backupEnabled": true,
        "syncEnabled": true,
        "version": "2.1.0"
      },
      "history": {
        "lastLogin": "2024-01-15T10:30:00Z",
        "lastActivity": "2024-01-15T10:30:00Z",
        "loginCount": 156,
        "createdAt": "2024-01-01T00:00:00Z"
      },
      "integrations": {
        "slack": {
          "enabled": true,
          "workspace": "company-slack",
          "channel": "#general"
        },
        "google": {
          "enabled": true,
          "calendar": true,
          "drive": false
        }
      }
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "version": 5
  },
  "message": "Metadata başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "METADATA_NOT_FOUND",
    "message": "Metadata bulunamadı"
  }
}
```

---

### 2. update(entityType: string, entityId: string, path: string, value: any)

Varlık metadata'sını günceller

**Parametreler:**
- `entityType: string` - Varlık türü
- `entityId: string` - Varlık ID'si
- `path: string` - Metadata yolu
- `value: any` - Yeni değer

**Örnek Kullanım:**

```typescript
// Kullanıcı tercihlerini güncelle
const result = await metadata.update('user', 'user123', 'preferences', {
  language: 'en',
  timezone: 'America/New_York',
  theme: 'light',
  notifications: {
    email: true,
    sms: true,
    push: false,
    marketing: true
  }
});

if (result.success) {
  console.log('Metadata güncellendi:', result.data);
} else {
  console.error('Metadata güncelleme hatası:', result.error);
}

// Belirli bir alanı güncelle
await metadata.update('user', 'user123', 'preferences.theme', 'dark');
await metadata.update('user', 'user123', 'preferences.language', 'tr');

// Özel alanları güncelle
await metadata.update('user', 'user123', 'customFields.department', 'Marketing');
await metadata.update('user', 'user123', 'customFields.employeeId', 'EMP002');

// Etiketleri güncelle
await metadata.update('user', 'user123', 'tags', ['premium', 'vip', 'enterprise']);

// Uygulama metadata'sını güncelle
await metadata.update('app', 'app456', 'settings', {
  autoSave: false,
  backupEnabled: true,
  syncEnabled: false
});

// Plan metadata'sını güncelle
await metadata.update('plan', 'plan789', 'features', {
  maxUsers: 100,
  storage: '10GB',
  support: '24/7'
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "entityType": "user",
    "entityId": "user123",
    "path": "preferences",
    "value": {
      "language": "en",
      "timezone": "America/New_York",
      "theme": "light",
      "notifications": {
        "email": true,
        "sms": true,
        "push": false,
        "marketing": true
      }
    },
    "updatedAt": "2024-01-15T10:30:00Z",
    "version": 6
  },
  "message": "Metadata başarıyla güncellendi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "METADATA_UPDATE_FAILED",
    "message": "Metadata güncellenemedi"
  }
}
```

---

### 3. patch(entityType: string, entityId: string, path: string, value: any)

Varlık metadata'sını kısmi olarak günceller

**Parametreler:**
- `entityType: string` - Varlık türü
- `entityId: string` - Varlık ID'si
- `path: string` - Metadata yolu
- `value: any` - Güncellenecek değer

**Örnek Kullanım:**

```typescript
// Sadece tema ayarını güncelle
const result = await metadata.patch('user', 'user123', 'preferences.theme', 'dark');

if (result.success) {
  console.log('Tema güncellendi:', result.data);
} else {
  console.error('Tema güncelleme hatası:', result.error);
}

// Sadece bildirim ayarlarını güncelle
await metadata.patch('user', 'user123', 'preferences.notifications.email', false);
await metadata.patch('user', 'user123', 'preferences.notifications.sms', true);

// Sadece dil ayarını güncelle
await metadata.patch('user', 'user123', 'preferences.language', 'tr');

// Sadece zaman dilimi ayarını güncelle
await metadata.patch('user', 'user123', 'preferences.timezone', 'Europe/Istanbul');

// Sadece özel alanları güncelle
await metadata.patch('user', 'user123', 'customFields.department', 'HR');
await metadata.patch('user', 'user123', 'customFields.location', 'Ankara');

// Sadece etiketleri güncelle
await metadata.patch('user', 'user123', 'tags', ['premium', 'beta_tester']);

// Sadece ayarları güncelle
await metadata.patch('user', 'user123', 'settings.autoSave', false);
await metadata.patch('user', 'user123', 'settings.backupEnabled', true);

// Uygulama ayarlarını güncelle
await metadata.patch('app', 'app456', 'settings.autoSave', false);
await metadata.patch('app', 'app456', 'settings.version', '2.2.0');

// Plan özelliklerini güncelle
await metadata.patch('plan', 'plan789', 'features.maxUsers', 200);
await metadata.patch('plan', 'plan789', 'features.storage', '20GB');
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "entityType": "user",
    "entityId": "user123",
    "path": "preferences.theme",
    "value": "dark",
    "updatedAt": "2024-01-15T10:30:00Z",
    "version": 7
  },
  "message": "Metadata başarıyla güncellendi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "METADATA_PATCH_FAILED",
    "message": "Metadata güncellenemedi"
  }
}
```

---

### 4. delete(entityType: string, entityId: string, path: string)

Varlık metadata'sını siler

**Parametreler:**
- `entityType: string` - Varlık türü
- `entityId: string` - Varlık ID'si
- `path: string` - Silinecek metadata yolu

**Örnek Kullanım:**

```typescript
// Belirli bir metadata alanını sil
const result = await metadata.delete('user', 'user123', 'customFields.department');

if (result.success) {
  console.log('Metadata alanı silindi:', result.data);
} else {
  console.error('Metadata silme hatası:', result.error);
}

// Özel alanları sil
await metadata.delete('user', 'user123', 'customFields.employeeId');
await metadata.delete('user', 'user123', 'customFields.manager');
await metadata.delete('user', 'user123', 'customFields.location');

// Etiketleri sil
await metadata.delete('user', 'user123', 'tags');

// Kategorileri sil
await metadata.delete('user', 'user123', 'categories');

// Entegrasyonları sil
await metadata.delete('user', 'user123', 'integrations.slack');
await metadata.delete('user', 'user123', 'integrations.google');

// Ayarları sil
await metadata.delete('user', 'user123', 'settings.autoSave');
await metadata.delete('user', 'user123', 'settings.backupEnabled');

// Uygulama metadata'sını sil
await metadata.delete('app', 'app456', 'settings');
await metadata.delete('app', 'app456', 'customFields');

// Plan metadata'sını sil
await metadata.delete('plan', 'plan789', 'features');
await metadata.delete('plan', 'plan789', 'customFields');

// Tüm metadata'yı sil
await metadata.delete('user', 'user123', '');
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "entityType": "user",
    "entityId": "user123",
    "path": "customFields.department",
    "deletedAt": "2024-01-15T10:30:00Z",
    "version": 8
  },
  "message": "Metadata başarıyla silindi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "METADATA_DELETE_FAILED",
    "message": "Metadata silinemedi"
  }
}
```

---

## Metadata Türleri

### Kullanıcı Metadata
- **preferences**: Kullanıcı tercihleri
- **customFields**: Özel alanlar
- **tags**: Etiketler
- **categories**: Kategoriler
- **settings**: Ayarlar
- **history**: Geçmiş bilgileri
- **integrations**: Entegrasyonlar

### Uygulama Metadata
- **settings**: Uygulama ayarları
- **customFields**: Özel alanlar
- **tags**: Etiketler
- **categories**: Kategoriler
- **features**: Özellikler
- **integrations**: Entegrasyonlar

### Plan Metadata
- **features**: Plan özellikleri
- **customFields**: Özel alanlar
- **tags**: Etiketler
- **categories**: Kategoriler
- **settings**: Ayarlar

## Metadata Yolları

### Nokta Notasyonu
- `preferences.theme` - Tema ayarı
- `preferences.notifications.email` - Email bildirimi
- `customFields.department` - Departman
- `integrations.slack.workspace` - Slack workspace

### Dizi Notasyonu
- `tags[0]` - İlk etiket
- `categories[1]` - İkinci kategori
- `widgets[2]` - Üçüncü widget

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `METADATA_NOT_FOUND` | Metadata bulunamadı |
| `METADATA_UPDATE_FAILED` | Metadata güncellenemedi |
| `METADATA_PATCH_FAILED` | Metadata güncellenemedi |
| `METADATA_DELETE_FAILED` | Metadata silinemedi |
| `INVALID_ENTITY_TYPE` | Geçersiz varlık türü |
| `INVALID_ENTITY_ID` | Geçersiz varlık ID'si |
| `INVALID_PATH` | Geçersiz metadata yolu |

## Güvenlik Notları

- Metadata bilgileri hassas olabilir
- Sadece yetkili kullanıcılar erişebilir
- Düzenli güvenlik güncellemeleri yapın
- Metadata değişikliklerini loglayın

## Metadata Yönetimi

```typescript
// Metadata getir
const metadata = await metadata.get('user', 'user123');

// Belirli alanı güncelle
await metadata.update('user', 'user123', 'preferences', {
  theme: 'dark',
  language: 'tr'
});

// Kısmi güncelleme
await metadata.patch('user', 'user123', 'preferences.theme', 'light');

// Alan sil
await metadata.delete('user', 'user123', 'customFields.department');

// Tüm metadata'yı sil
await metadata.delete('user', 'user123', '');
```
