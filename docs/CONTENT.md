# Content Endpoint

İçerik yönetimi endpoint'leri - İçerik oluşturma, güncelleme, arama, kategoriler ve metadata yönetimi.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const content = zapi.content;
```

## Metodlar

### 1. list(options: any)

İçerikleri listeler

**Parametreler:**
- `options: any` - Filtreleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm içerikleri getir
const result = await content.list();

// Filtreleme ile getir
const result = await content.list({
  limit: 10,
  offset: 0,
  category: "tutorial",
  status: "published"
});

if (result.success) {
  console.log('İçerikler:', result.data);
} else {
  console.error('İçerik listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "contents": [
      {
        "id": "content_123",
        "title": "React Native Başlangıç Rehberi",
        "slug": "react-native-baslangic-rehberi",
        "category": "tutorial",
        "type": "article",
        "status": "published",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  },
  "message": "İçerikler başarıyla listelendi"
}
```

---

### 2. create(data: any)

Yeni içerik oluşturur

**Parametreler:**
- `data: any` - İçerik bilgileri

**Örnek Kullanım:**

```typescript
const result = await content.create({
  title: "React Native Başlangıç Rehberi",
  slug: "react-native-baslangic-rehberi",
  content: "React Native ile mobil uygulama geliştirme...",
  category: "tutorial",
  type: "article",
  status: "draft",
  tags: ["react-native", "mobile", "tutorial"],
  metadata: {
    author: "John Doe",
    readingTime: 5
  }
});

if (result.success) {
  console.log('İçerik oluşturuldu:', result.data);
} else {
  console.error('İçerik oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "content_123",
    "title": "React Native Başlangıç Rehberi",
    "slug": "react-native-baslangic-rehberi",
    "category": "tutorial",
    "type": "article",
    "status": "draft",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "İçerik başarıyla oluşturuldu"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "İçerik başlığı zaten kullanılıyor"
  }
}
```

---

### 3. get(contentId: string)

Belirli bir içeriği getirir

**Parametreler:**
- `contentId: string` - İçerik ID'si

**Örnek Kullanım:**

```typescript
const result = await content.get("content_123");

if (result.success) {
  console.log('İçerik detayı:', result.data);
  const { title, content, category, tags } = result.data;
} else {
  console.error('İçerik getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "content_123",
    "title": "React Native Başlangıç Rehberi",
    "slug": "react-native-baslangic-rehberi",
    "content": "React Native ile mobil uygulama geliştirme...",
    "category": "tutorial",
    "type": "article",
    "status": "published",
    "tags": ["react-native", "mobile", "tutorial"],
    "metadata": {
      "author": "John Doe",
      "readingTime": 5
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "İçerik başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "CONTENT_NOT_FOUND",
    "message": "İçerik bulunamadı"
  }
}
```

---

### 4. update(contentId: string, data: any)

İçeriği günceller

**Parametreler:**
- `contentId: string` - İçerik ID'si
- `data: any` - Güncellenecek bilgiler

**Örnek Kullanım:**

```typescript
const result = await content.update("content_123", {
  title: "Güncellenmiş React Native Rehberi",
  content: "Güncellenmiş içerik...",
  status: "published"
});

if (result.success) {
  console.log('İçerik güncellendi:', result.data);
} else {
  console.error('İçerik güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "content_123",
    "title": "Güncellenmiş React Native Rehberi",
    "status": "published",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "İçerik başarıyla güncellendi"
}
```

---

### 5. delete(contentId: string)

İçeriği siler

**Parametreler:**
- `contentId: string` - İçerik ID'si

**Örnek Kullanım:**

```typescript
const result = await content.delete("content_123");

if (result.success) {
  console.log('İçerik silindi');
} else {
  console.error('İçerik silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "İçerik başarıyla silindi"
}
```

---

### 6. getCategories()

İçerik kategorilerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await content.getCategories();

if (result.success) {
  console.log('Kategoriler:', result.data);
} else {
  console.error('Kategori getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "tutorial",
        "name": "Tutorial",
        "description": "Öğretici içerikler",
        "count": 25
      },
      {
        "id": "news",
        "name": "Haberler",
        "description": "Güncel haberler",
        "count": 10
      }
    ]
  },
  "message": "Kategoriler başarıyla getirildi"
}
```

---

### 7. getTypes()

İçerik tiplerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await content.getTypes();

if (result.success) {
  console.log('İçerik tipleri:', result.data);
} else {
  console.error('İçerik tipi getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "types": [
      {
        "id": "article",
        "name": "Makale",
        "description": "Uzun form içerik"
      },
      {
        "id": "news",
        "name": "Haber",
        "description": "Kısa haber içeriği"
      },
      {
        "id": "video",
        "name": "Video",
        "description": "Video içerik"
      }
    ]
  },
  "message": "İçerik tipleri başarıyla getirildi"
}
```

---

### 8. getLanguages()

Desteklenen dilleri getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await content.getLanguages();

if (result.success) {
  console.log('Desteklenen diller:', result.data);
} else {
  console.error('Dil getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "languages": [
      {
        "code": "tr",
        "name": "Türkçe",
        "nativeName": "Türkçe"
      },
      {
        "code": "en",
        "name": "English",
        "nativeName": "English"
      }
    ]
  },
  "message": "Diller başarıyla getirildi"
}
```

---

### 9. searchAdvanced(options: any)

Gelişmiş içerik arama yapar

**Parametreler:**
- `options: any` - Arama seçenekleri

**Örnek Kullanım:**

```typescript
const result = await content.searchAdvanced({
  query: "react native",
  category: "tutorial",
  type: "article",
  language: "tr",
  dateFrom: "2024-01-01",
  dateTo: "2024-12-31",
  tags: ["mobile", "development"],
  limit: 20,
  offset: 0
});

