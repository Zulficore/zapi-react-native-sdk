# OAuthMetadata Endpoint

OAuth metadata yönetimi endpoint'i - Uygulama OAuth konfigürasyon bilgilerini yönetir.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const oauthMetadata = zapi.oauthMetadata;
```

## Metodlar

### 1. get(appId: string, path: string)

Uygulama OAuth metadata bilgilerini getirir

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Metadata yolu (opsiyonel)

**Örnek Kullanım:**

```typescript
// Uygulama OAuth metadata'sını getir
const result = await oauthMetadata.get('app123');

if (result.success) {
  console.log('OAuth metadata bilgileri:', result.data);
  
  // Google OAuth ayarları
  console.log('Google OAuth:', result.data.google);
  console.log('Google Client ID:', result.data.google.clientId);
  console.log('Google Redirect URI:', result.data.google.redirectUri);
  
  // Apple OAuth ayarları
  console.log('Apple OAuth:', result.data.apple);
  console.log('Apple Team ID:', result.data.apple.teamId);
  console.log('Apple Key ID:', result.data.apple.keyId);
  
  // Facebook OAuth ayarları
  console.log('Facebook OAuth:', result.data.facebook);
  console.log('Facebook App ID:', result.data.facebook.appId);
  console.log('Facebook App Secret:', result.data.facebook.appSecret);
  
  // GitHub OAuth ayarları
  console.log('GitHub OAuth:', result.data.github);
  console.log('GitHub Client ID:', result.data.github.clientId);
  
  // LinkedIn OAuth ayarları
  console.log('LinkedIn OAuth:', result.data.linkedin);
  console.log('LinkedIn Client ID:', result.data.linkedin.clientId);
  
  // Twitter OAuth ayarları
  console.log('Twitter OAuth:', result.data.twitter);
  console.log('Twitter API Key:', result.data.twitter.apiKey);
  
} else {
  console.error('OAuth metadata getirme hatası:', result.error);
}

// Belirli bir OAuth provider metadata'sını getir
const googleMetadata = await oauthMetadata.get('app123', 'google');
const appleMetadata = await oauthMetadata.get('app123', 'apple');
const facebookMetadata = await oauthMetadata.get('app123', 'facebook');

