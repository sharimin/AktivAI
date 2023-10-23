import React, { createContext, useState } from 'react';



// Create a new context called AuthContext
export const UserContext = createContext(null);

// Define the AuthProvider component
export const UserProvider = ({ children }) => {
  // Define the initial value for the userData state
  const [userData, setUserData] = useState(null);

  // Return the AuthContext.Provider component
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

