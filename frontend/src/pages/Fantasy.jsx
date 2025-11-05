import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import FantasyBanner from "../components/fantasy/FantasyBanner";
import HowItWorks from "../components/fantasy/HowItWorks";
import CompetitionSelector from "../components/fantasy/CompetitionSelector";
import StatsCards from "../components/fantasy/StatsCards";
import CompetitionCard from "../components/fantasy/CompetitionCard";
import Leaderboard from "../components/fantasy/Leaderboard";

export default function Fantasy() {
  const [selectedCompetition, setSelectedCompetition] = useState('brasileirao');
  const [leaderboard, setLeaderboard] = useState([]);
  const [layout, setLayout] = useState('grid'); // 'grid' ou 'list'
  const [showDashboard, setShowDashboard] = useState(false); // Controla se o dashboard de gráficos está visível
  const [stats, setStats] = useState({
    totalParticipants: 1234,
    totalPrize: 500,
    myPosition: null,
    myPoints: 0
  });

  // Dados para gráficos
  const chartData = [
    { name: 'Sem 1', pontos: 240, média: 220 },
    { name: 'Sem 2', pontos: 280, média: 250 },
    { name: 'Sem 3', pontos: 320, média: 280 },
    { name: 'Sem 4', pontos: 290, média: 270 },
    { name: 'Sem 5', pontos: 350, média: 300 },
  ];

  const pieData = [
    { name: 'Vitórias', value: 65, color: '#10b981' },
    { name: 'Empates', value: 25, color: '#f59e0b' },
    { name: 'Derrotas', value: 10, color: '#ef4444' },
  ];

  const barData = [
    { jogadora: 'Jogadora A', gols: 12, assistências: 8 },
    { jogadora: 'Jogadora B', gols: 10, assistências: 10 },
    { jogadora: 'Jogadora C', gols: 9, assistências: 12 },
    { jogadora: 'Jogadora D', gols: 8, assistências: 6 },
  ];

  const competitions = [
    { id: 'brasileirao', name: 'Brasileirão Feminino', color: 'purple', participants: 1234, prize: 500 },
    { id: 'libertadores', name: 'Libertadores Feminina', color: 'yellow', participants: 856, prize: 300 },
    { id: 'champions', name: 'Champions League', color: 'blue', participants: 2156, prize: 800 },
  ];

  useEffect(() => {
    // Simular carregamento de dados do ranking
    const mockLeaderboard = [
      { id: 1, name: 'João Silva', photo: '/assets/icons/joaosilvafantasy.jpg', team: 'Equipe Corinthians FC', points: 2847, competition: 'brasileirao' },
      { id: 2, name: 'Maria Silva', photo: '/assets/icons/mariasilvafantasy.jpg', team: 'Flamengo Ladies', points: 2734, competition: 'brasileirao' },
      { id: 3, name: 'Pedro Costa', photo: '/assets/icons/pedrocostafantasy.jpg', team: 'Palmeiras Girls', points: 2691, competition: 'brasileirao' },
      { id: 4, name: 'Ana Oliveira', photo: '/assets/icons/anaoliveirafantasy.jpg', team: 'São Paulo FC', points: 2650, competition: 'brasileirao' },
      { id: 5, name: 'Carlos Souza', photo: '/assets/icons/carlosouzafantasy.jpg', team: 'Cruzeiro Stars', points: 2612, competition: 'brasileirao' },
    ];

    // Filtrar por competição selecionada
    // Se for libertadores ou champions, não há dados ainda
    if (selectedCompetition === 'libertadores' || selectedCompetition === 'champions') {
      setLeaderboard([]);
    } else {
      const filtered = mockLeaderboard.filter(item => item.competition === selectedCompetition);
      setLeaderboard(filtered);
    }

    // Atualizar estatísticas
    const comp = competitions.find(c => c.id === selectedCompetition);
    if (comp) {
      setStats({
        totalParticipants: comp.participants,
        totalPrize: comp.prize,
        myPosition: 12,
        myPoints: 2450
      });
    }
  }, [selectedCompetition]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Fantasy</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Transforme seu conhecimento em resultado! Crie sua equipe ideal e dispute com outros fãs do futebol feminino.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <FantasyBanner onStart={() => {
            // Funcionalidade de criação de equipe será implementada em breve
            alert('Funcionalidade de criação de equipe será implementada em breve!');
          }} />
          <HowItWorks />
        </section>

          {/* Dashboard Dinâmico */}
          <section className="mt-8 sm:mt-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Dashboard</h3>
            
            <CompetitionSelector
              competitions={competitions}
              selectedCompetition={selectedCompetition}
              onSelect={setSelectedCompetition}
            />

            <StatsCards stats={stats} />

            {/* Competições Disponíveis */}
            <div className="mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center">Competições Disponíveis</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {competitions.map((comp) => (
                  <CompetitionCard
                    key={comp.id}
                    competition={comp}
                    isSelected={selectedCompetition === comp.id}
                    onSelect={() => setSelectedCompetition(comp.id)}
                  />
                ))}
              </div>
            </div>
          </section>

        {/* Botão para Ver Estatísticas de Desempenho */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg shadow-md"
          >
            {showDashboard ? 'Ocultar Estatísticas de Desempenho' : 'Ver Minhas Estatísticas de Desempenho'}
          </button>
        </div>

        {/* Dashboard de Gráficos Dinâmicos */}
        {showDashboard && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Estatísticas de Desempenho</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setLayout('grid')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    layout === 'grid' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    layout === 'list' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Lista
                </button>
              </div>
            </div>

          {layout === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Linha - Evolução de Pontos */}
              <Card>
                <CardHeader>
                  <CardTitle>Evolução de Pontos</CardTitle>
                  <CardDescription>Seus pontos ao longo das semanas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ pontos: { label: "Pontos", color: "hsl(var(--chart-1))" }, média: { label: "Média", color: "hsl(var(--chart-2))" } }}>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="pontos" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                        <Line type="monotone" dataKey="média" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Pizza - Distribuição de Resultados */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Resultados</CardTitle>
                  <CardDescription>Vitórias, Empates e Derrotas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Barras - Performance das Jogadoras */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Performance das Jogadoras</CardTitle>
                  <CardDescription>Gols e Assistências</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ gols: { label: "Gols", color: "hsl(var(--chart-1))" }, assistências: { label: "Assistências", color: "hsl(var(--chart-3))" } }}>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="jogadora" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="gols" fill="hsl(var(--chart-1))" />
                        <Bar dataKey="assistências" fill="hsl(var(--chart-3))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Gráfico de Linha - Evolução de Pontos */}
              <Card>
                <CardHeader>
                  <CardTitle>Evolução de Pontos</CardTitle>
                  <CardDescription>Seus pontos ao longo das semanas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ pontos: { label: "Pontos", color: "hsl(var(--chart-1))" }, média: { label: "Média", color: "hsl(var(--chart-2))" } }}>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="pontos" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                        <Line type="monotone" dataKey="média" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Pizza - Distribuição de Resultados */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Resultados</CardTitle>
                  <CardDescription>Vitórias, Empates e Derrotas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Barras - Performance das Jogadoras */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance das Jogadoras</CardTitle>
                  <CardDescription>Gols e Assistências</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ gols: { label: "Gols", color: "hsl(var(--chart-1))" }, assistências: { label: "Assistências", color: "hsl(var(--chart-3))" } }}>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="jogadora" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="gols" fill="hsl(var(--chart-1))" />
                        <Bar dataKey="assistências" fill="hsl(var(--chart-3))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          )}
          </div>
        )}

        {/* Leaderboard Preview - Dinâmico */}
        <section className="mt-8 sm:mt-12 bg-white rounded-xl shadow-sm p-4 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Ranking - {competitions.find(c => c.id === selectedCompetition)?.name || 'Brasileirão Feminino'}
          </h3>
          <Leaderboard 
            leaderboard={leaderboard}
            competitionName={competitions.find(c => c.id === selectedCompetition)?.name || 'Brasileirão Feminino'}
          />
        </section>
      </div>
    </main>
  );
}



