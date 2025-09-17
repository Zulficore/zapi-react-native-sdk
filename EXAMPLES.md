# ZAPI React Native SDK - Örnekler

Bu dosya, ZAPI React Native SDK'nın kullanımına dair pratik örnekler içerir.

## 🔐 Authentication Örnekleri

### Basit Login
```typescript
import { ZAPI } from '@zapi/react-native-sdk';

const zapi = new ZAPI('your-api-key', 'your-app-id');

async function loginUser() {
  try {
    const result = await zapi.auth.login('user@example.com', 'password');
    if (result.success) {
      console.log('Login successful:', result.data);
    }
  } catch (error) {
    console.error('Login failed:', error.message);
  }
}
```

### OTP ile Doğrulama
```typescript
async function verifyWithOTP() {
  try {
    // OTP gönder
    await zapi.auth.sendOTP('+905551234567', 'verification');
    
    // Kullanıcıdan kodu al
    const userCode = '123456'; // UI'dan alınacak
    
    // OTP doğrula
    const result = await zapi.auth.verifyOTP('+905551234567', userCode, 'verification');
    
    if (result.success) {
      console.log('OTP verified successfully');
    }
  } catch (error) {
    console.error('OTP verification failed:', error.message);
  }
}
```

## 👤 User Management Örnekleri

### Profil Güncelleme
```typescript
async function updateUserProfile() {
  try {
    const result = await zapi.user.updateProfile({
      name: 'John Doe',
      bio: 'Software Developer',
      website: 'https://johndoe.com',
      location: 'Istanbul, Turkey'
    });
    
    if (result.success) {
      console.log('Profile updated:', result.data);
    }
  } catch (error) {
    console.error('Profile update failed:', error.message);
  }
}
```

### Avatar Yükleme
```typescript
async function uploadAvatar(imagePath: string) {
  try {
    const result = await zapi.user.uploadAvatar(imagePath);
    
    if (result.success) {
      console.log('Avatar uploaded:', result.data.url);
    }
  } catch (error) {
    console.error('Avatar upload failed:', error.message);
  }
}
```

## 🤖 AI İşlemleri Örnekleri

### AI Response Oluşturma
```typescript
async function generateAIResponse() {
  try {
    const result = await zapi.responses.create({
      prompt: 'Explain quantum computing in simple terms',
      model: 'gpt-4',
      parameters: {
        temperature: 0.7,
        maxTokens: 1000,
        topP: 1.0
      }
    });
    
    if (result.success) {
      console.log('AI Response:', result.data.response);
    }
  } catch (error) {
    console.error('AI generation failed:', error.message);
  }
}
```

### Resim Oluşturma
```typescript
async function generateImage() {
  try {
    const result = await zapi.images.generate(
      'A beautiful sunset over mountains with a lake in the foreground',
      {
        size: '1024x1024',
        quality: 'hd',
        style: 'photographic',
        n: 1
      }
    );
    
    if (result.success) {
      console.log('Generated image URL:', result.data.url);
    }
  } catch (error) {
    console.error('Image generation failed:', error.message);
  }
}
```

### Ses İşleme
```typescript
async function textToSpeech() {
  try {
    const result = await zapi.audio.textToSpeech(
      'Merhaba, bu bir test mesajıdır. ZAPI SDK ile ses oluşturuyoruz.',
      'alloy',
      {
        format: 'mp3',
        speed: 1.0,
        response_format: 'url'
      }
    );
    
    if (result.success) {
      console.log('Audio URL:', result.data.audio_url);
    }
  } catch (error) {
    console.error('Text to speech failed:', error.message);
  }
}
```

## 📁 File Upload Örnekleri

### Basit Dosya Yükleme
```typescript
async function uploadFile(filePath: string) {
  try {
    const result = await zapi.upload.upload(filePath, {
      folder: 'user-documents',
      public: false,
      maxSize: '10MB'
    });
    
    if (result.success) {
      console.log('File uploaded:', result.data);
    }
  } catch (error) {
    console.error('File upload failed:', error.message);
  }
}
```

