# Info Endpoint

Sistem bilgi endpoint'leri - Sağlık durumu, metrikler, sistem durumu ve AI modelleri.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const info = zapi.info;
```

## Metodlar

### 1. getHealth()

Sistem sağlık durumunu getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await info.getHealth();

if (result.success) {
  console.log('Sistem sağlık durumu:', result.data);
  const { status, services, uptime } = result.data;
} else {
  console.error('Sağlık durumu hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00Z",
    "uptime": {
      "seconds": 86400,
      "human": "1 day, 0 hours, 0 minutes",
      "startedAt": "2024-01-14T10:30:00Z"
    },
    "services": {
      "api": {
        "status": "healthy",
        "responseTime": 45,
        "lastCheck": "2024-01-15T10:30:00Z",
        "version": "1.0.0",
        "endpoints": {
          "total": 256,
          "healthy": 256,
          "degraded": 0,
          "down": 0
        }
      },
      "database": {
        "status": "healthy",
        "responseTime": 12,
        "lastCheck": "2024-01-15T10:30:00Z",
        "version": "8.0.35",
        "connections": {
          "active": 45,
          "max": 100,
          "idle": 25
        },
        "queries": {
          "perSecond": 150,
          "averageTime": 8
        }
      },
      "cache": {
        "status": "healthy",
        "responseTime": 3,
        "lastCheck": "2024-01-15T10:30:00Z",
        "version": "7.2.0",
        "memory": {
          "used": "128MB",
          "max": "512MB",
          "percentage": 25
        },
        "operations": {
          "hits": 95.5,
          "misses": 4.5,
          "perSecond": 850
        }
      },
      "queue": {
        "status": "healthy",
        "responseTime": 8,
        "lastCheck": "2024-01-15T10:30:00Z",
        "version": "8.15.0",
        "jobs": {
          "pending": 12,
          "processing": 5,
          "completed": 1250,
          "failed": 3
        },
        "workers": {
          "active": 8,
          "idle": 2,
          "total": 10
        }
      },
      "storage": {
        "status": "healthy",
        "responseTime": 25,
        "lastCheck": "2024-01-15T10:30:00Z",
        "provider": "aws-s3",
        "usage": {
          "total": "2.5TB",
          "used": "1.8TB",
          "free": "700GB",
          "percentage": 72
        },
        "operations": {
          "uploads": 125,
          "downloads": 850,
          "deletes": 15
        }
      }
    },
    "external": {
      "openai": {
        "status": "healthy",
        "responseTime": 850,
        "lastCheck": "2024-01-15T10:30:00Z",
        "rateLimit": {
          "remaining": 4500,
          "limit": 5000,
          "resetAt": "2024-01-15T11:00:00Z"
        }
      },
      "anthropic": {
        "status": "healthy",
        "responseTime": 1200,
        "lastCheck": "2024-01-15T10:30:00Z",
        "rateLimit": {
          "remaining": 800,
          "limit": 1000,
          "resetAt": "2024-01-15T11:00:00Z"
        }
      },
      "google": {
        "status": "healthy",
        "responseTime": 650,
        "lastCheck": "2024-01-15T10:30:00Z",
        "rateLimit": {
          "remaining": 1500,
          "limit": 2000,
          "resetAt": "2024-01-15T11:00:00Z"
        }
      }
    },
    "alerts": [],
    "maintenance": {
      "scheduled": false,
      "nextMaintenance": null
    }
  },
  "message": "Sistem sağlık durumu başarıyla getirildi"
}
```

---

### 2. getMetrics()

Sistem metriklerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await info.getMetrics();

