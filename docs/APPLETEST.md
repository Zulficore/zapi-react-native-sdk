# AppleTest Endpoint

Apple Sign In test endpoint'leri - Apple kimlik doğrulama testi, konfigürasyon ve token işlemleri.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const appleTest = zapi.appleTest;
```

## Metodlar

### 1. get()

Apple test bilgilerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await appleTest.get();

if (result.success) {
  console.log('Apple test bilgileri:', result.data);
  const { status, configuration, testResults } = result.data;
} else {
  console.error('Apple test bilgi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "active",
    "configuration": {
      "clientId": "com.zapi.app.test",
      "teamId": "ABC123DEF4",
      "keyId": "XYZ789GHI0",
      "bundleId": "com.zapi.app",
      "redirectUri": "https://zapi.com/auth/apple/callback",
      "scope": ["name", "email"],
      "responseType": "code",
      "responseMode": "form_post"
    },
    "testResults": {
      "lastTest": "2024-01-15T10:30:00Z",
      "totalTests": 25,
      "successfulTests": 23,
      "failedTests": 2,
      "successRate": 92.0,
      "averageResponseTime": 850
    },
    "testData": {
      "testUsers": [
        {
          "id": "test_user_1",
          "email": "test1@privaterelay.appleid.com",
          "firstName": "Test",
          "lastName": "User",
          "status": "active"
        },
        {
          "id": "test_user_2",
          "email": "test2@privaterelay.appleid.com",
          "firstName": "Demo",
          "lastName": "User",
          "status": "active"
        }
      ],
      "testScenarios": [
        "successful_login",
        "cancelled_login",
        "invalid_credentials",
        "network_error",
        "timeout_error"
      ]
    },
    "environment": {
      "sandbox": true,
      "production": false,
      "region": "us-east-1",
      "version": "1.0.0"
    },
    "lastUpdated": "2024-01-15T10:30:00Z"
  },
  "message": "Apple test bilgileri başarıyla getirildi"
}
```

---

### 2. getTest()

Apple test sonuçlarını getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await appleTest.getTest();

if (result.success) {
  console.log('Apple test sonuçları:', result.data);
  const { testResults, scenarios, metrics } = result.data;
} else {
  console.error('Apple test sonuç hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "testId": "test_123456",
    "testDate": "2024-01-15T10:30:00Z",
    "testResults": {
      "overall": {
        "status": "passed",
        "successRate": 92.0,
        "totalTests": 25,
        "passedTests": 23,
        "failedTests": 2,
        "duration": 45000
      },
      "scenarios": [
        {
          "name": "successful_login",
          "status": "passed",
          "tests": 10,
          "passed": 10,
          "failed": 0,
          "averageTime": 650,
          "details": {
            "authUrl": "success",
            "callback": "success",
            "tokenExchange": "success",
            "userInfo": "success"
          }
        },
        {
          "name": "cancelled_login",
          "status": "passed",
          "tests": 5,
          "passed": 5,
          "failed": 0,
          "averageTime": 300,
          "details": {
            "userCancellation": "success",
            "errorHandling": "success",
            "redirect": "success"
          }
        },
        {
          "name": "invalid_credentials",
          "status": "passed",
          "tests": 5,
          "passed": 4,
          "failed": 1,
          "averageTime": 1200,
          "details": {
            "errorResponse": "success",
            "errorHandling": "success",
            "retryLogic": "failed"
          }
        },
        {
          "name": "network_error",
          "status": "failed",
          "tests": 3,
          "passed": 2,
          "failed": 1,
          "averageTime": 5000,
          "details": {
            "timeoutHandling": "success",
            "retryMechanism": "success",
            "fallback": "failed"
          }
        },
        {
          "name": "timeout_error",
          "status": "passed",
          "tests": 2,
          "passed": 2,
          "failed": 0,
          "averageTime": 30000,
          "details": {
            "timeoutDetection": "success",
            "errorRecovery": "success"
          }
        }
      ]
    },
    "metrics": {
      "performance": {
        "averageResponseTime": 850,
        "minResponseTime": 300,
        "maxResponseTime": 5000,
        "p95ResponseTime": 2000,
        "p99ResponseTime": 4500
      },
      "reliability": {
        "uptime": 99.5,
        "errorRate": 8.0,
        "retryRate": 15.0,
        "fallbackRate": 2.0
      },
      "security": {
        "tokenValidation": 100.0,
        "signatureVerification": 100.0,
        "encryptionCheck": 100.0,
        "privacyCompliance": 100.0
      }
    },
    "recommendations": [
      {
        "type": "performance",
        "message": "Network error handling'i iyileştirin",
        "priority": "medium"
      },
      {
        "type": "reliability",
        "message": "Retry mekanizmasını optimize edin",
        "priority": "low"
      }
    ],
    "nextTest": "2024-01-16T10:30:00Z"
  },
  "message": "Apple test sonuçları başarıyla getirildi"
}
```

---

### 3. setConfig(data: any)

Apple test konfigürasyonunu ayarlar

**Parametreler:**
- `data: any` - Konfigürasyon verileri

**Örnek Kullanım:**

```typescript
const result = await appleTest.setConfig({
  clientId: "com.zapi.app.test",
  teamId: "ABC123DEF4",
  keyId: "XYZ789GHI0",
  bundleId: "com.zapi.app",
  redirectUri: "https://zapi.com/auth/apple/callback",
  scope: ["name", "email"],
  environment: "sandbox",
  timeout: 30000,
  retryAttempts: 3
});

