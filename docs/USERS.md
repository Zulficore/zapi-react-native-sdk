# Users Endpoint - 8 Metod

Kullanıcı yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Kullanıcıları listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `search` (string): Arama terimi
  - `status` (string): Kullanıcı durumu
  - `role` (string): Kullanıcı rolü

**Detaylı Örnek:**
```typescript
const users = await zapi.users.list({
  limit: 10,
  page: 1,
  search: 'john',
  status: 'active',
  role: 'user'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcılar getirildi",
  "data": {
    "users": [
      {
        "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "email": "john@example.com",
        "name": "John Doe",
        "role": "user",
        "status": "active",
        "emailVerified": true,
        "profile": {
          "avatar": "https://api.zapi.com/avatars/user_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
          "bio": "Full-stack developer",
          "location": "Istanbul, Turkey"
        },
        "stats": {
          "totalRequests": 1250,
          "totalCost": 125.50,
          "lastLogin": "2024-01-15T10:30:00Z"
        },
        "createdAt": "2024-01-01T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
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
Yeni kullanıcı oluşturur.

**Parametreler:**
- `data` (any): Kullanıcı verileri
  - `email` (string): E-posta adresi
  - `name` (string): Ad
  - `role` (string): Rol
  - `password` (string): Şifre

**Detaylı Örnek:**
```typescript
const create = await zapi.users.create({
  email: 'newuser@example.com',
  name: 'New User',
  role: 'user',
  password: 'securePassword123'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcı başarıyla oluşturuldu",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j1",
      "email": "newuser@example.com",
      "name": "New User",
      "role": "user",
      "status": "active",
      "emailVerified": false,
      "profile": {
        "avatar": null,
        "bio": null,
        "location": null
      },
      "stats": {
        "totalRequests": 0,
        "totalCost": 0,
        "lastLogin": null
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(userId: string): Promise<ApiResponse>
Belirli bir kullanıcının detaylarını getirir.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si

**Detaylı Örnek:**
```typescript
const user = await zapi.users.get('user_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcı detayları getirildi",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "user",
      "status": "active",
      "emailVerified": true,
      "profile": {
        "avatar": "https://api.zapi.com/avatars/user_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
        "bio": "Full-stack developer",
        "location": "Istanbul, Turkey",
        "website": "https://johndoe.dev"
      },
      "stats": {
        "totalRequests": 1250,
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
```

### 4. update(userId: string, data: any): Promise<ApiResponse>
Belirli bir kullanıcıyı günceller.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.users.update('user_64f8a1b2c3d4e5f6g7h8i9j0', {
  name: 'John Doe Updated',
  role: 'admin',
  profile: {
    bio: 'Senior Full-stack developer',
    location: 'Istanbul, Turkey',
    website: 'https://johndoe.dev'
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcı başarıyla güncellendi",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "john@example.com",
      "name": "John Doe Updated",
      "role": "admin",
      "status": "active",
      "profile": {
        "avatar": "https://api.zapi.com/avatars/user_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
        "bio": "Senior Full-stack developer",
        "location": "Istanbul, Turkey",
        "website": "https://johndoe.dev"
      },
      "stats": {
        "totalRequests": 1250,
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
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 5. delete(userId: string): Promise<ApiResponse>
Belirli bir kullanıcıyı siler.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si

**Detaylı Örnek:**
```typescript
const deleteUser = await zapi.users.delete('user_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcı başarıyla silindi",
  "data": {
    "deleted": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "john@example.com",
      "name": "John Doe Updated",
      "deletedAt": "2024-01-15T10:40:00Z",
      "deletedBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. activate(userId: string): Promise<ApiResponse>
Belirli bir kullanıcıyı aktif eder.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si

**Detaylı Örnek:**
```typescript
const activate = await zapi.users.activate('user_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcı başarıyla aktif edildi",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "John Doe Updated",
      "status": "active",
      "activatedAt": "2024-01-15T10:40:00Z",
      "activatedBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 7. deactivate(userId: string): Promise<ApiResponse>
Belirli bir kullanıcıyı pasif eder.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si

**Detaylı Örnek:**
```typescript
const deactivate = await zapi.users.deactivate('user_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcı başarıyla pasif edildi",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "John Doe Updated",
      "status": "inactive",
      "deactivatedAt": "2024-01-15T10:40:00Z",
      "deactivatedBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 8. getStats(): Promise<ApiResponse>
Kullanıcı istatistiklerini getirir.

**Detaylı Örnek:**
```typescript
const stats = await zapi.users.getStats();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcı istatistikleri getirildi",
  "data": {
    "stats": {
      "overview": {
        "totalUsers": 1250,
        "activeUsers": 1180,
        "inactiveUsers": 70,
        "newUsersToday": 12,
        "newUsersThisWeek": 85,
        "newUsersThisMonth": 320
      },
      "byRole": [
        {
          "role": "user",
          "count": 1200,
          "percentage": 96.0
        },
        {
          "role": "admin",
          "count": 50,
          "percentage": 4.0
        }
      ],
      "byStatus": [
        {
          "status": "active",
          "count": 1180,
          "percentage": 94.4
        },
        {
          "status": "inactive",
          "count": 70,
          "percentage": 5.6
        }
      ],
      "growth": {
        "daily": 12,
        "weekly": 85,
        "monthly": 320,
        "yearly": 1250
      }
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
  // 1. Kullanıcıları listele
  const users = await zapi.users.list({
    limit: 10,
    page: 1,
    status: 'active',
    role: 'user'
  });
  console.log('Toplam kullanıcı:', users.data.pagination.totalItems);
  
  // 2. Yeni kullanıcı oluştur
  const create = await zapi.users.create({
    email: 'newuser@example.com',
    name: 'New User',
    role: 'user',
    password: 'securePassword123'
  });
  const userId = create.data.user.id;
  console.log('Yeni kullanıcı oluşturuldu:', userId);
  
  // 3. Kullanıcı detayını getir
  const user = await zapi.users.get(userId);
  console.log('Kullanıcı:', user.data.user.name);
  console.log('E-posta:', user.data.user.email);
  
  // 4. Kullanıcı güncelle
  const update = await zapi.users.update(userId, {
    name: 'New User Updated',
    role: 'admin',
    profile: {
      bio: 'Senior developer',
      location: 'Istanbul, Turkey'
    }
  });
  console.log('Kullanıcı güncellendi:', update.data.user.updatedAt);
  
  // 5. Kullanıcı aktif et
  const activate = await zapi.users.activate(userId);
  console.log('Kullanıcı aktif edildi:', activate.data.user.activatedAt);
  
  // 6. Kullanıcı istatistiklerini getir
  const stats = await zapi.users.getStats();
  console.log('Toplam kullanıcı:', stats.data.stats.overview.totalUsers);
  console.log('Aktif kullanıcı:', stats.data.stats.overview.activeUsers);
  
  // 7. Kullanıcı pasif et
  const deactivate = await zapi.users.deactivate(userId);
  console.log('Kullanıcı pasif edildi:', deactivate.data.user.deactivatedAt);
  
  // 8. Kullanıcı sil
  const deleteUser = await zapi.users.delete(userId);
  console.log('Kullanıcı silindi:', deleteUser.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
