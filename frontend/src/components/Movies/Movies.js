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
        onCheckedFilms={props.onCheckedFilms}
        pathMovies={props.pathMovies}
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
          onChecked={props.onCheckedFilms}
        />
      )}
    </div>
  );
}

export default Movies;