### Upload İlerlemesi Takibi
```typescript
async function uploadWithProgress(filePath: string) {
  try {
    const uploadResult = await zapi.upload.upload(filePath, {
      folder: 'videos',
      public: true
    });
    
    if (uploadResult.success) {
      const uploadId = uploadResult.data.uploadId;
      
      // İlerleme takibi
      const checkProgress = setInterval(async () => {
        try {
          const progress = await zapi.upload.getProgress(uploadId);
          console.log('Upload progress:', progress.data.percentage);
          
          if (progress.data.status === 'completed') {
            clearInterval(checkProgress);
            console.log('Upload completed:', progress.data.fileId);
          }
        } catch (error) {
          clearInterval(checkProgress);
          console.error('Progress check failed:', error.message);
        }
      }, 1000);
    }
  } catch (error) {
    console.error('Upload failed:', error.message);
  }
}
```

## 🔔 Notification Örnekleri

### Email Gönderme
```typescript
async function sendWelcomeEmail(userEmail: string, userName: string) {
  try {
    const result = await zapi.notifications.sendEmail({
      to: userEmail,
      subject: 'Welcome to Our App!',
      template: 'welcome',
      variables: {
        userName: userName,
        appName: 'My Awesome App',
        loginUrl: 'https://app.com/login'
      }
    });
    
    if (result.success) {
      console.log('Welcome email sent:', result.data.messageId);
    }
  } catch (error) {
    console.error('Email sending failed:', error.message);
  }
}
```

### SMS Gönderme
```typescript
async function sendVerificationSMS(phoneNumber: string, code: string) {
  try {
    const result = await zapi.notifications.sendSMS({
      to: phoneNumber,
      message: `Your verification code is: ${code}. This code will expire in 10 minutes.`,
      template: 'verification'
    });
    
    if (result.success) {
      console.log('SMS sent:', result.data.messageId);
    }
  } catch (error) {
    console.error('SMS sending failed:', error.message);
  }
}
```

## 📊 Analytics Örnekleri

### Kullanım İstatistikleri
```typescript
async function getUserAnalytics() {
  try {
    // Kullanıcı kullanım bilgileri
    const usage = await zapi.user.getUsage();
    
    // App istatistikleri
    const appStats = await zapi.apps.getAppStats('your-app-id', {
      period: '30d',
      dateFrom: '2024-01-01',
      dateTo: '2024-01-31'
    });
    
    // Bildirim analitiği
    const notificationAnalytics = await zapi.notifications.getAnalytics({
      period: '7d',
      type: 'email'
    });
    
    console.log('Usage:', usage.data);
    console.log('App Stats:', appStats.data);
    console.log('Notification Analytics:', notificationAnalytics.data);
  } catch (error) {
    console.error('Analytics fetch failed:', error.message);
  }
}
```

## 🔧 Admin İşlemleri Örnekleri

### Sistem Durumu Kontrolü
```typescript
async function checkSystemHealth() {
  try {
    const health = await zapi.admin.getHealth();
    const metrics = await zapi.admin.getMetrics();
    const queue = await zapi.admin.getQueue();
    
    console.log('System Health:', health.data);
    console.log('System Metrics:', metrics.data);
    console.log('Queue Status:', queue.data);
  } catch (error) {
    console.error('System check failed:', error.message);
  }
}
```

### Backup İşlemleri
```typescript
async function createSystemBackup() {
  try {
    const backup = await zapi.admin.createBackup({
      type: 'full',
      includeFiles: true,
      compress: true,
      description: 'Daily automated backup'
    });
    
    if (backup.success) {
      console.log('Backup created:', backup.data.backupId);
      
      // Backup listesini kontrol et
      const backups = await zapi.backup.list({
        page: 1,
        limit: 10
      });
      
      console.log('Recent backups:', backups.data);
    }
  } catch (error) {
    console.error('Backup creation failed:', error.message);
  }
}
```

