import { createContext, useContext, useState } from "react";

const CurrentUserContext = createContext();
function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

const useCurrentUser = function () {
  const context = useContext(CurrentUserContext);
  if (context === undefined)
    throw new Error("You used Context out of its Provider");
  return context;
};
export { CurrentUserProvider, useCurrentUser };
