# Changelog

ZAPI React Native SDK için tüm önemli değişiklikler bu dosyada dokümante edilmiştir.

Format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) standardına uygun olarak düzenlenmiştir.

## [1.0.0] - 2024-01-15

### Added
- İlk stabil sürüm yayınlandı
- 31 endpoint ile tam API kapsamı
- Tam TypeScript desteği
- Kapsamlı error handling
- Production-ready kod yapısı

### Endpoints
- **Authentication**: Login, register, OTP, email verification, password management
- **User Management**: Profile, avatar, usage stats, responses, metadata
- **Apps Management**: CRUD operations, statistics, metadata
- **API Keys**: Management, usage tracking, rotation, roles
- **AI Provider**: Provider management, model handling, testing
- **Content Management**: CRUD, categories, search, metadata
- **Images**: AI generation, editing, variations
- **Audio**: Text-to-speech, speech-to-text, translation
- **Notifications**: Email, SMS, bulk operations, analytics
- **Upload**: File upload, progress tracking, signed URLs
- **Admin**: System management, backups, health monitoring
- **Real-time**: Session management, chat operations
- **Metadata**: Generic metadata operations
- **Plans & Subscription**: Plan management, subscription handling
- **Roles & Permissions**: Role-based access control
- **Functions**: AI function management and execution
- **Responses**: AI response handling and analytics
- **Embeddings**: Text embedding generation
- **Debug**: Development and debugging tools
- **Docs**: Documentation access
- **Logs**: Logging and monitoring
- **Mail Templates**: Email template management
- **OAuth**: OAuth authentication flows
- **Firebase Auth**: Firebase authentication integration
- **Webhooks**: Webhook management and testing
- **System**: System operations and monitoring
- **Backup**: Backup and restore operations
- **Config**: Configuration management

### Features
- **Type Safety**: Tam TypeScript desteği ile type-safe API çağrıları
- **Error Handling**: Kapsamlı exception handling (ValidationException, AuthenticationException, RateLimitException, ServerException)
- **Rate Limiting**: Otomatik rate limit yönetimi
- **Retry Logic**: Başarısız istekler için otomatik retry mekanizması
- **Logging**: Detaylı logging desteği
- **Documentation**: Kapsamlı API dokümantasyonu ve örnekler
- **Testing**: Tam test coverage ile güvenilir kod

### Documentation
- **README.md**: Temel kullanım kılavuzu
- **API-REFERENCE.md**: Detaylı API referansı
- **EXAMPLES.md**: Pratik kullanım örnekleri
- **CHANGELOG.md**: Sürüm değişiklikleri

### Architecture
- **ZAPI Class**: Ana SDK sınıfı
- **BaseEndpoint**: Tüm endpoint'ler için base class
- **HttpClient**: HTTP istekleri için optimized client
- **Exception Classes**: Özelleştirilmiş exception sınıfları
- **Type Definitions**: Kapsamlı TypeScript tip tanımları

### Compatibility
- **React Native**: 0.60+ sürümleri desteklenir
- **TypeScript**: 4.0+ sürümleri desteklenir
- **Node.js**: 14+ sürümleri desteklenir

### Performance
- **Optimized HTTP Client**: Performanslı HTTP istekleri
- **Connection Pooling**: Bağlantı havuzu ile optimize edilmiş performans
- **Request Batching**: Toplu istek desteği
- **Caching**: Akıllı cache mekanizması

### Security
- **API Key Management**: Güvenli API key yönetimi
- **Token Refresh**: Otomatik token yenileme
- **Input Validation**: Kapsamlı input doğrulama
- **HTTPS Only**: Güvenli iletişim

---

## [Unreleased]

### Planned Features
- WebSocket desteği real-time işlemler için
- Offline mode desteği
- Advanced caching strategies
- Performance monitoring
- Advanced error recovery
- Plugin system for custom endpoints

### Planned Improvements
- Enhanced TypeScript types
- Better error messages
- Performance optimizations
- Additional test coverage
- Extended documentation

---

## Migration Guide

### From v0.x to v1.0.0

#### Breaking Changes
1. **Constructor Signature**: ZAPI constructor'ı değişti
   ```typescript
   // Old
   new ZAPI(config: ZAPIConfig)
   
   // New
   new ZAPI(apiKey: string, appId: string, baseUrl?: string, options?: any)
   ```

2. **Endpoint Initialization**: Endpoint'ler artık ZAPI instance alıyor
   ```typescript
   // Old
   new Auth(httpClient: HttpClient)
   
   // New
   new Auth(zapi: ZAPI)
   ```

3. **Method Signatures**: Bazı method imzaları PHP SDK ile uyumlu hale getirildi
   ```typescript
   // Old
   list(options?: ListOptions): Promise<PaginatedResponse>
   
   // New
   list(options?: any): Promise<ApiResponse>
   ```

4. **Property Names**: Bazı property isimleri değişti
   ```typescript
   // Old
   zapi.debug
   
   // New
   zapi.debugEndpoint
   ```

#### Migration Steps
1. Constructor çağrılarını güncelleyin
2. Method imzalarını kontrol edin
3. Property isimlerini güncelleyin
4. Return type'ları kontrol edin
5. Test'lerinizi çalıştırın

---

## Support

- **Documentation**: [docs.zapi.com](https://docs.zapi.com)
- **GitHub Issues**: [github.com/zapi/react-native-sdk/issues](https://github.com/zapi/react-native-sdk/issues)
- **Discord**: [discord.gg/zapi](https://discord.gg/zapi)
- **Email**: support@zapi.com

---

**ZAPI React Native SDK v1.0.0** - Production Ready ✅