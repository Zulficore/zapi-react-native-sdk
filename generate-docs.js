const fs = require('fs');
const path = require('path');

class DocumentationGenerator {
  constructor() {
    this.endpointsDir = './src/endpoints';
    this.docsDir = './docs';
    this.stats = {
      totalEndpoints: 0,
      totalMethods: 0,
      generatedDocs: 0
    };
  }

  // Endpoint dosyasından detaylı metod bilgilerini çıkar
  extractMethodDetails(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const methods = [];
      
      // Class adını bul
      const classMatch = content.match(/export class (\w+)/);
      const className = classMatch ? classMatch[1] : 'Unknown';
      
      // Class açıklamasını bul
      const classCommentMatch = content.match(/\/\*\*([\s\S]*?)\*\/\s*export class/);
      const classDescription = classCommentMatch ? 
        classCommentMatch[1].replace(/\s*\*\s*/g, ' ').trim() : 
        `${className} endpoint'leri`;
      
      // async metodları bul ve detaylarını çıkar
      const asyncMethodRegex = /\/\*\*([\s\S]*?)\*\/\s*async\s+(\w+)\s*\(([^)]*)\)\s*:\s*Promise<([^>]+)>/g;
      let match;
      
      while ((match = asyncMethodRegex.exec(content)) !== null) {
        const comment = match[1].replace(/\s*\*\s*/g, ' ').trim();
        const methodName = match[2];
        const params = match[3].trim();
        const returnType = match[4];
        
        // Parametreleri parse et
        const parsedParams = this.parseParameters(params);
        
        methods.push({
          name: methodName,
          comment: comment,
          params: parsedParams,
          returnType: returnType,
          fullParams: params
        });
      }
      
      return {
        className,
        classDescription,
        methods
      };
    } catch (error) {
      console.error(`Endpoint dosyası okunamadı: ${filePath} - ${error.message}`);
      return null;
    }
  }

  // Parametreleri parse et
  parseParameters(paramString) {
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

  // Markdown dokümantasyon oluştur
  generateMarkdown(endpointInfo) {
    const { className, classDescription, methods } = endpointInfo;
    
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
    
    return markdown;
  }

  // Tüm endpoint'ler için dokümantasyon oluştur
  generateAllDocumentation() {
    console.log('🚀 Otomatik dokümantasyon üretimi başlatılıyor...\n');
    
    const endpointFiles = fs.readdirSync(this.endpointsDir)
      .filter(file => file.endsWith('.ts') && file !== 'BaseEndpoint.ts' && file !== 'index.ts');
    
    this.stats.totalEndpoints = endpointFiles.length;
    
    for (const file of endpointFiles) {
      const endpointName = file.replace('.ts', '');
      const endpointPath = path.join(this.endpointsDir, file);
      const docPath = path.join(this.docsDir, `${endpointName.toUpperCase()}.md`);
      
      console.log(`📁 İşleniyor: ${endpointName}`);
      
      // Endpoint bilgilerini çıkar
      const endpointInfo = this.extractMethodDetails(endpointPath);
      
      if (endpointInfo && endpointInfo.methods.length > 0) {
        // Markdown dokümantasyon oluştur
        const markdown = this.generateMarkdown(endpointInfo);
        
        // Dosyaya yaz
        fs.writeFileSync(docPath, markdown, 'utf8');
        
        this.stats.totalMethods += endpointInfo.methods.length;
        this.stats.generatedDocs++;
        
        console.log(`   ✅ ${endpointInfo.methods.length} metod dokümante edildi`);
      } else {
        console.log(`   ⚠️  Metod bulunamadı veya dosya okunamadı`);
      }
    }
  }

  // Ana index dosyası oluştur
  generateIndexDocumentation() {
    console.log('\n📋 Ana index dokümantasyonu oluşturuluyor...');
    
    const indexPath = path.join(this.docsDir, 'README.md');
    let indexContent = `# ZAPI React Native SDK Dokümantasyonu\n\n`;
    indexContent += `Bu dokümantasyon ZAPI React Native SDK'nın tüm endpoint'lerini ve metodlarını içerir.\n\n`;
    indexContent += `## Kurulum\n\n`;
    indexContent += `\`\`\`bash\n`;
    indexContent += `npm install zapi-react-native-sdk\n`;
    indexContent += `\`\`\`\n\n`;
    indexContent += `## Kullanım\n\n`;
    indexContent += `\`\`\`typescript\n`;
    indexContent += `import ZAPI from 'zapi-react-native-sdk';\n\n`;
    indexContent += `const zapi = new ZAPI({\n`;
    indexContent += `  apiKey: 'your-api-key',\n`;
    indexContent += `  baseUrl: 'https://api.zapi.com'\n`;
    indexContent += `});\n`;
    indexContent += `\`\`\`\n\n`;
    indexContent += `## Endpoint'ler\n\n`;
    
    // Tüm endpoint dosyalarını listele
    const endpointFiles = fs.readdirSync(this.endpointsDir)
      .filter(file => file.endsWith('.ts') && file !== 'BaseEndpoint.ts' && file !== 'index.ts')
      .sort();
    
    endpointFiles.forEach(file => {
      const endpointName = file.replace('.ts', '');
      const docFile = `${endpointName.toUpperCase()}.md`;
      indexContent += `- [${endpointName}](./${docFile})\n`;
    });
    
    indexContent += `\n## İstatistikler\n\n`;
    indexContent += `- **Toplam Endpoint:** ${this.stats.totalEndpoints}\n`;
    indexContent += `- **Toplam Metod:** ${this.stats.totalMethods}\n`;
    indexContent += `- **Dokümante Edilen:** ${this.stats.generatedDocs}\n\n`;
    indexContent += `---\n\n`;
    indexContent += `*Bu dokümantasyon otomatik olarak gerçek koddan üretilmiştir.*\n`;
    
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log(`✅ Ana index dokümantasyonu oluşturuldu: README.md`);
  }

  // Rapor oluştur
  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 DOKÜMANTASYON ÜRETİM RAPORU');
    console.log('='.repeat(80));
    
    console.log(`\n📈 İSTATİSTİKLER:`);
    console.log(`   • Toplam Endpoint: ${this.stats.totalEndpoints}`);
    console.log(`   • Toplam Metod: ${this.stats.totalMethods}`);
    console.log(`   • Dokümante Edilen: ${this.stats.generatedDocs}`);
    
    if (this.stats.generatedDocs === this.stats.totalEndpoints) {
      console.log('\n🎉 TEBRİKLER! Tüm endpoint'ler başarıyla dokümante edildi!');
    } else {
      console.log(`\n⚠️  ${this.stats.totalEndpoints - this.stats.generatedDocs} endpoint dokümante edilemedi.`);
    }
    
    console.log('\n📄 Dokümantasyon dosyaları docs/ klasöründe oluşturuldu.');
  }

  // Ana çalıştırma fonksiyonu
  run() {
    try {
      // docs klasörünü oluştur
      if (!fs.existsSync(this.docsDir)) {
        fs.mkdirSync(this.docsDir, { recursive: true });
      }
      
      this.generateAllDocumentation();
      this.generateIndexDocumentation();
      this.generateReport();
    } catch (error) {
      console.error('❌ Script hatası:', error.message);
      process.exit(1);
    }
  }
}

// Scripti çalıştır
const generator = new DocumentationGenerator();
generator.run();
