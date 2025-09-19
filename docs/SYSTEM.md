# System Endpoint

Sistem yönetimi endpoint'leri - Sistem yeniden başlatma, durum kontrolü ve bellek bilgileri.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const system = zapi.system;
```

## Metodlar

### 1. restart()

Sistemi yeniden başlatır

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await system.restart();

if (result.success) {
  console.log('Sistem yeniden başlatıldı:', result.data);
  const { restartTime, estimatedDowntime } = result.data;
} else {
  console.error('Sistem yeniden başlatma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "restartTime": "2024-01-15T10:30:00Z",
    "estimatedDowntime": "2-3 minutes",
    "status": "restarting",
    "message": "Sistem yeniden başlatılıyor...",
    "affectedServices": [
      "api",
      "database",
      "cache",
      "queue"
    ],
    "restartId": "restart_123456"
  },
  "message": "Sistem yeniden başlatma işlemi başlatıldı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "RESTART_FAILED",
    "message": "Sistem yeniden başlatılamadı"
  }
}
```

---

### 2. getStatus()

Sistem durumunu kontrol eder

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await system.getStatus();

if (result.success) {
  console.log('Sistem durumu:', result.data);
  const { status, services, uptime, performance } = result.data;
} else {
  console.error('Sistem durum hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": {
      "seconds": 86400,
      "human": "1 day, 0 hours, 0 minutes",
      "startedAt": "2024-01-14T10:30:00Z"
    },
    "services": {
      "api": {
        "status": "running",
        "uptime": 86400,
        "responseTime": 150,
        "lastCheck": "2024-01-15T10:30:00Z"
      },
      "database": {
        "status": "running",
        "uptime": 86400,
        "connections": 45,
        "lastCheck": "2024-01-15T10:30:00Z"
      },
      "cache": {
        "status": "running",
        "uptime": 86400,
        "hitRate": 95.5,
        "lastCheck": "2024-01-15T10:30:00Z"
      },
      "queue": {
        "status": "running",
        "uptime": 86400,
        "pendingJobs": 12,
        "lastCheck": "2024-01-15T10:30:00Z"
      }
    },
    "performance": {
      "cpuUsage": 45.2,
      "memoryUsage": 68.5,
      "diskUsage": 42.1,
      "networkLatency": 25
    },
    "alerts": [],
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Sistem durumu başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "STATUS_CHECK_FAILED",
    "message": "Sistem durumu kontrol edilemedi"
  }
}
```

---

### 3. getMemory()

Sistem bellek bilgilerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await system.getMemory();

if (result.success) {
  console.log('Bellek bilgileri:', result.data);
  const { total, used, free, usage } = result.data;
} else {
  console.error('Bellek bilgi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "total": {
      "bytes": 17179869184,
      "human": "16.0 GB",
      "type": "RAM"
    },
    "used": {
      "bytes": 11744051200,
      "human": "10.9 GB",
      "percentage": 68.4
    },
    "free": {
      "bytes": 5435817984,
      "human": "5.1 GB",
      "percentage": 31.6
    },
    "swap": {
      "total": {
        "bytes": 8589934592,
        "human": "8.0 GB"
      },
      "used": {
        "bytes": 1073741824,
        "human": "1.0 GB",
        "percentage": 12.5
      },
      "free": {
        "bytes": 7516192768,
        "human": "7.0 GB",
        "percentage": 87.5
      }
    },
    "processes": [
      {
        "name": "api-server",
        "pid": 1234,
        "memory": {
          "bytes": 536870912,
          "human": "512 MB",
          "percentage": 3.1
        }
      },
      {
        "name": "database",
        "pid": 5678,
        "memory": {
          "bytes": 1073741824,
          "human": "1.0 GB",
          "percentage": 6.2
        }
      },
      {
        "name": "cache-server",
        "pid": 9012,
        "memory": {
          "bytes": 268435456,
          "human": "256 MB",
          "percentage": 1.6
        }
      }
    ],
    "memoryPressure": "normal",
    "recommendations": [
      "Memory usage is within normal limits",
      "Consider monitoring cache usage"
    ],
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Bellek bilgileri başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "MEMORY_INFO_FAILED",
    "message": "Bellek bilgileri alınamadı"
  }
}
```

---

## Sistem Durumları

| Durum | Açıklama |
|-------|----------|
| `healthy` | Sağlıklı |
| `degraded` | Performans düşük |
| `unhealthy` | Sağlıksız |
| `maintenance` | Bakım modunda |
| `restarting` | Yeniden başlatılıyor |

## Servis Durumları

| Durum | Açıklama |
|-------|----------|
| `running` | Çalışıyor |
| `stopped` | Durdurulmuş |
| `error` | Hata durumunda |
| `starting` | Başlatılıyor |
| `stopping` | Durduruluyor |

## Bellek Basıncı Seviyeleri

