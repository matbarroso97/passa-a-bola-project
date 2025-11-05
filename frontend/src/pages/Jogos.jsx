// src/pages/Jogos.jsx
import React, { useEffect, useState } from "react";
import Dropdown from '../components/Dropdown';
import DateNavigation from '../components/games/DateNavigation';
import CompetitionHeader from '../components/games/CompetitionHeader';
import GameList from '../components/games/GameList';
import GameModal from '../components/modals/GameModal';
import { apiUrl } from '../config/api';

export default function Jogos() {
  const [games, setGames] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState('brasileirao');
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const competitionOptions = [
    { value: 'brasileirao', label: 'Brasileirão Feminino', icon: '/assets/icons/brasileiraofem.png' },
    { value: 'libertadores', label: 'Libertadores Feminina', icon: '/assets/icons/libertadores.png' },
    { value: 'uefa', label: 'UEFA Women\'s Champions League', icon: '/assets/icons/uefawomen.png' },
    { value: 'fa', label: 'FA Women\'s Super League', icon: '/assets/icons/fawomen.png' },
    { value: 'primera', label: 'Primera División Femenina', icon: '/assets/icons/primeradivision.png' },
    { value: 'division1', label: 'Division 1 Féminine', icon: '/assets/icons/division1fem.png' },
  ];

  // Mapeamento de jornadas por competição
  const competitionRounds = {
    brasileirao: 13,
    libertadores: 5,
    uefa: 8,
    fa: 12,
    primera: 15,
    division1: 10,
  };


  useEffect(() => {
    // Simular diferentes jogos para cada competição
    const mockGamesByCompetition = {
      brasileirao: [
        { id: 1, home: "Internacional", away: "Corinthians", score: "2 x 1" },
        { id: 2, home: "Flamengo", away: "America-MG", score: "0 x 0" },
        { id: 3, home: "Palmeiras", away: "São Paulo", score: "3 x 1" },
        { id: 4, home: "Corinthians", away: "Flamengo", score: "2 x 2" },
      ],
      libertadores: [
        { id: 5, home: "Corinthians", away: "São Paulo", score: "1 x 0" },
        { id: 6, home: "Flamengo", away: "Palmeiras", score: "2 x 1" },
        { id: 7, home: "Fluminense", away: "Internacional", score: "3 x 0" },
      ],
      uefa: [
        { id: 8, home: "Barcelona", away: "Lyon", score: "2 x 1" },
        { id: 9, home: "Chelsea", away: "PSG", score: "1 x 1" },
        { id: 10, home: "Arsenal", away: "Wolfsburg", score: "3 x 2" },
      ],
      fa: [
        { id: 11, home: "Manchester City", away: "Chelsea", score: "2 x 0" },
        { id: 12, home: "Arsenal", away: "Manchester United", score: "1 x 1" },
        { id: 13, home: "Liverpool", away: "Tottenham", score: "2 x 3" },
      ],
      primera: [
        { id: 14, home: "Barcelona", away: "Real Madrid", score: "1 x 0" },
        { id: 15, home: "Atlético Madrid", away: "Valencia", score: "2 x 1" },
      ],
      division1: [
        { id: 16, home: "Lyon", away: "PSG", score: "1 x 2" },
        { id: 17, home: "Olympique Marseille", away: "Monaco", score: "3 x 1" },
      ],
    };

    // Se for brasileirão, tenta buscar da API, senão usa dados simulados
    if (selectedCompetition === 'brasileirao') {
      fetch(apiUrl('games'))
        .then((r) => r.json())
        .then((data) => {
          setGames(data.length > 0 ? data : mockGamesByCompetition.brasileirao);
        })
        .catch((err) => {
          setGames(mockGamesByCompetition.brasileirao);
        });
    } else {
      // Para outras competições, usa dados simulados
      setGames(mockGamesByCompetition[selectedCompetition] || []);
    }
  }, [selectedCompetition]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 bg-white">
      <div className="space-y-4 sm:space-y-6">
        {/* Conteúdo principal */}
        <div className="space-y-4 sm:space-y-6">
          {/* Jogos */}
          <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Jogos</h2>
            
            {/* Competition Filter */}
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:space-x-4 w-full sm:w-auto">
                  <label htmlFor="competition-select" className="text-sm font-medium text-gray-700">Competição:</label>
                  <Dropdown
                    options={competitionOptions}
                    value={selectedCompetition}
                    onChange={setSelectedCompetition}
                    placeholder="Selecione uma competição"
                    icon={competitionOptions.find(opt => opt.value === selectedCompetition)?.icon}
                  />
                </div>
                <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-80">
                  <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-sm text-gray-500 truncate">Pesquisar por Campeonatos/Times</span>
                  <svg className="w-4 h-4 text-gray-500 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <DateNavigation currentDate="Hoje" />

            <CompetitionHeader
              icon={competitionOptions.find(opt => opt.value === selectedCompetition)?.icon || '/assets/icons/brasileiraofem.png'}
              name={competitionOptions.find(opt => opt.value === selectedCompetition)?.label || 'Brasileirão Feminino'}
              round={competitionRounds[selectedCompetition] || 13}
            />

            <GameList 
              games={games} 
              onGameClick={(game) => {
                setSelectedGame(game);
                setShowModal(true);
              }}
            />
            
            {/* Linha horizontal entre jogos e "Ver todos os jogos" */}
            <div className="w-full h-px bg-purple-800 mt-4"></div>

            <div className="mt-6 text-right">
              <a href="#" className="text-purple-600 font-semibold hover:underline">
                Ver todos os jogos →
              </a>
            </div>
          </section>
        </div>
      </div>

      <GameModal 
        game={selectedGame}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
}
