# Auth Endpoint - 18 Metod

Kimlik doğrulama işlemleri için kullanılan endpoint.

## Metodlar

### 1. register(data: any): Promise<ApiResponse>
Kullanıcı kaydı yapar.

**Parametreler:**
- `data` (any): Kayıt verileri
  - `email` (string): E-posta adresi
  - `password` (string): Şifre
  - `name` (string): Ad
  - `appId` (string): Uygulama ID'si (opsiyonel)

**Detaylı Örnek:**
```typescript
const register = await zapi.auth.register({
  email: 'user@example.com',
  password: 'securePassword123',
  name: 'John Doe',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Kullanıcı başarıyla kaydedildi",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "status": "active",
      "emailVerified": false,
      "createdAt": "2024-01-15T10:40:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "E-posta adresi zaten kullanımda",
  "error": "EMAIL_ALREADY_EXISTS",
  "details": {
    "field": "email",
    "value": "user@example.com",
    "reason": "Email address is already registered"
  }
}
*/
```

### 2. login(email?: string, phone?: string, password: string, options?: any): Promise<ApiResponse>
Kullanıcı girişi yapar.

**Parametreler:**
- `email` (string, opsiyonel): E-posta adresi
- `phone` (string, opsiyonel): Telefon numarası
- `password` (string): Şifre
- `options` (any, opsiyonel): Ek seçenekler
  - `appId` (string): Uygulama ID'si
  - `rememberMe` (boolean): Beni hatırla

**Detaylı Örnek:**
```typescript
const login = await zapi.auth.login(
  'user@example.com',
  undefined,
  'securePassword123',
  {
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0',
    rememberMe: true
  }
);

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Giriş başarılı",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "status": "active",
      "emailVerified": true,
      "lastLogin": "2024-01-15T10:40:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Geçersiz kimlik bilgileri",
  "error": "INVALID_CREDENTIALS",
  "details": {
    "field": "password",
    "reason": "Password is incorrect"
  }
}
*/
```

### 3. sendOTP(email?: string, phone?: string, appId?: string): Promise<ApiResponse>
OTP kodu gönderir.

