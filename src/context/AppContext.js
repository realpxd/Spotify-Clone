// context/AppContext.js

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [currentSongFile, setCurrentSongFile] = useState(null);

  const setGlobalCurrentSongFile = (value) => {
    setCurrentSongFile(value);
  };

  const contextValue = {
    currentSongFile,
    setGlobalCurrentSongFile,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
