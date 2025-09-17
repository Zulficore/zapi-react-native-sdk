# AuthOAuth Endpoint - 18 Metod

OAuth kimlik doğrulama için kullanılan endpoint.

## Metodlar

### 1. getProviders(appId: string): Promise<ApiResponse>
OAuth sağlayıcılarını getirir.

**Parametreler:**
- `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const providers = await zapi.authOAuth.getProviders('app_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "OAuth sağlayıcıları getirildi",
  "data": {
    "providers": [
      {
        "id": "google",
        "name": "Google",
        "enabled": true,
        "clientId": "google_client_id",
        "scopes": ["openid", "profile", "email"],
        "icon": "https://cdn.zapi.com/icons/google.svg",
        "color": "#4285F4"
      },
      {
        "id": "facebook",
        "name": "Facebook",
        "enabled": true,
        "clientId": "facebook_client_id",
        "scopes": ["email", "public_profile"],
        "icon": "https://cdn.zapi.com/icons/facebook.svg",
        "color": "#1877F2"
      }
    ]
  }
}
*/
```

### 2. generateUrl(data: any): Promise<ApiResponse>
OAuth URL'i oluşturur.

**Parametreler:**
- `data` (any): OAuth verileri
  - `provider` (string): Sağlayıcı adı
  - `appId` (string): Uygulama ID'si
  - `redirectUri` (string): Yönlendirme URI'si
  - `state` (string): Durum parametresi

**Detaylı Örnek:**
```typescript
const url = await zapi.authOAuth.generateUrl({
  provider: 'google',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0',
  redirectUri: 'https://myapp.com/auth/callback',
  state: 'random_state_string'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "OAuth URL'i oluşturuldu",
  "data": {
    "url": "https://accounts.google.com/oauth/authorize?client_id=google_client_id&redirect_uri=https://myapp.com/auth/callback&scope=openid profile email&response_type=code&state=random_state_string",
    "provider": "google",
    "state": "random_state_string",
    "expiresAt": "2024-01-15T11:40:00Z"
  }
}
*/
```

### 3. testSecret(data: any): Promise<ApiResponse>
OAuth secret'ını test eder.

**Parametreler:**
- `data` (any): Test verileri
  - `provider` (string): Sağlayıcı adı
  - `clientId` (string): Client ID
  - `clientSecret` (string): Client Secret

