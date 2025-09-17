/**
 * ZAPI React Native SDK - Temel Kullanım Örneği
 * 
 * Bu dosya ZAPI React Native SDK'sının temel kullanımını gösterir.
 * 
 * @author ZAPI Team
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import { ZAPI, ZAPIException, AuthenticationException, ValidationException } from 'zapi-react-native-sdk';
import DeviceInfo from 'react-native-device-info';

const BasicUsageExample: React.FC = () => {
  const [zapi, setZapi] = useState<ZAPI | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    initializeSDK();
  }, []);

  const addOutput = (message: string) => {
    setOutput(prev => [...prev, message]);
    console.log(message);
  };

  const initializeSDK = async () => {
    try {
      // Device info'yu al
      const deviceInfo = {
        deviceId: await DeviceInfo.getUniqueId(),
        deviceName: await DeviceInfo.getDeviceName(),
        deviceType: (await DeviceInfo.getSystemName()).toLowerCase() as 'ios' | 'android',
        osVersion: await DeviceInfo.getSystemVersion(),
        appVersion: await DeviceInfo.getVersion(),
      };

      // ZAPI instance oluştur
      const zapiInstance = new ZAPI({
        apiKey: 'your_api_key',
        appId: 'your_app_id',
        baseUrl: 'https://dev.zulficoresystem.net',
        debug: true,
        timeout: 30,
      }, deviceInfo);

      setZapi(zapiInstance);
      addOutput('✅ ZAPI SDK başarıyla başlatıldı');
      addOutput(`📱 Device ID: ${deviceInfo.deviceId}`);
      addOutput(`📱 Device Type: ${deviceInfo.deviceType}`);

    } catch (error) {
      addOutput(`❌ SDK başlatma hatası: ${error}`);
    }
  };

  const testSystemConfig = async () => {
    if (!zapi) return;
    
    setIsLoading(true);
    try {
      addOutput('\n=== Sistem Konfigürasyonu ===');
      const config = await zapi.config.get();
      
      addOutput(`🔧 API Versiyonu: ${config.data?.version || 'N/A'}`);
      addOutput(`🌍 Environment: ${config.data?.environment || 'N/A'}`);
      addOutput(`🔌 WebSocket URL: ${config.data?.wsUrl || 'N/A'}`);
      
    } catch (error) {
      if (error instanceof ZAPIException) {
        addOutput(`❌ Sistem config hatası: ${error.message}`);
      } else {
        addOutput(`❌ Beklenmeyen hata: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const testUserLogin = async () => {
    if (!zapi) return;
    
    setIsLoading(true);
    try {
      addOutput('\n=== Kullanıcı Girişi ===');
      
      const login = await zapi.auth.login('user@example.com', 'password');
      
      if (login.success && login.data) {
        addOutput('✅ Giriş başarılı!');
        addOutput(`🔑 Token: ${login.data.token.substring(0, 20)}...`);
        
        // Bearer token'ı SDK'ya set et
        zapi.setBearerToken(login.data.token);
        addOutput('🔐 Bearer token ayarlandı');
        
        // Kullanıcı profili getir
        await testUserProfile();
        
      } else {
        addOutput(`❌ Giriş başarısız: ${login.message}`);
      }
      
    } catch (error) {
      if (error instanceof AuthenticationException) {
        addOutput(`❌ Kimlik doğrulama hatası: ${error.message}`);
      } else if (error instanceof ValidationException) {
        addOutput(`❌ Doğrulama hatası: ${error.message}`);
        addOutput(`📋 Hatalı alanlar: ${error.invalidFields.join(', ')}`);
      } else if (error instanceof ZAPIException) {
        addOutput(`❌ API hatası: ${error.message} (${error.httpStatusCode})`);
      } else {
        addOutput(`❌ Beklenmeyen hata: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const testUserProfile = async () => {
    if (!zapi) return;
    
    try {
      addOutput('\n=== Kullanıcı Profili ===');
      const profile = await zapi.user.getProfile();
      
      if (profile.success && profile.data) {
        const user = profile.data;
        addOutput(`👤 Kullanıcı: ${user.firstName} ${user.lastName}`);
        addOutput(`📧 Email: ${user.email}`);
        addOutput(`📱 Telefon: ${user.phone || 'Belirtilmemiş'}`);
        addOutput(`✅ Email Doğrulandı: ${user.isEmailVerified ? 'Evet' : 'Hayır'}`);
        
        if (user.subscription) {
          addOutput(`💼 Plan: ${user.subscription.plan.name}`);
          addOutput(`📊 Günlük Mesaj: ${user.subscription.usage.dailyMessages}/${user.subscription.plan.limits.dailyMessageLimit}`);
        }
      }
      
    } catch (error) {
      if (error instanceof ZAPIException) {
        addOutput(`❌ Profil hatası: ${error.message}`);
      } else {
        addOutput(`❌ Beklenmeyen hata: ${error}`);
      }
    }
  };

  const testAIResponse = async () => {
    if (!zapi) return;
    
    setIsLoading(true);
    try {
      addOutput('\n=== AI Yanıtı Oluştur ===');
      
      const response = await zapi.responses.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: 'Merhaba, nasılsın? Kısa bir cevap ver.' }
        ],
        temperature: 0.7,
        max_tokens: 100
      });
      
      if (response.success && response.data) {
        const aiResponse = response.data;
        const message = aiResponse.choices[0]?.message?.content;
        
        addOutput(`🤖 AI Yanıtı: ${message}`);
        addOutput(`📊 Token Kullanımı: ${aiResponse.usage.totalTokens}`);
        addOutput(`🏷️ Model: ${aiResponse.model}`);
        addOutput(`🆔 Response ID: ${aiResponse.id}`);
      }
      
    } catch (error) {
      if (error instanceof ZAPIException) {
        addOutput(`❌ AI yanıt hatası: ${error.message}`);
      } else {
        addOutput(`❌ Beklenmeyen hata: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const testApps = async () => {
    if (!zapi) return;
    
    setIsLoading(true);
    try {
      addOutput('\n=== Uygulamalar ===');
      
      const apps = await zapi.apps.list({ limit: 5 });
      
      if (apps.success && apps.data) {
        addOutput(`📱 Toplam Uygulama: ${apps.pagination.totalItems}`);
        
        apps.data.forEach((app, index) => {
          addOutput(`${index + 1}. ${app.name} (${app.status})`);
        });
      }
      
    } catch (error) {
      if (error instanceof ZAPIException) {
        addOutput(`❌ Uygulama listesi hatası: ${error.message}`);
      } else {
        addOutput(`❌ Beklenmeyen hata: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const testNotification = async () => {
    if (!zapi) return;
    
    setIsLoading(true);
    try {
      addOutput('\n=== E-posta Bildirimi ===');
      
      const notification = await zapi.notifications.sendEmail({
        to: 'test@example.com',
        subject: 'Test E-postası',
        content: 'Bu React Native SDK\'dan gönderilen bir test e-postasıdır.',
        template: 'default',
        type: 'email'
      });
      
      if (notification.success && notification.data) {
        addOutput(`✅ E-posta gönderildi: ${notification.data.message}`);
        addOutput(`🆔 Bildirim ID: ${notification.data.notificationId}`);
        addOutput(`📅 Gönderim Zamanı: ${notification.data.sentAt}`);
      }
      
    } catch (error) {
      if (error instanceof ZAPIException) {
        addOutput(`❌ E-posta gönderim hatası: ${error.message}`);
      } else {
        addOutput(`❌ Beklenmeyen hata: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const showSDKInfo = () => {
    if (!zapi) return;
    
    addOutput('\n=== SDK Bilgileri ===');
    const info = zapi.getInfo();
    
    addOutput(`📦 SDK Versiyonu: ${info.version}`);
    addOutput(`🌐 Base URL: ${info.baseUrl}`);
    addOutput(`🆔 App ID: ${info.appId}`);
    addOutput(`🐛 Debug Modu: ${info.debug ? 'Aktif' : 'Pasif'}`);
    addOutput(`⏱️ Timeout: ${info.timeout} saniye`);
    
    if (info.deviceInfo) {
      addOutput(`📱 Device: ${info.deviceInfo.deviceName} (${info.deviceInfo.deviceType})`);
    }
    
    addOutput(`🔌 Endpoint Sayısı: ${info.endpoints.length}`);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ZAPI React Native SDK Örneği</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Sistem Config" onPress={testSystemConfig} disabled={isLoading} />
        <Button title="Kullanıcı Girişi" onPress={testUserLogin} disabled={isLoading} />
        <Button title="AI Yanıtı" onPress={testAIResponse} disabled={isLoading} />
        <Button title="Uygulamalar" onPress={testApps} disabled={isLoading} />
        <Button title="E-posta Gönder" onPress={testNotification} disabled={isLoading} />
        <Button title="SDK Bilgileri" onPress={showSDKInfo} disabled={isLoading} />
        <Button title="Temizle" onPress={clearOutput} />
      </View>

      {isLoading && <Text style={styles.loading}>Yükleniyor...</Text>}

      <ScrollView style={styles.output}>
        {output.map((line, index) => (
          <Text key={index} style={styles.outputText}>
            {line}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 10,
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  output: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
  },
  outputText: {
    color: '#00ff00',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default BasicUsageExample;
