import React, { useState } from "react";
import Find from "../../images/find.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const [searchFilmValue, setSearchFilmValue] = useState("");
  const [searchFilmError, setSearchFilmError] = useState(
    "Нужно ввести ключевое слово"
  );
  const [searchFilmDirty, setSearchFilmDirty] = useState(false);

  function handleChangeSearchFilm(e) {
    setSearchFilmValue(e.target.value);
    if (!e.target.validity.valid && e.target.value.length === 0) {
      setSearchFilmError("Нужно ввести ключевое слово");
    } else {
      setSearchFilmError("");
    }
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      props.enterHandler(searchFilmValue);
    }
  }

  function blurHandler(e) {
    switch (e.target.name) {
      case "searchmovie":
        setSearchFilmDirty(true);
        break;
      default:
        break;
    }
  }

  return (
    <div className="search__container">
      <form className="search-form" name="formsearchmovie">
        <input
          className="search-form__input"
          type="text"
          id="movie"
          name="searchmovie"
          minLength="2"
          maxLength="40"
          placeholder="Фильм"
          onChange={handleChangeSearchFilm}
          onKeyUp={handleEnter}
          onBlur={blurHandler}
          value={searchFilmValue || ""}
          required
        />
        {searchFilmDirty && searchFilmError && (
          <div className="error-form error-form__search">{searchFilmError}</div>
        )}
        <button
          className="search-form__btn"
          type="button"
          onClick={() => props.enterHandler(searchFilmValue)}
        >
          <img className="search-form__btn-find" src={Find} alt="Поиск" />
        </button>
      </form>
      {props.pathMovies && (
        <FilterCheckbox
          checkShort={props.checkShortFilms}
          onChecked={props.onCheckedFilms}
        />
      )}
      {props.pathMoviesSave && (
        <FilterCheckbox
          checkShort={props.checkShortFilmsSave}
          onChecked={props.onCheckedSaveFilms}
        />
      )}
    </div>
  );
}

export default SearchForm;
