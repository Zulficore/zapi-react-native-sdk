# Roles Endpoint - 8 Metod

Rol yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Rolleri listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `status` (string): Rol durumu
  - `type` (string): Rol tipi

**Detaylı Örnek:**
```typescript
const roles = await zapi.roles.list({
  limit: 10,
  page: 1,
  status: 'active',
  type: 'user'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Roller getirildi",
  "data": {
    "roles": [
      {
        "id": "role_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "Admin",
        "slug": "admin",
        "type": "user",
        "status": "active",
        "description": "Full system access",
        "permissions": [
          "users.create",
          "users.read",
          "users.update",
          "users.delete",
          "apps.create",
          "apps.read",
          "apps.update",
          "apps.delete"
        ],
        "metadata": {
          "color": "#ff0000",
          "icon": "shield",
          "level": 100
        },
        "usage": {
          "userCount": 5,
          "lastAssigned": "2024-01-15T10:40:00Z"
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
Yeni rol oluşturur.

**Parametreler:**
- `data` (any): Rol verileri
  - `name` (string): Rol adı
  - `slug` (string): Rol slug'ı
  - `type` (string): Rol tipi
  - `description` (string): Rol açıklaması
  - `permissions` (string[]): İzin listesi

**Detaylı Örnek:**
```typescript
const create = await zapi.roles.create({
  name: 'Moderator',
  slug: 'moderator',
  type: 'user',
  description: 'Content moderation access',
  permissions: [
    'content.read',
    'content.update',
    'users.read',
    'reports.read'
  ],
  metadata: {
    color: '#00ff00',
    icon: 'moderator',
    level: 50
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Rol başarıyla oluşturuldu",
  "data": {
    "role": {
      "id": "role_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Moderator",
      "slug": "moderator",
      "type": "user",
      "status": "active",
      "description": "Content moderation access",
      "permissions": [
        "content.read",
        "content.update",
        "users.read",
        "reports.read"
      ],
      "metadata": {
        "color": "#00ff00",
        "icon": "moderator",
        "level": 50
      },
      "usage": {
        "userCount": 0,
        "lastAssigned": null
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(roleId: string): Promise<ApiResponse>
Belirli bir rolün detaylarını getirir.

**Parametreler:**
- `roleId` (string): Rol ID'si

**Detaylı Örnek:**
```typescript
const role = await zapi.roles.get('role_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Rol detayları getirildi",
  "data": {
    "role": {
      "id": "role_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Admin",
      "slug": "admin",
      "type": "user",
      "status": "active",
      "description": "Full system access",
      "permissions": [
        "users.create",
        "users.read",
        "users.update",
        "users.delete",
        "apps.create",
        "apps.read",
        "apps.update",
        "apps.delete"
      ],
      "metadata": {
        "color": "#ff0000",
        "icon": "shield",
        "level": 100
      },
      "usage": {
        "userCount": 5,
        "lastAssigned": "2024-01-15T10:40:00Z"
      },
      "users": [
        {
          "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
          "name": "John Doe",
          "email": "john@example.com",
          "assignedAt": "2024-01-15T10:40:00Z"
        }
      ],
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. update(roleId: string, data: any): Promise<ApiResponse>
Belirli bir rolü günceller.

**Parametreler:**
- `roleId` (string): Rol ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.roles.update('role_64f8a1b2c3d4e5f6g7h8i9j0', {
  name: 'Super Admin',
  description: 'Full system access with advanced features',
  permissions: [
    'users.create',
    'users.read',
    'users.update',
    'users.delete',
    'apps.create',
    'apps.read',
    'apps.update',
    'apps.delete',
    'system.admin',
    'system.config'
  ],
  metadata: {
    color: '#ff0000',
    icon: 'shield',
    level: 100
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Rol başarıyla güncellendi",
  "data": {
    "role": {
      "id": "role_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Super Admin",
      "slug": "admin",
      "type": "user",
      "status": "active",
      "description": "Full system access with advanced features",
      "permissions": [
        "users.create",
        "users.read",
        "users.update",
        "users.delete",
        "apps.create",
        "apps.read",
        "apps.update",
        "apps.delete",
        "system.admin",
        "system.config"
      ],
      "metadata": {
        "color": "#ff0000",
        "icon": "shield",
        "level": 100
      },
      "usage": {
        "userCount": 5,
        "lastAssigned": "2024-01-15T10:40:00Z"
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/
```

### 5. delete(roleId: string): Promise<ApiResponse>
Belirli bir rolü siler.

**Parametreler:**
- `roleId` (string): Rol ID'si

**Detaylı Örnek:**
```typescript
const deleteRole = await zapi.roles.delete('role_64f8a1b2c3d4e5f6g7h8i9j1');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Rol başarıyla silindi",
  "data": {
    "deleted": {
      "id": "role_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Moderator",
      "slug": "moderator",
      "deletedAt": "2024-01-15T10:45:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. assignRole(userId: string, roleId: string): Promise<ApiResponse>
Kullanıcıya rol atar.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si
- `roleId` (string): Rol ID'si

**Detaylı Örnek:**
```typescript
const assign = await zapi.roles.assignRole('user_64f8a1b2c3d4e5f6g7h8i9j0', 'role_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Rol başarıyla atandı",
  "data": {
    "assignment": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "roleId": "role_64f8a1b2c3d4e5f6g7h8i9j0",
      "roleName": "Admin",
      "assignedAt": "2024-01-15T10:45:00Z",
      "assignedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 7. removeRole(userId: string, roleId: string): Promise<ApiResponse>
Kullanıcıdan rol kaldırır.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si
- `roleId` (string): Rol ID'si

**Detaylı Örnek:**
```typescript
const remove = await zapi.roles.removeRole('user_64f8a1b2c3d4e5f6g7h8i9j0', 'role_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Rol başarıyla kaldırıldı",
  "data": {
    "removal": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "roleId": "role_64f8a1b2c3d4e5f6g7h8i9j0",
      "roleName": "Admin",
      "removedAt": "2024-01-15T10:45:00Z",
      "removedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 8. getStats(options: any = {}): Promise<ApiResponse>
Rol istatistiklerini getirir.

**Parametreler:**
- `options` (any): İstatistik seçenekleri
  - `period` (string): İstatistik periyodu
  - `dateFrom` (string): Başlangıç tarihi
  - `dateTo` (string): Bitiş tarihi

**Detaylı Örnek:**
```typescript
const stats = await zapi.roles.getStats({
  period: 'monthly',
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Rol istatistikleri getirildi",
  "data": {
    "stats": {
      "period": "monthly",
      "dateRange": {
        "from": "2024-01-01",
        "to": "2024-01-31"
      },
      "overview": {
        "totalRoles": 25,
        "activeRoles": 20,
        "inactiveRoles": 5,
        "totalAssignments": 1250,
        "averageAssignments": 50
      },
      "breakdown": {
        "byType": [
          {
            "type": "user",
            "count": 20,
            "assignments": 1000
          },
          {
            "type": "system",
            "count": 5,
            "assignments": 250
          }
        ],
        "byStatus": [
          {
            "status": "active",
            "count": 20,
            "percentage": 80
          },
          {
            "status": "inactive",
            "count": 5,
            "percentage": 20
          }
        ]
      },
      "topRoles": [
        {
          "id": "role_64f8a1b2c3d4e5f6g7h8i9j0",
          "name": "Admin",
          "assignments": 500
        },
        {
          "id": "role_64f8a1b2c3d4e5f6g7h8i9j1",
          "name": "Moderator",
          "assignments": 300
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
  // 1. Rolleri listele
  const roles = await zapi.roles.list({
    limit: 10,
    page: 1,
    status: 'active',
    type: 'user'
  });
  console.log('Toplam rol:', roles.data.pagination.totalItems);
  
  // 2. Yeni rol oluştur
  const create = await zapi.roles.create({
    name: 'Moderator',
    slug: 'moderator',
    type: 'user',
    description: 'Content moderation access',
    permissions: [
      'content.read',
      'content.update',
      'users.read',
      'reports.read'
    ],
    metadata: {
      color: '#00ff00',
      icon: 'moderator',
      level: 50
    }
  });
  const roleId = create.data.role.id;
  console.log('Yeni rol oluşturuldu:', roleId);
  
  // 3. Rol detayını getir
  const role = await zapi.roles.get(roleId);
  console.log('Rol adı:', role.data.role.name);
  console.log('Rol tipi:', role.data.role.type);
  console.log('İzin sayısı:', role.data.role.permissions.length);
  
  // 4. Rol güncelle
  const update = await zapi.roles.update(roleId, {
    name: 'Senior Moderator',
    description: 'Advanced content moderation access',
    permissions: [
      'content.read',
      'content.update',
      'content.delete',
      'users.read',
      'reports.read',
      'reports.update'
    ]
  });
  console.log('Rol güncellendi:', update.data.role.updatedAt);
  
  // 5. Kullanıcıya rol ata
  const assign = await zapi.roles.assignRole('user_64f8a1b2c3d4e5f6g7h8i9j0', roleId);
  console.log('Rol atandı:', assign.data.assignment.assignedAt);
  
  // 6. İstatistikleri getir
  const stats = await zapi.roles.getStats({
    period: 'monthly',
    dateFrom: '2024-01-01',
    dateTo: '2024-01-31'
  });
  console.log('Toplam rol:', stats.data.stats.overview.totalRoles);
  console.log('Aktif rol:', stats.data.stats.overview.activeRoles);
  console.log('Toplam atama:', stats.data.stats.overview.totalAssignments);
  
  // 7. Kullanıcıdan rol kaldır
  const remove = await zapi.roles.removeRole('user_64f8a1b2c3d4e5f6g7h8i9j0', roleId);
  console.log('Rol kaldırıldı:', remove.data.removal.removedAt);
  
  // 8. Rol sil
  const deleteRole = await zapi.roles.delete(roleId);
  console.log('Rol silindi:', deleteRole.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```