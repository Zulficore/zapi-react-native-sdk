# MailTemplates Endpoint - 7 Metod

E-posta şablonu yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
E-posta şablonlarını listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `status` (string): Şablon durumu
  - `type` (string): Şablon tipi

**Detaylı Örnek:**
```typescript
const templates = await zapi.mailTemplates.list({
  limit: 10,
  page: 1,
  status: 'active',
  type: 'welcome'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "E-posta şablonları getirildi",
  "data": {
    "templates": [
      {
        "id": "template_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "Welcome Email",
        "type": "welcome",
        "status": "active",
        "subject": "ZAPI'ya Hoş Geldiniz",
        "content": "Merhaba {{name}}, ZAPI'ya hoş geldiniz!",
        "variables": ["name", "email", "appName"],
        "language": "tr",
        "metadata": {
          "category": "welcome",
          "tags": ["welcome", "email", "user"]
        },
        "usage": {
          "count": 1250,
          "lastUsed": "2024-01-15T10:40:00Z"
        },
        "createdAt": "2024-01-01T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
      "itemsPerPage": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
*/
```

### 2. create(data: any): Promise<ApiResponse>
Yeni e-posta şablonu oluşturur.

**Parametreler:**
- `data` (any): Şablon verileri
  - `name` (string): Şablon adı
  - `type` (string): Şablon tipi
  - `subject` (string): E-posta konusu
  - `content` (string): E-posta içeriği
  - `variables` (string[]): Değişken listesi

