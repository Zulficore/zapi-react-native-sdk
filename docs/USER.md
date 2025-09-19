# User Endpoint

Kullanıcı yönetimi endpoint'leri - Profil yönetimi, avatar işlemleri, kullanım istatistikleri, AI yanıtları ve hesap yönetimi.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const user = zapi.user;
```

## Metodlar

### 1. getProfile()

Kullanıcının profil bilgilerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await user.getProfile();

if (result.success) {
  console.log('Profil bilgileri:', result.data);
  const { firstName, lastName, email, phone } = result.data;
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
    "avatar": "https://api.zapi.com/avatars/user_12345.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Profil bilgileri başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Yetkilendirme gerekli"
  }
}
```

---

### 2. updateProfile(data: any)

Kullanıcı profil bilgilerini günceller

**Parametreler:**
- `data: any` - Güncellenecek profil bilgileri

**Örnek Kullanım:**

```typescript
const result = await user.updateProfile({
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

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Geçersiz telefon numarası formatı"
  }
}
```

---

### 3. uploadAvatar(filePath: string)

Kullanıcı avatar resmi yükler

**Parametreler:**
- `filePath: string` - Avatar dosya yolu

**Örnek Kullanım:**

```typescript
const result = await user.uploadAvatar("/path/to/avatar.jpg");

if (result.success) {
  console.log('Avatar yüklendi:', result.data);
} else {
  console.error('Avatar yükleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "avatarUrl": "https://api.zapi.com/avatars/user_12345.jpg",
    "fileSize": 245760,
    "mimeType": "image/jpeg"
  },
  "message": "Avatar başarıyla yüklendi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "Dosya boyutu çok büyük (max 5MB)"
  }
}
```

---

### 4. deleteAvatar()

Kullanıcı avatar resmini siler

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await user.deleteAvatar();

