import { createContext, useContext, useState } from "react";

const SearchResultsContext = createContext();
function SearchResultsProvider({ children }) {
  const [searchResults, setSearchResults] = useState(null);
  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
}

const useSearchResults = function () {
  const context = useContext(SearchResultsContext);
  if (context === undefined)
    throw new Error("You used Context out of its Provider");
  return context;
};
export { SearchResultsProvider, useSearchResults };