| Seviye | Açıklama | Eylem |
|--------|----------|-------|
| `low` | Düşük | Normal |
| `normal` | Normal | İzle |
| `high` | Yüksek | Uyarı |
| `critical` | Kritik | Müdahale gerekli |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `RESTART_FAILED` | Sistem yeniden başlatılamadı |
| `STATUS_CHECK_FAILED` | Sistem durumu kontrol edilemedi |
| `MEMORY_INFO_FAILED` | Bellek bilgileri alınamadı |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `SYSTEM_MAINTENANCE` | Sistem bakım modunda |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Sistem yönetimi işlemlerini sınırlı kullanıcılara verin
- Yeniden başlatma işlemlerini dikkatli yapın
- Sistem durumunu düzenli olarak izleyin
- Bellek kullanımını optimize edin
- Düzenli olarak güvenlik güncellemeleri yapın

## Sistem İzleme

```typescript
// Sistem durumu kontrolü
const status = await system.getStatus();

// Sağlık durumu kontrolü
if (status.data.status === 'healthy') {
  console.log('Sistem sağlıklı');
} else {
  console.warn('Sistem sorunu:', status.data.status);
}

// Servis durumları
const services = status.data.services;
Object.entries(services).forEach(([name, service]) => {
  console.log(`${name}: ${service.status}`);
});

// Performans metrikleri
const performance = status.data.performance;
console.log('CPU kullanımı:', performance.cpuUsage + '%');
console.log('Bellek kullanımı:', performance.memoryUsage + '%');
```

## Bellek Yönetimi

```typescript
// Bellek bilgileri
const memory = await system.getMemory();

// Toplam bellek
console.log('Toplam bellek:', memory.data.total.human);
console.log('Kullanılan bellek:', memory.data.used.human);
console.log('Boş bellek:', memory.data.free.human);

// Bellek kullanım yüzdesi
const usage = memory.data.used.percentage;
if (usage > 80) {
  console.warn('Yüksek bellek kullanımı:', usage + '%');
}

// En çok bellek kullanan süreçler
const processes = memory.data.processes;
processes.sort((a, b) => b.memory.percentage - a.memory.percentage);
console.log('En çok bellek kullanan süreç:', processes[0].name);
```

## Sistem Yeniden Başlatma

```typescript
// Yeniden başlatma öncesi kontrol
const status = await system.getStatus();
if (status.data.status === 'healthy') {
  console.log('Sistem sağlıklı, yeniden başlatma güvenli');
} else {
  console.warn('Sistem sorunu var, yeniden başlatma riskli');
}

// Yeniden başlatma
const restart = await system.restart();
if (restart.success) {
  console.log('Yeniden başlatma başlatıldı');
  console.log('Tahmini kesinti süresi:', restart.data.estimatedDowntime);
  
  // Etkilenen servisler
  const affectedServices = restart.data.affectedServices;
  console.log('Etkilenen servisler:', affectedServices.join(', '));
} else {
  console.error('Yeniden başlatma başarısız:', restart.error.message);
}
```

## Performans İzleme

```typescript
// Performans metrikleri
const status = await system.getStatus();
const performance = status.data.performance;

// CPU kullanımı
if (performance.cpuUsage > 80) {
  console.warn('Yüksek CPU kullanımı:', performance.cpuUsage + '%');
}

// Disk kullanımı
if (performance.diskUsage > 90) {
  console.error('Kritik disk kullanımı:', performance.diskUsage + '%');
}

// Ağ gecikmesi
if (performance.networkLatency > 100) {
  console.warn('Yüksek ağ gecikmesi:', performance.networkLatency + 'ms');
}

// Uptime kontrolü
const uptime = status.data.uptime;
console.log('Sistem çalışma süresi:', uptime.human);
```

## Uyarı Yönetimi

```typescript
// Sistem uyarıları
const status = await system.getStatus();
const alerts = status.data.alerts;

if (alerts.length > 0) {
  console.warn('Sistem uyarıları:');
  alerts.forEach(alert => {
    console.log(`- ${alert.type}: ${alert.message}`);
  });
} else {
  console.log('Sistem uyarısı yok');
}

// Bellek basıncı kontrolü
const memory = await system.getMemory();
const pressure = memory.data.memoryPressure;

if (pressure === 'critical') {
  console.error('Kritik bellek basıncı!');
} else if (pressure === 'high') {
  console.warn('Yüksek bellek basıncı');
}
```

## Sistem Önerileri

```typescript
// Bellek önerileri
const memory = await system.getMemory();
const recommendations = memory.data.recommendations;

if (recommendations.length > 0) {
  console.log('Sistem önerileri:');
  recommendations.forEach(rec => {
    console.log(`- ${rec}`);
  });
}

// Performans önerileri
const status = await system.getStatus();
const performance = status.data.performance;

if (performance.memoryUsage > 80) {
  console.log('Öneri: Bellek kullanımını optimize edin');
}

if (performance.cpuUsage > 80) {
  console.log('Öneri: CPU kullanımını azaltın');
}
```
