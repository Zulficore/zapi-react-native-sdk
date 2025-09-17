# Admin Endpoint - 15 Metod

Yönetici işlemleri için kullanılan endpoint.

## Metodlar

### 1. getStats(): Promise<ApiResponse>
Sistem istatistiklerini getirir.

**Detaylı Örnek:**
```typescript
const stats = await zapi.admin.getStats();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Sistem istatistikleri getirildi",
  "data": {
    "stats": {
      "overview": {
        "totalUsers": 1250,
        "activeUsers": 1180,
        "totalApps": 45,
        "activeApps": 42,
        "totalRequests": 125000,
        "totalRevenue": 12500.00
      },
      "users": {
        "newUsersToday": 12,
        "newUsersThisWeek": 85,
        "newUsersThisMonth": 320,
        "activeUsersToday": 450,
        "activeUsersThisWeek": 850,
        "activeUsersThisMonth": 1180
      },
      "apps": {
        "newAppsToday": 2,
        "newAppsThisWeek": 8,
        "newAppsThisMonth": 25,
        "activeAppsToday": 35,
        "activeAppsThisWeek": 40,
        "activeAppsThisMonth": 42
      },
      "requests": {
        "requestsToday": 2500,
        "requestsThisWeek": 17500,
        "requestsThisMonth": 75000,
        "averageResponseTime": "245ms",
        "errorRate": 0.8
      },
      "revenue": {
        "revenueToday": 125.00,
        "revenueThisWeek": 875.00,
        "revenueThisMonth": 3750.00,
        "averageRevenuePerUser": 10.00,
        "churnRate": 5.6
      }
    }
  }
}
*/
```

### 2. getQueueStats(): Promise<ApiResponse>
Kuyruk istatistiklerini getirir.

**Detaylı Örnek:**
```typescript
const queueStats = await zapi.admin.getQueueStats();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kuyruk istatistikleri getirildi",
  "data": {
    "queueStats": {
      "overview": {
        "totalJobs": 1250,
        "pendingJobs": 45,
        "processingJobs": 8,
        "completedJobs": 1185,
        "failedJobs": 12
      },
      "byType": [
        {
          "type": "email",
          "pending": 20,
          "processing": 3,
          "completed": 500,
          "failed": 5
        },
        {
          "type": "sms",
          "pending": 15,
          "processing": 2,
          "completed": 300,
          "failed": 3
        },
        {
          "type": "webhook",
          "pending": 10,
          "processing": 3,
          "completed": 385,
          "failed": 4
        }
      ],
      "performance": {
        "averageProcessingTime": "3.2 seconds",
        "throughput": "125 jobs/hour",
        "successRate": 99.0,
        "failureRate": 1.0
      }
    }
  }
}
*/
```

### 3. pauseQueue(): Promise<ApiResponse>
Kuyruğu duraklatır.

