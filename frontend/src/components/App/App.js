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
  const [checked, setChecked] = useState(false);
  const [permissonCheck, setPermissonCheck] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const pathHeadersArray = ["/", "/movies", "/saved-movies", "/profile"];
  const pathFootersArray = ["/", "/movies", "/saved-movies"];

  const pathHeaders = pathHeadersArray.includes(location.pathname);
  const pathFooters = pathFootersArray.includes(location.pathname);

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
            setCurrentUser(user);
            const userSaveMovie = saveMovies.filter(
              (movie) => movie.owner === user._id
            );
            localStorage.setItem("saveMovies", JSON.stringify(userSaveMovie));
            setSaveMovies(JSON.parse(localStorage.getItem("saveMovies")));
            localStorage.setItem("movies", JSON.stringify(movies));
            setMovies(JSON.parse(localStorage.getItem("movies")));
            setLoaded(false);
          })
          .catch((err) => console.log(err));
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
  }, []);

  // Обновление короткометражек
  useEffect(() => {
    setShortMovies(JSON.parse(localStorage.getItem("durationMovieShort")));
    setShortMoviesSave(
      JSON.parse(localStorage.getItem("durationMovieShortSave"))
    );
  }, [movies]);

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
        });
    }
  }

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
    const moviesShortFilter = shortMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase());
    });
    setTimeout(() => {
      setLoaded(false);
      setFilterMovies(moviesFilter);
      setFilterShortMovies(moviesShortFilter);
      setIsFiltered(true);
    }, 450);
  }

  // Сохранение фильма
  function handleSaveMovie(movieData) {
    mainApi
      .saveMovie(movieData)
      .then((newMovie) => {
        setSaveMovies([newMovie, ...saveMovies]);
        localStorage.setItem(
          "saveMovies",
          JSON.stringify([newMovie, ...saveMovies])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Поиск сохраненных фильмов
  function handleSearchSaveMovie(search) {
    const moviesSaveFilter = saveMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase());
    });
    const moviesSaveShortFilter = saveMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(search.toLowerCase());
    });
    setTimeout(() => {
      setLoaded(false);
      setFilterSaveMovies(moviesSaveFilter);
      setFilterShortSaveMovies(moviesSaveShortFilter);
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
        if (res) {
          handleInfoTooltip({
            union: unionTrue,
            text: "Вы успешно зарегистрировались!",
          });
          history.push("/signin");
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
      if (checked) {
        const durationMovieShort = movies.filter(
          (movie) => movie.duration <= 40
        );
        localStorage.setItem(
          "durationMovieShort",
          JSON.stringify(durationMovieShort)
        );
        setShortMovies(JSON.parse(localStorage.getItem("durationMovieShort")));
        setChecked(!checked);
      } else {
        setMovies(movies);
        setChecked(!checked);
      }
      setLoaded(false);
    }, 450);
  }

  // Короткометражки сохраненных фильмов
  function checkShortFilmsSave(e) {
    setLoaded(true);
    setTimeout(() => {
      if (checked) {
        const durationMovieShortSave = saveMovies.filter(
          (movie) => movie.duration <= 40
        );
        console.log("Save", durationMovieShortSave);
        localStorage.setItem(
          "durationMovieShortSave",
          JSON.stringify(durationMovieShortSave)
        );
        setShortMoviesSave(
          JSON.parse(localStorage.getItem("durationMovieShortSave"))
        );
        setChecked(!checked);
      } else {
        setSaveMovies(saveMovies);
        setChecked(!checked);
      }
      setLoaded(false);
    }, 450);
  }

  // Выход
  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser([]);
    setSaveMovies([]);
    setFilterMovies([]);
    setFilterSaveMovies([]);
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
          onChecked={checked}
          shortMovies={shortMovies}
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
          checkShortFilms={checkShortFilmsSave}
          onChecked={checked}
          shortMovies={shortMoviesSave}
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
