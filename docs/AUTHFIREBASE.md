# AuthFirebase Endpoint

Firebase kimlik doğrulama endpoint'leri - Google ve Apple ile giriş, token yenileme, profil yönetimi ve SDK durumu.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const authFirebase = zapi.authFirebase;
```

## Metodlar

### 1. loginWithGoogle(firebaseToken: string, options: any)

Google ile Firebase kimlik doğrulama yapar

**Parametreler:**
- `firebaseToken: string` - Firebase ID token
- `options: any` - Ek seçenekler (opsiyonel)

**Örnek Kullanım:**

```typescript
// Firebase'den Google token al
import auth from '@react-native-firebase/auth';

const user = auth().currentUser;
const firebaseToken = await user.getIdToken();

const result = await authFirebase.loginWithGoogle(firebaseToken, {
  createAccount: true,
  mergeAccounts: false
});

if (result.success) {
  console.log('Google ile giriş başarılı:', result.data);
  zapi.setBearerToken(result.data.token);
} else {
  console.error('Google giriş hatası:', result.error);
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
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "Google ile giriş başarılı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_FIREBASE_TOKEN",
    "message": "Geçersiz Firebase token"
  }
}
```

---

### 2. loginWithApple(firebaseToken: string, options: any)

Apple ile Firebase kimlik doğrulama yapar

**Parametreler:**
- `firebaseToken: string` - Firebase ID token
- `options: any` - Ek seçenekler (opsiyonel)

**Örnek Kullanım:**

```typescript
// Firebase'den Apple token al
import auth from '@react-native-firebase/auth';

const user = auth().currentUser;
const firebaseToken = await user.getIdToken();

const result = await authFirebase.loginWithApple(firebaseToken, {
  createAccount: true,
  mergeAccounts: false
});

if (result.success) {
  console.log('Apple ile giriş başarılı:', result.data);
  zapi.setBearerToken(result.data.token);
} else {
  console.error('Apple giriş hatası:', result.error);
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
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "Apple ile giriş başarılı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "APPLE_LOGIN_FAILED",
    "message": "Apple giriş başarısız"
  }
}
```

---

### 3. refreshToken(refreshToken: string)

Firebase token'ını yeniler

**Parametreler:**
- `refreshToken: string` - Yenileme token'ı

**Örnek Kullanım:**

```typescript
const result = await authFirebase.refreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");

if (result.success) {
  console.log('Token yenilendi:', result.data);
  zapi.setBearerToken(result.data.token);
} else {
  console.error('Token yenileme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "Token başarıyla yenilendi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "TOKEN_REFRESH_FAILED",
    "message": "Token yenileme başarısız"
  }
}
```

---

### 4. updateProfile(data: any)

Firebase kullanıcı profilini günceller

**Parametreler:**
- `data: any` - Güncellenecek profil bilgileri

**Örnek Kullanım:**

```typescript
const result = await authFirebase.updateProfile({
  firstName: "Jane",
  lastName: "Smith",
  displayName: "Jane Smith",
  photoURL: "https://example.com/photo.jpg"
});

if (result.success) {
  console.log('Profil güncellendi:', result.data);
} else {
  console.error('Profil güncelleme hatası:', result.error);
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
      "firstName": "Jane",
      "lastName": "Smith",
      "displayName": "Jane Smith",
      "photoURL": "https://example.com/photo.jpg",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  },
  "message": "Profil başarıyla güncellendi"
}
```

---

### 5. logout()

Firebase kullanıcı çıkışı yapar

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await authFirebase.logout();

if (result.success) {
  console.log('Çıkış başarılı');
  zapi.clearBearerToken();
  
  // Firebase'den de çıkış yap
  await auth().signOut();
} else {
  console.error('Çıkış hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "Başarıyla çıkış yapıldı"
}
```

---

### 6. getSDKStatus()

Firebase SDK durumunu kontrol eder

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await authFirebase.getSDKStatus();