**Detaylı Örnek:**
```typescript
const pauseQueue = await zapi.admin.pauseQueue();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kuyruk duraklatıldı",
  "data": {
    "queue": {
      "status": "paused",
      "pausedAt": "2024-01-15T10:40:00Z",
      "pausedBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 4. resumeQueue(): Promise<ApiResponse>
Kuyruğu devam ettirir.

**Detaylı Örnek:**
```typescript
const resumeQueue = await zapi.admin.resumeQueue();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kuyruk devam ettirildi",
  "data": {
    "queue": {
      "status": "running",
      "resumedAt": "2024-01-15T10:40:00Z",
      "resumedBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 5. cleanQueue(type: string = 'completed'): Promise<ApiResponse>
Kuyruğu temizler.

**Parametreler:**
- `type` (string): Temizlenecek kuyruk tipi ('completed', 'failed', 'all')

**Detaylı Örnek:**
```typescript
const cleanQueue = await zapi.admin.cleanQueue('completed');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kuyruk temizlendi",
  "data": {
    "cleanup": {
      "type": "completed",
      "cleanedJobs": 1185,
      "cleanedAt": "2024-01-15T10:40:00Z",
      "cleanedBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. getCronStatus(): Promise<ApiResponse>
Cron job durumunu getirir.

**Detaylı Örnek:**
```typescript
const cronStatus = await zapi.admin.getCronStatus();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Cron job durumu getirildi",
  "data": {
    "cron": {
      "status": "running",
      "lastRun": "2024-01-15T10:30:00Z",
      "nextRun": "2024-01-15T11:30:00Z",
      "jobs": [
        {
          "name": "daily_cleanup",
          "schedule": "0 2 * * *",
          "lastRun": "2024-01-15T02:00:00Z",
          "nextRun": "2024-01-16T02:00:00Z",
          "status": "completed"
        },
        {
          "name": "hourly_backup",
          "schedule": "0 * * * *",
          "lastRun": "2024-01-15T10:00:00Z",
          "nextRun": "2024-01-15T11:00:00Z",
          "status": "completed"
        }
      ]
    }
  }
}
*/
```

### 7. startCron(): Promise<ApiResponse>
Cron job'ları başlatır.

**Detaylı Örnek:**
```typescript
const startCron = await zapi.admin.startCron();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Cron job'lar başlatıldı",
  "data": {
    "cron": {
      "status": "running",
      "startedAt": "2024-01-15T10:40:00Z",
      "startedBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 8. stopCron(): Promise<ApiResponse>
Cron job'ları durdurur.

**Detaylı Örnek:**
```typescript
const stopCron = await zapi.admin.stopCron();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Cron job'lar durduruldu",
  "data": {
    "cron": {
      "status": "stopped",
      "stoppedAt": "2024-01-15T10:40:00Z",
      "stoppedBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 9. triggerDailyReset(): Promise<ApiResponse>
Günlük sıfırlama işlemini tetikler.

**Detaylı Örnek:**
```typescript
const triggerDailyReset = await zapi.admin.triggerDailyReset();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Günlük sıfırlama tetiklendi",
  "data": {
    "reset": {
      "type": "daily",
      "triggeredAt": "2024-01-15T10:40:00Z",
      "triggeredBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0",
      "estimatedDuration": "5 minutes"
    }
  }
}
*/
```

### 10. getSystemInfo(): Promise<ApiResponse>
Sistem bilgilerini getirir.

**Detaylı Örnek:**
```typescript
const systemInfo = await zapi.admin.getSystemInfo();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Sistem bilgileri getirildi",
  "data": {
    "system": {
      "version": "1.0.0",
      "environment": "production",
      "uptime": "15 days, 8 hours, 32 minutes",
      "server": {
        "hostname": "api-server-01",
        "ip": "192.168.1.100",
        "port": 3000,
        "protocol": "https"
      },
      "database": {
        "type": "MySQL",
        "version": "8.0.32",
        "status": "connected",
        "connections": 12
      },
      "cache": {
        "type": "Redis",
        "version": "7.0.8",
        "status": "connected",
        "memory": "256MB"
      },
      "storage": {
        "type": "AWS S3",
        "region": "eu-west-1",
        "status": "connected",
        "usage": "2.5TB"
      }
    }
  }
}
*/
```

### 11. clearCache(pattern: string = '*'): Promise<ApiResponse>
Cache'i temizler.

**Parametreler:**
- `pattern` (string): Temizlenecek cache pattern'i

**Detaylı Örnek:**
```typescript
const clearCache = await zapi.admin.clearCache('user:*');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Cache temizlendi",
  "data": {
    "cache": {
      "pattern": "user:*",
      "clearedKeys": 1250,
      "clearedAt": "2024-01-15T10:40:00Z",
      "clearedBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 12. triggerMonthlyReset(): Promise<ApiResponse>
Aylık sıfırlama işlemini tetikler.

**Detaylı Örnek:**
```typescript
const triggerMonthlyReset = await zapi.admin.triggerMonthlyReset();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Aylık sıfırlama tetiklendi",
  "data": {
    "reset": {
      "type": "monthly",
      "triggeredAt": "2024-01-15T10:40:00Z",
      "triggeredBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0",
      "estimatedDuration": "30 minutes"
    }
  }
}
*/
```

### 13. getBackup(key: string): Promise<ApiResponse>
Yedek bilgilerini getirir.

**Parametreler:**
- `key` (string): Yedek anahtarı

**Detaylı Örnek:**
```typescript
const getBackup = await zapi.admin.getBackup('daily_backup_2024_01_15');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yedek bilgileri getirildi",
  "data": {
    "backup": {
      "key": "daily_backup_2024_01_15",
      "name": "Daily Backup 2024-01-15",
      "type": "full",
      "status": "completed",
      "size": "2.5GB",
      "location": "s3://zapi-backups/daily/2024-01-15/",
      "createdAt": "2024-01-15T02:00:00Z",
      "completedAt": "2024-01-15T02:15:00Z",
      "expiresAt": "2024-02-14T02:00:00Z"
    }
  }
}
*/
```

### 14. getRestore(key: string, backup?: string, tables?: string): Promise<ApiResponse>
Geri yükleme işlemini başlatır.

**Parametreler:**
- `key` (string): Yedek anahtarı
- `backup` (string, opsiyonel): Yedek dosyası
- `tables` (string, opsiyonel): Geri yüklenecek tablolar

**Detaylı Örnek:**
```typescript
const getRestore = await zapi.admin.getRestore(
  'daily_backup_2024_01_15',
  'database.sql',
  'users,apps,subscriptions'
);

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Geri yükleme başlatıldı",
  "data": {
    "restore": {
      "key": "daily_backup_2024_01_15",
      "backup": "database.sql",
      "tables": "users,apps,subscriptions",
      "status": "in_progress",
      "startedAt": "2024-01-15T10:40:00Z",
      "startedBy": "admin_user_64f8a1b2c3d4e5f6g7h8i9j0",
      "estimatedDuration": "15 minutes"
    }
  }
}
*/
```

### 15. getMetadata(path: string): Promise<ApiResponse>
Metadata bilgilerini getirir.

**Parametreler:**
- `path` (string): Metadata path'i

**Detaylı Örnek:**
```typescript
const metadata = await zapi.admin.getMetadata('system_config');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata getirildi",
  "data": {
    "metadata": {
      "path": "system_config",
      "value": {
        "maintenanceMode": false,
        "debugMode": false,
        "logLevel": "info",
        "rateLimiting": true,
        "caching": true
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
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
  // 1. Sistem istatistiklerini getir
  const stats = await zapi.admin.getStats();
  console.log('Toplam kullanıcı:', stats.data.stats.overview.totalUsers);
  console.log('Toplam gelir:', stats.data.stats.overview.totalRevenue);
  
  // 2. Kuyruk istatistiklerini getir
  const queueStats = await zapi.admin.getQueueStats();
  console.log('Toplam iş:', queueStats.data.queueStats.overview.totalJobs);
  console.log('Bekleyen iş:', queueStats.data.queueStats.overview.pendingJobs);
  
  // 3. Kuyruğu duraklat
  const pauseQueue = await zapi.admin.pauseQueue();
  console.log('Kuyruk duraklatıldı:', pauseQueue.data.queue.pausedAt);
  
  // 4. Kuyruğu devam ettir
  const resumeQueue = await zapi.admin.resumeQueue();
  console.log('Kuyruk devam ettirildi:', resumeQueue.data.queue.resumedAt);
  
  // 5. Kuyruğu temizle
  const cleanQueue = await zapi.admin.cleanQueue('completed');
  console.log('Temizlenen iş:', cleanQueue.data.cleanup.cleanedJobs);
  
  // 6. Cron durumunu getir
  const cronStatus = await zapi.admin.getCronStatus();
  console.log('Cron durumu:', cronStatus.data.cron.status);
  console.log('Son çalışma:', cronStatus.data.cron.lastRun);
  
  // 7. Cron'u başlat
  const startCron = await zapi.admin.startCron();
  console.log('Cron başlatıldı:', startCron.data.cron.startedAt);
  
  // 8. Cron'u durdur
  const stopCron = await zapi.admin.stopCron();
  console.log('Cron durduruldu:', stopCron.data.cron.stoppedAt);
  
  // 9. Günlük sıfırlama tetikle
  const triggerDailyReset = await zapi.admin.triggerDailyReset();
  console.log('Günlük sıfırlama:', triggerDailyReset.data.reset.triggeredAt);
  
  // 10. Sistem bilgilerini getir
  const systemInfo = await zapi.admin.getSystemInfo();
  console.log('Sistem versiyonu:', systemInfo.data.system.version);
  console.log('Çalışma süresi:', systemInfo.data.system.uptime);
  
  // 11. Cache temizle
  const clearCache = await zapi.admin.clearCache('user:*');
  console.log('Temizlenen cache:', clearCache.data.cache.clearedKeys);
  
  // 12. Aylık sıfırlama tetikle
  const triggerMonthlyReset = await zapi.admin.triggerMonthlyReset();
  console.log('Aylık sıfırlama:', triggerMonthlyReset.data.reset.triggeredAt);
  
  // 13. Yedek bilgilerini getir
  const getBackup = await zapi.admin.getBackup('daily_backup_2024_01_15');
  console.log('Yedek boyutu:', getBackup.data.backup.size);
  console.log('Yedek durumu:', getBackup.data.backup.status);
  
  // 14. Geri yükleme başlat
  const getRestore = await zapi.admin.getRestore(
    'daily_backup_2024_01_15',
    'database.sql',
    'users,apps'
  );
  console.log('Geri yükleme başlatıldı:', getRestore.data.restore.startedAt);
  
  // 15. Metadata getir
  const metadata = await zapi.admin.getMetadata('system_config');
  console.log('Bakım modu:', metadata.data.metadata.value.maintenanceMode);
  console.log('Debug modu:', metadata.data.metadata.value.debugMode);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
