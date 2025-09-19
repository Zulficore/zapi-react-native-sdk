# AuthOAuth Endpoint

OAuth kimlik doğrulama endpoint'leri - Google, Apple ve diğer OAuth sağlayıcıları ile giriş, hesap bağlama ve metadata yönetimi.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const authOAuth = zapi.authOAuth;
```

## Metodlar

### 1. initiateGoogleLogin(appId: string, options: any)

Google OAuth girişini başlatır

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `options: any` - Ek seçenekler (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await authOAuth.initiateGoogleLogin("app_123", {
  redirectUri: "https://myapp.com/auth/callback",
  scope: ["email", "profile"],
  state: "random_state_string"
});

if (result.success) {
  console.log('Google giriş URL:', result.data.authUrl);
  // Kullanıcıyı bu URL'ye yönlendir
  window.location.href = result.data.authUrl;
} else {
  console.error('Google giriş başlatma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "authUrl": "https://accounts.google.com/oauth/authorize?client_id=...",
    "state": "random_state_string",
    "expiresIn": 600
  },
  "message": "Google giriş başlatıldı"
}
```

---

### 2. initiateAppleLogin(appId: string, options: any)

Apple OAuth girişini başlatır

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `options: any` - Ek seçenekler (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await authOAuth.initiateAppleLogin("app_123", {
  redirectUri: "https://myapp.com/auth/callback",
  scope: ["name", "email"],
  state: "random_state_string"
});

if (result.success) {
  console.log('Apple giriş URL:', result.data.authUrl);
  // Kullanıcıyı bu URL'ye yönlendir
  window.location.href = result.data.authUrl;
} else {
  console.error('Apple giriş başlatma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "authUrl": "https://appleid.apple.com/auth/authorize?client_id=...",
    "state": "random_state_string",
    "expiresIn": 600
  },
  "message": "Apple giriş başlatıldı"
}
```

---

### 3. handleGoogleCallback(code: string, state: string, options: any)

Google OAuth callback'ini işler

**Parametreler:**
- `code: string` - OAuth authorization code
- `state: string` - State parametresi
- `options: any` - Ek seçenekler (opsiyonel)

**Örnek Kullanım:**

```typescript
// Callback URL'den parametreleri al
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const state = urlParams.get('state');

const result = await authOAuth.handleGoogleCallback(code, state, {
  createAccount: true
});

if (result.success) {
  console.log('Google giriş başarılı:', result.data);
  zapi.setBearerToken(result.data.token);
} else {
  console.error('Google callback hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@gmail.com",
      "firstName": "John",
      "lastName": "Doe",
      "provider": "google",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "Google giriş başarılı"
}
```

---

### 4. handleAppleCallback(code: string, state: string, options: any)

Apple OAuth callback'ini işler

**Parametreler:**
- `code: string` - OAuth authorization code
- `state: string` - State parametresi
- `options: any` - Ek seçenekler (opsiyonel)

**Örnek Kullanım:**

```typescript
// Callback URL'den parametreleri al
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const state = urlParams.get('state');

const result = await authOAuth.handleAppleCallback(code, state, {
  createAccount: true
});

if (result.success) {
  console.log('Apple giriş başarılı:', result.data);
  zapi.setBearerToken(result.data.token);
} else {
  console.error('Apple callback hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@privaterelay.appleid.com",
      "firstName": "John",
      "lastName": "Doe",
      "provider": "apple",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "Apple giriş başarılı"
}
```

---

### 5. linkAccount(provider: string, accessToken: string, options: any)

Mevcut hesaba OAuth sağlayıcısını bağlar

**Parametreler:**
- `provider: string` - OAuth sağlayıcısı (google, apple, facebook)
- `accessToken: string` - OAuth access token
- `options: any` - Ek seçenekler (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await authOAuth.linkAccount("google", "google_access_token_123", {
  mergeData: true
});

if (result.success) {
  console.log('Hesap bağlandı:', result.data);
} else {
  console.error('Hesap bağlama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "linkedProviders": ["email", "google"],
    "user": {
      "id": "user_123",
      "email": "user@gmail.com",
      "providers": ["email", "google"]
    }
  },
  "message": "Hesap başarıyla bağlandı"
}
```

---

### 6. unlinkAccount(provider: string)

Hesaptan OAuth sağlayıcısını kaldırır

**Parametreler:**
- `provider: string` - Kaldırılacak OAuth sağlayıcısı

**Örnek Kullanım:**

```typescript
const result = await authOAuth.unlinkAccount("google");

if (result.success) {
  console.log('Hesap bağlantısı kaldırıldı');
} else {
  console.error('Hesap bağlantısı kaldırma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "linkedProviders": ["email"],
    "user": {
      "id": "user_123",
      "email": "user@gmail.com",
      "providers": ["email"]
    }
  },
  "message": "Hesap bağlantısı başarıyla kaldırıldı"
}
```

---

### 7. getSuccessPage(options: any)

Başarılı giriş sayfasını getirir

**Parametreler:**
- `options: any` - Sayfa seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await authOAuth.getSuccessPage({
  redirectUrl: "https://myapp.com/dashboard",
  message: "Giriş başarılı!"
});

if (result.success) {
  console.log('Başarı sayfası:', result.data);
} else {
  console.error('Başarı sayfası hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "html": "<html><body><h1>Giriş Başarılı!</h1></body></html>",
    "redirectUrl": "https://myapp.com/dashboard"
  },
  "message": "Başarı sayfası başarıyla getirildi"
}
```

---

### 8. getErrorPage(options: any)

Hata sayfasını getirir

**Parametreler:**
- `options: any` - Sayfa seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await authOAuth.getErrorPage({
  error: "access_denied",
  message: "Giriş reddedildi"
});

if (result.success) {
  console.log('Hata sayfası:', result.data);
} else {
  console.error('Hata sayfası hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "html": "<html><body><h1>Giriş Hatası</h1><p>Giriş reddedildi</p></body></html>",
    "error": "access_denied"
  },
  "message": "Hata sayfası başarıyla getirildi"
}
```

---

### 9. sandboxTest(provider: string)

OAuth sağlayıcısını test eder

**Parametreler:**
- `provider: string` - Test edilecek sağlayıcı

**Örnek Kullanım:**

```typescript
const result = await authOAuth.sandboxTest("google");

if (result.success) {
  console.log('Test sonucu:', result.data);
} else {
  console.error('Test hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "provider": "google",
    "status": "connected",
    "testResults": {
      "authUrl": "success",
      "tokenExchange": "success",
      "userInfo": "success"
    },
    "testedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Test başarıyla tamamlandı"
}
```

---

### 10. getDebugInfo(provider: string)

OAuth sağlayıcısı debug bilgilerini getirir

**Parametreler:**
- `provider: string` - Debug bilgisi alınacak sağlayıcı

**Örnek Kullanım:**

```typescript
const result = await authOAuth.getDebugInfo("google");

if (result.success) {
  console.log('Debug bilgileri:', result.data);
} else {
  console.error('Debug bilgi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "provider": "google",
    "config": {
      "clientId": "google_client_id",
      "redirectUri": "https://myapp.com/auth/callback",
      "scope": ["email", "profile"]
    },
    "status": {
      "isConfigured": true,
      "isActive": true,
      "lastTest": "2024-01-15T10:30:00Z"
    }
  },
  "message": "Debug bilgileri başarıyla getirildi"
}
```

---

### 11. getMetadata(appId: string, path: string)

OAuth metadata bilgilerini getirir

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Metadata yolu (varsayılan: '')

**Örnek Kullanım:**

```typescript
// Tüm metadata'yı getir
const result = await authOAuth.getMetadata("app_123");

// Belirli bir path'i getir
const result = await authOAuth.getMetadata("app_123", "google.clientId");

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
    "google": {
      "clientId": "google_client_id",
      "clientSecret": "google_client_secret",
      "redirectUri": "https://myapp.com/auth/callback"
    },
    "apple": {
      "clientId": "apple_client_id",
      "teamId": "apple_team_id",
      "keyId": "apple_key_id"
    }
  },
  "message": "Metadata başarıyla getirildi"
}
```

---

### 12. updateMetadata(appId: string, path: string, value: any)

OAuth metadata bilgilerini günceller

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Metadata yolu
- `value: any` - Güncellenecek değer

**Örnek Kullanım:**

```typescript
const result = await authOAuth.updateMetadata("app_123", "google.clientId", "new_google_client_id");

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
    "google": {
      "clientId": "new_google_client_id",
      "clientSecret": "google_client_secret",
      "redirectUri": "https://myapp.com/auth/callback"
    }
  },
  "message": "Metadata başarıyla güncellendi"
}
```

---

### 13. patchMetadata(appId: string, path: string, value: any)

OAuth metadata bilgilerini kısmi olarak günceller

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Metadata yolu
- `value: any` - Güncellenecek değer

**Örnek Kullanım:**

```typescript
const result = await authOAuth.patchMetadata("app_123", "google.redirectUri", "https://newapp.com/auth/callback");

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
    "google": {
      "clientId": "google_client_id",
      "clientSecret": "google_client_secret",
      "redirectUri": "https://newapp.com/auth/callback"
    }
  },
  "message": "Metadata başarıyla güncellendi"
}
```

---

### 14. deleteMetadata(appId: string, path: string)

OAuth metadata bilgilerini siler

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Metadata yolu

**Örnek Kullanım:**

```typescript
const result = await authOAuth.deleteMetadata("app_123", "google.clientSecret");

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

### 15. getProviders(appId: string)

Uygulama için yapılandırılmış OAuth sağlayıcılarını getirir

**Parametreler:**
- `appId: string` - Uygulama ID'si

**Örnek Kullanım:**

```typescript
const result = await authOAuth.getProviders("app_123");

if (result.success) {
  console.log('OAuth sağlayıcıları:', result.data);
} else {
  console.error('Sağlayıcı getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "providers": [
      {
        "id": "google",
        "name": "Google",
        "isActive": true,
        "isConfigured": true
      },
      {
        "id": "apple",
        "name": "Apple",
        "isActive": true,
        "isConfigured": true
      },
      {
        "id": "facebook",
        "name": "Facebook",
        "isActive": false,
        "isConfigured": false
      }
    ]
  },
  "message": "OAuth sağlayıcıları başarıyla getirildi"
}
```

---

### 16. generateUrl(data: any)

OAuth URL'si oluşturur

**Parametreler:**
- `data: any` - URL oluşturma verileri

**Örnek Kullanım:**

```typescript
const result = await authOAuth.generateUrl({
  provider: "google",
  appId: "app_123",
  redirectUri: "https://myapp.com/auth/callback",
  scope: ["email", "profile"],
  state: "random_state"
});

if (result.success) {
  console.log('OAuth URL:', result.data.url);
} else {
  console.error('URL oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "url": "https://accounts.google.com/oauth/authorize?client_id=...",
    "provider": "google",
    "expiresIn": 600
  },
  "message": "OAuth URL başarıyla oluşturuldu"
}
```

---

### 17. testSecret(data: any)

OAuth secret'larını test eder

**Parametreler:**
- `data: any` - Test verileri

**Örnek Kullanım:**

```typescript
const result = await authOAuth.testSecret({
  provider: "google",
  clientId: "google_client_id",
  clientSecret: "google_client_secret"
});

if (result.success) {
  console.log('Secret test sonucu:', result.data);
} else {
  console.error('Secret test hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "provider": "google",
    "status": "valid",
    "testResults": {
      "clientId": "valid",
      "clientSecret": "valid",
      "redirectUri": "valid"
    },
    "testedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Secret test başarılı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CLIENT_SECRET",
    "message": "Geçersiz client secret"
  }
}
```

---

## OAuth Sağlayıcıları

| Sağlayıcı | Açıklama | Gereksinimler |
|-----------|----------|---------------|
| `google` | Google OAuth | Google Cloud Console yapılandırması |
| `apple` | Apple Sign In | Apple Developer yapılandırması |
| `facebook` | Facebook Login | Facebook Developer yapılandırması |
| `github` | GitHub OAuth | GitHub App yapılandırması |
| `linkedin` | LinkedIn OAuth | LinkedIn Developer yapılandırması |

## OAuth Akışı

1. **Giriş Başlatma:** `initiateGoogleLogin()` veya `initiateAppleLogin()`
2. **Kullanıcı Yönlendirme:** Kullanıcıyı dönen URL'ye yönlendir
3. **Callback İşleme:** `handleGoogleCallback()` veya `handleAppleCallback()`
4. **Token Alma:** Başarılı callback'ten token al
5. **API Kullanımı:** Token ile API'yi kullan

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `INVALID_APP_ID` | Geçersiz uygulama ID'si |
| `INVALID_OAUTH_CODE` | Geçersiz OAuth kodu |
| `INVALID_STATE` | Geçersiz state parametresi |
| `OAUTH_PROVIDER_ERROR` | OAuth sağlayıcı hatası |
| `ACCOUNT_LINKING_FAILED` | Hesap bağlama başarısız |
| `INVALID_CLIENT_SECRET` | Geçersiz client secret |
| `PROVIDER_NOT_CONFIGURED` | Sağlayıcı yapılandırılmamış |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- State parametresini güvenli bir şekilde oluşturun
- Redirect URI'lerini güvenli tutun
- Client secret'ları güvenli bir yerde saklayın
- OAuth token'larını güvenli bir şekilde işleyin
- HTTPS kullanın
- CSRF koruması uygulayın

## Callback URL Yapılandırması

```typescript
// Callback URL'den parametreleri alma
const handleCallback = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  const error = urlParams.get('error');
  
  if (error) {
    console.error('OAuth hatası:', error);
    return;
  }
  
  if (code && state) {
    // Callback'i işle
    authOAuth.handleGoogleCallback(code, state);
  }
};
```
