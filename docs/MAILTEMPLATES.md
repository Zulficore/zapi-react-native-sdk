# MailTemplates Endpoint

Email şablonları endpoint'i - Email şablonlarını yönetir.

## Kullanım

```typescript
import ZAPI from 'zapi-react-native-sdk';

const zapi = new ZAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.zapi.com'
});

const mailTemplates = zapi.mailTemplates;
```

## Metodlar

### 1. list(options: any)

Email şablonlarını listeler

**Parametreler:**
- `options: any` - Filtreleme seçenekleri (opsiyonel)

**Örnek Kullanım:**

```typescript
// Tüm email şablonlarını listele
const result = await mailTemplates.list();

if (result.success) {
  console.log('Email şablonları:', result.data);
  result.data.templates.forEach(template => {
    console.log(`${template.name} - ${template.type} - ${template.status}`);
  });
} else {
  console.error('Email şablonları listeleme hatası:', result.error);
}

// Filtreleme seçenekleri ile listele
const filtered = await mailTemplates.list({
  type: 'welcome',
  status: 'active',
  page: 1,
  limit: 10,
  search: 'welcome'
});
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "templates": [
      {
        "id": "template_123",
        "name": "Hoş Geldin Emaili",
        "type": "welcome",
        "status": "active",
        "subject": "{{app_name}}'e Hoş Geldiniz!",
        "preview": "Merhaba {{user_name}}, hoş geldiniz...",
        "variables": ["user_name", "app_name", "login_url"],
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

---

### 2. create(data: any)

Yeni email şablonu oluşturur

**Parametreler:**
- `data: any` - Şablon verisi

**Örnek Kullanım:**

```typescript
const result = await mailTemplates.create({
  name: "Şifre Sıfırlama",
  type: "password_reset",
  subject: "{{app_name}} - Şifre Sıfırlama",
  html: `
    <h1>Şifre Sıfırlama</h1>
    <p>Merhaba {{user_name}},</p>
    <p>Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:</p>
    <a href="{{reset_url}}">Şifreyi Sıfırla</a>
    <p>Bu link 24 saat geçerlidir.</p>
  `,
  text: "Merhaba {{user_name}}, şifrenizi sıfırlamak için: {{reset_url}}",
  variables: ["user_name", "app_name", "reset_url"],
  status: "active"
});

