# Logs Endpoint

Log yönetimi endpoint'leri - Log listesi, detayları, temizleme, silme ve istatistikler.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const logs = zapi.logs;
```

## Metodlar

### 1. list(options: any)

Logları listeler

**Parametreler:**
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await logs.list({
  page: 1,
  limit: 50,
  level: "error",
  source: "api",
  startDate: "2024-01-15",
  endDate: "2024-01-16",
  search: "authentication",
  sortBy: "timestamp",
  sortOrder: "desc"
});

if (result.success) {
  console.log('Loglar:', result.data);
  result.data.logs.forEach(log => {
    console.log(`[${log.level}] ${log.message} - ${log.timestamp}`);
  });
} else {
  console.error('Log listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "log_123",
        "level": "error",
        "message": "Authentication failed for user user_123",
        "source": "api",
        "timestamp": "2024-01-15T10:30:00Z",
        "userId": "user_123",
        "sessionId": "session_456",
        "ipAddress": "192.168.1.100",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "endpoint": "/api/auth/login",
        "method": "POST",
        "statusCode": 401,
        "responseTime": 150,
        "details": {
          "error": "Invalid credentials",
          "attempts": 3,
          "lockout": false
        },
        "tags": ["authentication", "security"],
        "context": {
          "appId": "app_123",
          "version": "1.0.0",
          "environment": "production"
        }
      },
      {
        "id": "log_124",
        "level": "info",
        "message": "User login successful",
        "source": "api",
        "timestamp": "2024-01-15T10:31:00Z",
        "userId": "user_456",
        "sessionId": "session_789",
        "ipAddress": "192.168.1.101",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "endpoint": "/api/auth/login",
        "method": "POST",
        "statusCode": 200,
        "responseTime": 120,
        "details": {
          "loginMethod": "email",
          "rememberMe": true
        },
        "tags": ["authentication", "success"],
        "context": {
          "appId": "app_123",
          "version": "1.0.0",
          "environment": "production"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 1250,
      "pages": 25
    },
    "filters": {
      "level": "error",
      "source": "api",
      "startDate": "2024-01-15",
      "endDate": "2024-01-16",
      "search": "authentication"
    },
    "summary": {
      "totalLogs": 1250,
      "errorLogs": 45,
      "warningLogs": 120,
      "infoLogs": 1085,
      "dateRange": "2024-01-15 to 2024-01-16"
    }
  },
  "message": "Loglar başarıyla listelendi"
}
```

---

### 2. get(logId: string)

Belirli bir logu getirir

**Parametreler:**
- `logId: string` - Log ID'si

**Örnek Kullanım:**

```typescript
const result = await logs.get("log_123");

if (result.success) {
  console.log('Log detayları:', result.data);
  const { level, message, timestamp, details, stackTrace } = result.data;
} else {
  console.error('Log getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "log_123",
    "level": "error",
    "message": "Authentication failed for user user_123",
    "source": "api",
    "timestamp": "2024-01-15T10:30:00Z",
    "userId": "user_123",
    "sessionId": "session_456",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "endpoint": "/api/auth/login",
    "method": "POST",
    "statusCode": 401,
    "responseTime": 150,
    "details": {
      "error": "Invalid credentials",
      "attempts": 3,
      "lockout": false,
      "email": "user@example.com",
      "passwordHash": "hashed_password_here"
    },
    "stackTrace": "Error: Invalid credentials\n    at AuthController.login (/app/controllers/AuthController.js:45:12)\n    at async /app/routes/auth.js:12:8",
    "tags": ["authentication", "security", "failed-login"],
    "context": {
      "appId": "app_123",
      "version": "1.0.0",
      "environment": "production",
      "server": "api-server-1",
      "region": "us-east-1"
    },
    "relatedLogs": [
      {
        "id": "log_122",
        "level": "warning",
        "message": "Multiple failed login attempts detected",
        "timestamp": "2024-01-15T10:29:45Z"
      },
      {
        "id": "log_124",
        "level": "info",
        "message": "User account locked due to failed attempts",
        "timestamp": "2024-01-15T10:30:30Z"
      }
    ],
    "metadata": {
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z",
      "retentionDays": 30,
      "archived": false
    }
  },
  "message": "Log başarıyla getirildi"
}
```

---

### 3. cleanup(options: any)

Eski logları temizler

**Parametreler:**
- `options: any` - Temizleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await logs.cleanup({
  olderThan: "30d",
  level: "info",
  source: "api",
  dryRun: false
});