## 🔄 Real-time İşlemler Örnekleri

### Chat Session Oluşturma
```typescript
async function createChatSession() {
  try {
    const session = await zapi.realtime.createSession({
      type: 'chat',
      model: 'gpt-4',
      settings: {
        temperature: 0.7,
        maxTokens: 1000,
        systemMessage: 'You are a helpful assistant.'
      }
    });
    
    if (session.success) {
      console.log('Chat session created:', session.data.sessionId);
      
      // Session geçmişini kontrol et
      const history = await zapi.realtime.getSessionHistory(session.data.sessionId, {
        page: 1,
        limit: 50
      });
      
      console.log('Session history:', history.data);
    }
  } catch (error) {
    console.error('Session creation failed:', error.message);
  }
}
```

## 🏷️ Metadata İşlemleri Örnekleri

### Kullanıcı Tercihleri
```typescript
async function manageUserPreferences() {
  try {
    // Kullanıcı tercihlerini güncelle
    await zapi.user.updateMetadata('preferences', {
      theme: 'dark',
      language: 'tr',
      notifications: {
        email: true,
        push: false,
        sms: false
      },
      privacy: {
        profilePublic: false,
        showOnlineStatus: true
      }
    });
    
    // Tercihleri getir
    const preferences = await zapi.user.getMetadata('preferences');
    console.log('User preferences:', preferences.data);
    
    // Belirli bir tercihi güncelle
    await zapi.user.patchMetadata('preferences', {
      theme: 'light'
    });
    
  } catch (error) {
    console.error('Preferences management failed:', error.message);
  }
}
```

## 🔑 API Key Yönetimi Örnekleri

### API Key Oluşturma ve Yönetimi
```typescript
async function manageAPIKeys() {
  try {
    // Yeni API key oluştur
    const newKey = await zapi.apiKeys.create({
      name: 'Mobile App Key',
      description: 'API key for mobile application',
      permissions: ['read', 'write'],
      expiresAt: '2024-12-31',
      allowedIPs: ['192.168.1.0/24']
    });
    
    if (newKey.success) {
      console.log('API key created:', newKey.data);
      
      // API key'leri listele
      const keys = await zapi.apiKeys.list({
        page: 1,
        limit: 10,
        status: 'active'
      });
      
      console.log('Active API keys:', keys.data);
      
      // API key kullanımını kontrol et
      const usage = await zapi.apiKeys.getUsage(newKey.data.keyId);
      console.log('API key usage:', usage.data);
    }
  } catch (error) {
    console.error('API key management failed:', error.message);
  }
}
```

## 🎯 AI Provider Yönetimi Örnekleri

### AI Provider Ekleme ve Test Etme
```typescript
async function manageAIProviders() {
  try {
    // Yeni AI provider ekle
    const provider = await zapi.aiProvider.create({
      name: 'OpenAI GPT-4',
      type: 'openai',
      apiKey: 'sk-your-openai-key',
      baseUrl: 'https://api.openai.com/v1',
      models: ['gpt-4', 'gpt-3.5-turbo'],
      settings: {
        timeout: 30,
        retryAttempts: 3
      }
    });
    
    if (provider.success) {
      console.log('AI provider created:', provider.data);
      
      // Provider'ı test et
      const testResult = await zapi.aiProvider.test(provider.data.providerId);
      console.log('Provider test result:', testResult.data);
      
      // Provider modellerini listele
      const models = await zapi.aiProvider.getModels({
        provider: provider.data.providerId
      });
      console.log('Available models:', models.data);
    }
  } catch (error) {
    console.error('AI provider management failed:', error.message);
  }
}
```

## 📝 Content Management Örnekleri