if (result.success) {
  console.log('Avatar silindi');
} else {
  console.error('Avatar silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "Avatar başarıyla silindi"
}
```

---

### 5. getUsage()

Kullanıcı kullanım istatistiklerini getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await user.getUsage();

if (result.success) {
  console.log('Kullanım istatistikleri:', result.data);
  const { currentPeriod, totalUsage } = result.data;
  console.log(`Bu ay ${currentPeriod.requestsUsed}/${currentPeriod.requestsLimit} istek kullanıldı`);
} else {
  console.error('Kullanım bilgisi getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "currentPeriod": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31",
      "requestsUsed": 1250,
      "requestsLimit": 10000,
      "tokensUsed": 50000,
      "tokensLimit": 100000
    },
    "totalUsage": {
      "requests": 5000,
      "tokens": 200000
    }
  },
  "message": "Kullanım istatistikleri başarıyla getirildi"
}
```

---

### 6. getResponses(options: any)

Kullanıcının AI yanıtlarını listeler

**Parametreler:**
- `options: any` - Filtreleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm yanıtları getir
const result = await user.getResponses();

// Filtreleme ile getir
const result = await user.getResponses({
  limit: 10,
  offset: 0,
  model: "gpt-3.5-turbo"
});

if (result.success) {
  console.log('AI yanıtları:', result.data);
} else {
  console.error('Yanıt getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "responses": [
      {
        "id": "resp_123",
        "prompt": "Merhaba, nasılsın?",
        "response": "Merhaba! Ben iyiyim, teşekkür ederim. Sen nasılsın?",
        "model": "gpt-3.5-turbo",
        "tokens": 25,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  },
  "message": "Yanıtlar başarıyla getirildi"
}
```

---

### 7. getResponse(responseId: string)

Belirli bir AI yanıtını getirir

**Parametreler:**
- `responseId: string` - Yanıt ID'si

**Örnek Kullanım:**

```typescript
const result = await user.getResponse("resp_123");

if (result.success) {
  console.log('Yanıt detayı:', result.data);
} else {
  console.error('Yanıt getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "resp_123",
    "prompt": "Merhaba, nasılsın?",
    "response": "Merhaba! Ben iyiyim, teşekkür ederim. Sen nasılsın?",
    "model": "gpt-3.5-turbo",
    "tokens": 25,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Yanıt başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "RESPONSE_NOT_FOUND",
    "message": "Yanıt bulunamadı"
  }
}
```

---

### 8. deleteResponse(responseId: string)

Belirli bir AI yanıtını siler

**Parametreler:**
- `responseId: string` - Yanıt ID'si

**Örnek Kullanım:**

```typescript
const result = await user.deleteResponse("resp_123");

if (result.success) {
  console.log('Yanıt silindi');
} else {
  console.error('Yanıt silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "Yanıt başarıyla silindi"
}
```

---

### 9. getLastResponse()

Kullanıcının son AI yanıtını getirir

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await user.getLastResponse();

if (result.success) {
  console.log('Son yanıt:', result.data);
} else {
  console.error('Son yanıt getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "resp_123",
    "prompt": "Son soru",
    "response": "Son yanıt",
    "model": "gpt-3.5-turbo",
    "tokens": 15,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Son yanıt başarıyla getirildi"
}
```

---

### 10. deleteAccount()

Kullanıcı hesabını siler

**Parametreler:**

Yok

**Örnek Kullanım:**

```typescript
const result = await user.deleteAccount();

if (result.success) {
  console.log('Hesap silindi');
} else {
  console.error('Hesap silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "Hesap başarıyla silindi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "ACCOUNT_DELETION_FAILED",
    "message": "Hesap silme işlemi başarısız"
  }
}
```

---

### 11. getMetadata(path: string)

Kullanıcı metadata bilgilerini getirir

**Parametreler:**
- `path: string` - Metadata yolu (varsayılan: '')

**Örnek Kullanım:**

```typescript
// Tüm metadata'yı getir
const result = await user.getMetadata();

// Belirli bir path'i getir
const result = await user.getMetadata("preferences.theme");

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
    "preferences": {
      "theme": "dark",
      "language": "tr"
    },
    "settings": {
      "notifications": true
    }
  },
  "message": "Metadata başarıyla getirildi"
}
```

---

### 12. updateMetadata(path: string, value: any)

Kullanıcı metadata bilgilerini günceller

**Parametreler:**
- `path: string` - Metadata yolu
- `value: any` - Güncellenecek değer

**Örnek Kullanım:**

```typescript
const result = await user.updateMetadata("preferences.theme", "light");

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
    "preferences": {
      "theme": "light",
      "language": "tr"
    }
  },
  "message": "Metadata başarıyla güncellendi"
}
```

---

### 13. patchMetadata(path: string, value: any)

Kullanıcı metadata bilgilerini kısmi olarak günceller

**Parametreler:**
- `path: string` - Metadata yolu
- `value: any` - Güncellenecek değer

**Örnek Kullanım:**

```typescript
const result = await user.patchMetadata("preferences.language", "en");

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
    "preferences": {
      "theme": "light",
      "language": "en"
    }
  },
  "message": "Metadata başarıyla güncellendi"
}
```

---

### 14. deleteMetadata(path: string)

Kullanıcı metadata bilgilerini siler

**Parametreler:**
- `path: string` - Metadata yolu

**Örnek Kullanım:**

```typescript
const result = await user.deleteMetadata("preferences.theme");

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

### 15. getConversations(options: any)

Kullanıcının konuşmalarını listeler

**Parametreler:**
- `options: any` - Filtreleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm konuşmaları getir
const result = await user.getConversations();

// Filtreleme ile getir
const result = await user.getConversations({
  limit: 10,
  offset: 0
});

if (result.success) {
  console.log('Konuşmalar:', result.data);
} else {
  console.error('Konuşma getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "conv_123",
        "title": "AI Yardımcı Konuşması",
        "messageCount": 5,
        "lastMessage": "Teşekkür ederim!",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T11:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  },
  "message": "Konuşmalar başarıyla getirildi"
}
```

---

### 16. getConversation(responseId: string)

Belirli bir konuşmayı getirir

**Parametreler:**
- `responseId: string` - Yanıt ID'si

**Örnek Kullanım:**

```typescript
const result = await user.getConversation("conv_123");

if (result.success) {
  console.log('Konuşma detayı:', result.data);
} else {
  console.error('Konuşma getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "conv_123",
    "title": "AI Yardımcı Konuşması",
    "messages": [
      {
        "id": "msg_1",
        "role": "user",
        "content": "Merhaba",
        "timestamp": "2024-01-15T10:30:00Z"
      },
      {
        "id": "msg_2",
        "role": "assistant",
        "content": "Merhaba! Size nasıl yardımcı olabilirim?",
        "timestamp": "2024-01-15T10:30:05Z"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  },
  "message": "Konuşma başarıyla getirildi"
}
```

---

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `VALIDATION_ERROR` | Geçersiz parametreler |
| `FILE_TOO_LARGE` | Dosya boyutu çok büyük |
| `RESPONSE_NOT_FOUND` | Yanıt bulunamadı |
| `ACCOUNT_DELETION_FAILED` | Hesap silme işlemi başarısız |
| `METADATA_NOT_FOUND` | Metadata bulunamadı |
| `CONVERSATION_NOT_FOUND` | Konuşma bulunamadı |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |