const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

// Endpoint para fazer scraping real das notícias do Globo Esporte
router.get('/news/feminine-football', async (req, res) => {
  try {
    // Detecta se está em Windows ou Linux
    const isWindows = process.platform === 'win32';
    
    // Args diferentes para Windows (local) vs Linux (produção)
    const browserArgs = isWindows 
      ? [
          // Args para Windows (desenvolvimento local)
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run'
        ]
      : [
          // Args para Linux (produção - Railway/Render)
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ];
    
    const browser = await puppeteer.launch({
      headless: true,
      args: browserArgs
    });
    
    const page = await browser.newPage();
    
    // Configurar user agent para evitar bloqueios
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    await page.goto('https://ge.globo.com/futebol/futebol-feminino/', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });
    
    // Aguarda um pouco mais para garantir que conteúdo carregou
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newsData = await page.evaluate(() => {
      const posts = document.querySelectorAll('.feed-post-body');
      
      return Array.from(posts).slice(0, 6).map((post, index) => {
        // Buscar título - tentando diferentes seletores
        let title = '';
        const titleSelectors = [
          '.feed-post-link-reset',
          '.feed-post-link-reset h2',
          '.feed-post-link-reset span',
          '.bstn-fd-title',
          '.bstn-fd-title h2',
          '.bstn-fd-title span',
          'h2',
          '.feed-post-title',
          'a[href*="/futebol/futebol-feminino/"]'
        ];
        
        for (const selector of titleSelectors) {
          const titleElement = post.querySelector(selector);
          if (titleElement && titleElement.textContent.trim()) {
            title = titleElement.textContent.trim();
            break;
          }
        }
        
        // Buscar resumo
        const excerptElement = post.querySelector('.feed-post-body-resumo');
        const excerpt = excerptElement ? excerptElement.textContent.trim() : '';
        
        // Buscar imagem seguindo a hierarquia completa
        const mediaWrapper = post.querySelector('.feed-media-wrapper');
        let imageSrc = '';
        
        if (mediaWrapper) {
          const link = mediaWrapper.querySelector('a');
          if (link) {
            const itemCover = link.querySelector('.bstn-fd-item-cover');
            if (itemCover) {
              const picture = itemCover.querySelector('picture.bstn-fd-cover-picture');
              if (picture) {
                const img = picture.querySelector('img');
                if (img) {
                  imageSrc = img.src || img.getAttribute('data-src') || '';
                }
              }
            }
          }
        }
        
        return {
          id: index + 1,
          title: title,
          excerpt: excerpt,
          image: imageSrc,
          category: 'futebol feminino',
          timeAgo: 'Há algumas horas',
          url: 'https://ge.globo.com/futebol/futebol-feminino/'
        };
      });
    });
    
    await browser.close();
    
    res.json(newsData);
  } catch (error) {
    console.error('❌ Erro ao fazer scraping:', error.message);
    console.error('Stack:', error.stack);
    
    // Fallback com dados estáticos se o scraping falhar
    const fallbackData = [
      {
        id: 1,
        title: "CT exclusivo, renovações e novos parceiros: os planos de Stabile para o time feminino do Corinthians",
        excerpt: "Presidente revela desejo de construir espaço para treino das Brabas e quer comprar terreno ao lado do local utilizado pelo elenco masculino",
        image: "https://s2.glbimg.com/example-corinthians-ct-real.jpg",
        category: "corinthians",
        timeAgo: "Há 10 horas",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      }
    ];
    
    res.json(fallbackData);
  }
});

module.exports = router;
