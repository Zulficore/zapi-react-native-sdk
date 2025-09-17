# Realtime Endpoint - 9 Metod

Gerçek zamanlı iletişim için kullanılan endpoint.

## Metodlar

### 1. connect(options: any = {}): Promise<ApiResponse>
Gerçek zamanlı bağlantı kurar.

**Parametreler:**
- `options` (any): Bağlantı seçenekleri
  - `userId` (string): Kullanıcı ID'si
  - `token` (string): Bağlantı token'ı
  - `channels` (string[]): Kanal listesi

**Detaylı Örnek:**
```typescript
const connect = await zapi.realtime.connect({
  userId: 'user_64f8a1b2c3d4e5f6g7h8i9j0',
  token: 'rt_token_abc123...',
  channels: ['general', 'notifications']
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Gerçek zamanlı bağlantı kuruldu",
  "data": {
    "connection": {
      "id": "conn_64f8a1b2c3d4e5f6g7h8i9j0",
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "status": "connected",
      "channels": ["general", "notifications"],
      "serverUrl": "wss://realtime.zapi.com",
      "connectionId": "conn_64f8a1b2c3d4e5f6g7h8i9j0",
      "connectedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 2. disconnect(connectionId: string): Promise<ApiResponse>
Gerçek zamanlı bağlantıyı keser.

**Parametreler:**
- `connectionId` (string): Bağlantı ID'si

**Detaylı Örnek:**
```typescript
const disconnect = await zapi.realtime.disconnect('conn_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Gerçek zamanlı bağlantı kesildi",
  "data": {
    "connection": {
      "id": "conn_64f8a1b2c3d4e5f6g7h8i9j0",
      "status": "disconnected",
      "disconnectedAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/
```

### 3. joinChannel(connectionId: string, channel: string): Promise<ApiResponse>
Kanala katılır.

**Parametreler:**
- `connectionId` (string): Bağlantı ID'si
- `channel` (string): Kanal adı

**Detaylı Örnek:**
```typescript
const join = await zapi.realtime.joinChannel('conn_64f8a1b2c3d4e5f6g7h8i9j0', 'support');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kanala katılındı",
  "data": {
    "channel": {
      "name": "support",
      "type": "public",
      "members": 25,
      "joinedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 4. leaveChannel(connectionId: string, channel: string): Promise<ApiResponse>
Kanaldan ayrılır.

**Parametreler:**
- `connectionId` (string): Bağlantı ID'si
- `channel` (string): Kanal adı

**Detaylı Örnek:**
```typescript
const leave = await zapi.realtime.leaveChannel('conn_64f8a1b2c3d4e5f6g7h8i9j0', 'support');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kanaldan ayrılındı",
  "data": {
    "channel": {
      "name": "support",
      "leftAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/
```

### 5. sendMessage(connectionId: string, channel: string, message: any): Promise<ApiResponse>
Mesaj gönderir.

**Parametreler:**
- `connectionId` (string): Bağlantı ID'si
- `channel` (string): Kanal adı
- `message` (any): Mesaj verileri

**Detaylı Örnek:**
```typescript
const send = await zapi.realtime.sendMessage('conn_64f8a1b2c3d4e5f6g7h8i9j0', 'general', {
  type: 'text',
  content: 'Merhaba dünya!',
  metadata: {
    userId: 'user_64f8a1b2c3d4e5f6g7h8i9j0',
    timestamp: '2024-01-15T10:40:00Z'
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Mesaj gönderildi",
  "data": {
    "message": {
      "id": "msg_64f8a1b2c3d4e5f6g7h8i9j0",
      "type": "text",
      "content": "Merhaba dünya!",
      "channel": "general",
      "sender": {
        "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "John Doe"
      },
      "metadata": {
        "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "timestamp": "2024-01-15T10:40:00Z"
      },
      "sentAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 6. getMessages(channel: string, options: any = {}): Promise<ApiResponse>
Mesajları getirir.

**Parametreler:**
- `channel` (string): Kanal adı
- `options` (any): Filtreleme seçenekleri

**Detaylı Örnek:**
```typescript
const messages = await zapi.realtime.getMessages('general', {
  limit: 20,
  before: 'msg_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Mesajlar getirildi",
  "data": {
    "messages": [
      {
        "id": "msg_64f8a1b2c3d4e5f6g7h8i9j0",
        "type": "text",
        "content": "Merhaba dünya!",
        "channel": "general",
        "sender": {
          "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
          "name": "John Doe"
        },
        "sentAt": "2024-01-15T10:40:00Z"
      }
    ],
    "hasMore": true
  }
}
*/
```

### 7. getChannels(): Promise<ApiResponse>
Kanalları getirir.

**Detaylı Örnek:**
```typescript
const channels = await zapi.realtime.getChannels();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kanallar getirildi",
  "data": {
    "channels": [
      {
        "name": "general",
        "type": "public",
        "members": 150,
        "description": "Genel sohbet kanalı",
        "createdAt": "2024-01-01T10:30:00Z"
      },
      {
        "name": "support",
        "type": "public",
        "members": 25,
        "description": "Destek kanalı",
        "createdAt": "2024-01-01T10:30:00Z"
      }
    ]
  }
}
*/
```

### 8. getConnections(): Promise<ApiResponse>
Aktif bağlantıları getirir.

**Detaylı Örnek:**
```typescript
const connections = await zapi.realtime.getConnections();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bağlantılar getirildi",
  "data": {
    "connections": [
      {
        "id": "conn_64f8a1b2c3d4e5f6g7h8i9j0",
        "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
        "status": "connected",
        "channels": ["general", "notifications"],
        "connectedAt": "2024-01-15T10:40:00Z",
        "lastActivity": "2024-01-15T10:45:00Z"
      }
    ],
    "total": 1
  }
}
*/
```

### 9. getStats(): Promise<ApiResponse>
Gerçek zamanlı istatistikleri getirir.

**Detaylı Örnek:**
```typescript
const stats = await zapi.realtime.getStats();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "İstatistikler getirildi",
  "data": {
    "stats": {
      "connections": {
        "total": 150,
        "active": 120,
        "inactive": 30
      },
      "channels": {
        "total": 10,
        "public": 8,
        "private": 2
      },
      "messages": {
        "total": 12500,
        "today": 450,
        "averagePerHour": 18.75
      },
      "performance": {
        "averageLatency": "15ms",
        "uptime": "99.9%",
        "errorRate": "0.1%"
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
  // 1. Bağlantı kur
  const connect = await zapi.realtime.connect({
    userId: 'user_64f8a1b2c3d4e5f6g7h8i9j0',
    token: 'rt_token_abc123...',
    channels: ['general', 'notifications']
  });
  const connectionId = connect.data.connection.id;
  console.log('Bağlantı kuruldu:', connectionId);
  
  // 2. Kanala katıl
  const join = await zapi.realtime.joinChannel(connectionId, 'support');
  console.log('Kanala katılındı:', join.data.channel.name);
  
  // 3. Mesaj gönder
  const send = await zapi.realtime.sendMessage(connectionId, 'general', {
    type: 'text',
    content: 'Merhaba dünya!',
    metadata: { userId: 'user_64f8a1b2c3d4e5f6g7h8i9j0' }
  });
  console.log('Mesaj gönderildi:', send.data.message.id);
  
  // 4. Mesajları getir
  const messages = await zapi.realtime.getMessages('general', { limit: 20 });
  console.log('Mesaj sayısı:', messages.data.messages.length);
  
  // 5. Kanalları getir
  const channels = await zapi.realtime.getChannels();
  console.log('Toplam kanal:', channels.data.channels.length);
  
  // 6. Bağlantıları getir
  const connections = await zapi.realtime.getConnections();
  console.log('Aktif bağlantı:', connections.data.total);
  
  // 7. İstatistikleri getir
  const stats = await zapi.realtime.getStats();
  console.log('Toplam bağlantı:', stats.data.stats.connections.total);
  console.log('Ortalama gecikme:', stats.data.stats.performance.averageLatency);
  
  // 8. Kanaldan ayrıl
  const leave = await zapi.realtime.leaveChannel(connectionId, 'support');
  console.log('Kanaldan ayrılındı:', leave.data.channel.name);
  
  // 9. Bağlantıyı kes
  const disconnect = await zapi.realtime.disconnect(connectionId);
  console.log('Bağlantı kesildi:', disconnect.data.connection.disconnectedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
