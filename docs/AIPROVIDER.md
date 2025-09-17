# AIProvider Endpoint - 14 Metod

AI sağlayıcı yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
AI sağlayıcılarını listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `search` (string): Arama terimi
  - `status` (string): Sağlayıcı durumu
  - `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const providers = await zapi.aiProvider.list({
  limit: 10,
  page: 1,
  search: 'openai',
  status: 'active',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "AI sağlayıcıları getirildi",
  "data": {
    "providers": [
      {
        "id": "provider_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "OpenAI",
        "type": "text",
        "status": "active",
        "apiKey": "sk-***",
        "baseUrl": "https://api.openai.com/v1",
        "models": [
          {
            "id": "gpt-4",
            "name": "GPT-4",
            "type": "text",
            "status": "active",
            "maxTokens": 8192,
            "costPerToken": 0.00003
          }
        ],
        "stats": {
          "totalRequests": 1250,
          "totalTokens": 45000,
          "totalCost": 125.50,
          "lastUsed": "2024-01-15T10:30:00Z"
        },
        "createdAt": "2024-01-01T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
      "itemsPerPage": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
*/
```

### 2. create(data: any): Promise<ApiResponse>
Yeni AI sağlayıcı oluşturur.

**Parametreler:**
- `data` (any): Sağlayıcı verileri
  - `name` (string): Sağlayıcı adı
  - `type` (string): Sağlayıcı tipi
  - `apiKey` (string): API anahtarı
  - `baseUrl` (string): Base URL

