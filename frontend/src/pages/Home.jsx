import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import { useAuth } from "../hooks/useAuth";
import { apiUrl } from "../config/api";
import HeroBanner from "../components/HeroBanner";
import FeaturedGameCard from "../components/games/FeaturedGameCard";
import GamesSection from "../components/games/GamesSection";
import NewsSection from "../components/news/NewsSection";
import GameModal from "../components/modals/GameModal";
import FavoriteTeamForm from "../components/modals/FavoriteTeamForm";
import FavoriteTeams from "../components/sidebar/FavoriteTeams";
import FantasyBanner from "../components/sidebar/FantasyBanner";
import MainCompetition from "../components/sidebar/MainCompetition";
import CompetitionsList from "../components/sidebar/CompetitionsList";
import RankingsList from "../components/sidebar/RankingsList";
import BestPlayers from "../components/sidebar/BestPlayers";
import StatisticsComparison from "../components/sidebar/StatisticsComparison";
import Toast from "../components/ui/Toast";
import useToast from "../hooks/useToast";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toasts, hideToast, info } = useToast();
  const [games, setGames] = useState([]);
  const { news, loadNews, loading: newsLoading } = useNews();
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [favoriteTeams, setFavoriteTeams] = useState([]);

  useEffect(() => {
    fetch(apiUrl('games'))
      .then((r) => {
        if (!r.ok) throw new Error('Erro ao buscar jogos');
        return r.json();
      })
      .then((data) => {
        setGames(data);
      })
      .catch(() => {
        setGames([]);
      });

    // Carrega notícias usando o contexto (já tem cache)
    loadNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pega o primeiro jogo para destaque
  const featuredGame = games.length > 0 ? games[0] : null;
  const otherGames = games.slice(1);
  const featuredNews = news.length > 0 ? news[0] : null;
  const otherNews = news.slice(1, 5);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-8 sm:pb-12">
      <HeroBanner />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-10 lg:mt-12">
        {/* Left Column - Games and News */}
        <section className="lg:col-span-2 space-y-6 sm:space-y-8">
          <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <FeaturedGameCard 
              game={featuredGame}
              onGameClick={(game) => {
                setSelectedGame(game);
                setShowModal(true);
              }}
            />
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <GamesSection 
              games={otherGames}
              onGameClick={(game) => {
                setSelectedGame(game);
                setShowModal(true);
              }}
            />
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <NewsSection 
              featuredNews={featuredNews}
              otherNews={otherNews}
              loading={newsLoading}
            />
          </div>
        </section>

        {/* Right Column - Sidebar */}
        <aside className="lg:sticky lg:top-6 lg:self-start space-y-4 sm:space-y-5 lg:space-y-6">
          <FantasyBanner />
          <MainCompetition />
          <RankingsList />
          <BestPlayers />
          <CompetitionsList />
          <StatisticsComparison />
          <FavoriteTeams
            teams={favoriteTeams}
            onAdd={() => {
              if (isAuthenticated) {
                setShowFormModal(true);
              } else {
                info('Faça login para adicionar times favoritos', 3000);
                setTimeout(() => navigate('/login'), 1000);
              }
            }}
            onRemove={(id) => setFavoriteTeams(favoriteTeams.filter(t => t.id !== id))}
            isAuthenticated={isAuthenticated}
            onLoginClick={() => navigate('/login')}
          />
        </aside>
      </div>

      <GameModal 
        game={selectedGame}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <FavoriteTeamForm
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={(teamData) => {
          const newTeam = {
            id: Date.now(),
            ...teamData
          };
          setFavoriteTeams([...favoriteTeams, newTeam]);
          setShowFormModal(false);
        }}
      />

      {/* Toast Notifications */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </main>
  );
}
