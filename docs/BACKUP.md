# Backup Endpoint

Yedekleme yönetimi endpoint'leri - Yedek listesi, detayları, silme ve kayıt yedekleri.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const backup = zapi.backup;
```

## Metodlar

### 1. list(options: any)

Yedekleri listeler

**Parametreler:**
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await backup.list({
  page: 1,
  limit: 20,
  type: "full",
  status: "completed",
  sortBy: "createdAt",
  sortOrder: "desc"
});

if (result.success) {
  console.log('Yedekler:', result.data);
  result.data.backups.forEach(backup => {
    console.log(`- ${backup.name} (${backup.type}) - ${backup.size}`);
  });
} else {
  console.error('Yedek listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "backups": [
      {
        "id": "backup_123",
        "name": "Daily Backup - 2024-01-15",
        "type": "full",
        "status": "completed",
        "size": {
          "bytes": 1073741824,
          "human": "1.0 GB"
        },
        "createdAt": "2024-01-15T10:30:00Z",
        "completedAt": "2024-01-15T10:45:00Z",
        "duration": 900,
        "tables": [
          "users",
          "apps",
          "subscriptions",
          "logs"
        ],
        "recordCount": 15000,
        "compression": "gzip",
        "encryption": "AES-256",
        "storage": {
          "provider": "aws-s3",
          "bucket": "zapi-backups",
          "region": "us-east-1"
        }
      },
      {
        "id": "backup_456",
        "name": "Incremental Backup - 2024-01-15",
        "type": "incremental",
        "status": "completed",
        "size": {
          "bytes": 134217728,
          "human": "128 MB"
        },
        "createdAt": "2024-01-15T14:30:00Z",
        "completedAt": "2024-01-15T14:35:00Z",
        "duration": 300,
        "tables": [
          "users",
          "logs"
        ],
        "recordCount": 500,
        "compression": "gzip",
        "encryption": "AES-256",
        "storage": {
          "provider": "aws-s3",
          "bucket": "zapi-backups",
          "region": "us-east-1"
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
      "totalBackups": 45,
      "completedBackups": 42,
      "failedBackups": 3,
      "totalSize": "25.5 GB",
      "lastBackup": "2024-01-15T14:35:00Z"
    }
  },
  "message": "Yedekler başarıyla listelendi"
}
```

---

### 2. get(backupId: string)

Belirli bir yedeği getirir

**Parametreler:**
- `backupId: string` - Yedek ID'si

**Örnek Kullanım:**

```typescript
const result = await backup.get("backup_123");

if (result.success) {
  console.log('Yedek detayları:', result.data);
  const { name, type, status, size, tables } = result.data;
} else {
  console.error('Yedek getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "backup_123",
    "name": "Daily Backup - 2024-01-15",
    "type": "full",
    "status": "completed",
    "size": {
      "bytes": 1073741824,
      "human": "1.0 GB"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "completedAt": "2024-01-15T10:45:00Z",
    "duration": 900,
    "tables": [
      {
        "name": "users",
        "recordCount": 5000,
        "size": {
          "bytes": 268435456,
          "human": "256 MB"
        }
      },
      {
        "name": "apps",
        "recordCount": 1000,
        "size": {
          "bytes": 134217728,
          "human": "128 MB"
        }
      },
      {
        "name": "subscriptions",
        "recordCount": 8000,
        "size": {
          "bytes": 536870912,
          "human": "512 MB"
        }
      },
      {
        "name": "logs",
        "recordCount": 1000,
        "size": {
          "bytes": 134217728,
          "human": "128 MB"
        }
      }
    ],
    "recordCount": 15000,
    "compression": "gzip",
    "encryption": "AES-256",
    "storage": {
      "provider": "aws-s3",
      "bucket": "zapi-backups",
      "region": "us-east-1",
      "path": "backups/2024/01/15/backup_123.tar.gz"
    },
    "metadata": {
      "databaseVersion": "8.0.35",
      "backupVersion": "1.2.3",
      "checksum": "sha256:abc123def456...",
      "createdBy": "system"
    },
    "restore": {
      "available": true,
      "estimatedTime": "15-20 minutes",
      "requirements": {
        "diskSpace": "2.0 GB",
        "databaseVersion": "8.0.35+"
      }
    }
  },
  "message": "Yedek başarıyla getirildi"
}
```