if (result.success) {
  console.log('Arama sonuçları:', result.data);
} else {
  console.error('Arama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "content_123",
        "title": "React Native Başlangıç Rehberi",
        "slug": "react-native-baslangic-rehberi",
        "excerpt": "React Native ile mobil uygulama geliştirme...",
        "category": "tutorial",
        "type": "article",
        "relevanceScore": 0.95
      }
    ],
    "total": 1,
    "query": "react native",
    "filters": {
      "category": "tutorial",
      "type": "article"
    }
  },
  "message": "Arama başarıyla tamamlandı"
}
```

---

### 10. getStats()

İçerik istatistiklerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await content.getStats();

if (result.success) {
  console.log('İçerik istatistikleri:', result.data);
} else {
  console.error('İstatistik getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "total": 150,
    "published": 120,
    "draft": 25,
    "archived": 5,
    "byCategory": {
      "tutorial": 50,
      "news": 30,
      "guide": 40,
      "other": 30
    },
    "byType": {
      "article": 100,
      "news": 30,
      "video": 20
    }
  },
  "message": "İstatistikler başarıyla getirildi"
}
```

---

### 11. getMetadata(contentId: string, path: string)

İçerik metadata bilgilerini getirir

**Parametreler:**
- `contentId: string` - İçerik ID'si
- `path: string` - Metadata yolu (varsayılan: '')

**Örnek Kullanım:**

```typescript
// Tüm metadata'yı getir
const result = await content.getMetadata("content_123");

// Belirli bir path'i getir
const result = await content.getMetadata("content_123", "seo.title");

if (result.success) {
  console.log('Metadata:', result.data);
} else {
  console.error('Metadata getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "seo": {
      "title": "React Native Başlangıç Rehberi",
      "description": "React Native ile mobil uygulama geliştirme rehberi",
      "keywords": ["react-native", "mobile", "tutorial"]
    },
    "author": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  "message": "Metadata başarıyla getirildi"
}
```

---

### 12. updateMetadata(contentId: string, path: string, value: any)

İçerik metadata bilgilerini günceller

**Parametreler:**
- `contentId: string` - İçerik ID'si
- `path: string` - Metadata yolu
- `value: any` - Güncellenecek değer

**Örnek Kullanım:**

```typescript
const result = await content.updateMetadata("content_123", "seo.title", "Yeni Başlık");

if (result.success) {
  console.log('Metadata güncellendi:', result.data);
} else {
  console.error('Metadata güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "seo": {
      "title": "Yeni Başlık",
      "description": "React Native ile mobil uygulama geliştirme rehberi",
      "keywords": ["react-native", "mobile", "tutorial"]
    }
  },
  "message": "Metadata başarıyla güncellendi"
}
```

---

### 13. deleteMetadata(contentId: string, path: string)

İçerik metadata bilgilerini siler

**Parametreler:**
- `contentId: string` - İçerik ID'si
- `path: string` - Metadata yolu

**Örnek Kullanım:**

```typescript
const result = await content.deleteMetadata("content_123", "seo.keywords");

if (result.success) {
  console.log('Metadata silindi');
} else {
  console.error('Metadata silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "Metadata başarıyla silindi"
}
```

---

### 14. getPublic(slug: string)

Genel erişime açık içeriği getirir

**Parametreler:**
- `slug: string` - İçerik slug'ı

**Örnek Kullanım:**

```typescript
const result = await content.getPublic("react-native-baslangic-rehberi");

if (result.success) {
  console.log('Genel içerik:', result.data);
} else {
  console.error('Genel içerik getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "content_123",
    "title": "React Native Başlangıç Rehberi",
    "slug": "react-native-baslangic-rehberi",
    "content": "React Native ile mobil uygulama geliştirme...",
    "category": "tutorial",
    "type": "article",
    "tags": ["react-native", "mobile", "tutorial"],
    "author": "John Doe",
    "publishedAt": "2024-01-15T10:30:00Z"
  },
  "message": "İçerik başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "CONTENT_NOT_PUBLIC",
    "message": "İçerik genel erişime açık değil"
  }
}
```

---

## İçerik Durumları

| Durum | Açıklama |
|-------|----------|
| `draft` | Taslak - Henüz yayınlanmamış |
| `published` | Yayınlanmış - Genel erişime açık |
| `archived` | Arşivlenmiş - Eski içerik |
| `private` | Özel - Sadece yetkili kullanıcılar |

## İçerik Tipleri

| Tip | Açıklama |
|-----|----------|
| `article` | Uzun form makale |
| `news` | Kısa haber |
| `video` | Video içerik |
| `tutorial` | Adım adım öğretici |
| `guide` | Rehber |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `CONTENT_NOT_FOUND` | İçerik bulunamadı |
| `CONTENT_NOT_PUBLIC` | İçerik genel erişime açık değil |
| `VALIDATION_ERROR` | Geçersiz parametreler |
| `SLUG_ALREADY_EXISTS` | Slug zaten kullanılıyor |
| `CATEGORY_NOT_FOUND` | Kategori bulunamadı |
| `TYPE_NOT_FOUND` | İçerik tipi bulunamadı |
| `METADATA_NOT_FOUND` | Metadata bulunamadı |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## SEO ve Metadata

İçerikler için SEO optimizasyonu:

```typescript
// SEO metadata ekle
await content.updateMetadata("content_123", "seo", {
  title: "React Native Başlangıç Rehberi",
  description: "React Native ile mobil uygulama geliştirme rehberi",
  keywords: ["react-native", "mobile", "tutorial"],
  ogImage: "https://example.com/og-image.jpg"
});
```