**Parametreler:**
- `email` (string, opsiyonel): E-posta adresi
- `phone` (string, opsiyonel): Telefon numarası
- `appId` (string, opsiyonel): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const sendOTP = await zapi.auth.sendOTP(
  'user@example.com',
  undefined,
  'app_64f8a1b2c3d4e5f6g7h8i9j0'
);

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "OTP kodu gönderildi",
  "data": {
    "otp": {
      "id": "otp_64f8a1b2c3d4e5f6g7h8i9j0",
      "type": "email",
      "recipient": "user@example.com",
      "expiresAt": "2024-01-15T10:45:00Z",
      "attempts": 0,
      "maxAttempts": 3
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "OTP gönderilemedi",
  "error": "OTP_SEND_FAILED",
  "details": {
    "reason": "Email service is temporarily unavailable"
  }
}
*/
```

### 4. verifyOTP(otpCode: string, email?: string): Promise<ApiResponse>
OTP kodunu doğrular.

**Parametreler:**
- `otpCode` (string): OTP kodu
- `email` (string, opsiyonel): E-posta adresi

**Detaylı Örnek:**
```typescript
const verifyOTP = await zapi.auth.verifyOTP('123456', 'user@example.com');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "OTP kodu doğrulandı",
  "data": {
    "verification": {
      "id": "otp_64f8a1b2c3d4e5f6g7h8i9j0",
      "status": "verified",
      "verifiedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Geçersiz OTP kodu",
  "error": "INVALID_OTP",
  "details": {
    "field": "otpCode",
    "value": "123456",
    "reason": "OTP code is incorrect or expired"
  }
}
*/
```

### 5. verifyEmail(token: string): Promise<ApiResponse>
E-posta doğrulaması yapar.

**Parametreler:**
- `token` (string): Doğrulama token'ı

**Detaylı Örnek:**
```typescript
const verifyEmail = await zapi.auth.verifyEmail('email_verification_token');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "E-posta başarıyla doğrulandı",
  "data": {
    "verification": {
      "email": "user@example.com",
      "verifiedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Geçersiz doğrulama token'ı",
  "error": "INVALID_TOKEN",
  "details": {
    "reason": "Token is invalid or expired"
  }
}
*/
```

### 6. sendVerification(email?: string, phone?: string, type: 'email' | 'phone' = 'email'): Promise<ApiResponse>
Doğrulama kodu gönderir.

**Parametreler:**
- `email` (string, opsiyonel): E-posta adresi
- `phone` (string, opsiyonel): Telefon numarası
- `type` ('email' | 'phone'): Doğrulama tipi

**Detaylı Örnek:**
```typescript
const sendVerification = await zapi.auth.sendVerification(
  'user@example.com',
  undefined,
  'email'
);

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Doğrulama kodu gönderildi",
  "data": {
    "verification": {
      "id": "verification_64f8a1b2c3d4e5f6g7h8i9j0",
      "type": "email",
      "recipient": "user@example.com",
      "expiresAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Doğrulama kodu gönderilemedi",
  "error": "VERIFICATION_SEND_FAILED",
  "details": {
    "reason": "Email service is temporarily unavailable"
  }
}
*/
```

### 7. verify(email: string, phone: string, code: string, type: 'email' | 'phone'): Promise<ApiResponse>
Doğrulama kodunu kontrol eder.

**Parametreler:**
- `email` (string): E-posta adresi
- `phone` (string): Telefon numarası
- `code` (string): Doğrulama kodu
- `type` ('email' | 'phone'): Doğrulama tipi

**Detaylı Örnek:**
```typescript
const verify = await zapi.auth.verify(
  'user@example.com',
  '+905551234567',
  '123456',
  'email'
);

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Doğrulama başarılı",
  "data": {
    "verification": {
      "id": "verification_64f8a1b2c3d4e5f6g7h8i9j0",
      "type": "email",
      "status": "verified",
      "verifiedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Geçersiz doğrulama kodu",
  "error": "INVALID_VERIFICATION_CODE",
  "details": {
    "field": "code",
    "value": "123456",
    "reason": "Verification code is incorrect or expired"
  }
}
*/
```

### 8. resetPassword(code: string, newPassword: string): Promise<ApiResponse>
Şifre sıfırlama yapar.

**Parametreler:**
- `code` (string): Sıfırlama kodu
- `newPassword` (string): Yeni şifre

**Detaylı Örnek:**
```typescript
const resetPassword = await zapi.auth.resetPassword(
  'reset_code_123456',
  'newSecurePassword123'
);

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Şifre başarıyla sıfırlandı",
  "data": {
    "reset": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "resetAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Geçersiz sıfırlama kodu",
  "error": "INVALID_RESET_CODE",
  "details": {
    "reason": "Reset code is invalid or expired"
  }
}
*/
```

### 9. forgotPassword(email?: string, phone?: string): Promise<ApiResponse>
Şifre sıfırlama talebi gönderir.

**Parametreler:**
- `email` (string, opsiyonel): E-posta adresi
- `phone` (string, opsiyonel): Telefon numarası

**Detaylı Örnek:**
```typescript
const forgotPassword = await zapi.auth.forgotPassword(
  'user@example.com',
  undefined
);

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Şifre sıfırlama bağlantısı gönderildi",
  "data": {
    "reset": {
      "id": "reset_64f8a1b2c3d4e5f6g7h8i9j0",
      "type": "email",
      "recipient": "user@example.com",
      "expiresAt": "2024-01-15T11:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Kullanıcı bulunamadı",
  "error": "USER_NOT_FOUND",
  "details": {
    "reason": "No user found with the provided email or phone"
  }
}
*/
```

### 10. getProfile(): Promise<ApiResponse>
Kullanıcı profilini getirir.

**Detaylı Örnek:**
```typescript
const profile = await zapi.auth.getProfile();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Profil bilgileri getirildi",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "status": "active",
      "emailVerified": true,
      "profile": {
        "avatar": "https://api.zapi.com/avatars/user_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
        "bio": "Full-stack developer",
        "location": "Istanbul, Turkey",
        "website": "https://johndoe.dev"
      },
      "preferences": {
        "language": "tr",
        "timezone": "Europe/Istanbul",
        "notifications": {
          "email": true,
          "push": true,
          "sms": false
        }
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Kimlik doğrulama gerekli",
  "error": "AUTHENTICATION_REQUIRED",
  "details": {
    "reason": "Valid access token is required"
  }
}
*/
```

### 11. updateProfile(data: any): Promise<ApiResponse>
Kullanıcı profilini günceller.

**Parametreler:**
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const updateProfile = await zapi.auth.updateProfile({
  name: 'John Doe Updated',
  profile: {
    bio: 'Senior Full-stack developer with 5 years experience',
    location: 'Istanbul, Turkey',
    website: 'https://johndoe.dev'
  },
  preferences: {
    language: 'en',
    timezone: 'Europe/London'
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Profil başarıyla güncellendi",
  "data": {
    "user": {
      "id": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "email": "user@example.com",
      "name": "John Doe Updated",
      "role": "user",
      "status": "active",
      "profile": {
        "avatar": "https://api.zapi.com/avatars/user_64f8a1b2c3d4e5f6g7h8i9j0.jpg",
        "bio": "Senior Full-stack developer with 5 years experience",
        "location": "Istanbul, Turkey",
        "website": "https://johndoe.dev"
      },
      "preferences": {
        "language": "en",
        "timezone": "Europe/London",
        "notifications": {
          "email": true,
          "push": true,
          "sms": false
        }
      },
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Profil güncellenemedi",
  "error": "PROFILE_UPDATE_FAILED",
  "details": {
    "field": "name",
    "value": "",
    "reason": "Name cannot be empty"
  }
}
*/
```

### 12. changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse>
Şifre değiştirir.

**Parametreler:**
- `currentPassword` (string): Mevcut şifre
- `newPassword` (string): Yeni şifre

**Detaylı Örnek:**
```typescript
const changePassword = await zapi.auth.changePassword(
  'currentPassword123',
  'newSecurePassword456'
);

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Şifre başarıyla değiştirildi",
  "data": {
    "change": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "changedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Mevcut şifre yanlış",
  "error": "INVALID_CURRENT_PASSWORD",
  "details": {
    "field": "currentPassword",
    "reason": "Current password is incorrect"
  }
}
*/
```

### 13. refresh(refreshToken: string): Promise<ApiResponse>
Token yeniler.

**Parametreler:**
- `refreshToken` (string): Refresh token

**Detaylı Örnek:**
```typescript
const refresh = await zapi.auth.refresh('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Token başarıyla yenilendi",
  "data": {
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2024-01-16T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Geçersiz refresh token",
  "error": "INVALID_REFRESH_TOKEN",
  "details": {
    "reason": "Refresh token is invalid or expired"
  }
}
*/
```

### 14. logout(): Promise<ApiResponse>
Çıkış yapar.

**Detaylı Örnek:**
```typescript
const logout = await zapi.auth.logout();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Başarıyla çıkış yapıldı",
  "data": {
    "logout": {
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "loggedOutAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Çıkış yapılamadı",
  "error": "LOGOUT_FAILED",
  "details": {
    "reason": "User is not authenticated"
  }
}
*/
```

### 15. verifyToken(token: string): Promise<ApiResponse>
Token doğrular.

**Parametreler:**
- `token` (string): Doğrulanacak token

**Detaylı Örnek:**
```typescript
const verifyToken = await zapi.auth.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Token geçerli",
  "data": {
    "verification": {
      "valid": true,
      "userId": "user_64f8a1b2c3d4e5f6g7h8i9j0",
      "expiresAt": "2024-01-16T10:40:00Z",
      "verifiedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Geçersiz token",
  "error": "INVALID_TOKEN",
  "details": {
    "reason": "Token is invalid or expired"
  }
}
*/
```

### 16. health(): Promise<ApiResponse>
Sistem sağlık durumunu kontrol eder.

**Detaylı Örnek:**
```typescript
const health = await zapi.auth.health();

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Sistem sağlıklı",
  "data": {
    "health": {
      "status": "healthy",
      "timestamp": "2024-01-15T10:40:00Z",
      "version": "1.0.0",
      "uptime": "15 days, 8 hours, 32 minutes"
    }
  }
}
*/

// Hata çıktısı:
/*
{
  "success": false,
  "message": "Sistem sağlıksız",
  "error": "HEALTH_CHECK_FAILED",
  "details": {
    "reason": "Database connection failed"
  }
}
*/
```

## Hata Yönetimi

```typescript
import { ZAPIException, ValidationException, AuthenticationException } from 'zapi-react-native-sdk';

try {
  const result = await zapi.auth.login('user@example.com', undefined, 'password');
} catch (error) {
  if (error instanceof ValidationException) {
    console.log('Geçersiz veri:', error.message);
    console.log('Hata detayları:', error.details);
  } else if (error instanceof AuthenticationException) {
    console.log('Kimlik doğrulama hatası:', error.message);
    console.log('Hata kodu:', error.errorCode);
  } else if (error instanceof ZAPIException) {
    console.log('API hatası:', error.message);
    console.log('HTTP durum kodu:', error.statusCode);
  }
}
```

## Tam Örnek Kullanım

```typescript
import { ZAPI } from 'zapi-react-native-sdk';

const zapi = new ZAPI('your-api-key', 'your-app-id', 'https://api.zapi.com');

try {
  // 1. Kullanıcı kaydı
  const register = await zapi.auth.register({
    email: 'user@example.com',
    password: 'securePassword123',
    name: 'John Doe',
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  });
  console.log('Kullanıcı kaydedildi:', register.data.user.id);
  
  // 2. Kullanıcı girişi
  const login = await zapi.auth.login(
    'user@example.com',
    undefined,
    'securePassword123',
    { appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0' }
  );
  console.log('Giriş başarılı:', login.data.user.name);
  
  // 3. OTP gönder
  const sendOTP = await zapi.auth.sendOTP(
    'user@example.com',
    undefined,
    'app_64f8a1b2c3d4e5f6g7h8i9j0'
  );
  console.log('OTP gönderildi:', sendOTP.data.otp.id);
  
  // 4. OTP doğrula
  const verifyOTP = await zapi.auth.verifyOTP('123456', 'user@example.com');
  console.log('OTP doğrulandı:', verifyOTP.data.verification.status);
  
  // 5. E-posta doğrula
  const verifyEmail = await zapi.auth.verifyEmail('email_verification_token');
  console.log('E-posta doğrulandı:', verifyEmail.data.verification.email);
  
  // 6. Doğrulama kodu gönder
  const sendVerification = await zapi.auth.sendVerification(
    'user@example.com',
    undefined,
    'email'
  );
  console.log('Doğrulama kodu gönderildi:', sendVerification.data.verification.id);
  
  // 7. Doğrulama kodunu kontrol et
  const verify = await zapi.auth.verify(
    'user@example.com',
    '+905551234567',
    '123456',
    'email'
  );
  console.log('Doğrulama başarılı:', verify.data.verification.status);
  
  // 8. Şifre sıfırlama talebi
  const forgotPassword = await zapi.auth.forgotPassword('user@example.com');
  console.log('Şifre sıfırlama talebi:', forgotPassword.data.reset.id);
  
  // 9. Şifre sıfırla
  const resetPassword = await zapi.auth.resetPassword(
    'reset_code_123456',
    'newSecurePassword123'
  );
  console.log('Şifre sıfırlandı:', resetPassword.data.reset.resetAt);
  
  // 10. Profil getir
  const profile = await zapi.auth.getProfile();
  console.log('Profil:', profile.data.user.name);
  
  // 11. Profil güncelle
  const updateProfile = await zapi.auth.updateProfile({
    name: 'John Doe Updated',
    profile: {
      bio: 'Senior Full-stack developer',
      location: 'Istanbul, Turkey'
    }
  });
  console.log('Profil güncellendi:', updateProfile.data.user.updatedAt);
  
  // 12. Şifre değiştir
  const changePassword = await zapi.auth.changePassword(
    'currentPassword123',
    'newSecurePassword456'
  );
  console.log('Şifre değiştirildi:', changePassword.data.change.changedAt);
  
  // 13. Token yenile
  const refresh = await zapi.auth.refresh('refresh_token_here');
  console.log('Token yenilendi:', refresh.data.tokens.accessToken);
  
  // 14. Token doğrula
  const verifyToken = await zapi.auth.verifyToken('access_token_here');
  console.log('Token geçerli:', verifyToken.data.verification.valid);
  
  // 15. Sistem sağlığı
  const health = await zapi.auth.health();
  console.log('Sistem durumu:', health.data.health.status);
  
  // 16. Çıkış yap
  const logout = await zapi.auth.logout();
  console.log('Çıkış yapıldı:', logout.data.logout.loggedOutAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
