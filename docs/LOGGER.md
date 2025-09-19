# Logger Endpoint

Log kaydetme endpoint'leri - Logger bilgileri ve istatistikleri.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const logger = zapi.logger;
```

## Metodlar

### 1. get()

Logger bilgilerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await logger.get();

if (result.success) {
  console.log('Logger bilgileri:', result.data);
  const { status, configuration, handlers } = result.data;
} else {
  console.error('Logger bilgi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "active",
    "configuration": {
      "level": "info",
      "format": "json",
      "timestamp": true,
      "source": true,
      "context": true,
      "maxFileSize": "10MB",
      "maxFiles": 5,
      "compression": "gzip",
      "encryption": "AES-256"
    },
    "handlers": [
      {
        "name": "console",
        "type": "console",
        "level": "debug",
        "enabled": true,
        "format": "colored"
      },
      {
        "name": "file",
        "type": "file",
        "level": "info",
        "enabled": true,
        "path": "/var/log/zapi/app.log",
        "rotation": "daily",
        "maxSize": "10MB"
      },
      {
        "name": "database",
        "type": "database",
        "level": "warning",
        "enabled": true,
        "table": "application_logs",
        "batchSize": 100
      },
      {
        "name": "remote",
        "type": "http",
        "level": "error",
        "enabled": true,
        "url": "https://logs.zapi.com/api/logs",
        "timeout": 5000,
        "retries": 3
      }
    ],
    "filters": [
      {
        "name": "sensitive_data",
        "pattern": "password|token|secret",
        "replacement": "[REDACTED]",
        "enabled": true
      },
      {
        "name": "ip_addresses",
        "pattern": "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b",
        "replacement": "[IP_ADDRESS]",
        "enabled": false
      }
    ],
    "performance": {
      "averageLogTime": 2.5,
      "totalLogs": 125000,
      "logsPerSecond": 15,
      "bufferSize": 1000,
      "flushInterval": 5000
    },
    "features": {
      "structuredLogging": true,
      "correlationId": true,
      "userContext": true,
      "requestTracing": true,
      "performanceMetrics": true
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Logger bilgileri başarıyla getirildi"
}
```

---

### 2. getStats()

Logger istatistiklerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await logger.getStats();

