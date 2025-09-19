# Admin Endpoint

Yönetici paneli endpoint'leri - Sistem yönetimi, cache temizleme, kuyruk yönetimi, cron işlemleri ve yedekleme.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const admin = zapi.admin;
```

## Metodlar

### 1. getDashboard()

Admin dashboard bilgilerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await admin.getDashboard();

if (result.success) {
  console.log('Dashboard bilgileri:', result.data);
  const { stats, recentActivity } = result.data;
} else {
  console.error('Dashboard getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 1250,
      "activeUsers": 980,
      "totalRequests": 50000,
      "totalTokens": 2000000,
      "revenue": 15000.50
    },
    "recentActivity": [
      {
        "type": "user_registration",
        "message": "Yeni kullanıcı kaydı",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ]
  },
  "message": "Dashboard bilgileri başarıyla getirildi"
}
```

---

### 2. clearCache(pattern: string | null)

Cache'i temizler

**Parametreler:**
- `pattern: string | null` - Temizlenecek cache deseni (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm cache'i temizle
const result = await admin.clearCache();

// Belirli bir pattern'i temizle
const result = await admin.clearCache("user_*");

if (result.success) {
  console.log('Cache temizlendi:', result.data);
} else {
  console.error('Cache temizleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "clearedKeys": 150,
    "pattern": "user_*"
  },
  "message": "Cache başarıyla temizlendi"
}
```

---

### 3. getStats()

Sistem istatistiklerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await admin.getStats();

if (result.success) {
  console.log('Sistem istatistikleri:', result.data);
  const { memory, cpu, disk } = result.data;
} else {
  console.error('İstatistik getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "memory": {
      "used": "2.5GB",
      "total": "8GB",
      "percentage": 31.25
    },
    "cpu": {
      "usage": 45.2,
      "cores": 4
    },
    "disk": {
      "used": "150GB",
      "total": "500GB",
      "percentage": 30
    }
  },
  "message": "Sistem istatistikleri başarıyla getirildi"
}
```

---

### 4. getQueueStats()

Kuyruk istatistiklerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await admin.getQueueStats();

if (result.success) {
  console.log('Kuyruk istatistikleri:', result.data);
  const { pending, processing, completed, failed } = result.data;
} else {
  console.error('Kuyruk istatistik hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "pending": 25,
    "processing": 5,
    "completed": 1500,
    "failed": 12,
    "total": 1542
  },
  "message": "Kuyruk istatistikleri başarıyla getirildi"
}
```

---

### 5. pauseQueue()

Kuyruğu duraklatır

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await admin.pauseQueue();

if (result.success) {
  console.log('Kuyruk duraklatıldı');
} else {
  console.error('Kuyruk duraklatma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "paused",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "message": "Kuyruk başarıyla duraklatıldı"
}
```

---

### 6. resumeQueue()

Kuyruğu devam ettirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await admin.resumeQueue();

if (result.success) {
  console.log('Kuyruk devam ettirildi');
} else {
  console.error('Kuyruk devam ettirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "running",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "message": "Kuyruk başarıyla devam ettirildi"
}
```

---

### 7. cleanQueue(type: string)

Kuyruğu temizler

**Parametreler:**
- `type: string` - Temizlenecek kuyruk tipi (varsayılan: 'completed')

**Örnek Kullanım:**

```typescript
// Tamamlanan işleri temizle
const result = await admin.cleanQueue("completed");

// Başarısız işleri temizle
const result = await admin.cleanQueue("failed");

if (result.success) {
  console.log('Kuyruk temizlendi:', result.data);
} else {
  console.error('Kuyruk temizleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "cleanedJobs": 150,
    "type": "completed"
  },
  "message": "Kuyruk başarıyla temizlendi"
}
```

---

### 8. getCronStatus()

Cron işlemlerinin durumunu getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await admin.getCronStatus();

if (result.success) {
  console.log('Cron durumu:', result.data);
  const { jobs } = result.data;
} else {
  console.error('Cron durum hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "name": "daily_cleanup",
        "status": "running",
        "lastRun": "2024-01-15T00:00:00Z",
        "nextRun": "2024-01-16T00:00:00Z"
      },
      {
        "name": "monthly_report",
        "status": "scheduled",
        "lastRun": "2024-01-01T00:00:00Z",
        "nextRun": "2024-02-01T00:00:00Z"
      }
    ]
  },
  "message": "Cron durumu başarıyla getirildi"
}
```

---

### 9. startCron(jobName: string)

Cron işlemini başlatır

**Parametreler:**
- `jobName: string` - İş adı

**Örnek Kullanım:**

```typescript
const result = await admin.startCron("daily_cleanup");

if (result.success) {
  console.log('Cron işi başlatıldı:', result.data);
} else {
  console.error('Cron başlatma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "jobName": "daily_cleanup",
    "status": "started",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "message": "Cron işi başarıyla başlatıldı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "CRON_JOB_NOT_FOUND",
    "message": "Cron işi bulunamadı"
  }
}
```

---

### 10. stopCron(jobName: string)

Cron işlemini durdurur

**Parametreler:**
- `jobName: string` - İş adı

**Örnek Kullanım:**

```typescript
const result = await admin.stopCron("daily_cleanup");

if (result.success) {
  console.log('Cron işi durduruldu:', result.data);
} else {
  console.error('Cron durdurma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "jobName": "daily_cleanup",
    "status": "stopped",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "message": "Cron işi başarıyla durduruldu"
}
```

---

### 11. triggerDailyReset()

Günlük sıfırlama işlemini tetikler

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await admin.triggerDailyReset();

if (result.success) {
  console.log('Günlük sıfırlama tetiklendi:', result.data);
} else {
  console.error('Günlük sıfırlama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "resetType": "daily",
    "timestamp": "2024-01-15T10:30:00Z",
    "affectedRecords": 1250
  },
  "message": "Günlük sıfırlama başarıyla tetiklendi"
}
```

---

### 12. getSystemInfo()

Sistem bilgilerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await admin.getSystemInfo();

if (result.success) {
  console.log('Sistem bilgileri:', result.data);
  const { version, uptime, environment } = result.data;
} else {
  console.error('Sistem bilgi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "version": "1.0.0",
    "uptime": "7 days, 12 hours",
    "environment": "production",
    "nodeVersion": "18.17.0",
    "platform": "linux"
  },
  "message": "Sistem bilgileri başarıyla getirildi"
}
```

---

### 13. getBackup(key: string)

Yedekleme bilgilerini getirir

**Parametreler:**
- `key: string` - Yedekleme anahtarı

**Örnek Kullanım:**

```typescript
const result = await admin.getBackup("backup_20240115");

if (result.success) {
  console.log('Yedekleme bilgileri:', result.data);
} else {
  console.error('Yedekleme bilgi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "key": "backup_20240115",
    "size": "2.5GB",
    "createdAt": "2024-01-15T00:00:00Z",
    "status": "completed",
    "tables": ["users", "sessions", "logs"]
  },
  "message": "Yedekleme bilgileri başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "BACKUP_NOT_FOUND",
    "message": "Yedekleme bulunamadı"
  }
}
```

---

### 14. getRestore(key: string, backup: string | null, tables: string | null)

Geri yükleme işlemini başlatır

**Parametreler:**
- `key: string` - Yedekleme anahtarı
- `backup: string | null` - Yedekleme dosyası (opsiyonel)
- `tables: string | null` - Geri yüklenecek tablolar (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm yedeklemeyi geri yükle
const result = await admin.getRestore("backup_20240115", null, null);

// Belirli tabloları geri yükle
const result = await admin.getRestore("backup_20240115", null, "users,sessions");

if (result.success) {
  console.log('Geri yükleme başlatıldı:', result.data);
} else {
  console.error('Geri yükleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "restoreId": "restore_12345",
    "key": "backup_20240115",
    "tables": ["users", "sessions"],
    "status": "started",
    "estimatedTime": "5 minutes"
  },
  "message": "Geri yükleme başarıyla başlatıldı"
}
```

---

### 15. triggerMonthlyReset()

Aylık sıfırlama işlemini tetikler

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await admin.triggerMonthlyReset();

if (result.success) {
  console.log('Aylık sıfırlama tetiklendi:', result.data);
} else {
  console.error('Aylık sıfırlama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "resetType": "monthly",
    "timestamp": "2024-01-15T10:30:00Z",
    "affectedRecords": 5000,
    "resetPeriod": "2024-01"
  },
  "message": "Aylık sıfırlama başarıyla tetiklendi"
}
```

---

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `CRON_JOB_NOT_FOUND` | Cron işi bulunamadı |
| `BACKUP_NOT_FOUND` | Yedekleme bulunamadı |
| `RESTORE_FAILED` | Geri yükleme başarısız |
| `QUEUE_ALREADY_PAUSED` | Kuyruk zaten duraklatılmış |
| `QUEUE_ALREADY_RUNNING` | Kuyruk zaten çalışıyor |
| `SYSTEM_ERROR` | Sistem hatası |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Tüm admin işlemleri yüksek yetki gerektirir
- Cron işlemleri dikkatli kullanılmalıdır
- Yedekleme ve geri yükleme işlemleri veri kaybına neden olabilir
- Cache temizleme işlemi performansı etkileyebilir