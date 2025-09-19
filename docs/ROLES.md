# Roles Endpoint

Rol yönetimi endpoint'leri - Rol oluşturma, güncelleme, silme, kullanıcı atama ve analitik.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const roles = zapi.roles;
```

## Metodlar

### 1. list(options: any)

Rolleri listeler

**Parametreler:**
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await roles.list({
  page: 1,
  limit: 20,
  status: "active",
  type: "user",
  sortBy: "createdAt",
  sortOrder: "desc"
});

if (result.success) {
  console.log('Roller:', result.data);
  result.data.roles.forEach(role => {
    console.log(`- ${role.name} (${role.type}) - ${role.userCount} kullanıcı`);
  });
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
        "id": "role_123",
        "name": "Administrator",
        "description": "Sistem yöneticisi - tam yetki",
        "type": "admin",
        "status": "active",
        "permissions": [
          "users.create",
          "users.read",
          "users.update",
          "users.delete",
          "apps.create",
          "apps.read",
          "apps.update",
          "apps.delete",
          "system.manage",
          "logs.read",
          "backup.create"
        ],
        "userCount": 5,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "createdBy": "system"
      },
      {
        "id": "role_456",
        "name": "Developer",
        "description": "Geliştirici - uygulama yönetimi",
        "type": "user",
        "status": "active",
        "permissions": [
          "apps.create",
          "apps.read",
          "apps.update",
          "functions.create",
          "functions.read",
          "functions.update",
          "functions.execute",
          "logs.read"
        ],
        "userCount": 25,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "createdBy": "admin_123"
      },
      {
        "id": "role_789",
        "name": "Viewer",
        "description": "Görüntüleyici - sadece okuma yetkisi",
        "type": "user",
        "status": "active",
        "permissions": [
          "apps.read",
          "functions.read",
          "logs.read",
          "docs.read"
        ],
        "userCount": 150,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "createdBy": "admin_123"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 8,
      "pages": 1
    },
    "summary": {
      "totalRoles": 8,
      "activeRoles": 7,
      "inactiveRoles": 1,
      "totalUsers": 180,
      "adminRoles": 2,
      "userRoles": 6
    }
  },
  "message": "Roller başarıyla listelendi"
}
```

---

### 2. create(data: any)

Yeni rol oluşturur

**Parametreler:**
- `data: any` - Rol verileri

**Örnek Kullanım:**

```typescript
const result = await roles.create({
  name: "Content Manager",
  description: "İçerik yöneticisi - içerik oluşturma ve düzenleme",
  type: "user",
  permissions: [
    "content.create",
    "content.read",
    "content.update",
    "content.delete",
    "categories.read",
    "tags.read"
  ],
  restrictions: {
    maxContentItems: 1000,
    allowedCategories: ["blog", "news", "faq"],
    canDelete: true,
    canPublish: true
  },
  metadata: {
    department: "content",
    level: "senior",
    createdBy: "admin_123"
  }
});

if (result.success) {
  console.log('Rol oluşturuldu:', result.data);
  const { id, name, permissions } = result.data;
} else {
  console.error('Rol oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "role_101",
    "name": "Content Manager",
    "description": "İçerik yöneticisi - içerik oluşturma ve düzenleme",
    "type": "user",
    "status": "active",
    "permissions": [
      "content.create",
      "content.read",
      "content.update",
      "content.delete",
      "categories.read",
      "tags.read"
    ],
    "restrictions": {
      "maxContentItems": 1000,
      "allowedCategories": ["blog", "news", "faq"],
      "canDelete": true,
      "canPublish": true
    },
    "metadata": {
      "department": "content",
      "level": "senior",
      "createdBy": "admin_123",
      "version": "1.0.0"
    },
    "userCount": 0,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "createdBy": "admin_123"
  },
  "message": "Rol başarıyla oluşturuldu"
}
```

---

### 3. get(roleId: string)

Belirli bir rolü getirir

**Parametreler:**
- `roleId: string` - Rol ID'si

**Örnek Kullanım:**

