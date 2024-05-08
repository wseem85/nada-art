import { createContext, useContext, useState } from "react";

const StoredCartContext = createContext();
function StoredCartProvider({ children }) {
  const [storedCart, setStoredCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  return (
    <StoredCartContext.Provider value={{ storedCart, setStoredCart }}>
      {children}
    </StoredCartContext.Provider>
  );
}

const useStoredCart = function () {
  const context = useContext(StoredCartContext);
  if (context === undefined)
    throw new Error("You used Context out of its Provider");

  return context;
};
export { StoredCartProvider, useStoredCart };