// Belirli bir OAuth ayarını getir
const googleClientId = await oauthMetadata.get('app123', 'google.clientId');
const appleTeamId = await oauthMetadata.get('app123', 'apple.teamId');
const facebookAppId = await oauthMetadata.get('app123', 'facebook.appId');
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "appId": "app123",
    "path": "",
    "oauth": {
      "google": {
        "enabled": true,
        "clientId": "google_client_id_123",
        "clientSecret": "encrypted_client_secret",
        "redirectUri": "https://app.zapi.com/auth/google/callback",
        "scopes": ["openid", "profile", "email"],
        "responseType": "code",
        "grantType": "authorization_code",
        "state": "random_state_string",
        "nonce": "random_nonce_string",
        "prompt": "consent",
        "accessType": "offline",
        "includeGrantedScopes": true,
        "loginHint": "",
        "hostedDomain": "",
        "hd": "",
        "customParameters": {
          "theme": "dark",
          "locale": "tr"
        },
        "webhook": {
          "enabled": true,
          "url": "https://app.zapi.com/webhooks/oauth/google",
          "events": ["login", "logout", "token_refresh"]
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      "apple": {
        "enabled": true,
        "clientId": "com.zapi.app",
        "teamId": "TEAM123456",
        "keyId": "KEY123456",
        "privateKey": "encrypted_private_key",
        "redirectUri": "https://app.zapi.com/auth/apple/callback",
        "scopes": ["name", "email"],
        "responseType": "code",
        "grantType": "authorization_code",
        "state": "random_state_string",
        "nonce": "random_nonce_string",
        "responseMode": "form_post",
        "customParameters": {
          "theme": "dark",
          "locale": "tr"
        },
        "webhook": {
          "enabled": true,
          "url": "https://app.zapi.com/webhooks/oauth/apple",
          "events": ["login", "logout", "token_refresh"]
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      "facebook": {
        "enabled": true,
        "appId": "facebook_app_id_123",
        "appSecret": "encrypted_app_secret",
        "redirectUri": "https://app.zapi.com/auth/facebook/callback",
        "scopes": ["email", "public_profile"],
        "responseType": "code",
        "grantType": "authorization_code",
        "state": "random_state_string",
        "nonce": "random_nonce_string",
        "display": "popup",
        "authType": "rerequest",
        "customParameters": {
          "theme": "dark",
          "locale": "tr"
        },
        "webhook": {
          "enabled": true,
          "url": "https://app.zapi.com/webhooks/oauth/facebook",
          "events": ["login", "logout", "token_refresh"]
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      "github": {
        "enabled": false,
        "clientId": "github_client_id_123",
        "clientSecret": "encrypted_client_secret",
        "redirectUri": "https://app.zapi.com/auth/github/callback",
        "scopes": ["user:email", "read:user"],
        "responseType": "code",
        "grantType": "authorization_code",
        "state": "random_state_string",
        "nonce": "random_nonce_string",
        "allowSignup": true,
        "customParameters": {
          "theme": "dark",
          "locale": "tr"
        },
        "webhook": {
          "enabled": false,
          "url": "",
          "events": []
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      "linkedin": {
        "enabled": false,
        "clientId": "linkedin_client_id_123",
        "clientSecret": "encrypted_client_secret",
        "redirectUri": "https://app.zapi.com/auth/linkedin/callback",
        "scopes": ["r_liteprofile", "r_emailaddress"],
        "responseType": "code",
        "grantType": "authorization_code",
        "state": "random_state_string",
        "nonce": "random_nonce_string",
        "customParameters": {
          "theme": "dark",
          "locale": "tr"
        },
        "webhook": {
          "enabled": false,
          "url": "",
          "events": []
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      },
      "twitter": {
        "enabled": false,
        "apiKey": "twitter_api_key_123",
        "apiSecret": "encrypted_api_secret",
        "bearerToken": "encrypted_bearer_token",
        "redirectUri": "https://app.zapi.com/auth/twitter/callback",
        "scopes": ["tweet.read", "users.read"],
        "responseType": "code",
        "grantType": "authorization_code",
        "state": "random_state_string",
        "nonce": "random_nonce_string",
        "customParameters": {
          "theme": "dark",
          "locale": "tr"
        },
        "webhook": {
          "enabled": false,
          "url": "",
          "events": []
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    },
    "globalSettings": {
      "defaultProvider": "google",
      "allowedProviders": ["google", "apple", "facebook"],
      "requireEmailVerification": true,
      "requirePhoneVerification": false,
      "autoCreateUser": true,
      "mergeAccounts": true,
      "sessionTimeout": 3600,
      "refreshTokenRotation": true,
      "tokenExpiration": 86400,
      "maxLoginAttempts": 5,
      "lockoutDuration": 900,
      "securityHeaders": {
        "strictTransportSecurity": true,
        "contentSecurityPolicy": true,
        "xFrameOptions": "DENY",
        "xContentTypeOptions": "nosniff"
      }
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "version": 3
  },
  "message": "OAuth metadata başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "OAUTH_METADATA_NOT_FOUND",
    "message": "OAuth metadata bulunamadı"
  }
}
```

---

### 2. update(appId: string, path: string, value: any)

Uygulama OAuth metadata'sını günceller

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Metadata yolu
- `value: any` - Yeni değer

**Örnek Kullanım:**

```typescript
// Google OAuth ayarlarını güncelle
const result = await oauthMetadata.update('app123', 'google', {
  enabled: true,
  clientId: 'new_google_client_id',
  clientSecret: 'new_encrypted_secret',
  redirectUri: 'https://app.zapi.com/auth/google/callback',
  scopes: ['openid', 'profile', 'email'],
  responseType: 'code',
  grantType: 'authorization_code'
});

if (result.success) {
  console.log('Google OAuth ayarları güncellendi:', result.data);
} else {
  console.error('Google OAuth güncelleme hatası:', result.error);
}

// Apple OAuth ayarlarını güncelle
await oauthMetadata.update('app123', 'apple', {
  enabled: true,
  clientId: 'com.zapi.app',
  teamId: 'TEAM123456',
  keyId: 'KEY123456',
  privateKey: 'new_encrypted_private_key',
  redirectUri: 'https://app.zapi.com/auth/apple/callback',
  scopes: ['name', 'email']
});

// Facebook OAuth ayarlarını güncelle
await oauthMetadata.update('app123', 'facebook', {
  enabled: true,
  appId: 'new_facebook_app_id',
  appSecret: 'new_encrypted_app_secret',
  redirectUri: 'https://app.zapi.com/auth/facebook/callback',
  scopes: ['email', 'public_profile']
});

// GitHub OAuth ayarlarını güncelle
await oauthMetadata.update('app123', 'github', {
  enabled: true,
  clientId: 'new_github_client_id',
  clientSecret: 'new_encrypted_secret',
  redirectUri: 'https://app.zapi.com/auth/github/callback',
  scopes: ['user:email', 'read:user']
});

// LinkedIn OAuth ayarlarını güncelle
await oauthMetadata.update('app123', 'linkedin', {
  enabled: true,
  clientId: 'new_linkedin_client_id',
  clientSecret: 'new_encrypted_secret',
  redirectUri: 'https://app.zapi.com/auth/linkedin/callback',
  scopes: ['r_liteprofile', 'r_emailaddress']
});

// Twitter OAuth ayarlarını güncelle
await oauthMetadata.update('app123', 'twitter', {
  enabled: true,
  apiKey: 'new_twitter_api_key',
  apiSecret: 'new_encrypted_api_secret',
  bearerToken: 'new_encrypted_bearer_token',
  redirectUri: 'https://app.zapi.com/auth/twitter/callback',
  scopes: ['tweet.read', 'users.read']
});

// Global ayarları güncelle
await oauthMetadata.update('app123', 'globalSettings', {
  defaultProvider: 'apple',
  allowedProviders: ['google', 'apple', 'facebook', 'github'],
  requireEmailVerification: true,
  autoCreateUser: true,
  mergeAccounts: false,
  sessionTimeout: 7200,
  refreshTokenRotation: true,
  tokenExpiration: 172800
});

// Belirli bir OAuth ayarını güncelle
await oauthMetadata.update('app123', 'google.clientId', 'new_google_client_id');
await oauthMetadata.update('app123', 'apple.teamId', 'NEW_TEAM_ID');
await oauthMetadata.update('app123', 'facebook.appId', 'new_facebook_app_id');
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "appId": "app123",
    "path": "google",
    "value": {
      "enabled": true,
      "clientId": "new_google_client_id",
      "clientSecret": "new_encrypted_secret",
      "redirectUri": "https://app.zapi.com/auth/google/callback",
      "scopes": ["openid", "profile", "email"],
      "responseType": "code",
      "grantType": "authorization_code"
    },
    "updatedAt": "2024-01-15T10:30:00Z",
    "version": 4
  },
  "message": "OAuth metadata başarıyla güncellendi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "OAUTH_METADATA_UPDATE_FAILED",
    "message": "OAuth metadata güncellenemedi"
  }
}
```

---

### 3. patch(appId: string, path: string, value: any)

Uygulama OAuth metadata'sını kısmi olarak günceller

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Metadata yolu
- `value: any` - Güncellenecek değer

**Örnek Kullanım:**

```typescript
// Sadece Google OAuth'u aktif/pasif yap
const result = await oauthMetadata.patch('app123', 'google.enabled', true);

if (result.success) {
  console.log('Google OAuth durumu güncellendi:', result.data);
} else {
  console.error('Google OAuth durum güncelleme hatası:', result.error);
}

// Sadece Google Client ID'yi güncelle
await oauthMetadata.patch('app123', 'google.clientId', 'new_google_client_id');

// Sadece Google Redirect URI'yi güncelle
await oauthMetadata.patch('app123', 'google.redirectUri', 'https://new-domain.com/auth/google/callback');

// Sadece Google Scopes'ları güncelle
await oauthMetadata.patch('app123', 'google.scopes', ['openid', 'profile', 'email', 'calendar']);

// Sadece Apple Team ID'yi güncelle
await oauthMetadata.patch('app123', 'apple.teamId', 'NEW_TEAM_ID');

// Sadece Apple Key ID'yi güncelle
await oauthMetadata.patch('app123', 'apple.keyId', 'NEW_KEY_ID');

// Sadece Facebook App ID'yi güncelle
await oauthMetadata.patch('app123', 'facebook.appId', 'new_facebook_app_id');

// Sadece Facebook App Secret'ı güncelle
await oauthMetadata.patch('app123', 'facebook.appSecret', 'new_encrypted_app_secret');

// Sadece GitHub OAuth'u aktif yap
await oauthMetadata.patch('app123', 'github.enabled', true);

// Sadece LinkedIn OAuth'u aktif yap
await oauthMetadata.patch('app123', 'linkedin.enabled', true);

// Sadece Twitter OAuth'u aktif yap
await oauthMetadata.patch('app123', 'twitter.enabled', true);

// Global ayarları kısmi güncelle
await oauthMetadata.patch('app123', 'globalSettings.defaultProvider', 'apple');
await oauthMetadata.patch('app123', 'globalSettings.requireEmailVerification', false);
await oauthMetadata.patch('app123', 'globalSettings.autoCreateUser', false);
await oauthMetadata.patch('app123', 'globalSettings.sessionTimeout', 14400);
await oauthMetadata.patch('app123', 'globalSettings.tokenExpiration', 259200);

// Webhook ayarlarını güncelle
await oauthMetadata.patch('app123', 'google.webhook.enabled', true);
await oauthMetadata.patch('app123', 'google.webhook.url', 'https://new-webhook.com/oauth/google');
await oauthMetadata.patch('app123', 'apple.webhook.enabled', true);
await oauthMetadata.patch('app123', 'facebook.webhook.enabled', true);
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "appId": "app123",
    "path": "google.enabled",
    "value": true,
    "updatedAt": "2024-01-15T10:30:00Z",
    "version": 5
  },
  "message": "OAuth metadata başarıyla güncellendi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "OAUTH_METADATA_PATCH_FAILED",
    "message": "OAuth metadata güncellenemedi"
  }
}
```

---

### 4. delete(appId: string, path: string)

Uygulama OAuth metadata'sını siler

**Parametreler:**
- `appId: string` - Uygulama ID'si
- `path: string` - Silinecek metadata yolu

**Örnek Kullanım:**

```typescript
// Belirli bir OAuth provider'ı sil
const result = await oauthMetadata.delete('app123', 'github');

if (result.success) {
  console.log('GitHub OAuth metadata silindi:', result.data);
} else {
  console.error('GitHub OAuth silme hatası:', result.error);
}

// OAuth provider'ları sil
await oauthMetadata.delete('app123', 'linkedin');
await oauthMetadata.delete('app123', 'twitter');

// Belirli OAuth ayarlarını sil
await oauthMetadata.delete('app123', 'google.clientSecret');
await oauthMetadata.delete('app123', 'apple.privateKey');
await oauthMetadata.delete('app123', 'facebook.appSecret');

// Webhook ayarlarını sil
await oauthMetadata.delete('app123', 'google.webhook');
await oauthMetadata.delete('app123', 'apple.webhook');
await oauthMetadata.delete('app123', 'facebook.webhook');

// Custom parameters'ları sil
await oauthMetadata.delete('app123', 'google.customParameters');
await oauthMetadata.delete('app123', 'apple.customParameters');
await oauthMetadata.delete('app123', 'facebook.customParameters');

// Global ayarları sil
await oauthMetadata.delete('app123', 'globalSettings');

// Tüm OAuth metadata'yı sil
await oauthMetadata.delete('app123', '');
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "appId": "app123",
    "path": "github",
    "deletedAt": "2024-01-15T10:30:00Z",
    "version": 6
  },
  "message": "OAuth metadata başarıyla silindi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "OAUTH_METADATA_DELETE_FAILED",
    "message": "OAuth metadata silinemedi"
  }
}
```

---

## OAuth Provider'lar

### Google OAuth
- **clientId**: Google Client ID
- **clientSecret**: Google Client Secret
- **redirectUri**: Callback URL
- **scopes**: İzin alanları
- **responseType**: Yanıt türü
- **grantType**: Grant türü

### Apple OAuth
- **clientId**: Apple Client ID
- **teamId**: Apple Team ID
- **keyId**: Apple Key ID
- **privateKey**: Apple Private Key
- **redirectUri**: Callback URL
- **scopes**: İzin alanları

### Facebook OAuth
- **appId**: Facebook App ID
- **appSecret**: Facebook App Secret
- **redirectUri**: Callback URL
- **scopes**: İzin alanları
- **display**: Görüntüleme türü

### GitHub OAuth
- **clientId**: GitHub Client ID
- **clientSecret**: GitHub Client Secret
- **redirectUri**: Callback URL
- **scopes**: İzin alanları
- **allowSignup**: Kayıt izni

### LinkedIn OAuth
- **clientId**: LinkedIn Client ID
- **clientSecret**: LinkedIn Client Secret
- **redirectUri**: Callback URL
- **scopes**: İzin alanları

### Twitter OAuth
- **apiKey**: Twitter API Key
- **apiSecret**: Twitter API Secret
- **bearerToken**: Twitter Bearer Token
- **redirectUri**: Callback URL
- **scopes**: İzin alanları

## Global Ayarlar

- **defaultProvider**: Varsayılan OAuth provider
- **allowedProviders**: İzin verilen provider'lar
- **requireEmailVerification**: Email doğrulama gerekli
- **requirePhoneVerification**: Telefon doğrulama gerekli
- **autoCreateUser**: Otomatik kullanıcı oluşturma
- **mergeAccounts**: Hesap birleştirme
- **sessionTimeout**: Oturum zaman aşımı
- **refreshTokenRotation**: Refresh token rotasyonu
- **tokenExpiration**: Token süresi
- **maxLoginAttempts**: Maksimum giriş denemesi
- **lockoutDuration**: Kilitleme süresi

## Webhook Ayarları

- **enabled**: Webhook aktif/pasif
- **url**: Webhook URL'i
- **events**: Webhook olayları
  - `login`: Giriş olayı
  - `logout`: Çıkış olayı
  - `token_refresh`: Token yenileme olayı

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `OAUTH_METADATA_NOT_FOUND` | OAuth metadata bulunamadı |
| `OAUTH_METADATA_UPDATE_FAILED` | OAuth metadata güncellenemedi |
| `OAUTH_METADATA_PATCH_FAILED` | OAuth metadata güncellenemedi |
| `OAUTH_METADATA_DELETE_FAILED` | OAuth metadata silinemedi |
| `INVALID_APP_ID` | Geçersiz uygulama ID'si |
| `INVALID_PATH` | Geçersiz metadata yolu |
| `INVALID_OAUTH_CONFIG` | Geçersiz OAuth konfigürasyonu |

## Güvenlik Notları

- OAuth metadata bilgileri hassas veriler içerir
- Sadece yetkili kullanıcılar erişebilir
- Client secret'lar şifrelenmiş olarak saklanır
- Düzenli güvenlik güncellemeleri yapın
- OAuth metadata değişikliklerini loglayın

## OAuth Metadata Yönetimi

```typescript
// OAuth metadata getir
const oauthMetadata = await oauthMetadata.get('app123');

// Google OAuth ayarlarını güncelle
await oauthMetadata.update('app123', 'google', {
  enabled: true,
  clientId: 'new_client_id',
  clientSecret: 'new_secret'
});

// Sadece Apple OAuth'u aktif yap
await oauthMetadata.patch('app123', 'apple.enabled', true);

// GitHub OAuth'u sil
await oauthMetadata.delete('app123', 'github');

// Global ayarları güncelle
await oauthMetadata.update('app123', 'globalSettings', {
  defaultProvider: 'google',
  allowedProviders: ['google', 'apple', 'facebook']
});
```
