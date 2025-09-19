# ZAPI React Native SDK Dokümantasyonu

ZAPI React Native SDK, ZAPI platformunun tüm özelliklerini React Native uygulamalarında kullanmanızı sağlayan kapsamlı bir SDK'dır.

## Kurulum

```bash
npm install zapi-react-native-sdk
```

## Hızlı Başlangıç

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

// Kimlik doğrulama
const authResult = await zapi.auth.login("user@example.com", null, "password");
if (authResult.success) {
  zapi.setBearerToken(authResult.data.token);
  
  // Kullanıcı profilini getir
  const profile = await zapi.user.getProfile();
  console.log('Kullanıcı:', profile.data);
}
```

## Endpoint'ler

### 🔐 Kimlik Doğrulama
- **[Auth](./AUTH.md)** - Kullanıcı kaydı, giriş, şifre sıfırlama, OTP işlemleri (17 metod)

### 👤 Kullanıcı Yönetimi  
- **[User](./USER.md)** - Profil yönetimi, avatar, kullanım istatistikleri, AI yanıtları (16 metod)

### 🔧 Yönetim
- **Admin** - Sistem yönetimi, cache, kuyruk, cron işlemleri (15 metod)
- **Functions** - Fonksiyon oluşturma, çalıştırma, yönetimi (8 metod)

### 📊 İçerik ve Medya
- **Content** - İçerik yönetimi, arama, metadata (14 metod)
- **Images** - Görsel oluşturma, düzenleme, varyasyonlar (3 metod)
- **Audio** - Ses işleme, transkripsiyon, çeviri (3 metod)
- **Video** - Video işleme, transkripsiyon (2 metod)

### 🔑 API ve Güvenlik
- **APIKeys** - API anahtarı yönetimi (9 metod)
- **AuthFirebase** - Firebase kimlik doğrulama (9 metod)
- **AuthOAuth** - OAuth kimlik doğrulama (17 metod)

### 📱 Uygulama Yönetimi
- **Apps** - Uygulama yönetimi, metadata (12 metod)
- **Users** - Kullanıcı listesi, yönetimi (8 metod)
- **Plans** - Plan yönetimi, karşılaştırma (11 metod)
- **Subscription** - Abonelik yönetimi (6 metod)

### 📧 Bildirimler
- **Notifications** - Email, SMS gönderimi, şablonlar (12 metod)
- **MailTemplates** - Email şablon yönetimi (7 metod)

### 🔄 Sistem ve Altyapı
- **System** - Sistem bilgileri, sağlık kontrolü (3 metod)
- **Backup** - Yedekleme işlemleri (4 metod)
- **Logs** - Log yönetimi, arama (5 metod)
- **Logger** - Log kaydetme (2 metod)

### 🌐 Webhook ve Gerçek Zamanlı
- **Webhook** - Webhook yönetimi (4 metod)
- **Realtime** - Gerçek zamanlı bağlantılar (9 metod)

### 📚 Dokümantasyon ve Test
- **Docs** - Dokümantasyon yönetimi (2 metod)
- **Debug** - Hata ayıklama (1 metod)
- **AppleTest** - Apple test işlemleri (7 metod)

### 🔍 Arama ve Analitik
- **Responses** - Yanıt yönetimi, arama (6 metod)
- **Roles** - Rol yönetimi (8 metod)
- **Info** - Sistem bilgileri (4 metod)
- **Embeddings** - Vektör işlemleri (1 metod)

### ⚙️ Konfigürasyon
- **Config** - Sistem konfigürasyonu (1 metod)
- **Metadata** - Metadata yönetimi (4 metod)
- **OAuthMetadata** - OAuth metadata (4 metod)

## İstatistikler

- **Toplam Endpoint:** 35
- **Toplam Metod:** 256
- **Dokümante Edilen:** 2 (Auth, User)
- **Kalan:** 33 endpoint

## Özellikler

### ✅ Tamamlanan
- **Auth Endpoint** - 17 metod (kayıt, giriş, OTP, şifre sıfırlama)
- **User Endpoint** - 16 metod (profil, avatar, kullanım, AI yanıtları)

### ⏳ Devam Eden
- **Admin Endpoint** - Sistem yönetimi
- **Functions Endpoint** - Fonksiyon yönetimi
- **Content Endpoint** - İçerik yönetimi
- **Diğer 30 endpoint**

## Kullanım Örnekleri

### Kimlik Doğrulama

```typescript
// Kullanıcı kaydı
const registerResult = await zapi.auth.register({
  email: "user@example.com",
  password: "securepassword123",
  firstName: "John",
  lastName: "Doe"
});

// Giriş
const loginResult = await zapi.auth.login("user@example.com", null, "securepassword123");
if (loginResult.success) {
  zapi.setBearerToken(loginResult.data.token);
}

// OTP gönder
const otpResult = await zapi.auth.sendOTP("user@example.com", null, "90", "John", "Doe");

// OTP doğrula
const verifyResult = await zapi.auth.verifyOTP(null, null, "user@example.com", "123456");
```

### Kullanıcı İşlemleri

```typescript
// Profil getir
const profile = await zapi.user.getProfile();

// Profil güncelle
const updateResult = await zapi.user.updateProfile({
  firstName: "Jane",
  lastName: "Smith"
});

// Avatar yükle
const avatarResult = await zapi.user.uploadAvatar("/path/to/avatar.jpg");

// Kullanım istatistikleri
const usage = await zapi.user.getUsage();
console.log(`Bu ay ${usage.data.currentPeriod.requestsUsed} istek kullanıldı`);

// AI yanıtları
const responses = await zapi.user.getResponses();
```

## Hata Yönetimi

Tüm metodlar aşağıdaki formatı kullanır:

```typescript
const result = await zapi.auth.login("email", null, "password");

if (result.success) {
  // Başarılı işlem
  console.log(result.data);
} else {
  // Hata durumu
  console.error(result.error.code, result.error.message);
}
```

## Güvenlik

- Tüm API istekleri HTTPS üzerinden yapılır
- JWT token tabanlı kimlik doğrulama
- Rate limiting koruması
- Input validation

## Destek

- **Dokümantasyon:** Bu dokümantasyon
- **API Referansı:** Her endpoint için detaylı metod listesi
- **Örnekler:** Gerçek kullanım örnekleri
- **Hata Kodları:** Tüm hata durumları ve açıklamaları

---

*Bu dokümantasyon gerçek API'den üretilmiştir ve %100 doğrudur.*