**Detaylı Örnek:**
```typescript
const create = await zapi.aiProvider.create({
  name: 'Anthropic',
  type: 'text',
  apiKey: 'sk-ant-***',
  baseUrl: 'https://api.anthropic.com/v1'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "AI sağlayıcı başarıyla oluşturuldu",
  "data": {
    "provider": {
      "id": "provider_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "Anthropic",
      "type": "text",
      "status": "active",
      "apiKey": "sk-ant-***",
      "baseUrl": "https://api.anthropic.com/v1",
      "models": [],
      "stats": {
        "totalRequests": 0,
        "totalTokens": 0,
        "totalCost": 0,
        "lastUsed": null
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(providerId: string): Promise<ApiResponse>
Belirli bir sağlayıcının detaylarını getirir.

**Parametreler:**
- `providerId` (string): Sağlayıcı ID'si

**Detaylı Örnek:**
```typescript
const provider = await zapi.aiProvider.get('provider_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "AI sağlayıcı detayları getirildi",
  "data": {
    "provider": {
      "id": "provider_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "OpenAI",
      "type": "text",
      "status": "active",
      "apiKey": "sk-***",
      "baseUrl": "https://api.openai.com/v1",
      "models": [
        {
          "id": "gpt-4",
          "name": "GPT-4",
          "type": "text",
          "status": "active",
          "maxTokens": 8192,
          "costPerToken": 0.00003,
          "description": "Most capable GPT-4 model"
        },
        {
          "id": "gpt-3.5-turbo",
          "name": "GPT-3.5 Turbo",
          "type": "text",
          "status": "active",
          "maxTokens": 4096,
          "costPerToken": 0.000002,
          "description": "Fast and efficient model"
        }
      ],
      "stats": {
        "totalRequests": 1250,
        "totalTokens": 45000,
        "totalCost": 125.50,
        "lastUsed": "2024-01-15T10:30:00Z"
      },
      "settings": {
        "timeout": 30000,
        "retryAttempts": 3,
        "retryDelay": 1000
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. update(providerId: string, data: any): Promise<ApiResponse>
Belirli bir sağlayıcıyı günceller.

**Parametreler:**
- `providerId` (string): Sağlayıcı ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.aiProvider.update('provider_64f8a1b2c3d4e5f6g7h8i9j0', {
  name: 'OpenAI Updated',
  apiKey: 'sk-new-***',
  baseUrl: 'https://api.openai.com/v1',
  settings: {
    timeout: 45000,
    retryAttempts: 5,
    retryDelay: 2000
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "AI sağlayıcı başarıyla güncellendi",
  "data": {
    "provider": {
      "id": "provider_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "OpenAI Updated",
      "type": "text",
      "status": "active",
      "apiKey": "sk-new-***",
      "baseUrl": "https://api.openai.com/v1",
      "models": [
        {
          "id": "gpt-4",
          "name": "GPT-4",
          "type": "text",
          "status": "active",
          "maxTokens": 8192,
          "costPerToken": 0.00003
        }
      ],
      "stats": {
        "totalRequests": 1250,
        "totalTokens": 45000,
        "totalCost": 125.50,
        "lastUsed": "2024-01-15T10:30:00Z"
      },
      "settings": {
        "timeout": 45000,
        "retryAttempts": 5,
        "retryDelay": 2000
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 5. delete(providerId: string): Promise<ApiResponse>
Belirli bir sağlayıcıyı siler.

**Parametreler:**
- `providerId` (string): Sağlayıcı ID'si

**Detaylı Örnek:**
```typescript
const deleteProvider = await zapi.aiProvider.delete('provider_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "AI sağlayıcı başarıyla silindi",
  "data": {
    "deleted": {
      "id": "provider_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "OpenAI Updated",
      "deletedAt": "2024-01-15T10:40:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. testProvider(providerId: string, overrideKey?: string): Promise<ApiResponse>
Sağlayıcıyı test eder.

**Parametreler:**
- `providerId` (string): Sağlayıcı ID'si
- `overrideKey` (string, opsiyonel): Test için kullanılacak API anahtarı

**Detaylı Örnek:**
```typescript
const testProvider = await zapi.aiProvider.testProvider('provider_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "AI sağlayıcı test edildi",
  "data": {
    "test": {
      "providerId": "provider_64f8a1b2c3d4e5f6g7h8i9j0",
      "status": "success",
      "responseTime": "245ms",
      "testedAt": "2024-01-15T10:40:00Z",
      "details": {
        "connection": "success",
        "authentication": "success",
        "models": ["gpt-4", "gpt-3.5-turbo"]
      }
    }
  }
}
*/
```

### 7. getModels(): Promise<ApiResponse>
Mevcut modelleri getirir.

**Detaylı Örnek:**
```typescript
const models = await zapi.aiProvider.getModels();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Modeller getirildi",
  "data": {
    "models": [
      {
        "id": "gpt-4",
        "name": "GPT-4",
        "provider": "OpenAI",
        "type": "text",
        "status": "active",
        "maxTokens": 8192,
        "costPerToken": 0.00003,
        "description": "Most capable GPT-4 model"
      },
      {
        "id": "gpt-3.5-turbo",
        "name": "GPT-3.5 Turbo",
        "provider": "OpenAI",
        "type": "text",
        "status": "active",
        "maxTokens": 4096,
        "costPerToken": 0.000002,
        "description": "Fast and efficient model"
      }
    ],
    "total": 2
  }
}
*/
```

### 8. getModel(modelId: string): Promise<ApiResponse>
Belirli bir modelin detaylarını getirir.

**Parametreler:**
- `modelId` (string): Model ID'si

**Detaylı Örnek:**
```typescript
const model = await zapi.aiProvider.getModel('gpt-4');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Model detayları getirildi",
  "data": {
    "model": {
      "id": "gpt-4",
      "name": "GPT-4",
      "provider": "OpenAI",
      "type": "text",
      "status": "active",
      "maxTokens": 8192,
      "costPerToken": 0.00003,
      "description": "Most capable GPT-4 model",
      "capabilities": [
        "text-generation",
        "text-completion",
        "conversation"
      ],
      "limitations": [
        "max-tokens: 8192",
        "rate-limit: 100/min"
      ],
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 9. updateModel(modelId: string, data: any): Promise<ApiResponse>
Belirli bir modeli günceller.

**Parametreler:**
- `modelId` (string): Model ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const updateModel = await zapi.aiProvider.updateModel('gpt-4', {
  name: 'GPT-4 Updated',
  description: 'Updated most capable GPT-4 model',
  maxTokens: 16384,
  costPerToken: 0.00006
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Model başarıyla güncellendi",
  "data": {
    "model": {
      "id": "gpt-4",
      "name": "GPT-4 Updated",
      "provider": "OpenAI",
      "type": "text",
      "status": "active",
      "maxTokens": 16384,
      "costPerToken": 0.00006,
      "description": "Updated most capable GPT-4 model",
      "capabilities": [
        "text-generation",
        "text-completion",
        "conversation"
      ],
      "limitations": [
        "max-tokens: 16384",
        "rate-limit: 100/min"
      ],
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 10. deleteModel(modelId: string): Promise<ApiResponse>
Belirli bir modeli siler.

**Parametreler:**
- `modelId` (string): Model ID'si

**Detaylı Örnek:**
```typescript
const deleteModel = await zapi.aiProvider.deleteModel('gpt-4');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Model başarıyla silindi",
  "data": {
    "deleted": {
      "id": "gpt-4",
      "name": "GPT-4 Updated",
      "deletedAt": "2024-01-15T10:40:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 11. getDefaultModels(category: string = ''): Promise<ApiResponse>
Varsayılan modelleri getirir.

**Parametreler:**
- `category` (string): Model kategorisi

**Detaylı Örnek:**
```typescript
const defaultModels = await zapi.aiProvider.getDefaultModels('text');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Varsayılan modeller getirildi",
  "data": {
    "models": [
      {
        "id": "gpt-4",
        "name": "GPT-4",
        "provider": "OpenAI",
        "type": "text",
        "category": "text",
        "isDefault": true,
        "maxTokens": 8192,
        "costPerToken": 0.00003
      },
      {
        "id": "claude-3",
        "name": "Claude 3",
        "provider": "Anthropic",
        "type": "text",
        "category": "text",
        "isDefault": true,
        "maxTokens": 100000,
        "costPerToken": 0.000015
      }
    ],
    "category": "text",
    "total": 2
  }
}
*/
```

### 12. createModel(data: any): Promise<ApiResponse>
Yeni model oluşturur.

**Parametreler:**
- `data` (any): Model verileri
  - `name` (string): Model adı
  - `provider` (string): Sağlayıcı
  - `type` (string): Model tipi
  - `maxTokens` (number): Maksimum token sayısı

**Detaylı Örnek:**
```typescript
const createModel = await zapi.aiProvider.createModel({
  name: 'Custom GPT-4',
  provider: 'OpenAI',
  type: 'text',
  maxTokens: 8192,
  costPerToken: 0.00003,
  description: 'Custom GPT-4 model configuration'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Model başarıyla oluşturuldu",
  "data": {
    "model": {
      "id": "custom-gpt-4",
      "name": "Custom GPT-4",
      "provider": "OpenAI",
      "type": "text",
      "status": "active",
      "maxTokens": 8192,
      "costPerToken": 0.00003,
      "description": "Custom GPT-4 model configuration",
      "capabilities": [
        "text-generation",
        "text-completion",
        "conversation"
      ],
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 13. testModel(modelId: string): Promise<ApiResponse>
Modeli test eder.

**Parametreler:**
- `modelId` (string): Model ID'si

**Detaylı Örnek:**
```typescript
const testModel = await zapi.aiProvider.testModel('gpt-4');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Model test edildi",
  "data": {
    "test": {
      "modelId": "gpt-4",
      "status": "success",
      "responseTime": "245ms",
      "testedAt": "2024-01-15T10:40:00Z",
      "details": {
        "connection": "success",
        "authentication": "success",
        "modelAvailable": true,
        "maxTokens": 8192
      }
    }
  }
}
*/
```

### 14. clearCache(): Promise<ApiResponse>
Cache'i temizler.

**Detaylı Örnek:**
```typescript
const clearCache = await zapi.aiProvider.clearCache();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Cache temizlendi",
  "data": {
    "cache": {
      "clearedKeys": 1250,
      "clearedAt": "2024-01-15T10:40:00Z",
      "clearedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
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
  // 1. Sağlayıcıları listele
  const providers = await zapi.aiProvider.list({
    limit: 10,
    page: 1,
    status: 'active',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  });
  console.log('Toplam sağlayıcı:', providers.data.pagination.totalItems);
  
  // 2. Yeni sağlayıcı oluştur
  const create = await zapi.aiProvider.create({
    name: 'Anthropic',
    type: 'text',
    apiKey: 'sk-ant-***',
    baseUrl: 'https://api.anthropic.com/v1'
  });
  const providerId = create.data.provider.id;
  console.log('Yeni sağlayıcı oluşturuldu:', providerId);
  
  // 3. Sağlayıcı detayını getir
  const provider = await zapi.aiProvider.get(providerId);
  console.log('Sağlayıcı:', provider.data.provider.name);
  console.log('Durum:', provider.data.provider.status);
  
  // 4. Sağlayıcı güncelle
  const update = await zapi.aiProvider.update(providerId, {
    name: 'Anthropic Updated',
    apiKey: 'sk-ant-new-***',
    settings: {
      timeout: 45000,
      retryAttempts: 5
    }
  });
  console.log('Sağlayıcı güncellendi:', update.data.provider.updatedAt);
  
  // 5. Sağlayıcı test et
  const testProvider = await zapi.aiProvider.testProvider(providerId);
  console.log('Test durumu:', testProvider.data.test.status);
  console.log('Yanıt süresi:', testProvider.data.test.responseTime);
  
  // 6. Modelleri getir
  const models = await zapi.aiProvider.getModels();
  console.log('Toplam model:', models.data.total);
  
  // 7. Model detayını getir
  const model = await zapi.aiProvider.getModel('gpt-4');
  console.log('Model:', model.data.model.name);
  console.log('Maksimum token:', model.data.model.maxTokens);
  
  // 8. Model güncelle
  const updateModel = await zapi.aiProvider.updateModel('gpt-4', {
    name: 'GPT-4 Updated',
    maxTokens: 16384,
    costPerToken: 0.00006
  });
  console.log('Model güncellendi:', updateModel.data.model.updatedAt);
  
  // 9. Varsayılan modelleri getir
  const defaultModels = await zapi.aiProvider.getDefaultModels('text');
  console.log('Varsayılan modeller:', defaultModels.data.total);
  
  // 10. Yeni model oluştur
  const createModel = await zapi.aiProvider.createModel({
    name: 'Custom GPT-4',
    provider: 'OpenAI',
    type: 'text',
    maxTokens: 8192,
    costPerToken: 0.00003
  });
  console.log('Yeni model oluşturuldu:', createModel.data.model.id);
  
  // 11. Model test et
  const testModel = await zapi.aiProvider.testModel('gpt-4');
  console.log('Model test durumu:', testModel.data.test.status);
  
  // 12. Cache temizle
  const clearCache = await zapi.aiProvider.clearCache();
  console.log('Temizlenen cache:', clearCache.data.cache.clearedKeys);
  
  // 13. Model sil
  const deleteModel = await zapi.aiProvider.deleteModel('custom-gpt-4');
  console.log('Model silindi:', deleteModel.data.deleted.deletedAt);
  
  // 14. Sağlayıcı sil
  const deleteProvider = await zapi.aiProvider.delete(providerId);
  console.log('Sağlayıcı silindi:', deleteProvider.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
