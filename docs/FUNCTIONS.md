# Functions Endpoint

Fonksiyon yönetimi endpoint'leri - Kullanıcı fonksiyonlarının oluşturulması, güncellenmesi, çalıştırılması ve yönetimi.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const functions = zapi.functions;
```

## Metodlar

### 1. list(options: any)

Fonksiyonları listeler

**Parametreler:**
- `options: any` - Filtreleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm fonksiyonları getir
const result = await functions.list();

// Filtreleme ile getir
const result = await functions.list({
  limit: 10,
  offset: 0,
  status: "active"
});

if (result.success) {
  console.log('Fonksiyonlar:', result.data);
} else {
  console.error('Fonksiyon listesi hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "functions": [
      {
        "id": "func_123",
        "name": "Email Validator",
        "description": "Email adresini doğrular",
        "status": "active",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  },
  "message": "Fonksiyonlar başarıyla listelendi"
}
```

---

### 2. create(data: any)

Yeni fonksiyon oluşturur

**Parametreler:**
- `data: any` - Fonksiyon bilgileri

**Örnek Kullanım:**

```typescript
const result = await functions.create({
  name: "Email Validator",
  description: "Email adresini doğrular",
  code: "function validateEmail(email) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email); }",
  parameters: [
    {
      "name": "email",
      "type": "string",
      "required": true,
      "description": "Doğrulanacak email adresi"
    }
  ]
});

if (result.success) {
  console.log('Fonksiyon oluşturuldu:', result.data);
} else {
  console.error('Fonksiyon oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "func_123",
    "name": "Email Validator",
    "description": "Email adresini doğrular",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Fonksiyon başarıyla oluşturuldu"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Fonksiyon adı zaten kullanılıyor"
  }
}
```

---

### 3. get(functionId: string)

Belirli bir fonksiyonu getirir

**Parametreler:**
- `functionId: string` - Fonksiyon ID'si

**Örnek Kullanım:**

```typescript
const result = await functions.get("func_123");

if (result.success) {
  console.log('Fonksiyon detayı:', result.data);
  const { name, description, code, parameters } = result.data;
} else {
  console.error('Fonksiyon getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "func_123",
    "name": "Email Validator",
    "description": "Email adresini doğrular",
    "code": "function validateEmail(email) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email); }",
    "parameters": [
      {
        "name": "email",
        "type": "string",
        "required": true,
        "description": "Doğrulanacak email adresi"
      }
    ],
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Fonksiyon başarıyla getirildi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "FUNCTION_NOT_FOUND",
    "message": "Fonksiyon bulunamadı"
  }
}
```

---

### 4. update(functionId: string, data: any)

Fonksiyonu günceller

**Parametreler:**
- `functionId: string` - Fonksiyon ID'si
- `data: any` - Güncellenecek bilgiler

**Örnek Kullanım:**

```typescript
const result = await functions.update("func_123", {
  name: "Advanced Email Validator",
  description: "Gelişmiş email doğrulama fonksiyonu",
  code: "function validateEmail(email) { /* gelişmiş kod */ }"
});

if (result.success) {
  console.log('Fonksiyon güncellendi:', result.data);
} else {
  console.error('Fonksiyon güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "func_123",
    "name": "Advanced Email Validator",
    "description": "Gelişmiş email doğrulama fonksiyonu",
    "status": "active",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Fonksiyon başarıyla güncellendi"
}
```

---

### 5. delete(functionId: string)

Fonksiyonu siler

**Parametreler:**
- `functionId: string` - Fonksiyon ID'si

**Örnek Kullanım:**

```typescript
const result = await functions.delete("func_123");

if (result.success) {
  console.log('Fonksiyon silindi');
} else {
  console.error('Fonksiyon silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {},
  "message": "Fonksiyon başarıyla silindi"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "FUNCTION_IN_USE",
    "message": "Fonksiyon kullanımda olduğu için silinemiyor"
  }
}
```

---

### 6. execute(functionId: string, data: any)

Fonksiyonu çalıştırır

