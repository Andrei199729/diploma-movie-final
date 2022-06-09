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
        setIsFiltered={props.setIsFiltered}
        valueSearch={props.valueSearch}
      />
      {props.loaded ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={props.isFiltered ? props.filterMovies : props.movies}
          shortMovies={props.shortMovies}
          onSaveMovie={props.handleSaveMovie}
          saveMovies={props.saveMovies}
          handleDeleteSaveMovie={props.handleDeleteSaveMovie}
          onChecked={props.onCheckedFilms}
          filterMovies={props.filterMovies}
        />
      )}
    </div>
  );
}

export default Movies;
