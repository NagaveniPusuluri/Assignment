import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchItem } = useGlobalContext();
  const inputRef = React.useRef("");

  

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);
  const searchCocktail = () => {
    setSearchItem(inputRef.current.value);
  };
  return (
    <section className="section search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-control">
          <input
            type="text"
            placeholder="Choose your best Cocktail"
            name="name"
            id="name"
            ref={inputRef}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;