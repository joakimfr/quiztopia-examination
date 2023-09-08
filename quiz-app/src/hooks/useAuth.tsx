import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth måste användas inom en AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('userToken') !== null);

  useEffect(() => {
    const localStorageChangeHandler = () => {
      setIsLoggedIn(localStorage.getItem('userToken') !== null);
    };

    window.addEventListener('storage', localStorageChangeHandler);

    return () => {
      window.removeEventListener('storage', localStorageChangeHandler);
    };
  }, []);

  const logout = () => {
   
    localStorage.removeItem('userToken');
    localStorage.removeItem('loggedInUsername')
    setIsLoggedIn(false);
  
  };

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