**Detaylı Örnek:**
```typescript
const test = await zapi.authOAuth.testSecret({
  provider: 'google',
  clientId: 'google_client_id',
  clientSecret: 'google_client_secret'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "OAuth secret test edildi",
  "data": {
    "test": {
      "provider": "google",
      "status": "valid",
      "clientId": "google_client_id",
      "scopes": ["openid", "profile", "email"],
      "testedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 4. handleCallback(data: any): Promise<ApiResponse>
OAuth callback'ini işler.

**Parametreler:**
- `data` (any): Callback verileri
  - `provider` (string): Sağlayıcı adı
  - `code` (string): Authorization code
  - `state` (string): Durum parametresi
  - `redirectUri` (string): Yönlendirme URI'si

**Detaylı Örnek:**
```typescript
const callback = await zapi.authOAuth.handleCallback({
  provider: 'google',
  code: 'authorization_code_from_google',
  state: 'random_state_string',
  redirectUri: 'https://myapp.com/auth/callback'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "OAuth callback işlendi",
  "data": {
    "auth": {
      "provider": "google",
      "providerId": "google_user_id",
      "email": "user@gmail.com",
      "name": "John Doe",
      "avatar": "https://lh3.googleusercontent.com/avatar.jpg",
      "accessToken": "google_access_token",
      "refreshToken": "google_refresh_token",
      "expiresAt": "2024-01-15T11:40:00Z"
    },
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@gmail.com",
      "name": "John Doe",
      "avatar": "https://lh3.googleusercontent.com/avatar.jpg",
      "provider": "google",
      "providerId": "google_user_id"
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

### 5. exchangeToken(data: any): Promise<ApiResponse>
Token değişimi yapar.

**Parametreler:**
- `data` (any): Token verileri
  - `provider` (string): Sağlayıcı adı
  - `accessToken` (string): Access token
  - `refreshToken` (string): Refresh token

**Detaylı Örnek:**
```typescript
const exchange = await zapi.authOAuth.exchangeToken({
  provider: 'google',
  accessToken: 'google_access_token',
  refreshToken: 'google_refresh_token'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Token değişimi yapıldı",
  "data": {
    "tokens": {
      "accessToken": "zapi_access_token",
      "refreshToken": "zapi_refresh_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    },
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@gmail.com",
      "name": "John Doe",
      "provider": "google"
    }
  }
}
*/
```

### 6. refreshToken(data: any): Promise<ApiResponse>
Token yeniler.

**Parametreler:**
- `data` (any): Token verileri
  - `provider` (string): Sağlayıcı adı
  - `refreshToken` (string): Refresh token

**Detaylı Örnek:**
```typescript
const refresh = await zapi.authOAuth.refreshToken({
  provider: 'google',
  refreshToken: 'google_refresh_token'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Token yenilendi",
  "data": {
    "tokens": {
      "accessToken": "new_google_access_token",
      "refreshToken": "new_google_refresh_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/
```

### 7. revokeToken(data: any): Promise<ApiResponse>
Token'ı iptal eder.

**Parametreler:**
- `data` (any): Token verileri
  - `provider` (string): Sağlayıcı adı
  - `accessToken` (string): Access token

**Detaylı Örnek:**
```typescript
const revoke = await zapi.authOAuth.revokeToken({
  provider: 'google',
  accessToken: 'google_access_token'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Token iptal edildi",
  "data": {
    "revoked": {
      "provider": "google",
      "accessToken": "google_access_token",
      "revokedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 8. getUserInfo(data: any): Promise<ApiResponse>
Kullanıcı bilgilerini getirir.

**Parametreler:**
- `data` (any): Token verileri
  - `provider` (string): Sağlayıcı adı
  - `accessToken` (string): Access token

**Detaylı Örnek:**
```typescript
const userInfo = await zapi.authOAuth.getUserInfo({
  provider: 'google',
  accessToken: 'google_access_token'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcı bilgileri getirildi",
  "data": {
    "user": {
      "id": "google_user_id",
      "email": "user@gmail.com",
      "name": "John Doe",
      "avatar": "https://lh3.googleusercontent.com/avatar.jpg",
      "verified": true,
      "locale": "en",
      "provider": "google"
    }
  }
}
*/
```

### 9. linkAccount(data: any): Promise<ApiResponse>
Hesap bağlar.

**Parametreler:**
- `data` (any): Bağlantı verileri
  - `userId` (string): Kullanıcı ID'si
  - `provider` (string): Sağlayıcı adı
  - `accessToken` (string): Access token

**Detaylı Örnek:**
```typescript
const link = await zapi.authOAuth.linkAccount({
  userId: 'user_64f8a1b2c3d4e5f6g7h8i9j0',
  provider: 'google',
  accessToken: 'google_access_token'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Hesap bağlandı",
  "data": {
    "link": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "provider": "google",
      "providerId": "google_user_id",
      "linkedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 10. unlinkAccount(data: any): Promise<ApiResponse>
Hesap bağlantısını kaldırır.

**Parametreler:**
- `data` (any): Bağlantı verileri
  - `userId` (string): Kullanıcı ID'si
  - `provider` (string): Sağlayıcı adı

**Detaylı Örnek:**
```typescript
const unlink = await zapi.authOAuth.unlinkAccount({
  userId: 'user_64f8a1b2c3d4e5f6g7h8i9j0',
  provider: 'google'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Hesap bağlantısı kaldırıldı",
  "data": {
    "unlink": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "provider": "google",
      "unlinkedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 11. getLinkedAccounts(userId: string): Promise<ApiResponse>
Bağlı hesapları getirir.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si

**Detaylı Örnek:**
```typescript
const accounts = await zapi.authOAuth.getLinkedAccounts('user_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Bağlı hesaplar getirildi",
  "data": {
    "accounts": [
      {
        "provider": "google",
        "providerId": "google_user_id",
        "email": "user@gmail.com",
        "name": "John Doe",
        "avatar": "https://lh3.googleusercontent.com/avatar.jpg",
        "linkedAt": "2024-01-15T10:40:00Z",
        "lastUsed": "2024-01-15T10:40:00Z"
      },
      {
        "provider": "facebook",
        "providerId": "facebook_user_id",
        "email": "user@facebook.com",
        "name": "John Doe",
        "avatar": "https://graph.facebook.com/avatar.jpg",
        "linkedAt": "2024-01-14T10:40:00Z",
        "lastUsed": "2024-01-14T10:40:00Z"
      }
    ]
  }
}
*/
```

### 12. validateToken(data: any): Promise<ApiResponse>
Token'ı doğrular.

**Parametreler:**
- `data` (any): Token verileri
  - `provider` (string): Sağlayıcı adı
  - `accessToken` (string): Access token

**Detaylı Örnek:**
```typescript
const validate = await zapi.authOAuth.validateToken({
  provider: 'google',
  accessToken: 'google_access_token'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Token doğrulandı",
  "data": {
    "validation": {
      "provider": "google",
      "status": "valid",
      "expiresAt": "2024-01-16T10:40:00Z",
      "scopes": ["openid", "profile", "email"],
      "validatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 13. getTokenInfo(data: any): Promise<ApiResponse>
Token bilgilerini getirir.

**Parametreler:**
- `data` (any): Token verileri
  - `provider` (string): Sağlayıcı adı
  - `accessToken` (string): Access token

**Detaylı Örnek:**
```typescript
const tokenInfo = await zapi.authOAuth.getTokenInfo({
  provider: 'google',
  accessToken: 'google_access_token'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Token bilgileri getirildi",
  "data": {
    "token": {
      "provider": "google",
      "accessToken": "google_access_token",
      "expiresAt": "2024-01-16T10:40:00Z",
      "scopes": ["openid", "profile", "email"],
      "issuedAt": "2024-01-15T10:40:00Z",
      "tokenType": "Bearer"
    }
  }
}
*/
```

### 14. getScopes(provider: string): Promise<ApiResponse>
Sağlayıcı kapsamlarını getirir.

**Parametreler:**
- `provider` (string): Sağlayıcı adı

**Detaylı Örnek:**
```typescript
const scopes = await zapi.authOAuth.getScopes('google');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kapsamlar getirildi",
  "data": {
    "scopes": [
      {
        "name": "openid",
        "description": "OpenID Connect authentication",
        "required": true
      },
      {
        "name": "profile",
        "description": "Access to basic profile information",
        "required": false
      },
      {
        "name": "email",
        "description": "Access to email address",
        "required": false
      }
    ]
  }
}
*/
```

### 15. getProviderInfo(provider: string): Promise<ApiResponse>
Sağlayıcı bilgilerini getirir.

**Parametreler:**
- `provider` (string): Sağlayıcı adı

**Detaylı Örnek:**
```typescript
const providerInfo = await zapi.authOAuth.getProviderInfo('google');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Sağlayıcı bilgileri getirildi",
  "data": {
    "provider": {
      "id": "google",
      "name": "Google",
      "description": "Google OAuth 2.0 provider",
      "authorizationUrl": "https://accounts.google.com/oauth/authorize",
      "tokenUrl": "https://oauth2.googleapis.com/token",
      "userInfoUrl": "https://www.googleapis.com/oauth2/v2/userinfo",
      "scopes": ["openid", "profile", "email"],
      "icon": "https://cdn.zapi.com/icons/google.svg",
      "color": "#4285F4"
    }
  }
}
*/
```

### 16. getProviderStats(provider: string): Promise<ApiResponse>
Sağlayıcı istatistiklerini getirir.

**Parametreler:**
- `provider` (string): Sağlayıcı adı

**Detaylı Örnek:**
```typescript
const stats = await zapi.authOAuth.getProviderStats('google');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Sağlayıcı istatistikleri getirildi",
  "data": {
    "stats": {
      "provider": "google",
      "totalUsers": 1250,
      "activeUsers": 1180,
      "totalLogins": 12500,
      "successRate": 98.5,
      "averageResponseTime": "245ms",
      "lastLogin": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 17. getProviderConfig(provider: string): Promise<ApiResponse>
Sağlayıcı konfigürasyonunu getirir.

**Parametreler:**
- `provider` (string): Sağlayıcı adı

**Detaylı Örnek:**
```typescript
const config = await zapi.authOAuth.getProviderConfig('google');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Sağlayıcı konfigürasyonu getirildi",
  "data": {
    "config": {
      "provider": "google",
      "clientId": "google_client_id",
      "clientSecret": "***",
      "redirectUri": "https://api.zapi.com/auth/google/callback",
      "scopes": ["openid", "profile", "email"],
      "enabled": true,
      "autoLink": true,
      "syncProfile": true
    }
  }
}
*/
```

### 18. updateProviderConfig(provider: string, config: any): Promise<ApiResponse>
Sağlayıcı konfigürasyonunu günceller.

**Parametreler:**
- `provider` (string): Sağlayıcı adı
- `config` (any): Konfigürasyon verileri

**Detaylı Örnek:**
```typescript
const update = await zapi.authOAuth.updateProviderConfig('google', {
  clientId: 'new_google_client_id',
  clientSecret: 'new_google_client_secret',
  scopes: ['openid', 'profile', 'email', 'calendar'],
  enabled: true,
  autoLink: true,
  syncProfile: true
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Sağlayıcı konfigürasyonu güncellendi",
  "data": {
    "config": {
      "provider": "google",
      "clientId": "new_google_client_id",
      "clientSecret": "***",
      "redirectUri": "https://api.zapi.com/auth/google/callback",
      "scopes": ["openid", "profile", "email", "calendar"],
      "enabled": true,
      "autoLink": true,
      "syncProfile": true,
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
  // 1. Sağlayıcıları getir
  const providers = await zapi.authOAuth.getProviders('app_64f8a1b2c3d4e5f6g7h8i9j0');
  console.log('Toplam sağlayıcı:', providers.data.providers.length);
  
  // 2. OAuth URL'i oluştur
  const url = await zapi.authOAuth.generateUrl({
    provider: 'google',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0',
    redirectUri: 'https://myapp.com/auth/callback',
    state: 'random_state_string'
  });
  console.log('OAuth URL:', url.data.url);
  
  // 3. Secret test et
  const test = await zapi.authOAuth.testSecret({
    provider: 'google',
    clientId: 'google_client_id',
    clientSecret: 'google_client_secret'
  });
  console.log('Secret test:', test.data.test.status);
  
  // 4. Callback işle
  const callback = await zapi.authOAuth.handleCallback({
    provider: 'google',
    code: 'authorization_code_from_google',
    state: 'random_state_string',
    redirectUri: 'https://myapp.com/auth/callback'
  });
  console.log('Kullanıcı:', callback.data.user.name);
  console.log('E-posta:', callback.data.user.email);
  
  // 5. Token değişimi
  const exchange = await zapi.authOAuth.exchangeToken({
    provider: 'google',
    accessToken: 'google_access_token',
    refreshToken: 'google_refresh_token'
  });
  console.log('ZAPI Token:', exchange.data.tokens.accessToken);
  
  // 6. Token yenile
  const refresh = await zapi.authOAuth.refreshToken({
    provider: 'google',
    refreshToken: 'google_refresh_token'
  });
  console.log('Yeni token:', refresh.data.tokens.accessToken);
  
  // 7. Kullanıcı bilgilerini getir
  const userInfo = await zapi.authOAuth.getUserInfo({
    provider: 'google',
    accessToken: 'google_access_token'
  });
  console.log('Kullanıcı:', userInfo.data.user.name);
  
  // 8. Hesap bağla
  const link = await zapi.authOAuth.linkAccount({
    userId: 'user_64f8a1b2c3d4e5f6g7h8i9j0',
    provider: 'google',
    accessToken: 'google_access_token'
  });
  console.log('Hesap bağlandı:', link.data.link.linkedAt);
  
  // 9. Bağlı hesapları getir
  const accounts = await zapi.authOAuth.getLinkedAccounts('user_64f8a1b2c3d4e5f6g7h8i9j0');
  console.log('Bağlı hesap sayısı:', accounts.data.accounts.length);
  
  // 10. Token doğrula
  const validate = await zapi.authOAuth.validateToken({
    provider: 'google',
    accessToken: 'google_access_token'
  });
  console.log('Token durumu:', validate.data.validation.status);
  
  // 11. Token bilgilerini getir
  const tokenInfo = await zapi.authOAuth.getTokenInfo({
    provider: 'google',
    accessToken: 'google_access_token'
  });
  console.log('Token tipi:', tokenInfo.data.token.tokenType);
  
  // 12. Kapsamları getir
  const scopes = await zapi.authOAuth.getScopes('google');
  console.log('Kapsam sayısı:', scopes.data.scopes.length);
  
  // 13. Sağlayıcı bilgilerini getir
  const providerInfo = await zapi.authOAuth.getProviderInfo('google');
  console.log('Sağlayıcı:', providerInfo.data.provider.name);
  
  // 14. Sağlayıcı istatistiklerini getir
  const stats = await zapi.authOAuth.getProviderStats('google');
  console.log('Toplam kullanıcı:', stats.data.stats.totalUsers);
  console.log('Başarı oranı:', stats.data.stats.successRate);
  
  // 15. Sağlayıcı konfigürasyonunu getir
  const config = await zapi.authOAuth.getProviderConfig('google');
  console.log('Client ID:', config.data.config.clientId);
  console.log('Durum:', config.data.config.enabled);
  
  // 16. Sağlayıcı konfigürasyonunu güncelle
  const update = await zapi.authOAuth.updateProviderConfig('google', {
    clientId: 'new_google_client_id',
    clientSecret: 'new_google_client_secret',
    scopes: ['openid', 'profile', 'email', 'calendar'],
    enabled: true
  });
  console.log('Konfigürasyon güncellendi:', update.data.config.updatedAt);
  
  // 17. Hesap bağlantısını kaldır
  const unlink = await zapi.authOAuth.unlinkAccount({
    userId: 'user_64f8a1b2c3d4e5f6g7h8i9j0',
    provider: 'google'
  });
  console.log('Hesap bağlantısı kaldırıldı:', unlink.data.unlink.unlinkedAt);
  
  // 18. Token iptal et
  const revoke = await zapi.authOAuth.revokeToken({
    provider: 'google',
    accessToken: 'google_access_token'
  });
  console.log('Token iptal edildi:', revoke.data.revoked.revokedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
