# Auth Endpoint

Kimlik doğrulama endpoint'leri - Kullanıcı kaydı, giriş, şifre sıfırlama, email/telefon doğrulama, OTP işlemleri ve profil yönetimi.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const auth = zapi.auth;
```

## Metodlar

### 1. register(data: any)

Kullanıcı kaydı yapar

**Parametreler:**
- `data: any` - Kayıt bilgileri

**Örnek Kullanım:**

```typescript
const result = await auth.register({
  email: "user@example.com",
  password: "securepassword123",
  firstName: "John",
  lastName: "Doe",
  phone: "+905551234567"
});

if (result.success) {
  console.log('Kayıt başarılı:', result.data);
  zapi.setBearerToken(result.data.token);
} else {
  console.error('Kayıt hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_12345",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+905551234567",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "Kullanıcı başarıyla kaydedildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "Bu email adresi zaten kullanılıyor",
    "details": {
      "field": "email",
      "value": "user@example.com"
    }
  }
}
```

---

### 2. login(email: string | null, phone: string | null, password: string, options: any)

Kullanıcı girişi yapar

**Parametreler:**
- `email: string | null` - Email adresi (opsiyonel)
- `phone: string | null` - Telefon numarası (opsiyonel)
- `password: string` - Şifre
- `options: any` - Ek seçenekler (opsiyonel)

**Örnek Kullanım:**

```typescript
// Email ile giriş
const result = await auth.login("user@example.com", null, "securepassword123");

// Telefon ile giriş
const result = await auth.login(null, "+905551234567", "securepassword123");

if (result.success) {
  console.log('Giriş başarılı:', result.data);
  zapi.setBearerToken(result.data.token);
} else {
  console.error('Giriş hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_12345",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "message": "Giriş başarılı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email veya şifre hatalı"
  }
}
```

---

### 3. sendOTP(mail: string | null, phone: string | null, phonePrefix: string, firstName: string, lastName: string, name: string, surname: string, appId: string | null)

OTP kodu gönderir

**Parametreler:**
- `mail: string | null` - Email adresi (opsiyonel)
- `phone: string | null` - Telefon numarası (opsiyonel)
- `phonePrefix: string` - Telefon ülke kodu (varsayılan: '90')
- `firstName: string` - Ad (varsayılan: '')
- `lastName: string` - Soyad (varsayılan: '')
- `name: string` - İsim (varsayılan: '')
- `surname: string` - Soyisim (varsayılan: '')
- `appId: string | null` - Uygulama ID'si (opsiyonel)

**Örnek Kullanım:**

```typescript
// Email ile OTP gönder
const result = await auth.sendOTP("user@example.com", null, "90", "John", "Doe", "", "", null);

// Telefon ile OTP gönder
const result = await auth.sendOTP(null, "5551234567", "90", "John", "Doe", "", "", null);

if (result.success) {
  console.log('OTP gönderildi:', result.data);
} else {
  console.error('OTP gönderme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "otpId": "otp_12345",
    "expiresIn": 300,
    "message": "OTP kodu gönderildi"
  },
  "message": "OTP başarıyla gönderildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PHONE_FORMAT",
    "message": "Telefon numarası formatı geçersiz"
  }
}
```

---

### 4. verifyOTP(phone: string | null, phonePrefix: string | null, email: string | null, otpCode: string)

OTP kodunu doğrular

**Parametreler:**
- `phone: string | null` - Telefon numarası (opsiyonel)
- `phonePrefix: string | null` - Telefon ülke kodu (opsiyonel)
- `email: string | null` - Email adresi (opsiyonel)
- `otpCode: string` - OTP kodu

**Örnek Kullanım:**

```typescript
// Email ile OTP doğrula
const result = await auth.verifyOTP(null, null, "user@example.com", "123456");

// Telefon ile OTP doğrula
const result = await auth.verifyOTP("5551234567", "90", null, "123456");

if (result.success) {
  console.log('OTP doğrulandı:', result.data);
} else {
  console.error('OTP doğrulama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "verified": true,
    "message": "OTP kodu doğrulandı"
  },
  "message": "OTP başarıyla doğrulandı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_OTP",
    "message": "OTP kodu hatalı veya süresi dolmuş"
  }
}
```

---

### 5. getProfile()

Kullanıcı profil bilgilerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await auth.getProfile();

if (result.success) {
  console.log('Profil bilgileri:', result.data);
} else {
  console.error('Profil getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "user_12345",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+905551234567",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Profil bilgileri başarıyla getirildi"
}
```

---

### 6. updateProfile(data: any)

Kullanıcı profil bilgilerini günceller

**Parametreler:**
- `data: any` - Güncellenecek profil bilgileri

**Örnek Kullanım:**

```typescript
const result = await auth.updateProfile({
  firstName: "Jane",
  lastName: "Smith",
  phone: "+905559876543"
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
    "id": "user_12345",
    "email": "user@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+905559876543",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Profil başarıyla güncellendi"
}
```

---

### 7. logout()

Kullanıcı çıkışı yapar

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await auth.logout();

