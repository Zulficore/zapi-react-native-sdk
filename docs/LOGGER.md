# Logger Endpoint - 2 Metod

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
const logs = await zapi.logger.list({
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

### 2. getStats(options: any = {}): Promise<ApiResponse>
Log istatistiklerini getirir.

**Parametreler:**
- `options` (any): İstatistik seçenekleri
  - `period` (string): İstatistik periyodu
  - `dateFrom` (string): Başlangıç tarihi
  - `dateTo` (string): Bitiş tarihi
  - `groupBy` (string): Gruplama

**Detaylı Örnek:**
```typescript
const stats = await zapi.logger.getStats({
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

## Tam Örnek Kullanım

```typescript
import { ZAPI } from 'zapi-react-native-sdk';

const zapi = new ZAPI('your-api-key', 'your-app-id', 'https://api.zapi.com');

try {
  // 1. Logları listele
  const logs = await zapi.logger.list({
    limit: 10,
    page: 1,
    level: 'error',
    source: 'api',
    dateFrom: '2024-01-15',
    dateTo: '2024-01-15'
  });
  console.log('Toplam log:', logs.data.pagination.totalItems);
  console.log('Log sayısı:', logs.data.logs.length);
  
  // 2. Log istatistiklerini getir
  const stats = await zapi.logger.getStats({
    period: 'daily',
    dateFrom: '2024-01-15',
    dateTo: '2024-01-15',
    groupBy: 'level'
  });
  console.log('Toplam log:', stats.data.stats.overview.totalLogs);
  console.log('Hata oranı:', stats.data.stats.overview.errorRate);
  console.log('Hata trendi:', stats.data.stats.trends.errorTrend);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
