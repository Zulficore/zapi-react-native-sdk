# Config Endpoint

Sistem konfigürasyonu endpoint'i - Genel ayarları ve konfigürasyon bilgilerini yönetir.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const config = zapi.config;
```

## Metodlar

### 1. get()

Sistem konfigürasyon bilgilerini getirir

**Parametreler:**
- Yok

**Örnek Kullanım:**

```typescript
// Sistem konfigürasyonunu getir
const result = await config.get();

if (result.success) {
  console.log('Konfigürasyon bilgileri:', result.data);
  
  // Ana konfigürasyon ayarları
  console.log('Sistem adı:', result.data.systemName);
  console.log('Versiyon:', result.data.version);
  console.log('Çevre:', result.data.environment);
  
  // API ayarları
  console.log('API URL:', result.data.api.baseUrl);
  console.log('Rate limit:', result.data.api.rateLimit);
  
  // Veritabanı ayarları
  console.log('DB host:', result.data.database.host);
  console.log('DB port:', result.data.database.port);
  
  // Cache ayarları
  console.log('Cache süresi:', result.data.cache.ttl);
  console.log('Cache driver:', result.data.cache.driver);
  
  // Email ayarları
  console.log('SMTP host:', result.data.email.smtp.host);
  console.log('Email gönderici:', result.data.email.from);
  
  // SMS ayarları
  console.log('SMS provider:', result.data.sms.provider);
  console.log('SMS API key:', result.data.sms.apiKey ? 'Ayarlandı' : 'Ayarlandı');
  
  // OAuth ayarları
  console.log('Google OAuth:', result.data.oauth.google.clientId ? 'Aktif' : 'Pasif');
  console.log('Apple OAuth:', result.data.oauth.apple.clientId ? 'Aktif' : 'Pasif');
  
  // AI ayarları
  console.log('OpenAI API key:', result.data.ai.openai.apiKey ? 'Ayarlandı' : 'Ayarlandı');
  console.log('Model varsayılan:', result.data.ai.defaultModel);
  
  // Güvenlik ayarları
  console.log('JWT süresi:', result.data.security.jwt.expiresIn);
  console.log('Şifreleme:', result.data.security.encryption.algorithm);
  
  // Dosya ayarları
  console.log('Max dosya boyutu:', result.data.files.maxSize);
  console.log('İzin verilen formatlar:', result.data.files.allowedTypes);
  
  // Webhook ayarları
  console.log('Webhook timeout:', result.data.webhooks.timeout);
  console.log('Retry sayısı:', result.data.webhooks.retryCount);
  
  // Log ayarları
  console.log('Log seviyesi:', result.data.logging.level);
  console.log('Log dosyası:', result.data.logging.file);
  
} else {
  console.error('Konfigürasyon getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "systemName": "ZAPI Platform",
    "version": "2.1.0",
    "environment": "production",
    "debug": false,
    "timezone": "Europe/Istanbul",
    "locale": "tr",
    "api": {
      "baseUrl": "https://api.zapi.com",
      "version": "v1",
      "rateLimit": {
        "requests": 1000,
        "window": 3600
      },
      "timeout": 30,
      "cors": {
        "enabled": true,
        "origins": ["https://app.zapi.com", "https://admin.zapi.com"]
      }
    },
    "database": {
      "host": "localhost",
      "port": 3306,
      "name": "zapi_db",
      "charset": "utf8mb4",
      "timezone": "+00:00",
      "pool": {
        "min": 2,
        "max": 10
      }
    },
    "cache": {
      "driver": "redis",
      "host": "localhost",
      "port": 6379,
      "ttl": 3600,
      "prefix": "zapi:",
      "serialize": true
    },
    "email": {
      "driver": "smtp",
      "smtp": {
        "host": "smtp.gmail.com",
        "port": 587,
        "secure": false,
        "auth": {
          "user": "noreply@zapi.com",
          "pass": "encrypted_password"
        }
      },
      "from": {
        "name": "ZAPI Platform",
        "email": "noreply@zapi.com"
      },
      "templates": {
        "path": "/templates/email",
        "cache": true
      }
    },
    "sms": {
      "provider": "twilio",
      "apiKey": "encrypted_api_key",
      "apiSecret": "encrypted_api_secret",
      "from": "+1234567890",
      "webhook": "https://api.zapi.com/webhooks/sms"
    },
    "oauth": {
      "google": {
        "clientId": "google_client_id",
        "clientSecret": "encrypted_client_secret",
        "redirectUri": "https://api.zapi.com/auth/google/callback"
      },
      "apple": {
        "clientId": "apple_client_id",
        "teamId": "apple_team_id",
        "keyId": "apple_key_id",
        "privateKey": "encrypted_private_key",
        "redirectUri": "https://api.zapi.com/auth/apple/callback"
      },
      "facebook": {
        "clientId": "facebook_client_id",
        "clientSecret": "encrypted_client_secret",
        "redirectUri": "https://api.zapi.com/auth/facebook/callback"
      }
    },
    "ai": {
      "openai": {
        "apiKey": "encrypted_api_key",
        "organization": "org-xyz",
        "baseUrl": "https://api.openai.com/v1"
      },
      "anthropic": {
        "apiKey": "encrypted_api_key",
        "baseUrl": "https://api.anthropic.com/v1"
      },
      "defaultModel": "gpt-4",
      "maxTokens": 4096,
      "temperature": 0.7,
      "timeout": 60
    },
    "security": {
      "jwt": {
        "secret": "encrypted_jwt_secret",
        "expiresIn": "24h",
        "refreshExpiresIn": "7d",
        "algorithm": "HS256"
      },
      "encryption": {
        "algorithm": "aes-256-gcm",
        "key": "encrypted_encryption_key"
      },
      "bcrypt": {
        "rounds": 12
      },
      "rateLimit": {
        "login": {
          "attempts": 5,
          "window": 900
        },
        "api": {
          "attempts": 1000,
          "window": 3600
        }
      }
    },
    "files": {
      "storage": "local",
      "path": "/storage/uploads",
      "maxSize": "10MB",
      "allowedTypes": ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx"],
      "compress": true,
      "watermark": {
        "enabled": false,
        "text": "ZAPI",
        "position": "bottom-right"
      }
    },
    "webhooks": {
      "timeout": 30,
      "retryCount": 3,
      "retryDelay": 1000,
      "signature": {
        "algorithm": "sha256",
        "header": "X-ZAPI-Signature"
      }
    },
    "logging": {
      "level": "info",
      "file": "/logs/zapi.log",
      "maxSize": "10MB",
      "maxFiles": 5,
      "format": "combined",
      "include": ["request", "response", "error", "performance"]
    },
    "monitoring": {
      "enabled": true,
      "metrics": {
        "cpu": true,
        "memory": true,
        "disk": true,
        "network": true
      },
      "alerts": {
        "email": "admin@zapi.com",
        "webhook": "https://hooks.slack.com/services/xyz"
      }
    },
    "features": {
      "registration": true,
      "emailVerification": true,
      "smsVerification": true,
      "twoFactor": false,
      "socialLogin": true,
      "apiKeys": true,
      "webhooks": true,
      "realTime": true,
      "ai": true,
      "analytics": true
    },
    "limits": {
      "users": 10000,
      "apps": 100,
      "apiKeys": 50,
      "webhooks": 20,
      "storage": "1GB",
      "requests": 100000
    },
    "metadata": {
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z",
      "lastModifiedBy": "system"
    }
  },
  "message": "Konfigürasyon başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "CONFIG_ACCESS_DENIED",
    "message": "Konfigürasyon bilgilerine erişim reddedildi"
  }
}
```

---

## Konfigürasyon Bileşenleri

### API Ayarları
- **baseUrl**: API temel URL'i
- **version**: API versiyonu
- **rateLimit**: İstek sınırları
- **timeout**: İstek zaman aşımı
- **cors**: Cross-origin ayarları

### Veritabanı Ayarları
- **host**: Veritabanı sunucusu
- **port**: Bağlantı portu
- **name**: Veritabanı adı
- **charset**: Karakter seti
- **pool**: Bağlantı havuzu

### Cache Ayarları
- **driver**: Cache sürücüsü (redis, memcached)
- **host**: Cache sunucusu
- **ttl**: Yaşam süresi
- **prefix**: Anahtar öneki

### Email Ayarları
- **driver**: Email sürücüsü (smtp, sendgrid)
- **smtp**: SMTP ayarları
- **from**: Gönderici bilgileri
- **templates**: Şablon ayarları

### SMS Ayarları
- **provider**: SMS sağlayıcısı (twilio, aws)
- **apiKey**: API anahtarı
- **from**: Gönderici numarası

### OAuth Ayarları
- **google**: Google OAuth ayarları
- **apple**: Apple OAuth ayarları
- **facebook**: Facebook OAuth ayarları

### AI Ayarları
- **openai**: OpenAI API ayarları
- **anthropic**: Anthropic API ayarları
- **defaultModel**: Varsayılan model
- **maxTokens**: Maksimum token sayısı

### Güvenlik Ayarları
- **jwt**: JWT token ayarları
- **encryption**: Şifreleme ayarları
- **bcrypt**: Şifre hash ayarları
- **rateLimit**: Rate limiting ayarları

### Dosya Ayarları
- **storage**: Depolama türü (local, s3)
- **path**: Dosya yolu
- **maxSize**: Maksimum dosya boyutu
- **allowedTypes**: İzin verilen dosya türleri

### Webhook Ayarları
- **timeout**: Webhook zaman aşımı
- **retryCount**: Yeniden deneme sayısı
- **signature**: İmza doğrulama

### Log Ayarları
- **level**: Log seviyesi (debug, info, warn, error)
- **file**: Log dosyası yolu
- **maxSize**: Maksimum dosya boyutu
- **format**: Log formatı

### İzleme Ayarları
- **enabled**: İzleme aktif/pasif
- **metrics**: Toplanan metrikler
- **alerts**: Uyarı ayarları

### Özellik Ayarları
- **registration**: Kayıt özelliği
- **emailVerification**: Email doğrulama
- **smsVerification**: SMS doğrulama
- **twoFactor**: İki faktörlü kimlik doğrulama
- **socialLogin**: Sosyal medya girişi

### Limit Ayarları
- **users**: Maksimum kullanıcı sayısı
- **apps**: Maksimum uygulama sayısı
- **apiKeys**: Maksimum API anahtarı sayısı
- **storage**: Maksimum depolama alanı

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `CONFIG_ACCESS_DENIED` | Konfigürasyon erişimi reddedildi |
| `CONFIG_NOT_FOUND` | Konfigürasyon bulunamadı |
| `INVALID_PERMISSIONS` | Geçersiz izinler |

## Güvenlik Notları

- Konfigürasyon bilgileri hassas veriler içerir
- Sadece yetkili kullanıcılar erişebilir
- API anahtarları şifrelenmiş olarak saklanır
- Düzenli güvenlik güncellemeleri yapın

## Konfigürasyon Yönetimi

```typescript
// Sistem konfigürasyonunu getir
const config = await config.get();

// Belirli ayarları kontrol et
if (config.data.features.registration) {
  console.log('Kayıt özelliği aktif');
}

// Rate limit bilgilerini al
const rateLimit = config.data.api.rateLimit;
console.log(`${rateLimit.requests} istek/${rateLimit.window} saniye`);

// AI ayarlarını kontrol et
const aiConfig = config.data.ai;
console.log(`Varsayılan model: ${aiConfig.defaultModel}`);
console.log(`Max token: ${aiConfig.maxTokens}`);
```