if (result.success) {
  console.log('Çıkış başarılı');
  zapi.clearBearerToken();
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

### 8. refreshToken(refreshToken: string)

Token yeniler

**Parametreler:**
- `refreshToken: string` - Yenileme token'ı

**Örnek Kullanım:**

```typescript
const result = await auth.refreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");

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

---

### 9. changePassword(currentPassword: string, newPassword: string)

Kullanıcı şifresini değiştirir

**Parametreler:**
- `currentPassword: string` - Mevcut şifre
- `newPassword: string` - Yeni şifre

**Örnek Kullanım:**

```typescript
const result = await auth.changePassword("oldpassword123", "newpassword456");

if (result.success) {
  console.log('Şifre değiştirildi');
} else {
  console.error('Şifre değiştirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "Şifre başarıyla değiştirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CURRENT_PASSWORD",
    "message": "Mevcut şifre hatalı"
  }
}
```

---

### 10. forgotPassword(email: string | null, phone: string | null)

Şifre sıfırlama kodu gönderir

**Parametreler:**
- `email: string | null` - Email adresi (opsiyonel)
- `phone: string | null` - Telefon numarası (opsiyonel)

**Örnek Kullanım:**

```typescript
// Email ile şifre sıfırlama
const result = await auth.forgotPassword("user@example.com", null);

// Telefon ile şifre sıfırlama
const result = await auth.forgotPassword(null, "+905551234567");

if (result.success) {
  console.log('Şifre sıfırlama kodu gönderildi');
} else {
  console.error('Şifre sıfırlama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "resetToken": "reset_token_12345",
    "expiresIn": 1800
  },
  "message": "Şifre sıfırlama kodu gönderildi"
}
```

---

### 11. resetPassword(code: string, newPassword: string)

Şifre sıfırlama kodunu kullanarak yeni şifre belirler

**Parametreler:**
- `code: string` - Sıfırlama kodu
- `newPassword: string` - Yeni şifre

**Örnek Kullanım:**

```typescript
const result = await auth.resetPassword("reset_code_123", "newpassword456");

if (result.success) {
  console.log('Şifre sıfırlandı');
} else {
  console.error('Şifre sıfırlama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "Şifre başarıyla sıfırlandı"
}
```

---

### 12. verifyEmail(token: string)

Email doğrulama token'ını doğrular

**Parametreler:**
- `token: string` - Email doğrulama token'ı

**Örnek Kullanım:**

```typescript
const result = await auth.verifyEmail("email_verification_token_123");

if (result.success) {
  console.log('Email doğrulandı');
} else {
  console.error('Email doğrulama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "verified": true
  },
  "message": "Email başarıyla doğrulandı"
}
```

---

### 13. sendVerification(email: string | null, phone: string | null, type: string)

Email veya telefon doğrulama kodu gönderir

**Parametreler:**
- `email: string | null` - Email adresi (opsiyonel)
- `phone: string | null` - Telefon numarası (opsiyonel)
- `type: string` - Doğrulama tipi ('email' veya 'phone')

**Örnek Kullanım:**

```typescript
// Email doğrulama
const result = await auth.sendVerification("user@example.com", null, "email");

// Telefon doğrulama
const result = await auth.sendVerification(null, "+905551234567", "phone");

if (result.success) {
  console.log('Doğrulama kodu gönderildi');
} else {
  console.error('Doğrulama kodu gönderme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "verificationId": "verification_12345",
    "expiresIn": 300
  },
  "message": "Doğrulama kodu gönderildi"
}
```

---

### 14. verify(email: string | null, phone: string | null, code: string, type: string)

Email veya telefon doğrulama kodunu doğrular

**Parametreler:**
- `email: string | null` - Email adresi (opsiyonel)
- `phone: string | null` - Telefon numarası (opsiyonel)
- `code: string` - Doğrulama kodu
- `type: string` - Doğrulama tipi ('email' veya 'phone')

**Örnek Kullanım:**

```typescript
// Email doğrulama
const result = await auth.verify("user@example.com", null, "123456", "email");

// Telefon doğrulama
const result = await auth.verify(null, "+905551234567", "123456", "phone");

if (result.success) {
  console.log('Doğrulama başarılı');
} else {
  console.error('Doğrulama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "verified": true
  },
  "message": "Doğrulama başarılı"
}
```

---

### 15. verifyToken(token: string)

Token'ı doğrular

**Parametreler:**
- `token: string` - Doğrulanacak token

**Örnek Kullanım:**

```typescript
const result = await auth.verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");

if (result.success) {
  console.log('Token geçerli:', result.data);
} else {
  console.error('Token doğrulama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "id": "user_12345",
      "email": "user@example.com"
    }
  },
  "message": "Token geçerli"
}
```

---

### 16. refresh(refreshToken: string)

Token yeniler (alternatif metod)

**Parametreler:**
- `refreshToken: string` - Yenileme token'ı

**Örnek Kullanım:**

```typescript
const result = await auth.refresh("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");

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

---

### 17. health()

Auth servisinin sağlık durumunu kontrol eder

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await auth.health();

if (result.success) {
  console.log('Auth servisi çalışıyor:', result.data);
} else {
  console.error('Auth servis hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "message": "Auth servisi sağlıklı"
}
```

---

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `EMAIL_ALREADY_EXISTS` | Email adresi zaten kullanılıyor |
| `INVALID_CREDENTIALS` | Email veya şifre hatalı |
| `INVALID_OTP` | OTP kodu hatalı veya süresi dolmuş |
| `INVALID_PHONE_FORMAT` | Telefon numarası formatı geçersiz |
| `INVALID_CURRENT_PASSWORD` | Mevcut şifre hatalı |
| `TOKEN_EXPIRED` | Token süresi dolmuş |
| `TOKEN_INVALID` | Token geçersiz |
| `USER_NOT_FOUND` | Kullanıcı bulunamadı |
| `ACCOUNT_DISABLED` | Hesap devre dışı |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |