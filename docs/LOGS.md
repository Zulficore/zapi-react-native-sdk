# Logs Endpoint - 5 Metod

Log yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Logları listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `level` (string): Log seviyesi
  - `source` (string): Log kaynağı
  - `dateFrom` (string): Başlangıç tarihi
  - `dateTo` (string): Bitiş tarihi

**Detaylı Örnek:**
```typescript
const logs = await zapi.logs.list({
  limit: 10,
  page: 1,
  level: 'error',
  source: 'api',
  dateFrom: '2024-01-15',
  dateTo: '2024-01-15'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Loglar getirildi",
  "data": {
    "logs": [
      {
        "id": "log_64f8a1b2c3d4e5f6g7h8i9j0",
        "level": "error",
        "message": "Database connection failed",
        "source": "api",
        "timestamp": "2024-01-15T10:40:00Z",
        "context": {
          "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
          "requestId": "req_64f8a1b2c3d4e5f6g7h8i9j0",
          "endpoint": "/api/users",
          "method": "GET",
          "ip": "192.168.1.100"
        },
        "stack": "Error: Connection timeout\n    at Database.connect (/app/db.js:45:12)",
        "metadata": {
          "environment": "production",
          "version": "1.0.0",
          "hostname": "api-server-01"
        }
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

### 2. get(logId: string): Promise<ApiResponse>
Belirli bir logun detaylarını getirir.

**Parametreler:**
- `logId` (string): Log ID'si

**Detaylı Örnek:**
```typescript
const log = await zapi.logs.get('log_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Log detayları getirildi",
  "data": {
    "log": {
      "id": "log_64f8a1b2c3d4e5f6g7h8i9j0",
      "level": "error",
      "message": "Database connection failed",
      "source": "api",
      "timestamp": "2024-01-15T10:40:00Z",
      "context": {
        "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "requestId": "req_64f8a1b2c3d4e5f6g7h8i9j0",
        "endpoint": "/api/users",
        "method": "GET",
        "ip": "192.168.1.100",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      "stack": "Error: Connection timeout\n    at Database.connect (/app/db.js:45:12)",
      "metadata": {
        "environment": "production",
        "version": "1.0.0",
        "hostname": "api-server-01",
        "processId": 12345,
        "threadId": "main"
      },
      "related": [
        {
          "id": "log_64f8a1b2c3d4e5f6g7h8i9j1",
          "level": "warning",
          "message": "Database connection slow",
          "timestamp": "2024-01-15T10:39:30Z"
        }
      ]
    }
  }
}
*/
```

### 3. search(query: any): Promise<ApiResponse>
Loglarda arama yapar.

**Parametreler:**
- `query` (any): Arama sorgusu
  - `q` (string): Arama terimi
  - `level` (string): Log seviyesi
  - `source` (string): Log kaynağı
  - `dateFrom` (string): Başlangıç tarihi
  - `dateTo` (string): Bitiş tarihi
  - `limit` (number): Sonuç sayısı

**Detaylı Örnek:**
```typescript
const search = await zapi.logs.search({
  q: 'database connection',
  level: 'error',
  source: 'api',
  dateFrom: '2024-01-15',
  dateTo: '2024-01-15',
  limit: 20
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Arama tamamlandı",
  "data": {
    "results": [
      {
        "id": "log_64f8a1b2c3d4e5f6g7h8i9j0",
        "level": "error",
        "message": "Database connection failed",
        "source": "api",
        "timestamp": "2024-01-15T10:40:00Z",
        "context": {
          "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
          "requestId": "req_64f8a1b2c3d4e5f6g7h8i9j0",
          "endpoint": "/api/users"
        },
        "score": 0.95
      }
    ],
    "total": 1,
    "query": {
      "q": "database connection",
      "level": "error",
      "source": "api",
      "dateFrom": "2024-01-15",
      "dateTo": "2024-01-15"
    },
    "executionTime": "45ms"
  }
}
*/
```

### 4. getStats(options: any = {}): Promise<ApiResponse>
Log istatistiklerini getirir.

**Parametreler:**
- `options` (any): İstatistik seçenekleri
  - `period` (string): İstatistik periyodu
  - `dateFrom` (string): Başlangıç tarihi
  - `dateTo` (string): Bitiş tarihi
  - `groupBy` (string): Gruplama

**Detaylı Örnek:**
```typescript
const stats = await zapi.logs.getStats({
  period: 'daily',
  dateFrom: '2024-01-15',
  dateTo: '2024-01-15',
  groupBy: 'level'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Log istatistikleri getirildi",
  "data": {
    "stats": {
      "period": "daily",
      "dateRange": {
        "from": "2024-01-15",
        "to": "2024-01-15"
      },
      "overview": {
        "totalLogs": 1250,
        "errorLogs": 45,
        "warningLogs": 120,
        "infoLogs": 1085,
        "errorRate": 3.6
      },
      "breakdown": {
        "byLevel": [
          {
            "level": "info",
            "count": 1085,
            "percentage": 86.8
          },
          {
            "level": "warning",
            "count": 120,
            "percentage": 9.6
          },
          {
            "level": "error",
            "count": 45,
            "percentage": 3.6
          }
        ],
        "bySource": [
          {
            "source": "api",
            "count": 800,
            "percentage": 64.0
          },
          {
            "source": "database",
            "count": 300,
            "percentage": 24.0
          },
          {
            "source": "system",
            "count": 150,
            "percentage": 12.0
          }
        ]
      },
      "trends": {
        "errorTrend": "increasing",
        "warningTrend": "stable",
        "infoTrend": "decreasing"
      }
    }
  }
}
*/
```

### 5. export(options: any = {}): Promise<ApiResponse>
Logları dışa aktarır.

**Parametreler:**
- `options` (any): Dışa aktarma seçenekleri
  - `format` (string): Dosya formatı
  - `level` (string): Log seviyesi
  - `source` (string): Log kaynağı
  - `dateFrom` (string): Başlangıç tarihi
  - `dateTo` (string): Bitiş tarihi

**Detaylı Örnek:**
```typescript
const exportLogs = await zapi.logs.export({
  format: 'json',
  level: 'error',
  source: 'api',
  dateFrom: '2024-01-15',
  dateTo: '2024-01-15'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Loglar dışa aktarıldı",
  "data": {
    "export": {
      "id": "export_64f8a1b2c3d4e5f6g7h8i9j0",
      "format": "json",
      "status": "completed",
      "fileSize": "2.5MB",
      "recordCount": 45,
      "downloadUrl": "https://api.zapi.com/exports/logs/export_64f8a1b2c3d4e5f6g7h8i9j0.json",
      "expiresAt": "2024-01-16T10:45:00Z",
      "createdAt": "2024-01-15T10:45:00Z"
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
  // 1. Logları listele
  const logs = await zapi.logs.list({
    limit: 10,
    level: 'error',
    source: 'api',
    dateFrom: '2024-01-15',
    dateTo: '2024-01-15'
  });
  console.log('Toplam log:', logs.data.pagination.totalItems);
  
  // 2. Log detayını getir
  const log = await zapi.logs.get('log_64f8a1b2c3d4e5f6g7h8i9j0');
  console.log('Log:', log.data.log.message);
  console.log('Seviye:', log.data.log.level);
  
  // 3. Loglarda arama yap
  const search = await zapi.logs.search({
    q: 'database connection',
    level: 'error',
    limit: 20
  });
  console.log('Arama sonucu:', search.data.total);
  
  // 4. Log istatistiklerini getir
  const stats = await zapi.logs.getStats({
    period: 'daily',
    dateFrom: '2024-01-15',
    dateTo: '2024-01-15',
    groupBy: 'level'
  });
  console.log('Toplam log:', stats.data.stats.overview.totalLogs);
  console.log('Hata oranı:', stats.data.stats.overview.errorRate);
  
  // 5. Logları dışa aktar
  const exportLogs = await zapi.logs.export({
    format: 'json',
    level: 'error',
    dateFrom: '2024-01-15',
    dateTo: '2024-01-15'
  });
  console.log('Dışa aktarma:', exportLogs.data.export.downloadUrl);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