```typescript
const result = await roles.get("role_123");

if (result.success) {
  console.log('Rol detayları:', result.data);
  const { name, permissions, restrictions, users } = result.data;
} else {
  console.error('Rol getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "role_123",
    "name": "Administrator",
    "description": "Sistem yöneticisi - tam yetki",
    "type": "admin",
    "status": "active",
    "permissions": [
      "users.create",
      "users.read",
      "users.update",
      "users.delete",
      "apps.create",
      "apps.read",
      "apps.update",
      "apps.delete",
      "system.manage",
      "logs.read",
      "backup.create"
    ],
    "restrictions": {
      "maxUsers": null,
      "maxApps": null,
      "allowedDomains": [],
      "canDeleteUsers": true,
      "canModifySystem": true,
      "canAccessLogs": true
    },
    "metadata": {
      "department": "admin",
      "level": "super",
      "createdBy": "system",
      "version": "1.0.0",
      "lastModified": "2024-01-15T10:30:00Z"
    },
    "users": [
      {
        "id": "user_123",
        "email": "admin@zapi.com",
        "firstName": "John",
        "lastName": "Doe",
        "assignedAt": "2024-01-15T10:30:00Z",
        "assignedBy": "system"
      },
      {
        "id": "user_456",
        "email": "admin2@zapi.com",
        "firstName": "Jane",
        "lastName": "Smith",
        "assignedAt": "2024-01-15T10:30:00Z",
        "assignedBy": "user_123"
      }
    ],
    "statistics": {
      "totalUsers": 5,
      "activeUsers": 5,
      "inactiveUsers": 0,
      "lastActivity": "2024-01-15T10:30:00Z",
      "permissionUsage": {
        "users.create": 12,
        "users.read": 150,
        "users.update": 8,
        "users.delete": 2,
        "apps.create": 5,
        "apps.read": 200,
        "apps.update": 15,
        "apps.delete": 1
      }
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "createdBy": "system"
  },
  "message": "Rol başarıyla getirildi"
}
```

---

### 4. update(roleId: string, data: any)

Rolü günceller

**Parametreler:**
- `roleId: string` - Rol ID'si
- `data: any` - Güncellenecek veriler

**Örnek Kullanım:**

```typescript
const result = await roles.update("role_123", {
  name: "Senior Administrator",
  description: "Kıdemli sistem yöneticisi - genişletilmiş yetki",
  permissions: [
    "users.create",
    "users.read",
    "users.update",
    "users.delete",
    "apps.create",
    "apps.read",
    "apps.update",
    "apps.delete",
    "system.manage",
    "logs.read",
    "backup.create",
    "roles.create",
    "roles.update"
  ],
  restrictions: {
    maxUsers: 100,
    maxApps: 50,
    canDeleteUsers: true,
    canModifySystem: true
  }
});

if (result.success) {
  console.log('Rol güncellendi:', result.data);
} else {
  console.error('Rol güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "role_123",
    "name": "Senior Administrator",
    "description": "Kıdemli sistem yöneticisi - genişletilmiş yetki",
    "type": "admin",
    "status": "active",
    "permissions": [
      "users.create",
      "users.read",
      "users.update",
      "users.delete",
      "apps.create",
      "apps.read",
      "apps.update",
      "apps.delete",
      "system.manage",
      "logs.read",
      "backup.create",
      "roles.create",
      "roles.update"
    ],
    "restrictions": {
      "maxUsers": 100,
      "maxApps": 50,
      "canDeleteUsers": true,
      "canModifySystem": true
    },
    "userCount": 5,
    "updatedAt": "2024-01-15T10:30:00Z",
    "updatedBy": "admin_123"
  },
  "message": "Rol başarıyla güncellendi"
}
```

---

### 5. delete(roleId: string)

Rolü siler

**Parametreler:**
- `roleId: string` - Rol ID'si

**Örnek Kullanım:**

```typescript
const result = await roles.delete("role_123");

if (result.success) {
  console.log('Rol silindi:', result.data);
  const { id, deletedAt, affectedUsers } = result.data;
} else {
  console.error('Rol silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "role_123",
    "name": "Administrator",
    "type": "admin",
    "deletedAt": "2024-01-15T10:30:00Z",
    "deletedBy": "admin_456",
    "affectedUsers": [
      {
        "id": "user_123",
        "email": "admin@zapi.com",
        "newRole": "role_789",
        "reassignedAt": "2024-01-15T10:30:00Z"
      },
      {
        "id": "user_456",
        "email": "admin2@zapi.com",
        "newRole": "role_789",
        "reassignedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "statistics": {
      "totalUsers": 5,
      "reassignedUsers": 5,
      "defaultRole": "role_789"
    }
  },
  "message": "Rol başarıyla silindi"
}
```

---

### 6. getUsers(roleId: string, options: any)

Rolün kullanıcılarını listeler

**Parametreler:**
- `roleId: string` - Rol ID'si
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await roles.getUsers("role_123", {
  page: 1,
  limit: 20,
  status: "active",
  sortBy: "assignedAt",
  sortOrder: "desc"
});

