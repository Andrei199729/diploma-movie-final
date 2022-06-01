import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import BtnEditProfile from "../BtnEditProfile/BtnEditProfile";
import BtnSaveProfile from "../BtnSaveProfile/BtnSaveProfile";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);

  const [readOnly, setReadOnly] = useState(true);
  const [nameProfile, setNameProfile] = useState("");
  const [emailProfile, setEmailProfile] = useState("");
  const [dataDirty, setDataDirty] = useState(false);
  const [dataError, setDataError] = useState(
    "Что-то пошло не так. Имя не должно быть пустым или некорректный Email"
  );
  const [formValid, setFormValid] = useState(false);

  const edit = "Редактировать";
  const save = "Сохранить";

  useEffect(() => {
    setReadOnly(true);
  }, []);

  useEffect(() => {
    if (dataError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [dataError]);

  useEffect(() => {
    setNameProfile(currentUser.name);
    setEmailProfile(currentUser.email);
  }, [currentUser]);

  function handleClickEdit(e) {
    e.preventDefault();
    setReadOnly(false);
  }

  function handleChangeName(e) {
    setNameProfile(e.target.value);
    if (
      (!e.target.validity.valid && e.target.value.length < 3) ||
      e.target.value.length > 20
    ) {
      setDataError(
        "Что-то пошло не так. Имя не должно быть пустым или некорректный Email"
      );
      if (!e.target.value) {
        setDataError("Имя не может быть пустым");
      }
    } else {
      setDataError("");
    }
  }

  function handleChangeEmail(e) {
    setEmailProfile(e.target.value);
    if (
      !String(e.target.value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setDataError(
        "Что-то пошло не так. Имя не должно быть пустым или некорректный Email"
      );
      if (!e.target.value) {
        setDataError("Email не может быть пустым");
      }
    } else {
      setDataError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: nameProfile,
      email: emailProfile,
    });
    setReadOnly(true);
  }

  function blurHandler(e) {
    switch (e.target.name) {
      case "nameprofile":
        setDataDirty(true);
        break;
      case "emailprofile":
        setDataDirty(true);
        break;
      default:
        break;
    }
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form
          className="profile__form"
          action="/"
          name="formprofile"
          onSubmit={handleSubmit}
        >
          <label className="profile__label" htmlFor="nameprofile">
            Имя
            <input
              type="text"
              className="profile__input"
              name="nameprofile"
              id="nameprofile"
              minLength="2"
              maxLength="20"
              value={nameProfile ? nameProfile : ""}
              onChange={handleChangeName}
              onBlur={blurHandler}
              required
              readOnly={readOnly}
            />
          </label>
          <label className="profile__label" htmlFor="emailprofile">
            E-mail
            <input
              type="email"
              className="profile__input"
              id="emailprofile"
              name="emailprofile"
              minLength="2"
              maxLength="100"
              value={emailProfile ? emailProfile : ""}
              onChange={handleChangeEmail}
              onBlur={blurHandler}
              required
              readOnly={readOnly}
            />
          </label>
          {dataDirty && dataError && (
            <div className="error-form">{dataError}</div>
          )}
          {!readOnly ? (
            <BtnSaveProfile saveText={save} onDisabled={!formValid} />
          ) : (
            <BtnEditProfile editText={edit} onHandleClick={handleClickEdit} />
          )}
        </form>
        <Link className="profile__link" to="/" onClick={props.handleSignOut}>
          Выйти из аккаунта
        </Link>
      </div>
    </div>
  );
}

export default Profile;