**Detaylı Örnek:**
```typescript
const create = await zapi.mailTemplates.create({
  name: 'Password Reset Email',
  type: 'password_reset',
  subject: 'Şifre Sıfırlama',
  content: 'Merhaba {{name}}, şifrenizi sıfırlamak için bu linke tıklayın: {{resetLink}}',
  variables: ['name', 'resetLink', 'expiryTime'],
  language: 'tr',
  metadata: {
    category: 'security',
    tags: ['password', 'reset', 'security']
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "E-posta şablonu başarıyla oluşturuldu",
  "data": {
    "template": {
      "id": "template_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Password Reset Email",
      "type": "password_reset",
      "status": "active",
      "subject": "Şifre Sıfırlama",
      "content": "Merhaba {{name}}, şifrenizi sıfırlamak için bu linke tıklayın: {{resetLink}}",
      "variables": ["name", "resetLink", "expiryTime"],
      "language": "tr",
      "metadata": {
        "category": "security",
        "tags": ["password", "reset", "security"]
      },
      "usage": {
        "count": 0,
        "lastUsed": null
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(templateId: string): Promise<ApiResponse>
Belirli bir şablonun detaylarını getirir.

**Parametreler:**
- `templateId` (string): Şablon ID'si

**Detaylı Örnek:**
```typescript
const template = await zapi.mailTemplates.get('template_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "E-posta şablonu detayları getirildi",
  "data": {
    "template": {
      "id": "template_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Welcome Email",
      "type": "welcome",
      "status": "active",
      "subject": "ZAPI'ya Hoş Geldiniz",
      "content": "Merhaba {{name}}, ZAPI'ya hoş geldiniz!",
      "variables": ["name", "email", "appName"],
      "language": "tr",
      "metadata": {
        "category": "welcome",
        "tags": ["welcome", "email", "user"]
      },
      "usage": {
        "count": 1250,
        "lastUsed": "2024-01-15T10:40:00Z"
      },
      "preview": {
        "subject": "ZAPI'ya Hoş Geldiniz",
        "content": "Merhaba John Doe, ZAPI'ya hoş geldiniz!"
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. update(templateId: string, data: any): Promise<ApiResponse>
Belirli bir şablonu günceller.

**Parametreler:**
- `templateId` (string): Şablon ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.mailTemplates.update('template_64f8a1b2c3d4e5f6g7h8i9j0', {
  name: 'Updated Welcome Email',
  subject: 'ZAPI'ya Hoş Geldiniz - Güncellenmiş',
  content: 'Merhaba {{name}}, ZAPI'ya hoş geldiniz! Hesabınız başarıyla oluşturuldu.',
  variables: ['name', 'email', 'appName', 'loginUrl']
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "E-posta şablonu başarıyla güncellendi",
  "data": {
    "template": {
      "id": "template_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Updated Welcome Email",
      "type": "welcome",
      "status": "active",
      "subject": "ZAPI'ya Hoş Geldiniz - Güncellenmiş",
      "content": "Merhaba {{name}}, ZAPI'ya hoş geldiniz! Hesabınız başarıyla oluşturuldu.",
      "variables": ["name", "email", "appName", "loginUrl"],
      "language": "tr",
      "metadata": {
        "category": "welcome",
        "tags": ["welcome", "email", "user"]
      },
      "usage": {
        "count": 1250,
        "lastUsed": "2024-01-15T10:40:00Z"
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/
```

### 5. delete(templateId: string): Promise<ApiResponse>
Belirli bir şablonu siler.

**Parametreler:**
- `templateId` (string): Şablon ID'si

**Detaylı Örnek:**
```typescript
const deleteTemplate = await zapi.mailTemplates.delete('template_64f8a1b2c3d4e5f6g7h8i9j1');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "E-posta şablonu başarıyla silindi",
  "data": {
    "deleted": {
      "id": "template_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Password Reset Email",
      "deletedAt": "2024-01-15T10:45:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. preview(templateId: string, variables: any = {}): Promise<ApiResponse>
Şablon önizlemesi yapar.

**Parametreler:**
- `templateId` (string): Şablon ID'si
- `variables` (any): Değişken değerleri

**Detaylı Örnek:**
```typescript
const preview = await zapi.mailTemplates.preview('template_64f8a1b2c3d4e5f6g7h8i9j0', {
  name: 'John Doe',
  email: 'john@example.com',
  appName: 'ZAPI'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Şablon önizlemesi oluşturuldu",
  "data": {
    "preview": {
      "templateId": "template_64f8a1b2c3d4e5f6g7h8i9j0",
      "subject": "ZAPI'ya Hoş Geldiniz - Güncellenmiş",
      "content": "Merhaba John Doe, ZAPI'ya hoş geldiniz! Hesabınız başarıyla oluşturuldu.",
      "variables": {
        "name": "John Doe",
        "email": "john@example.com",
        "appName": "ZAPI"
      },
      "renderedAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/
```

### 7. getStats(options: any = {}): Promise<ApiResponse>
Şablon istatistiklerini getirir.

**Parametreler:**
- `options` (any): İstatistik seçenekleri
  - `period` (string): İstatistik periyodu
  - `dateFrom` (string): Başlangıç tarihi
  - `dateTo` (string): Bitiş tarihi

**Detaylı Örnek:**
```typescript
const stats = await zapi.mailTemplates.getStats({
  period: 'monthly',
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Şablon istatistikleri getirildi",
  "data": {
    "stats": {
      "period": "monthly",
      "dateRange": {
        "from": "2024-01-01",
        "to": "2024-01-31"
      },
      "overview": {
        "totalTemplates": 25,
        "activeTemplates": 20,
        "inactiveTemplates": 5,
        "totalUsage": 12500,
        "averageUsage": 500
      },
      "breakdown": {
        "byType": [
          {
            "type": "welcome",
            "count": 5,
            "usage": 5000
          },
          {
            "type": "password_reset",
            "count": 3,
            "usage": 3000
          }
        ],
        "byLanguage": [
          {
            "language": "tr",
            "count": 15,
            "usage": 8000
          },
          {
            "language": "en",
            "count": 10,
            "usage": 4500
          }
        ]
      },
      "topTemplates": [
        {
          "id": "template_64f8a1b2c3d4e5f6g7h8i9j0",
          "name": "Welcome Email",
          "usage": 1250
        }
      ]
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
  // 1. Şablonları listele
  const templates = await zapi.mailTemplates.list({ limit: 10, status: 'active' });
  console.log('Toplam şablon:', templates.data.pagination.totalItems);
  
  // 2. Yeni şablon oluştur
  const create = await zapi.mailTemplates.create({
    name: 'Password Reset Email',
    type: 'password_reset',
    subject: 'Şifre Sıfırlama',
    content: 'Merhaba {{name}}, şifrenizi sıfırlamak için bu linke tıklayın: {{resetLink}}',
    variables: ['name', 'resetLink', 'expiryTime'],
    language: 'tr'
  });
  const templateId = create.data.template.id;
  console.log('Yeni şablon oluşturuldu:', templateId);
  
  // 3. Şablon detayını getir
  const template = await zapi.mailTemplates.get(templateId);
  console.log('Şablon konusu:', template.data.template.subject);
  
  // 4. Şablon güncelle
  const update = await zapi.mailTemplates.update(templateId, {
    name: 'Updated Password Reset Email',
    subject: 'Şifre Sıfırlama - Güncellenmiş',
    content: 'Merhaba {{name}}, şifrenizi sıfırlamak için bu linke tıklayın: {{resetLink}}. Link {{expiryTime}} sonra geçersiz olacak.'
  });
  console.log('Şablon güncellendi:', update.data.template.updatedAt);
  
  // 5. Şablon önizlemesi
  const preview = await zapi.mailTemplates.preview(templateId, {
    name: 'John Doe',
    resetLink: 'https://app.zapi.com/reset-password?token=abc123',
    expiryTime: '24 saat'
  });
  console.log('Önizleme:', preview.data.preview.content);
  
  // 6. İstatistikleri getir
  const stats = await zapi.mailTemplates.getStats({
    period: 'monthly',
    dateFrom: '2024-01-01',
    dateTo: '2024-01-31'
  });
  console.log('Toplam şablon:', stats.data.stats.overview.totalTemplates);
  console.log('Toplam kullanım:', stats.data.stats.overview.totalUsage);
  
  // 7. Şablon sil
  const deleteTemplate = await zapi.mailTemplates.delete(templateId);
  console.log('Şablon silindi:', deleteTemplate.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
