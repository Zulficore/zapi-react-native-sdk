# AuthFirebase Endpoint - 9 Metod

Firebase kimlik doğrulama için kullanılan endpoint.

## Metodlar

### 1. loginWithGoogle(options: any = {}): Promise<ApiResponse>
Google ile Firebase girişi yapar.

**Parametreler:**
- `options` (any): Giriş seçenekleri
  - `idToken` (string): Google ID token
  - `accessToken` (string): Google access token
  - `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const login = await zapi.authFirebase.loginWithGoogle({
  idToken: 'google_id_token',
  accessToken: 'google_access_token',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Google ile giriş başarılı",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@gmail.com",
      "name": "John Doe",
      "avatar": "https://lh3.googleusercontent.com/avatar.jpg",
      "provider": "google",
      "providerId": "google_user_id",
      "verified": true,
      "createdAt": "2024-01-15T10:40:00Z"
    },
    "tokens": {
      "accessToken": "zapi_access_token",
      "refreshToken": "zapi_refresh_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    },
    "firebase": {
      "uid": "firebase_user_id",
      "customToken": "firebase_custom_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/
```

### 2. loginWithApple(options: any = {}): Promise<ApiResponse>
Apple ile Firebase girişi yapar.

**Parametreler:**
- `options` (any): Giriş seçenekleri
  - `idToken` (string): Apple ID token
  - `authorizationCode` (string): Apple authorization code
  - `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const login = await zapi.authFirebase.loginWithApple({
  idToken: 'apple_id_token',
  authorizationCode: 'apple_authorization_code',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Apple ile giriş başarılı",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@privaterelay.appleid.com",
      "name": "John Doe",
      "avatar": null,
      "provider": "apple",
      "providerId": "apple_user_id",
      "verified": true,
      "createdAt": "2024-01-15T10:40:00Z"
    },
    "tokens": {
      "accessToken": "zapi_access_token",
      "refreshToken": "zapi_refresh_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    },
    "firebase": {
      "uid": "firebase_user_id",
      "customToken": "firebase_custom_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/
```

### 3. loginWithFacebook(options: any = {}): Promise<ApiResponse>
Facebook ile Firebase girişi yapar.

**Parametreler:**
- `options` (any): Giriş seçenekleri
  - `accessToken` (string): Facebook access token
  - `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const login = await zapi.authFirebase.loginWithFacebook({
  accessToken: 'facebook_access_token',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Facebook ile giriş başarılı",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@facebook.com",
      "name": "John Doe",
      "avatar": "https://graph.facebook.com/avatar.jpg",
      "provider": "facebook",
      "providerId": "facebook_user_id",
      "verified": true,
      "createdAt": "2024-01-15T10:40:00Z"
    },
    "tokens": {
      "accessToken": "zapi_access_token",
      "refreshToken": "zapi_refresh_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    },
    "firebase": {
      "uid": "firebase_user_id",
      "customToken": "firebase_custom_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/
```

### 4. loginWithTwitter(options: any = {}): Promise<ApiResponse>
Twitter ile Firebase girişi yapar.

**Parametreler:**
- `options` (any): Giriş seçenekleri
  - `accessToken` (string): Twitter access token
  - `accessTokenSecret` (string): Twitter access token secret
  - `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const login = await zapi.authFirebase.loginWithTwitter({
  accessToken: 'twitter_access_token',
  accessTokenSecret: 'twitter_access_token_secret',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Twitter ile giriş başarılı",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@twitter.com",
      "name": "John Doe",
      "avatar": "https://pbs.twimg.com/profile_images/avatar.jpg",
      "provider": "twitter",
      "providerId": "twitter_user_id",
      "verified": true,
      "createdAt": "2024-01-15T10:40:00Z"
    },
    "tokens": {
      "accessToken": "zapi_access_token",
      "refreshToken": "zapi_refresh_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    },
    "firebase": {
      "uid": "firebase_user_id",
      "customToken": "firebase_custom_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/
```

### 5. loginWithGithub(options: any = {}): Promise<ApiResponse>
GitHub ile Firebase girişi yapar.

**Parametreler:**
- `options` (any): Giriş seçenekleri
  - `accessToken` (string): GitHub access token
  - `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const login = await zapi.authFirebase.loginWithGithub({
  accessToken: 'github_access_token',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "GitHub ile giriş başarılı",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@github.com",
      "name": "John Doe",
      "avatar": "https://avatars.githubusercontent.com/u/avatar.jpg",
      "provider": "github",
      "providerId": "github_user_id",
      "verified": true,
      "createdAt": "2024-01-15T10:40:00Z"
    },
    "tokens": {
      "accessToken": "zapi_access_token",
      "refreshToken": "zapi_refresh_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    },
    "firebase": {
      "uid": "firebase_user_id",
      "customToken": "firebase_custom_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/
```

### 6. loginWithMicrosoft(options: any = {}): Promise<ApiResponse>
Microsoft ile Firebase girişi yapar.

