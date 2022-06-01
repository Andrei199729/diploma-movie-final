import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
  return (
    <div className="movies">
      <SearchForm
        movies={props.movies}
        enterHandler={props.handleEnter}
        checkShortFilms={props.checkShortFilms}
        onChecked={props.onChecked}
      />
      {props.loaded ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={props.isFiltered ? props.filterMovies : props.movies}
          shortMovies={
            props.isFiltered ? props.filterShortMovies : props.shortMovies
          }
          onSaveMovie={props.handleSaveMovie}
          saveMovies={props.saveMovies}
          handleDeleteSaveMovie={props.handleDeleteSaveMovie}
          onChecked={props.onChecked}
        />
      )}
    </div>
  );
}

export default Movies;
