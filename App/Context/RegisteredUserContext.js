import { createContext, useContext, useState } from 'react';

export const RegisteredUserContext = createContext();

export const RegisteredUserProvider = ({ children }) => {
  const [registeredUserData, setRegisteredUserData] = useState(null);

  return (
    <RegisteredUserContext.Provider value={{ registeredUserData, setRegisteredUserData }}>
      {children}
    </RegisteredUserContext.Provider>
  );
};

export const useRegisteredUserData = () => useContext(RegisteredUserContext);
