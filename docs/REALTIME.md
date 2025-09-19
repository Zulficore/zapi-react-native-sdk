# Realtime Endpoint

Gerçek zamanlı iletişim endpoint'leri - Oturum yönetimi, model bilgileri, stream bilgileri ve istatistikler.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const realtime = zapi.realtime;
```

## Metodlar

### 1. getSessions(options: any)

Aktif oturumları listeler

**Parametreler:**
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await realtime.getSessions({
  page: 1,
  limit: 20,
  status: "active",
  userId: "user_123",
  model: "gpt-4",
  sortBy: "createdAt",
  sortOrder: "desc"
});

if (result.success) {
  console.log('Aktif oturumlar:', result.data);
  result.data.sessions.forEach(session => {
    console.log(`- ${session.id} (${session.model}) - ${session.status}`);
  });
} else {
  console.error('Oturum listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "session_123",
        "userId": "user_123",
        "model": "gpt-4",
        "status": "active",
        "createdAt": "2024-01-15T10:30:00Z",
        "lastActivity": "2024-01-15T10:30:00Z",
        "duration": 1800,
        "messageCount": 15,
        "tokenUsage": {
          "prompt": 2500,
          "completion": 1200,
          "total": 3700
        },
        "settings": {
          "temperature": 0.7,
          "maxTokens": 1000,
          "stream": true
        },
        "metadata": {
          "appId": "app_123",
          "version": "1.0.0",
          "platform": "react-native"
        }
      },
      {
        "id": "session_456",
        "userId": "user_456",
        "model": "claude-3",
        "status": "idle",
        "createdAt": "2024-01-15T10:30:00Z",
        "lastActivity": "2024-01-15T10:25:00Z",
        "duration": 2100,
        "messageCount": 8,
        "tokenUsage": {
          "prompt": 1800,
          "completion": 900,
          "total": 2700
        },
        "settings": {
          "temperature": 0.5,
          "maxTokens": 800,
          "stream": false
        },
        "metadata": {
          "appId": "app_456",
          "version": "1.0.0",
          "platform": "web"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    },
    "summary": {
      "totalSessions": 45,
      "activeSessions": 35,
      "idleSessions": 8,
      "completedSessions": 2,
      "totalUsers": 40
    }
  },
  "message": "Oturumlar başarıyla listelendi"
}
```

---

### 2. resumeSession(sessionId: string)

Oturumu yeniden başlatır

**Parametreler:**
- `sessionId: string` - Oturum ID'si

**Örnek Kullanım:**

```typescript
const result = await realtime.resumeSession("session_123");

if (result.success) {
  console.log('Oturum yeniden başlatıldı:', result.data);
  const { id, status, connectionInfo } = result.data;
} else {
  console.error('Oturum yeniden başlatma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "session_123",
    "status": "active",
    "resumedAt": "2024-01-15T10:30:00Z",
    "connectionInfo": {
      "websocketUrl": "wss://api.zapi.com/realtime/session_123",
      "authToken": "rt_token_1234567890abcdef",
      "expiresAt": "2024-01-15T11:30:00Z",
      "heartbeatInterval": 30000,
      "reconnectAttempts": 3
    },
    "sessionData": {
      "model": "gpt-4",
      "temperature": 0.7,
      "maxTokens": 1000,
      "messageHistory": [
        {
          "role": "user",
          "content": "Merhaba, nasılsın?",
          "timestamp": "2024-01-15T10:25:00Z"
        },
        {
          "role": "assistant",
          "content": "Merhaba! Ben iyiyim, teşekkür ederim. Size nasıl yardımcı olabilirim?",
          "timestamp": "2024-01-15T10:25:05Z"
        }
      ]
    },
    "usage": {
      "tokenCount": 3700,
      "messageCount": 15,
      "duration": 1800
    }
  },
  "message": "Oturum başarıyla yeniden başlatıldı"
}
```

---

### 3. getSessionHistory(sessionId: string, options: any)

Oturum geçmişini getirir

**Parametreler:**
- `sessionId: string` - Oturum ID'si
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await realtime.getSessionHistory("session_123", {
  page: 1,
  limit: 50,
  startDate: "2024-01-15T10:00:00Z",
  endDate: "2024-01-15T11:00:00Z",
  sortBy: "timestamp",
  sortOrder: "desc"
});

