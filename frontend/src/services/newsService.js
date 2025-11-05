import { apiUrl } from '../config/api';

// Serviço para buscar notícias do futebol feminino via API backend
export const fetchFeminineFootballNews = async () => {
  try {
    // Fazendo requisição para a API backend que faz o scraping
    const response = await fetch(apiUrl('news/feminine-football'));
    
    if (!response.ok) {
      throw new Error('Erro ao buscar notícias');
    }
    
    const newsData = await response.json();
    
    return newsData;
  } catch (error) {
    // Fallback com dados estáticos se a API falhar
    return [
      {
        id: 1,
        title: "CT exclusivo, renovações e novos parceiros: os planos de Stabile para o time feminino do Corinthians",
        excerpt: "Presidente revela desejo de construir espaço para treino das Brabas e quer comprar terreno ao lado do local utilizado pelo elenco masculino",
        image: "https://s2.glbimg.com/example-corinthians-ct-real.jpg",
        category: "corinthians",
        timeAgo: "Há 10 horas",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      },
      {
        id: 2,
        title: "Oitavas de final da Copa do Brasil Feminina 2025: veja jogos e onde assistir",
        excerpt: "Partidas ocorrem nos dias 16, 17 e 18 de setembro, em jogos únicos, que valem vaga nas quartas de final",
        image: "https://s2.glbimg.com/example-copa-brasil-real.jpg",
        category: "copa do brasil feminina",
        timeAgo: "Há 17 horas",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      },
      {
        id: 3,
        title: "Libertadores Feminina: torneio terá VAR em todas as partidas pela primeira vez na história",
        excerpt: "Competição, que terá as participações de Corinthians, São Paulo e Ferroviária, será disputada em Buenos Aires",
        image: "https://s2.glbimg.com/example-libertadores-real.jpg",
        category: "libertadores feminina",
        timeAgo: "Ontem",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      },
      {
        id: 4,
        title: "Palmeiras tem artilheira de 2025, e Cruzeiro mantém maior goleadora da história do Brasileiro Feminino",
        excerpt: "Amanda Gutierres marcou 17 gols na temporada ficando no topo da lista; Byanca Brasil tem larga vantagem na artilharia",
        image: "https://s2.glbimg.com/example-artilheiras-real.jpg",
        category: "brasileiro feminino",
        timeAgo: "Ontem",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      },
      {
        id: 5,
        title: "Investimento, história e filosofia: como o Corinthians ampliou hegemonia no futebol feminino",
        excerpt: "Brabas superam turbulências e trocas no comando e conquistam sétimo título brasileiro da modalidade",
        image: "https://s2.glbimg.com/example-hegemonia-real.jpg",
        category: "corinthians",
        timeAgo: "Ontem",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      },
      {
        id: 6,
        title: "Com mais de 40 mil ingressos vendidos, Corinthians busca novo recorde no futebol feminino",
        excerpt: "Dos cinco maiores públicos da modalidade no Brasil, quatro são na Neo Química Arena; Brabas têm o recorde sul-americano",
        image: "https://s2.glbimg.com/example-publico-real.jpg",
        category: "corinthians",
        timeAgo: "Há 3 dias",
        url: "https://ge.globo.com/futebol/futebol-feminino/"
      }
    ];
  }
};