**Parametreler:**
- `functionId: string` - Fonksiyon ID'si
- `data: any` - Çalıştırma parametreleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await functions.execute("func_123", {
  email: "user@example.com"
});

if (result.success) {
  console.log('Fonksiyon sonucu:', result.data);
  const { result: functionResult, executionTime } = result.data;
} else {
  console.error('Fonksiyon çalıştırma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "result": true,
    "executionTime": 15,
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "message": "Fonksiyon başarıyla çalıştırıldı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "FUNCTION_EXECUTION_ERROR",
    "message": "Fonksiyon çalıştırılırken hata oluştu",
    "details": {
      "error": "ReferenceError: undefined variable"
    }
  }
}
```

---

### 7. toggleStatus(functionId: string)

Fonksiyon durumunu değiştirir

**Parametreler:**
- `functionId: string` - Fonksiyon ID'si

**Örnek Kullanım:**

```typescript
const result = await functions.toggleStatus("func_123");

if (result.success) {
  console.log('Fonksiyon durumu değiştirildi:', result.data);
  const { status } = result.data;
} else {
  console.error('Fonksiyon durum değiştirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "func_123",
    "status": "inactive",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Fonksiyon durumu başarıyla değiştirildi"
}
```

---

### 8. test(functionId: string, data: any)

Fonksiyonu test eder

**Parametreler:**
- `functionId: string` - Fonksiyon ID'si
- `data: any` - Test parametreleri (opsiyonel)

**Örnek Kullanım:**

```typescript
const result = await functions.test("func_123", {
  email: "test@example.com"
});

if (result.success) {
  console.log('Test sonucu:', result.data);
  const { result: testResult, logs } = result.data;
} else {
  console.error('Fonksiyon test hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "result": true,
    "logs": [
      "Fonksiyon başlatıldı",
      "Email doğrulandı: test@example.com",
      "Fonksiyon tamamlandı"
    ],
    "executionTime": 12,
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "message": "Fonksiyon testi başarıyla tamamlandı"
}
```

**Hata Yanıtı:**

```json
{
  "success": false,
  "error": {
    "code": "TEST_EXECUTION_ERROR",
    "message": "Test çalıştırılırken hata oluştu",
    "details": {
      "error": "SyntaxError: Unexpected token",
      "line": 5
    }
  }
}
```

---

## Fonksiyon Parametreleri

Fonksiyon oluştururken kullanabileceğiniz parametre tipleri:

| Tip | Açıklama | Örnek |
|-----|----------|-------|
| `string` | Metin değeri | `"hello world"` |
| `number` | Sayısal değer | `42` |
| `boolean` | Doğru/yanlış | `true` |
| `object` | Nesne | `{"key": "value"}` |
| `array` | Dizi | `[1, 2, 3]` |

## Fonksiyon Durumları

| Durum | Açıklama |
|-------|----------|
| `active` | Fonksiyon aktif ve çalışır durumda |
| `inactive` | Fonksiyon pasif, çalıştırılamaz |
| `draft` | Fonksiyon taslak halinde |
| `error` | Fonksiyonda hata var |

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `FUNCTION_NOT_FOUND` | Fonksiyon bulunamadı |
| `VALIDATION_ERROR` | Geçersiz parametreler |
| `FUNCTION_IN_USE` | Fonksiyon kullanımda |
| `FUNCTION_EXECUTION_ERROR` | Fonksiyon çalıştırma hatası |
| `TEST_EXECUTION_ERROR` | Test çalıştırma hatası |
| `SYNTAX_ERROR` | Kod sözdizimi hatası |
| `RATE_LIMIT_EXCEEDED` | Çok fazla istek gönderildi |

## Güvenlik Notları

- Fonksiyon kodları güvenli bir sandbox ortamında çalıştırılır
- Sistem fonksiyonlarına erişim kısıtlıdır
- Fonksiyon çalıştırma süresi sınırlıdır (30 saniye)
- Test modunda fonksiyonlar gerçek verileri etkilemez