if (result.success) {
  console.log('Apple konfigürasyonu ayarlandı:', result.data);
} else {
  console.error('Apple konfigürasyon hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "configuration": {
      "clientId": "com.zapi.app.test",
      "teamId": "ABC123DEF4",
      "keyId": "XYZ789GHI0",
      "bundleId": "com.zapi.app",
      "redirectUri": "https://zapi.com/auth/apple/callback",
      "scope": ["name", "email"],
      "environment": "sandbox",
      "timeout": 30000,
      "retryAttempts": 3,
      "responseType": "code",
      "responseMode": "form_post"
    },
    "validation": {
      "clientId": "valid",
      "teamId": "valid",
      "keyId": "valid",
      "bundleId": "valid",
      "redirectUri": "valid",
      "scope": "valid"
    },
    "testSettings": {
      "autoTest": true,
      "testInterval": "daily",
      "notificationEnabled": true,
      "alertThreshold": 90.0
    },
    "updatedAt": "2024-01-15T10:30:00Z",
    "updatedBy": "admin_123"
  },
  "message": "Apple konfigürasyonu başarıyla ayarlandı"
}
```

---

### 4. generateUrl(data: any)

Apple test URL'si oluşturur

**Parametreler:**
- `data: any` - URL oluşturma verileri

**Örnek Kullanım:**

```typescript
const result = await appleTest.generateUrl({
  state: "test_state_123",
  nonce: "test_nonce_456",
  prompt: "login",
  responseMode: "form_post"
});

if (result.success) {
  console.log('Apple test URL:', result.data);
  const { authUrl, state, nonce } = result.data;
} else {
  console.error('Apple URL oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "authUrl": "https://appleid.apple.com/auth/authorize?client_id=com.zapi.app.test&redirect_uri=https%3A%2F%2Fzapi.com%2Fauth%2Fapple%2Fcallback&response_type=code&scope=name%20email&state=test_state_123&nonce=test_nonce_456&response_mode=form_post",
    "state": "test_state_123",
    "nonce": "test_nonce_456",
    "parameters": {
      "client_id": "com.zapi.app.test",
      "redirect_uri": "https://zapi.com/auth/apple/callback",
      "response_type": "code",
      "scope": "name email",
      "state": "test_state_123",
      "nonce": "test_nonce_456",
      "response_mode": "form_post"
    },
    "expiresAt": "2024-01-15T11:30:00Z",
    "testMode": true
  },
  "message": "Apple test URL başarıyla oluşturuldu"
}
```

---

### 5. testSecret(data: any)

Apple secret'ını test eder

**Parametreler:**
- `data: any` - Secret test verileri

**Örnek Kullanım:**

```typescript
const result = await appleTest.testSecret({
  clientSecret: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9...",
  clientId: "com.zapi.app.test",
  teamId: "ABC123DEF4",
  keyId: "XYZ789GHI0",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg...\n-----END PRIVATE KEY-----"
});

