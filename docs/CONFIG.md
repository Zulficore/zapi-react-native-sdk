# Config Endpoint - 1 Metod

Konfigürasyon yönetimi için kullanılan endpoint.

## Metodlar

### 1. get(): Promise<ApiResponse>
Konfigürasyon bilgilerini getirir.

**Detaylı Örnek:**
```typescript
const config = await zapi.config.get();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Konfigürasyon bilgileri getirildi",
  "data": {
    "config": {
      "general": {
        "name": "ZAPI",
        "version": "1.0.0",
        "environment": "production",
        "debugMode": false,
        "logLevel": "info",
        "timezone": "Europe/Istanbul",
        "language": "tr"
      },
      "api": {
        "version": "v1",
        "baseUrl": "https://api.zapi.com",
        "rateLimiting": {
          "enabled": true,
          "defaultLimit": 1000,
          "windowMs": 3600000
        },
        "cors": {
          "enabled": true,
          "origins": ["https://app.zapi.com", "https://admin.zapi.com"]
        }
      },
      "features": {
        "aiProvider": {
          "enabled": true,
          "providers": ["openai", "anthropic", "google"]
        },
        "webhooks": {
          "enabled": true,
          "timeout": 30000,
          "retryAttempts": 3
        },
        "realtime": {
          "enabled": true,
          "type": "socket.io",
          "port": 3001
        }
      },
      "security": {
        "sslEnabled": true,
        "firewallStatus": "active",
        "rateLimiting": true,
        "corsEnabled": true
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
  // Konfigürasyon bilgilerini getir
  const config = await zapi.config.get();
  console.log('Sistem:', config.data.config.general.name);
  console.log('Versiyon:', config.data.config.general.version);
  console.log('Ortam:', config.data.config.general.environment);
  console.log('API Versiyonu:', config.data.config.api.version);
  console.log('Base URL:', config.data.config.api.baseUrl);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
