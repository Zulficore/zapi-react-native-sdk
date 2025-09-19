# Docs Endpoint

Dokümantasyon yönetimi endpoint'leri - Dokümantasyon listesi ve içerik getirme.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const docs = zapi.docs;
```

## Metodlar

### 1. list()

Dokümantasyon listesini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await docs.list();

if (result.success) {
  console.log('Dokümantasyon listesi:', result.data);
  result.data.documents.forEach(doc => {
    console.log(`- ${doc.title} (${doc.filename})`);
  });
} else {
  console.error('Dokümantasyon listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "documents": [
      {
        "filename": "README.md",
        "title": "ZAPI React Native SDK",
        "description": "Ana dokümantasyon ve kurulum rehberi",
        "category": "getting-started",
        "version": "1.0.0",
        "lastUpdated": "2024-01-15T10:30:00Z",
        "size": {
          "bytes": 15420,
          "human": "15.1 KB"
        },
        "metadata": {
          "author": "ZAPI Team",
          "language": "tr",
          "tags": ["sdk", "react-native", "getting-started"],
          "difficulty": "beginner"
        },
        "url": "https://docs.zapi.com/README.md",
        "downloadUrl": "https://docs.zapi.com/download/README.md"
      },
      {
        "filename": "API-REFERENCE.md",
        "title": "API Referansı",
        "description": "Tüm endpoint'lerin detaylı dokümantasyonu",
        "category": "reference",
        "version": "1.0.0",
        "lastUpdated": "2024-01-15T10:30:00Z",
        "size": {
          "bytes": 125000,
          "human": "122.1 KB"
        },
        "metadata": {
          "author": "ZAPI Team",
          "language": "tr",
          "tags": ["api", "reference", "endpoints"],
          "difficulty": "intermediate"
        },
        "url": "https://docs.zapi.com/API-REFERENCE.md",
        "downloadUrl": "https://docs.zapi.com/download/API-REFERENCE.md"
      },
      {
        "filename": "EXAMPLES.md",
        "title": "Kullanım Örnekleri",
        "description": "Pratik kullanım örnekleri ve kod snippet'leri",
        "category": "examples",
        "version": "1.0.0",
        "lastUpdated": "2024-01-15T10:30:00Z",
        "size": {
          "bytes": 85000,
          "human": "83.0 KB"
        },
        "metadata": {
          "author": "ZAPI Team",
          "language": "tr",
          "tags": ["examples", "code", "tutorials"],
          "difficulty": "beginner"
        },
        "url": "https://docs.zapi.com/EXAMPLES.md",
        "downloadUrl": "https://docs.zapi.com/download/EXAMPLES.md"
      },
      {
        "filename": "CHANGELOG.md",
        "title": "Değişiklik Geçmişi",
        "description": "SDK sürüm değişiklikleri ve güncellemeleri",
        "category": "changelog",
        "version": "1.0.0",
        "lastUpdated": "2024-01-15T10:30:00Z",
        "size": {
          "bytes": 25000,
          "human": "24.4 KB"
        },
        "metadata": {
          "author": "ZAPI Team",
          "language": "tr",
          "tags": ["changelog", "version", "updates"],
          "difficulty": "beginner"
        },
        "url": "https://docs.zapi.com/CHANGELOG.md",
        "downloadUrl": "https://docs.zapi.com/download/CHANGELOG.md"
      },
      {
        "filename": "TROUBLESHOOTING.md",
        "title": "Sorun Giderme",
        "description": "Yaygın sorunlar ve çözümleri",
        "category": "support",
        "version": "1.0.0",
        "lastUpdated": "2024-01-15T10:30:00Z",
        "size": {
          "bytes": 45000,
          "human": "43.9 KB"
        },
        "metadata": {
          "author": "ZAPI Team",
          "language": "tr",
          "tags": ["troubleshooting", "support", "faq"],
          "difficulty": "intermediate"
        },
        "url": "https://docs.zapi.com/TROUBLESHOOTING.md",
        "downloadUrl": "https://docs.zapi.com/download/TROUBLESHOOTING.md"
      },
      {
        "filename": "SECURITY.md",
        "title": "Güvenlik",
        "description": "Güvenlik en iyi uygulamaları ve önerileri",
        "category": "security",
        "version": "1.0.0",
        "lastUpdated": "2024-01-15T10:30:00Z",
        "size": {
          "bytes": 35000,
          "human": "34.2 KB"
        },
        "metadata": {
          "author": "ZAPI Team",
          "language": "tr",
          "tags": ["security", "best-practices", "authentication"],
          "difficulty": "advanced"
        },
        "url": "https://docs.zapi.com/SECURITY.md",
        "downloadUrl": "https://docs.zapi.com/download/SECURITY.md"
      }
    ],
    "categories": [
      {
        "name": "getting-started",
        "title": "Başlangıç",
        "description": "Kurulum ve temel kullanım",
        "documentCount": 1
      },
      {
        "name": "reference",
        "title": "Referans",
        "description": "API referansı ve detayları",
        "documentCount": 1
      },
      {
        "name": "examples",
        "title": "Örnekler",
        "description": "Kod örnekleri ve tutorial'lar",
        "documentCount": 1
      },
      {
        "name": "changelog",
        "title": "Değişiklikler",
        "description": "Sürüm notları ve güncellemeler",
        "documentCount": 1
      },
      {
        "name": "support",
        "title": "Destek",
        "description": "Sorun giderme ve yardım",
        "documentCount": 1
      },
      {
        "name": "security",
        "title": "Güvenlik",
        "description": "Güvenlik rehberi",
        "documentCount": 1
      }
    ],
    "summary": {
      "totalDocuments": 6,
      "totalSize": "323.7 KB",
      "lastUpdated": "2024-01-15T10:30:00Z",
      "version": "1.0.0",
      "language": "tr"
    }
  },
  "message": "Dokümantasyon listesi başarıyla getirildi"
}
```

