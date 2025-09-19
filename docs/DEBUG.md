# Debug Endpoint

Hata ayıklama endpoint'leri - Debug modelleri ve hata ayıklama araçları.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const debug = zapi.debug;
```

## Metodlar

### 1. getModels()

Debug modellerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await debug.getModels();

if (result.success) {
  console.log('Debug modelleri:', result.data);
  result.data.models.forEach(model => {
    console.log(`- ${model.name} (${model.type})`);
  });
} else {
  console.error('Debug model hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "models": [
      {
        "id": "debug-gpt-4",
        "name": "Debug GPT-4",
        "type": "debug",
        "provider": "openai",
        "description": "GPT-4 debug modeli - detaylı hata ayıklama bilgileri",
        "capabilities": [
          "error_analysis",
          "code_review",
          "performance_debugging",
          "memory_analysis",
          "network_debugging"
        ],
        "features": {
          "verboseLogging": true,
          "stackTraceAnalysis": true,
          "memoryProfiling": true,
          "performanceMetrics": true,
          "networkInspection": true,
          "errorClassification": true
        },
        "limits": {
          "maxTokens": 8192,
          "contextLength": 128000,
          "requestsPerMinute": 30,
          "debugLevel": "detailed"
        },
        "pricing": {
          "input": 0.06,
          "output": 0.12,
          "currency": "USD"
        },
        "status": "available",
        "version": "1.0.0",
        "lastUpdated": "2024-01-15T10:30:00Z"
      },
      {
        "id": "debug-claude-3",
        "name": "Debug Claude 3",
        "type": "debug",
        "provider": "anthropic",
        "description": "Claude 3 debug modeli - kod analizi ve hata tespiti",
        "capabilities": [
          "code_analysis",
          "bug_detection",
          "security_audit",
          "performance_optimization",
          "documentation_review"
        ],
        "features": {
          "codeReview": true,
          "securityScanning": true,
          "performanceAnalysis": true,
          "documentationCheck": true,
          "bestPracticesCheck": true,
          "vulnerabilityDetection": true
        },
        "limits": {
          "maxTokens": 4096,
          "contextLength": 200000,
          "requestsPerMinute": 20,
          "debugLevel": "comprehensive"
        },
        "pricing": {
          "input": 0.03,
          "output": 0.15,
          "currency": "USD"
        },
        "status": "available",
        "version": "1.0.0",
        "lastUpdated": "2024-01-15T10:30:00Z"
      },
      {
        "id": "debug-gemini-pro",
        "name": "Debug Gemini Pro",
        "type": "debug",
        "provider": "google",
        "description": "Gemini Pro debug modeli - hızlı hata tespiti ve çözüm önerileri",
        "capabilities": [
          "quick_debugging",
          "syntax_checking",
          "logic_analysis",
          "runtime_debugging",
          "optimization_suggestions"
        ],
        "features": {
          "syntaxValidation": true,
          "logicFlowAnalysis": true,
          "runtimeMonitoring": true,
          "optimizationTips": true,
          "quickFixes": true,
          "patternRecognition": true
        },
        "limits": {
          "maxTokens": 2048,
          "contextLength": 32768,
          "requestsPerMinute": 50,
          "debugLevel": "standard"
        },
        "pricing": {
          "input": 0.002,
          "output": 0.004,
          "currency": "USD"
        },
        "status": "available",
        "version": "1.0.0",
        "lastUpdated": "2024-01-15T10:30:00Z"
      },
      {
        "id": "debug-custom",
        "name": "Custom Debug Model",
        "type": "debug",
        "provider": "custom",
        "description": "Özel debug modeli - kullanıcı tanımlı hata ayıklama kuralları",
        "capabilities": [
          "custom_rules",
          "domain_specific_debugging",
          "business_logic_validation",
          "integration_testing",
          "api_debugging"
        ],
        "features": {
          "customRules": true,
          "domainExpertise": true,
          "businessLogicCheck": true,
          "integrationValidation": true,
          "apiTesting": true,
          "workflowAnalysis": true
        },
        "limits": {
          "maxTokens": 4096,
          "contextLength": 64000,
          "requestsPerMinute": 25,
          "debugLevel": "custom"
        },
        "pricing": {
          "input": 0.025,
          "output": 0.05,
          "currency": "USD"
        },
        "status": "available",
        "version": "1.0.0",
        "lastUpdated": "2024-01-15T10:30:00Z"
      }
    ],
    "debugLevels": [
      {
        "id": "standard",
        "name": "Standart",
        "description": "Temel hata ayıklama bilgileri",
        "features": ["error_messages", "basic_stack_trace", "syntax_checking"],
        "cost": "low"
      },
      {
        "id": "detailed",
        "name": "Detaylı",
        "description": "Kapsamlı hata ayıklama bilgileri",
        "features": ["verbose_logging", "memory_analysis", "performance_metrics"],
        "cost": "medium"
      },
      {
        "id": "comprehensive",
        "name": "Kapsamlı",
        "description": "Tam hata ayıklama ve analiz",
        "features": ["security_audit", "code_review", "optimization_suggestions"],
        "cost": "high"
      },
      {
        "id": "custom",
        "name": "Özel",
        "description": "Kullanıcı tanımlı debug kuralları",
        "features": ["custom_rules", "domain_specific", "business_logic"],
        "cost": "variable"
      }
    ],
    "capabilities": [
      {
        "id": "error_analysis",
        "name": "Hata Analizi",
        "description": "Hataları analiz eder ve çözüm önerir",
        "supportedModels": ["debug-gpt-4", "debug-claude-3"]
      },
      {
        "id": "code_review",
        "name": "Kod İnceleme",
        "description": "Kod kalitesini ve güvenliğini kontrol eder",
        "supportedModels": ["debug-claude-3", "debug-custom"]
      },
      {
        "id": "performance_debugging",
        "name": "Performans Hata Ayıklama",
        "description": "Performans sorunlarını tespit eder",
        "supportedModels": ["debug-gpt-4", "debug-gemini-pro"]
      },
      {
        "id": "memory_analysis",
        "name": "Bellek Analizi",
        "description": "Bellek kullanımını analiz eder",
        "supportedModels": ["debug-gpt-4"]
      },
      {
        "id": "network_debugging",
        "name": "Ağ Hata Ayıklama",
        "description": "Ağ bağlantı sorunlarını tespit eder",
        "supportedModels": ["debug-gpt-4", "debug-custom"]
      },
      {
        "id": "security_audit",
        "name": "Güvenlik Denetimi",
        "description": "Güvenlik açıklarını tespit eder",
        "supportedModels": ["debug-claude-3"]
      },
      {
        "id": "syntax_checking",
        "name": "Sözdizimi Kontrolü",
        "description": "Kod sözdizimini kontrol eder",
        "supportedModels": ["debug-gemini-pro", "debug-custom"]
      },
      {
        "id": "logic_analysis",
        "name": "Mantık Analizi",
        "description": "Kod mantığını analiz eder",
        "supportedModels": ["debug-gemini-pro", "debug-claude-3"]
      },
      {
        "id": "runtime_debugging",
        "name": "Çalışma Zamanı Hata Ayıklama",
        "description": "Çalışma zamanı hatalarını tespit eder",
        "supportedModels": ["debug-gemini-pro", "debug-custom"]
      },
      {
        "id": "optimization_suggestions",
        "name": "Optimizasyon Önerileri",
        "description": "Kod optimizasyon önerileri sunar",
        "supportedModels": ["debug-claude-3", "debug-gemini-pro"]
      }
    ],
    "summary": {
      "totalModels": 4,
      "availableModels": 4,
      "totalCapabilities": 10,
      "supportedProviders": ["openai", "anthropic", "google", "custom"],
      "lastUpdated": "2024-01-15T10:30:00Z"
    }
  },
  "message": "Debug modelleri başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "DEBUG_MODELS_FAILED",
    "message": "Debug modelleri alınamadı"
  }
}
```