### İçerik Oluşturma ve Yönetimi
```typescript
async function manageContent() {
  try {
    // Yeni içerik oluştur
    const content = await zapi.content.create({
      title: 'React Native SDK Kullanım Rehberi',
      content: 'Bu rehber, ZAPI React Native SDK\'nın nasıl kullanılacağını açıklar...',
      category: 'tutorial',
      tags: ['react-native', 'sdk', 'tutorial'],
      language: 'tr',
      status: 'draft',
      seo: {
        metaTitle: 'React Native SDK Kullanım Rehberi',
        metaDescription: 'ZAPI React Native SDK kullanım rehberi',
        keywords: ['react native', 'sdk', 'tutorial']
      }
    });
    
    if (content.success) {
      console.log('Content created:', content.data);
      
      // İçerikleri listele
      const contents = await zapi.content.list({
        page: 1,
        limit: 20,
        category: 'tutorial',
        status: 'published'
      });
      
      console.log('Published tutorials:', contents.data);
      
      // İçerik istatistikleri
      const stats = await zapi.content.getStats();
      console.log('Content statistics:', stats.data);
    }
  } catch (error) {
    console.error('Content management failed:', error.message);
  }
}
```

## 🚀 Tam Uygulama Örneği

```typescript
import { ZAPI, ValidationException, AuthenticationException } from '@zapi/react-native-sdk';

class ZAPIManager {
  private zapi: ZAPI;
  private isAuthenticated: boolean = false;

  constructor(apiKey: string, appId: string) {
    this.zapi = new ZAPI(apiKey, appId);
  }

  async initializeApp() {
    try {
      // Sistem sağlığını kontrol et
      const health = await this.zapi.info.getHealth();
      if (!health.success) {
        throw new Error('System is not healthy');
      }

      // Kullanıcı girişi (örnek)
      const loginResult = await this.loginUser();
      if (loginResult) {
        this.isAuthenticated = true;
        console.log('App initialized successfully');
      }
    } catch (error) {
      console.error('App initialization failed:', error);
      throw error;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const result = await this.zapi.auth.login(email, password);
      if (result.success) {
        console.log('User logged in successfully');
        return result.data;
      }
      return null;
    } catch (error) {
      if (error instanceof AuthenticationException) {
        console.error('Invalid credentials');
      } else {
        console.error('Login failed:', error.message);
      }
      return null;
    }
  }

  async generateContent(prompt: string) {
    if (!this.isAuthenticated) {
      throw new Error('User not authenticated');
    }

    try {
      const result = await this.zapi.responses.create({
        prompt: prompt,
        model: 'gpt-4',
        parameters: {
          temperature: 0.7,
          maxTokens: 1000
        }
      });

      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Content generation failed:', error);
      return null;
    }
  }

  async uploadImage(imagePath: string) {
    try {
      const result = await this.zapi.upload.upload(imagePath, {
        folder: 'user-images',
        public: true
      });

      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  }

  async getSystemStatus() {
    try {
      const [health, metrics, status] = await Promise.all([
        this.zapi.info.getHealth(),
        this.zapi.info.getMetrics(),
        this.zapi.info.getStatus()
      ]);

      return {
        health: health.data,
        metrics: metrics.data,
        status: status.data
      };
    } catch (error) {
      console.error('Status check failed:', error);
      return null;
    }
  }
}

// Kullanım
const zapiManager = new ZAPIManager('your-api-key', 'your-app-id');

// Uygulamayı başlat
zapiManager.initializeApp()
  .then(() => {
    console.log('App ready!');
  })
  .catch((error) => {
    console.error('App initialization failed:', error);
  });
```

---

Bu örnekler, ZAPI React Native SDK'nın temel kullanım senaryolarını göstermektedir. Daha fazla bilgi için [API Referansı](./API-REFERENCE.md) ve [README](./README.md) dosyalarına bakabilirsiniz.