---

### 2. get(filename: string)

Belirli bir dokümantasyonu getirir

**Parametreler:**
- `filename: string` - Dosya adı (örn: "README.md")

**Örnek Kullanım:**

```typescript
const result = await docs.get("README.md");

if (result.success) {
  console.log('Dokümantasyon içeriği:', result.data);
  const { content, metadata, format } = result.data;
} else {
  console.error('Dokümantasyon getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "filename": "README.md",
    "title": "ZAPI React Native SDK",
    "content": "# ZAPI React Native SDK\n\nZAPI React Native SDK, React Native uygulamalarınızda ZAPI servislerini kullanmanızı sağlayan resmi JavaScript/TypeScript kütüphanesidir.\n\n## Kurulum\n\n```bash\nnpm install zapi-react-native-sdk\n# veya\nyarn add zapi-react-native-sdk\n```\n\n## Hızlı Başlangıç\n\n```typescript\nimport ZAPI from 'zapi-react-native-sdk';\n\n// SDK'yı başlat\nconst zapi = new ZAPI({\n  apiKey: 'your-api-key',\n  baseUrl: 'https://api.zapi.com'\n});\n\n// Kullanıcı girişi\ntry {\n  const result = await zapi.auth.login({\n    email: 'user@example.com',\n    password: 'password123'\n  });\n  \n  if (result.success) {\n    console.log('Giriş başarılı:', result.data.user);\n    zapi.setBearerToken(result.data.token);\n  }\n} catch (error) {\n  console.error('Giriş hatası:', error);\n}\n```\n\n## Özellikler\n\n- ✅ **Kimlik Doğrulama** - Email, telefon ve OAuth desteği\n- ✅ **Kullanıcı Yönetimi** - Profil, avatar ve ayarlar\n- ✅ **Gerçek Zamanlı** - WebSocket ile anlık iletişim\n- ✅ **Dosya Yükleme** - Görsel, ses ve video desteği\n- ✅ **AI Entegrasyonu** - GPT-4, Claude ve Gemini\n- ✅ **Webhook'lar** - Olay tabanlı bildirimler\n- ✅ **TypeScript** - Tam tip desteği\n\n## Dokümantasyon\n\n- [API Referansı](./API-REFERENCE.md) - Tüm endpoint'ler\n- [Kullanım Örnekleri](./EXAMPLES.md) - Kod örnekleri\n- [Sorun Giderme](./TROUBLESHOOTING.md) - Yaygın sorunlar\n- [Güvenlik](./SECURITY.md) - Güvenlik rehberi\n\n## Destek\n\n- 📧 Email: support@zapi.com\n- 💬 Discord: [ZAPI Community](https://discord.gg/zapi)\n- 📖 Dokümantasyon: [docs.zapi.com](https://docs.zapi.com)\n- 🐛 Hata Bildirimi: [GitHub Issues](https://github.com/zulficore/zapi-react-native-sdk/issues)\n\n## Lisans\n\nMIT License - Detaylar için [LICENSE](./LICENSE) dosyasına bakın.\n",
    "format": "markdown",
    "metadata": {
      "author": "ZAPI Team",
      "version": "1.0.0",
      "language": "tr",
      "tags": ["sdk", "react-native", "getting-started"],
      "difficulty": "beginner",
      "lastUpdated": "2024-01-15T10:30:00Z",
      "wordCount": 245,
      "characterCount": 1250,
      "readingTime": "1 dakika"
    },
    "structure": {
      "headings": [
        {
          "level": 1,
          "text": "ZAPI React Native SDK",
          "line": 1
        },
        {
          "level": 2,
          "text": "Kurulum",
          "line": 5
        },
        {
          "level": 2,
          "text": "Hızlı Başlangıç",
          "line": 11
        },
        {
          "level": 2,
          "text": "Özellikler",
          "line": 35
        },
        {
          "level": 2,
          "text": "Dokümantasyon",
          "line": 43
        },
        {
          "level": 2,
          "text": "Destek",
          "line": 47
        },
        {
          "level": 2,
          "text": "Lisens",
          "line": 53
        }
      ],
      "codeBlocks": 2,
      "links": 8,
      "images": 0
    },
    "size": {
      "bytes": 15420,
      "human": "15.1 KB"
    },
    "url": "https://docs.zapi.com/README.md",
    "downloadUrl": "https://docs.zapi.com/download/README.md",
    "lastModified": "2024-01-15T10:30:00Z"
  },
  "message": "Dokümantasyon başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "DOCUMENT_NOT_FOUND",
    "message": "Dokümantasyon bulunamadı"
  }
}
```

---

## Dokümantasyon Kategorileri

| Kategori | Açıklama | İçerik |
|----------|----------|--------|
| `getting-started` | Başlangıç | Kurulum ve temel kullanım |
| `reference` | Referans | API referansı ve detayları |
| `examples` | Örnekler | Kod örnekleri ve tutorial'lar |
| `changelog` | Değişiklikler | Sürüm notları ve güncellemeler |
| `support` | Destek | Sorun giderme ve yardım |
| `security` | Güvenlik | Güvenlik rehberi |

## Dokümantasyon Formatları

| Format | Açıklama | Özellikler |
|--------|----------|------------|
| `markdown` | Markdown | Başlıklar, kod blokları, linkler |
| `html` | HTML | Zengin formatlama |
| `text` | Düz metin | Basit metin formatı |
| `json` | JSON | Yapılandırılmış veri |

## Zorluk Seviyeleri

| Seviye | Açıklama | Hedef Kitle |
|--------|----------|-------------|
| `beginner` | Başlangıç | Yeni kullanıcılar |
| `intermediate` | Orta | Deneyimli geliştiriciler |
| `advanced` | İleri | Uzman geliştiriciler |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `DOCUMENT_NOT_FOUND` | Dokümantasyon bulunamadı |
| `INVALID_FILENAME` | Geçersiz dosya adı |
| `ACCESS_DENIED` | Erişim reddedildi |
| `FILE_TOO_LARGE` | Dosya çok büyük |
| `UNSUPPORTED_FORMAT` | Desteklenmeyen format |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Dokümantasyon erişimini kontrol edin
- Hassas bilgileri dokümantasyonda saklamayın
- Dosya boyutlarını sınırlayın
- Güvenli dosya yükleme kullanın
- Düzenli olarak güvenlik denetimleri yapın

## Dokümantasyon Yönetimi

```typescript
// Dokümantasyon listesi
const docsList = await docs.list();

