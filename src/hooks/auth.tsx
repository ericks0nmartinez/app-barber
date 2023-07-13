import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface FindPhoneCustomer {
  phone?: string;
}

interface SignCredentials {
  name: string;
  phone: string;
}

interface AuthContextData {
  user: object;
  schedulingService(credentials: SignCredentials): Promise<void>;
  findPhoneCustomer(phone: FindPhoneCustomer): Promise<void>;
  singOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const schedulingService = useCallback(
    async ({ name, phone }) => {
      const response = await api.post('customer', {
        name,
        phone
      });

      const { token, user } = response.data;

      setData({ token, user });

      console.log(response.data);
    },
    [],
  );

  const findPhoneCustomer = useCallback(async ({ phone }: FindPhoneCustomer): Promise<void> => {
    await api.get(`customer/${phone}`);
  }, []);

  const singOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, schedulingService, findPhoneCustomer, singOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
