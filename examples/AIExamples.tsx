/**
 * ZAPI React Native SDK - AI İşlemleri Örnekleri
 * 
 * Bu dosya AI yanıtları, chat, embeddings ve diğer AI işlemleri için örnekleri içerir.
 * 
 * @author ZAPI Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { ZAPI, AIResponseRequest, ChatMessage } from 'zapi-react-native-sdk';

const AIExamples: React.FC = () => {
  const [zapi] = useState(() => new ZAPI({
    apiKey: 'your_api_key',
    appId: 'your_app_id',
  }));
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: 'Sen yardımcı bir AI asistanısın.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const addOutput = (message: string) => {
    setOutput(prev => [...prev, message]);
  };

  // Basit AI Yanıtı
  const simpleAIResponse = async () => {
    setIsLoading(true);
    try {
      addOutput('\n=== Basit AI Yanıtı ===');
      
      const response = await zapi.responses.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: 'JavaScript ile React Native arasındaki fark nedir?' }
        ],
        temperature: 0.7,
        max_tokens: 200
      });

      if (response.success && response.data) {
        addOutput(`🤖 Yanıt: ${response.data.choices[0].message.content}`);
        addOutput(`📊 Token: ${response.data.usage.totalTokens}`);
      }

    } catch (error) {
      addOutput(`❌ Hata: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Chat Konuşması
  const sendChatMessage = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      // Kullanıcı mesajını ekle
      const userMessage: ChatMessage = { role: 'user', content: inputText };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      
      addOutput(`👤 Sen: ${inputText}`);
      setInputText('');

      // AI'dan yanıt al
      const response = await zapi.responses.create({
        model: 'gpt-3.5-turbo',
        messages: newMessages,
        temperature: 0.8,
        max_tokens: 300
      });

      if (response.success && response.data) {
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: response.data.choices[0].message.content
        };
        
        setMessages([...newMessages, aiMessage]);
        addOutput(`🤖 AI: ${aiMessage.content}`);
        addOutput(`📊 Token: ${response.data.usage.totalTokens}`);
      }

    } catch (error) {
      addOutput(`❌ Chat hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Function Calling Örneği
  const functionCallingExample = async () => {
    setIsLoading(true);
    try {
      addOutput('\n=== Function Calling ===');

      const functions = [
        {
          name: 'get_weather',
          description: 'Belirtilen şehir için hava durumu bilgisi alır',
          parameters: {
            type: 'object',
            properties: {
              city: {
                type: 'string',
                description: 'Şehir adı'
              },
              unit: {
                type: 'string',
                enum: ['celsius', 'fahrenheit'],
                description: 'Sıcaklık birimi'
              }
            },
            required: ['city']
          }
        }
      ];

      const response = await zapi.responses.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: 'İstanbul\'da hava nasıl?' }
        ],
        functions,
        function_call: 'auto',
        temperature: 0.3
      });

      if (response.success && response.data) {
        const choice = response.data.choices[0];
        
        if (choice.message.function_call) {
          addOutput(`🔧 Function Call: ${choice.message.function_call.name}`);
          addOutput(`📝 Arguments: ${choice.message.function_call.arguments}`);
        } else {
          addOutput(`🤖 Yanıt: ${choice.message.content}`);
        }
      }

    } catch (error) {
      addOutput(`❌ Function calling hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Embeddings Örneği
  const embeddingsExample = async () => {
    setIsLoading(true);
    try {
      addOutput('\n=== Text Embeddings ===');

      const response = await zapi.embeddings.create({
        text: 'React Native ile mobil uygulama geliştirmek çok eğlenceli!',
        model: 'text-embedding-ada-002'
      });

      if (response.success && response.data) {
        addOutput(`📐 Embedding boyutu: ${response.data.embeddings[0].length}`);
        addOutput(`📊 İlk 5 değer: ${response.data.embeddings[0].slice(0, 5).join(', ')}`);
      }

    } catch (error) {
      addOutput(`❌ Embeddings hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Batch Embeddings
  const batchEmbeddingsExample = async () => {
    setIsLoading(true);
    try {
      addOutput('\n=== Batch Embeddings ===');

      const texts = [
        'React Native mobil geliştirme',
        'JavaScript programlama dili',
        'TypeScript tip güvenliği',
        'API entegrasyonu'
      ];

      const response = await zapi.embeddings.batch({
        texts,
        model: 'text-embedding-ada-002'
      });

      if (response.success && response.data) {
        addOutput(`📦 Toplam embedding: ${response.data.embeddings.length}`);
        response.data.embeddings.forEach((embedding: number[], index: number) => {
          addOutput(`${index + 1}. "${texts[index]}" - Boyut: ${embedding.length}`);
        });
      }

    } catch (error) {
      addOutput(`❌ Batch embeddings hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Görsel Oluşturma
  const imageGenerationExample = async () => {
    setIsLoading(true);
    try {
      addOutput('\n=== Görsel Oluşturma ===');

      const response = await zapi.images.generate({
        prompt: 'Modern bir şehir manzarası, gün batımında, dijital sanat tarzında',
        size: '512x512',
        n: 1,
        response_format: 'url'
      });

      if (response.success && response.data) {
        addOutput(`🎨 Görsel oluşturuldu!`);
        addOutput(`🔗 URL: ${response.data.images[0].url}`);
      }

    } catch (error) {
      addOutput(`❌ Görsel oluşturma hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Ses Transkripsiyon
  const audioTranscriptionExample = async () => {
    setIsLoading(true);
    try {
      addOutput('\n=== Ses Transkripsiyon ===');

      // Bu örnekte ses dosyası URI'si gerekir
      const response = await zapi.audio.transcribe({
        file: {
          uri: 'file://path/to/audio.mp3',
          type: 'audio/mp3',
          name: 'audio.mp3'
        },
        model: 'whisper-1',
        language: 'tr'
      });

      if (response.success && response.data) {
        addOutput(`🎵 Transkripsiyon: ${response.data.text}`);
      }

    } catch (error) {
      addOutput(`❌ Ses transkripsiyon hatası: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const resetChat = () => {
    setMessages([
      { role: 'system', content: 'Sen yardımcı bir AI asistanısın.' }
    ]);
    addOutput('🔄 Chat sıfırlandı');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ZAPI AI Örnekleri</Text>

      {/* Chat Input */}
      <View style={styles.chatContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Chat mesajı yazın..."
          multiline
        />
        <Button 
          title="Gönder" 
          onPress={sendChatMessage} 
          disabled={isLoading || !inputText.trim()} 
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Basit AI" onPress={simpleAIResponse} disabled={isLoading} />
        <Button title="Function Call" onPress={functionCallingExample} disabled={isLoading} />
        <Button title="Embeddings" onPress={embeddingsExample} disabled={isLoading} />
        <Button title="Batch Embed" onPress={batchEmbeddingsExample} disabled={isLoading} />
        <Button title="Görsel Oluştur" onPress={imageGenerationExample} disabled={isLoading} />
        <Button title="Ses Transkript" onPress={audioTranscriptionExample} disabled={isLoading} />
        <Button title="Chat Sıfırla" onPress={resetChat} />
        <Button title="Temizle" onPress={clearOutput} />
      </View>

      {isLoading && <Text style={styles.loading}>AI işlemi devam ediyor...</Text>}

      {/* Output */}
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
  chatContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    maxHeight: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 15,
    gap: 8,
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

export default AIExamples;