---

### 3. delete(backupId: string)

Yedeği siler

**Parametreler:**
- `backupId: string` - Yedek ID'si

**Örnek Kullanım:**

```typescript
const result = await backup.delete("backup_123");

if (result.success) {
  console.log('Yedek silindi:', result.data);
  const { id, deletedAt, freedSpace } = result.data;
} else {
  console.error('Yedek silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "backup_123",
    "name": "Daily Backup - 2024-01-15",
    "deletedAt": "2024-01-15T10:30:00Z",
    "deletedBy": "user_123",
    "freedSpace": {
      "bytes": 1073741824,
      "human": "1.0 GB"
    },
    "storage": {
      "provider": "aws-s3",
      "bucket": "zapi-backups",
      "path": "backups/2024/01/15/backup_123.tar.gz",
      "deleted": true
    }
  },
  "message": "Yedek başarıyla silindi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "BACKUP_DELETION_FAILED",
    "message": "Yedek silinemedi - Dosya bulunamadı"
  }
}
```

---

### 4. getRecordBackups(model: string, recordId: string)

Belirli bir kaydın yedeklerini getirir

**Parametreler:**
- `model: string` - Model adı (users, apps, subscriptions)
- `recordId: string` - Kayıt ID'si

**Örnek Kullanım:**

```typescript
const result = await backup.getRecordBackups("users", "user_123");

if (result.success) {
  console.log('Kayıt yedekleri:', result.data);
  result.data.backups.forEach(backup => {
    console.log(`- ${backup.backupName} - ${backup.changedAt}`);
  });
} else {
  console.error('Kayıt yedek hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "model": "users",
    "recordId": "user_123",
    "record": {
      "id": "user_123",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "currentStatus": "active"
    },
    "backups": [
      {
        "id": "backup_123",
        "backupName": "Daily Backup - 2024-01-15",
        "backupType": "full",
        "changedAt": "2024-01-15T10:30:00Z",
        "changes": {
          "firstName": {
            "old": "Jane",
            "new": "John"
          },
          "lastName": {
            "old": "Smith",
            "new": "Doe"
          }
        },
        "changeType": "update",
        "changedBy": "user_456"
      },
      {
        "id": "backup_456",
        "backupName": "Incremental Backup - 2024-01-14",
        "backupType": "incremental",
        "changedAt": "2024-01-14T15:30:00Z",
        "changes": {
          "status": {
            "old": "inactive",
            "new": "active"
          }
        },
        "changeType": "update",
        "changedBy": "admin_789"
      },
      {
        "id": "backup_789",
        "backupName": "Weekly Backup - 2024-01-10",
        "backupType": "full",
        "changedAt": "2024-01-10T10:30:00Z",
        "changes": {
          "email": {
            "old": null,
            "new": "john@example.com"
          },
          "firstName": {
            "old": null,
            "new": "Jane"
          },
          "lastName": {
            "old": null,
            "new": "Smith"
          }
        },
        "changeType": "create",
        "changedBy": "system"
      }
    ],
    "summary": {
      "totalBackups": 3,
      "lastChange": "2024-01-15T10:30:00Z",
      "changeTypes": {
        "create": 1,
        "update": 2,
        "delete": 0
      }
    }
  },
  "message": "Kayıt yedekleri başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "RECORD_NOT_FOUND",
    "message": "Kayıt bulunamadı"
  }
}
```

---

## Yedek Türleri

| Tür | Açıklama | Kullanım |
|-----|----------|----------|
| `full` | Tam yedek | Günlük, haftalık |
| `incremental` | Artımlı yedek | Saatlik, günlük |
| `differential` | Fark yedek | Günlük |
| `snapshot` | Anlık yedek | Gerçek zamanlı |

## Yedek Durumları

