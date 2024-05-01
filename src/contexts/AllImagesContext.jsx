import { createContext, useContext, useState } from "react";

const AllImagesContext = createContext();
function AllImagesProvider({ children }) {
  const [allImages, setAllImages] = useState([]);
  return (
    <AllImagesContext.Provider value={{ allImages, setAllImages }}>
      {children}
    </AllImagesContext.Provider>
  );
}

const useAllImages = function () {
  const context = useContext(AllImagesContext);
  if (context === undefined)
    throw new Error("You used Context out of its Provider");
  return context;
};
export { AllImagesProvider, useAllImages };