if (result.success) {
  console.log('Apple secret test sonucu:', result.data);
  const { status, validation, expiresAt } = result.data;
} else {
  console.error('Apple secret test hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "valid",
    "validation": {
      "clientSecret": "valid",
      "clientId": "valid",
      "teamId": "valid",
      "keyId": "valid",
      "privateKey": "valid",
      "signature": "valid",
      "expiration": "valid"
    },
    "tokenInfo": {
      "iss": "ABC123DEF4",
      "aud": "com.zapi.app.test",
      "sub": "com.zapi.app.test",
      "iat": 1705312200,
      "exp": 1705315800,
      "alg": "ES256"
    },
    "expiresAt": "2024-01-15T11:30:00Z",
    "testedAt": "2024-01-15T10:30:00Z",
    "recommendations": [
      {
        "type": "security",
        "message": "Private key'i güvenli bir yerde saklayın",
        "priority": "high"
      },
      {
        "type": "rotation",
        "message": "Secret'ı düzenli olarak yenileyin",
        "priority": "medium"
      }
    ]
  },
  "message": "Apple secret test başarılı"
}
```

---

### 6. handleCallback(data: any)

Apple callback'ini test eder

**Parametreler:**
- `data: any` - Callback test verileri

**Örnek Kullanım:**

```typescript
const result = await appleTest.handleCallback({
  code: "c1234567890abcdef",
  state: "test_state_123",
  user: {
    name: {
      firstName: "Test",
      lastName: "User"
    },
    email: "test@privaterelay.appleid.com"
  },
  error: null
});

if (result.success) {
  console.log('Apple callback test sonucu:', result.data);
  const { status, user, token } = result.data;
} else {
  console.error('Apple callback test hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "success",
    "callbackData": {
      "code": "c1234567890abcdef",
      "state": "test_state_123",
      "user": {
        "name": {
          "firstName": "Test",
          "lastName": "User"
        },
        "email": "test@privaterelay.appleid.com"
      },
      "error": null
    },
    "processedUser": {
      "id": "apple_user_123",
      "email": "test@privaterelay.appleid.com",
      "firstName": "Test",
      "lastName": "User",
      "provider": "apple",
      "isVerified": true
    },
    "tokenExchange": {
      "status": "success",
      "accessToken": "access_token_123",
      "idToken": "id_token_456",
      "refreshToken": "refresh_token_789",
      "expiresIn": 3600
    },
    "validation": {
      "code": "valid",
      "state": "valid",
      "user": "valid",
      "signature": "valid"
    },
    "testedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Apple callback test başarılı"
}
```

---

### 7. exchangeToken(data: any)

Apple token exchange'ini test eder

**Parametreler:**
- `data: any` - Token exchange test verileri

**Örnek Kullanım:**

```typescript
const result = await appleTest.exchangeToken({
  authorizationCode: "c1234567890abcdef",
  clientId: "com.zapi.app.test",
  clientSecret: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9...",
  redirectUri: "https://zapi.com/auth/apple/callback"
});

if (result.success) {
  console.log('Apple token exchange sonucu:', result.data);
  const { accessToken, idToken, refreshToken } = result.data;
} else {
  console.error('Apple token exchange hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "success",
    "tokens": {
      "accessToken": "access_token_1234567890abcdef",
      "idToken": "id_token_abcdef1234567890",
      "refreshToken": "refresh_token_0987654321fedcba",
      "tokenType": "Bearer",
      "expiresIn": 3600
    },
    "tokenInfo": {
      "accessToken": {
        "scope": "name email",
        "audience": "com.zapi.app.test",
        "expiresAt": "2024-01-15T11:30:00Z"
      },
      "idToken": {
        "iss": "https://appleid.apple.com",
        "aud": "com.zapi.app.test",
        "sub": "apple_user_123",
        "email": "test@privaterelay.appleid.com",
        "emailVerified": true,
        "exp": 1705315800,
        "iat": 1705312200
      },
      "refreshToken": {
        "expiresAt": "2024-02-15T10:30:00Z",
        "canRefresh": true
      }
    },
    "validation": {
      "accessToken": "valid",
      "idToken": "valid",
      "refreshToken": "valid",
      "signature": "valid",
      "expiration": "valid"
    },
    "testedAt": "2024-01-15T10:30:00Z",
    "nextRefresh": "2024-01-15T11:30:00Z"
  },
  "message": "Apple token exchange test başarılı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "TOKEN_EXCHANGE_FAILED",
    "message": "Token exchange başarısız - Geçersiz authorization code"
  }
}
```

---

## Apple Test Senaryoları

| Senaryo | Açıklama | Test Türü |
|---------|----------|-----------|
| `successful_login` | Başarılı giriş | Pozitif |
| `cancelled_login` | Kullanıcı iptali | Negatif |
| `invalid_credentials` | Geçersiz kimlik bilgileri | Negatif |
| `network_error` | Ağ hatası | Hata |
| `timeout_error` | Zaman aşımı | Hata |

## Apple Test Metrikleri

| Metrik | Açıklama | Hedef |
|--------|----------|-------|
| `successRate` | Başarı oranı | >95% |
| `averageResponseTime` | Ortalama yanıt süresi | <1000ms |
| `uptime` | Çalışma süresi | >99% |
| `errorRate` | Hata oranı | <5% |

## Apple Test Durumları

| Durum | Açıklama |
|-------|----------|
| `passed` | Test başarılı |
| `failed` | Test başarısız |
| `warning` | Test uyarılı |
| `skipped` | Test atlandı |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `APPLE_TEST_FAILED` | Apple test başarısız |
| `CONFIGURATION_INVALID` | Konfigürasyon geçersiz |
| `URL_GENERATION_FAILED` | URL oluşturma başarısız |
| `SECRET_TEST_FAILED` | Secret test başarısız |
| `CALLBACK_TEST_FAILED` | Callback test başarısız |
| `TOKEN_EXCHANGE_FAILED` | Token exchange başarısız |
| `INVALID_PARAMETERS` | Geçersiz parametreler |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Apple secret'larını güvenli bir yerde saklayın
- Private key'leri güvenli tutun
- Test verilerini production'da kullanmayın
- Token'ları güvenli bir şekilde işleyin
- Düzenli olarak güvenlik denetimleri yapın

## Apple Test Yönetimi

```typescript
// Apple test bilgileri
const testInfo = await appleTest.get();

