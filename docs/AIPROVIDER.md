# AIProvider Endpoint

AI sağlayıcı yönetimi endpoint'i - AI sağlayıcıları ve modellerini yönetir.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const aiProvider = zapi.aiProvider;
```

## Metodlar

### 1. list(options: any)

AI sağlayıcılarını listeler

**Parametreler:**
- `options: any` - Filtreleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm AI sağlayıcılarını listele
const result = await aiProvider.list();

if (result.success) {
  console.log('AI sağlayıcıları:', result.data);
  result.data.providers.forEach(provider => {
    console.log(`${provider.name} - ${provider.type} - ${provider.status}`);
  });
} else {
  console.error('AI sağlayıcı listeleme hatası:', result.error);
}

// Filtreleme ile listele
const filteredProviders = await aiProvider.list({
  type: 'openai',
  status: 'active',
  page: 1,
  limit: 10,
  search: 'gpt'
});

// Belirli türdeki sağlayıcılar
const openaiProviders = await aiProvider.list({
  type: 'openai'
});

const anthropicProviders = await aiProvider.list({
  type: 'anthropic'
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "providers": [
      {
        "id": "provider_123",
        "name": "OpenAI GPT-4",
        "type": "openai",
        "status": "active",
        "apiKey": "sk-***",
        "baseUrl": "https://api.openai.com/v1",
        "models": ["gpt-4", "gpt-3.5-turbo"],
        "capabilities": ["text", "image", "audio"],
        "rateLimit": {
          "requests": 3500,
          "tokens": 90000
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

---

### 2. create(data: any)

Yeni AI sağlayıcı oluşturur

**Parametreler:**
- `data: any` - Sağlayıcı verisi

**Örnek Kullanım:**

```typescript
// OpenAI sağlayıcısı oluştur
const result = await aiProvider.create({
  name: "OpenAI GPT-4",
  type: "openai",
  apiKey: "sk-your-openai-api-key",
  baseUrl: "https://api.openai.com/v1",
  models: ["gpt-4", "gpt-3.5-turbo"],
  capabilities: ["text", "image", "audio"],
  rateLimit: {
    requests: 3500,
    tokens: 90000
  },
  settings: {
    temperature: 0.7,
    maxTokens: 4096,
    timeout: 30
  }
});

if (result.success) {
  console.log('AI sağlayıcı oluşturuldu:', result.data);
} else {
  console.error('AI sağlayıcı oluşturma hatası:', result.error);
}

// Anthropic sağlayıcısı oluştur
const anthropicProvider = await aiProvider.create({
  name: "Anthropic Claude",
  type: "anthropic",
  apiKey: "sk-ant-your-anthropic-key",
  baseUrl: "https://api.anthropic.com/v1",
  models: ["claude-3-opus", "claude-3-sonnet"],
  capabilities: ["text"],
  rateLimit: {
    requests: 5000,
    tokens: 100000
  }
});

