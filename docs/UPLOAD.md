# Upload Endpoint

Dosya yükleme endpoint'i - Dosya yükleme, yönetimi ve izleme işlemleri.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const upload = zapi.upload;
```

## Metodlar

### 1. upload(filePath: string, options: any)

Dosya yükler

**Parametreler:**
- `filePath: string` - Dosya yolu
- `options: any` - Yükleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Basit dosya yükleme
const result = await upload.upload('/path/to/file.jpg', {
  folder: 'images',
  public: true,
  metadata: {
    title: 'Profil fotoğrafı',
    description: 'Kullanıcı profil fotoğrafı'
  }
});

if (result.success) {
  console.log('Dosya yüklendi:', result.data);
  console.log('Dosya URL:', result.data.url);
  console.log('Dosya ID:', result.data.id);
} else {
  console.error('Dosya yükleme hatası:', result.error);
}

// Görsel dosyası yükleme
const imageUpload = await upload.upload('/path/to/image.png', {
  folder: 'uploads/images',
  public: true,
  compress: true,
  resize: {
    width: 800,
    height: 600,
    quality: 85
  },
  watermark: {
    text: 'ZAPI',
    position: 'bottom-right',
    opacity: 0.5
  },
  metadata: {
    title: 'Ürün resmi',
    category: 'product',
    tags: ['ürün', 'e-ticaret']
  }
});

// Video dosyası yükleme
const videoUpload = await upload.upload('/path/to/video.mp4', {
  folder: 'uploads/videos',
  public: false,
  generateThumbnail: true,
  extractAudio: true,
  metadata: {
    title: 'Eğitim videosu',
    duration: 120,
    resolution: '1920x1080'
  }
});

// Belge dosyası yükleme
const documentUpload = await upload.upload('/path/to/document.pdf', {
  folder: 'uploads/documents',
  public: false,
  extractText: true,
  generatePreview: true,
  metadata: {
    title: 'Sözleşme',
    type: 'contract',
    confidential: true
  }
});

// Çoklu dosya yükleme
const files = [
  '/path/to/file1.jpg',
  '/path/to/file2.png',
  '/path/to/file3.pdf'
];

for (const filePath of files) {
  const uploadResult = await upload.upload(filePath, {
    folder: 'batch-upload',
    public: true
  });
  
  if (uploadResult.success) {
    console.log(`${filePath} yüklendi: ${uploadResult.data.url}`);
  }
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "file_123456",
    "filename": "image.jpg",
    "originalName": "profile-photo.jpg",
    "size": 1048576,
    "mimeType": "image/jpeg",
    "url": "https://storage.zapi.com/files/file_123456.jpg",
    "publicUrl": "https://cdn.zapi.com/files/file_123456.jpg",
    "folder": "uploads/images",
    "isPublic": true,
    "metadata": {
      "title": "Profil fotoğrafı",
      "description": "Kullanıcı profil fotoğrafı",
      "uploadedBy": "user123",
      "category": "profile"
    },
    "processing": {
      "status": "completed",
      "thumbnail": "https://storage.zapi.com/thumbnails/file_123456_thumb.jpg",
      "compressed": true,
      "resized": true,
      "watermark": false
    },
    "security": {
      "virusScanned": true,
      "virusStatus": "clean",
      "encrypted": true,
      "accessLevel": "public"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Dosya başarıyla yüklendi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "UPLOAD_FAILED",
    "message": "Dosya yüklenemedi"
  }
}
```

---

### 2. list(options: any)

Yüklenen dosyaları listeler

**Parametreler:**
- `options: any` - Filtreleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm dosyaları listele
const result = await upload.list();

if (result.success) {
  console.log('Dosyalar:', result.data);
  result.data.files.forEach(file => {
    console.log(`${file.filename} - ${file.size} bytes - ${file.url}`);
  });
} else {
  console.error('Dosya listeleme hatası:', result.error);
}

// Filtreleme ile listele
const filteredFiles = await upload.list({
  folder: 'uploads/images',
  mimeType: 'image/',
  public: true,
  page: 1,
  limit: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc',
  search: 'profil'
});

// Belirli tarih aralığındaki dosyalar
const recentFiles = await upload.list({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
  limit: 50
});

