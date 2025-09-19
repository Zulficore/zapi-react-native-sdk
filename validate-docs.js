const fs = require('fs');
const path = require('path');

class DocumentationValidator {
  constructor() {
    this.endpointsDir = './src/endpoints';
    this.docsDir = './docs';
    this.errors = [];
    this.warnings = [];
    this.stats = {
      totalEndpoints: 0,
      totalMethods: 0,
      missingDocs: 0,
      extraDocs: 0,
      mismatchedParams: 0
    };
  }

  // Endpoint dosyasından metodları çıkar
  extractMethodsFromEndpoint(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const methods = [];
      
      // async metodları bul
      const asyncMethodRegex = /async\s+(\w+)\s*\([^)]*\)\s*:\s*Promise<[^>]+>/g;
      let match;
      
      while ((match = asyncMethodRegex.exec(content)) !== null) {
        const methodName = match[1];
        
        // Metodun tam tanımını bul
        const methodStart = content.lastIndexOf('async', match.index);
        const methodEnd = content.indexOf('}', methodStart);
        const methodDef = content.substring(methodStart, methodEnd);
        
        // Parametreleri çıkar
        const paramMatch = methodDef.match(/async\s+\w+\s*\(([^)]*)\)/);
        const params = paramMatch ? paramMatch[1].trim() : '';
        
        methods.push({
          name: methodName,
          params: params,
          fullDefinition: methodDef.trim()
        });
      }
      
      return methods;
    } catch (error) {
      this.errors.push(`Endpoint dosyası okunamadı: ${filePath} - ${error.message}`);
      return [];
    }
  }

  // Dokümantasyon dosyasından metodları çıkar
  extractMethodsFromDocs(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const methods = [];
      
      // ### X. methodName( parametrelerini bul
      const methodRegex = /###\s*\d+\.\s*(\w+)\s*\([^)]*\)/g;
      let match;
      
      while ((match = methodRegex.exec(content)) !== null) {
        const methodName = match[1];
        
        // Parametreleri çıkar
        const paramMatch = match[0].match(/###\s*\d+\.\s*\w+\s*\(([^)]*)\)/);
        const params = paramMatch ? paramMatch[1].trim() : '';
        
        methods.push({
          name: methodName,
          params: params
        });
      }
      
      return methods;
    } catch (error) {
      this.errors.push(`Dokümantasyon dosyası okunamadı: ${filePath} - ${error.message}`);
      return [];
    }
  }

  // İki metod listesini karşılaştır
  compareMethods(realMethods, docMethods, endpointName) {
    const realMethodNames = new Set(realMethods.map(m => m.name));
    const docMethodNames = new Set(docMethods.map(m => m.name));
    
    // Eksik dokümantasyonlar
    for (const realMethod of realMethods) {
      if (!docMethodNames.has(realMethod.name)) {
        this.errors.push(`❌ EKSİK DOKÜMANTASYON: ${endpointName}.${realMethod.name}() - Gerçek kodda var ama dokümantasyonda yok`);
        this.stats.missingDocs++;
      }
    }
    
    // Fazla dokümantasyonlar
    for (const docMethod of docMethods) {
      if (!realMethodNames.has(docMethod.name)) {
        this.errors.push(`❌ FAZLA DOKÜMANTASYON: ${endpointName}.${docMethod.name}() - Dokümantasyonda var ama gerçek kodda yok`);
        this.stats.extraDocs++;
      }
    }
    
    // Parametre uyumsuzlukları
    for (const realMethod of realMethods) {
      const docMethod = docMethods.find(m => m.name === realMethod.name);
      if (docMethod && realMethod.params !== docMethod.params) {
        this.warnings.push(`⚠️  PARAMETRE UYUMSUZLUĞU: ${endpointName}.${realMethod.name}() - Gerçek: "${realMethod.params}" vs Dok: "${docMethod.params}"`);
        this.stats.mismatchedParams++;
      }
    }
  }

  // Tüm endpoint'leri kontrol et
  validateAllEndpoints() {
    console.log('🔍 Dokümantasyon doğrulama başlatılıyor...\n');
    
    const endpointFiles = fs.readdirSync(this.endpointsDir)
      .filter(file => file.endsWith('.ts') && file !== 'BaseEndpoint.ts' && file !== 'index.ts');
    
    this.stats.totalEndpoints = endpointFiles.length;
    
    for (const file of endpointFiles) {
      const endpointName = file.replace('.ts', '');
      const endpointPath = path.join(this.endpointsDir, file);
      const docPath = path.join(this.docsDir, `${endpointName.toUpperCase()}.md`);
      
      console.log(`📁 Kontrol ediliyor: ${endpointName}`);
      
      // Gerçek metodları çıkar
      const realMethods = this.extractMethodsFromEndpoint(endpointPath);
      this.stats.totalMethods += realMethods.length;
      
      // Dokümantasyon var mı kontrol et
      if (!fs.existsSync(docPath)) {
        this.errors.push(`❌ DOKÜMANTASYON YOK: ${endpointName} - ${docPath} dosyası bulunamadı`);
        continue;
      }
      
      // Dokümantasyon metodlarını çıkar
      const docMethods = this.extractMethodsFromDocs(docPath);
      
      // Karşılaştır
      this.compareMethods(realMethods, docMethods, endpointName);
      
      console.log(`   ✅ Gerçek: ${realMethods.length} metod, Dok: ${docMethods.length} metod`);
    }
  }

  // Rapor oluştur
  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 DOKÜMANTASYON DOĞRULAMA RAPORU');
    console.log('='.repeat(80));
    
    console.log(`\n📈 İSTATİSTİKLER:`);
    console.log(`   • Toplam Endpoint: ${this.stats.totalEndpoints}`);
    console.log(`   • Toplam Metod: ${this.stats.totalMethods}`);
    console.log(`   • Eksik Dokümantasyon: ${this.stats.missingDocs}`);
    console.log(`   • Fazla Dokümantasyon: ${this.stats.extraDocs}`);
    console.log(`   • Parametre Uyumsuzluğu: ${this.stats.mismatchedParams}`);
    
    if (this.errors.length > 0) {
      console.log(`\n❌ HATALAR (${this.errors.length}):`);
      this.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }
    
    if (this.warnings.length > 0) {
      console.log(`\n⚠️  UYARILAR (${this.warnings.length}):`);
      this.warnings.forEach((warning, index) => {
        console.log(`   ${index + 1}. ${warning}`);
      });
    }
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n🎉 TEBRİKLER! Tüm dokümantasyon doğru!');
    } else {
      console.log(`\n🔧 TOPLAM ${this.errors.length + this.warnings.length} SORUN BULUNDU!`);
    }
    
    // Detaylı rapor dosyasına yaz
    const reportContent = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      errors: this.errors,
      warnings: this.warnings
    };
    
    fs.writeFileSync('./validation-report.json', JSON.stringify(reportContent, null, 2));
    console.log('\n📄 Detaylı rapor: validation-report.json dosyasına kaydedildi');
  }

  // Ana çalıştırma fonksiyonu
  run() {
    try {
      this.validateAllEndpoints();
      this.generateReport();
    } catch (error) {
      console.error('❌ Script hatası:', error.message);
      process.exit(1);
    }
  }
}

// Scripti çalıştır
const validator = new DocumentationValidator();
validator.run();