// Google sağlayıcısı oluştur
const googleProvider = await aiProvider.create({
  name: "Google Gemini",
  type: "google",
  apiKey: "AIza-your-google-api-key",
  baseUrl: "https://generativelanguage.googleapis.com/v1",
  models: ["gemini-pro", "gemini-pro-vision"],
  capabilities: ["text", "image"]
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "provider_456",
    "name": "OpenAI GPT-4",
    "type": "openai",
    "status": "active",
    "apiKey": "sk-***",
    "baseUrl": "https://api.openai.com/v1",
    "models": ["gpt-4", "gpt-3.5-turbo"],
    "capabilities": ["text", "image", "audio"],
    "rateLimit": {
      "requests": 3500,
      "tokens": 90000
    },
    "settings": {
      "temperature": 0.7,
      "maxTokens": 4096,
      "timeout": 30
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 3. get(providerId: string)

AI sağlayıcı detaylarını getirir

**Parametreler:**
- `providerId: string` - Sağlayıcı ID'si

**Örnek Kullanım:**

```typescript
const result = await aiProvider.get('provider_123');

if (result.success) {
  console.log('AI sağlayıcı detayları:', result.data);
  console.log('Sağlayıcı adı:', result.data.name);
  console.log('Modeller:', result.data.models);
  console.log('Yetenekler:', result.data.capabilities);
} else {
  console.error('AI sağlayıcı getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "provider_123",
    "name": "OpenAI GPT-4",
    "type": "openai",
    "status": "active",
    "apiKey": "sk-***",
    "baseUrl": "https://api.openai.com/v1",
    "models": ["gpt-4", "gpt-3.5-turbo"],
    "capabilities": ["text", "image", "audio"],
    "rateLimit": {
      "requests": 3500,
      "tokens": 90000
    },
    "settings": {
      "temperature": 0.7,
      "maxTokens": 4096,
      "timeout": 30
    },
    "usage": {
      "requestsToday": 150,
      "tokensToday": 45000,
      "requestsThisMonth": 4500,
      "tokensThisMonth": 1350000
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 4. update(providerId: string, data: any)

AI sağlayıcıyı günceller

**Parametreler:**
- `providerId: string` - Sağlayıcı ID'si
- `data: any` - Güncellenecek veri

**Örnek Kullanım:**

```typescript
const result = await aiProvider.update('provider_123', {
  name: "OpenAI GPT-4 Updated",
  rateLimit: {
    requests: 5000,
    tokens: 120000
  },
  settings: {
    temperature: 0.8,
    maxTokens: 8192,
    timeout: 45
  }
});

if (result.success) {
  console.log('AI sağlayıcı güncellendi:', result.data);
} else {
  console.error('AI sağlayıcı güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "provider_123",
    "name": "OpenAI GPT-4 Updated",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 5. delete(providerId: string)

AI sağlayıcıyı siler

**Parametreler:**
- `providerId: string` - Sağlayıcı ID'si

**Örnek Kullanım:**

```typescript
const result = await aiProvider.delete('provider_123');

if (result.success) {
  console.log('AI sağlayıcı silindi:', result.data);
} else {
  console.error('AI sağlayıcı silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "provider_123",
    "deletedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 6. testProvider(providerId: string, overrideKey: string | null)

AI sağlayıcısını test eder

**Parametreler:**
- `providerId: string` - Sağlayıcı ID'si
- `overrideKey: string | null` - Test için geçici API anahtarı (opsiyonel)

**Örnek Kullanım:**

```typescript
// Sağlayıcıyı test et
const result = await aiProvider.testProvider('provider_123');

if (result.success) {
  console.log('Sağlayıcı testi başarılı:', result.data);
  console.log('Yanıt süresi:', result.data.responseTime + 'ms');
  console.log('Model listesi:', result.data.availableModels);
} else {
  console.error('Sağlayıcı test hatası:', result.error);
}

// Geçici API anahtarı ile test
const testWithKey = await aiProvider.testProvider('provider_123', 'sk-test-key-123');
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "providerId": "provider_123",
    "status": "active",
    "responseTime": 250,
    "availableModels": ["gpt-4", "gpt-3.5-turbo"],
    "rateLimit": {
      "remaining": 3499,
      "resetAt": "2024-01-15T11:00:00Z"
    },
    "testedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 7. getModels(options: any)

AI modellerini listeler

**Parametreler:**
- `options: any` - Filtreleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm modelleri listele
const result = await aiProvider.getModels();

if (result.success) {
  console.log('AI modelleri:', result.data);
  result.data.models.forEach(model => {
    console.log(`${model.name} - ${model.provider} - ${model.type}`);
  });
} else {
  console.error('Model listeleme hatası:', result.error);
}

// Belirli sağlayıcının modelleri
const openaiModels = await aiProvider.getModels({
  provider: 'openai',
  type: 'text',
  status: 'active'
});

// Belirli yeteneklere sahip modeller
const textModels = await aiProvider.getModels({
  capabilities: ['text']
});

const imageModels = await aiProvider.getModels({
  capabilities: ['image']
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "models": [
      {
        "id": "model_123",
        "name": "gpt-4",
        "provider": "openai",
        "type": "text",
        "status": "active",
        "capabilities": ["text"],
        "maxTokens": 8192,
        "inputCost": 0.03,
        "outputCost": 0.06,
        "contextWindow": 128000,
        "description": "Most capable GPT-4 model",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "pages": 1
    }
  }
}
```

---

### 8. getModel(modelId: string)

AI model detaylarını getirir

**Parametreler:**
- `modelId: string` - Model ID'si

**Örnek Kullanım:**

```typescript
const result = await aiProvider.getModel('model_123');

if (result.success) {
  console.log('Model detayları:', result.data);
  console.log('Model adı:', result.data.name);
  console.log('Maksimum token:', result.data.maxTokens);
  console.log('Maliyet:', result.data.inputCost + ' / ' + result.data.outputCost);
} else {
  console.error('Model getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "model_123",
    "name": "gpt-4",
    "provider": "openai",
    "type": "text",
    "status": "active",
    "capabilities": ["text"],
    "maxTokens": 8192,
    "inputCost": 0.03,
    "outputCost": 0.06,
    "contextWindow": 128000,
    "description": "Most capable GPT-4 model",
    "parameters": {
      "temperature": {
        "min": 0,
        "max": 2,
        "default": 0.7
      },
      "topP": {
        "min": 0,
        "max": 1,
        "default": 1
      }
    },
    "usage": {
      "requestsToday": 50,
      "tokensToday": 15000,
      "costToday": 4.5
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 9. updateModel(modelId: string, data: any)

AI modeli günceller

**Parametreler:**
- `modelId: string` - Model ID'si
- `data: any` - Güncellenecek veri

**Örnek Kullanım:**

```typescript
const result = await aiProvider.updateModel('model_123', {
  status: 'inactive',
  description: 'Updated model description',
  inputCost: 0.025,
  outputCost: 0.05
});

if (result.success) {
  console.log('Model güncellendi:', result.data);
} else {
  console.error('Model güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "model_123",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 10. deleteModel(modelId: string)

AI modeli siler

**Parametreler:**
- `modelId: string` - Model ID'si

**Örnek Kullanım:**

```typescript
const result = await aiProvider.deleteModel('model_123');

if (result.success) {
  console.log('Model silindi:', result.data);
} else {
  console.error('Model silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "model_123",
    "deletedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 11. getDefaultModels()

Varsayılan AI modellerini getirir

**Parametreler:**
- Yok

**Örnek Kullanım:**

```typescript
const result = await aiProvider.getDefaultModels();

if (result.success) {
  console.log('Varsayılan modeller:', result.data);
  console.log('Varsayılan text modeli:', result.data.defaults.text);
  console.log('Varsayılan image modeli:', result.data.defaults.image);
} else {
  console.error('Varsayılan model getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "defaults": {
      "text": "gpt-4",
      "image": "dall-e-3",
      "audio": "whisper-1",
      "embedding": "text-embedding-ada-002"
    },
    "fallbacks": {
      "text": "gpt-3.5-turbo",
      "image": "dall-e-2",
      "audio": "whisper-1",
      "embedding": "text-embedding-3-small"
    },
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 12. testModel(modelId: string)

AI modelini test eder

**Parametreler:**
- `modelId: string` - Model ID'si

**Örnek Kullanım:**

```typescript
const result = await aiProvider.testModel('model_123');

if (result.success) {
  console.log('Model testi başarılı:', result.data);
  console.log('Yanıt süresi:', result.data.responseTime + 'ms');
  console.log('Test yanıtı:', result.data.testResponse);
} else {
  console.error('Model test hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "modelId": "model_123",
    "status": "active",
    "responseTime": 1200,
    "testResponse": "Hello! I'm GPT-4, an AI assistant created by OpenAI.",
    "tokensUsed": 15,
    "cost": 0.0009,
    "testedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 13. clearCache()

AI sağlayıcı cache'ini temizler

**Parametreler:**
- Yok

**Örnek Kullanım:**

```typescript
const result = await aiProvider.clearCache();

if (result.success) {
  console.log('Cache temizlendi:', result.data);
  console.log('Temizlenen cache türleri:', result.data.clearedTypes);
} else {
  console.error('Cache temizleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "clearedTypes": ["models", "providers", "responses"],
    "clearedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## AI Sağlayıcı Türleri

| Tür | Açıklama |
|-----|----------|
| `openai` | OpenAI GPT modelleri |
| `anthropic` | Anthropic Claude modelleri |
| `google` | Google Gemini modelleri |
| `cohere` | Cohere modelleri |
| `huggingface` | Hugging Face modelleri |
| `replicate` | Replicate modelleri |

## Model Yetenekleri

| Yetenek | Açıklama |
|---------|----------|
| `text` | Metin üretimi ve analizi |
| `image` | Görsel üretimi ve analizi |
| `audio` | Ses işleme |
| `embedding` | Vektör oluşturma |
| `function` | Fonksiyon çağırma |
| `vision` | Görsel anlama |

## Model Türleri

| Tür | Açıklama |
|-----|----------|
| `text` | Metin modelleri |
| `image` | Görsel modelleri |
| `audio` | Ses modelleri |
| `embedding` | Embedding modelleri |
| `multimodal` | Çoklu modal modeller |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `PROVIDER_NOT_FOUND` | Sağlayıcı bulunamadı |
| `MODEL_NOT_FOUND` | Model bulunamadı |
| `PROVIDER_TEST_FAILED` | Sağlayıcı testi başarısız |
| `MODEL_TEST_FAILED` | Model testi başarısız |
| `INVALID_API_KEY` | Geçersiz API anahtarı |
| `RATE_LIMIT_EXCEEDED` | Rate limit aşıldı |

## Güvenlik Notları

- API anahtarlarını güvenli saklayın
- Sağlayıcı erişimlerini kontrol edin
- Model kullanımını izleyin
- Maliyetleri takip edin

## AI Sağlayıcı Yönetimi

```typescript
// Sağlayıcıları listele
const providers = await aiProvider.list();

// Yeni sağlayıcı oluştur
const provider = await aiProvider.create({
  name: "OpenAI GPT-4",
  type: "openai",
  apiKey: "sk-***"
});

// Sağlayıcıyı test et
const testResult = await aiProvider.testProvider('provider_123');

// Modelleri listele
const models = await aiProvider.getModels();

// Modeli test et
const modelTest = await aiProvider.testModel('model_123');

// Cache temizle
await aiProvider.clearCache();
```
