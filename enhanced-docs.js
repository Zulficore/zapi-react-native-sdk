const fs = require('fs');
const path = require('path');

console.log('🚀 Gelişmiş dokümantasyon üretici başlatılıyor...\n');

const endpointsDir = './src/endpoints';
const docsDir = './docs';

// docs klasörünü oluştur
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// Endpoint dosyalarını bul
const endpointFiles = fs.readdirSync(endpointsDir)
  .filter(file => file.endsWith('.ts') && file !== 'BaseEndpoint.ts' && file !== 'index.ts');

console.log(`📁 ${endpointFiles.length} endpoint dosyası bulundu`);

let totalMethods = 0;
let generatedDocs = 0;

// Parametreleri parse et
function parseParameters(paramString) {
  if (!paramString || paramString.trim() === '') {
    return [];
  }
  
  const params = [];
  const paramParts = paramString.split(',');
  
  for (const part of paramParts) {
    const trimmed = part.trim();
    if (trimmed) {
      const paramMatch = trimmed.match(/(\w+)(?:\s*:\s*([^=]+))?(?:\s*=\s*(.+))?/);
      if (paramMatch) {
        const name = paramMatch[1];
        const type = paramMatch[2] ? paramMatch[2].trim() : 'any';
        const defaultValue = paramMatch[3] ? paramMatch[3].trim() : null;
        
        params.push({
          name,
          type,
          defaultValue,
          required: !defaultValue && !type.includes('| null')
        });
      }
    }
  }
  
  return params;
}

// Örnek değer oluştur
function generateExampleValue(param) {
  if (param.defaultValue) {
    return param.defaultValue;
  }
  
  if (param.type.includes('string')) {
    if (param.name.includes('email')) return '"user@example.com"';
    if (param.name.includes('phone')) return '"5551234567"';
    if (param.name.includes('password')) return '"mypassword123"';
    if (param.name.includes('token')) return '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."';
    if (param.name.includes('id')) return '"12345"';
    if (param.name.includes('name')) return '"John Doe"';
    if (param.name.includes('url')) return '"https://example.com"';
    return `"${param.name}"`;
  }
  
  if (param.type.includes('number')) {
    return '1';
  }
  
  if (param.type.includes('boolean')) {
    return 'true';
  }
  
  if (param.type.includes('[]')) {
    return '[]';
  }
  
  return '{}';
}