// Kullanıcıya ait dosyalar
const userFiles = await upload.list({
  uploadedBy: 'user123',
  includePrivate: true
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "id": "file_123456",
        "filename": "image.jpg",
        "originalName": "profile-photo.jpg",
        "size": 1048576,
        "mimeType": "image/jpeg",
        "url": "https://storage.zapi.com/files/file_123456.jpg",
        "folder": "uploads/images",
        "isPublic": true,
        "metadata": {
          "title": "Profil fotoğrafı"
        },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "pages": 1
    },
    "stats": {
      "totalFiles": 1,
      "totalSize": 1048576,
      "publicFiles": 1,
      "privateFiles": 0
    }
  }
}
```

---

### 3. get(fileId: string)

Dosya detaylarını getirir

**Parametreler:**
- `fileId: string` - Dosya ID'si

**Örnek Kullanım:**

```typescript
const result = await upload.get('file_123456');

if (result.success) {
  console.log('Dosya detayları:', result.data);
  console.log('Dosya boyutu:', result.data.size);
  console.log('MIME türü:', result.data.mimeType);
  console.log('Dosya URL:', result.data.url);
} else {
  console.error('Dosya getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "file_123456",
    "filename": "image.jpg",
    "originalName": "profile-photo.jpg",
    "size": 1048576,
    "mimeType": "image/jpeg",
    "url": "https://storage.zapi.com/files/file_123456.jpg",
    "publicUrl": "https://cdn.zapi.com/files/file_123456.jpg",
    "folder": "uploads/images",
    "isPublic": true,
    "metadata": {
      "title": "Profil fotoğrafı",
      "description": "Kullanıcı profil fotoğrafı"
    },
    "processing": {
      "status": "completed",
      "thumbnail": "https://storage.zapi.com/thumbnails/file_123456_thumb.jpg"
    },
    "security": {
      "virusScanned": true,
      "virusStatus": "clean"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 4. delete(fileId: string)

Dosyayı siler

**Parametreler:**
- `fileId: string` - Dosya ID'si

**Örnek Kullanım:**

```typescript
const result = await upload.delete('file_123456');

if (result.success) {
  console.log('Dosya silindi:', result.data);
} else {
  console.error('Dosya silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "file_123456",
    "deletedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 5. getStats()

Dosya yükleme istatistiklerini getirir

**Parametreler:**
- Yok

**Örnek Kullanım:**

```typescript
const result = await upload.getStats();

if (result.success) {
  console.log('Yükleme istatistikleri:', result.data);
  console.log('Toplam dosya sayısı:', result.data.totalFiles);
  console.log('Toplam boyut:', result.data.totalSize);
  console.log('Kullanılan alan:', result.data.usedSpace);
} else {
  console.error('İstatistik getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "totalFiles": 150,
    "totalSize": 1073741824,
    "usedSpace": "1.0 GB",
    "availableSpace": "9.0 GB",
    "publicFiles": 120,
    "privateFiles": 30,
    "byType": {
      "image": 80,
      "video": 20,
      "document": 30,
      "audio": 15,
      "other": 5
    },
    "byFolder": {
      "uploads/images": 60,
      "uploads/videos": 20,
      "uploads/documents": 30,
      "uploads/audio": 15,
      "uploads/other": 5
    },
    "recentUploads": 25,
    "lastUpload": "2024-01-15T10:30:00Z"
  }
}
```

---

### 6. cleanup()

Gereksiz dosyaları temizler

**Parametreler:**
- Yok

**Örnek Kullanım:**

```typescript
const result = await upload.cleanup();

if (result.success) {
  console.log('Temizlik tamamlandı:', result.data);
  console.log('Silinen dosya sayısı:', result.data.deletedFiles);
  console.log('Kazanılan alan:', result.data.freedSpace);
} else {
  console.error('Temizlik hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "deletedFiles": 15,
    "freedSpace": 52428800,
    "freedSpaceFormatted": "50 MB",
    "cleanupType": "orphaned_files",
    "cleanedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 7. getProgress(uploadId: string)

Belirli yükleme işleminin ilerlemesini getirir

**Parametreler:**
- `uploadId: string` - Yükleme ID'si

**Örnek Kullanım:**

```typescript
const result = await upload.getProgress('upload_789');

if (result.success) {
  console.log('Yükleme ilerlemesi:', result.data);
  console.log('İlerleme yüzdesi:', result.data.progress + '%');
  console.log('Durum:', result.data.status);
} else {
  console.error('İlerleme getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "uploadId": "upload_789",
    "filename": "large-video.mp4",
    "status": "uploading",
    "progress": 65,
    "bytesUploaded": 65536000,
    "totalBytes": 100663296,
    "speed": 1048576,
    "estimatedTime": 35,
    "startedAt": "2024-01-15T10:25:00Z",
    "lastUpdate": "2024-01-15T10:28:30Z"
  }
}
```

---

### 8. getAllProgress()

Tüm aktif yükleme işlemlerinin ilerlemesini getirir

**Parametreler:**
- Yok

**Örnek Kullanım:**

```typescript
const result = await upload.getAllProgress();

if (result.success) {
  console.log('Tüm yükleme işlemleri:', result.data);
  result.data.uploads.forEach(upload => {
    console.log(`${upload.filename}: ${upload.progress}%`);
  });
} else {
  console.error('İlerleme listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "uploads": [
      {
        "uploadId": "upload_789",
        "filename": "video.mp4",
        "status": "uploading",
        "progress": 65,
        "speed": 1048576
      },
      {
        "uploadId": "upload_790",
        "filename": "image.jpg",
        "status": "processing",
        "progress": 100,
        "speed": 0
      }
    ],
    "totalActive": 2
  }
}
```

---

### 9. createSignedUrl(fileId: string, options: any)

Dosya için imzalı URL oluşturur

**Parametreler:**
- `fileId: string` - Dosya ID'si
- `options: any` - URL seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await upload.createSignedUrl('file_123456', {
  expiresIn: 3600,
  download: true,
  filename: 'custom-name.jpg'
});

if (result.success) {
  console.log('İmzalı URL:', result.data.url);
  console.log('Son kullanma:', result.data.expiresAt);
} else {
  console.error('İmzalı URL oluşturma hatası:', result.error);
}

// Farklı seçeneklerle
const downloadUrl = await upload.createSignedUrl('file_123456', {
  expiresIn: 7200,
  download: true,
  responseContentType: 'image/jpeg'
});

const viewUrl = await upload.createSignedUrl('file_123456', {
  expiresIn: 1800,
  download: false
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "url": "https://storage.zapi.com/files/file_123456.jpg?signature=abc123&expires=1705312800",
    "expiresAt": "2024-01-15T11:30:00Z",
    "expiresIn": 3600,
    "download": true,
    "filename": "custom-name.jpg"
  }
}
```

---

## Desteklenen Dosya Türleri

### Görsel Dosyalar
- **JPEG** (.jpg, .jpeg)
- **PNG** (.png)
- **GIF** (.gif)
- **WebP** (.webp)
- **SVG** (.svg)

### Video Dosyalar
- **MP4** (.mp4)
- **AVI** (.avi)
- **MOV** (.mov)
- **MKV** (.mkv)
- **WebM** (.webm)

### Ses Dosyalar
- **MP3** (.mp3)
- **WAV** (.wav)
- **AAC** (.aac)
- **FLAC** (.flac)
- **OGG** (.ogg)

### Belge Dosyalar
- **PDF** (.pdf)
- **DOC** (.doc)
- **DOCX** (.docx)
- **XLS** (.xls)
- **XLSX** (.xlsx)
- **PPT** (.ppt)
- **PPTX** (.pptx)

### Arşiv Dosyalar
- **ZIP** (.zip)
- **RAR** (.rar)
- **7Z** (.7z)
- **TAR** (.tar)
- **GZ** (.gz)

## Dosya Boyut Limitleri

| Tür | Maksimum Boyut |
|-----|----------------|
| Görsel | 10MB |
| Video | 100MB |
| Ses | 25MB |
| Belge | 50MB |
| Arşiv | 100MB |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `UPLOAD_FAILED` | Dosya yüklenemedi |
| `FILE_TOO_LARGE` | Dosya çok büyük |
| `INVALID_FILE_TYPE` | Geçersiz dosya türü |
| `FILE_NOT_FOUND` | Dosya bulunamadı |
| `UPLOAD_QUOTA_EXCEEDED` | Yükleme kotası aşıldı |
| `VIRUS_DETECTED` | Virüs tespit edildi |

## Güvenlik Notları

- Dosyaları virüs taramasından geçirin
- Hassas dosyaları şifreleyin
- Dosya erişim izinlerini kontrol edin
- Düzenli güvenlik güncellemeleri yapın

## Dosya Yükleme Yönetimi

```typescript
// Dosya yükle
const upload = await upload.upload('/path/to/file.jpg', {
  folder: 'images',
  public: true
});

// Dosyaları listele
const files = await upload.list({
  folder: 'images'
});

// Dosya detayları
const file = await upload.get('file_123');

// İmzalı URL oluştur
const signedUrl = await upload.createSignedUrl('file_123', {
  expiresIn: 3600
});

// Dosyayı sil
await upload.delete('file_123');
```
