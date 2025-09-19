const fs = require('fs');
const path = require('path');

console.log('🚀 Final dokümantasyon üretici başlatılıyor...\n');

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
    
    // Class açıklamasını bul (sadece ilk satırı al)
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
    markdown += `const ${className.toLowerCase()} = zapi.${className.toLowerCase()};\n`;
    markdown += `\`\`\`\n\n`;
    markdown += `## Metodlar (${methods.length})\n\n`;
    
    methods.forEach((method, index) => {
      markdown += `### ${index + 1}. ${method.name}()\n\n`;
      
      if (method.params) {
        markdown += `**Parametreler:** \`${method.params}\`\n\n`;
      }
      
      markdown += `**Örnek Kullanım:**\n\n`;
      markdown += `\`\`\`typescript\n`;
      markdown += `const result = await ${className.toLowerCase()}.${method.name}();\n`;
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
    
    console.log(`   ✅ ${methods.length} metod dokümante edildi`);
    
  } catch (error) {
    console.log(`   ❌ Hata: ${error.message}`);
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 FINAL DOKÜMANTASYON ÜRETİM RAPORU');
console.log('='.repeat(60));
console.log(`\n📈 İSTATİSTİKLER:`);
console.log(`   • Toplam Endpoint: ${endpointFiles.length}`);
console.log(`   • Toplam Metod: ${totalMethods}`);
console.log(`   • Dokümante Edilen: ${generatedDocs}`);
console.log('\n🎉 Tüm dokümantasyonlar docs/ klasöründe oluşturuldu!');
