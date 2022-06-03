/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Error from "../Error/Error";
import { CurrentUserContext } from "../context/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import moviesApi from "../../utils/MoviesApi";

import InfoTooltip from "../InfoTooltip/InfoTooltip";
import unionTrue from "../../images/union.svg";
import unionFalse from "../../images/unionerror.svg";

function App() {
  const location = useLocation();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [filterShortMovies, setFilterShortMovies] = useState([]);
  const [filterShortSaveMovies, setFilterShortSaveMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [saveFilterSaveMovies, setFilterSaveMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [shortMoviesSave, setShortMoviesSave] = useState([]);
  const [isData, setData] = useState({});
  const [loaded, setLoaded] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const [checkedFilms, setCheckedFilms] = useState(false);
  const [checkedSaveFilms, setCheckedSaveFilms] = useState(false);
  const [permissonCheck, setPermissonCheck] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const pathHeadersArray = ["/", "/movies", "/saved-movies", "/profile"];
  const pathFootersArray = ["/", "/movies", "/saved-movies"];
  const pathMovies = location.pathname === "/movies";
  const pathMoviesSave = location.pathname === "/saved-movies";
  const pathHeaders = pathHeadersArray.includes(location.pathname);
  const pathFooters = pathFootersArray.includes(location.pathname);

  // проверка токенов авторизованных пользователей, вернувшихся в приложение

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .examinationValidationToken(token)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          handleInfoTooltip({
            union: unionFalse,
            text: "Ошибка токена",
          });
        });
    }
  }

  // Загрузка данных пользователя и фильмов
  useEffect(() => {
    setLoaded(true);
    setTimeout(() => {
      if (loggedIn) {
        Promise.all([
          moviesApi.getMovies(),
          mainApi.getAboutUser(),
          mainApi.getSaveMovies(),
        ])
          .then(([movies, user, saveMovies]) => {
            localStorage.setItem("user", JSON.stringify(user));
            setCurrentUser(JSON.parse(localStorage.getItem("user")));
            const userSaveMovie = saveMovies.filter(
              (movie) => movie.owner === user._id
            );
            localStorage.setItem("saveMovies", JSON.stringify(userSaveMovie));
            setSaveMovies(JSON.parse(localStorage.getItem("saveMovies")));
            localStorage.setItem("movies", JSON.stringify(movies));
            setMovies(JSON.parse(localStorage.getItem("movies")));
            setLoaded(false);
          })
          .catch((err) => {
            console.log(err);
            handleInfoTooltip({
              union: unionFalse,
              text: "Ошибка обновления данных",
            });
          });
      }
    }, 1000);
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPermissonCheck(true);
      return;
    }
    checkToken();
    setPermissonCheck(true);
    setLoggedIn(true);
    setCheckedFilms(JSON.parse(localStorage.getItem("checkedFilms")));
    setCheckedSaveFilms(JSON.parse(localStorage.getItem("checkedSaveFilms")));
  }, []);

  // Обновление короткометражек
  useEffect(() => {
    setShortMovies(JSON.parse(localStorage.getItem("durationMovieShort")));
    setShortMoviesSave(
      JSON.parse(localStorage.getItem("durationMovieShortSave"))
    );
  }, [checkedFilms, checkedSaveFilms]);
  useEffect(() => {
    const handleWindowLoad = () => {
      setLoggedIn(false);
    };

    window.addEventListener("load", handleWindowLoad);

    return () => window.removeEventListener("load", handleWindowLoad);
  }, []);
  // Закрытие попапа уведомления
  function closeAllPopups() {
    setInfoTooltip(false);
  }

  // Открытие попапа уведомления и данные попапа
  function handleInfoTooltip(data) {
    setInfoTooltip(true);
    setData({ ...data });
  }

  // Поиск фильмов
  function handleEnter(search) {
    const moviesFilter = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase());
    });
    const moviesShortFilter = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase());
    });
    localStorage.setItem("moviesSearch", JSON.stringify(moviesFilter));
    localStorage.setItem(
      "moviesSearchShort",
      JSON.stringify(moviesShortFilter)
    );
    setTimeout(() => {
      setLoaded(false);
      setFilterMovies(JSON.parse(localStorage.getItem("moviesSearch")));
      setFilterShortMovies(
        JSON.parse(localStorage.getItem("moviesSearchShort"))
      );
      setIsFiltered(true);
    }, 450);
  }

  // Сохранение фильма
  function handleSaveMovie(movieData) {
    setSaveMovies([...saveMovies, movieData]);
    mainApi
      .saveMovie(movieData)
      .then((newMovie) => {
        setSaveMovies([...saveMovies, newMovie]);
        localStorage.setItem(
          "saveMovies",
          JSON.stringify([...saveMovies, newMovie])
        );
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip({
          union: unionFalse,
          text: "Ошибка сохранения фильма",
        });
      });
  }

  // Поиск сохраненных фильмов
  function handleSearchSaveMovie(search) {
    const moviesSaveFilter = saveMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase());
    });
    const moviesSaveShortFilter = shortMoviesSave.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase());
    });
    localStorage.setItem("moviesSearchSave", JSON.stringify(moviesSaveFilter));
    localStorage.setItem(
      "moviesSearchShortSave",
      JSON.stringify(moviesSaveShortFilter)
    );
    setTimeout(() => {
      setLoaded(false);
      setFilterSaveMovies(JSON.parse(localStorage.getItem("moviesSearchSave")));
      setFilterShortSaveMovies(
        JSON.parse(localStorage.getItem("moviesSearchShortSave"))
      );
      setIsFiltered(true);
    }, 450);
  }

  // Функция удаления из избранного
  function handleDeleteSaveMovie(saveMovie) {
    mainApi
      .deleteMovie(saveMovie._id || saveMovie.id)
      .then(() => {
        const newCardsArr = saveMovies.filter((c) => c._id !== saveMovie._id);
        const newSavedCardsArr = saveMovies.filter(
          (c) => c._id !== saveMovie._id
        );
        setSaveMovies(newCardsArr);
        setFilterSaveMovies(newSavedCardsArr);
        handleInfoTooltip({
          union: unionTrue,
          text: "Фильм удален",
        });
        localStorage.removeItem("saveMovies", JSON.stringify(newCardsArr));
        localStorage.removeItem("saveMovies", JSON.stringify(newSavedCardsArr));
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip({
          union: unionFalse,
          text: "Нельзя удалить чужой фильм",
        });
      });
  }

  // Регистрация
  function handleRegistration(nameRegister, emailRegister, passwordRegister) {
    auth
      .register(nameRegister, emailRegister, passwordRegister)
      .then((res) => {
        console.log(emailRegister, passwordRegister);
        if (res) {
          handleInfoTooltip({
            union: unionTrue,
            text: "Вы успешно зарегистрировались!",
          });
          handleAuthorization(emailRegister, passwordRegister);
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip({
          union: unionFalse,
          text: `Пользователь с таким email ${emailRegister} уже существует`,
        });
      });
  }

  // Авторизация
  function handleAuthorization(emailLogin, passwordLogin) {
    auth
      .authorization(emailLogin, passwordLogin)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          handleInfoTooltip({
            union: unionTrue,
            text: "Вы успешно вошли!",
          });
          history.push("/movies");
        }
      })
      .then(() => {
        checkToken();
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip({
          union: unionFalse,
          text: "Вы ввели неправильный логин или пароль",
        });
      });
  }

  // Обновление пользователя
  function handleUpdateUser(user) {
    mainApi
      .editProfile(user)
      .then((user) => {
        setCurrentUser(user);
        handleInfoTooltip({
          union: unionTrue,
          text: "Профиль обновлен ",
        });
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => {
        console.log(`Внимание! ${err}`);
        handleInfoTooltip({
          union: unionFalse,
          text: `Пользователь с таким ${user.email} уже существует`,
        });
      });
  }

  // Короткометражки фильмов
  function checkShortFilms(e) {
    setLoaded(true);
    setTimeout(() => {
      if (!localStorage.getItem("checkedFilms")) {
        const durationMovieShort = movies.filter(
          (movie) => movie.duration <= 40
        );
        localStorage.setItem(
          "durationMovieShort",
          JSON.stringify(durationMovieShort)
        );
        localStorage.setItem("checkedFilms", JSON.stringify(!checkedFilms));
        setShortMovies(JSON.parse(localStorage.getItem("durationMovieShort")));
        setCheckedFilms(JSON.parse(localStorage.getItem("checkedFilms")));
      } else {
        localStorage.setItem("checkedFilms", JSON.stringify(!checkedFilms));
        setMovies(movies);
        setCheckedFilms(JSON.parse(localStorage.getItem("checkedFilms")));
      }
      setLoaded(false);
    }, 450);
  }

  // Короткометражки сохраненных фильмов
  function checkShortFilmsSave(e) {
    setLoaded(true);
    setTimeout(() => {
      if (!localStorage.getItem("checkedSaveFilms")) {
        const durationMovieShortSave = saveMovies.filter(
          (movie) => movie.duration <= 40
        );
        localStorage.setItem(
          "durationMovieShortSave",
          JSON.stringify(durationMovieShortSave)
        );
        setShortMoviesSave(
          JSON.parse(localStorage.getItem("durationMovieShortSave"))
        );
        localStorage.setItem(
          "checkedSaveFilms",
          JSON.stringify(!checkedSaveFilms)
        );
        setCheckedSaveFilms(
          JSON.parse(localStorage.getItem("checkedSaveFilms"))
        );
      } else {
        setSaveMovies(saveMovies);
        localStorage.setItem(
          "checkedSaveFilms",
          JSON.stringify(!checkedSaveFilms)
        );
        setCheckedSaveFilms(
          JSON.parse(localStorage.getItem("checkedSaveFilms"))
        );
      }
      setLoaded(false);
    }, 450);
  }

  // Выход
  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser([]);
    setCheckedFilms(false);
    setCheckedSaveFilms(false);
    setFilterMovies([]);
    setFilterShortMovies([]);
    setFilterSaveMovies([]);
    setFilterShortSaveMovies([]);
    history.push("/");
  }

  if (!permissonCheck) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {!pathHeaders ? null : <Header loggedIn={loggedIn} />}
      <Switch>
        <Route exact path="/" component={Main} />
        <ProtectedRoute
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          handleEnter={handleEnter}
          loaded={loaded}
          isFiltered={isFiltered}
          movies={movies}
          filterMovies={filterMovies}
          filterShortMovies={filterShortMovies}
          handleSaveMovie={handleSaveMovie}
          saveMovies={saveMovies}
          handleDeleteSaveMovie={(movie) => handleDeleteSaveMovie(movie)}
          checkShortFilms={checkShortFilms}
          onCheckedFilms={checkedFilms}
          shortMovies={shortMovies}
          pathMovies={pathMovies}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          loaded={loaded}
          handleSearchSaveMovie={handleSearchSaveMovie}
          isFiltered={isFiltered}
          saveMovies={saveMovies}
          handleDeleteSaveMovie={handleDeleteSaveMovie}
          saveFilterSaveMovies={saveFilterSaveMovies}
          filterShortSaveMovies={filterShortSaveMovies}
          checkShortFilmsSave={checkShortFilmsSave}
          onCheckedSaveFilms={checkedSaveFilms}
          shortMovies={shortMoviesSave}
          pathMoviesSave={pathMoviesSave}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          onUpdateUser={handleUpdateUser}
          handleSignOut={handleSignOut}
          loggedIn={loggedIn}
        />
        <Route path="/signin">
          <Login handleAuthorization={handleAuthorization} />
        </Route>
        <Route path="/signup">
          <Register handleRegistration={handleRegistration} />
        </Route>
        <Route path="*" component={Error} />
      </Switch>
      <InfoTooltip
        isOpen={isInfoTooltip}
        onClose={closeAllPopups}
        loggedIn={loggedIn}
        union={isData}
      />
      {!pathFooters ? null : <Footer />}
    </CurrentUserContext.Provider>
  );
}

export default App;