if (result.success) {
  console.log('Rol kullanıcıları:', result.data);
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
    "roleId": "role_123",
    "roleName": "Administrator",
    "users": [
      {
        "id": "user_123",
        "email": "admin@zapi.com",
        "firstName": "John",
        "lastName": "Doe",
        "status": "active",
        "assignedAt": "2024-01-15T10:30:00Z",
        "assignedBy": "system",
        "lastActivity": "2024-01-15T10:30:00Z",
        "permissions": [
          "users.create",
          "users.read",
          "users.update",
          "users.delete"
        ]
      },
      {
        "id": "user_456",
        "email": "admin2@zapi.com",
        "firstName": "Jane",
        "lastName": "Smith",
        "status": "active",
        "assignedAt": "2024-01-15T10:30:00Z",
        "assignedBy": "user_123",
        "lastActivity": "2024-01-15T10:25:00Z",
        "permissions": [
          "users.create",
          "users.read",
          "users.update"
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "pages": 1
    },
    "summary": {
      "totalUsers": 5,
      "activeUsers": 5,
      "inactiveUsers": 0,
      "averagePermissions": 8.5
    }
  },
  "message": "Rol kullanıcıları başarıyla listelendi"
}
```

---

### 7. getAvailablePermissions()

Kullanılabilir izinleri getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await roles.getAvailablePermissions();

if (result.success) {
  console.log('Kullanılabilir izinler:', result.data);
  const { permissions, categories, descriptions } = result.data;
} else {
  console.error('İzin listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "permissions": {
      "users": [
        {
          "id": "users.create",
          "name": "Kullanıcı Oluştur",
          "description": "Yeni kullanıcı oluşturma izni",
          "category": "user_management",
          "level": "high",
          "dependencies": ["users.read"]
        },
        {
          "id": "users.read",
          "name": "Kullanıcı Görüntüle",
          "description": "Kullanıcı bilgilerini görüntüleme izni",
          "category": "user_management",
          "level": "low",
          "dependencies": []
        },
        {
          "id": "users.update",
          "name": "Kullanıcı Güncelle",
          "description": "Kullanıcı bilgilerini güncelleme izni",
          "category": "user_management",
          "level": "medium",
          "dependencies": ["users.read"]
        },
        {
          "id": "users.delete",
          "name": "Kullanıcı Sil",
          "description": "Kullanıcı silme izni",
          "category": "user_management",
          "level": "high",
          "dependencies": ["users.read"]
        }
      ],
      "apps": [
        {
          "id": "apps.create",
          "name": "Uygulama Oluştur",
          "description": "Yeni uygulama oluşturma izni",
          "category": "app_management",
          "level": "high",
          "dependencies": ["apps.read"]
        },
        {
          "id": "apps.read",
          "name": "Uygulama Görüntüle",
          "description": "Uygulama bilgilerini görüntüleme izni",
          "category": "app_management",
          "level": "low",
          "dependencies": []
        },
        {
          "id": "apps.update",
          "name": "Uygulama Güncelle",
          "description": "Uygulama bilgilerini güncelleme izni",
          "category": "app_management",
          "level": "medium",
          "dependencies": ["apps.read"]
        },
        {
          "id": "apps.delete",
          "name": "Uygulama Sil",
          "description": "Uygulama silme izni",
          "category": "app_management",
          "level": "high",
          "dependencies": ["apps.read"]
        }
      ],
      "system": [
        {
          "id": "system.manage",
          "name": "Sistem Yönetimi",
          "description": "Sistem ayarlarını yönetme izni",
          "category": "system_management",
          "level": "critical",
          "dependencies": []
        },
        {
          "id": "logs.read",
          "name": "Log Görüntüle",
          "description": "Sistem loglarını görüntüleme izni",
          "category": "system_management",
          "level": "medium",
          "dependencies": []
        },
        {
          "id": "backup.create",
          "name": "Yedek Oluştur",
          "description": "Sistem yedeği oluşturma izni",
          "category": "system_management",
          "level": "high",
          "dependencies": []
        }
      ],
      "content": [
        {
          "id": "content.create",
          "name": "İçerik Oluştur",
          "description": "Yeni içerik oluşturma izni",
          "category": "content_management",
          "level": "medium",
          "dependencies": ["content.read"]
        },
        {
          "id": "content.read",
          "name": "İçerik Görüntüle",
          "description": "İçerik görüntüleme izni",
          "category": "content_management",
          "level": "low",
          "dependencies": []
        },
        {
          "id": "content.update",
          "name": "İçerik Güncelle",
          "description": "İçerik güncelleme izni",
          "category": "content_management",
          "level": "medium",
          "dependencies": ["content.read"]
        },
        {
          "id": "content.delete",
          "name": "İçerik Sil",
          "description": "İçerik silme izni",
          "category": "content_management",
          "level": "high",
          "dependencies": ["content.read"]
        }
      ]
    },
    "categories": [
      {
        "id": "user_management",
        "name": "Kullanıcı Yönetimi",
        "description": "Kullanıcı işlemleri ile ilgili izinler",
        "permissionCount": 4
      },
      {
        "id": "app_management",
        "name": "Uygulama Yönetimi",
        "description": "Uygulama işlemleri ile ilgili izinler",
        "permissionCount": 4
      },
      {
        "id": "system_management",
        "name": "Sistem Yönetimi",
        "description": "Sistem işlemleri ile ilgili izinler",
        "permissionCount": 3
      },
      {
        "id": "content_management",
        "name": "İçerik Yönetimi",
        "description": "İçerik işlemleri ile ilgili izinler",
        "permissionCount": 4
      }
    ],
    "levels": [
      {
        "id": "low",
        "name": "Düşük",
        "description": "Temel okuma izinleri",
        "color": "#28a745"
      },
      {
        "id": "medium",
        "name": "Orta",
        "description": "Güncelleme izinleri",
        "color": "#ffc107"
      },
      {
        "id": "high",
        "name": "Yüksek",
        "description": "Oluşturma ve silme izinleri",
        "color": "#fd7e14"
      },
      {
        "id": "critical",
        "name": "Kritik",
        "description": "Sistem yönetimi izinleri",
        "color": "#dc3545"
      }
    ],
    "totalPermissions": 15,
    "totalCategories": 4,
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Kullanılabilir izinler başarıyla getirildi"
}
```

---

### 8. getAnalytics()

Rol analitiklerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await roles.getAnalytics();

if (result.success) {
  console.log('Rol analitikleri:', result.data);
  const { roleStats, permissionStats, userStats, trends } = result.data;
} else {
  console.error('Analitik hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "roleStats": {
      "totalRoles": 8,
      "activeRoles": 7,
      "inactiveRoles": 1,
      "adminRoles": 2,
      "userRoles": 6,
      "averagePermissionsPerRole": 6.5,
      "mostUsedRole": "role_789",
      "leastUsedRole": "role_101"
    },
    "permissionStats": {
      "totalPermissions": 15,
      "mostGrantedPermission": "apps.read",
      "leastGrantedPermission": "system.manage",
      "permissionDistribution": {
        "users.read": 180,
        "apps.read": 175,
        "content.read": 120,
        "functions.read": 100,
        "logs.read": 80,
        "users.create": 25,
        "apps.create": 20,
        "system.manage": 5
      }
    },
    "userStats": {
      "totalUsers": 180,
      "usersWithRoles": 180,
      "usersWithoutRoles": 0,
      "averageRolesPerUser": 1.2,
      "usersWithMultipleRoles": 15,
      "roleDistribution": {
        "role_789": 150,
        "role_456": 25,
        "role_123": 5
      }
    },
    "trends": {
      "roleGrowth": {
        "last7Days": 1,
        "last30Days": 3,
        "growthRate": 37.5
      },
      "userGrowth": {
        "last7Days": 5,
        "last30Days": 20,
        "growthRate": 12.5
      },
      "permissionUsage": {
        "increase": 15.2,
        "newPermissions": 2,
        "deprecatedPermissions": 0
      }
    },
    "insights": [
      {
        "type": "usage",
        "message": "Viewer rolü en çok kullanılan rol",
        "impact": "medium",
        "recommendation": "Viewer rolünün izinlerini gözden geçirin"
      },
      {
        "type": "security",
        "message": "5 kullanıcı system.manage iznine sahip",
        "impact": "high",
        "recommendation": "Sistem yönetimi izinlerini sınırlayın"
      },
      {
        "type": "efficiency",
        "message": "15 kullanıcı birden fazla role sahip",
        "impact": "low",
        "recommendation": "Rol birleştirme seçeneklerini değerlendirin"
      }
    ],
    "recommendations": [
      {
        "type": "security",
        "priority": "high",
        "title": "Sistem İzinlerini Sınırlayın",
        "description": "system.manage iznine sahip kullanıcı sayısını azaltın",
        "action": "Admin rolleri için daha kısıtlayıcı izinler tanımlayın"
      },
      {
        "type": "efficiency",
        "priority": "medium",
        "title": "Rol Optimizasyonu",
        "description": "Benzer izinlere sahip rolleri birleştirin",
        "action": "Content Manager ve Editor rollerini birleştirin"
      },
      {
        "type": "compliance",
        "priority": "medium",
        "title": "İzin Denetimi",
        "description": "Düzenli izin denetimi yapın",
        "action": "Aylık izin kullanım raporları oluşturun"
      }
    ],
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Rol analitikleri başarıyla getirildi"
}
```

---

## Rol Türleri

| Tür | Açıklama | Yetkiler |
|-----|----------|----------|
| `admin` | Yönetici | Tüm sistem yetkileri |
| `user` | Kullanıcı | Sınırlı yetkiler |
| `system` | Sistem | Sistem rolü |
| `custom` | Özel | Özel tanımlı yetkiler |

## İzin Seviyeleri

| Seviye | Açıklama | Renk |
|--------|----------|------|
| `low` | Düşük | Yeşil |
| `medium` | Orta | Sarı |
| `high` | Yüksek | Turuncu |
| `critical` | Kritik | Kırmızı |

## İzin Kategorileri

| Kategori | Açıklama | İzin Sayısı |
|----------|----------|-------------|
| `user_management` | Kullanıcı Yönetimi | 4 |
| `app_management` | Uygulama Yönetimi | 4 |
| `system_management` | Sistem Yönetimi | 3 |
| `content_management` | İçerik Yönetimi | 4 |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `ROLE_NOT_FOUND` | Rol bulunamadı |
| `ROLE_CREATION_FAILED` | Rol oluşturulamadı |
| `ROLE_UPDATE_FAILED` | Rol güncellenemedi |
| `ROLE_DELETION_FAILED` | Rol silinemedi |
| `INVALID_ROLE_ID` | Geçersiz rol ID'si |
| `INVALID_PERMISSION` | Geçersiz izin |
| `ROLE_ALREADY_EXISTS` | Rol zaten mevcut |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Rol izinlerini dikkatli yönetin
- Kritik izinleri sınırlı tutun
- Düzenli izin denetimi yapın
- Rol değişikliklerini loglayın
- Düzenli olarak güvenlik denetimleri yapın

## Rol Yönetimi

```typescript
// Rol listesi
const rolesList = await roles.list({
  type: "user",
  status: "active"
});

// Rol oluşturma
const newRole = await roles.create({
  name: "Editor",
  permissions: ["content.read", "content.update"],
  type: "user"
});

// Rol detayları
const roleDetails = await roles.get("role_123");

// Rol güncelleme
await roles.update("role_123", {
  permissions: ["content.read", "content.update", "content.create"]
});

// Rol silme
await roles.delete("role_123");

// Rol kullanıcıları
const roleUsers = await roles.getUsers("role_123");

// Kullanılabilir izinler
const permissions = await roles.getAvailablePermissions();

// Rol analitikleri
const analytics = await roles.getAnalytics();
```

## İzin Yönetimi

```typescript
// Kullanılabilir izinler
const permissions = await roles.getAvailablePermissions();

// Kategori bazlı izinler
const userPermissions = permissions.data.permissions.users;
userPermissions.forEach(permission => {
  console.log(`${permission.name}: ${permission.description}`);
});

// İzin seviyeleri
const levels = permissions.data.levels;
levels.forEach(level => {
  console.log(`${level.name}: ${level.description}`);
});

// İzin bağımlılıkları
userPermissions.forEach(permission => {
  if (permission.dependencies.length > 0) {
    console.log(`${permission.name} bağımlılıkları:`, permission.dependencies);
  }
});
```

## Rol Analizi

```typescript
// Rol analitikleri
const analytics = await roles.getAnalytics();

// En çok kullanılan rol
const mostUsedRole = analytics.data.roleStats.mostUsedRole;
console.log('En popüler rol:', mostUsedRole);

// İzin dağılımı
const permissionDist = analytics.data.permissionStats.permissionDistribution;
Object.entries(permissionDist).forEach(([permission, count]) => {
  console.log(`${permission}: ${count} kullanıcı`);
});

// Trend analizi
const trends = analytics.data.trends;
console.log('Rol büyümesi:', trends.roleGrowth.growthRate + '%');
console.log('Kullanıcı büyümesi:', trends.userGrowth.growthRate + '%');
```

## Güvenlik Önerileri

```typescript
// Güvenlik önerileri
const analytics = await roles.getAnalytics();
const recommendations = analytics.data.recommendations;

recommendations.forEach(rec => {
  if (rec.priority === 'high') {
    console.warn(`Yüksek öncelik: ${rec.title}`);
    console.log(`Açıklama: ${rec.description}`);
    console.log(`Eylem: ${rec.action}`);
  }
});

// Güvenlik içgörüleri
const insights = analytics.data.insights;
const securityInsights = insights.filter(insight => insight.type === 'security');
securityInsights.forEach(insight => {
  console.log(`Güvenlik: ${insight.message}`);
});
```
