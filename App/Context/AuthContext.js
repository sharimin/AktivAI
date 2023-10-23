import React, { createContext, useState } from 'react';

// Create a new context called AuthContext
export const AuthContext = createContext();

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
  // Define the initial value for the userData state
  const [userData, setUserData] = useState(null);

  // Return the AuthContext.Provider component
  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