---

## Debug Seviyeleri

| Seviye | Açıklama | Özellikler | Maliyet |
|--------|----------|------------|---------|
| `standard` | Standart | Temel hata mesajları, stack trace | Düşük |
| `detailed` | Detaylı | Verbose logging, bellek analizi | Orta |
| `comprehensive` | Kapsamlı | Güvenlik denetimi, kod inceleme | Yüksek |
| `custom` | Özel | Kullanıcı tanımlı kurallar | Değişken |

## Debug Yetenekleri

| Yetenek | Açıklama | Desteklenen Modeller |
|---------|----------|---------------------|
| `error_analysis` | Hata analizi | GPT-4, Claude-3 |
| `code_review` | Kod inceleme | Claude-3, Custom |
| `performance_debugging` | Performans hata ayıklama | GPT-4, Gemini Pro |
| `memory_analysis` | Bellek analizi | GPT-4 |
| `network_debugging` | Ağ hata ayıklama | GPT-4, Custom |
| `security_audit` | Güvenlik denetimi | Claude-3 |
| `syntax_checking` | Sözdizimi kontrolü | Gemini Pro, Custom |
| `logic_analysis` | Mantık analizi | Gemini Pro, Claude-3 |
| `runtime_debugging` | Çalışma zamanı hata ayıklama | Gemini Pro, Custom |
| `optimization_suggestions` | Optimizasyon önerileri | Claude-3, Gemini Pro |

## Model Sağlayıcıları

