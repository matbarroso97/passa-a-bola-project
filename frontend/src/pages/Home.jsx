import React, { useEffect, useState } from "react";
import { useNews } from "../hooks/useNews";
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

export default function Home() {
  const [games, setGames] = useState([]);
  const { news, loadNews, loading: newsLoading } = useNews();
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [favoriteTeams, setFavoriteTeams] = useState([]);

  useEffect(() => {
    fetch(apiUrl('games'))
      .then((r) => r.json())
      .then((data) => {
        setGames(data);
      })
      .catch((err) => {
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <HeroBanner />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Games and News */}
        <section className="lg:col-span-2 space-y-4 sm:space-y-6">
          <FeaturedGameCard 
            game={featuredGame}
            onGameClick={(game) => {
              setSelectedGame(game);
              setShowModal(true);
            }}
          />

          <GamesSection 
            games={otherGames}
            onGameClick={(game) => {
              setSelectedGame(game);
              setShowModal(true);
            }}
          />

          <NewsSection 
            featuredNews={featuredNews}
            otherNews={otherNews}
            loading={newsLoading}
          />
        </section>

        {/* Right Column - Sidebar */}
        <aside className="lg:sticky lg:top-4 lg:self-start space-y-3 sm:space-y-4">
          <FantasyBanner />
          <MainCompetition />
          <RankingsList />
          <BestPlayers />
          <CompetitionsList />
          <StatisticsComparison />
          <FavoriteTeams
            teams={favoriteTeams}
            onAdd={() => setShowFormModal(true)}
            onRemove={(id) => setFavoriteTeams(favoriteTeams.filter(t => t.id !== id))}
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
        }}
      />
    </main>
  );
}
