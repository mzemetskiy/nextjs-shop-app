import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const cartState = useState([])
    let sharedState = cartState

    return (
      <AppContext.Provider value={sharedState}>
          {children}
      </AppContext.Provider>
    );
}

export function useAppContext() {
  return useContext(AppContext);
}