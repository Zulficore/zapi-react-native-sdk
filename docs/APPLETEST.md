# AppleTest Endpoint - 7 Metod

Apple test yönetimi için kullanılan endpoint.

## Metodlar

### 1. getTestPage(): Promise<ApiResponse>
Test sayfasını getirir.

**Detaylı Örnek:**
```typescript
const testPage = await zapi.appleTest.getTestPage();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Test sayfası getirildi",
  "data": {
    "page": {
      "title": "Apple Test Sayfası",
      "content": "Apple entegrasyonu test sayfası",
      "url": "https://api.zapi.com/apple-test",
      "status": "active",
      "lastUpdated": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 2. postConfig(data: any): Promise<ApiResponse>
Apple konfigürasyonunu gönderir.

**Parametreler:**
- `data` (any): Konfigürasyon verileri
  - `clientId` (string): Apple Client ID
  - `teamId` (string): Apple Team ID
  - `keyId` (string): Apple Key ID
  - `privateKey` (string): Apple Private Key

**Detaylı Örnek:**
```typescript
const config = await zapi.appleTest.postConfig({
  clientId: 'com.example.app',
  teamId: 'TEAM123456',
  keyId: 'KEY123456',
  privateKey: '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg...\n-----END PRIVATE KEY-----'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Apple konfigürasyonu gönderildi",
  "data": {
    "config": {
      "clientId": "com.example.app",
      "teamId": "TEAM123456",
      "keyId": "KEY123456",
      "status": "valid",
      "createdAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. generateUrl(data: any): Promise<ApiResponse>
Apple OAuth URL'i oluşturur.

**Parametreler:**
- `data` (any): URL verileri
  - `redirectUri` (string): Yönlendirme URI'si
  - `state` (string): Durum parametresi
  - `scope` (string): Kapsam

**Detaylı Örnek:**
```typescript
const url = await zapi.appleTest.generateUrl({
  redirectUri: 'https://myapp.com/auth/apple/callback',
  state: 'random_state_string',
  scope: 'name email'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Apple OAuth URL'i oluşturuldu",
  "data": {
    "url": "https://appleid.apple.com/auth/authorize?client_id=com.example.app&redirect_uri=https://myapp.com/auth/apple/callback&response_type=code&scope=name email&state=random_state_string",
    "state": "random_state_string",
    "expiresAt": "2024-01-15T11:40:00Z"
  }
}
*/
```

### 4. testSecret(data: any): Promise<ApiResponse>
Apple secret'ını test eder.

**Parametreler:**
- `data` (any): Test verileri
  - `clientId` (string): Apple Client ID
  - `teamId` (string): Apple Team ID
  - `keyId` (string): Apple Key ID
  - `privateKey` (string): Apple Private Key

**Detaylı Örnek:**
```typescript
const test = await zapi.appleTest.testSecret({
  clientId: 'com.example.app',
  teamId: 'TEAM123456',
  keyId: 'KEY123456',
  privateKey: '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg...\n-----END PRIVATE KEY-----'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Apple secret test edildi",
  "data": {
    "test": {
      "clientId": "com.example.app",
      "teamId": "TEAM123456",
      "keyId": "KEY123456",
      "status": "valid",
      "testedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 5. handleCallback(data: any): Promise<ApiResponse>
Apple callback'ini işler.

**Parametreler:**
- `data` (any): Callback verileri
  - `code` (string): Authorization code
  - `state` (string): Durum parametresi
  - `redirectUri` (string): Yönlendirme URI'si

**Detaylı Örnek:**
```typescript
const callback = await zapi.appleTest.handleCallback({
  code: 'authorization_code_from_apple',
  state: 'random_state_string',
  redirectUri: 'https://myapp.com/auth/apple/callback'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Apple callback işlendi",
  "data": {
    "auth": {
      "provider": "apple",
      "providerId": "apple_user_id",
      "email": "user@privaterelay.appleid.com",
      "name": "John Doe",
      "avatar": null,
      "accessToken": "apple_access_token",
      "refreshToken": "apple_refresh_token",
      "expiresAt": "2024-01-15T11:40:00Z"
    },
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@privaterelay.appleid.com",
      "name": "John Doe",
      "avatar": null,
      "provider": "apple",
      "providerId": "apple_user_id"
    },
    "tokens": {
      "accessToken": "zapi_access_token",
      "refreshToken": "zapi_refresh_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/
```

### 6. exchangeToken(data: any): Promise<ApiResponse>
Apple token değişimi yapar.

**Parametreler:**
- `data` (any): Token verileri
  - `code` (string): Authorization code
  - `redirectUri` (string): Yönlendirme URI'si

**Detaylı Örnek:**
```typescript
const exchange = await zapi.appleTest.exchangeToken({
  code: 'authorization_code_from_apple',
  redirectUri: 'https://myapp.com/auth/apple/callback'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Apple token değişimi yapıldı",
  "data": {
    "tokens": {
      "accessToken": "apple_access_token",
      "refreshToken": "apple_refresh_token",
      "idToken": "apple_id_token",
      "expiresAt": "2024-01-15T11:40:00Z"
    },
    "user": {
      "id": "apple_user_id",
      "email": "user@privaterelay.appleid.com",
      "name": "John Doe",
      "provider": "apple"
    }
  }
}
*/
```

### 7. getTestStatus(): Promise<ApiResponse>
Test durumunu getirir.

**Detaylı Örnek:**
```typescript
const status = await zapi.appleTest.getTestStatus();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Test durumu getirildi",
  "data": {
    "status": {
      "configured": true,
      "clientId": "com.example.app",
      "teamId": "TEAM123456",
      "keyId": "KEY123456",
      "lastTest": "2024-01-15T10:40:00Z",
      "testResult": "success",
      "activeTests": 3,
      "totalTests": 10,
      "successRate": 100
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
  // 1. Test sayfasını getir
  const testPage = await zapi.appleTest.getTestPage();
  console.log('Test sayfası:', testPage.data.page.title);
  console.log('URL:', testPage.data.page.url);
  
  // 2. Apple konfigürasyonunu gönder
  const config = await zapi.appleTest.postConfig({
    clientId: 'com.example.app',
    teamId: 'TEAM123456',
    keyId: 'KEY123456',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg...\n-----END PRIVATE KEY-----'
  });
  console.log('Konfigürasyon durumu:', config.data.config.status);
  
  // 3. Apple OAuth URL'i oluştur
  const url = await zapi.appleTest.generateUrl({
    redirectUri: 'https://myapp.com/auth/apple/callback',
    state: 'random_state_string',
    scope: 'name email'
  });
  console.log('OAuth URL:', url.data.url);
  
  // 4. Apple secret'ını test et
  const test = await zapi.appleTest.testSecret({
    clientId: 'com.example.app',
    teamId: 'TEAM123456',
    keyId: 'KEY123456',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg...\n-----END PRIVATE KEY-----'
  });
  console.log('Secret test durumu:', test.data.test.status);
  
  // 5. Apple callback'ini işle
  const callback = await zapi.appleTest.handleCallback({
    code: 'authorization_code_from_apple',
    state: 'random_state_string',
    redirectUri: 'https://myapp.com/auth/apple/callback'
  });
  console.log('Kullanıcı:', callback.data.user.name);
  console.log('E-posta:', callback.data.user.email);
  
  // 6. Apple token değişimi
  const exchange = await zapi.appleTest.exchangeToken({
    code: 'authorization_code_from_apple',
    redirectUri: 'https://myapp.com/auth/apple/callback'
  });
  console.log('Apple Token:', exchange.data.tokens.accessToken);
  console.log('ID Token:', exchange.data.tokens.idToken);
  
  // 7. Test durumunu getir
  const status = await zapi.appleTest.getTestStatus();
  console.log('Konfigüre edildi:', status.data.status.configured);
  console.log('Son test:', status.data.status.lastTest);
  console.log('Başarı oranı:', status.data.status.successRate);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