if (result.success) {
  console.log('Sistem metrikleri:', result.data);
  const { performance, usage, errors } = result.data;
} else {
  console.error('Metrik hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "timestamp": "2024-01-15T10:30:00Z",
    "period": "24h",
    "performance": {
      "requests": {
        "total": 125000,
        "perSecond": 1.45,
        "averageResponseTime": 150,
        "p95ResponseTime": 450,
        "p99ResponseTime": 1200,
        "maxResponseTime": 5000
      },
      "endpoints": {
        "mostUsed": "/api/auth/login",
        "slowest": "/api/ai/generate",
        "fastest": "/api/health"
      },
      "throughput": {
        "requestsPerSecond": 1.45,
        "dataTransferred": "2.5GB",
        "averagePayloadSize": "2.1KB"
      }
    },
    "usage": {
      "users": {
        "active": 1250,
        "new": 45,
        "total": 15000,
        "growth": 12.5
      },
      "api": {
        "calls": 125000,
        "uniqueUsers": 1250,
        "averageCallsPerUser": 100,
        "topUsers": [
          {
            "id": "user_123",
            "calls": 2500,
            "percentage": 2.0
          }
        ]
      },
      "ai": {
        "requests": 25000,
        "tokens": 5000000,
        "models": {
          "gpt-4": 15000,
          "claude-3": 8000,
          "gemini-pro": 2000
        },
        "cost": {
          "total": 1250.50,
          "currency": "USD",
          "byModel": {
            "gpt-4": 750.30,
            "claude-3": 400.20,
            "gemini-pro": 100.00
          }
        }
      }
    },
    "errors": {
      "total": 125,
      "rate": 0.1,
      "byType": {
        "validation": 45,
        "authentication": 30,
        "rateLimit": 25,
        "server": 15,
        "external": 10
      },
      "byEndpoint": {
        "/api/auth/login": 20,
        "/api/ai/generate": 15,
        "/api/users/create": 10
      },
      "trends": {
        "lastHour": 5,
        "last24Hours": 125,
        "change": -15.5
      }
    },
    "resources": {
      "cpu": {
        "usage": 45.2,
        "cores": 8,
        "loadAverage": [1.2, 1.5, 1.8]
      },
      "memory": {
        "used": "4.2GB",
        "total": "16GB",
        "percentage": 26.3,
        "available": "11.8GB"
      },
      "disk": {
        "used": "85GB",
        "total": "200GB",
        "percentage": 42.5,
        "available": "115GB"
      },
      "network": {
        "inbound": "150MB/s",
        "outbound": "200MB/s",
        "connections": 1250
      }
    },
    "business": {
      "revenue": {
        "daily": 1250.50,
        "monthly": 37500.00,
        "growth": 15.5,
        "currency": "USD"
      },
      "subscriptions": {
        "active": 1200,
        "new": 25,
        "cancelled": 5,
        "churn": 0.4
      },
      "conversion": {
        "trialToPaid": 85.5,
        "freeToPaid": 12.3,
        "retention": 92.5
      }
    }
  },
  "message": "Sistem metrikleri başarıyla getirildi"
}
```

---

### 3. getStatus()

Sistem durumunu getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await info.getStatus();

if (result.success) {
  console.log('Sistem durumu:', result.data);
  const { status, version, environment, features } = result.data;
} else {
  console.error('Durum hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "operational",
    "version": {
      "api": "1.0.0",
      "sdk": "1.0.0",
      "database": "8.0.35",
      "cache": "7.2.0",
      "queue": "8.15.0"
    },
    "environment": {
      "name": "production",
      "region": "us-east-1",
      "datacenter": "aws",
      "timezone": "UTC",
      "locale": "en_US"
    },
    "features": {
      "authentication": {
        "enabled": true,
        "providers": ["email", "phone", "google", "apple"],
        "oauth": true,
        "mfa": true
      },
      "ai": {
        "enabled": true,
        "providers": ["openai", "anthropic", "google"],
        "models": 15,
        "streaming": true
      },
      "realtime": {
        "enabled": true,
        "websocket": true,
        "maxConnections": 10000,
        "currentConnections": 2500
      },
      "storage": {
        "enabled": true,
        "providers": ["aws-s3", "google-cloud", "azure"],
        "maxFileSize": "100MB",
        "allowedTypes": ["image", "audio", "video", "document"]
      },
      "notifications": {
        "enabled": true,
        "channels": ["email", "sms", "push"],
        "templates": 25,
        "bulk": true
      },
      "webhooks": {
        "enabled": true,
        "maxWebhooks": 100,
        "retryPolicy": true,
        "signatures": true
      }
    },
    "limits": {
      "api": {
        "requestsPerMinute": 1000,
        "requestsPerHour": 10000,
        "requestsPerDay": 100000
      },
      "users": {
        "maxUsers": 100000,
        "currentUsers": 15000,
        "newUsersPerDay": 100
      },
      "storage": {
        "maxFileSize": "100MB",
        "totalStorage": "2TB",
        "usedStorage": "1.8TB"
      },
      "ai": {
        "requestsPerMinute": 100,
        "tokensPerMinute": 100000,
        "maxTokensPerRequest": 8192
      }
    },
    "security": {
      "ssl": true,
      "encryption": "AES-256",
      "rateLimiting": true,
      "ipWhitelist": false,
      "auditLogging": true,
      "gdpr": true,
      "sox": false,
      "pci": false
    },
    "compliance": {
      "gdpr": {
        "enabled": true,
        "dataRetention": "7 years",
        "rightToBeForgotten": true,
        "dataPortability": true
      },
      "ccpa": {
        "enabled": true,
        "dataCategories": ["personal", "sensitive"],
        "optOut": true
      },
      "hipaa": {
        "enabled": false,
        "businessAssociate": false
      }
    },
    "maintenance": {
      "scheduled": false,
      "nextMaintenance": null,
      "maintenanceWindow": "02:00-04:00 UTC",
      "notifications": true
    },
    "support": {
      "email": "support@zapi.com",
      "phone": "+1-555-0123",
      "chat": true,
      "documentation": "https://docs.zapi.com",
      "statusPage": "https://status.zapi.com"
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Sistem durumu başarıyla getirildi"
}
```