if (result.success) {
  console.log('Email şablonu oluşturuldu:', result.data);
} else {
  console.error('Email şablonu oluşturma hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "template_456",
    "name": "Şifre Sıfırlama",
    "type": "password_reset",
    "status": "active",
    "subject": "{{app_name}} - Şifre Sıfırlama",
    "html": "<h1>Şifre Sıfırlama</h1>...",
    "text": "Merhaba {{user_name}}, şifrenizi sıfırlamak için: {{reset_url}}",
    "variables": ["user_name", "app_name", "reset_url"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 3. get(templateId: string)

Email şablonu detaylarını getirir

**Parametreler:**
- `templateId: string` - Şablon ID'si

**Örnek Kullanım:**

```typescript
const result = await mailTemplates.get('template_123');

if (result.success) {
  console.log('Email şablonu:', result.data);
  console.log('HTML içeriği:', result.data.html);
  console.log('Değişkenler:', result.data.variables);
} else {
  console.error('Email şablonu getirme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "template_123",
    "name": "Hoş Geldin Emaili",
    "type": "welcome",
    "status": "active",
    "subject": "{{app_name}}'e Hoş Geldiniz!",
    "html": "<h1>Hoş Geldiniz!</h1>...",
    "text": "Merhaba {{user_name}}, hoş geldiniz...",
    "variables": ["user_name", "app_name", "login_url"],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 4. update(templateId: string, data: any)

Email şablonunu günceller

**Parametreler:**
- `templateId: string` - Şablon ID'si
- `data: any` - Güncellenecek veri

**Örnek Kullanım:**

```typescript
const result = await mailTemplates.update('template_123', {
  name: "Güncellenmiş Hoş Geldin",
  subject: "{{app_name}}'e Hoş Geldiniz - Yeni Özellikler!",
  html: `
    <h1>Hoş Geldiniz!</h1>
    <p>Merhaba {{user_name}},</p>
    <p>{{app_name}}'e hoş geldiniz! Yeni özelliklerimizi keşfedin:</p>
    <ul>
      <li>Gelişmiş güvenlik</li>
      <li>Hızlı performans</li>
    </ul>
    <a href="{{login_url}}">Hemen Başla</a>
  `
});

if (result.success) {
  console.log('Email şablonu güncellendi:', result.data);
} else {
  console.error('Email şablonu güncelleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "template_123",
    "name": "Güncellenmiş Hoş Geldin",
    "type": "welcome",
    "status": "active",
    "subject": "{{app_name}}'e Hoş Geldiniz - Yeni Özellikler!",
    "html": "<h1>Hoş Geldiniz!</h1>...",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 5. delete(templateId: string)

Email şablonunu siler

**Parametreler:**
- `templateId: string` - Şablon ID'si

**Örnek Kullanım:**

```typescript
const result = await mailTemplates.delete('template_123');

if (result.success) {
  console.log('Email şablonu silindi:', result.data);
} else {
  console.error('Email şablonu silme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "template_123",
    "deletedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 6. preview(templateId: string, variables: any)

Email şablonunun önizlemesini oluşturur

**Parametreler:**
- `templateId: string` - Şablon ID'si
- `variables: any` - Önizleme için değişkenler

**Örnek Kullanım:**

```typescript
const result = await mailTemplates.preview('template_123', {
  user_name: "Ahmet Yılmaz",
  app_name: "ZAPI Platform",
  login_url: "https://app.zapi.com/login"
});

if (result.success) {
  console.log('Email önizlemesi:', result.data);
  console.log('HTML önizlemesi:', result.data.html);
  console.log('Text önizlemesi:', result.data.text);
} else {
  console.error('Email önizleme hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "templateId": "template_123",
    "subject": "ZAPI Platform'e Hoş Geldiniz!",
    "html": "<h1>Hoş Geldiniz!</h1><p>Merhaba Ahmet Yılmaz,</p>...",
    "text": "Merhaba Ahmet Yılmaz, ZAPI Platform'e hoş geldiniz...",
    "variables": {
      "user_name": "Ahmet Yılmaz",
      "app_name": "ZAPI Platform",
      "login_url": "https://app.zapi.com/login"
    }
  }
}
```

---

### 7. clone(templateId: string, data: any)

Email şablonunu kopyalar

**Parametreler:**
- `templateId: string` - Kopyalanacak şablon ID'si
- `data: any` - Yeni şablon için ek veriler

**Örnek Kullanım:**

```typescript
const result = await mailTemplates.clone('template_123', {
  name: "Hoş Geldin Emaili - V2",
  type: "welcome_v2",
  status: "draft"
});

if (result.success) {
  console.log('Email şablonu kopyalandı:', result.data);
} else {
  console.error('Email şablonu kopyalama hatası:', result.error);
}
```

**Başarılı Yanıt:**

```json
{
  "success": true,
  "data": {
    "id": "template_789",
    "name": "Hoş Geldin Emaili - V2",
    "type": "welcome_v2",
    "status": "draft",
    "subject": "{{app_name}}'e Hoş Geldiniz!",
    "html": "<h1>Hoş Geldiniz!</h1>...",
    "text": "Merhaba {{user_name}}, hoş geldiniz...",
    "variables": ["user_name", "app_name", "login_url"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Email Şablon Türleri

| Tür | Açıklama |
|-----|----------|
| `welcome` | Hoş geldin emaili |
| `password_reset` | Şifre sıfırlama |
| `email_verification` | Email doğrulama |
| `notification` | Bildirim emaili |
| `marketing` | Pazarlama emaili |
| `invoice` | Fatura emaili |
| `receipt` | Makbuz emaili |

## Şablon Durumları

| Durum | Açıklama |
|-------|----------|
| `active` | Aktif şablon |
| `draft` | Taslak şablon |
| `archived` | Arşivlenmiş şablon |
| `disabled` | Devre dışı şablon |

## Değişkenler

### Sistem Değişkenleri
- `{{app_name}}` - Uygulama adı
- `{{app_url}}` - Uygulama URL'i
- `{{support_email}}` - Destek emaili
- `{{current_year}}` - Mevcut yıl

### Kullanıcı Değişkenleri
- `{{user_name}}` - Kullanıcı adı
- `{{user_email}}` - Kullanıcı emaili
- `{{user_id}}` - Kullanıcı ID'si

### Özel Değişkenler
- `{{reset_url}}` - Şifre sıfırlama linki
- `{{verification_url}}` - Email doğrulama linki
- `{{login_url}}` - Giriş linki
- `{{unsubscribe_url}}` - Abonelik iptal linki

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHORIZED` | Yetkilendirme gerekli |
| `TEMPLATE_NOT_FOUND` | Şablon bulunamadı |
| `TEMPLATE_CREATE_FAILED` | Şablon oluşturulamadı |
| `TEMPLATE_UPDATE_FAILED` | Şablon güncellenemedi |
| `TEMPLATE_DELETE_FAILED` | Şablon silinemedi |
| `INVALID_TEMPLATE_DATA` | Geçersiz şablon verisi |
| `TEMPLATE_VARIABLES_MISSING` | Şablon değişkenleri eksik |

## Güvenlik Notları

- Email şablonları hassas bilgiler içerebilir
- Sadece yetkili kullanıcılar erişebilir
- Şablon değişikliklerini loglayın
- HTML içeriğini güvenli hale getirin

## Email Şablon Yönetimi

```typescript
// Şablonları listele
const templates = await mailTemplates.list();

// Yeni şablon oluştur
const newTemplate = await mailTemplates.create({
  name: "Yeni Şablon",
  type: "notification",
  subject: "Bildirim",
  html: "<h1>Bildirim</h1>"
});

// Şablonu getir
const template = await mailTemplates.get('template_123');

// Şablonu güncelle
await mailTemplates.update('template_123', {
  subject: "Güncellenmiş Konu"
});

// Şablon önizlemesi
const preview = await mailTemplates.preview('template_123', {
  user_name: "Test Kullanıcı"
});

// Şablonu kopyala
const cloned = await mailTemplates.clone('template_123', {
  name: "Kopya Şablon"
});

// Şablonu sil
await mailTemplates.delete('template_123');
```