if (result.success) {
  console.log('Log temizleme tamamlandı:', result.data);
  const { deletedCount, freedSpace, deletedLogs } = result.data;
} else {
  console.error('Log temizleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "deletedCount": 1500,
    "freedSpace": {
      "bytes": 536870912,
      "human": "512 MB"
    },
    "deletedLogs": [
      {
        "id": "log_001",
        "level": "info",
        "timestamp": "2024-01-01T10:30:00Z",
        "message": "User login successful"
      },
      {
        "id": "log_002",
        "level": "info",
        "timestamp": "2024-01-01T10:31:00Z",
        "message": "API request processed"
      }
    ],
    "cleanupCriteria": {
      "olderThan": "30d",
      "level": "info",
      "source": "api",
      "dryRun": false
    },
    "cleanupDate": "2024-01-15T10:30:00Z",
    "cleanupDuration": 45,
    "affectedSources": ["api", "database", "cache"],
    "affectedLevels": ["info", "debug"]
  },
  "message": "Log temizleme başarıyla tamamlandı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "CLEANUP_FAILED",
    "message": "Log temizleme başarısız"
  }
}
```

---

### 4. clear()

Tüm logları temizler

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await logs.clear();

if (result.success) {
  console.log('Tüm loglar temizlendi:', result.data);
  const { deletedCount, freedSpace } = result.data;
} else {
  console.error('Log temizleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "deletedCount": 50000,
    "freedSpace": {
      "bytes": 2147483648,
      "human": "2.0 GB"
    },
    "clearedSources": ["api", "database", "cache", "queue", "system"],
    "clearedLevels": ["error", "warning", "info", "debug"],
    "clearDate": "2024-01-15T10:30:00Z",
    "clearDuration": 120,
    "backupCreated": true,
    "backupLocation": "s3://zapi-logs-backup/clear-2024-01-15.tar.gz"
  },
  "message": "Tüm loglar başarıyla temizlendi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "CLEAR_FAILED",
    "message": "Log temizleme başarısız"
  }
}
```

---

### 5. getStats()

Log istatistiklerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await logs.getStats();