**Parametreler:**
- `options` (any): Giriş seçenekleri
  - `accessToken` (string): Microsoft access token
  - `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const login = await zapi.authFirebase.loginWithMicrosoft({
  accessToken: 'microsoft_access_token',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Microsoft ile giriş başarılı",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@outlook.com",
      "name": "John Doe",
      "avatar": "https://graph.microsoft.com/v1.0/me/photo/$value",
      "provider": "microsoft",
      "providerId": "microsoft_user_id",
      "verified": true,
      "createdAt": "2024-01-15T10:40:00Z"
    },
    "tokens": {
      "accessToken": "zapi_access_token",
      "refreshToken": "zapi_refresh_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    },
    "firebase": {
      "uid": "firebase_user_id",
      "customToken": "firebase_custom_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/
```

### 7. loginWithLinkedin(options: any = {}): Promise<ApiResponse>
LinkedIn ile Firebase girişi yapar.

**Parametreler:**
- `options` (any): Giriş seçenekleri
  - `accessToken` (string): LinkedIn access token
  - `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const login = await zapi.authFirebase.loginWithLinkedin({
  accessToken: 'linkedin_access_token',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "LinkedIn ile giriş başarılı",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@linkedin.com",
      "name": "John Doe",
      "avatar": "https://media.licdn.com/dms/image/avatar.jpg",
      "provider": "linkedin",
      "providerId": "linkedin_user_id",
      "verified": true,
      "createdAt": "2024-01-15T10:40:00Z"
    },
    "tokens": {
      "accessToken": "zapi_access_token",
      "refreshToken": "zapi_refresh_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    },
    "firebase": {
      "uid": "firebase_user_id",
      "customToken": "firebase_custom_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/
```

### 8. loginWithDiscord(options: any = {}): Promise<ApiResponse>
Discord ile Firebase girişi yapar.

**Parametreler:**
- `options` (any): Giriş seçenekleri
  - `accessToken` (string): Discord access token
  - `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const login = await zapi.authFirebase.loginWithDiscord({
  accessToken: 'discord_access_token',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Discord ile giriş başarılı",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@discord.com",
      "name": "John Doe",
      "avatar": "https://cdn.discordapp.com/avatars/avatar.jpg",
      "provider": "discord",
      "providerId": "discord_user_id",
      "verified": true,
      "createdAt": "2024-01-15T10:40:00Z"
    },
    "tokens": {
      "accessToken": "zapi_access_token",
      "refreshToken": "zapi_refresh_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    },
    "firebase": {
      "uid": "firebase_user_id",
      "customToken": "firebase_custom_token",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/
```

### 9. getUserStatus(): Promise<ApiResponse>
Kullanıcı durumunu getirir.

**Detaylı Örnek:**
```typescript
const status = await zapi.authFirebase.getUserStatus();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcı durumu getirildi",
  "data": {
    "status": {
      "authenticated": true,
      "provider": "google",
      "uid": "firebase_user_id",
      "email": "user@gmail.com",
      "name": "John Doe",
      "verified": true,
      "lastLogin": "2024-01-15T10:40:00Z",
      "sessionExpiresAt": "2024-01-16T10:40:00Z"
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
  // 1. Google ile giriş
  const googleLogin = await zapi.authFirebase.loginWithGoogle({
    idToken: 'google_id_token',
    accessToken: 'google_access_token',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  });
  console.log('Google giriş:', googleLogin.data.user.name);
  console.log('Firebase UID:', googleLogin.data.firebase.uid);
  
  // 2. Apple ile giriş
  const appleLogin = await zapi.authFirebase.loginWithApple({
    idToken: 'apple_id_token',
    authorizationCode: 'apple_authorization_code',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  });
  console.log('Apple giriş:', appleLogin.data.user.name);
  console.log('Firebase Token:', appleLogin.data.firebase.customToken);
  
  // 3. Facebook ile giriş
  const facebookLogin = await zapi.authFirebase.loginWithFacebook({
    accessToken: 'facebook_access_token',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  });
  console.log('Facebook giriş:', facebookLogin.data.user.name);
  
  // 4. Twitter ile giriş
  const twitterLogin = await zapi.authFirebase.loginWithTwitter({
    accessToken: 'twitter_access_token',
    accessTokenSecret: 'twitter_access_token_secret',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  });
  console.log('Twitter giriş:', twitterLogin.data.user.name);
  
  // 5. GitHub ile giriş
  const githubLogin = await zapi.authFirebase.loginWithGithub({
    accessToken: 'github_access_token',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  });
  console.log('GitHub giriş:', githubLogin.data.user.name);
  
  // 6. Microsoft ile giriş
  const microsoftLogin = await zapi.authFirebase.loginWithMicrosoft({
    accessToken: 'microsoft_access_token',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  });
  console.log('Microsoft giriş:', microsoftLogin.data.user.name);
  
  // 7. LinkedIn ile giriş
  const linkedinLogin = await zapi.authFirebase.loginWithLinkedin({
    accessToken: 'linkedin_access_token',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  });
  console.log('LinkedIn giriş:', linkedinLogin.data.user.name);
  
  // 8. Discord ile giriş
  const discordLogin = await zapi.authFirebase.loginWithDiscord({
    accessToken: 'discord_access_token',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  });
  console.log('Discord giriş:', discordLogin.data.user.name);
  
  // 9. Kullanıcı durumunu getir
  const status = await zapi.authFirebase.getUserStatus();
  console.log('Kimlik doğrulandı:', status.data.status.authenticated);
  console.log('Sağlayıcı:', status.data.status.provider);
  console.log('Firebase UID:', status.data.status.uid);
  console.log('Son giriş:', status.data.status.lastLogin);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