// Kategori bazlı filtreleme
const gettingStartedDocs = docsList.data.documents.filter(
  doc => doc.category === 'getting-started'
);

// Dokümantasyon içeriği
const readmeContent = await docs.get('README.md');
console.log('Başlık:', readmeContent.data.title);
console.log('İçerik:', readmeContent.data.content);
```

## Dokümantasyon Arama

```typescript
// Dokümantasyon listesi ve arama
const docsList = await docs.list();

// Başlık bazlı arama
const searchTerm = 'SDK';
const matchingDocs = docsList.data.documents.filter(doc =>
  doc.title.toLowerCase().includes(searchTerm.toLowerCase())
);

// Tag bazlı arama
const sdkDocs = docsList.data.documents.filter(doc =>
  doc.metadata.tags.includes('sdk')
);

// Zorluk seviyesi bazlı filtreleme
const beginnerDocs = docsList.data.documents.filter(doc =>
  doc.metadata.difficulty === 'beginner'
);
```

## Dokümantasyon Analizi

```typescript
// Dokümantasyon içeriği analizi
const doc = await docs.get('README.md');

// Başlık yapısı
const headings = doc.data.structure.headings;
headings.forEach(heading => {
  console.log(`${'  '.repeat(heading.level - 1)}${heading.text}`);
});

