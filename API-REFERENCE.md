# ZAPI React Native SDK - API Referansı

Bu dokümantasyon, ZAPI React Native SDK'nın tüm endpoint'lerini ve method'larını detaylı olarak açıklar.

## 📋 İçindekiler

1. [ZAPI Ana Sınıfı](#zapi-ana-sınıfı)
2. [Authentication Endpoint](#authentication-endpoint)
3. [User Endpoint](#user-endpoint)
4. [Apps Endpoint](#apps-endpoint)
5. [API Keys Endpoint](#api-keys-endpoint)
6. [AI Provider Endpoint](#ai-provider-endpoint)
7. [Content Endpoint](#content-endpoint)
8. [Images Endpoint](#images-endpoint)
9. [Audio Endpoint](#audio-endpoint)
10. [Notifications Endpoint](#notifications-endpoint)
11. [Upload Endpoint](#upload-endpoint)
12. [Admin Endpoint](#admin-endpoint)
13. [Diğer Endpoint'ler](#diğer-endpointler)

## 🔧 ZAPI Ana Sınıfı

### Constructor
```typescript
new ZAPI(apiKey: string, appId: string, baseUrl?: string, options?: any)
```

### Properties
- `public auth: Auth` - Authentication endpoint
- `public user: User` - User management endpoint
- `public apps: Apps` - Apps management endpoint
- `public apiKeys: APIKeys` - API Keys management endpoint
- `public aiProvider: AIProvider` - AI Provider management endpoint
- `public content: Content` - Content management endpoint
- `public images: Images` - Image processing endpoint
- `public audio: Audio` - Audio processing endpoint
- `public notifications: Notifications` - Notifications endpoint
- `public upload: Upload` - File upload endpoint
- `public admin: Admin` - Admin operations endpoint
- `public debugEndpoint: Debug` - Debug operations endpoint

### Methods
```typescript
getHttpClient(): HttpClient
setHttpClient(client: HttpClient): this
```

## 🔐 Authentication Endpoint

### Methods

#### `login(emailOrPhone: string, password: string, options?: any): Promise<ApiResponse>`
Kullanıcı girişi yapar.

**Parametreler:**
- `emailOrPhone`: Email adresi veya telefon numarası
- `password`: Şifre
- `options`: Opsiyonel parametreler (rememberMe, deviceInfo, etc.)

#### `register(data: any): Promise<ApiResponse>`
Yeni kullanıcı kaydı oluşturur.

**Parametreler:**
- `data`: Kayıt bilgileri (email, password, name, phone, etc.)

#### `sendVerification(email: string | null, phone: string | null, type: string): Promise<ApiResponse>`
Doğrulama kodu gönderir.

**Parametreler:**
- `email`: Email adresi (null olabilir)
- `phone`: Telefon numarası (null olabilir)
- `type`: Doğrulama türü ('email' veya 'phone')

#### `verifyEmail(token: string): Promise<ApiResponse>`
Email doğrulaması yapar.

**Parametreler:**
- `token`: Doğrulama token'ı

#### `verify(email: string | null, phone: string | null, code: string, type: string): Promise<ApiResponse>`
Genel doğrulama işlemi yapar.

**Parametreler:**
- `email`: Email adresi (null olabilir)
- `phone`: Telefon numarası (null olabilir)
- `code`: Doğrulama kodu
- `type`: Doğrulama türü

#### `requestPasswordReset(email: string): Promise<ApiResponse>`
Şifre sıfırlama isteği gönderir.

**Parametreler:**
- `email`: Email adresi

#### `resetPassword(code: string, newPassword: string): Promise<ApiResponse>`
Şifre sıfırlama işlemini tamamlar.

**Parametreler:**
- `code`: Sıfırlama kodu
- `newPassword`: Yeni şifre

#### `changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse>`
Mevcut şifreyi değiştirir.

**Parametreler:**
- `currentPassword`: Mevcut şifre
- `newPassword`: Yeni şifre

#### `sendOTP(phone: string, phonePrefix: string = '90', firstName: string = '', lastName: string = ''): Promise<ApiResponse>`
OTP kodu gönderir.

**Parametreler:**
- `phone`: Telefon numarası
- `phonePrefix`: Telefon ön eki (varsayılan: '90')
- `firstName`: Ad (opsiyonel)
- `lastName`: Soyad (opsiyonel)

#### `verifyOTP(phone: string, phonePrefix: string, otpCode: string): Promise<ApiResponse>`
OTP kodunu doğrular.

**Parametreler:**
- `phone`: Telefon numarası
- `phonePrefix`: Telefon ön eki
- `otpCode`: OTP kodu

#### `refreshToken(refreshToken: string): Promise<ApiResponse>`
Access token'ı yeniler.

**Parametreler:**
- `refreshToken`: Refresh token

#### `logout(): Promise<ApiResponse>`
Kullanıcı çıkışı yapar.

#### `verifyToken(token: string): Promise<ApiResponse>`
JWT token doğrulama işlemi yapar.

**Parametreler:**
- `token`: Doğrulanacak JWT token

#### `healthCheck(): Promise<ApiResponse>`
Authentication servisinin sağlık durumunu kontrol eder.

## 👤 User Endpoint

### Methods

#### `getProfile(): Promise<ApiResponse>`
Kullanıcı profil bilgilerini getirir.

#### `updateProfile(data: any): Promise<ApiResponse>`
Kullanıcı profil bilgilerini günceller.

**Parametreler:**
- `data`: Güncellenecek profil bilgileri

#### `uploadAvatar(filePath: string): Promise<ApiResponse>`
Kullanıcı avatar'ını yükler.

**Parametreler:**
- `filePath`: Avatar dosyasının yolu

#### `deleteAvatar(): Promise<ApiResponse>`
Kullanıcı avatar'ını siler.

#### `getUsage(): Promise<ApiResponse>`
Kullanıcının API kullanım istatistiklerini getirir.

#### `getResponses(options?: any): Promise<ApiResponse>`
Kullanıcının AI response'larını listeler.

**Parametreler:**
- `options`: Listeleme seçenekleri (page, limit, sort, etc.)

#### `getResponse(responseId: string): Promise<ApiResponse>`
Belirli bir response'u getirir.

**Parametreler:**
- `responseId`: Response ID'si

#### `deleteResponse(responseId: string): Promise<ApiResponse>`
Belirli bir response'u siler.

**Parametreler:**
- `responseId`: Response ID'si

#### `exportResponse(responseId: string, format?: string): Promise<ApiResponse>`
Response'u belirtilen formatta export eder.

**Parametreler:**
- `responseId`: Response ID'si
- `format`: Export formatı ('json', 'txt', 'markdown', 'pdf')

#### `getLastResponse(): Promise<ApiResponse>`
Kullanıcının son response'unu getirir.

#### `deactivateAccount(reason?: string): Promise<ApiResponse>`
Kullanıcı hesabını deaktif eder.

**Parametreler:**
- `reason`: Deaktivasyon sebebi

#### `deleteAccount(password: string): Promise<ApiResponse>`
Kullanıcı hesabını siler.

**Parametreler:**
- `password`: Mevcut şifre

#### `getMetadata(path?: string): Promise<ApiResponse>`
Kullanıcı metadata'sını getirir.

**Parametreler:**
- `path`: Metadata path'i

#### `updateMetadata(path: string, value: any): Promise<ApiResponse>`
Kullanıcı metadata'sını günceller.

**Parametreler:**
- `path`: Metadata path'i
- `value`: Yeni değer

#### `patchMetadata(path: string, value: any): Promise<ApiResponse>`
Kullanıcı metadata'sını kısmi olarak günceller.

**Parametreler:**
- `path`: Metadata path'i
- `value`: Güncellenecek değer

#### `deleteMetadata(path: string): Promise<ApiResponse>`
Kullanıcı metadata'sını siler.

**Parametreler:**
- `path`: Metadata path'i

## 📱 Apps Endpoint

### Methods

#### `list(options?: any): Promise<ApiResponse>`
Uygulamaları listeler.

**Parametreler:**
- `options`: Listeleme seçenekleri (page, limit, status, etc.)

#### `create(data: any): Promise<ApiResponse>`
Yeni uygulama oluşturur.

**Parametreler:**
- `data`: Uygulama bilgileri

#### `get(appId: string): Promise<ApiResponse>`
Uygulama detaylarını getirir.

**Parametreler:**
- `appId`: Uygulama ID'si

#### `update(appId: string, data: any): Promise<ApiResponse>`
Uygulama bilgilerini günceller.

**Parametreler:**
- `appId`: Uygulama ID'si
- `data`: Güncellenecek bilgiler

#### `delete(appId: string): Promise<ApiResponse>`
Uygulamayı siler.

**Parametreler:**
- `appId`: Uygulama ID'si

#### `getStats(options?: any): Promise<ApiResponse>`
Genel uygulama istatistiklerini getirir.

**Parametreler:**
- `options`: İstatistik seçenekleri

#### `getAppStats(appId: string, options?: any): Promise<ApiResponse>`
Belirli uygulama istatistiklerini getirir.

**Parametreler:**
- `appId`: Uygulama ID'si
- `options`: İstatistik seçenekleri

#### `resetUsage(appId: string): Promise<ApiResponse>`
Uygulama kullanımını sıfırlar.

**Parametreler:**
- `appId`: Uygulama ID'si

#### `toggleStatus(appId: string): Promise<ApiResponse>`
Uygulama durumunu değiştirir.

**Parametreler:**
- `appId`: Uygulama ID'si

#### `getMetadata(appId: string, path?: string): Promise<ApiResponse>`
Uygulama metadata'sını getirir.

**Parametreler:**
- `appId`: Uygulama ID'si
- `path`: Metadata path'i

#### `updateMetadata(appId: string, path: string, value: any): Promise<ApiResponse>`
Uygulama metadata'sını günceller.

**Parametreler:**
- `appId`: Uygulama ID'si
- `path`: Metadata path'i
- `value`: Yeni değer

#### `patchMetadata(appId: string, path: string, value: any): Promise<ApiResponse>`
Uygulama metadata'sını kısmi olarak günceller.

**Parametreler:**
- `appId`: Uygulama ID'si
- `path`: Metadata path'i
- `value`: Güncellenecek değer

#### `deleteMetadata(appId: string, path: string): Promise<ApiResponse>`
Uygulama metadata'sını siler.

**Parametreler:**
- `appId`: Uygulama ID'si
- `path`: Metadata path'i

## 🔑 API Keys Endpoint

### Methods

#### `list(options?: any): Promise<ApiResponse>`
API anahtarlarını listeler.

**Parametreler:**
- `options`: Listeleme seçenekleri

#### `create(data: any): Promise<ApiResponse>`
Yeni API anahtarı oluşturur.

**Parametreler:**
- `data`: API anahtarı bilgileri

#### `get(keyId: string): Promise<ApiResponse>`
API anahtarı detaylarını getirir.

**Parametreler:**
- `keyId`: API anahtarı ID'si

#### `update(keyId: string, data: any): Promise<ApiResponse>`
API anahtarı bilgilerini günceller.

**Parametreler:**
- `keyId`: API anahtarı ID'si
- `data`: Güncellenecek bilgiler

#### `delete(keyId: string): Promise<ApiResponse>`
API anahtarını siler.

**Parametreler:**
- `keyId`: API anahtarı ID'si

#### `getUsage(keyId: string): Promise<ApiResponse>`
API anahtarı kullanım bilgilerini getirir.

**Parametreler:**
- `keyId`: API anahtarı ID'si

#### `getAvailableRoles(): Promise<ApiResponse>`
Mevcut rolleri getirir.

#### `rotate(keyId: string): Promise<ApiResponse>`
API anahtarını döndürür.

**Parametreler:**
- `keyId`: API anahtarı ID'si

#### `lookup(apiKey: string): Promise<ApiResponse>`
API anahtarı bilgilerini lookup yapar.

**Parametreler:**
- `apiKey`: API anahtarı string'i

#### `toggleStatus(keyId: string): Promise<ApiResponse>`
API anahtarı durumunu değiştirir.

**Parametreler:**
- `keyId`: API anahtarı ID'si

## 🎯 AI Provider Endpoint

### Methods

#### `list(options?: any): Promise<ApiResponse>`
AI sağlayıcılarını listeler.

**Parametreler:**
- `options`: Listeleme seçenekleri

#### `create(data: any): Promise<ApiResponse>`
Yeni AI sağlayıcı oluşturur.

**Parametreler:**
- `data`: AI sağlayıcı bilgileri

#### `get(providerId: string): Promise<ApiResponse>`
AI sağlayıcı detaylarını getirir.

**Parametreler:**
- `providerId`: AI sağlayıcı ID'si

#### `update(providerId: string, data: any): Promise<ApiResponse>`
AI sağlayıcı bilgilerini günceller.

**Parametreler:**
- `providerId`: AI sağlayıcı ID'si
- `data`: Güncellenecek bilgiler

#### `delete(providerId: string): Promise<ApiResponse>`
AI sağlayıcıyı siler.

**Parametreler:**
- `providerId`: AI sağlayıcı ID'si

#### `test(providerId: string): Promise<ApiResponse>`
AI sağlayıcıyı test eder.

**Parametreler:**
- `providerId`: AI sağlayıcı ID'si

#### `getModels(options?: any): Promise<ApiResponse>`
AI modellerini listeler.

**Parametreler:**
- `options`: Listeleme seçenekleri

#### `getModel(modelId: string): Promise<ApiResponse>`
AI model detaylarını getirir.

**Parametreler:**
- `modelId`: AI model ID'si

#### `updateModel(modelId: string, data: any): Promise<ApiResponse>`
AI model bilgilerini günceller.

**Parametreler:**
- `modelId`: AI model ID'si
- `data`: Güncellenecek bilgiler

#### `deleteModel(modelId: string): Promise<ApiResponse>`
AI modeli siler.

**Parametreler:**
- `modelId`: AI model ID'si

#### `getDefaultModels(): Promise<ApiResponse>`
Varsayılan modelleri getirir.

## 📝 Content Endpoint

### Methods

#### `list(options?: any): Promise<ApiResponse>`
İçerikleri listeler.

**Parametreler:**
- `options`: Listeleme seçenekleri

#### `create(data: any): Promise<ApiResponse>`
Yeni içerik oluşturur.

**Parametreler:**
- `data`: İçerik bilgileri

#### `get(contentId: string): Promise<ApiResponse>`
İçerik detaylarını getirir.

**Parametreler:**
- `contentId`: İçerik ID'si

#### `update(contentId: string, data: any): Promise<ApiResponse>`
İçerik bilgilerini günceller.

**Parametreler:**
- `contentId`: İçerik ID'si
- `data`: Güncellenecek bilgiler

#### `delete(contentId: string): Promise<ApiResponse>`
İçeriği siler.

**Parametreler:**
- `contentId`: İçerik ID'si

#### `getCategories(): Promise<ApiResponse>`
İçerik kategorilerini getirir.

#### `getTypes(): Promise<ApiResponse>`
İçerik türlerini getirir.

#### `getLanguages(): Promise<ApiResponse>`
Desteklenen dilleri getirir.

#### `searchAdvanced(options: any): Promise<ApiResponse>`
Gelişmiş içerik arama yapar.

**Parametreler:**
- `options`: Arama seçenekleri

#### `getStats(): Promise<ApiResponse>`
İçerik istatistiklerini getirir.

#### `getMetadata(contentId: string, path?: string): Promise<ApiResponse>`
İçerik metadata'sını getirir.

**Parametreler:**
- `contentId`: İçerik ID'si
- `path`: Metadata path'i

#### `updateMetadata(contentId: string, path: string, value: any): Promise<ApiResponse>`
İçerik metadata'sını günceller.

**Parametreler:**
- `contentId`: İçerik ID'si
- `path`: Metadata path'i
- `value`: Yeni değer

#### `patchMetadata(contentId: string, path: string, value: any): Promise<ApiResponse>`
İçerik metadata'sını kısmi olarak günceller.

**Parametreler:**
- `contentId`: İçerik ID'si
- `path`: Metadata path'i
- `value`: Güncellenecek değer

#### `deleteMetadata(contentId: string, path: string): Promise<ApiResponse>`
İçerik metadata'sını siler.

**Parametreler:**
- `contentId`: İçerik ID'si
- `path`: Metadata path'i

#### `getPublic(slug: string): Promise<ApiResponse>`
Public içeriği getirir.

**Parametreler:**
- `slug`: İçerik slug'ı

## 🎨 Images Endpoint

### Methods

#### `generate(prompt: string, options?: any): Promise<ApiResponse>`
AI ile resim oluşturur.

**Parametreler:**
- `prompt`: Resim açıklaması
- `options`: Oluşturma seçenekleri (size, quality, style, etc.)

#### `edit(imagePath: string, prompt: string, options?: any): Promise<ApiResponse>`
Mevcut resmi düzenler.

**Parametreler:**
- `imagePath`: Resim dosyasının yolu
- `prompt`: Düzenleme açıklaması
- `options`: Düzenleme seçenekleri

#### `createVariations(imagePath: string, options?: any): Promise<ApiResponse>`
Resim varyasyonları oluşturur.

**Parametreler:**
- `imagePath`: Resim dosyasının yolu
- `options`: Varyasyon seçenekleri

## 🎵 Audio Endpoint

### Methods

#### `textToSpeech(text: string, voice?: string, options?: any): Promise<ApiResponse>`
Metni sese çevirir.

**Parametreler:**
- `text`: Dönüştürülecek metin
- `voice`: Ses türü ('alloy', 'echo', 'fable', etc.)
- `options`: Dönüştürme seçenekleri

#### `speechToText(filePath: string, options?: any): Promise<ApiResponse>`
Sesi metne çevirir.

**Parametreler:**
- `filePath`: Ses dosyasının yolu
- `options`: Çeviri seçenekleri

#### `translateAudio(filePath: string, targetLanguage: string, options?: any): Promise<ApiResponse>`
Ses dosyasını çevirir.

**Parametreler:**
- `filePath`: Ses dosyasının yolu
- `targetLanguage`: Hedef dil
- `options`: Çeviri seçenekleri

## 🔔 Notifications Endpoint

### Methods

#### `list(options?: any): Promise<ApiResponse>`
Bildirim loglarını listeler.

**Parametreler:**
- `options`: Listeleme seçenekleri

#### `sendEmail(data: any): Promise<ApiResponse>`
Email bildirimi gönderir.

**Parametreler:**
- `data`: Email bilgileri

#### `sendBulkEmail(data: any): Promise<ApiResponse>`
Toplu email bildirimi gönderir.

**Parametreler:**
- `data`: Toplu email bilgileri

#### `sendSMS(data: any): Promise<ApiResponse>`
SMS bildirimi gönderir.

**Parametreler:**
- `data`: SMS bilgileri

#### `sendBulkSMS(data: any): Promise<ApiResponse>`
Toplu SMS bildirimi gönderir.

**Parametreler:**
- `data`: Toplu SMS bilgileri

#### `getLog(logId: string): Promise<ApiResponse>`
Bildirim log detaylarını getirir.

**Parametreler:**
- `logId`: Log ID'si

#### `getAnalytics(options?: any): Promise<ApiResponse>`
Bildirim analitiğini getirir.

**Parametreler:**
- `options`: Analitik seçenekleri

#### `retry(logId: string): Promise<ApiResponse>`
Başarısız bildirimi yeniden dener.

**Parametreler:**
- `logId`: Log ID'si

#### `getSettings(): Promise<ApiResponse>`
Bildirim ayarlarını getirir.

#### `updateSettings(data: any): Promise<ApiResponse>`
Bildirim ayarlarını günceller.

**Parametreler:**
- `data`: Yeni ayarlar

#### `trackEmail(trackingId: string): Promise<ApiResponse>`
Email takibi yapar.

**Parametreler:**
- `trackingId`: Takip ID'si

#### `track(logId: string): Promise<ApiResponse>`
Log takibi yapar.

**Parametreler:**
- `logId`: Log ID'si

## 📁 Upload Endpoint

### Methods

#### `upload(filePath: string, options?: any): Promise<ApiResponse>`
Dosya yükler.

**Parametreler:**
- `filePath`: Dosya yolu
- `options`: Yükleme seçenekleri

#### `list(options?: any): Promise<ApiResponse>`
Yüklenen dosyaları listeler.

**Parametreler:**
- `options`: Listeleme seçenekleri

#### `get(fileId: string): Promise<ApiResponse>`
Dosya detaylarını getirir.

**Parametreler:**
- `fileId`: Dosya ID'si

#### `delete(fileId: string): Promise<ApiResponse>`
Dosyayı siler.

**Parametreler:**
- `fileId`: Dosya ID'si

#### `getStats(): Promise<ApiResponse>`
Upload istatistiklerini getirir.

#### `cleanup(): Promise<ApiResponse>`
Eski dosyaları temizler.

#### `getProgress(uploadId: string): Promise<ApiResponse>`
Upload ilerlemesini getirir.

**Parametreler:**
- `uploadId`: Upload ID'si

#### `getAllProgress(): Promise<ApiResponse>`
Tüm upload ilerlemelerini getirir.

#### `createSignedUrl(fileId: string, options?: any): Promise<ApiResponse>`
Signed URL oluşturur.

**Parametreler:**
- `fileId`: Dosya ID'si
- `options`: URL seçenekleri

## 🛠️ Admin Endpoint

### Methods

#### `getDashboard(): Promise<ApiResponse>`
Admin dashboard bilgilerini getirir.

#### `getQueue(): Promise<ApiResponse>`
Sistem kuyruğu durumunu getirir.

#### `getCrons(): Promise<ApiResponse>`
Cron işlerini listeler.

#### `triggerCron(cronName: string): Promise<ApiResponse>`
Belirli cron işini tetikler.

**Parametreler:**
- `cronName`: Cron işi adı

#### `triggerMonthlyReset(): Promise<ApiResponse>`
Aylık sıfırlama işlemini tetikler.

#### `getHealth(): Promise<ApiResponse>`
Sistem sağlık durumunu getirir.

#### `getMetrics(): Promise<ApiResponse>`
Sistem metriklerini getirir.

#### `clearCache(type?: string): Promise<ApiResponse>`
Cache temizleme yapar.

**Parametreler:**
- `type`: Cache türü ('all', 'user', 'system')

#### `createBackup(options?: any): Promise<ApiResponse>`
Sistem backup'ı oluşturur.

**Parametreler:**
- `options`: Backup seçenekleri

#### `restoreBackup(backupId: string): Promise<ApiResponse>`
Backup geri yükler.

**Parametreler:**
- `backupId`: Backup ID'si

## 🔧 Diğer Endpoint'ler

### Backup Endpoint
- `list(options?: any): Promise<ApiResponse>`
- `get(backupId: string): Promise<ApiResponse>`
- `delete(backupId: string): Promise<ApiResponse>`
- `getRecordBackups(model: string, recordId: string): Promise<ApiResponse>`

### Config Endpoint
- `get(): Promise<ApiResponse>`

### Debug Endpoint
- `getModels(): Promise<ApiResponse>`
- `getProviderManager(): Promise<ApiResponse>`

### Docs Endpoint
- `list(): Promise<ApiResponse>`
- `get(filename: string): Promise<ApiResponse>`

### Embeddings Endpoint
- `create(input: string | string[], model?: string, options?: any): Promise<ApiResponse>`

### Functions Endpoint
- `list(options?: any): Promise<ApiResponse>`
- `create(data: any): Promise<ApiResponse>`
- `get(functionId: string): Promise<ApiResponse>`
- `update(functionId: string, data: any): Promise<ApiResponse>`
- `delete(functionId: string): Promise<ApiResponse>`
- `execute(functionId: string, data?: any): Promise<ApiResponse>`
- `test(functionId: string, data?: any): Promise<ApiResponse>`

### Info Endpoint
- `getHealth(): Promise<ApiResponse>`
- `getMetrics(): Promise<ApiResponse>`
- `getStatus(): Promise<ApiResponse>`
- `getAIModels(): Promise<ApiResponse>`

### Logs Endpoint
- `list(options?: any): Promise<ApiResponse>`
- `get(logId: string): Promise<ApiResponse>`
- `getStats(): Promise<ApiResponse>`
- `cleanup(options?: any): Promise<ApiResponse>`
- `clear(): Promise<ApiResponse>`

### MailTemplates Endpoint
- `list(options?: any): Promise<ApiResponse>`
- `create(data: any): Promise<ApiResponse>`
- `get(templateId: string): Promise<ApiResponse>`
- `update(templateId: string, data: any): Promise<ApiResponse>`
- `delete(templateId: string): Promise<ApiResponse>`
- `toggleStatus(templateId: string): Promise<ApiResponse>`
- `preview(templateId: string, variables?: any): Promise<ApiResponse>`
- `clone(templateId: string, data?: any): Promise<ApiResponse>`

### Metadata Endpoint
- `get(entityType: string, entityId: string, path?: string): Promise<ApiResponse>`
- `update(entityType: string, entityId: string, path: string, value: any): Promise<ApiResponse>`
- `patch(entityType: string, entityId: string, path: string, value: any): Promise<ApiResponse>`
- `delete(entityType: string, entityId: string, path: string): Promise<ApiResponse>`

### OAuthMetadata Endpoint
- `get(appId: string, path?: string): Promise<ApiResponse>`
- `update(appId: string, path: string, value: any): Promise<ApiResponse>`
- `patch(appId: string, path: string, value: any): Promise<ApiResponse>`
- `delete(appId: string, path: string): Promise<ApiResponse>`

### Plans Endpoint
- `list(options?: any): Promise<ApiResponse>`
- `compare(planIds: string[]): Promise<ApiResponse>`
- `create(data: any): Promise<ApiResponse>`
- `get(planId: string): Promise<ApiResponse>`
- `update(planId: string, data: any): Promise<ApiResponse>`
- `delete(planId: string): Promise<ApiResponse>`
- `toggleStatus(planId: string): Promise<ApiResponse>`
- `getSubscribers(planId: string, options?: any): Promise<ApiResponse>`
- `getAnalytics(planId: string, options?: any): Promise<ApiResponse>`
- `getMetadata(planId: string, path?: string): Promise<ApiResponse>`
- `updateMetadata(planId: string, path: string, value: any): Promise<ApiResponse>`
- `patchMetadata(planId: string, path: string, value: any): Promise<ApiResponse>`
- `deleteMetadata(planId: string, path: string): Promise<ApiResponse>`

### Realtime Endpoint
- `getSessions(options?: any): Promise<ApiResponse>`
- `resumeSession(sessionId: string): Promise<ApiResponse>`
- `getSessionHistory(sessionId: string, options?: any): Promise<ApiResponse>`
- `createSession(data: any): Promise<ApiResponse>`
- `getSession(sessionId: string): Promise<ApiResponse>`
- `deleteSession(sessionId: string): Promise<ApiResponse>`
- `getModels(): Promise<ApiResponse>`
- `getStreamInfo(): Promise<ApiResponse>`
- `getStats(): Promise<ApiResponse>`

### Responses Endpoint
- `create(data: any): Promise<ApiResponse>`
- `list(options?: any): Promise<ApiResponse>`
- `get(responseId: string): Promise<ApiResponse>`
- `update(responseId: string, data: any): Promise<ApiResponse>`
- `delete(responseId: string): Promise<ApiResponse>`
- `export(responseId: string, format?: string): Promise<ApiResponse>`
- `getStats(options?: any): Promise<ApiResponse>`
- `search(options: any): Promise<ApiResponse>`
- `getCategories(): Promise<ApiResponse>`
- `getTags(): Promise<ApiResponse>`
- `toggleFavorite(responseId: string): Promise<ApiResponse>`
- `share(responseId: string, options?: any): Promise<ApiResponse>`

### Roles Endpoint
- `list(options?: any): Promise<ApiResponse>`
- `create(data: any): Promise<ApiResponse>`
- `get(roleId: string): Promise<ApiResponse>`
- `update(roleId: string, data: any): Promise<ApiResponse>`
- `delete(roleId: string): Promise<ApiResponse>`
- `getUsers(roleId: string, options?: any): Promise<ApiResponse>`
- `getAvailablePermissions(): Promise<ApiResponse>`
- `getAnalytics(): Promise<ApiResponse>`

### Subscription Endpoint
- `create(data: any): Promise<ApiResponse>`
- `cancel(reason?: string): Promise<ApiResponse>`
- `renew(data?: any): Promise<ApiResponse>`
- `getAnalytics(options?: any): Promise<ApiResponse>`
- `getDetails(): Promise<ApiResponse>`
- `checkUpgrade(): Promise<ApiResponse>`

### System Endpoint
- `restart(): Promise<ApiResponse>`
- `getStatus(): Promise<ApiResponse>`
- `getMemory(): Promise<ApiResponse>`

### Webhook Endpoint
- `list(options?: any): Promise<ApiResponse>`
- `create(data: any): Promise<ApiResponse>`
- `get(webhookId: string): Promise<ApiResponse>`
- `update(webhookId: string, data: any): Promise<ApiResponse>`
- `delete(webhookId: string): Promise<ApiResponse>`
- `test(webhookId: string): Promise<ApiResponse>`

### AuthFirebase Endpoint
- `loginWithGoogle(firebaseToken: string, options?: any): Promise<ApiResponse>`
- `loginWithApple(firebaseToken: string, options?: any): Promise<ApiResponse>`
- `refreshToken(refreshToken: string): Promise<ApiResponse>`
- `updateProfile(data: any): Promise<ApiResponse>`
- `logout(): Promise<ApiResponse>`
- `getSDKStatus(): Promise<ApiResponse>`
- `getDebugInfo(): Promise<ApiResponse>`
- `healthCheck(): Promise<ApiResponse>`

### AuthOAuth Endpoint
- `initiateGoogleLogin(appId: string, options?: any): Promise<ApiResponse>`
- `initiateAppleLogin(appId: string, options?: any): Promise<ApiResponse>`
- `handleGoogleCallback(code: string, state: string, options?: any): Promise<ApiResponse>`
- `handleAppleCallback(code: string, state: string, options?: any): Promise<ApiResponse>`
- `linkAccount(provider: string, accessToken: string, options?: any): Promise<ApiResponse>`
- `unlinkAccount(provider: string): Promise<ApiResponse>`
- `getSuccessPage(options?: any): Promise<ApiResponse>`
- `getErrorPage(options?: any): Promise<ApiResponse>`
- `sandboxTest(provider: string): Promise<ApiResponse>`
- `getDebugInfo(provider: string): Promise<ApiResponse>`
- `getMetadata(appId: string, path?: string): Promise<ApiResponse>`
- `updateMetadata(appId: string, path: string, value: any): Promise<ApiResponse>`
- `patchMetadata(appId: string, path: string, value: any): Promise<ApiResponse>`
- `deleteMetadata(appId: string, path: string): Promise<ApiResponse>`

## 📊 Response Format

Tüm API çağrıları aşağıdaki format'ta response döndürür:

```typescript
interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
```

## ⚠️ Error Handling

SDK aşağıdaki exception sınıflarını sağlar:

- `ZAPIException`: Genel API hatası
- `ValidationException`: Doğrulama hatası
- `AuthenticationException`: Kimlik doğrulama hatası
- `RateLimitException`: Rate limit aşımı hatası
- `ServerException`: Sunucu hatası

Her exception aşağıdaki özelliklere sahiptir:
- `message`: Hata mesajı
- `code`: Hata kodu (varsa)
- `retryAfter`: Yeniden deneme süresi (RateLimitException için)

---

**ZAPI React Native SDK v1.0.0** - API Referansı ✅
