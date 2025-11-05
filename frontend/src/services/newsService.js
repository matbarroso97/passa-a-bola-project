import { apiUrl } from '../config/api';

// Serviço para buscar notícias do futebol feminino via API backend
export const fetchFeminineFootballNews = async () => {
  try {
    // Fazendo requisição para a API backend que retorna notícias estáticas
    const response = await fetch(apiUrl('news/feminine-football'));
    
    if (!response.ok) {
      throw new Error('Erro ao buscar notícias');
    }
    
    const newsData = await response.json();
    
    return newsData;
  } catch (error) {
    // Fallback com dados estáticos manuais se a API falhar
    return [
      {
        id: 1,
        title: "CT exclusivo, renovações e novos parceiros: os planos de Stabile para o time feminino do Corinthians",
        excerpt: "Presidente revela desejo de construir espaço para treino das Brabas e quer comprar terreno ao lado do local utilizado pelo elenco masculino",
        image: null,
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
        excerpt: "Competição reúne as melhores jogadoras do país em busca do título nacional",
        image: null,
        category: "brasileiro feminino",
        timeAgo: "Há 2 dias",
        url: "#"
      }
    ];
  }
};