// İçerik istatistikleri
const metadata = doc.data.metadata;
console.log('Kelime sayısı:', metadata.wordCount);
console.log('Karakter sayısı:', metadata.characterCount);
console.log('Okuma süresi:', metadata.readingTime);

// Kod blokları
console.log('Kod bloku sayısı:', doc.data.structure.codeBlocks);
console.log('Link sayısı:', doc.data.structure.links);
```

## Dokümantasyon İndirme

```typescript
// Dokümantasyon indirme URL'si
const doc = await docs.get('README.md');
const downloadUrl = doc.data.downloadUrl;

// Dosya indirme (React Native)
import RNFS from 'react-native-fs';

const downloadPath = `${RNFS.DocumentDirectoryPath}/README.md`;
const downloadResult = await RNFS.downloadFile({
  fromUrl: downloadUrl,
  toFile: downloadPath,
}).promise;

if (downloadResult.statusCode === 200) {
  console.log('Dokümantasyon indirildi:', downloadPath);
}
```

## Dokümantasyon Kategorileri

```typescript
// Kategori bazlı dokümantasyon
const docsList = await docs.list();

// Kategori istatistikleri
const categories = docsList.data.categories;
categories.forEach(category => {
  console.log(`${category.title}: ${category.documentCount} dokümantasyon`);
  console.log(`Açıklama: ${category.description}`);
});

// En çok dokümantasyon olan kategori
const topCategory = categories.reduce((prev, current) =>
  prev.documentCount > current.documentCount ? prev : current
);
console.log('En popüler kategori:', topCategory.title);
```

## Dokümantasyon Versiyonlama

```typescript
// Dokümantasyon versiyonu
const docsList = await docs.list();

// Versiyon bilgisi
const summary = docsList.data.summary;
console.log('Mevcut versiyon:', summary.version);
console.log('Son güncelleme:', summary.lastUpdated);

// Versiyon bazlı filtreleme
const currentVersionDocs = docsList.data.documents.filter(doc =>
  doc.version === summary.version
);
```