| Sağlayıcı | Açıklama | Özellikler |
|-----------|----------|------------|
| `openai` | OpenAI | GPT-4 tabanlı debug |
| `anthropic` | Anthropic | Claude-3 tabanlı debug |
| `google` | Google | Gemini Pro tabanlı debug |
| `custom` | Özel | Kullanıcı tanımlı debug |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `DEBUG_MODELS_FAILED` | Debug modelleri alınamadı |
| `MODEL_NOT_AVAILABLE` | Model kullanılamıyor |
| `INSUFFICIENT_PERMISSIONS` | Yetersiz yetki |
| `DEBUG_QUOTA_EXCEEDED` | Debug kotası aşıldı |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Debug modellerini sadece geliştirme ortamında kullanın
- Hassas kod bilgilerini debug modellerine göndermeyin
- Debug loglarını güvenli bir şekilde saklayın
- Debug erişimini sınırlayın
- Düzenli olarak güvenlik denetimleri yapın

## Debug Yönetimi

```typescript
// Debug modelleri
const debugModels = await debug.getModels();

// Model seçimi
const gpt4Debug = debugModels.data.models.find(m => m.id === 'debug-gpt-4');
console.log('GPT-4 Debug:', gpt4Debug.description);
console.log('Yetenekler:', gpt4Debug.capabilities);

// Debug seviyesi seçimi
const debugLevels = debugModels.data.debugLevels;
const standardLevel = debugLevels.find(level => level.id === 'standard');
console.log('Standart seviye:', standardLevel.description);
```

## Debug Yetenekleri

```typescript
// Debug yetenekleri
const capabilities = debugModels.data.capabilities;

// Hata analizi yeteneği
const errorAnalysis = capabilities.find(cap => cap.id === 'error_analysis');
console.log('Hata analizi:', errorAnalysis.description);
console.log('Desteklenen modeller:', errorAnalysis.supportedModels);

// Kod inceleme yeteneği
const codeReview = capabilities.find(cap => cap.id === 'code_review');
console.log('Kod inceleme:', codeReview.description);
```

## Debug Model Karşılaştırması

```typescript
// Model karşılaştırması
const models = debugModels.data.models;

// En hızlı model
const fastestModel = models.reduce((prev, current) =>
  current.limits.requestsPerMinute > prev.limits.requestsPerMinute ? current : prev
);
console.log('En hızlı model:', fastestModel.name);

// En kapsamlı model
const mostComprehensive = models.reduce((prev, current) =>
  current.capabilities.length > prev.capabilities.length ? current : prev
);
console.log('En kapsamlı model:', mostComprehensive.name);

// En ekonomik model
const cheapestModel = models.reduce((prev, current) =>
  current.pricing.input < prev.pricing.input ? current : prev
);
console.log('En ekonomik model:', cheapestModel.name);
```

## Debug Seviye Analizi

```typescript
// Debug seviyeleri analizi
const levels = debugModels.data.debugLevels;

// Maliyet bazlı sıralama
const sortedByCost = levels.sort((a, b) => {
  const costOrder = { 'low': 1, 'medium': 2, 'high': 3, 'variable': 4 };
  return costOrder[a.cost] - costOrder[b.cost];
});

console.log('Maliyet bazlı sıralama:');
sortedByCost.forEach(level => {
  console.log(`${level.name}: ${level.cost} - ${level.description}`);
});
```

## Debug Özellikleri

```typescript
// Model özellikleri
const models = debugModels.data.models;

models.forEach(model => {
  console.log(`\n${model.name}:`);
  console.log('Yetenekler:', model.capabilities.join(', '));
  console.log('Özellikler:', Object.keys(model.features).join(', '));
  console.log('Limitler:', {
    maxTokens: model.limits.maxTokens,
    requestsPerMinute: model.limits.requestsPerMinute,
    debugLevel: model.limits.debugLevel
  });
  console.log('Fiyatlandırma:', {
    input: `${model.pricing.input} ${model.pricing.currency}/1K token`,
    output: `${model.pricing.output} ${model.pricing.currency}/1K token`
  });
});
```

## Debug Kullanım Senaryoları

```typescript
// Hata analizi için model seçimi
const errorAnalysisModels = debugModels.data.models.filter(model =>
  model.capabilities.includes('error_analysis')
);
console.log('Hata analizi modelleri:', errorAnalysisModels.map(m => m.name));

// Kod inceleme için model seçimi
const codeReviewModels = debugModels.data.models.filter(model =>
  model.capabilities.includes('code_review')
);
console.log('Kod inceleme modelleri:', codeReviewModels.map(m => m.name));

// Performans hata ayıklama için model seçimi
const performanceModels = debugModels.data.models.filter(model =>
  model.capabilities.includes('performance_debugging')
);
console.log('Performans modelleri:', performanceModels.map(m => m.name));
```