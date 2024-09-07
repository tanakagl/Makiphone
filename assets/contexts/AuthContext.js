import React, {createContext, useState, useEffect, useMemo} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [sendAuth, setSendAuth] = useState(false);
  const [authData, setAuthData] = useState({
    username: '',
    endpoint: '',
    password: '',
    server: '',
    port: '',
    protocol: '',
  });

  const handleSubmit = () => {
    save('authData', authData);
    setSendAuth(prevState => !prevState);
  };

  const save = async (key, value) => {
    try {
      await EncryptedStorage.setItem(key, JSON.stringify(value));
      console.log(`Dados salvos com sucesso para a chave ${key}`);
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedAuthData = await EncryptedStorage.getItem('authData');
        if (savedAuthData) {
          setAuthData(JSON.parse(savedAuthData));
          // Caso tenha dados salvos ele já tenta logar
          setSendAuth(prevState => !prevState);
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados salvos:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setAuthData(prevAuthData => ({
      ...prevAuthData,
      [field]: value,
    }));
  };

  const contextValues = useMemo(
    () => ({
      authData,
      handleInputChange,
      handleSubmit,
      sendAuth,
    }),
    [authData, sendAuth],
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
