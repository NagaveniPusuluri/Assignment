import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [cocktail, setCocktail] = useState([]);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchItem}`);
      const data = await response.json();
      const { drinks } = data;

      setCocktail(drinks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [searchItem]);
  useEffect(() => {
    fetchData();
  }, [searchItem, fetchData]);

  return (
    <AppContext.Provider
      value={{ loading, setSearchItem, searchItem, cocktail }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
