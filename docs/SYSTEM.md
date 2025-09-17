# System Endpoint - 3 Metod

Sistem yönetimi için kullanılan endpoint.

## Metodlar

### 1. getInfo(): Promise<ApiResponse>
Sistem bilgilerini getirir.

**Detaylı Örnek:**
```typescript
const systemInfo = await zapi.system.getInfo();

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

### 2. getHealth(): Promise<ApiResponse>
Sistem sağlık durumunu getirir.

**Detaylı Örnek:**
```typescript
const health = await zapi.system.getHealth();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Sistem sağlık durumu getirildi",
  "data": {
    "health": {
      "status": "healthy",
      "score": 98,
      "checks": {
        "database": "healthy",
        "cache": "healthy",
        "storage": "healthy",
        "api": "healthy"
      },
      "metrics": {
        "responseTime": "245ms",
        "uptime": "99.9%",
        "errorRate": "0.1%"
      },
      "lastChecked": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. getStatus(): Promise<ApiResponse>
Sistem durumunu getirir.

**Detaylı Örnek:**
```typescript
const status = await zapi.system.getStatus();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Sistem durumu getirildi",
  "data": {
    "status": {
      "overall": "operational",
      "services": {
        "api": "operational",
        "database": "operational",
        "cache": "operational",
        "storage": "operational",
        "queue": "operational"
      },
      "incidents": [],
      "maintenance": {
        "scheduled": false,
        "nextMaintenance": null
      },
      "lastChecked": "2024-01-15T10:40:00Z"
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
  // 1. Sistem bilgilerini getir
  const systemInfo = await zapi.system.getInfo();
  console.log('Sistem versiyonu:', systemInfo.data.system.version);
  console.log('Ortam:', systemInfo.data.system.environment);
  console.log('Çalışma süresi:', systemInfo.data.system.uptime);
  console.log('Sunucu:', systemInfo.data.system.server.hostname);
  console.log('Veritabanı:', systemInfo.data.system.database.type);
  console.log('Cache:', systemInfo.data.system.cache.type);
  console.log('Depolama:', systemInfo.data.system.storage.type);
  
  // 2. Sistem sağlık durumunu getir
  const health = await zapi.system.getHealth();
  console.log('Sağlık durumu:', health.data.health.status);
  console.log('Sağlık skoru:', health.data.health.score);
  console.log('Veritabanı durumu:', health.data.health.checks.database);
  console.log('Cache durumu:', health.data.health.checks.cache);
  console.log('Yanıt süresi:', health.data.health.metrics.responseTime);
  console.log('Çalışma süresi:', health.data.health.metrics.uptime);
  console.log('Hata oranı:', health.data.health.metrics.errorRate);
  
  // 3. Sistem durumunu getir
  const status = await zapi.system.getStatus();
  console.log('Genel durum:', status.data.status.overall);
  console.log('API durumu:', status.data.status.services.api);
  console.log('Veritabanı durumu:', status.data.status.services.database);
  console.log('Cache durumu:', status.data.status.services.cache);
  console.log('Depolama durumu:', status.data.status.services.storage);
  console.log('Kuyruk durumu:', status.data.status.services.queue);
  console.log('Bakım planlandı mı:', status.data.status.maintenance.scheduled);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