// Gerçekçi yanıt oluştur
function generateRealisticResponse(methodName, endpointName) {
  const baseResponse = {
    success: true,
    data: {},
    message: "İşlem başarılı",
    timestamp: "2024-01-15T10:30:00Z"
  };
  
  // Endpoint'e göre özel yanıtlar
  if (endpointName.toLowerCase() === 'auth') {
    if (methodName.includes('login') || methodName.includes('register')) {
      baseResponse.data = {
        user: {
          id: "12345",
          email: "user@example.com",
          firstName: "John",
          lastName: "Doe",
          isActive: true
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        expiresIn: 3600
      };
    } else if (methodName.includes('profile')) {
      baseResponse.data = {
        id: "12345",
        email: "user@example.com",
        firstName: "John",
        lastName: "Doe",
        phone: "+905551234567",
        avatar: "https://example.com/avatar.jpg",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
      };
    }
  } else if (endpointName.toLowerCase() === 'user') {
    if (methodName.includes('usage')) {
      baseResponse.data = {
        currentPeriod: {
          startDate: "2024-01-01",
          endDate: "2024-01-31",
          requestsUsed: 1250,
          requestsLimit: 10000,
          tokensUsed: 50000,
          tokensLimit: 100000
        },
        totalUsage: {
          requests: 5000,
          tokens: 200000
        }
      };
    } else if (methodName.includes('responses')) {
      baseResponse.data = {
        responses: [
          {
            id: "resp_123",
            prompt: "Merhaba, nasılsın?",
            response: "Merhaba! Ben iyiyim, teşekkür ederim. Sen nasılsın?",
            model: "gpt-3.5-turbo",
            tokens: 25,
            createdAt: "2024-01-15T10:30:00Z"
          }
        ],
        total: 1,
        page: 1,
        limit: 10
      };
    }
  } else if (endpointName.toLowerCase() === 'admin') {
    if (methodName.includes('dashboard')) {
      baseResponse.data = {
        stats: {
          totalUsers: 1250,
          activeUsers: 980,
          totalRequests: 50000,
          totalTokens: 2000000,
          revenue: 15000.50
        },
        recentActivity: [
          {
            type: "user_registration",
            message: "Yeni kullanıcı kaydı",
            timestamp: "2024-01-15T10:30:00Z"
          }
        ]
      };
    }
  }
  
  return baseResponse;
}

// Hata yanıtı oluştur
function generateErrorResponse() {
  return {
    success: false,
    error: {
      code: "VALIDATION_ERROR",
      message: "Geçersiz parametreler",
      details: {
        field: "email",
        message: "Email formatı geçersiz"
      }
    },
    timestamp: "2024-01-15T10:30:00Z"
  };
}

for (const file of endpointFiles) {
  const endpointName = file.replace('.ts', '');
  const endpointPath = path.join(endpointsDir, file);
  const docPath = path.join(docsDir, `${endpointName.toUpperCase()}.md`);
  
  console.log(`\n📝 İşleniyor: ${endpointName}`);
  
  try {
    const content = fs.readFileSync(endpointPath, 'utf8');
    
    // Class adını bul
    const classMatch = content.match(/export class (\w+)/);
    const className = classMatch ? classMatch[1] : endpointName;
    
    // Class açıklamasını bul
    const classCommentMatch = content.match(/\/\*\*\s*\*\s*([^\n]+)/);
    const classDescription = classCommentMatch ? 
      classCommentMatch[1].trim() : 
      `${className} endpoint'leri`;
    
    // async metodları bul
    const methodMatches = content.match(/async\s+(\w+)\s*\([^)]*\)\s*:\s*Promise<[^>]+>/g);
    const methods = methodMatches ? methodMatches.map(match => {
      const methodMatch = match.match(/async\s+(\w+)\s*\(([^)]*)\)/);
      return {
        name: methodMatch[1],
        params: methodMatch[2].trim()
      };
    }) : [];
    
    totalMethods += methods.length;
    
    // Markdown oluştur
    let markdown = `# ${className} Endpoint\n\n`;
    markdown += `${classDescription}\n\n`;
    markdown += `## Kullanım\n\n`;
    markdown += `\`\`\`typescript\n`;
    markdown += `import ZAPI from 'zapi-react-native-sdk';\n\n`;
    markdown += `const zapi = new ZAPI({\n`;
    markdown += `  apiKey: 'your-api-key',\n`;
    markdown += `  baseUrl: 'https://api.zapi.com'\n`;
    markdown += `});\n\n`;
    markdown += `const ${className.toLowerCase()} = zapi.${className.toLowerCase()};\n`;
    markdown += `\`\`\`\n\n`;
    markdown += `## Metodlar (${methods.length})\n\n`;
    
    methods.forEach((method, index) => {
      const parsedParams = parseParameters(method.params);
      
      markdown += `### ${index + 1}. ${method.name}()\n\n`;
      
      if (parsedParams.length > 0) {
        markdown += `**Parametreler:**\n\n`;
        parsedParams.forEach(param => {
          const required = param.required ? '**' : '';
          const optional = param.required ? '' : ' (opsiyonel)';
          const defaultVal = param.defaultValue ? ` = ${param.defaultValue}` : '';
          markdown += `- \`${param.name}: ${param.type}${defaultVal}\`${required}${optional}${required}\n`;
        });
        markdown += `\n`;
      }
      
      markdown += `**Örnek Kullanım:**\n\n`;
      markdown += `\`\`\`typescript\n`;
      
      // Gerçekçi örnek kod oluştur
      let exampleCode = `const result = await ${className.toLowerCase()}.${method.name}(`;
      if (parsedParams.length > 0) {
        const exampleParams = parsedParams.map(param => generateExampleValue(param));
        exampleCode += exampleParams.join(', ');
      }
      exampleCode += ');\n\n';
      exampleCode += `if (result.success) {\n`;
      exampleCode += `  console.log('Başarılı:', result.data);\n`;
      exampleCode += `} else {\n`;
      exampleCode += `  console.error('Hata:', result.error);\n`;
      exampleCode += `}`;
      
      markdown += exampleCode + '\n';
      markdown += `\`\`\`\n\n`;
      
      markdown += `**Başarılı Yanıt:**\n\n`;
      markdown += `\`\`\`json\n`;
      const successResponse = generateRealisticResponse(method.name, endpointName);
      markdown += JSON.stringify(successResponse, null, 2) + '\n';
      markdown += `\`\`\`\n\n`;
      
      markdown += `**Hata Yanıtı:**\n\n`;
      markdown += `\`\`\`json\n`;
      const errorResponse = generateErrorResponse();
      markdown += JSON.stringify(errorResponse, null, 2) + '\n';
      markdown += `\`\`\`\n\n`;
      
      markdown += `---\n\n`;
    });
    
    // Dosyaya yaz
    fs.writeFileSync(docPath, markdown, 'utf8');
    generatedDocs++;
    
    console.log(`   ✅ ${methods.length} metod dokümante edildi (detaylı örneklerle)`);
    
  } catch (error) {
    console.log(`   ❌ Hata: ${error.message}`);
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 GELİŞMİŞ DOKÜMANTASYON ÜRETİM RAPORU');
console.log('='.repeat(60));
console.log(`\n📈 İSTATİSTİKLER:`);
console.log(`   • Toplam Endpoint: ${endpointFiles.length}`);
console.log(`   • Toplam Metod: ${totalMethods}`);
console.log(`   • Dokümante Edilen: ${generatedDocs}`);
console.log('\n🎉 Tüm dokümantasyonlar detaylı örneklerle docs/ klasöründe oluşturuldu!');
