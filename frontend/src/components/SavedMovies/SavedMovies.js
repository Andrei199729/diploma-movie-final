import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {
  return (
    <div className="movies">
      <SearchForm
        enterHandler={props.handleSearchSaveMovie}
        checkShortFilmsSave={props.checkShortFilmsSave}
        onCheckedSaveFilms={props.onCheckedSaveFilms}
        pathMoviesSave={props.pathMoviesSave}
      />
      {props.loaded ? (
        <Preloader />
      ) : (
        <MoviesCardList
          saveMovies={
            props.isFilteredSave ? props.saveFilterSaveMovies : props.saveMovies
          }
          handleDeleteSaveMovie={props.handleDeleteSaveMovie}
          shortMovies={props.shortMovies}
          onSaveMovie={props.handleSaveMovie}
          onChecked={props.onCheckedSaveFilms}
        />
      )}
    </div>
  );
}

export default SavedMovies;
