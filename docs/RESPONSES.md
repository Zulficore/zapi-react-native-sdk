# Responses Endpoint

Yanıt yönetimi endpoint'leri - Yanıt oluşturma, listeleme, arama, silme ve istatistikler.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const responses = zapi.responses;
```

## Metodlar

### 1. create(data: any)

Yeni yanıt oluşturur

**Parametreler:**
- `data: any` - Yanıt verileri

**Örnek Kullanım:**

```typescript
const result = await responses.create({
  title: "Hoş Geldiniz Yanıtı",
  content: "Merhaba! Size nasıl yardımcı olabilirim?",
  type: "greeting",
  category: "welcome",
  language: "tr",
  tags: ["welcome", "greeting", "automated"],
  metadata: {
    author: "user_123",
    version: "1.0.0",
    priority: "high"
  },
  conditions: {
    userType: "new",
    timeOfDay: "morning"
  },
  responses: {
    success: "Yanıt başarıyla oluşturuldu",
    error: "Yanıt oluşturulamadı"
  }
});

if (result.success) {
  console.log('Yanıt oluşturuldu:', result.data);
  const { id, title, type, createdAt } = result.data;
} else {
  console.error('Yanıt oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "response_123",
    "title": "Hoş Geldiniz Yanıtı",
    "content": "Merhaba! Size nasıl yardımcı olabilirim?",
    "type": "greeting",
    "category": "welcome",
    "language": "tr",
    "tags": ["welcome", "greeting", "automated"],
    "metadata": {
      "author": "user_123",
      "version": "1.0.0",
      "priority": "high",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "conditions": {
      "userType": "new",
      "timeOfDay": "morning"
    },
    "responses": {
      "success": "Yanıt başarıyla oluşturuldu",
      "error": "Yanıt oluşturulamadı"
    },
    "usage": {
      "count": 0,
      "lastUsed": null
    },
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Yanıt başarıyla oluşturuldu"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "RESPONSE_CREATION_FAILED",
    "message": "Yanıt oluşturulamadı"
  }
}
```

---

### 2. list(options: any)

Yanıtları listeler

**Parametreler:**
- `options: any` - Listeleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await responses.list({
  page: 1,
  limit: 20,
  type: "greeting",
  category: "welcome",
  language: "tr",
  status: "active",
  sortBy: "createdAt",
  sortOrder: "desc"
});

if (result.success) {
  console.log('Yanıtlar:', result.data);
  result.data.responses.forEach(response => {
    console.log(`- ${response.title} (${response.type})`);
  });
} else {
  console.error('Yanıt listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "responses": [
      {
        "id": "response_123",
        "title": "Hoş Geldiniz Yanıtı",
        "content": "Merhaba! Size nasıl yardımcı olabilirim?",
        "type": "greeting",
        "category": "welcome",
        "language": "tr",
        "tags": ["welcome", "greeting", "automated"],
        "status": "active",
        "usage": {
          "count": 150,
          "lastUsed": "2024-01-15T10:25:00Z"
        },
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      {
        "id": "response_456",
        "title": "Yardım Yanıtı",
        "content": "Size nasıl yardımcı olabilirim? Detaylı bilgi için lütfen sorunuzu açıklayın.",
        "type": "help",
        "category": "support",
        "language": "tr",
        "tags": ["help", "support", "assistance"],
        "status": "active",
        "usage": {
          "count": 89,
          "lastUsed": "2024-01-15T10:20:00Z"
        },
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    },
    "filters": {
      "type": "greeting",
      "category": "welcome",
      "language": "tr",
      "status": "active"
    },
    "summary": {
      "totalResponses": 150,
      "activeResponses": 140,
      "inactiveResponses": 10,
      "totalUsage": 2500,
      "mostUsed": "response_123"
    }
  },
  "message": "Yanıtlar başarıyla listelendi"
}
```

---

### 3. get(responseId: string)

Belirli bir yanıtı getirir

**Parametreler:**
- `responseId: string` - Yanıt ID'si

**Örnek Kullanım:**

```typescript
const result = await responses.get("response_123");

if (result.success) {
  console.log('Yanıt detayları:', result.data);
  const { title, content, type, usage, metadata } = result.data;
} else {
  console.error('Yanıt getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "response_123",
    "title": "Hoş Geldiniz Yanıtı",
    "content": "Merhaba! Size nasıl yardımcı olabilirim?",
    "type": "greeting",
    "category": "welcome",
    "language": "tr",
    "tags": ["welcome", "greeting", "automated"],
    "metadata": {
      "author": "user_123",
      "version": "1.0.0",
      "priority": "high",
      "description": "Yeni kullanıcılar için hoş geldin mesajı",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "conditions": {
      "userType": "new",
      "timeOfDay": "morning",
      "userSegment": "premium"
    },
    "responses": {
      "success": "Yanıt başarıyla oluşturuldu",
      "error": "Yanıt oluşturulamadı",
      "fallback": "Varsayılan yanıt"
    },
    "usage": {
      "count": 150,
      "lastUsed": "2024-01-15T10:25:00Z",
      "frequency": "daily",
      "averagePerDay": 25,
      "peakUsage": "2024-01-14T14:30:00Z"
    },
    "performance": {
      "averageResponseTime": 120,
      "successRate": 98.5,
      "userSatisfaction": 4.2
    },
    "relatedResponses": [
      {
        "id": "response_456",
        "title": "Yardım Yanıtı",
        "type": "help",
        "similarity": 0.85
      }
    ],
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Yanıt başarıyla getirildi"
}
```

---

### 4. delete(responseId: string)

Yanıtı siler

**Parametreler:**
- `responseId: string` - Yanıt ID'si

**Örnek Kullanım:**

```typescript
const result = await responses.delete("response_123");

if (result.success) {
  console.log('Yanıt silindi:', result.data);
  const { id, deletedAt, finalStats } = result.data;
} else {
  console.error('Yanıt silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "response_123",
    "title": "Hoş Geldiniz Yanıtı",
    "type": "greeting",
    "category": "welcome",
    "deletedAt": "2024-01-15T10:30:00Z",
    "deletedBy": "user_123",
    "finalStats": {
      "totalUsage": 150,
      "lastUsed": "2024-01-15T10:25:00Z",
      "averageRating": 4.2,
      "successRate": 98.5
    },
    "backupCreated": true,
    "backupLocation": "backups/responses/response_123_backup.json"
  },
  "message": "Yanıt başarıyla silindi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "RESPONSE_DELETION_FAILED",
    "message": "Yanıt silinemedi - Aktif kullanımda"
  }
}
```

---

### 5. getStats(options: any)

Yanıt istatistiklerini getirir

**Parametreler:**
- `options: any` - İstatistik seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await responses.getStats({
  period: "30d",
  groupBy: "type",
  includeUsage: true,
  includePerformance: true
});

if (result.success) {
  console.log('Yanıt istatistikleri:', result.data);
  const { totalResponses, usage, performance, trends } = result.data;
} else {
  console.error('İstatistik hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "period": "30d",
    "totalResponses": 150,
    "usage": {
      "totalCalls": 2500,
      "averagePerDay": 83,
      "peakDay": "2024-01-14",
      "peakHour": "14:00",
      "byType": {
        "greeting": 800,
        "help": 600,
        "error": 400,
        "confirmation": 300,
        "custom": 400
      },
      "byCategory": {
        "welcome": 800,
        "support": 600,
        "error": 400,
        "success": 300,
        "info": 400
      },
      "byLanguage": {
        "tr": 2000,
        "en": 400,
        "de": 100
      }
    },
    "performance": {
      "averageResponseTime": 120,
      "successRate": 98.5,
      "errorRate": 1.5,
      "userSatisfaction": 4.2,
      "topPerformers": [
        {
          "id": "response_123",
          "title": "Hoş Geldiniz Yanıtı",
          "usage": 150,
          "satisfaction": 4.5,
          "successRate": 99.0
        }
      ]
    },
    "trends": {
      "usageGrowth": 15.5,
      "responseTimeImprovement": -5.2,
      "satisfactionImprovement": 0.3,
      "errorRateReduction": -20.0
    },
    "insights": [
      {
        "type": "usage",
        "message": "Greeting yanıtları en çok kullanılan tür",
        "impact": "high"
      },
      {
        "type": "performance",
        "message": "Yanıt süreleri %5.2 iyileşti",
        "impact": "medium"
      }
    ],
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Yanıt istatistikleri başarıyla getirildi"
}
```

---

### 6. search(options: any)

Yanıtları arar

**Parametreler:**
- `options: any` - Arama seçenekleri

**Örnek Kullanım:**

```typescript
const result = await responses.search({
  query: "hoş geldin",
  type: "greeting",
  language: "tr",
  category: "welcome",
  tags: ["welcome", "greeting"],
  limit: 10,
  sortBy: "relevance",
  sortOrder: "desc"
});

if (result.success) {
  console.log('Arama sonuçları:', result.data);
  result.data.results.forEach(result => {
    console.log(`- ${result.title} (Relevance: ${result.relevance})`);
  });
} else {
  console.error('Arama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "query": "hoş geldin",
    "results": [
      {
        "id": "response_123",
        "title": "Hoş Geldiniz Yanıtı",
        "content": "Merhaba! Size nasıl yardımcı olabilirim?",
        "type": "greeting",
        "category": "welcome",
        "language": "tr",
        "tags": ["welcome", "greeting", "automated"],
        "relevance": 0.95,
        "matches": [
          {
            "field": "title",
            "text": "Hoş <mark>Geldiniz</mark> Yanıtı",
            "score": 0.9
          },
          {
            "field": "content",
            "text": "Merhaba! Size nasıl yardımcı olabilirim?",
            "score": 0.8
          }
        ],
        "usage": {
          "count": 150,
          "lastUsed": "2024-01-15T10:25:00Z"
        },
        "createdAt": "2024-01-15T10:30:00Z"
      },
      {
        "id": "response_789",
        "title": "Yeni Kullanıcı Hoş Geldin",
        "content": "Hoş geldiniz! Hesabınız başarıyla oluşturuldu.",
        "type": "greeting",
        "category": "welcome",
        "language": "tr",
        "tags": ["welcome", "new-user", "registration"],
        "relevance": 0.85,
        "matches": [
          {
            "field": "title",
            "text": "Yeni Kullanıcı <mark>Hoş</mark> <mark>Geldin</mark>",
            "score": 0.85
          },
          {
            "field": "content",
            "text": "<mark>Hoş</mark> <mark>geldiniz</mark>! Hesabınız başarıyla oluşturuldu.",
            "score": 0.9
          }
        ],
        "usage": {
          "count": 75,
          "lastUsed": "2024-01-15T09:45:00Z"
        },
        "createdAt": "2024-01-14T15:20:00Z"
      }
    ],
    "totalResults": 15,
    "showingResults": 2,
    "searchTime": 45,
    "filters": {
      "type": "greeting",
      "language": "tr",
      "category": "welcome",
      "tags": ["welcome", "greeting"]
    },
    "suggestions": [
      {
        "type": "query",
        "text": "hoş geldiniz",
        "reason": "Benzer arama terimi"
      },
      {
        "type": "tag",
        "text": "automated",
        "reason": "Popüler etiket"
      }
    ],
    "facets": {
      "types": {
        "greeting": 15,
        "help": 5,
        "error": 2
      },
      "categories": {
        "welcome": 12,
        "support": 8,
        "success": 2
      },
      "languages": {
        "tr": 18,
        "en": 4
      }
    }
  },
  "message": "Arama başarıyla tamamlandı"
}
```

---

## Yanıt Türleri

| Tür | Açıklama | Kullanım |
|-----|----------|----------|
| `greeting` | Karşılama | Hoş geldin mesajları |
| `help` | Yardım | Destek yanıtları |
| `error` | Hata | Hata mesajları |
| `confirmation` | Onay | Onay mesajları |
| `custom` | Özel | Özel yanıtlar |

## Yanıt Kategorileri

| Kategori | Açıklama | Örnekler |
|----------|----------|----------|
| `welcome` | Hoş geldin | Karşılama mesajları |
| `support` | Destek | Yardım yanıtları |
| `error` | Hata | Hata mesajları |
| `success` | Başarı | Başarı mesajları |
| `info` | Bilgi | Bilgilendirme |

## Yanıt Durumları

| Durum | Açıklama |
|-------|----------|
| `active` | Aktif |
| `inactive` | Pasif |
| `draft` | Taslak |
| `archived` | Arşivlenmiş |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `RESPONSE_NOT_FOUND` | Yanıt bulunamadı |
| `RESPONSE_CREATION_FAILED` | Yanıt oluşturulamadı |
| `RESPONSE_DELETION_FAILED` | Yanıt silinemedi |
| `INVALID_RESPONSE_ID` | Geçersiz yanıt ID'si |
| `INVALID_RESPONSE_DATA` | Geçersiz yanıt verisi |
| `RESPONSE_ALREADY_EXISTS` | Yanıt zaten mevcut |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Yanıt içeriklerini güvenli bir şekilde saklayın
- Hassas bilgileri yanıtlarda saklamayın
- Yanıt erişimini sınırlayın
- Düzenli olarak yanıt içeriklerini gözden geçirin
- Düzenli olarak güvenlik denetimleri yapın

## Yanıt Yönetimi

```typescript
// Yanıt oluşturma
const response = await responses.create({
  title: "Hoş Geldiniz",
  content: "Merhaba!",
  type: "greeting",
  category: "welcome"
});

// Yanıt listesi
const responsesList = await responses.list({
  type: "greeting",
  limit: 10
});

// Yanıt detayları
const responseDetails = await responses.get("response_123");

// Yanıt silme
await responses.delete("response_123");

// Yanıt arama
const searchResults = await responses.search({
  query: "hoş geldin",
  type: "greeting"
});

// Yanıt istatistikleri
const stats = await responses.getStats({
  period: "30d"
});
```

## Yanıt Analizi

```typescript
// İstatistik analizi
const stats = await responses.getStats();

// En çok kullanılan yanıt türü
const topType = Object.entries(stats.data.usage.byType)
  .sort(([,a], [,b]) => b - a)[0];
console.log('En popüler tür:', topType[0], topType[1] + ' kullanım');

// Performans metrikleri
const performance = stats.data.performance;
console.log('Ortalama yanıt süresi:', performance.averageResponseTime + 'ms');
console.log('Başarı oranı:', performance.successRate + '%');
console.log('Kullanıcı memnuniyeti:', performance.userSatisfaction + '/5');

// Trend analizi
const trends = stats.data.trends;
console.log('Kullanım büyümesi:', trends.usageGrowth + '%');
console.log('Performans iyileşmesi:', trends.responseTimeImprovement + '%');
```

## Yanıt Arama

```typescript
// Gelişmiş arama
const searchResults = await responses.search({
  query: "yardım",
  type: "help",
  language: "tr",
  tags: ["support", "assistance"],
  limit: 20
});

// Arama sonuçları
searchResults.data.results.forEach(result => {
  console.log(`${result.title} (Relevance: ${result.relevance})`);
  result.matches.forEach(match => {
    console.log(`  ${match.field}: ${match.text}`);
  });
});

// Arama önerileri
const suggestions = searchResults.data.suggestions;
suggestions.forEach(suggestion => {
  console.log(`Öneri: ${suggestion.text} (${suggestion.reason})`);
});

// Arama filtreleri
const facets = searchResults.data.facets;
console.log('Türler:', facets.types);
console.log('Kategoriler:', facets.categories);
console.log('Diller:', facets.languages);
```

## Yanıt Optimizasyonu

```typescript
// Performans analizi
const stats = await responses.getStats({ includePerformance: true });
const topPerformers = stats.data.performance.topPerformers;

topPerformers.forEach(performer => {
  console.log(`${performer.title}:`);
  console.log(`  Kullanım: ${performer.usage}`);
  console.log(`  Memnuniyet: ${performer.satisfaction}/5`);
  console.log(`  Başarı oranı: ${performer.successRate}%`);
});

// İyileştirme önerileri
const insights = stats.data.insights;
insights.forEach(insight => {
  console.log(`${insight.type}: ${insight.message} (Etki: ${insight.impact})`);
});
```