| Durum | Açıklama |
|-------|----------|
| `pending` | Bekliyor |
| `running` | Çalışıyor |
| `completed` | Tamamlandı |
| `failed` | Başarısız |
| `cancelled` | İptal edildi |

## Depolama Sağlayıcıları

| Sağlayıcı | Açıklama | Özellikler |
|-----------|----------|------------|
| `aws-s3` | Amazon S3 | Yüksek güvenilirlik |
| `google-cloud` | Google Cloud Storage | Düşük maliyet |
| `azure-blob` | Azure Blob Storage | Entegrasyon |
| `local` | Yerel depolama | Hızlı erişim |

## Sıkıştırma Türleri

| Tür | Açıklama | Sıkıştırma Oranı |
|-----|----------|------------------|
| `gzip` | GZIP | ~70% |
| `bzip2` | BZIP2 | ~80% |
| `lz4` | LZ4 | ~60% |
| `none` | Sıkıştırma yok | 0% |

## Şifreleme Türleri

| Tür | Açıklama | Güvenlik |
|-----|----------|----------|
| `AES-256` | AES 256-bit | Yüksek |
| `AES-128` | AES 128-bit | Orta |
| `none` | Şifreleme yok | Düşük |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `BACKUP_NOT_FOUND` | Yedek bulunamadı |
| `BACKUP_DELETION_FAILED` | Yedek silinemedi |
| `RECORD_NOT_FOUND` | Kayıt bulunamadı |
| `INVALID_BACKUP_ID` | Geçersiz yedek ID'si |
| `INVALID_MODEL` | Geçersiz model adı |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `STORAGE_ERROR` | Depolama hatası |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Yedekleri güvenli bir yerde saklayın
- Şifreleme kullanın
- Erişim yetkilerini sınırlayın
- Yedekleri düzenli olarak test edin
- Düzenli olarak güvenlik denetimleri yapın

## Yedek Yönetimi

```typescript
// Yedek listesi
const backups = await backup.list({
  type: "full",
  status: "completed",
  limit: 10
});

// Yedek detayları
const backupDetails = await backup.get("backup_123");

// Yedek silme
await backup.delete("backup_123");

// Kayıt yedekleri
const recordBackups = await backup.getRecordBackups("users", "user_123");
```

## Yedek Analizi

```typescript
// Yedek boyutu analizi
const backups = await backup.list();
const totalSize = backups.data.summary.totalSize;
console.log('Toplam yedek boyutu:', totalSize);

// En büyük yedekler
const sortedBackups = backups.data.backups.sort((a, b) => 
  b.size.bytes - a.size.bytes
);
console.log('En büyük yedek:', sortedBackups[0].name);

// Yedek başarı oranı
const successRate = (backups.data.summary.completedBackups / 
  backups.data.summary.totalBackups) * 100;
console.log('Yedek başarı oranı:', successRate + '%');
```

## Kayıt Değişiklik Takibi

```typescript
// Kayıt değişiklik geçmişi
const recordBackups = await backup.getRecordBackups("users", "user_123");

// Değişiklik türleri
const changeTypes = recordBackups.data.summary.changeTypes;
console.log('Oluşturma:', changeTypes.create);
console.log('Güncelleme:', changeTypes.update);
console.log('Silme:', changeTypes.delete);

// Son değişiklik
const lastChange = recordBackups.data.summary.lastChange;
console.log('Son değişiklik:', new Date(lastChange));
```

## Yedek Optimizasyonu

```typescript
// Yedek sıkıştırma analizi
const backups = await backup.list();
const compressedBackups = backups.data.backups.filter(b => 
  b.compression !== 'none'
);

console.log('Sıkıştırılmış yedekler:', compressedBackups.length);
console.log('Sıkıştırma oranı:', 
  (compressedBackups.length / backups.data.backups.length) * 100 + '%');

// Depolama sağlayıcı analizi
const storageProviders = {};
backups.data.backups.forEach(backup => {
  const provider = backup.storage.provider;
  storageProviders[provider] = (storageProviders[provider] || 0) + 1;
});

console.log('Depolama sağlayıcıları:', storageProviders);
```
