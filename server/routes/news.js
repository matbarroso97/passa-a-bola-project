const express = require('express');
const router = express.Router();

// Endpoint para retornar notícias estáticas (scraping removido para evitar problemas com imagens)
router.get('/news/feminine-football', async (req, res) => {
  try {
    // Dados estáticos de notícias do futebol feminino
    const newsData = [
      {
        id: 1,
        title: "CT exclusivo, renovações e novos parceiros: os planos de Stabile para o time feminino do Corinthians",
        excerpt: "Presidente revela desejo de construir espaço para treino das Brabas e quer comprar terreno ao lado do local utilizado pelo elenco masculino",
        image: "https://via.placeholder.com/600x400/8620AD/ffffff?text=Corinthians",
        category: "corinthians",
        timeAgo: "Há 10 horas",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      },
      {
        id: 2,
        title: "Oitavas de final da Copa do Brasil Feminina 2025: veja jogos e onde assistir",
        excerpt: "Partidas ocorrem nos dias 16, 17 e 18 de setembro, em jogos únicos, que valem vaga nas quartas de final",
        image: "https://via.placeholder.com/600x400/8620AD/ffffff?text=Copa+do+Brasil",
        category: "copa do brasil feminina",
        timeAgo: "Há 17 horas",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      },
      {
        id: 3,
        title: "Libertadores Feminina: torneio terá VAR em todas as partidas pela primeira vez na história",
        excerpt: "Confederação Sul-Americana de Futebol anuncia uso da tecnologia em todas as fases da competição",
        image: "https://via.placeholder.com/600x400/8620AD/ffffff?text=Libertadores",
        category: "libertadores feminina",
        timeAgo: "Há 1 dia",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      },
      {
        id: 4,
        title: "Brasileirão Feminino: confira as artilheiras da temporada 2025",
        excerpt: "Competição reúne as melhores jogadoras do país em busca do título nacional",
        image: "https://via.placeholder.com/600x400/8620AD/ffffff?text=Brasileirão",
        category: "brasileiro feminino",
        timeAgo: "Há 2 dias",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      },
      {
        id: 5,
        title: "Seleção Brasileira Feminina: convocadas para amistosos internacionais",
        excerpt: "Técnica anuncia lista de jogadoras que vão representar o país nos próximos compromissos",
        image: "https://via.placeholder.com/600x400/8620AD/ffffff?text=Seleção",
        category: "futebol feminino",
        timeAgo: "Há 3 dias",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      },
      {
        id: 6,
        title: "Times femininos investem em infraestrutura para temporada 2025",
        excerpt: "Clubes ampliam estrutura e investem em centros de treinamento para equipes femininas",
        image: "https://via.placeholder.com/600x400/8620AD/ffffff?text=Infraestrutura",
        category: "futebol feminino",
        timeAgo: "Há 4 dias",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      }
    ];
    
    res.json(newsData);
  } catch (error) {
    console.error('❌ Erro ao retornar notícias:', error.message);
    res.status(500).json({ error: 'Erro ao carregar notícias' });
  }
});

module.exports = router;