// Test sonuçları
const testResults = await appleTest.getTest();

// Konfigürasyon ayarlama
await appleTest.setConfig({
  clientId: "com.zapi.app.test",
  teamId: "ABC123DEF4",
  keyId: "XYZ789GHI0"
});

// Test URL oluşturma
const testUrl = await appleTest.generateUrl({
  state: "test_state_123"
});

// Secret test
await appleTest.testSecret({
  clientSecret: "your_client_secret"
});

// Callback test
await appleTest.handleCallback({
  code: "test_code",
  state: "test_state"
});

// Token exchange test
await appleTest.exchangeToken({
  authorizationCode: "test_code"
});
```

## Apple Test Analizi

```typescript
// Test sonuçları analizi
const testResults = await appleTest.getTest();

// Genel başarı oranı
const overallSuccess = testResults.data.testResults.overall.successRate;
console.log('Genel başarı oranı:', overallSuccess + '%');

// Senaryo bazlı analiz
testResults.data.testResults.scenarios.forEach(scenario => {
  console.log(`${scenario.name}: ${scenario.status} (${scenario.passed}/${scenario.tests})`);
});

// Performans metrikleri
const performance = testResults.data.metrics.performance;
console.log('Ortalama yanıt süresi:', performance.averageResponseTime + 'ms');
console.log('P95 yanıt süresi:', performance.p95ResponseTime + 'ms');
```

## Apple Test Önerileri

```typescript
// Test önerileri
const testResults = await appleTest.getTest();
const recommendations = testResults.data.recommendations;

recommendations.forEach(rec => {
  console.log(`${rec.type}: ${rec.message} (Öncelik: ${rec.priority})`);
});

// Yüksek öncelikli öneriler
const highPriority = recommendations.filter(rec => rec.priority === 'high');
console.log('Yüksek öncelikli öneriler:', highPriority.length);
```

## Apple Test Konfigürasyonu

```typescript
// Konfigürasyon ayarlama
const config = await appleTest.setConfig({
  clientId: "com.zapi.app.test",
  teamId: "ABC123DEF4",
  keyId: "XYZ789GHI0",
  bundleId: "com.zapi.app",
  environment: "sandbox",
  timeout: 30000,
  retryAttempts: 3
});

// Konfigürasyon doğrulama
const validation = config.data.validation;
Object.entries(validation).forEach(([key, status]) => {
  console.log(`${key}: ${status}`);
});

// Test ayarları
const testSettings = config.data.testSettings;
console.log('Otomatik test:', testSettings.autoTest);
console.log('Test aralığı:', testSettings.testInterval);
console.log('Uyarı eşiği:', testSettings.alertThreshold + '%');
```
