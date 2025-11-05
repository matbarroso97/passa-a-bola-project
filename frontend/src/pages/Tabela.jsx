// src/pages/Tabela.jsx
import React, { useState, useEffect, useMemo } from "react";
import Dropdown from '../components/Dropdown';
import { getTeamImage } from '../config/teamImages';
import { apiUrl } from '../config/api';

export default function Tabela() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStat, setSelectedStat] = useState('Gols');
  const [selectedStatRecords, setSelectedStatRecords] = useState('Gols');
  const [selectedCompetition, setSelectedCompetition] = useState('Brasileirão Feminino');
  const [selectedCompetitionTeams, setSelectedCompetitionTeams] = useState('Brasileirão Feminino');
  const [selectedStatTeams, setSelectedStatTeams] = useState('Gols');

  // Dados das jogadoras com todas as estatísticas
  const playersStats = {
    'Cristiane': {
      gols: 9,
      assistencias: 4,
      cartoesAmarelos: 1,
      cartoesVermelhos: 0
    },
    'Amanda Gutierres': {
      gols: 5,
      assistencias: 7,
      cartoesAmarelos: 2,
      cartoesVermelhos: 0
    },
    'Letícia Ferreira': {
      gols: 3,
      assistencias: 5,
      cartoesAmarelos: 0,
      cartoesVermelhos: 0
    },
    'Gabi Zanotti': {
      gols: 2,
      assistencias: 8,
      cartoesAmarelos: 3,
      cartoesVermelhos: 1
    }
  };

  // Dados para recordes em um jogo
  const recordsStats = {
    'Cristiane': {
      gols: 3,
      assistencias: 2,
      cartoesAmarelos: 1,
      cartoesVermelhos: 0
    },
    'Amanda Gutierres': {
      gols: 3,
      assistencias: 1,
      cartoesAmarelos: 0,
      cartoesVermelhos: 0
    },
    'Letícia Ferreira': {
      gols: 2,
      assistencias: 3,
      cartoesAmarelos: 1,
      cartoesVermelhos: 0
    },
    'Gabi Zanotti': {
      gols: 1,
      assistencias: 4,
      cartoesAmarelos: 2,
      cartoesVermelhos: 0
    }
  };

  const getStatValue = (playerName, statType, isRecord = false) => {
    const data = isRecord ? recordsStats : playersStats;
    const player = data[playerName];
    if (!player) return 0;
    
    switch(statType) {
      case 'Gols': return player.gols;
      case 'Assistências': return player.assistencias;
      case 'Cartões Amarelos': return player.cartoesAmarelos;
      case 'Cartões Vermelhos': return player.cartoesVermelhos;
      default: return 0;
    }
  };

  const getStatLabel = (statType, value) => {
    if (value === 1) {
      switch(statType) {
        case 'Gols': return '1 gol';
        case 'Assistências': return '1 assistência';
        case 'Cartões Amarelos': return '1 cartão amarelo';
        case 'Cartões Vermelhos': return '1 cartão vermelho';
        default: return '';
      }
    } else {
      switch(statType) {
        case 'Gols': return `${value} gols`;
        case 'Assistências': return `${value} assistências`;
        case 'Cartões Amarelos': return `${value} cartões amarelos`;
        case 'Cartões Vermelhos': return `${value} cartões vermelhos`;
        default: return '';
      }
    }
  };

  // Dados das jogadoras para exibição
  const playersData = {
    'Cristiane': {
      photo: '/assets/icons/cristianeflamengo.png',
      team: 'Flamengo',
      position: 'Atacante'
    },
    'Amanda Gutierres': {
      photo: '/assets/icons/amandapalmeiras.png',
      team: 'Palmeiras',
      position: 'Atacante'
    },
    'Letícia Ferreira': {
      photo: '/assets/icons/leticiacruzeiro.png',
      team: 'Cruzeiro',
      position: 'Atacante'
    },
    'Gabi Zanotti': {
      photo: '/assets/icons/gabicorinthians.png',
      team: 'Corinthians',
      position: 'Meio-campo'
    }
  };

  // Dados das equipes com todas as estatísticas
  const teamsStats = {
    'Corinthians': {
      gols: 42,
      assistencias: 35,
      cartoesAmarelos: 15,
      cartoesVermelhos: 2
    },
    'Palmeiras': {
      gols: 33,
      assistencias: 28,
      cartoesAmarelos: 12,
      cartoesVermelhos: 1
    },
    'Cruzeiro': {
      gols: 32,
      assistencias: 30,
      cartoesAmarelos: 10,
      cartoesVermelhos: 0
    },
    'São Paulo': {
      gols: 30,
      assistencias: 25,
      cartoesAmarelos: 18,
      cartoesVermelhos: 3
    }
  };

  const getTeamStatValue = (teamName, statType) => {
    const team = teamsStats[teamName];
    if (!team) return 0;
    
    switch(statType) {
      case 'Gols': return team.gols;
      case 'Assistências': return team.assistencias;
      case 'Cartões Amarelos': return team.cartoesAmarelos;
      case 'Cartões Vermelhos': return team.cartoesVermelhos;
      default: return 0;
    }
  };

  // Ordenar jogadoras baseado na estatística selecionada (otimizado com useMemo)
  const sortedPlayers = useMemo(() => {
    const playerNames = Object.keys(playersStats);
    return playerNames.sort((a, b) => {
      const statA = getStatValue(a, selectedStat, false);
      const statB = getStatValue(b, selectedStat, false);
      return statB - statA; // Ordem decrescente (maior para menor)
    });
  }, [selectedStat]);

  const sortedPlayersRecords = useMemo(() => {
    const playerNames = Object.keys(recordsStats);
    return playerNames.sort((a, b) => {
      const statA = getStatValue(a, selectedStatRecords, true);
      const statB = getStatValue(b, selectedStatRecords, true);
      return statB - statA; // Ordem decrescente (maior para menor)
    });
  }, [selectedStatRecords]);

  // Ordenar equipes baseado na estatística selecionada (otimizado com useMemo)
  const sortedTeams = useMemo(() => {
    const teamNames = Object.keys(teamsStats);
    return teamNames.sort((a, b) => {
      const statA = getTeamStatValue(a, selectedStatTeams);
      const statB = getTeamStatValue(b, selectedStatTeams);
      return statB - statA; // Ordem decrescente (maior para menor)
    });
  }, [selectedStatTeams]);

  // Mapeamento de competições para ícones
  const competitionIcons = {
    'Brasileirão Feminino': '/assets/icons/brasileiraofem.png',
    'Libertadores Feminina': '/assets/icons/libertadores.png',
    'Copa do Brasil Feminina': '/assets/icons/copadobrasil.png'
  };

  const getCompetitionIcon = (competition) => {
    return competitionIcons[competition] || competitionIcons['Brasileirão Feminino'];
  };

  // Opções para os dropdowns
  const competitionOptions = [
    { value: 'Brasileirão Feminino', label: 'Brasileirão Feminino', icon: '/assets/icons/brasileiraofem.png' },
    { value: 'Libertadores Feminina', label: 'Libertadores Feminina', icon: '/assets/icons/libertadores.png' },
    { value: 'Copa do Brasil Feminina', label: 'Copa do Brasil Feminina', icon: '/assets/icons/copadobrasil.png' }
  ];

  const yearOptions = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' }
  ];

  const statOptions = [
    { value: 'Gols', label: 'Gols' },
    { value: 'Assistências', label: 'Assistências' },
    { value: 'Cartões Amarelos', label: 'Cartões Amarelos' },
    { value: 'Cartões Vermelhos', label: 'Cartões Vermelhos' }
  ];


  useEffect(() => {
    const loadRanking = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl('ranking'));
        if (!response.ok) {
          throw new Error('Erro ao carregar ranking');
        }
        const rankingData = await response.json();
        setRanking(rankingData);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar ranking");
        // Fallback com dados estáticos
        setRanking([
          { position: 1, team: "Cruzeiro", points: 36, played: 14, wins: 11, draws: 3, losses: 0, goalsFor: 33, goalsAgainst: 11, goalDifference: 22, percentage: 85 },
          { position: 2, team: "Corinthians", points: 31, played: 14, wins: 9, draws: 4, losses: 1, goalsFor: 42, goalsAgainst: 10, goalDifference: 32, percentage: 73 },
          { position: 3, team: "São Paulo", points: 30, played: 14, wins: 9, draws: 3, losses: 2, goalsFor: 30, goalsAgainst: 20, goalDifference: 10, percentage: 71 },
          { position: 4, team: "Palmeiras", points: 27, played: 14, wins: 8, draws: 3, losses: 3, goalsFor: 32, goalsAgainst: 15, goalDifference: 17, percentage: 64 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadRanking();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8" style={{backgroundColor: 'white'}}>
      <div className="space-y-4 sm:space-y-6">
        
        {/* Tabela de classificação */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <header className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Tabela</h2>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <img 
                src="/assets/icons/brasileiraofem.png" 
                alt="Brasileirão Feminino"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Brasileirão Feminino</h2>
            </div>
          </header>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="text-gray-500 mt-4">Carregando tabela...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[720px] px-4 sm:px-0">
                <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="header-brand text-white">
                    <th className="p-2 sm:p-3 text-left">Classificação</th>
                    <th className="p-2 sm:p-3">P</th>
                    <th className="p-2 sm:p-3">PJ</th>
                    <th className="p-2 sm:p-3">V</th>
                    <th className="p-2 sm:p-3">E</th>
                    <th className="p-2 sm:p-3">D</th>
                    <th className="p-2 sm:p-3">GP</th>
                    <th className="p-2 sm:p-3">GC</th>
                    <th className="p-2 sm:p-3">SG</th>
                    <th className="p-2 sm:p-3">%</th>
                    <th className="p-2 sm:p-3 hidden sm:table-cell">Últimos Confrontos</th>
                </tr>
              </thead>
              <tbody>
                  {ranking.map((team, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-2 sm:p-3 font-medium">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-base sm:text-lg font-bold text-gray-500 w-4 sm:w-6">{team.pos}</span>
                          <span className="text-xs sm:text-base truncate">{team.team}</span>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 text-center font-bold">{team.points}</td>
                      <td className="p-2 sm:p-3 text-center">{team.played}</td>
                      <td className="p-2 sm:p-3 text-center">{team.wins}</td>
                      <td className="p-2 sm:p-3 text-center">{team.draws}</td>
                      <td className="p-2 sm:p-3 text-center">{team.losses}</td>
                      <td className="p-2 sm:p-3 text-center">{team.goalsFor}</td>
                      <td className="p-2 sm:p-3 text-center">{team.goalsAgainst}</td>
                      <td className="p-2 sm:p-3 text-center">{team.goalDifference}</td>
                      <td className="p-2 sm:p-3 text-center">{team.percentage}%</td>
                      <td className="p-2 sm:p-3 text-center hidden sm:table-cell">✅✅❌✅</td>
                  </tr>
                ))}
              </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Partidas + Partida em Destaque */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Partidas */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Partidas</h2>
            <div className="space-y-2">
              {/* Linha roxa acima do Flamengo */}
              <div className="w-full h-px bg-purple-800"></div>
              
              {/* Partida 1 */}
              <div className="p-4 border-b border-purple-800 relative">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex">
                    {/* Lado esquerdo - Times */}
                    <div className="flex-1">
                      {/* Time da casa */}
                      <div className="flex items-center py-2">
                        <div className="flex items-center space-x-3">
                          {getTeamImage('Flamengo') ? (
                            <img 
                              src={getTeamImage('Flamengo')} 
                              alt="Flamengo"
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              F
                            </div>
                          )}
                          <span className="font-semibold text-gray-900">Flamengo</span>
                        </div>
                      </div>

                      {/* Time visitante */}
                      <div className="flex items-center py-2">
                        <div className="flex items-center space-x-3">
                          {getTeamImage('Grêmio') ? (
                            <img 
                              src={getTeamImage('Grêmio')} 
                              alt="Grêmio"
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              G
                            </div>
                          )}
                          <span className="font-semibold text-gray-900">Grêmio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-bold text-gray-900">18/06</div>
                  </div>
                </div>
              </div>

              {/* Partida 2 */}
              <div className="p-4 border-b border-purple-800 relative">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex">
                    {/* Lado esquerdo - Times */}
                    <div className="flex-1">
                      {/* Time da casa */}
                      <div className="flex items-center py-2">
                        <div className="flex items-center space-x-3">
                          {getTeamImage('América-MG') ? (
                            <img 
                              src={getTeamImage('América-MG')} 
                              alt="América-MG"
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              A
                            </div>
                          )}
                          <span className="font-semibold text-gray-900">América-MG</span>
                        </div>
                      </div>

                      {/* Time visitante */}
                      <div className="flex items-center py-2">
                        <div className="flex items-center space-x-3">
                          {getTeamImage('Fluminense') ? (
                            <img 
                              src={getTeamImage('Fluminense')} 
                              alt="Fluminense"
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              F
                            </div>
                          )}
                          <span className="font-semibold text-gray-900">Fluminense</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-bold text-gray-900">18/06</div>
                  </div>
                </div>
              </div>

              {/* Partida 3 */}
              <div className="p-4 relative">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex">
                    {/* Lado esquerdo - Times */}
                    <div className="flex-1">
                      {/* Time da casa */}
                      <div className="flex items-center py-2">
                        <div className="flex items-center space-x-3">
                          {getTeamImage('Bahia') ? (
                            <img 
                              src={getTeamImage('Bahia')} 
                              alt="Bahia"
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              B
                            </div>
                          )}
                          <span className="font-semibold text-gray-900">Bahia</span>
                        </div>
                      </div>

                      {/* Time visitante */}
                      <div className="flex items-center py-2">
                        <div className="flex items-center space-x-3">
                          {getTeamImage('Santos') ? (
                            <img 
                              src={getTeamImage('Santos')} 
                              alt="Santos"
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              S
                            </div>
                          )}
                          <span className="font-semibold text-gray-900">Santos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-bold text-gray-900">18/06</div>
                  </div>
                </div>
              </div>
              
              {/* Linha roxa abaixo da Amazônia */}
              <div className="w-full h-px bg-purple-800"></div>
            </div>
          </div>

          {/* Partida em Destaque */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-end justify-center h-full">
              <img 
                src="/assets/images/destaque.png" 
                alt="Partida em Destaque"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Grid 2x2 - Melhores Jogadoras, Melhores Equipes, Recordes, Informações da Liga */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Melhores Jogadoras */}
          <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-green-500" style={{ overflow: 'visible' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Melhores Jogadoras</h3>
            
            {/* Container com selects */}
            <div className="mb-4 space-y-3">
              {/* Competição com ícone e data */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Dropdown
                  options={competitionOptions}
                  value={selectedCompetition}
                  onChange={setSelectedCompetition}
                  placeholder="Selecione uma competição"
                  icon={getCompetitionIcon(selectedCompetition)}
                />
                <Dropdown
                  options={yearOptions}
                  value="2025"
                  onChange={() => {}}
                  placeholder="Ano"
                />
              </div>
              
              {/* Select de estatísticas */}
              <Dropdown
                options={statOptions}
                value={selectedStat}
                onChange={setSelectedStat}
                placeholder="Estatística"
              />
            </div>
            
            {selectedCompetition === 'Libertadores Feminina' || selectedCompetition === 'Copa do Brasil Feminina' ? (
              <div className="text-center py-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xl font-semibold text-gray-600">Em Breve...</p>
                  <p className="text-sm text-gray-500">Estamos trabalhando para trazer essas informações em breve!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
              {sortedPlayers.map((playerName, index) => {
                const player = playersData[playerName];
                const isLast = index === sortedPlayers.length - 1;
                
                return (
                  <div 
                    key={playerName} 
                    className={`flex items-center justify-between py-2 gap-3 ${isLast ? '' : 'border-b border-purple-800'}`}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <img 
                        src={player.photo} 
                        alt={playerName}
                        className="w-8 h-8 object-contain flex-shrink-0"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-semibold text-gray-900 truncate">{playerName}</span>
                        <div className="flex items-center space-x-1 mt-0.5">
                          {getTeamImage(player.team) && (
                            <img 
                              src={getTeamImage(player.team)} 
                              alt={player.team}
                              className="w-4 h-4 object-contain flex-shrink-0"
                            />
                          )}
                          <span className="text-xs text-gray-500 truncate">{player.position}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 flex-shrink-0">
                      {getStatLabel(selectedStat, getStatValue(playerName, selectedStat))}
                    </span>
                  </div>
                );
              })}
            </div>
            )}
          </div>

          {/* Melhores Equipes */}
          <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-green-500" style={{ overflow: 'visible' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Melhores Equipes</h3>
            
            {/* Container com selects */}
            <div className="mb-4 space-y-3">
              {/* Competição com ícone e data */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Dropdown
                  options={competitionOptions}
                  value={selectedCompetitionTeams}
                  onChange={setSelectedCompetitionTeams}
                  placeholder="Selecione uma competição"
                  icon={getCompetitionIcon(selectedCompetitionTeams)}
                />
                <Dropdown
                  options={yearOptions}
                  value="2025"
                  onChange={() => {}}
                  placeholder="Ano"
                />
              </div>
              
              {/* Select de estatísticas */}
              <Dropdown
                options={statOptions}
                value={selectedStatTeams}
                onChange={setSelectedStatTeams}
                placeholder="Estatística"
              />
            </div>
            
            {selectedCompetitionTeams === 'Libertadores Feminina' || selectedCompetitionTeams === 'Copa do Brasil Feminina' ? (
              <div className="text-center py-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xl font-semibold text-gray-600">Em Breve...</p>
                  <p className="text-sm text-gray-500">Estamos trabalhando para trazer essas informações em breve!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedTeams.map((teamName, index) => {
                  const isLast = index === sortedTeams.length - 1;
                  
                  return (
                    <div 
                      key={teamName} 
                      className={`flex items-center justify-between py-2 gap-3 ${isLast ? '' : 'border-b border-purple-800'}`}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {getTeamImage(teamName) ? (
                          <img 
                            src={getTeamImage(teamName)} 
                            alt={teamName}
                            className="w-8 h-8 object-contain flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {teamName.charAt(0)}
                          </div>
                        )}
                        <span className="font-semibold text-gray-900 truncate">{teamName}</span>
                      </div>
                      <span className="text-sm text-gray-600 flex-shrink-0">
                        {getStatLabel(selectedStatTeams, getTeamStatValue(teamName, selectedStatTeams))}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recordes em um Jogo */}
          <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-green-500" style={{ overflow: 'visible' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Recordes em um Jogo</h3>
            
            {/* Container com select de estatísticas */}
            <div className="mb-4">
              <Dropdown
                options={statOptions}
                value={selectedStatRecords}
                onChange={setSelectedStatRecords}
                placeholder="Estatística"
              />
            </div>
            
            <div className="space-y-3">
              {sortedPlayersRecords.map((playerName, index) => {
                const player = playersData[playerName];
                const isLast = index === sortedPlayersRecords.length - 1;
                
                return (
                  <div 
                    key={playerName} 
                    className={`flex items-center justify-between py-2 gap-3 ${isLast ? '' : 'border-b border-purple-800'}`}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <img 
                        src={player.photo} 
                        alt={playerName}
                        className="w-8 h-8 object-contain flex-shrink-0"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-semibold text-gray-900 truncate">{playerName}</span>
                        <div className="flex items-center space-x-1 mt-0.5">
                          {getTeamImage(player.team) && (
                            <img 
                              src={getTeamImage(player.team)} 
                              alt={player.team}
                              className="w-4 h-4 object-contain flex-shrink-0"
                            />
                          )}
                          <span className="text-xs text-gray-500 truncate">{player.position}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 flex-shrink-0">
                      {getStatLabel(selectedStatRecords, getStatValue(playerName, selectedStatRecords, true))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Informações da Liga */}
          <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-green-500">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Informações da Liga</h3>
            
            {/* Maior campeão e Atual campeão lado a lado */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Maior campeão */}
              <div className="text-center">
                <p className="text-sm font-bold text-gray-900 mb-2">Maior campeão da liga:</p>
                <div className="flex items-center justify-center space-x-2">
                  {getTeamImage('Corinthians') ? (
                    <img 
                      src={getTeamImage('Corinthians')} 
                      alt="Corinthians"
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold">
                      C
                    </div>
                  )}
                  <span className="font-semibold text-gray-900">6 títulos</span>
                </div>
              </div>
              
              {/* Atual campeão */}
              <div className="text-center">
                <p className="text-sm font-bold text-gray-900 mb-2">Atual campeão da liga:</p>
                <div className="flex items-center justify-center space-x-2">
                  {getTeamImage('Corinthians') ? (
                    <img 
                      src={getTeamImage('Corinthians')} 
                      alt="Corinthians"
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold">
                      C
                    </div>
                  )}
                  <span className="font-semibold text-gray-900">Corinthians</span>
                </div>
              </div>
            </div>
            
            {/* Brasileirão Feminino Série A2 */}
            <div className="flex items-center justify-center space-x-3 mt-24">
              <img 
                src="/assets/icons/brasileiraofem.png" 
                alt="Brasileirão Feminino"
                className="w-16 h-16 object-contain"
              />
              <span className="font-semibold text-gray-900">Brasileirão Feminino Série A2</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