if (result.success) {
  console.log('Oturum geçmişi:', result.data);
  result.data.messages.forEach(message => {
    console.log(`[${message.role}] ${message.content}`);
  });
} else {
  console.error('Oturum geçmişi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "sessionId": "session_123",
    "messages": [
      {
        "id": "msg_123",
        "role": "user",
        "content": "Merhaba, nasılsın?",
        "timestamp": "2024-01-15T10:25:00Z",
        "tokenCount": 8,
        "metadata": {
          "platform": "react-native",
          "version": "1.0.0"
        }
      },
      {
        "id": "msg_124",
        "role": "assistant",
        "content": "Merhaba! Ben iyiyim, teşekkür ederim. Size nasıl yardımcı olabilirim?",
        "timestamp": "2024-01-15T10:25:05Z",
        "tokenCount": 25,
        "metadata": {
          "model": "gpt-4",
          "temperature": 0.7,
          "responseTime": 1200
        }
      },
      {
        "id": "msg_125",
        "role": "user",
        "content": "React Native hakkında bilgi verebilir misin?",
        "timestamp": "2024-01-15T10:26:00Z",
        "tokenCount": 12,
        "metadata": {
          "platform": "react-native",
          "version": "1.0.0"
        }
      },
      {
        "id": "msg_126",
        "role": "assistant",
        "content": "Tabii ki! React Native, Facebook tarafından geliştirilen bir mobil uygulama geliştirme framework'üdür...",
        "timestamp": "2024-01-15T10:26:08Z",
        "tokenCount": 150,
        "metadata": {
          "model": "gpt-4",
          "temperature": 0.7,
          "responseTime": 8000
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 15,
      "pages": 1
    },
    "summary": {
      "totalMessages": 15,
      "userMessages": 8,
      "assistantMessages": 7,
      "totalTokens": 3700,
      "averageResponseTime": 2500,
      "sessionDuration": 1800
    }
  },
  "message": "Oturum geçmişi başarıyla getirildi"
}
```

---

### 4. createSession(data: any)

Yeni oturum oluşturur

**Parametreler:**
- `data: any` - Oturum verileri

**Örnek Kullanım:**

```typescript
const result = await realtime.createSession({
  model: "gpt-4",
  temperature: 0.7,
  maxTokens: 1000,
  stream: true,
  systemPrompt: "Sen yardımcı bir AI asistanısın.",
  metadata: {
    appId: "app_123",
    version: "1.0.0",
    platform: "react-native"
  }
});

if (result.success) {
  console.log('Oturum oluşturuldu:', result.data);
  const { id, connectionInfo, sessionData } = result.data;
} else {
  console.error('Oturum oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "session_789",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z",
    "connectionInfo": {
      "websocketUrl": "wss://api.zapi.com/realtime/session_789",
      "authToken": "rt_token_7890123456abcdef",
      "expiresAt": "2024-01-15T11:30:00Z",
      "heartbeatInterval": 30000,
      "reconnectAttempts": 3
    },
    "sessionData": {
      "model": "gpt-4",
      "temperature": 0.7,
      "maxTokens": 1000,
      "stream": true,
      "systemPrompt": "Sen yardımcı bir AI asistanısın.",
      "metadata": {
        "appId": "app_123",
        "version": "1.0.0",
        "platform": "react-native"
      }
    },
    "usage": {
      "tokenCount": 0,
      "messageCount": 0,
      "duration": 0
    }
  },
  "message": "Oturum başarıyla oluşturuldu"
}
```

---

### 5. getSession(sessionId: string)

Belirli bir oturumu getirir

**Parametreler:**
- `sessionId: string` - Oturum ID'si

**Örnek Kullanım:**

```typescript
const result = await realtime.getSession("session_123");

if (result.success) {
  console.log('Oturum detayları:', result.data);
  const { id, status, model, usage } = result.data;
} else {
  console.error('Oturum getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "session_123",
    "userId": "user_123",
    "model": "gpt-4",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z",
    "lastActivity": "2024-01-15T10:30:00Z",
    "duration": 1800,
    "messageCount": 15,
    "tokenUsage": {
      "prompt": 2500,
      "completion": 1200,
      "total": 3700
    },
    "settings": {
      "temperature": 0.7,
      "maxTokens": 1000,
      "stream": true,
      "systemPrompt": "Sen yardımcı bir AI asistanısın."
    },
    "connectionInfo": {
      "websocketUrl": "wss://api.zapi.com/realtime/session_123",
      "authToken": "rt_token_1234567890abcdef",
      "expiresAt": "2024-01-15T11:30:00Z",
      "heartbeatInterval": 30000,
      "reconnectAttempts": 3
    },
    "metadata": {
      "appId": "app_123",
      "version": "1.0.0",
      "platform": "react-native"
    },
    "performance": {
      "averageResponseTime": 2500,
      "totalRequests": 15,
      "successRate": 100.0
    }
  },
  "message": "Oturum başarıyla getirildi"
}
```

---

### 6. deleteSession(sessionId: string)

Oturumu siler

**Parametreler:**
- `sessionId: string` - Oturum ID'si

**Örnek Kullanım:**

```typescript
const result = await realtime.deleteSession("session_123");

if (result.success) {
  console.log('Oturum silindi:', result.data);
  const { id, deletedAt, finalStats } = result.data;
} else {
  console.error('Oturum silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "session_123",
    "deletedAt": "2024-01-15T10:30:00Z",
    "deletedBy": "user_123",
    "finalStats": {
      "duration": 1800,
      "messageCount": 15,
      "tokenUsage": {
        "prompt": 2500,
        "completion": 1200,
        "total": 3700
      },
      "averageResponseTime": 2500,
      "successRate": 100.0
    }
  },
  "message": "Oturum başarıyla silindi"
}
```

---

### 7. getModels()

Kullanılabilir modelleri getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await realtime.getModels();

if (result.success) {
  console.log('Kullanılabilir modeller:', result.data);
  result.data.models.forEach(model => {
    console.log(`- ${model.name} (${model.type})`);
  });
} else {
  console.error('Model listesi hatası:', result.error);
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
        "type": "chat",
        "provider": "openai",
        "description": "En gelişmiş GPT-4 modeli",
        "capabilities": ["chat", "completion", "streaming"],
        "limits": {
          "maxTokens": 8192,
          "contextLength": 128000,
          "requestsPerMinute": 60
        },
        "pricing": {
          "input": 0.03,
          "output": 0.06,
          "currency": "USD"
        },
        "status": "available",
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      {
        "id": "claude-3",
        "name": "Claude 3",
        "type": "chat",
        "provider": "anthropic",
        "description": "Claude 3 Sonnet modeli",
        "capabilities": ["chat", "completion", "streaming"],
        "limits": {
          "maxTokens": 4096,
          "contextLength": 200000,
          "requestsPerMinute": 40
        },
        "pricing": {
          "input": 0.015,
          "output": 0.075,
          "currency": "USD"
        },
        "status": "available",
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      {
        "id": "gemini-pro",
        "name": "Gemini Pro",
        "type": "chat",
        "provider": "google",
        "description": "Google Gemini Pro modeli",
        "capabilities": ["chat", "completion", "streaming"],
        "limits": {
          "maxTokens": 2048,
          "contextLength": 32768,
          "requestsPerMinute": 80
        },
        "pricing": {
          "input": 0.001,
          "output": 0.002,
          "currency": "USD"
        },
        "status": "available",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "totalModels": 3,
    "availableModels": 3,
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Modeller başarıyla getirildi"
}
```

---

### 8. getStreamInfo()

Stream bilgilerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await realtime.getStreamInfo();

if (result.success) {
  console.log('Stream bilgileri:', result.data);
  const { status, configuration, performance } = result.data;
} else {
  console.error('Stream bilgi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "active",
    "configuration": {
      "maxConnections": 10000,
      "heartbeatInterval": 30000,
      "reconnectAttempts": 3,
      "messageBufferSize": 1000,
      "compression": "gzip",
      "encryption": "wss"
    },
    "performance": {
      "activeConnections": 2500,
      "totalConnections": 15000,
      "messagesPerSecond": 1250,
      "averageLatency": 45,
      "uptime": 99.9
    },
    "endpoints": {
      "websocket": "wss://api.zapi.com/realtime",
      "fallback": "wss://api-backup.zapi.com/realtime",
      "healthCheck": "https://api.zapi.com/realtime/health"
    },
    "features": {
      "streaming": true,
      "heartbeat": true,
      "reconnection": true,
      "compression": true,
      "encryption": true
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Stream bilgileri başarıyla getirildi"
}
```

---

### 9. getStats()

Realtime istatistiklerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await realtime.getStats();

if (result.success) {
  console.log('Realtime istatistikleri:', result.data);
  const { sessions, usage, performance } = result.data;
} else {
  console.error('İstatistik hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "sessions": {
      "total": 15000,
      "active": 2500,
      "idle": 800,
      "completed": 11700,
      "averageDuration": 1800,
      "peakConcurrent": 3500
    },
    "usage": {
      "totalMessages": 250000,
      "totalTokens": 5000000,
      "averageTokensPerMessage": 20,
      "messagesPerSecond": 1250,
      "tokensPerSecond": 25000
    },
    "performance": {
      "averageResponseTime": 2500,
      "successRate": 99.5,
      "errorRate": 0.5,
      "uptime": 99.9,
      "latency": {
        "min": 100,
        "max": 5000,
        "average": 2500,
        "p95": 4000,
        "p99": 4800
      }
    },
    "models": {
      "gpt-4": {
        "sessions": 8000,
        "tokens": 3000000,
        "averageResponseTime": 3000
      },
      "claude-3": {
        "sessions": 5000,
        "tokens": 1500000,
        "averageResponseTime": 2000
      },
      "gemini-pro": {
        "sessions": 2000,
        "tokens": 500000,
        "averageResponseTime": 1800
      }
    },
    "timeRange": {
      "start": "2024-01-15T00:00:00Z",
      "end": "2024-01-15T23:59:59Z",
      "duration": "24 hours"
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Realtime istatistikleri başarıyla getirildi"
}
```

---

## Oturum Durumları

| Durum | Açıklama |
|-------|----------|
| `active` | Aktif |
| `idle` | Boşta |
| `paused` | Duraklatılmış |
| `completed` | Tamamlanmış |
| `failed` | Başarısız |

## Model Türleri

| Tür | Açıklama | Özellikler |
|-----|----------|------------|
| `chat` | Sohbet | İki yönlü iletişim |
| `completion` | Tamamlama | Tek yönlü metin |
| `streaming` | Akış | Gerçek zamanlı |

## Model Sağlayıcıları

| Sağlayıcı | Açıklama | Özellikler |
|-----------|----------|------------|
| `openai` | OpenAI | GPT modelleri |
| `anthropic` | Anthropic | Claude modelleri |
| `google` | Google | Gemini modelleri |
| `cohere` | Cohere | Command modelleri |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `SESSION_NOT_FOUND` | Oturum bulunamadı |
| `SESSION_CREATION_FAILED` | Oturum oluşturulamadı |
| `SESSION_DELETION_FAILED` | Oturum silinemedi |
| `INVALID_SESSION_ID` | Geçersiz oturum ID'si |
| `MODEL_NOT_AVAILABLE` | Model kullanılamıyor |
| `CONNECTION_FAILED` | Bağlantı başarısız |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- WebSocket bağlantılarını güvenli tutun
- Auth token'ları güvenli bir yerde saklayın
- Heartbeat mekanizmasını kullanın
- Bağlantı hatalarını yönetin
- Düzenli olarak güvenlik denetimleri yapın

## Realtime Yönetimi

```typescript
// Oturum oluşturma
const session = await realtime.createSession({
  model: "gpt-4",
  temperature: 0.7,
  stream: true
});

// Oturum listesi
const sessions = await realtime.getSessions({
  status: "active"
});

// Oturum detayları
const sessionDetails = await realtime.getSession("session_123");

// Oturum geçmişi
const history = await realtime.getSessionHistory("session_123");

// Oturum silme
await realtime.deleteSession("session_123");
```

## WebSocket Bağlantısı

```typescript
// WebSocket bağlantısı kurma
const ws = new WebSocket(session.connectionInfo.websocketUrl);

ws.onopen = () => {
  console.log('WebSocket bağlantısı kuruldu');
  
  // Auth token gönder
  ws.send(JSON.stringify({
    type: 'auth',
    token: session.connectionInfo.authToken
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'message') {
    console.log('Yeni mesaj:', data.content);
  } else if (data.type === 'heartbeat') {
    // Heartbeat yanıtı
    ws.send(JSON.stringify({ type: 'pong' }));
  }
};

ws.onclose = () => {
  console.log('WebSocket bağlantısı kapandı');
  // Yeniden bağlanma mantığı
};
```

## Model Yönetimi

```typescript
// Kullanılabilir modeller
const models = await realtime.getModels();

// Model seçimi
const selectedModel = models.data.models.find(m => m.id === 'gpt-4');
console.log('Seçilen model:', selectedModel.name);
console.log('Maksimum token:', selectedModel.limits.maxTokens);
console.log('Fiyat:', selectedModel.pricing.input + ' USD/1K token');

// Model karşılaştırması
models.data.models.forEach(model => {
  console.log(`${model.name}: ${model.pricing.input} USD/1K token`);
});
```

## Performans İzleme

```typescript
// Stream bilgileri
const streamInfo = await realtime.getStreamInfo();
console.log('Aktif bağlantılar:', streamInfo.data.performance.activeConnections);
console.log('Mesaj/saniye:', streamInfo.data.performance.messagesPerSecond);
console.log('Ortalama gecikme:', streamInfo.data.performance.averageLatency + 'ms');

// Genel istatistikler
const stats = await realtime.getStats();
console.log('Toplam oturum:', stats.data.sessions.total);
console.log('Başarı oranı:', stats.data.performance.successRate + '%');
console.log('Ortalama yanıt süresi:', stats.data.performance.averageResponseTime + 'ms');
```
