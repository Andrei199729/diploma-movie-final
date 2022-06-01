import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {
  return (
    <div className="movies">
      <SearchForm
        enterHandler={props.handleSearchSaveMovie}
        checkShortFilms={props.checkShortFilms}
        onChecked={props.onChecked}
      />
      {props.loaded ? (
        <Preloader />
      ) : (
        <MoviesCardList
          saveMovies={
            props.isFiltered ? props.saveFilterSaveMovies : props.saveMovies
          }
          handleDeleteSaveMovie={props.handleDeleteSaveMovie}
          shortMovies={
            props.isFiltered ? props.filterShortSaveMovies : props.shortMovies
          }
          onSaveMovie={props.handleSaveMovie}
          onChecked={props.onChecked}
        />
      )}
    </div>
  );
}

export default SavedMovies;
