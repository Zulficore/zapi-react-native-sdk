# Functions Endpoint - 8 Metod

Fonksiyon yönetimi için kullanılan endpoint.

## Metodlar

### 1. list(options: any = {}): Promise<ApiResponse>
Fonksiyonları listeler.

**Parametreler:**
- `options` (any): Filtreleme seçenekleri
  - `limit` (number): Sayfa başına kayıt sayısı
  - `page` (number): Sayfa numarası
  - `search` (string): Arama terimi
  - `appId` (string): Uygulama ID'si

**Detaylı Örnek:**
```typescript
const functions = await zapi.functions.list({
  limit: 10,
  page: 1,
  search: 'process',
  appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Fonksiyonlar getirildi",
  "data": {
    "functions": [
      {
        "id": "func_64f8a1b2c3d4e5f6g7h8i9j0",
        "name": "processData",
        "description": "Process user data",
        "status": "active",
        "type": "javascript",
        "code": "function processData(data) { return data; }",
        "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0",
        "stats": {
          "totalExecutions": 1250,
          "lastExecution": "2024-01-15T10:30:00Z"
        },
        "createdAt": "2024-01-01T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 15,
      "itemsPerPage": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
*/
```

### 2. create(data: any): Promise<ApiResponse>
Yeni fonksiyon oluşturur.

**Parametreler:**
- `data` (any): Fonksiyon verileri
  - `name` (string): Fonksiyon adı
  - `description` (string): Açıklama
  - `type` (string): Fonksiyon tipi
  - `code` (string): Fonksiyon kodu

**Detaylı Örnek:**
```typescript
const create = await zapi.functions.create({
  name: 'validateUser',
  description: 'Validate user data',
  type: 'javascript',
  code: 'function validateUser(user) { return user.email && user.name; }'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Fonksiyon başarıyla oluşturuldu",
  "data": {
    "function": {
      "id": "func_64f8a1b2c3d4e5f6g7h8i9j1",
      "name": "validateUser",
      "description": "Validate user data",
      "status": "active",
      "type": "javascript",
      "code": "function validateUser(user) { return user.email && user.name; }",
      "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "stats": {
        "totalExecutions": 0,
        "lastExecution": null
      },
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:40:00Z"
    }
  }
}
*/
```

### 3. get(functionId: string): Promise<ApiResponse>
Belirli bir fonksiyonun detaylarını getirir.

**Parametreler:**
- `functionId` (string): Fonksiyon ID'si

**Detaylı Örnek:**
```typescript
const function = await zapi.functions.get('func_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Fonksiyon detayları getirildi",
  "data": {
    "function": {
      "id": "func_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "validateUser",
      "description": "Validate user data",
      "status": "active",
      "type": "javascript",
      "code": "function validateUser(user) { return user.email && user.name; }",
      "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "stats": {
        "totalExecutions": 1250,
        "lastExecution": "2024-01-15T10:30:00Z"
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
*/
```

### 4. update(functionId: string, data: any): Promise<ApiResponse>
Belirli bir fonksiyonu günceller.

**Parametreler:**
- `functionId` (string): Fonksiyon ID'si
- `data` (any): Güncellenecek veriler

**Detaylı Örnek:**
```typescript
const update = await zapi.functions.update('func_64f8a1b2c3d4e5f6g7h8i9j0', {
  name: 'Updated Validate User',
  description: 'Updated user validation function',
  code: 'function validateUser(user) { return user.email && user.name && user.age > 18; }'
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Fonksiyon başarıyla güncellendi",
  "data": {
    "function": {
      "id": "func_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Updated Validate User",
      "description": "Updated user validation function",
      "status": "active",
      "type": "javascript",
      "code": "function validateUser(user) { return user.email && user.name && user.age > 18; }",
      "appId": "app_64f8a1b2c3d4e5f6g7h8i9j0",
      "stats": {
        "totalExecutions": 1250,
        "lastExecution": "2024-01-15T10:30:00Z"
      },
      "createdAt": "2024-01-01T10:30:00Z",
      "updatedAt": "2024-01-15T10:45:00Z"
    }
  }
}
*/
```

### 5. delete(functionId: string): Promise<ApiResponse>
Belirli bir fonksiyonu siler.

**Parametreler:**
- `functionId` (string): Fonksiyon ID'si

**Detaylı Örnek:**
```typescript
const deleteFunction = await zapi.functions.delete('func_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Fonksiyon başarıyla silindi",
  "data": {
    "deleted": {
      "id": "func_64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Updated Validate User",
      "deletedAt": "2024-01-15T10:45:00Z",
      "deletedBy": "user_64f8a1b2c3d4e5f6g7h8i9j0"
    }
  }
}
*/
```

