import { createContext, useContext, useReducer } from "react";
const initialState = {
  categories: [],
  availabilities: [],

  sizes: [],
  maxPrice: null,

  error: "",
};

function reducer(state, action) {
  //   console.log(action);
  switch (action.type) {
    case "filters/editCategory":
      if (state.categories.includes(action.payload))
        return {
          ...state,
          categories: state.categories.filter(
            (category) => category !== action.payload
          ),
        };
      return {
        ...state,

        categories: [...state.categories, action.payload],
      };
    case "filters/editAvailability":
      if (state.availabilities.includes(action.payload))
        return {
          ...state,
          availabilities: state.availabilities.filter(
            (availability) => availability !== action.payload
          ),
        };
      return {
        ...state,

        availabilities: [...state.availabilities, action.payload],
      };
    case "filters/editSize":
      if (state.sizes.includes(action.payload))
        return {
          ...state,
          sizes: state.sizes.filter((size) => size !== action.payload),
        };
      return {
        ...state,

        sizes: [...state.sizes, action.payload],
      };
    case "filters/editMaxPrice":
      return {
        ...state,
        maxPrice: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

const FiltersContext = createContext();
function FiltersProvider({ children }) {
  const [{ categories, availabilities, sizes, maxPrice, error }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <FiltersContext.Provider
      value={{ categories, availabilities, sizes, maxPrice, error, dispatch }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

const useFilters = function () {
  const context = useContext(FiltersContext);
  if (context === undefined)
    throw new Error("You used Context out of its Provider");
  return context;
};
export { FiltersProvider, useFilters };