if (result.success) {
  console.log('SDK durumu:', result.data);
  const { isConnected, version, features } = result.data;
} else {
  console.error('SDK durum hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "isConnected": true,
    "version": "19.0.0",
    "features": {
      "googleAuth": true,
      "appleAuth": true,
      "phoneAuth": true,
      "emailAuth": true
    },
    "lastChecked": "2024-01-15T10:30:00Z"
  },
  "message": "SDK durumu başarıyla getirildi"
}
```

---

### 7. getDebugInfo()

Firebase debug bilgilerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await authFirebase.getDebugInfo();

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
    "firebaseConfig": {
      "projectId": "my-project",
      "apiKey": "AIza...",
      "authDomain": "my-project.firebaseapp.com"
    },
    "authState": {
      "isSignedIn": true,
      "currentUser": {
        "uid": "firebase_uid_123",
        "email": "user@gmail.com",
        "provider": "google"
      }
    },
    "sdkInfo": {
      "version": "19.0.0",
      "platform": "react-native"
    }
  },
  "message": "Debug bilgileri başarıyla getirildi"
}
```

---

### 8. healthCheck()

Firebase servisinin sağlık durumunu kontrol eder

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await authFirebase.healthCheck();

if (result.success) {
  console.log('Firebase sağlık durumu:', result.data);
} else {
  console.error('Sağlık kontrol hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "services": {
      "auth": "online",
      "firestore": "online",
      "storage": "online"
    },
    "responseTime": 150,
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "message": "Firebase servisi sağlıklı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "FIREBASE_SERVICE_DOWN",
    "message": "Firebase servisi çalışmıyor"
  }
}
```

---

### 9. getUserStatus()

Firebase kullanıcı durumunu getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await authFirebase.getUserStatus();

if (result.success) {
  console.log('Kullanıcı durumu:', result.data);
  const { isSignedIn, user, provider } = result.data;
} else {
  console.error('Kullanıcı durum hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "isSignedIn": true,
    "user": {
      "uid": "firebase_uid_123",
      "email": "user@gmail.com",
      "displayName": "John Doe",
      "photoURL": "https://example.com/photo.jpg",
      "emailVerified": true,
      "provider": "google"
    },
    "session": {
      "createdAt": "2024-01-15T10:30:00Z",
      "lastActivity": "2024-01-15T10:30:00Z"
    }
  },
  "message": "Kullanıcı durumu başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_SIGNED_IN",
    "message": "Kullanıcı giriş yapmamış"
  }
}
```

---

## Firebase Kurulum

React Native Firebase kurulumu:

```bash
# Firebase paketlerini yükle
npm install @react-native-firebase/app @react-native-firebase/auth

# iOS için
cd ios && pod install
```

## Firebase Konfigürasyonu

`firebase.json` dosyası:

```json
{
  "react-native": {
    "android": {
      "googleServicesFile": "./android/app/google-services.json"
    },
    "ios": {
      "googleServicesFile": "./ios/GoogleService-Info.plist"
    }
  }
}
```

## Kimlik Doğrulama Sağlayıcıları

| Sağlayıcı | Açıklama | Gereksinimler |
|-----------|----------|---------------|
| `google` | Google ile giriş | Google OAuth yapılandırması |
| `apple` | Apple ile giriş | Apple Sign In yapılandırması |
| `phone` | Telefon ile giriş | SMS doğrulama |
| `email` | Email ile giriş | Email doğrulama |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `INVALID_FIREBASE_TOKEN` | Geçersiz Firebase token |
| `GOOGLE_LOGIN_FAILED` | Google giriş başarısız |
| `APPLE_LOGIN_FAILED` | Apple giriş başarısız |
| `TOKEN_REFRESH_FAILED` | Token yenileme başarısız |
| `FIREBASE_SERVICE_DOWN` | Firebase servisi çalışmıyor |
| `USER_NOT_SIGNED_IN` | Kullanıcı giriş yapmamış |
| `ACCOUNT_MERGE_FAILED` | Hesap birleştirme başarısız |
| `PROVIDER_NOT_SUPPORTED` | Desteklenmeyen sağlayıcı |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Firebase token'larını güvenli bir şekilde saklayın
- Token'ları düzenli olarak yenileyin
- Kullanıcı çıkışında token'ları temizleyin
- Firebase güvenlik kurallarını uygun şekilde yapılandırın
- API anahtarlarını güvenli bir yerde saklayın

## Hesap Birleştirme

Mevcut hesapları Firebase hesaplarıyla birleştirme:

```typescript
const result = await authFirebase.loginWithGoogle(firebaseToken, {
  createAccount: false,
  mergeAccounts: true,
  existingEmail: "user@example.com"
});
```

## Token Yönetimi

Firebase token'larını yönetme:

```typescript
// Token yenileme
const refreshResult = await authFirebase.refreshToken(refreshToken);

// Token doğrulama
const userStatus = await authFirebase.getUserStatus();

// Çıkış yapma
await authFirebase.logout();
```
