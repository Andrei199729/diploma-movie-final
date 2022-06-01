import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconProfile from "../../images/icon-profile.svg";
import { useLocation } from "react-router-dom";
import Logo from "../../images/logo.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Navigation(props) {
  const location = useLocation();
  const landing = location.pathname === "/";
  const [checkedBurger, setCheckedBurger] = useState(false);

  const soldCheckbox = ({ target: { checked } }) => {
    setCheckedBurger(checked);
  };

  function close() {
    setCheckedBurger(false);
  }

  const put = (
    <Link className="navigation__btn navigation__btn-entrance" to="/signin">
      Вход
    </Link>
  );
  const register = (
    <Link className="navigation__btn navigation__btn-registration" to="/signup">
      Регистрация
    </Link>
  );
  const logo = (
    <Link to="/">
      <img className="logo navigation__logo" src={Logo} alt="logo" />
    </Link>
  );
  const movies = (
    <Link
      className="navigation__btn navigation__btn-movies"
      to="/movies"
      onClick={close}
    >
      Фильмы
    </Link>
  );
  const saveMovies = (
    <Link
      className="navigation__btn navigation__btn-save"
      to="/saved-movies"
      onClick={close}
    >
      Сохранённые фильмы
    </Link>
  );
  const account = (
    <Link
      className="navigation__btn navigation__btn-icon-profile"
      to="/profile"
      onClick={close}
    >
      Аккаунт
      <img className="navigation__btn-icon" src={IconProfile} alt="Профиль" />
    </Link>
  );
  const home = (
    <Link
      className="navigation__btn navigation__btn-home"
      to="/"
      onClick={close}
    >
      Главная
    </Link>
  );
  return (
    <>
      {landing ? (
        <div className="navigation__row">
          <div className="navigation__row-container">
            {logo}
            <>
              {props.loggedIn ? (
                <>
                  <div className="navigation__container">
                    {movies}
                    {saveMovies}
                  </div>
                  <div className="navigation__container">{account}</div>
                  <BurgerMenu
                    movies={movies}
                    saveMovies={saveMovies}
                    account={account}
                    home={home}
                    checkedBurger={checkedBurger}
                    onCheckedBurger={soldCheckbox}
                  />
                </>
              ) : (
                <div>
                  {register}
                  {put}
                </div>
              )}
            </>
          </div>
        </div>
      ) : (
        <div className="navigation__row">
          <div className="navigation__row-container">
            {logo}
            <div className="navigation__container">
              {movies}
              {saveMovies}
            </div>
            <div className="navigation__container">{account}</div>
          </div>
          <BurgerMenu
            movies={movies}
            saveMovies={saveMovies}
            account={account}
            home={home}
            checkedBurger={checkedBurger}
            onCheckedBurger={soldCheckbox}
          />
        </div>
      )}
    </>
  );
}

export default Navigation;
