# Debug Endpoint - 1 Metod

Debug bilgileri için kullanılan endpoint.

## Metodlar

### 1. getInfo(): Promise<ApiResponse>
Debug bilgilerini getirir.

**Detaylı Örnek:**
```typescript
const debugInfo = await zapi.debug.getInfo();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Debug bilgileri getirildi",
  "data": {
    "debug": {
      "system": {
        "version": "1.0.0",
        "environment": "production",
        "uptime": "15 days, 8 hours, 32 minutes",
        "memory": {
          "used": "256MB",
          "free": "768MB",
          "total": "1GB"
        },
        "cpu": {
          "usage": "45%",
          "cores": 4
        }
      },
      "database": {
        "type": "MySQL",
        "version": "8.0.32",
        "status": "connected",
        "connections": 12,
        "queries": {
          "total": 125000,
          "slow": 25,
          "averageTime": "2.5ms"
        }
      },
      "cache": {
        "type": "Redis",
        "version": "7.0.8",
        "status": "connected",
        "memory": "128MB",
        "keys": 1250,
        "hitRate": "95.5%"
      },
      "api": {
        "requests": {
          "total": 125000,
          "successful": 124500,
          "failed": 500,
          "averageResponseTime": "245ms"
        },
        "endpoints": {
          "mostUsed": "/api/chat",
          "slowest": "/api/images/generate",
          "errorRate": "0.4%"
        }
      },
      "logs": {
        "level": "info",
        "total": 12500,
        "errors": 45,
        "warnings": 120,
        "lastError": "2024-01-15T10:30:00Z"
      },
      "timestamp": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Debug bilgileri alınamadı",
  "error": "DEBUG_INFO_UNAVAILABLE",
  "details": {
    "reason": "Debug mode is disabled"
  }
}
*/
```

## Tam Örnek Kullanım

```typescript
import { ZAPI } from 'zapi-react-native-sdk';

const zapi = new ZAPI('your-api-key', 'your-app-id', 'https://api.zapi.com');

try {
  // Debug bilgilerini getir
  const debugInfo = await zapi.debug.getInfo();
  console.log('Sistem versiyonu:', debugInfo.data.debug.system.version);
  console.log('Çalışma süresi:', debugInfo.data.debug.system.uptime);
  console.log('Bellek kullanımı:', debugInfo.data.debug.system.memory.used);
  console.log('CPU kullanımı:', debugInfo.data.debug.system.cpu.usage);
  console.log('Veritabanı durumu:', debugInfo.data.debug.database.status);
  console.log('Cache durumu:', debugInfo.data.debug.cache.status);
  console.log('Toplam istek:', debugInfo.data.debug.api.requests.total);
  console.log('Ortalama yanıt süresi:', debugInfo.data.debug.api.requests.averageResponseTime);
  console.log('Log seviyesi:', debugInfo.data.debug.logs.level);
  console.log('Toplam log:', debugInfo.data.debug.logs.total);
  console.log('Hata sayısı:', debugInfo.data.debug.logs.errors);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
