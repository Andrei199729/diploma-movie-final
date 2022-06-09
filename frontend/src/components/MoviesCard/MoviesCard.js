import React, { useCallback, useEffect, useState } from "react";

function MoviesCard(props) {
  const [isCardLikeClicked, setIsCardLikeClicked] = useState(true);

  const setLikes = useCallback(() => {
    const likesCard = props.saveMovies.find(
      (movie) => movie.movieId === props.id
    );
    if (likesCard) {
      setIsCardLikeClicked(true);
    } else {
      setIsCardLikeClicked(false);
    }
  }, [props.id, props.saveMovies]);

  useEffect(() => {
    setLikes();
  }, [setLikes]);

  const movieButtonLikeClassName = `movies-card__like ${
    isCardLikeClicked ? "movies-card__like_active" : ""
  }`;

  const movieButtonDeleteClassName = `movies-card__cross`;
  function handleLikeClick(evt) {
    evt.stopPropagation();
    if (!isCardLikeClicked) {
      props.onSaveMovie({
        country: props.country || "default",
        director: props.director,
        duration: props.duration,
        year: props.year,
        description: props.description,
        image: props.image.url
          ? `https://api.nomoreparties.co/${props.image.url}`
          : "https://www.youtube.com",
        trailerLink: props.trailerLink,
        movieId: props.id,
        nameRU: props.nameRU,
        nameEN: props.nameEN,
        thumbnail: props.image.formats.thumbnail.url
          ? `https://api.nomoreparties.co/${props.image.formats.thumbnail.url}`
          : "https://www.youtube.com",
        owner: props.owner,
      });
      setIsCardLikeClicked(true);
    } else {
      const saveCard = props.saveMovies.find(
        (movie) => movie.movieId === props.id
      );
      props.handleDeleteSaveMovie(saveCard);
      setIsCardLikeClicked(false);
    }
  }

  function handleDeleteClick(evt) {
    props.handleDeleteSaveMovie(props);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "м";
  }
  const style = {
    textDecoretion: "none",
  };
  return (
    <article className="movies-card">
      <a
        className={style}
        href={props.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="movies-card__image"
          src={
            !props.pathSavedMovies
              ? `https://api.nomoreparties.co/${props.image.url}`
              : props.image
          }
          alt={props.nameRU}
        />
      </a>
      <div className="movies-card__text">
        <div className="movies-card__row">
          <h2 className="movies-card__title">{props.nameRU}</h2>
          <button
            className={
              props.pathSavedMovies
                ? movieButtonDeleteClassName
                : movieButtonLikeClassName
            }
            type="button"
            onClick={
              props.pathSavedMovies ? handleDeleteClick : handleLikeClick
            }
          ></button>
        </div>
        <p className="movies-card__time">{getTimeFromMins(props.duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
