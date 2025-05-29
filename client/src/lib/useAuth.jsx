import { createContext, useContext, useEffect, useState } from 'react';
import axios from './axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {data} = await axios.get('/users/profile', {
          withCredentials: true,
        });
        console.log(data);
        if(data.success === false) {
          console.log('Not authenticated');
          setUser(null);
          return;
        }
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    await axios.post('users/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
