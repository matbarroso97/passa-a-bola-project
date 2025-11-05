const express = require('express');
const router = express.Router();

// Endpoint para retornar notícias estáticas manuais do projeto
router.get('/news/feminine-football', async (req, res) => {
  try {
    // Notícias estáticas criadas manualmente para o projeto Passa a Bola
    const newsData = [
      {
        id: 1,
        title: "CT exclusivo, renovações e novos parceiros: os planos de Stabile para o time feminino do Corinthians",
        excerpt: "Presidente revela desejo de construir espaço para treino das Brabas e quer comprar terreno ao lado do local utilizado pelo elenco masculino",
        image: null, // Sem imagem externa
        category: "corinthians",
        timeAgo: "Há 10 horas",
        url: "#"
      },
      {
        id: 2,
        title: "Oitavas de final da Copa do Brasil Feminina 2025: veja jogos e onde assistir",
        excerpt: "Partidas ocorrem nos dias 16, 17 e 18 de setembro, em jogos únicos, que valem vaga nas quartas de final",
        image: null,
        category: "copa do brasil feminina",
        timeAgo: "Há 17 horas",
        url: "#"
      },
      {
        id: 3,
        title: "Libertadores Feminina: torneio terá VAR em todas as partidas pela primeira vez na história",
        excerpt: "Confederação Sul-Americana de Futebol anuncia uso da tecnologia em todas as fases da competição",
        image: null,
        category: "libertadores feminina",
        timeAgo: "Há 1 dia",
        url: "#"
      },
      {
        id: 4,
        title: "Brasileirão Feminino: confira as artilheiras da temporada 2025",
        excerpt: "Competição reúne as melhores jogadoras do país em busca do título nacional. Amanda Gutierres lidera com 17 gols.",
        image: null,
        category: "brasileiro feminino",
        timeAgo: "Há 2 dias",
        url: "#"
      },
      {
        id: 5,
        title: "Seleção Brasileira Feminina: convocadas para amistosos internacionais",
        excerpt: "Técnica anuncia lista de jogadoras que vão representar o país nos próximos compromissos internacionais",
        image: null,
        category: "futebol feminino",
        timeAgo: "Há 3 dias",
        url: "#"
      },
      {
        id: 6,
        title: "Times femininos investem em infraestrutura para temporada 2025",
        excerpt: "Clubes ampliam estrutura e investem em centros de treinamento para equipes femininas, elevando o nível da modalidade",
        image: null,
        category: "futebol feminino",
        timeAgo: "Há 4 dias",
        url: "#"
      },
      {
        id: 7,
        title: "Passa a Bola lança nova plataforma para acompanhar futebol feminino",
        excerpt: "Plataforma oferece tabelas, jogos, estatísticas e muito mais para os fãs do futebol feminino brasileiro",
        image: null,
        category: "futebol feminino",
        timeAgo: "Há 5 dias",
        url: "#"
      }
    ];
    
    res.json(newsData);
  } catch (error) {
    console.error('❌ Erro ao retornar notícias:', error.message);
    res.status(500).json({ error: 'Erro ao carregar notícias' });
  }
});

module.exports = router;
