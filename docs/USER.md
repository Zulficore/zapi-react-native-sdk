# User Endpoint - 15 Metod

Kullanıcı yönetimi işlemleri için kullanılan endpoint.

## Metodlar

### 1. getProfile(): Promise<ApiResponse>
Kullanıcı profilini getirir.

**Detaylı Örnek:**
```typescript
const profile = await zapi.user.getProfile();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Profil bilgileri getirildi",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "status": "active",
      "emailVerified": true,
      "profile": {
        "avatar": "https://api.zapi.com/avatars/user_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
        "bio": "Full-stack developer with 5 years experience",
        "location": "Istanbul, Turkey",
        "website": "https://johndoe.dev",
        "social": {
          "twitter": "@johndoe",
          "linkedin": "john-doe-dev",
          "github": "johndoe"
        }
      },
      "preferences": {
        "language": "tr",
        "timezone": "Europe/Istanbul",
        "notifications": {
          "email": true,
          "push": true,
          "sms": false
        }
      },
      "stats": {
        "totalRequests": 1250,
        "totalTokens": 45000,
        "totalCost": 125.50,
        "lastLogin": "2024-01-15T10:30:00Z",
        "loginCount": 45
      },
      "subscription": {
        "plan": "premium",
        "status": "active",
        "expiresAt": "2024-02-15T10:30:00Z"
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Kimlik doğrulama gerekli",
  "error": "AUTHENTICATION_REQUIRED",
  "details": {
    "reason": "Valid access token is required"
  }
}
*/
```

### 2. updateProfile(data: any): Promise<ApiResponse>
Kullanıcı profilini günceller.

