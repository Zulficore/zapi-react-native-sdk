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
      // Parametre adı ve tipini ayır
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
    const classCommentMatch = content.match(/\/\*\*([\s\S]*?)\*\/\s*export class/);
    const classDescription = classCommentMatch ? 
      classCommentMatch[1].replace(/\s*\*\s*/g, ' ').trim() : 
      `${className} endpoint'leri`;
    
    // async metodları bul ve detaylarını çıkar
    const asyncMethodRegex = /\/\*\*([\s\S]*?)\*\/\s*async\s+(\w+)\s*\(([^)]*)\)\s*:\s*Promise<([^>]+)>/g;
    const methods = [];
    let match;
    
    while ((match = asyncMethodRegex.exec(content)) !== null) {
      const comment = match[1].replace(/\s*\*\s*/g, ' ').trim();
      const methodName = match[2];
      const params = match[3].trim();
      const returnType = match[4];
      
      // Parametreleri parse et
      const parsedParams = parseParameters(params);
      
      methods.push({
        name: methodName,
        comment: comment,
        params: parsedParams,
        returnType: returnType,
        fullParams: params
      });
    }
    
    totalMethods += methods.length;
    
    // Markdown oluştur
    let markdown = `# ${className} Endpoint\n\n`;
    markdown += `${classDescription}\n\n`;
    markdown += `## Kullanım\n\n`;
    markdown += `\`\`\`typescript\n`;
    markdown += `const ${className.toLowerCase()} = zapi.${className.toLowerCase()};\n`;
    markdown += `\`\`\`\n\n`;
    markdown += `## Metodlar (${methods.length})\n\n`;
    
    methods.forEach((method, index) => {
      markdown += `### ${index + 1}. ${method.name}(): Promise<${method.returnType}>\n\n`;
      
      if (method.comment) {
        markdown += `${method.comment}\n\n`;
      }
      
      if (method.params.length > 0) {
        markdown += `**Parametreler:**\n\n`;
        method.params.forEach(param => {
          const required = param.required ? '**' : '';
          const optional = param.required ? '' : ' (opsiyonel)';
          const defaultVal = param.defaultValue ? ` = ${param.defaultValue}` : '';
          markdown += `- \`${param.name}: ${param.type}${defaultVal}\`${required}${optional}${required}\n`;
        });
        markdown += `\n`;
      }
      
      markdown += `**Örnek Kullanım:**\n\n`;
      markdown += `\`\`\`typescript\n`;
      
      // Örnek kod oluştur
      let exampleCode = `const result = await ${className.toLowerCase()}.${method.name}(`;
      if (method.params.length > 0) {
        const exampleParams = method.params.map(param => {
          if (param.defaultValue) {
            return param.defaultValue;
          } else if (param.type.includes('string')) {
            return `"${param.name}"`;
          } else if (param.type.includes('number')) {
            return '1';
          } else if (param.type.includes('boolean')) {
            return 'true';
          } else {
            return '{}';
          }
        });
        exampleCode += exampleParams.join(', ');
      }
      exampleCode += ');';
      
      markdown += exampleCode + '\n';
      markdown += `\`\`\`\n\n`;
      
      markdown += `**Yanıt:**\n\n`;
      markdown += `\`\`\`json\n`;
      markdown += `{\n`;
      markdown += `  "success": true,\n`;
      markdown += `  "data": {},\n`;
      markdown += `  "message": "İşlem başarılı"\n`;
      markdown += `}\n`;
      markdown += `\`\`\`\n\n`;
      markdown += `---\n\n`;
    });
    
    // Dosyaya yaz
    fs.writeFileSync(docPath, markdown, 'utf8');
    generatedDocs++;
    
    console.log(`   ✅ ${methods.length} metod dokümante edildi (parametreler dahil)`);
    
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
console.log('\n🎉 Tüm dokümantasyonlar parametrelerle birlikte docs/ klasöründe oluşturuldu!');
