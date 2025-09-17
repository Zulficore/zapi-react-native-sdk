/**
 * ZAPI React Native SDK - Kimlik Doğrulama Örnekleri
 * 
 * Bu dosya kullanıcı kaydı, girişi, doğrulama ve profil yönetimi örneklerini içerir.
 * 
 * @author ZAPI Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { ZAPI, AuthenticationException, ValidationException } from 'zapi-react-native-sdk';

const AuthExamples: React.FC = () => {
  const [zapi] = useState(() => new ZAPI({
    apiKey: 'your_api_key',
    appId: 'your_app_id',
  }));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addOutput = (message: string) => {
    setOutput(prev => [...prev, message]);
  };

  // Kullanıcı Kaydı
  const registerUser = async () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert('Hata', 'Lütfen tüm gerekli alanları doldurun');
      return;
    }

    setIsLoading(true);
    try {
      addOutput('\n=== Kullanıcı Kaydı ===');

      const response = await zapi.auth.register({
        email,
        password,
        firstName,
        lastName,
        phone: phone || undefined,
        acceptTerms: true,
      });

      if (response.success) {
        addOutput('✅ Kayıt başarılı!');
        addOutput(`📧 Email: ${email}`);
        addOutput(`👤 Ad Soyad: ${firstName} ${lastName}`);
        addOutput('📬 Email doğrulama kodu gönderildi');
      } else {
        addOutput(`❌ Kayıt başarısız: ${response.message}`);
      }

    } catch (error) {
      if (error instanceof ValidationException) {
        addOutput(`❌ Doğrulama hatası: ${error.message}`);
        error.invalidFields.forEach(field => {
          const fieldError = error.getFieldError(field);
          if (fieldError) {
            addOutput(`  • ${field}: ${fieldError}`);
          }
        });
      } else if (error instanceof AuthenticationException) {
        addOutput(`❌ Kimlik doğrulama hatası: ${error.message}`);
      } else {
        addOutput(`❌ Kayıt hatası: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Kullanıcı Girişi
  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Email ve şifre gereklidir');
      return;
    }

    setIsLoading(true);
    try {
      addOutput('\n=== Kullanıcı Girişi ===');

      const response = await zapi.auth.login(email, password, {
        rememberMe: true,
      });

      if (response.success && response.data) {
        addOutput('✅ Giriş başarılı!');
        addOutput(`🔑 Token alındı: ${response.data.token.substring(0, 20)}...`);
        addOutput(`⏰ Token süresi: ${response.data.expiresIn} saniye`);
        
        // Bearer token'ı set et
        zapi.setBearerToken(response.data.token);
        setIsLoggedIn(true);
        
        // Kullanıcı bilgilerini göster
        const user = response.data.user;
        addOutput(`👤 Hoş geldin ${user.firstName}!`);
        addOutput(`📧 Email: ${user.email}`);
        addOutput(`✅ Email doğrulandı: ${user.isEmailVerified ? 'Evet' : 'Hayır'}`);

      } else {
        addOutput(`❌ Giriş başarısız: ${response.message}`);
      }

    } catch (error) {
      if (error instanceof AuthenticationException) {
        addOutput(`❌ Giriş hatası: ${error.message}`);
      } else if (error instanceof ValidationException) {
        addOutput(`❌ Doğrulama hatası: ${error.message}`);
      } else {
        addOutput(`❌ Beklenmeyen hata: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Email Doğrulama Kodu Gönder
  const sendEmailVerification = async () => {
    if (!email) {
      Alert.alert('Hata', 'Email adresi gereklidir');
      return;
    }

    setIsLoading(true);
    try {
      addOutput('\n=== Email Doğrulama ===');

      const response = await zapi.auth.sendVerification(email, 'email');

      if (response.success) {
        addOutput('✅ Doğrulama kodu gönderildi');
        addOutput(`📧 Kod gönderilen email: ${email}`);
        addOutput('📬 Email kutunuzu kontrol edin');
      } else {
        addOutput(`❌ Kod gönderilemedi: ${response.message}`);
      }

    } catch (error) {
      addOutput(`❌ Email doğrulama hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Email Doğrulama Kodunu Kontrol Et
  const verifyEmail = async () => {
    if (!email || !verificationCode) {
      Alert.alert('Hata', 'Email ve doğrulama kodu gereklidir');
      return;
    }

    setIsLoading(true);
    try {
      addOutput('\n=== Email Kod Doğrulama ===');

      const response = await zapi.auth.verifyEmail(email, verificationCode);

      if (response.success) {
        addOutput('✅ Email başarıyla doğrulandı!');
        addOutput('🎉 Artık tüm özellikleri kullanabilirsiniz');
      } else {
        addOutput(`❌ Doğrulama başarısız: ${response.message}`);
      }

    } catch (error) {
      if (error instanceof ValidationException) {
        addOutput(`❌ Geçersiz doğrulama kodu: ${error.message}`);
      } else {
        addOutput(`❌ Doğrulama hatası: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Gönder
  const sendOTP = async () => {
    if (!phone) {
      Alert.alert('Hata', 'Telefon numarası gereklidir');
      return;
    }

    setIsLoading(true);
    try {
      addOutput('\n=== OTP Gönderme ===');

      const response = await zapi.auth.sendOTP(phone, 'verification');

      if (response.success) {
        addOutput('✅ OTP kodu gönderildi');
        addOutput(`📱 Kod gönderilen numara: ${phone}`);
        addOutput('💬 SMS kutunuzu kontrol edin');
      } else {
        addOutput(`❌ OTP gönderilemedi: ${response.message}`);
      }

    } catch (error) {
      addOutput(`❌ OTP gönderim hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Doğrula
  const verifyOTP = async () => {
    if (!phone || !verificationCode) {
      Alert.alert('Hata', 'Telefon numarası ve OTP kodu gereklidir');
      return;
    }

    setIsLoading(true);
    try {
      addOutput('\n=== OTP Doğrulama ===');

      const response = await zapi.auth.verifyOTP(phone, verificationCode, 'verification');

      if (response.success) {
        addOutput('✅ Telefon numarası başarıyla doğrulandı!');
        addOutput('📱 SMS doğrulaması tamamlandı');
      } else {
        addOutput(`❌ OTP doğrulaması başarısız: ${response.message}`);
      }

    } catch (error) {
      addOutput(`❌ OTP doğrulama hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Şifre Sıfırlama İsteği
  const requestPasswordReset = async () => {
    if (!email) {
      Alert.alert('Hata', 'Email adresi gereklidir');
      return;
    }

    setIsLoading(true);
    try {
      addOutput('\n=== Şifre Sıfırlama ===');

      const response = await zapi.auth.requestPasswordReset(email);

      if (response.success) {
        addOutput('✅ Şifre sıfırlama linki gönderildi');
        addOutput(`📧 Link gönderilen email: ${email}`);
        addOutput('📬 Email kutunuzdaki linke tıklayın');
      } else {
        addOutput(`❌ Link gönderilemedi: ${response.message}`);
      }

    } catch (error) {
      addOutput(`❌ Şifre sıfırlama hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Kullanıcı Profili Getir
  const getUserProfile = async () => {
    if (!isLoggedIn) {
      Alert.alert('Hata', 'Önce giriş yapmalısınız');
      return;
    }

    setIsLoading(true);
    try {
      addOutput('\n=== Kullanıcı Profili ===');

      const response = await zapi.user.getProfile();

      if (response.success && response.data) {
        const user = response.data;
        addOutput('👤 Profil Bilgileri:');
        addOutput(`  • Ad Soyad: ${user.firstName} ${user.lastName}`);
        addOutput(`  • Email: ${user.email}`);
        addOutput(`  • Telefon: ${user.phone || 'Belirtilmemiş'}`);
        addOutput(`  • Email Doğrulandı: ${user.isEmailVerified ? 'Evet' : 'Hayır'}`);
        addOutput(`  • Telefon Doğrulandı: ${user.isPhoneVerified ? 'Evet' : 'Hayır'}`);
        addOutput(`  • Hesap Aktif: ${user.isActive ? 'Evet' : 'Hayır'}`);
        addOutput(`  • Kayıt Tarihi: ${new Date(user.createdAt).toLocaleDateString('tr-TR')}`);
        
        if (user.subscription) {
          addOutput('💼 Abonelik Bilgileri:');
          addOutput(`  • Plan: ${user.subscription.plan.name}`);
          addOutput(`  • Günlük Mesaj: ${user.subscription.usage.dailyMessages}/${user.subscription.plan.limits.dailyMessageLimit}`);
          addOutput(`  • Aylık Mesaj: ${user.subscription.usage.monthlyMessages}/${user.subscription.plan.limits.monthlyMessageLimit}`);
          addOutput(`  • Toplam Token: ${user.subscription.usage.totalTokens.toLocaleString()}`);
        }
      }

    } catch (error) {
      if (error instanceof AuthenticationException) {
        addOutput(`❌ Yetkilendirme hatası: ${error.message}`);
        setIsLoggedIn(false);
      } else {
        addOutput(`❌ Profil getirme hatası: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Çıkış Yap
  const logout = async () => {
    setIsLoading(true);
    try {
      addOutput('\n=== Çıkış İşlemi ===');

      const response = await zapi.auth.logout();

      if (response.success) {
        addOutput('✅ Başarıyla çıkış yapıldı');
        setIsLoggedIn(false);
        
        // Token'ı temizle
        zapi.setBearerToken('');
      } else {
        addOutput(`❌ Çıkış hatası: ${response.message}`);
      }

    } catch (error) {
      addOutput(`❌ Çıkış işlemi hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearOutput = () => {
    setOutput([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ZAPI Auth Örnekleri</Text>
      
      <ScrollView style={styles.formContainer}>
        {/* Form Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TextInput
          style={styles.input}
          placeholder="Ad"
          value={firstName}
          onChangeText={setFirstName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Soyad"
          value={lastName}
          onChangeText={setLastName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Telefon (+905551234567)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Doğrulama Kodu"
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="numeric"
        />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Kayıt Ol" onPress={registerUser} disabled={isLoading} />
          <Button title="Giriş Yap" onPress={loginUser} disabled={isLoading} />
          <Button title="Email Doğrula" onPress={sendEmailVerification} disabled={isLoading} />
          <Button title="Email Kod" onPress={verifyEmail} disabled={isLoading} />
          <Button title="OTP Gönder" onPress={sendOTP} disabled={isLoading} />
          <Button title="OTP Doğrula" onPress={verifyOTP} disabled={isLoading} />
          <Button title="Şifre Sıfırla" onPress={requestPasswordReset} disabled={isLoading} />
          <Button title="Profil Getir" onPress={getUserProfile} disabled={isLoading} />
          <Button title="Çıkış Yap" onPress={logout} disabled={isLoading} />
          <Button title="Temizle" onPress={clearOutput} />
        </View>

        {isLoading && <Text style={styles.loading}>İşlem devam ediyor...</Text>}
        
        {isLoggedIn && <Text style={styles.status}>✅ Giriş yapıldı</Text>}

        {/* Output */}
        <ScrollView style={styles.output}>
          {output.map((line, index) => (
            <Text key={index} style={styles.outputText}>
              {line}
            </Text>
          ))}
        </ScrollView>
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
  formContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 15,
    gap: 8,
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  status: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  output: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    maxHeight: 300,
  },
  outputText: {
    color: '#00ff00',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default AuthExamples;