if (result.success) {
  console.log('Logger istatistikleri:', result.data);
  const { totalLogs, levelStats, handlerStats, performance } = result.data;
} else {
  console.error('Logger istatistik hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "totalLogs": 125000,
    "timeRange": {
      "start": "2024-01-15T00:00:00Z",
      "end": "2024-01-15T23:59:59Z",
      "duration": "24 hours"
    },
    "levelStats": {
      "error": {
        "count": 5000,
        "percentage": 4.0,
        "averageTime": 3.2,
        "trend": "decreasing"
      },
      "warning": {
        "count": 15000,
        "percentage": 12.0,
        "averageTime": 2.8,
        "trend": "stable"
      },
      "info": {
        "count": 100000,
        "percentage": 80.0,
        "averageTime": 2.1,
        "trend": "increasing"
      },
      "debug": {
        "count": 5000,
        "percentage": 4.0,
        "averageTime": 1.9,
        "trend": "stable"
      }
    },
    "handlerStats": {
      "console": {
        "enabled": true,
        "logsProcessed": 125000,
        "averageTime": 0.5,
        "errors": 0,
        "successRate": 100.0
      },
      "file": {
        "enabled": true,
        "logsProcessed": 120000,
        "averageTime": 2.1,
        "errors": 5,
        "successRate": 99.996,
        "fileSize": "45.2 MB",
        "rotationCount": 3
      },
      "database": {
        "enabled": true,
        "logsProcessed": 20000,
        "averageTime": 8.5,
        "errors": 12,
        "successRate": 99.94,
        "batchCount": 200
      },
      "remote": {
        "enabled": true,
        "logsProcessed": 5000,
        "averageTime": 15.2,
        "errors": 25,
        "successRate": 99.5,
        "retryCount": 75
      }
    },
    "performance": {
      "averageLogTime": 2.5,
      "peakLogTime": 45.2,
      "totalProcessingTime": 312500,
      "throughput": {
        "logsPerSecond": 15.4,
        "peakLogsPerSecond": 125,
        "averageBatchSize": 50
      },
      "memory": {
        "bufferUsage": "2.5 MB",
        "peakBufferUsage": "8.1 MB",
        "gcCount": 25
      }
    },
    "errors": {
      "total": 42,
      "byHandler": {
        "file": 5,
        "database": 12,
        "remote": 25
      },
      "byType": {
        "connection": 15,
        "timeout": 20,
        "permission": 5,
        "format": 2
      },
      "recovery": {
        "autoRecovered": 38,
        "manualIntervention": 4
      }
    },
    "correlation": {
      "correlationIdsGenerated": 8500,
      "averageCorrelationChain": 3.2,
      "maxCorrelationChain": 15
    },
    "context": {
      "userContextLogs": 45000,
      "requestContextLogs": 38000,
      "sessionContextLogs": 42000
    },
    "filters": {
      "sensitiveDataFiltered": 1250,
      "ipAddressesFiltered": 0,
      "customFiltersApplied": 890
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Logger istatistikleri başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "LOGGER_STATS_FAILED",
    "message": "Logger istatistikleri alınamadı"
  }
}
```

---

## Logger Seviyeleri

| Seviye | Açıklama | Kullanım |
|--------|----------|----------|
| `debug` | Debug | Geliştirme bilgileri |
| `info` | Bilgi | Genel bilgiler |
| `warning` | Uyarı | Potansiyel sorunlar |
| `error` | Hata | Kritik sorunlar |

## Logger Handler Türleri

| Tür | Açıklama | Özellikler |
|-----|----------|------------|
| `console` | Konsol çıktısı | Hızlı, renkli |
| `file` | Dosya | Kalıcı, rotasyon |
| `database` | Veritabanı | Yapılandırılmış |
| `http` | HTTP | Uzak servis |

## Logger Formatları

| Format | Açıklama | Özellikler |
|--------|----------|------------|
| `json` | JSON | Yapılandırılmış |
| `text` | Metin | İnsan okunabilir |
| `xml` | XML | Yapılandırılmış |
| `csv` | CSV | Tablo formatı |

## Logger Filtreleri

| Filtre | Açıklama | Örnek |
|--------|----------|-------|
| `sensitive_data` | Hassas veri | `password|token` |
| `ip_addresses` | IP adresleri | `192.168.1.1` |
| `email_addresses` | Email adresleri | `user@example.com` |
| `credit_cards` | Kredi kartı | `4111-1111-1111-1111` |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `LOGGER_NOT_CONFIGURED` | Logger yapılandırılmamış |
| `LOGGER_STATS_FAILED` | Logger istatistikleri alınamadı |
| `HANDLER_ERROR` | Handler hatası |
| `FILTER_ERROR` | Filtre hatası |
| `PERMISSION_ERROR` | İzin hatası |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Hassas verileri filtreleyin
- Log dosyalarını güvenli tutun
- Logger erişimini sınırlayın
- Düzenli olarak log temizliği yapın
- Log verilerini şifreleyin

## Logger Yönetimi

```typescript
// Logger bilgileri
const loggerInfo = await logger.get();

// Handler durumları
const handlers = loggerInfo.data.handlers;
handlers.forEach(handler => {
  console.log(`${handler.name}: ${handler.enabled ? 'Aktif' : 'Pasif'}`);
});

// Logger istatistikleri
const stats = await logger.getStats();
console.log('Toplam log:', stats.data.totalLogs);
console.log('Hata oranı:', stats.data.levelStats.error.percentage + '%');
```

## Logger Performans Analizi

```typescript
// Performans metrikleri
const stats = await logger.getStats();
const performance = stats.data.performance;

console.log('Ortalama log süresi:', performance.averageLogTime + 'ms');
console.log('Zirve log süresi:', performance.peakLogTime + 'ms');
console.log('Log hızı:', performance.throughput.logsPerSecond + '/s');

// Handler performansı
const handlerStats = stats.data.handlerStats;
Object.entries(handlerStats).forEach(([name, stats]) => {
  console.log(`${name} başarı oranı: ${stats.successRate}%`);
});
```

## Logger Hata Analizi

```typescript
// Hata analizi
const stats = await logger.getStats();
const errors = stats.data.errors;

console.log('Toplam hata:', errors.total);
console.log('Otomatik kurtarılan:', errors.recovery.autoRecovered);
console.log('Manuel müdahale:', errors.recovery.manualIntervention);

// Handler hataları
const handlerErrors = errors.byHandler;
Object.entries(handlerErrors).forEach(([handler, count]) => {
  if (count > 0) {
    console.warn(`${handler} handler'da ${count} hata`);
  }
});
```

## Logger Yapılandırması

```typescript
// Logger yapılandırması
const loggerInfo = await logger.get();
const config = loggerInfo.data.configuration;

console.log('Log seviyesi:', config.level);
console.log('Format:', config.format);
console.log('Maksimum dosya boyutu:', config.maxFileSize);
console.log('Sıkıştırma:', config.compression);

// Handler yapılandırması
const handlers = loggerInfo.data.handlers;
handlers.forEach(handler => {
  console.log(`${handler.name}: ${handler.type} (${handler.level})`);
});
```

## Logger Filtreleri

```typescript
// Filtre durumları
const loggerInfo = await logger.get();
const filters = loggerInfo.data.filters;

filters.forEach(filter => {
  console.log(`${filter.name}: ${filter.enabled ? 'Aktif' : 'Pasif'}`);
  console.log(`  Pattern: ${filter.pattern}`);
  console.log(`  Replacement: ${filter.replacement}`);
});

// Filtre istatistikleri
const stats = await logger.getStats();
const filterStats = stats.data.filters;

console.log('Hassas veri filtrelendi:', filterStats.sensitiveDataFiltered);
console.log('IP adresi filtrelendi:', filterStats.ipAddressesFiltered);
console.log('Özel filtreler uygulandı:', filterStats.customFiltersApplied);
```

## Logger Bağlam Bilgileri

```typescript
// Bağlam istatistikleri
const stats = await logger.getStats();
const context = stats.data.context;

console.log('Kullanıcı bağlamı:', context.userContextLogs);
console.log('İstek bağlamı:', context.requestContextLogs);
console.log('Oturum bağlamı:', context.sessionContextLogs);

// Korelasyon bilgileri
const correlation = stats.data.correlation;
console.log('Korelasyon ID oluşturuldu:', correlation.correlationIdsGenerated);
console.log('Ortalama korelasyon zinciri:', correlation.averageCorrelationChain);
```

## Logger Optimizasyonu

```typescript
// Performans optimizasyonu
const stats = await logger.getStats();
const performance = stats.data.performance;

// Buffer kullanımı
const bufferUsage = performance.memory.bufferUsage;
if (bufferUsage.includes('MB') && parseFloat(bufferUsage) > 5) {
  console.warn('Yüksek buffer kullanımı:', bufferUsage);
}

// GC sayısı
const gcCount = performance.memory.gcCount;
if (gcCount > 50) {
  console.warn('Yüksek GC sayısı:', gcCount);
}

// Throughput analizi
const throughput = performance.throughput;
if (throughput.logsPerSecond > 100) {
  console.warn('Yüksek log hızı:', throughput.logsPerSecond + '/s');
}
```
