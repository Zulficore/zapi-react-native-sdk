# Notifications Endpoint - 12 Metod

Bildirim yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Bildirimleri listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `type` (string): Bildirim tipi
  - `status` (string): Bildirim durumu

**Detaylı Örnek:**
```typescript
const notifications = await zapi.notifications.list({
  limit: 10,
  page: 1,
  type: 'email',
  status: 'sent'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirimler getirildi",
  "data": {
    "notifications": [
      {
        "id": "notif_64f8a1b2c3d4e5f6g7h8i9j0",
        "type": "email",
        "status": "sent",
        "recipient": "user@example.com",
        "subject": "Hoş Geldiniz",
        "content": "ZAPI'ya hoş geldiniz!",
        "template": "welcome",
        "metadata": {
          "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
          "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0"
        },
        "sentAt": "2024-01-15T10:30:00Z",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 45,
      "itemsPerPage": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
*/
```

### 2. create(data: any): Promise<ApiResponse>
Yeni bildirim oluşturur.

**Parametreler:**
- `data` (any): Bildirim verileri
  - `type` (string): Bildirim tipi
  - `recipient` (string): Alıcı
  - `subject` (string): Konu
  - `content` (string): İçerik

**Detaylı Örnek:**
```typescript
const create = await zapi.notifications.create({
  type: 'email',
  recipient: 'user@example.com',
  subject: 'Test Bildirimi',
  content: 'Bu bir test bildirimidir.',
  template: 'custom',
  metadata: {
    userId: 'user_64f8a1b2c3d4e5f6g7h8i9j0',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirim başarıyla oluşturuldu",
  "data": {
    "notification": {
      "id": "notif_64f8a1b2c3d4e5f6g7h8i9j1",
      "type": "email",
      "status": "pending",
      "recipient": "user@example.com",
      "subject": "Test Bildirimi",
      "content": "Bu bir test bildirimidir.",
      "template": "custom",
      "metadata": {
        "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0"
      },
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(notificationId: string): Promise<ApiResponse>
Belirli bir bildirimin detaylarını getirir.

**Parametreler:**
- `notificationId` (string): Bildirim ID'si

**Detaylı Örnek:**
```typescript
const notification = await zapi.notifications.get('notif_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirim detayları getirildi",
  "data": {
    "notification": {
      "id": "notif_64f8a1b2c3d4e5f6g7h8i9j0",
      "type": "email",
      "status": "sent",
      "recipient": "user@example.com",
      "subject": "Hoş Geldiniz",
      "content": "ZAPI'ya hoş geldiniz!",
      "template": "welcome",
      "metadata": {
        "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0"
      },
      "sentAt": "2024-01-15T10:30:00Z",
      "deliveredAt": "2024-01-15T10:30:05Z",
      "openedAt": "2024-01-15T10:35:00Z",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. update(notificationId: string, data: any): Promise<ApiResponse>
Belirli bir bildirimi günceller.

**Parametreler:**
- `notificationId` (string): Bildirim ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.notifications.update('notif_64f8a1b2c3d4e5f6g7h8i9j0', {
  subject: 'Güncellenmiş Hoş Geldiniz',
  content: 'ZAPI'ya hoş geldiniz! Hesabınız hazır.',
  template: 'welcome_updated'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirim başarıyla güncellendi",
  "data": {
    "notification": {
      "id": "notif_64f8a1b2c3d4e5f6g7h8i9j0",
      "type": "email",
      "status": "sent",
      "recipient": "user@example.com",
      "subject": "Güncellenmiş Hoş Geldiniz",
      "content": "ZAPI'ya hoş geldiniz! Hesabınız hazır.",
      "template": "welcome_updated",
      "metadata": {
        "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0"
      },
      "sentAt": "2024-01-15T10:30:00Z",
      "deliveredAt": "2024-01-15T10:30:05Z",
      "openedAt": "2024-01-15T10:35:00Z",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 5. delete(notificationId: string): Promise<ApiResponse>
Belirli bir bildirimi siler.

**Parametreler:**
- `notificationId` (string): Bildirim ID'si

**Detaylı Örnek:**
```typescript
const deleteNotification = await zapi.notifications.delete('notif_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirim başarıyla silindi",
  "data": {
    "deleted": {
      "id": "notif_64f8a1b2c3d4e5f6g7h8i9j0",
      "subject": "Güncellenmiş Hoş Geldiniz",
      "deletedAt": "2024-01-15T10:40:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. send(notificationId: string): Promise<ApiResponse>
Belirli bir bildirimi gönderir.

**Parametreler:**
- `notificationId` (string): Bildirim ID'si

**Detaylı Örnek:**
```typescript
const send = await zapi.notifications.send('notif_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirim başarıyla gönderildi",
  "data": {
    "notification": {
      "id": "notif_64f8a1b2c3d4e5f6g7h8i9j0",
      "status": "sent",
      "sentAt": "2024-01-15T10:40:00Z",
      "sentBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 7. cancel(notificationId: string): Promise<ApiResponse>
Belirli bir bildirimi iptal eder.

**Parametreler:**
- `notificationId` (string): Bildirim ID'si

**Detaylı Örnek:**
```typescript
const cancel = await zapi.notifications.cancel('notif_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirim başarıyla iptal edildi",
  "data": {
    "notification": {
      "id": "notif_64f8a1b2c3d4e5f6g7h8i9j0",
      "status": "cancelled",
      "cancelledAt": "2024-01-15T10:40:00Z",
      "cancelledBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 8. getTemplates(): Promise<ApiResponse>
Bildirim şablonlarını getirir.

**Detaylı Örnek:**
```typescript
const templates = await zapi.notifications.getTemplates();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirim şablonları getirildi",
  "data": {
    "templates": [
      {
        "id": "welcome",
        "name": "Hoş Geldiniz",
        "type": "email",
        "subject": "ZAPI'ya Hoş Geldiniz",
        "content": "Merhaba {{name}}, ZAPI'ya hoş geldiniz!",
        "variables": ["name", "email"],
        "status": "active",
        "createdAt": "2024-01-01T10:30:00Z"
      },
      {
        "id": "password_reset",
        "name": "Şifre Sıfırlama",
        "type": "email",
        "subject": "Şifre Sıfırlama",
        "content": "Merhaba {{name}}, şifrenizi sıfırlamak için bu linke tıklayın: {{resetLink}}",
        "variables": ["name", "resetLink"],
        "status": "active",
        "createdAt": "2024-01-01T10:30:00Z"
      }
    ],
    "total": 2
  }
}
*/
```

### 9. createTemplate(data: any): Promise<ApiResponse>
Yeni bildirim şablonu oluşturur.

**Parametreler:**
- `data` (any): Şablon verileri
  - `name` (string): Şablon adı
  - `type` (string): Şablon tipi
  - `subject` (string): Konu
  - `content` (string): İçerik

**Detaylı Örnek:**
```typescript
const createTemplate = await zapi.notifications.createTemplate({
  name: 'Özel Bildirim',
  type: 'email',
  subject: 'Özel Bildirim',
  content: 'Merhaba {{name}}, bu özel bir bildirimidir.',
  variables: ['name', 'customData']
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirim şablonu başarıyla oluşturuldu",
  "data": {
    "template": {
      "id": "custom_notification",
      "name": "Özel Bildirim",
      "type": "email",
      "subject": "Özel Bildirim",
      "content": "Merhaba {{name}}, bu özel bir bildirimidir.",
      "variables": ["name", "customData"],
      "status": "active",
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 10. getStats(): Promise<ApiResponse>
Bildirim istatistiklerini getirir.

**Detaylı Örnek:**
```typescript
const stats = await zapi.notifications.getStats();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirim istatistikleri getirildi",
  "data": {
    "stats": {
      "overview": {
        "totalNotifications": 1250,
        "sentNotifications": 1200,
        "deliveredNotifications": 1180,
        "openedNotifications": 950,
        "clickedNotifications": 450
      },
      "byType": [
        {
          "type": "email",
          "count": 800,
          "deliveryRate": 98.5,
          "openRate": 85.0,
          "clickRate": 45.0
        },
        {
          "type": "sms",
          "count": 300,
          "deliveryRate": 95.0,
          "openRate": 90.0,
          "clickRate": 60.0
        },
        {
          "type": "push",
          "count": 150,
          "deliveryRate": 92.0,
          "openRate": 75.0,
          "clickRate": 40.0
        }
      ],
      "byTemplate": [
        {
          "template": "welcome",
          "count": 200,
          "deliveryRate": 99.0,
          "openRate": 90.0,
          "clickRate": 50.0
        },
        {
          "template": "password_reset",
          "count": 150,
          "deliveryRate": 98.0,
          "openRate": 85.0,
          "clickRate": 70.0
        }
      ],
      "recent": {
        "sentToday": 45,
        "sentThisWeek": 320,
        "sentThisMonth": 1250
      }
    }
  }
}
*/
```

### 11. getMetadata(notificationId: string, path: string): Promise<ApiResponse>
Bildirim metadata bilgilerini getirir.

**Parametreler:**
- `notificationId` (string): Bildirim ID'si
- `path` (string): Metadata path'i

**Detaylı Örnek:**
```typescript
const metadata = await zapi.notifications.getMetadata('notif_64f8a1b2c3d4e5f6g7h8i9j0', 'tracking');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata getirildi",
  "data": {
    "metadata": {
      "notificationId": "notif_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "tracking",
      "value": {
        "opened": true,
        "openedAt": "2024-01-15T10:35:00Z",
        "clicked": true,
        "clickedAt": "2024-01-15T10:36:00Z",
        "clickedLink": "https://app.zapi.com/welcome",
        "device": "mobile",
        "browser": "Chrome",
        "location": "Istanbul, Turkey"
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:36:00Z"
    }
  }
}
*/
```

### 12. updateMetadata(notificationId: string, path: string, value: any): Promise<ApiResponse>
Bildirim metadata bilgilerini günceller.

**Parametreler:**
- `notificationId` (string): Bildirim ID'si
- `path` (string): Metadata path'i
- `value` (any): Güncellenecek değer

**Detaylı Örnek:**
```typescript
const updateMetadata = await zapi.notifications.updateMetadata('notif_64f8a1b2c3d4e5f6g7h8i9j0', 'tracking', {
  opened: true,
  openedAt: '2024-01-15T10:35:00Z',
  clicked: true,
  clickedAt: '2024-01-15T10:36:00Z',
  clickedLink: 'https://app.zapi.com/welcome',
  device: 'mobile',
  browser: 'Chrome',
  location: 'Istanbul, Turkey'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata başarıyla güncellendi",
  "data": {
    "metadata": {
      "notificationId": "notif_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "tracking",
      "value": {
        "opened": true,
        "openedAt": "2024-01-15T10:35:00Z",
        "clicked": true,
        "clickedAt": "2024-01-15T10:36:00Z",
        "clickedLink": "https://app.zapi.com/welcome",
        "device": "mobile",
        "browser": "Chrome",
        "location": "Istanbul, Turkey"
      },
      "updatedAt": "2024-01-15T10:40:00Z"
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
  // 1. Bildirimleri listele
  const notifications = await zapi.notifications.list({
    limit: 10,
    page: 1,
    type: 'email',
    status: 'sent'
  });
  console.log('Toplam bildirim:', notifications.data.pagination.totalItems);
  
  // 2. Yeni bildirim oluştur
  const create = await zapi.notifications.create({
    type: 'email',
    recipient: 'user@example.com',
    subject: 'Test Bildirimi',
    content: 'Bu bir test bildirimidir.',
    template: 'custom'
  });
  const notificationId = create.data.notification.id;
  console.log('Yeni bildirim oluşturuldu:', notificationId);
  
  // 3. Bildirim detayını getir
  const notification = await zapi.notifications.get(notificationId);
  console.log('Bildirim konusu:', notification.data.notification.subject);
  console.log('Bildirim durumu:', notification.data.notification.status);
  
  // 4. Bildirim güncelle
  const update = await zapi.notifications.update(notificationId, {
    subject: 'Güncellenmiş Test Bildirimi',
    content: 'Bu güncellenmiş bir test bildirimidir.'
  });
  console.log('Bildirim güncellendi:', update.data.notification.updatedAt);
  
  // 5. Bildirim gönder
  const send = await zapi.notifications.send(notificationId);
  console.log('Bildirim gönderildi:', send.data.notification.sentAt);
  
  // 6. Bildirim şablonlarını getir
  const templates = await zapi.notifications.getTemplates();
  console.log('Toplam şablon:', templates.data.total);
  
  // 7. Yeni şablon oluştur
  const createTemplate = await zapi.notifications.createTemplate({
    name: 'Özel Bildirim',
    type: 'email',
    subject: 'Özel Bildirim',
    content: 'Merhaba {{name}}, bu özel bir bildirimidir.',
    variables: ['name', 'customData']
  });
  console.log('Yeni şablon oluşturuldu:', createTemplate.data.template.id);
  
  // 8. Bildirim istatistiklerini getir
  const stats = await zapi.notifications.getStats();
  console.log('Toplam bildirim:', stats.data.stats.overview.totalNotifications);
  console.log('Gönderilen bildirim:', stats.data.stats.overview.sentNotifications);
  
  // 9. Metadata getir
  const metadata = await zapi.notifications.getMetadata(notificationId, 'tracking');
  console.log('Açıldı mı:', metadata.data.metadata.value.opened);
  console.log('Tıklandı mı:', metadata.data.metadata.value.clicked);
  
  // 10. Metadata güncelle
  const updateMetadata = await zapi.notifications.updateMetadata(notificationId, 'tracking', {
    opened: true,
    openedAt: '2024-01-15T10:35:00Z',
    clicked: true,
    clickedAt: '2024-01-15T10:36:00Z'
  });
  console.log('Metadata güncellendi:', updateMetadata.data.metadata.updatedAt);
  
  // 11. Bildirim iptal et
  const cancel = await zapi.notifications.cancel(notificationId);
  console.log('Bildirim iptal edildi:', cancel.data.notification.cancelledAt);
  
  // 12. Bildirim sil
  const deleteNotification = await zapi.notifications.delete(notificationId);
  console.log('Bildirim silindi:', deleteNotification.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
