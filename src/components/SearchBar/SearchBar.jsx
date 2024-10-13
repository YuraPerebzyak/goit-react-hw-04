import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchText.trim() === "") {
      toast.error("Enter your request");
      return;
    }
    onSubmit(searchText);
    setSearchText("");
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchText}
          onChange={(evt) => setSearchText(evt.target.value)}
        />
        <button className={css.search_button} type="submit"></button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
