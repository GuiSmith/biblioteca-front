import { createContext, useState, useEffect, useContext } from 'react';
import API from '@servicos/API'; // Seu serviço de API

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Checa a autenticação na montagem inicial (uma vez)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await API.auth(); // Sua função de checagem na API
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Funções simples para ATUALIZAR o estado do contexto
  // As chamadas à API são feitas nas páginas de Login/Logout
  const handleLoginSuccess = ({ token, authType }) => {
    setIsAuthenticated(true);
    API.setToken(token);
    API.setAuthType(authType);
  };

  const handleLogoutSuccess = () => {
    setIsAuthenticated(false);
    API.setToken(''); // Limpa o token no serviço de API
    API.setAuthType(''); // Limpa o tipo de autenticação
    // O redirecionamento seria feito no componente que chama handleLogoutSuccess
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, handleLoginSuccess, handleLogoutSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);