if (result.success) {
  console.log('Log istatistikleri:', result.data);
  const { totalLogs, levelStats, sourceStats, timeStats } = result.data;
} else {
  console.error('Log istatistik hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "totalLogs": 125000,
    "storageSize": {
      "bytes": 2147483648,
      "human": "2.0 GB"
    },
    "levelStats": {
      "error": {
        "count": 5000,
        "percentage": 4.0,
        "trend": "decreasing"
      },
      "warning": {
        "count": 15000,
        "percentage": 12.0,
        "trend": "stable"
      },
      "info": {
        "count": 100000,
        "percentage": 80.0,
        "trend": "increasing"
      },
      "debug": {
        "count": 5000,
        "percentage": 4.0,
        "trend": "stable"
      }
    },
    "sourceStats": {
      "api": {
        "count": 80000,
        "percentage": 64.0,
        "averageResponseTime": 150
      },
      "database": {
        "count": 25000,
        "percentage": 20.0,
        "averageQueryTime": 50
      },
      "cache": {
        "count": 15000,
        "percentage": 12.0,
        "hitRate": 95.5
      },
      "system": {
        "count": 5000,
        "percentage": 4.0,
        "uptime": 99.9
      }
    },
    "timeStats": {
      "last24Hours": {
        "count": 5000,
        "errorRate": 2.5,
        "peakHour": "14:00"
      },
      "last7Days": {
        "count": 35000,
        "errorRate": 3.2,
        "peakDay": "Monday"
      },
      "last30Days": {
        "count": 125000,
        "errorRate": 4.0,
        "growth": 15.5
      }
    },
    "topErrors": [
      {
        "message": "Authentication failed",
        "count": 1500,
        "percentage": 30.0
      },
      {
        "message": "Database connection timeout",
        "count": 800,
        "percentage": 16.0
      },
      {
        "message": "Rate limit exceeded",
        "count": 600,
        "percentage": 12.0
      }
    ],
    "performance": {
      "averageLogSize": 1024,
      "logsPerSecond": 25,
      "compressionRatio": 0.7
    },
    "retention": {
      "currentRetention": "30d",
      "oldestLog": "2024-01-01T10:30:00Z",
      "newestLog": "2024-01-15T10:30:00Z"
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Log istatistikleri başarıyla getirildi"
}
```

---

## Log Seviyeleri

| Seviye | Açıklama | Kullanım |
|--------|----------|----------|
| `error` | Hata | Kritik sorunlar |
| `warning` | Uyarı | Potansiyel sorunlar |
| `info` | Bilgi | Genel bilgiler |
| `debug` | Debug | Geliştirme bilgileri |

## Log Kaynakları

| Kaynak | Açıklama | Özellikler |
|--------|----------|------------|
| `api` | API istekleri | HTTP durum kodları |
| `database` | Veritabanı | Sorgu süreleri |
| `cache` | Önbellek | Hit/miss oranları |
| `system` | Sistem | Uptime, bellek |
| `queue` | Kuyruk | İş durumları |

## Log Filtreleri

| Filtre | Açıklama | Örnek |
|--------|----------|-------|
| `level` | Log seviyesi | `error`, `warning` |
| `source` | Log kaynağı | `api`, `database` |
| `startDate` | Başlangıç tarihi | `2024-01-15` |
| `endDate` | Bitiş tarihi | `2024-01-16` |
| `search` | Metin arama | `authentication` |
| `userId` | Kullanıcı ID'si | `user_123` |
| `sessionId` | Oturum ID'si | `session_456` |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `LOG_NOT_FOUND` | Log bulunamadı |
| `CLEANUP_FAILED` | Log temizleme başarısız |
| `CLEAR_FAILED` | Log temizleme başarısız |
| `INVALID_LOG_ID` | Geçersiz log ID'si |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `STORAGE_ERROR` | Depolama hatası |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Log verilerini güvenli bir şekilde saklayın
- Hassas bilgileri loglamayın
- Log erişimini sınırlayın
- Düzenli olarak log temizliği yapın
- Log verilerini şifreleyin

## Log Yönetimi

```typescript
// Log listesi
const logs = await logs.list({
  level: "error",
  source: "api",
  limit: 100
});

// Log detayları
const logDetails = await logs.get("log_123");

// Log temizleme
await logs.cleanup({
  olderThan: "30d",
  level: "info"
});

// Tüm logları temizle
await logs.clear();

// Log istatistikleri
const stats = await logs.getStats();
```

## Log Analizi

```typescript
// Hata oranı analizi
const stats = await logs.getStats();
const errorRate = stats.data.levelStats.error.percentage;
console.log('Hata oranı:', errorRate + '%');

// En çok hata veren kaynak
const sourceStats = stats.data.sourceStats;
const topErrorSource = Object.entries(sourceStats)
  .sort(([,a], [,b]) => b.count - a.count)[0];
console.log('En çok hata:', topErrorSource[0]);

// Zaman bazlı analiz
const timeStats = stats.data.timeStats;
console.log('Son 24 saat:', timeStats.last24Hours.count);
console.log('Zirve saat:', timeStats.last24Hours.peakHour);
```

## Log Temizleme Stratejileri

```typescript
// Eski logları temizle
const cleanup = await logs.cleanup({
  olderThan: "30d",
  level: "info",
  dryRun: true  // Önce test et
});

if (cleanup.success) {
  console.log('Temizlenecek log sayısı:', cleanup.data.deletedCount);
  
  // Gerçek temizleme
  const realCleanup = await logs.cleanup({
    olderThan: "30d",
    level: "info",
    dryRun: false
  });
}

// Seviye bazlı temizleme
await logs.cleanup({
  olderThan: "7d",
  level: "debug"
});

// Kaynak bazlı temizleme
await logs.cleanup({
  olderThan: "14d",
  source: "api"
});
```

## Log İzleme ve Uyarılar

```typescript
// Hata oranı kontrolü
const stats = await logs.getStats();
const errorRate = stats.data.levelStats.error.percentage;

if (errorRate > 5) {
  console.warn('Yüksek hata oranı:', errorRate + '%');
  // Uyarı gönder
}

// En çok hata veren mesajlar
const topErrors = stats.data.topErrors;
topErrors.forEach(error => {
  if (error.count > 100) {
    console.warn(`Çok hata: ${error.message} (${error.count})`);
  }
});

// Performans kontrolü
const performance = stats.data.performance;
if (performance.logsPerSecond > 100) {
  console.warn('Yüksek log hızı:', performance.logsPerSecond);
}
```

## Log Arama ve Filtreleme

```typescript
// Gelişmiş arama
const searchResults = await logs.list({
  search: "authentication failed",
  level: "error",
  startDate: "2024-01-15",
  endDate: "2024-01-16",
  userId: "user_123"
});

// Kullanıcı bazlı loglar
const userLogs = await logs.list({
  userId: "user_123",
  limit: 50
});

// Oturum bazlı loglar
const sessionLogs = await logs.list({
  sessionId: "session_456",
  limit: 100
});

// Endpoint bazlı loglar
const endpointLogs = await logs.list({
  endpoint: "/api/auth/login",
  method: "POST",
  limit: 200
});
```
