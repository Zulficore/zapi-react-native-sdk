# Upload Endpoint - 9 Metod

Dosya yükleme için kullanılan endpoint.

## Metodlar

### 1. upload(data: any): Promise<ApiResponse>
Dosya yükler.

**Parametreler:**
- `data` (any): Yükleme verileri
  - `file` (File): Yüklenecek dosya
  - `type` (string): Dosya tipi
  - `folder` (string): Klasör

**Detaylı Örnek:**
```typescript
const upload = await zapi.upload.upload({
  file: fileObject,
  type: 'image',
  folder: 'uploads'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Dosya başarıyla yüklendi",
  "data": {
    "upload": {
      "id": "upload_64f8a1b2c3d4e5f6g7h8i9j0",
      "filename": "image.jpg",
      "originalName": "my-image.jpg",
      "type": "image",
      "size": "2.5MB",
      "url": "https://api.zapi.com/uploads/upload_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
      "folder": "uploads",
      "mimeType": "image/jpeg",
      "dimensions": {
        "width": 1920,
        "height": 1080
      },
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 2. list(options: any = {}): Promise<ApiResponse>
Yüklenen dosyaları listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `type` (string): Dosya tipi
  - `folder` (string): Klasör

**Detaylı Örnek:**
```typescript
const uploads = await zapi.upload.list({
  limit: 10,
  page: 1,
  type: 'image',
  folder: 'uploads'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yüklenen dosyalar getirildi",
  "data": {
    "uploads": [
      {
        "id": "upload_64f8a1b2c3d4e5f6g7h8i9j0",
        "filename": "image.jpg",
        "originalName": "my-image.jpg",
        "type": "image",
        "size": "2.5MB",
        "url": "https://api.zapi.com/uploads/upload_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
        "folder": "uploads",
        "mimeType": "image/jpeg",
        "dimensions": {
          "width": 1920,
          "height": 1080
        },
        "createdAt": "2024-01-15T10:40:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 15,
      "itemsPerPage": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
*/
```

### 3. get(uploadId: string): Promise<ApiResponse>
Belirli bir dosyanın detaylarını getirir.

**Parametreler:**
- `uploadId` (string): Yükleme ID'si

**Detaylı Örnek:**
```typescript
const upload = await zapi.upload.get('upload_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Dosya detayları getirildi",
  "data": {
    "upload": {
      "id": "upload_64f8a1b2c3d4e5f6g7h8i9j0",
      "filename": "image.jpg",
      "originalName": "my-image.jpg",
      "type": "image",
      "size": "2.5MB",
      "url": "https://api.zapi.com/uploads/upload_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
      "folder": "uploads",
      "mimeType": "image/jpeg",
      "dimensions": {
        "width": 1920,
        "height": 1080
      },
      "metadata": {
        "camera": "iPhone 12",
        "location": "Istanbul, Turkey",
        "tags": ["nature", "landscape"]
      },
      "stats": {
        "downloads": 25,
        "views": 150,
        "lastAccessed": "2024-01-15T10:30:00Z"
      },
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 4. update(uploadId: string, data: any): Promise<ApiResponse>
Belirli bir dosyayı günceller.

**Parametreler:**
- `uploadId` (string): Yükleme ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.upload.update('upload_64f8a1b2c3d4e5f6g7h8i9j0', {
  filename: 'updated-image.jpg',
  folder: 'images',
  metadata: {
    camera: 'iPhone 13',
    location: 'Istanbul, Turkey',
    tags: ['nature', 'landscape', 'updated']
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Dosya başarıyla güncellendi",
  "data": {
    "upload": {
      "id": "upload_64f8a1b2c3d4e5f6g7h8i9j0",
      "filename": "updated-image.jpg",
      "originalName": "my-image.jpg",
      "type": "image",
      "size": "2.5MB",
      "url": "https://api.zapi.com/uploads/upload_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
      "folder": "images",
      "mimeType": "image/jpeg",
      "dimensions": {
        "width": 1920,
        "height": 1080
      },
      "metadata": {
        "camera": "iPhone 13",
        "location": "Istanbul, Turkey",
        "tags": ["nature", "landscape", "updated"]
      },
      "stats": {
        "downloads": 25,
        "views": 150,
        "lastAccessed": "2024-01-15T10:30:00Z"
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 5. delete(uploadId: string): Promise<ApiResponse>
Belirli bir dosyayı siler.

**Parametreler:**
- `uploadId` (string): Yükleme ID'si

**Detaylı Örnek:**
```typescript
const deleteUpload = await zapi.upload.delete('upload_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Dosya başarıyla silindi",
  "data": {
    "deleted": {
      "id": "upload_64f8a1b2c3d4e5f6g7h8i9j0",
      "filename": "updated-image.jpg",
      "deletedAt": "2024-01-15T10:40:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. download(uploadId: string): Promise<ApiResponse>
Belirli bir dosyayı indirir.

**Parametreler:**
- `uploadId` (string): Yükleme ID'si

**Detaylı Örnek:**
```typescript
const download = await zapi.upload.download('upload_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Dosya indirme başlatıldı",
  "data": {
    "download": {
      "id": "upload_64f8a1b2c3d4e5f6g7h8i9j0",
      "filename": "updated-image.jpg",
      "url": "https://api.zapi.com/uploads/upload_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
      "size": "2.5MB",
      "mimeType": "image/jpeg",
      "downloadUrl": "https://api.zapi.com/download/upload_64f8a1b2c3d4e5f6g7h8i9j0",
      "expiresAt": "2024-01-15T11:40:00Z",
      "downloadedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 7. getStats(): Promise<ApiResponse>
Yükleme istatistiklerini getirir.

**Detaylı Örnek:**
```typescript
const stats = await zapi.upload.getStats();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Yükleme istatistikleri getirildi",
  "data": {
    "stats": {
      "overview": {
        "totalFiles": 1250,
        "totalSize": "25.5GB",
        "totalDownloads": 12500,
        "totalViews": 75000
      },
      "byType": [
        {
          "type": "image",
          "count": 800,
          "size": "15.2GB",
          "percentage": 64.0
        },
        {
          "type": "video",
          "count": 300,
          "size": "8.5GB",
          "percentage": 24.0
        },
        {
          "type": "document",
          "count": 150,
          "size": "1.8GB",
          "percentage": 12.0
        }
      ],
      "byFolder": [
        {
          "folder": "uploads",
          "count": 500,
          "size": "10.2GB"
        },
        {
          "folder": "images",
          "count": 400,
          "size": "8.5GB"
        },
        {
          "folder": "documents",
          "count": 350,
          "size": "6.8GB"
        }
      ],
      "recent": {
        "uploadsToday": 25,
        "uploadsThisWeek": 150,
        "uploadsThisMonth": 600
      }
    }
  }
}
*/
```

### 8. getMetadata(uploadId: string, path: string): Promise<ApiResponse>
Dosya metadata bilgilerini getirir.

**Parametreler:**
- `uploadId` (string): Yükleme ID'si
- `path` (string): Metadata path'i

**Detaylı Örnek:**
```typescript
const metadata = await zapi.upload.getMetadata('upload_64f8a1b2c3d4e5f6g7h8i9j0', 'exif');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata getirildi",
  "data": {
    "metadata": {
      "uploadId": "upload_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "exif",
      "value": {
        "camera": "iPhone 13",
        "lens": "iPhone 13 back dual camera 1.57mm f/1.6",
        "iso": 100,
        "aperture": "f/1.6",
        "shutterSpeed": "1/120",
        "focalLength": "1.57mm",
        "flash": "No Flash",
        "whiteBalance": "Auto",
        "exposureMode": "Auto",
        "meteringMode": "Multi-segment"
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 9. updateMetadata(uploadId: string, path: string, value: any): Promise<ApiResponse>
Dosya metadata bilgilerini günceller.

**Parametreler:**
- `uploadId` (string): Yükleme ID'si
- `path` (string): Metadata path'i
- `value` (any): Güncellenecek değer

**Detaylı Örnek:**
```typescript
const updateMetadata = await zapi.upload.updateMetadata('upload_64f8a1b2c3d4e5f6g7h8i9j0', 'exif', {
  camera: 'iPhone 14',
  lens: 'iPhone 14 back dual camera 1.57mm f/1.6',
  iso: 200,
  aperture: 'f/1.6',
  shutterSpeed: '1/60',
  focalLength: '1.57mm',
  flash: 'No Flash',
  whiteBalance: 'Auto',
  exposureMode: 'Auto',
  meteringMode: 'Multi-segment'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Metadata başarıyla güncellendi",
  "data": {
    "metadata": {
      "uploadId": "upload_64f8a1b2c3d4e5f6g7h8i9j0",
      "path": "exif",
      "value": {
        "camera": "iPhone 14",
        "lens": "iPhone 14 back dual camera 1.57mm f/1.6",
        "iso": 200,
        "aperture": "f/1.6",
        "shutterSpeed": "1/60",
        "focalLength": "1.57mm",
        "flash": "No Flash",
        "whiteBalance": "Auto",
        "exposureMode": "Auto",
        "meteringMode": "Multi-segment"
      },
      "updatedAt": "2024-01-15T10:40:00Z"
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
  // 1. Dosya yükle
  const upload = await zapi.upload.upload({
    file: fileObject,
    type: 'image',
    folder: 'uploads'
  });
  const uploadId = upload.data.upload.id;
  console.log('Dosya yüklendi:', uploadId);
  console.log('Dosya URL:', upload.data.upload.url);
  
  // 2. Yüklenen dosyaları listele
  const uploads = await zapi.upload.list({
    limit: 10,
    page: 1,
    type: 'image',
    folder: 'uploads'
  });
  console.log('Toplam dosya:', uploads.data.pagination.totalItems);
  
  // 3. Dosya detayını getir
  const uploadDetail = await zapi.upload.get(uploadId);
  console.log('Dosya adı:', uploadDetail.data.upload.filename);
  console.log('Dosya boyutu:', uploadDetail.data.upload.size);
  
  // 4. Dosya güncelle
  const update = await zapi.upload.update(uploadId, {
    filename: 'updated-image.jpg',
    folder: 'images',
    metadata: {
      camera: 'iPhone 13',
      location: 'Istanbul, Turkey',
      tags: ['nature', 'landscape', 'updated']
    }
  });
  console.log('Dosya güncellendi:', update.data.upload.updatedAt);
  
  // 5. Dosya indir
  const download = await zapi.upload.download(uploadId);
  console.log('İndirme URL:', download.data.download.downloadUrl);
  console.log('Son kullanma:', download.data.download.expiresAt);
  
  // 6. Yükleme istatistiklerini getir
  const stats = await zapi.upload.getStats();
  console.log('Toplam dosya:', stats.data.stats.overview.totalFiles);
  console.log('Toplam boyut:', stats.data.stats.overview.totalSize);
  
  // 7. Metadata getir
  const metadata = await zapi.upload.getMetadata(uploadId, 'exif');
  console.log('Kamera:', metadata.data.metadata.value.camera);
  console.log('ISO:', metadata.data.metadata.value.iso);
  
  // 8. Metadata güncelle
  const updateMetadata = await zapi.upload.updateMetadata(uploadId, 'exif', {
    camera: 'iPhone 14',
    iso: 200,
    aperture: 'f/1.6'
  });
  console.log('Metadata güncellendi:', updateMetadata.data.metadata.updatedAt);
  
  // 9. Dosya sil
  const deleteUpload = await zapi.upload.delete(uploadId);
  console.log('Dosya silindi:', deleteUpload.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
