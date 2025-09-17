# Backup Endpoint - 4 Metod

Yedekleme yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Yedekleri listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `type` (string): Yedek tipi
  - `status` (string): Yedek durumu

**Detaylı Örnek:**
```typescript
const backups = await zapi.backup.list({
  limit: 10,
  page: 1,
  type: 'full',
  status: 'completed'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yedekler getirildi",
  "data": {
    "backups": [
      {
        "id": "backup_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "Daily Backup 2024-01-15",
        "type": "full",
        "status": "completed",
        "size": "2.5GB",
        "location": "s3://zapi-backups/daily/2024-01-15/",
        "metadata": {
          "database": true,
          "files": true,
          "config": true,
          "tables": 25,
          "records": 125000
        },
        "schedule": {
          "type": "daily",
          "time": "02:00",
          "timezone": "UTC"
        },
        "retention": {
          "days": 30,
          "expiresAt": "2024-02-14T02:00:00Z"
        },
        "createdAt": "2024-01-15T02:00:00Z",
        "completedAt": "2024-01-15T02:15:00Z",
        "createdBy": "system"
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
Yeni yedek oluşturur.

**Parametreler:**
- `data` (any): Yedek verileri
  - `name` (string): Yedek adı
  - `type` (string): Yedek tipi
  - `include` (any): Dahil edilecek veriler
  - `schedule` (any): Zamanlama bilgileri

**Detaylı Örnek:**
```typescript
const create = await zapi.backup.create({
  name: 'Manual Backup 2024-01-15',
  type: 'full',
  include: {
    database: true,
    files: true,
    config: true,
    tables: ['users', 'apps', 'subscriptions']
  },
  schedule: {
    type: 'manual',
    time: 'now'
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yedek başarıyla oluşturuldu",
  "data": {
    "backup": {
      "id": "backup_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Manual Backup 2024-01-15",
      "type": "full",
      "status": "in_progress",
      "size": null,
      "location": null,
      "metadata": {
        "database": true,
        "files": true,
        "config": true,
        "tables": ["users", "apps", "subscriptions"]
      },
      "schedule": {
        "type": "manual",
        "time": "now"
      },
      "retention": {
        "days": 30,
        "expiresAt": "2024-02-14T10:40:00Z"
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "completedAt": null,
      "createdBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 3. get(backupId: string): Promise<ApiResponse>
Belirli bir yedeğin detaylarını getirir.

**Parametreler:**
- `backupId` (string): Yedek ID'si

**Detaylı Örnek:**
```typescript
const backup = await zapi.backup.get('backup_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yedek detayları getirildi",
  "data": {
    "backup": {
      "id": "backup_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Daily Backup 2024-01-15",
      "type": "full",
      "status": "completed",
      "size": "2.5GB",
      "location": "s3://zapi-backups/daily/2024-01-15/",
      "metadata": {
        "database": true,
        "files": true,
        "config": true,
        "tables": 25,
        "records": 125000
      },
      "schedule": {
        "type": "daily",
        "time": "02:00",
        "timezone": "UTC"
      },
      "retention": {
        "days": 30,
        "expiresAt": "2024-02-14T02:00:00Z"
      },
      "files": [
        {
          "name": "database.sql",
          "size": "1.8GB",
          "type": "sql"
        },
        {
          "name": "files.tar.gz",
          "size": "700MB",
          "type": "archive"
        }
      ],
      "createdAt": "2024-01-15T02:00:00Z",
      "completedAt": "2024-01-15T02:15:00Z",
      "createdBy": "system"
    }
  }
}
*/
```

### 4. restore(backupId: string, options: any = {}): Promise<ApiResponse>
Yedekten geri yükleme yapar.

**Parametreler:**
- `backupId` (string): Yedek ID'si
- `options` (any): Geri yükleme seçenekleri
  - `target` (string): Hedef ortam
  - `include` (any): Geri yüklenecek veriler
  - `confirm` (boolean): Onay

**Detaylı Örnek:**
```typescript
const restore = await zapi.backup.restore('backup_64f8a1b2c3d4e5f6g7h8i9j0', {
  target: 'staging',
  include: {
    database: true,
    files: false,
    config: true
  },
  confirm: true
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Geri yükleme başarıyla başlatıldı",
  "data": {
    "restore": {
      "id": "restore_64f8a1b2c3d4e5f6g7h8i9j0",
      "backupId": "backup_64f8a1b2c3d4e5f6g7h8i9j0",
      "target": "staging",
      "status": "in_progress",
      "include": {
        "database": true,
        "files": false,
        "config": true
      },
      "progress": 0,
      "estimatedTime": "15 minutes",
      "startedAt": "2024-01-15T10:45:00Z",
      "completedAt": null
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
  // 1. Yedekleri listele
  const backups = await zapi.backup.list({
    limit: 10,
    status: 'completed'
  });
  console.log('Toplam yedek:', backups.data.pagination.totalItems);
  
  // 2. Yeni yedek oluştur
  const create = await zapi.backup.create({
    name: 'Manual Backup 2024-01-15',
    type: 'full',
    include: {
      database: true,
      files: true,
      config: true
    }
  });
  const backupId = create.data.backup.id;
  console.log('Yeni yedek oluşturuldu:', backupId);
  
  // 3. Yedek detayını getir
  const backup = await zapi.backup.get(backupId);
  console.log('Yedek:', backup.data.backup.name);
  console.log('Durum:', backup.data.backup.status);
  
  // 4. Yedekten geri yükle
  const restore = await zapi.backup.restore(backupId, {
    target: 'staging',
    include: { database: true, files: false },
    confirm: true
  });
  console.log('Geri yükleme başlatıldı:', restore.data.restore.startedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
