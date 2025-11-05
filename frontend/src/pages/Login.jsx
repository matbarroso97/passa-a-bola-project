import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, setError, isAuthenticated } = useAuth();
  
  // Redireciona usuário autenticado que já estava na página antes de fazer login
  useEffect(() => {
    if (isAuthenticated && !loading && !showSuccess) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location, loading, showSuccess]);

  // Verifica se o usuário foi redirecionado de uma rota protegida
  const isFromProtectedRoute = location.state?.from?.pathname === '/fantasy';

  // Atualiza campos do formulário e limpa erros quando o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpa erro do campo específico quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Limpa erro geral quando o usuário começa a digitar
    if (error) {
      setError(null);
    }
  };

  // Valida os campos do formulário antes de enviar
  const validateForm = () => {
    const newErrors = {};

    // Validação de email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validação de senha
    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Processa o envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShowSuccess(false);
    
    // Valida formulário antes de prosseguir
    if (!validateForm()) {
      return;
    }

    try {
      // Chama função de login do contexto
      const result = await login(formData.email, formData.password);
      
      // Se login foi bem-sucedido, mostra tela de sucesso e redireciona após 2 segundos
      if (result && result.success !== false) {
        setShowSuccess(true);
        
        setTimeout(() => {
          const from = location.state?.from?.pathname || '/';
          navigate(from);
        }, 2000);
      }
    } catch (err) {
      // Erro já é tratado pelo contexto, apenas não faz nada aqui
      // O erro será exibido através do estado 'error' do contexto
    }
  };

  return (
    <main className="flex items-center justify-center bg-gradient-to-br from-[var(--brand)] to-indigo-600 p-4 sm:p-8 py-8 sm:py-16 min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
        
        <section className="hidden md:flex md:w-1/2 items-center justify-center bg-purple-50">
          <img
            src="/assets/icons/soccer.png"
            alt="Login Illustration"
            className="w-3/4 h-auto"
          />
        </section>

        
        <section className="w-full md:w-1/2 p-6 sm:p-8 bg-white">
          <header>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--brand)] mb-4 sm:mb-6 text-center md:text-left">
              Login
            </h2>
          </header>

          {/* Aviso de credenciais de teste */}
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-yellow-900 mb-2">
                  🔧 Versão de Teste - Credenciais para Login:
                </p>
                <div className="text-sm text-yellow-800 space-y-1">
                  <p><strong>Admin:</strong> admin@passabola.com / 123456</p>
                  <p><strong>Usuário:</strong> user@passabola.com / 123456</p>
                </div>
              </div>
            </div>
          </div>

          {/* Aviso quando vem de rota protegida */}
          {isFromProtectedRoute && (
            <div className="mb-6 p-4 bg-purple-50 border-l-4 border-purple-600 rounded-r-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-900 mb-2">
                    Para acessar o Fantasy você deve fazer o Login
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="text-sm text-purple-600 hover:text-purple-800 underline font-medium"
                  >
                    ← Voltar para Home sem fazer login
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-center md:justify-start gap-3 mb-6">
            <button className="flex items-center justify-center border rounded px-3 py-2 w-10 h-10 hover:bg-gray-100">
              <span className="text-lg font-bold">G</span>
            </button>
            <button className="flex items-center justify-center border rounded px-3 py-2 w-10 h-10 text-blue-600 font-bold hover:bg-gray-100">
              f
            </button>
            <button className="flex items-center justify-center border rounded px-3 py-2 w-10 h-10 text-blue-700 font-bold hover:bg-gray-100">
              in
            </button>
          </div>

          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Erro geral */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Digite seu email"
                required
                disabled={loading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Digite sua senha"
                required
                disabled={loading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            
            <div className="flex flex-col sm:flex-row justify-between text-sm text-[var(--brand)] gap-2 sm:gap-0">
              <a href="#" className="hover:underline text-center sm:text-left">
                Esqueceu a senha?
              </a>
              <a href="#" className="hover:underline text-center sm:text-right">
                Não tem uma conta?
              </a>
            </div>

            
            <button
              type="submit"
              disabled={loading}
              className="w-full header-brand hover:bg-purple-600 text-white py-2 rounded font-bold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </section>
      </div>
      
      {/* Tela de Sucesso */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="success-title">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 text-center animate-pulse">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 id="success-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Login realizado com sucesso!</h2>
              <p className="text-gray-600 mb-4">Bem-vindo ao Passa a Bola!</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                <span className="ml-2">Redirecionando...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}