import { createContext, useContext, useState } from "react";

const AppNavContext = createContext();
function AppNavProvider({ children }) {
  const [collapsed, setCollapsed] = useState(() => {
    return window.innerWidth <= 768 ? true : false;
  });
  const [cartIsOpen, setCartIsOpen] = useState(false);
  return (
    <AppNavContext.Provider
      value={{ collapsed, setCollapsed, cartIsOpen, setCartIsOpen }}
    >
      {children}
    </AppNavContext.Provider>
  );
}

const useAppNav = function () {
  const context = useContext(AppNavContext);
  if (context === undefined)
    throw new Error("You used Context out of its Provider");
  return context;
};
export { AppNavProvider, useAppNav };
