# Info Endpoint - 4 Metod

Bilgi yönetimi için kullanılan endpoint.

## Metodlar

### 1. get(): Promise<ApiResponse>
Sistem bilgilerini getirir.

**Detaylı Örnek:**
```typescript
const info = await zapi.info.get();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Sistem bilgileri getirildi",
  "data": {
    "info": {
      "name": "ZAPI",
      "version": "1.0.0",
      "description": "ZAPI - AI Powered API Platform",
      "author": "ZAPI Team",
      "license": "MIT",
      "homepage": "https://zapi.com",
      "repository": "https://github.com/zapi/zapi",
      "documentation": "https://docs.zapi.com",
      "support": "https://support.zapi.com",
      "status": "operational",
      "uptime": "99.9%",
      "lastUpdate": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 2. getVersion(): Promise<ApiResponse>
Versiyon bilgilerini getirir.

**Detaylı Örnek:**
```typescript
const version = await zapi.info.getVersion();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Versiyon bilgileri getirildi",
  "data": {
    "version": {
      "current": "1.0.0",
      "latest": "1.0.1",
      "updateAvailable": true,
      "changelog": "https://github.com/zapi/zapi/releases",
      "releaseDate": "2024-01-15T10:30:00Z",
      "features": [
        "New AI models support",
        "Enhanced security",
        "Performance improvements"
      ]
    }
  }
}
*/
```

### 3. getStatus(): Promise<ApiResponse>
Sistem durumunu getirir.

**Detaylı Örnek:**
```typescript
const status = await zapi.info.getStatus();

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
      "lastChecked": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. getHealth(): Promise<ApiResponse>
Sistem sağlığını getirir.

**Detaylı Örnek:**
```typescript
const health = await zapi.info.getHealth();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Sistem sağlığı getirildi",
  "data": {
    "health": {
      "status": "healthy",
      "score": 98,
      "checks": {
        "database": "healthy",
        "cache": "healthy",
        "storage": "healthy",
        "queue": "healthy",
        "api": "healthy"
      },
      "metrics": {
        "responseTime": "245ms",
        "uptime": "99.9%",
        "errorRate": "0.1%"
      },
      "lastChecked": "2024-01-15T10:30:00Z"
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
  const info = await zapi.info.get();
  console.log('Sistem:', info.data.info.name);
  console.log('Versiyon:', info.data.info.version);
  console.log('Durum:', info.data.info.status);
  
  // 2. Versiyon bilgilerini getir
  const version = await zapi.info.getVersion();
  console.log('Mevcut versiyon:', version.data.version.current);
  console.log('En son versiyon:', version.data.version.latest);
  console.log('Güncelleme mevcut:', version.data.version.updateAvailable);
  
  // 3. Sistem durumunu getir
  const status = await zapi.info.getStatus();
  console.log('Genel durum:', status.data.status.overall);
  console.log('API durumu:', status.data.status.services.api);
  console.log('Veritabanı durumu:', status.data.status.services.database);
  
  // 4. Sistem sağlığını getir
  const health = await zapi.info.getHealth();
  console.log('Sağlık durumu:', health.data.health.status);
  console.log('Sağlık skoru:', health.data.health.score);
  console.log('Yanıt süresi:', health.data.health.metrics.responseTime);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