**Parametreler:**
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const updateProfile = await zapi.user.updateProfile({
  name: 'John Doe Updated',
  profile: {
    bio: 'Senior Full-stack developer with 6 years experience in AI and ML',
    location: 'Istanbul, Turkey',
    website: 'https://johndoe.dev',
    social: {
      twitter: '@johndoe',
      linkedin: 'john-doe-dev',
      github: 'johndoe',
      instagram: '@johndoe'
    }
  },
  preferences: {
    language: 'en',
    timezone: 'Europe/London',
    notifications: {
      email: true,
      push: false,
      sms: true
    }
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Profil başarıyla güncellendi",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@example.com",
      "name": "John Doe Updated",
      "role": "user",
      "status": "active",
      "profile": {
        "avatar": "https://api.zapi.com/avatars/user_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
        "bio": "Senior Full-stack developer with 6 years experience in AI and ML",
        "location": "Istanbul, Turkey",
        "website": "https://johndoe.dev",
        "social": {
          "twitter": "@johndoe",
          "linkedin": "john-doe-dev",
          "github": "johndoe",
          "instagram": "@johndoe"
        }
      },
      "preferences": {
        "language": "en",
        "timezone": "Europe/London",
        "notifications": {
          "email": true,
          "push": false,
          "sms": true
        }
      },
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Profil güncellenemedi",
  "error": "PROFILE_UPDATE_FAILED",
  "details": {
    "field": "name",
    "value": "",
    "reason": "Name cannot be empty"
  }
}
*/
```

### 3. changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse>
Şifre değiştirir.

**Parametreler:**
- `currentPassword` (string): Mevcut şifre
- `newPassword` (string): Yeni şifre

**Detaylı Örnek:**
```typescript
const changePassword = await zapi.user.changePassword(
  'currentPassword123',
  'newSecurePassword456'
);

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Şifre başarıyla değiştirildi",
  "data": {
    "change": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "changedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Mevcut şifre yanlış",
  "error": "INVALID_CURRENT_PASSWORD",
  "details": {
    "field": "currentPassword",
    "reason": "Current password is incorrect"
  }
}
*/
```

### 4. deleteAccount(): Promise<ApiResponse>
Hesabı siler.

**Detaylı Örnek:**
```typescript
const deleteAccount = await zapi.user.deleteAccount();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Hesap başarıyla silindi",
  "data": {
    "deleted": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@example.com",
      "deletedAt": "2024-01-15T10:40:00Z"
    },
    "cleanup": {
      "dataRetentionDays": 30,
      "finalDeletionDate": "2024-02-14T10:40:00Z",
      "backupCreated": true,
      "relatedDataArchived": true
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Hesap silinemedi",
  "error": "ACCOUNT_DELETE_FAILED",
  "details": {
    "reason": "User has active subscription that must be cancelled first"
  }
}
*/
```

### 5. getStats(): Promise<ApiResponse>
Kullanıcı istatistiklerini getirir.

**Detaylı Örnek:**
```typescript
const stats = await zapi.user.getStats();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcı istatistikleri getirildi",
  "data": {
    "stats": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "overview": {
        "totalRequests": 1250,
        "totalTokens": 45000,
        "totalCost": 125.50,
        "averageRequestsPerDay": 25.5,
        "averageCostPerDay": 2.51
      },
      "usage": {
        "thisMonth": {
          "requests": 320,
          "tokens": 12000,
          "cost": 32.50
        },
        "lastMonth": {
          "requests": 280,
          "tokens": 10500,
          "cost": 28.75
        },
        "growth": {
          "requests": 14.3,
          "tokens": 14.3,
          "cost": 13.0
        }
      },
      "activity": {
        "lastLogin": "2024-01-15T10:30:00Z",
        "loginCount": 45,
        "averageSessionDuration": "12.5 minutes",
        "mostActiveHour": "14:00",
        "mostActiveDay": "Monday"
      },
      "subscription": {
        "plan": "premium",
        "status": "active",
        "startDate": "2024-01-01T10:30:00Z",
        "expiresAt": "2024-02-15T10:30:00Z",
        "renewalCount": 1
      }
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "İstatistikler alınamadı",
  "error": "STATS_UNAVAILABLE",
  "details": {
    "reason": "User statistics are not available"
  }
}
*/
```

### 6. getUsage(period: string = 'monthly'): Promise<ApiResponse>
Kullanım bilgilerini getirir.

**Parametreler:**
- `period` (string): Kullanım periyodu ('daily', 'weekly', 'monthly', 'yearly')

**Detaylı Örnek:**
```typescript
const usage = await zapi.user.getUsage('monthly');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanım bilgileri getirildi",
  "data": {
    "usage": {
      "period": "monthly",
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "summary": {
        "totalRequests": 320,
        "totalTokens": 12000,
        "totalCost": 32.50,
        "averageRequestsPerDay": 10.3,
        "averageCostPerDay": 1.05
      },
      "breakdown": {
        "byEndpoint": [
          {
            "endpoint": "chat",
            "requests": 150,
            "tokens": 8000,
            "cost": 20.00
          },
          {
            "endpoint": "images",
            "requests": 100,
            "tokens": 3000,
            "cost": 10.00
          },
          {
            "endpoint": "audio",
            "requests": 70,
            "tokens": 1000,
            "cost": 2.50
          }
        ],
        "byDay": [
          {
            "date": "2024-01-15",
            "requests": 15,
            "tokens": 500,
            "cost": 1.25
          },
          {
            "date": "2024-01-14",
            "requests": 12,
            "tokens": 400,
            "cost": 1.00
          }
        ]
      },
      "limits": {
        "plan": "premium",
        "monthlyRequests": 10000,
        "monthlyTokens": 100000,
        "monthlyCost": 100.00,
        "remainingRequests": 9680,
        "remainingTokens": 88000,
        "remainingCost": 67.50
      }
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Kullanım bilgileri alınamadı",
  "error": "USAGE_UNAVAILABLE",
  "details": {
    "reason": "Usage data is not available for the specified period"
  }
}
*/
```

### 7. getBilling(): Promise<ApiResponse>
Faturalandırma bilgilerini getirir.

**Detaylı Örnek:**
```typescript
const billing = await zapi.user.getBilling();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Faturalandırma bilgileri getirildi",
  "data": {
    "billing": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "subscription": {
        "plan": "premium",
        "status": "active",
        "amount": 29.99,
        "currency": "USD",
        "interval": "month",
        "nextBillingDate": "2024-02-15T10:30:00Z",
        "trialEndsAt": null
      },
      "paymentMethod": {
        "type": "credit_card",
        "last4": "4242",
        "brand": "visa",
        "expiryMonth": 12,
        "expiryYear": 2025
      },
      "invoices": [
        {
          "id": "inv_64f8a1b2c3d4e5f6g7h8i9j0",
          "amount": 29.99,
          "currency": "USD",
          "status": "paid",
          "dueDate": "2024-01-15T10:30:00Z",
          "paidAt": "2024-01-15T10:30:00Z",
          "downloadUrl": "https://api.zapi.com/invoices/inv_64f8a1b2c3d4e5f6g7h8i9j0.pdf"
        }
      ],
      "usage": {
        "currentPeriod": {
          "requests": 320,
          "tokens": 12000,
          "cost": 32.50
        },
        "overage": {
          "requests": 0,
          "tokens": 0,
          "cost": 0
        }
      }
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Faturalandırma bilgileri alınamadı",
  "error": "BILLING_UNAVAILABLE",
  "details": {
    "reason": "Billing information is not available"
  }
}
*/
```

### 8. getNotifications(): Promise<ApiResponse>
Bildirimleri getirir.

**Detaylı Örnek:**
```typescript
const notifications = await zapi.user.getNotifications();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirimler getirildi",
  "data": {
    "notifications": [
      {
        "id": "notif_64f8a1b2c3d4e5f6g7h8i9j0",
        "type": "usage_alert",
        "title": "Kullanım Limitinize Yaklaşıyorsunuz",
        "message": "Bu ay 8,000 istek kullandınız. Limitiniz 10,000.",
        "read": false,
        "createdAt": "2024-01-15T10:30:00Z"
      },
      {
        "id": "notif_64f8a1b2c3d4e5f6g7h8i9j1",
        "type": "billing",
        "title": "Fatura Ödendi",
        "message": "Premium plan faturanız başarıyla ödendi.",
        "read": true,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "unreadCount": 1
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Bildirimler alınamadı",
  "error": "NOTIFICATIONS_UNAVAILABLE",
  "details": {
    "reason": "Notifications are not available"
  }
}
*/
```

### 9. markNotificationAsRead(notificationId: string): Promise<ApiResponse>
Bildirimi okundu olarak işaretler.

**Parametreler:**
- `notificationId` (string): Bildirim ID'si

**Detaylı Örnek:**
```typescript
const markAsRead = await zapi.user.markNotificationAsRead('notif_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bildirim okundu olarak işaretlendi",
  "data": {
    "notification": {
      "id": "notif_64f8a1b2c3d4e5f6g7h8i9j0",
      "read": true,
      "readAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Bildirim bulunamadı",
  "error": "NOTIFICATION_NOT_FOUND",
  "details": {
    "notificationId": "notif_64f8a1b2c3d4e5f6g7h8i9j0",
    "reason": "Notification does not exist"
  }
}
*/
```

### 10. getConversations(): Promise<ApiResponse>
Konuşmaları getirir.

**Detaylı Örnek:**
```typescript
const conversations = await zapi.user.getConversations();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Konuşmalar getirildi",
  "data": {
    "conversations": [
      {
        "id": "conv_64f8a1b2c3d4e5f6g7h8i9j0",
        "title": "AI Chat Session",
        "type": "chat",
        "messageCount": 15,
        "lastMessage": {
          "content": "Bu konuda daha fazla bilgi verebilir misin?",
          "timestamp": "2024-01-15T10:30:00Z"
        },
        "createdAt": "2024-01-15T09:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Konuşmalar alınamadı",
  "error": "CONVERSATIONS_UNAVAILABLE",
  "details": {
    "reason": "Conversations are not available"
  }
}
*/
```

### 11. getConversation(conversationId: string): Promise<ApiResponse>
Belirli bir konuşmayı getirir.

**Parametreler:**
- `conversationId` (string): Konuşma ID'si

**Detaylı Örnek:**
```typescript
const conversation = await zapi.user.getConversation('conv_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Konuşma getirildi",
  "data": {
    "conversation": {
      "id": "conv_64f8a1b2c3d4e5f6g7h8i9j0",
      "title": "AI Chat Session",
      "type": "chat",
      "messages": [
        {
          "id": "msg_64f8a1b2c3d4e5f6g7h8i9j0",
          "role": "user",
          "content": "Merhaba, nasılsın?",
          "timestamp": "2024-01-15T09:00:00Z"
        },
        {
          "id": "msg_64f8a1b2c3d4e5f6g7h8i9j1",
          "role": "assistant",
          "content": "Merhaba! Ben iyiyim, teşekkür ederim. Size nasıl yardımcı olabilirim?",
          "timestamp": "2024-01-15T09:00:05Z"
        }
      ],
      "messageCount": 15,
      "createdAt": "2024-01-15T09:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Konuşma bulunamadı",
  "error": "CONVERSATION_NOT_FOUND",
  "details": {
    "conversationId": "conv_64f8a1b2c3d4e5f6g7h8i9j0",
    "reason": "Conversation does not exist"
  }
}
*/
```

### 12. getMetadata(path: string): Promise<ApiResponse>
Metadata bilgilerini getirir.

**Parametreler:**
- `path` (string): Metadata path'i

**Detaylı Örnek:**
```typescript
const metadata = await zapi.user.getMetadata('preferences');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata getirildi",
  "data": {
    "metadata": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "preferences",
      "value": {
        "language": "tr",
        "timezone": "Europe/Istanbul",
        "notifications": {
          "email": true,
          "push": true,
          "sms": false
        },
        "privacy": {
          "profileVisibility": "public",
          "activityVisibility": "friends",
          "dataSharing": false
        }
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Metadata bulunamadı",
  "error": "METADATA_NOT_FOUND",
  "details": {
    "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
    "path": "preferences",
    "reason": "Metadata path does not exist"
  }
}
*/
```

### 13. updateMetadata(path: string, value: any): Promise<ApiResponse>
Metadata bilgilerini günceller.

**Parametreler:**
- `path` (string): Metadata path'i
- `value` (any): Güncellenecek değer

**Detaylı Örnek:**
```typescript
const updateMetadata = await zapi.user.updateMetadata('preferences', {
  language: 'en',
  timezone: 'Europe/London',
  notifications: {
    email: true,
    push: false,
    sms: true
  },
  privacy: {
    profileVisibility: 'private',
    activityVisibility: 'private',
    dataSharing: false
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata başarıyla güncellendi",
  "data": {
    "metadata": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "preferences",
      "value": {
        "language": "en",
        "timezone": "Europe/London",
        "notifications": {
          "email": true,
          "push": false,
          "sms": true
        },
        "privacy": {
          "profileVisibility": "private",
          "activityVisibility": "private",
          "dataSharing": false
        }
      },
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Geçersiz metadata değeri",
  "error": "INVALID_METADATA_VALUE",
  "details": {
    "field": "language",
    "value": "invalid_lang",
    "reason": "Language must be one of: tr, en, es, fr, de, it, pt, ru, ja, ko, zh"
  }
}
*/
```

### 14. patchMetadata(path: string, value: any): Promise<ApiResponse>
Metadata bilgilerini kısmi günceller.

**Parametreler:**
- `path` (string): Metadata path'i
- `value` (any): Güncellenecek değer

**Detaylı Örnek:**
```typescript
const patchMetadata = await zapi.user.patchMetadata('preferences', {
  language: 'en',
  notifications: {
    email: false
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata başarıyla güncellendi",
  "data": {
    "metadata": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "preferences",
      "value": {
        "language": "en",
        "timezone": "Europe/Istanbul",
        "notifications": {
          "email": false,
          "push": true,
          "sms": false
        },
        "privacy": {
          "profileVisibility": "public",
          "activityVisibility": "friends",
          "dataSharing": false
        }
      },
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Geçersiz metadata değeri",
  "error": "INVALID_METADATA_VALUE",
  "details": {
    "field": "language",
    "value": "invalid_lang",
    "reason": "Language must be one of: tr, en, es, fr, de, it, pt, ru, ja, ko, zh"
  }
}
*/
```

### 15. deleteMetadata(path: string): Promise<ApiResponse>
Metadata bilgilerini siler.

**Parametreler:**
- `path` (string): Metadata path'i

**Detaylı Örnek:**
```typescript
const deleteMetadata = await zapi.user.deleteMetadata('preferences');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata başarıyla silindi",
  "data": {
    "deleted": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "preferences",
      "deletedAt": "2024-01-15T10:40:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Metadata bulunamadı",
  "error": "METADATA_NOT_FOUND",
  "details": {
    "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
    "path": "preferences",
    "reason": "Metadata path does not exist"
  }
}
*/
```

## Hata Yönetimi

```typescript
import { ZAPIException, ValidationException, AuthenticationException } from 'zapi-react-native-sdk';

try {
  const result = await zapi.user.getProfile();
} catch (error) {
  if (error instanceof ValidationException) {
    console.log('Geçersiz veri:', error.message);
    console.log('Hata detayları:', error.details);
  } else if (error instanceof AuthenticationException) {
    console.log('Kimlik doğrulama hatası:', error.message);
    console.log('Hata kodu:', error.errorCode);
  } else if (error instanceof ZAPIException) {
    console.log('API hatası:', error.message);
    console.log('HTTP durum kodu:', error.statusCode);
  }
}
```

## Tam Örnek Kullanım

```typescript
import { ZAPI } from 'zapi-react-native-sdk';

const zapi = new ZAPI('your-api-key', 'your-app-id', 'https://api.zapi.com');

try {
  // 1. Profil getir
  const profile = await zapi.user.getProfile();
  console.log('Profil:', profile.data.user.name);
  console.log('E-posta:', profile.data.user.email);
  
  // 2. Profil güncelle
  const updateProfile = await zapi.user.updateProfile({
    name: 'John Doe Updated',
    profile: {
      bio: 'Senior Full-stack developer',
      location: 'Istanbul, Turkey'
    }
  });
  console.log('Profil güncellendi:', updateProfile.data.user.updatedAt);
  
  // 3. Şifre değiştir
  const changePassword = await zapi.user.changePassword(
    'currentPassword123',
    'newSecurePassword456'
  );
  console.log('Şifre değiştirildi:', changePassword.data.change.changedAt);
  
  // 4. İstatistikleri getir
  const stats = await zapi.user.getStats();
  console.log('Toplam istek:', stats.data.stats.overview.totalRequests);
  console.log('Toplam maliyet:', stats.data.stats.overview.totalCost);
  
  // 5. Kullanım bilgilerini getir
  const usage = await zapi.user.getUsage('monthly');
  console.log('Bu ayki istek:', usage.data.usage.summary.totalRequests);
  console.log('Kalan istek:', usage.data.usage.limits.remainingRequests);
  
  // 6. Faturalandırma bilgilerini getir
  const billing = await zapi.user.getBilling();
  console.log('Plan:', billing.data.billing.subscription.plan);
  console.log('Sonraki faturalandırma:', billing.data.billing.subscription.nextBillingDate);
  
  // 7. Bildirimleri getir
  const notifications = await zapi.user.getNotifications();
  console.log('Okunmamış bildirim:', notifications.data.unreadCount);
  
  // 8. Bildirimi okundu olarak işaretle
  const markAsRead = await zapi.user.markNotificationAsRead('notif_64f8a1b2c3d4e5f6g7h8i9j0');
  console.log('Bildirim okundu:', markAsRead.data.notification.readAt);
  
  // 9. Konuşmaları getir
  const conversations = await zapi.user.getConversations();
  console.log('Toplam konuşma:', conversations.data.total);
  
  // 10. Konuşma detayını getir
  const conversation = await zapi.user.getConversation('conv_64f8a1b2c3d4e5f6g7h8i9j0');
  console.log('Konuşma başlığı:', conversation.data.conversation.title);
  console.log('Mesaj sayısı:', conversation.data.conversation.messageCount);
  
  // 11. Metadata getir
  const metadata = await zapi.user.getMetadata('preferences');
  console.log('Dil:', metadata.data.metadata.value.language);
  console.log('Zaman dilimi:', metadata.data.metadata.value.timezone);
  
  // 12. Metadata güncelle
  const updateMetadata = await zapi.user.updateMetadata('preferences', {
    language: 'en',
    timezone: 'Europe/London',
    notifications: {
      email: true,
      push: false,
      sms: true
    }
  });
  console.log('Metadata güncellendi:', updateMetadata.data.metadata.updatedAt);
  
  // 13. Metadata kısmi güncelle
  const patchMetadata = await zapi.user.patchMetadata('preferences', {
    language: 'tr',
    notifications: {
      email: false
    }
  });
  console.log('Metadata kısmi güncellendi:', patchMetadata.data.metadata.updatedAt);
  
  // 14. Metadata sil
  const deleteMetadata = await zapi.user.deleteMetadata('preferences');
  console.log('Metadata silindi:', deleteMetadata.data.deleted.deletedAt);
  
  // 15. Hesap sil (dikkatli kullanın!)
  // const deleteAccount = await zapi.user.deleteAccount();
  // console.log('Hesap silindi:', deleteAccount.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