---

### 4. getAIModels()

AI model bilgilerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await info.getAIModels();

if (result.success) {
  console.log('AI modelleri:', result.data);
  const { models, providers, capabilities } = result.data;
} else {
  console.error('AI model hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "models": [
      {
        "id": "gpt-4",
        "name": "GPT-4",
        "provider": "openai",
        "type": "chat",
        "status": "available",
        "description": "En gelişmiş GPT-4 modeli",
        "capabilities": [
          "text_generation",
          "conversation",
          "code_generation",
          "analysis",
          "creative_writing"
        ],
        "limits": {
          "maxTokens": 8192,
          "contextLength": 128000,
          "requestsPerMinute": 60,
          "tokensPerMinute": 150000
        },
        "pricing": {
          "input": 0.03,
          "output": 0.06,
          "currency": "USD",
          "unit": "1K tokens"
        },
        "performance": {
          "averageResponseTime": 2500,
          "successRate": 99.5,
          "quality": 4.8
        },
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      {
        "id": "claude-3-sonnet",
        "name": "Claude 3 Sonnet",
        "provider": "anthropic",
        "type": "chat",
        "status": "available",
        "description": "Claude 3 Sonnet - güçlü analitik yetenekler",
        "capabilities": [
          "text_generation",
          "conversation",
          "analysis",
          "reasoning",
          "code_review"
        ],
        "limits": {
          "maxTokens": 4096,
          "contextLength": 200000,
          "requestsPerMinute": 40,
          "tokensPerMinute": 100000
        },
        "pricing": {
          "input": 0.015,
          "output": 0.075,
          "currency": "USD",
          "unit": "1K tokens"
        },
        "performance": {
          "averageResponseTime": 1800,
          "successRate": 99.2,
          "quality": 4.9
        },
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      {
        "id": "gemini-pro",
        "name": "Gemini Pro",
        "provider": "google",
        "type": "chat",
        "status": "available",
        "description": "Google Gemini Pro - hızlı ve verimli",
        "capabilities": [
          "text_generation",
          "conversation",
          "translation",
          "summarization",
          "question_answering"
        ],
        "limits": {
          "maxTokens": 2048,
          "contextLength": 32768,
          "requestsPerMinute": 80,
          "tokensPerMinute": 200000
        },
        "pricing": {
          "input": 0.001,
          "output": 0.002,
          "currency": "USD",
          "unit": "1K tokens"
        },
        "performance": {
          "averageResponseTime": 1200,
          "successRate": 98.8,
          "quality": 4.6
        },
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "providers": [
      {
        "id": "openai",
        "name": "OpenAI",
        "status": "healthy",
        "models": 5,
        "rateLimit": {
          "remaining": 4500,
          "limit": 5000,
          "resetAt": "2024-01-15T11:00:00Z"
        },
        "pricing": {
          "currency": "USD",
          "billing": "usage-based"
        }
      },
      {
        "id": "anthropic",
        "name": "Anthropic",
        "status": "healthy",
        "models": 3,
        "rateLimit": {
          "remaining": 800,
          "limit": 1000,
          "resetAt": "2024-01-15T11:00:00Z"
        },
        "pricing": {
          "currency": "USD",
          "billing": "usage-based"
        }
      },
      {
        "id": "google",
        "name": "Google",
        "status": "healthy",
        "models": 2,
        "rateLimit": {
          "remaining": 1500,
          "limit": 2000,
          "resetAt": "2024-01-15T11:00:00Z"
        },
        "pricing": {
          "currency": "USD",
          "billing": "usage-based"
        }
      }
    ],
    "capabilities": [
      {
        "id": "text_generation",
        "name": "Metin Üretimi",
        "description": "Yaratıcı ve bilgilendirici metin üretimi",
        "models": ["gpt-4", "claude-3-sonnet", "gemini-pro"]
      },
      {
        "id": "conversation",
        "name": "Sohbet",
        "description": "Doğal dil sohbeti",
        "models": ["gpt-4", "claude-3-sonnet", "gemini-pro"]
      },
      {
        "id": "code_generation",
        "name": "Kod Üretimi",
        "description": "Programlama kodu oluşturma",
        "models": ["gpt-4", "claude-3-sonnet"]
      },
      {
        "id": "analysis",
        "name": "Analiz",
        "description": "Veri analizi ve yorumlama",
        "models": ["gpt-4", "claude-3-sonnet", "gemini-pro"]
      },
      {
        "id": "translation",
        "name": "Çeviri",
        "description": "Dil çevirisi",
        "models": ["gemini-pro"]
      }
    ],
    "statistics": {
      "totalModels": 10,
      "availableModels": 10,
      "totalProviders": 3,
      "totalCapabilities": 8,
      "averageResponseTime": 1833,
      "averageSuccessRate": 99.2,
      "averageQuality": 4.8
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "AI modelleri başarıyla getirildi"
}
```

---

## Sistem Durumları

| Durum | Açıklama |
|-------|----------|
| `operational` | Normal çalışıyor |
| `degraded` | Performans düşük |
| `maintenance` | Bakım modunda |
| `outage` | Hizmet dışı |

## Servis Durumları

| Durum | Açıklama |
|-------|----------|
| `healthy` | Sağlıklı |
| `degraded` | Performans düşük |
| `unhealthy` | Sağlıksız |
| `unknown` | Bilinmeyen |

## AI Model Türleri

| Tür | Açıklama | Özellikler |
|-----|----------|------------|
| `chat` | Sohbet | İki yönlü iletişim |
| `completion` | Tamamlama | Tek yönlü metin |
| `embedding` | Vektör | Metin vektörleştirme |
| `image` | Görsel | Görsel işleme |

## AI Sağlayıcıları

| Sağlayıcı | Açıklama | Model Sayısı |
|-----------|----------|-------------|
| `openai` | OpenAI | 5 |
| `anthropic` | Anthropic | 3 |
| `google` | Google | 2 |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `SERVICE_UNAVAILABLE` | Servis kullanılamıyor |
| `EXTERNAL_SERVICE_ERROR` | Dış servis hatası |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |
| `MAINTENANCE_MODE` | Bakım modunda |
| `INVALID_REQUEST` | Geçersiz istek |

## Güvenlik Notları

- Sistem durumunu düzenli olarak kontrol edin
- Hassas bilgileri loglamayın
- Rate limiting uygulayın
- Düzenli güvenlik güncellemeleri yapın
- Düzenli olarak güvenlik denetimleri yapın

## Sistem Bilgi Yönetimi

```typescript
// Sistem sağlık durumu
const health = await info.getHealth();

// Sistem metrikleri
const metrics = await info.getMetrics();

// Sistem durumu
const status = await info.getStatus();

// AI modelleri
const aiModels = await info.getAIModels();
```

## Sağlık Durumu İzleme

```typescript
// Sağlık durumu kontrolü
const health = await info.getHealth();

// Servis durumları
Object.entries(health.data.services).forEach(([name, service]) => {
  console.log(`${name}: ${service.status} (${service.responseTime}ms)`);
});

// Dış servisler
Object.entries(health.data.external).forEach(([name, service]) => {
  console.log(`${name}: ${service.status}`);
  if (service.rateLimit) {
    console.log(`  Rate limit: ${service.rateLimit.remaining}/${service.rateLimit.limit}`);
  }
});

// Uyarılar
if (health.data.alerts.length > 0) {
  console.warn('Sistem uyarıları:', health.data.alerts);
}
```

## Performans Analizi

```typescript
// Performans metrikleri
const metrics = await info.getMetrics();

// Yanıt süreleri
const performance = metrics.data.performance;
console.log('Ortalama yanıt süresi:', performance.requests.averageResponseTime + 'ms');
console.log('P95 yanıt süresi:', performance.requests.p95ResponseTime + 'ms');
console.log('En yavaş endpoint:', performance.endpoints.slowest);

// Kullanım istatistikleri
const usage = metrics.data.usage;
console.log('Aktif kullanıcı:', usage.users.active);
console.log('Toplam API çağrısı:', usage.api.calls);
console.log('AI istekleri:', usage.ai.requests);

// Hata oranları
const errors = metrics.data.errors;
console.log('Toplam hata:', errors.total);
console.log('Hata oranı:', errors.rate + '%');
```

## AI Model Yönetimi

```typescript
// AI modelleri
const aiModels = await info.getAIModels();

// Model karşılaştırması
aiModels.data.models.forEach(model => {
  console.log(`${model.name}:`);
  console.log(`  Sağlayıcı: ${model.provider}`);
  console.log(`  Durum: ${model.status}`);
  console.log(`  Fiyat: $${model.pricing.input}/1K token`);
  console.log(`  Performans: ${model.performance.averageResponseTime}ms`);
});

// En hızlı model
const fastestModel = aiModels.data.models.reduce((prev, current) =>
  current.performance.averageResponseTime < prev.performance.averageResponseTime ? current : prev
);
console.log('En hızlı model:', fastestModel.name);

// En ekonomik model
const cheapestModel = aiModels.data.models.reduce((prev, current) =>
  current.pricing.input < prev.pricing.input ? current : prev
);
console.log('En ekonomik model:', cheapestModel.name);
```

## Sistem Durumu İzleme

```typescript
// Sistem durumu
const status = await info.getStatus();

// Özellikler
const features = status.data.features;
Object.entries(features).forEach(([name, feature]) => {
  console.log(`${name}: ${feature.enabled ? 'Aktif' : 'Pasif'}`);
});

// Limitler
const limits = status.data.limits;
console.log('API limiti (dakika):', limits.api.requestsPerMinute);
console.log('Maksimum kullanıcı:', limits.users.maxUsers);
console.log('Maksimum dosya boyutu:', limits.storage.maxFileSize);

// Güvenlik
const security = status.data.security;
console.log('SSL:', security.ssl ? 'Aktif' : 'Pasif');
console.log('Rate limiting:', security.rateLimiting ? 'Aktif' : 'Pasif');
console.log('GDPR:', security.gdpr ? 'Uyumlu' : 'Uyumsuz');
```
