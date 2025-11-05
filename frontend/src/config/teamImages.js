// URLs das imagens dos times de futebol feminino
export const teamImages = {
  // Times que já têm imagens locais
  'Corinthians': '/assets/icons/corinthians.png',
  'Flamengo': '/assets/icons/flamengo.png',
  'Internacional': '/assets/icons/internacional.png',
  'América-MG': '/assets/icons/americamg.png',
  'America-MG': '/assets/icons/americamg.png',
  'Grêmio': '/assets/icons/gremio.png',
  'Palmeiras': '/assets/icons/palmeiras.png',
  'São Paulo': '/assets/icons/saopaulo.png',
  'Santos': '/assets/icons/santos.png',
  'Atlético-MG': '/assets/icons/atletico-mg.png',
  'Botafogo': '/assets/icons/botafogo.png',
  'Vasco': '/assets/icons/vasco.png',
  'Cruzeiro': '/assets/icons/cruzeiro.png',
  'Fluminense': '/assets/icons/fluminense.png',
  'Bahia': '/assets/icons/bahia.png'
};

// Função para obter a imagem de um time
export const getTeamImage = (teamName) => {
  return teamImages[teamName] || null;
};