### 6. execute(functionId: string, data: any = {}): Promise<ApiResponse>
Fonksiyonu çalıştırır.

**Parametreler:**
- `functionId` (string): Fonksiyon ID'si
- `data` (any): Çalıştırma verileri

**Detaylı Örnek:**
```typescript
const execute = await zapi.functions.execute('func_64f8a1b2c3d4e5f6g7h8i9j0', {
  user: {
    email: 'test@example.com',
    name: 'Test User',
    age: 25
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Fonksiyon başarıyla çalıştırıldı",
  "data": {
    "result": true,
    "executionTime": "8ms",
    "executedAt": "2024-01-15T10:45:00Z"
  }
}
*/
```

### 7. toggleStatus(functionId: string): Promise<ApiResponse>
Fonksiyon durumunu değiştirir.

**Parametreler:**
- `functionId` (string): Fonksiyon ID'si

**Detaylı Örnek:**
```typescript
const toggle = await zapi.functions.toggleStatus('func_64f8a1b2c3d4e5f6g7h8i9j0');

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Fonksiyon durumu değiştirildi",
  "data": {
    "id": "func_64f8a1b2c3d4e5f6g7h8i9j0",
    "isActive": false,
    "toggledAt": "2024-01-15T10:45:00Z"
  }
}
*/
```

### 8. test(functionId: string, data: any = {}): Promise<ApiResponse>
Fonksiyonu test eder.

**Parametreler:**
- `functionId` (string): Fonksiyon ID'si
- `data` (any): Test verileri

**Detaylı Örnek:**
```typescript
const test = await zapi.functions.test('func_64f8a1b2c3d4e5f6g7h8i9j0', {
  user: {
    email: 'test@example.com',
    name: 'Test User',
    age: 25
  }
});

// Başarılı çıktı:
/*
{
  "success": true,
  "message": "Fonksiyon test edildi",
  "data": {
    "result": true,
    "executionTime": "5ms",
    "testedAt": "2024-01-15T10:45:00Z"
  }
}
*/
```

## Tam Örnek Kullanım

```typescript
import { ZAPI } from 'zapi-react-native-sdk';

const zapi = new ZAPI('your-api-key', 'your-app-id', 'https://api.zapi.com');

try {
  // 1. Fonksiyonları listele
  const functions = await zapi.functions.list({
    limit: 10,
    page: 1,
    appId: 'app_64f8a1b2c3d4e5f6g7h8i9j0'
  });
  console.log('Toplam fonksiyon:', functions.data.pagination.totalItems);
  
  // 2. Yeni fonksiyon oluştur
  const create = await zapi.functions.create({
    name: 'validateUser',
    description: 'Validate user data',
    type: 'javascript',
    code: 'function validateUser(user) { return user.email && user.name && user.age > 18; }'
  });
  const functionId = create.data.function.id;
  console.log('Yeni fonksiyon oluşturuldu:', functionId);
  
  // 3. Fonksiyon detayını getir
  const function = await zapi.functions.get(functionId);
  console.log('Fonksiyon adı:', function.data.function.name);
  console.log('Aktif mi:', function.data.function.isActive);
  
  // 4. Fonksiyon güncelle
  const update = await zapi.functions.update(functionId, {
    name: 'Updated Validate User',
    description: 'Updated user validation function'
  });
  console.log('Fonksiyon güncellendi:', update.data.function.updatedAt);
  
  // 5. Fonksiyonu test et
  const test = await zapi.functions.test(functionId, {
    user: {
      email: 'test@example.com',
      name: 'Test User',
      age: 25
    }
  });
  console.log('Test sonucu:', test.data.result);
  console.log('Test süresi:', test.data.executionTime);
  
  // 6. Fonksiyonu çalıştır
  const execute = await zapi.functions.execute(functionId, {
    user: {
      email: 'jane@example.com',
      name: 'Jane Doe',
      age: 22
    }
  });
  console.log('Çalıştırma sonucu:', execute.data.result);
  console.log('Çalıştırma süresi:', execute.data.executionTime);
  
  // 7. Fonksiyon durumunu değiştir
  const toggle = await zapi.functions.toggleStatus(functionId);
  console.log('Yeni durum:', toggle.data.isActive);
  
  // 8. Fonksiyon sil
  const deleteFunction = await zapi.functions.delete(functionId);
  console.log('Fonksiyon silindi:', deleteFunction.data.deleted.deletedAt);
  
} catch (error) {
  console.error('Hata:', error.message);
  console.error('Hata kodu:', error.errorCode);
  console.error('HTTP durum:', error.statusCode);
}
```
