import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { NewsProvider } from './contexts/NewsContext.jsx'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Jogos from './pages/Jogos.jsx'
import Tabela from './pages/Tabela.jsx'
import Noticias from './pages/Noticias.jsx'
import Fantasy from './pages/Fantasy.jsx'
import Login from './pages/Login.jsx'

export default function App() {
  return (
    <AuthProvider>
      <NewsProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/jogos' element={<Jogos/>} />
            <Route path='/tabela' element={<Tabela/>} />
            <Route path='/noticias' element={<Noticias/>} />
            <Route path='/fantasy' element={
              <ProtectedRoute>
                <Fantasy/>
              </ProtectedRoute>
            } />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </Layout>
      </NewsProvider>
    </AuthProvider>
  )
}
