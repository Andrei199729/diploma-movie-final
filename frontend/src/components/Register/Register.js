import React, { useEffect, useState } from "react";
import FormAuthentication from "../FormAuthentication/FormAuthentication";

function Register(props) {
  const [nameRegister, setNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [dataDirty, setDataDirty] = useState(false);
  const [dataError, setDataError] = useState(
    "Что-то пошло не так. Некорректный Email или неверный пароль"
  );
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (dataError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [dataError]);

  function handleChangeName(e) {
    setNameRegister(e.target.value);
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
    setEmailRegister(e.target.value);
    if (
      !String(e.target.value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setDataError(
        "Что-то пошло не так. Некорректное имя или Email, или неверный пароль"
      );
      if (!e.target.value) {
        setDataError("Email не может быть пустым");
      }
    } else {
      setDataError("");
    }
  }

  function handleChangePassword(e) {
    setPasswordRegister(e.target.value);
    if (e.target.value.length < 8 || e.target.value.length > 20) {
      setDataError(
        "Что-то пошло не так. Некорректный Email или неверный пароль"
      );
      if (!e.target.value) {
        setDataError("Пароль не может быть пустым");
      }
    } else {
      setDataError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!nameRegister || !emailRegister || !passwordRegister) {
      return;
    }
    props.handleRegistration(nameRegister, emailRegister, passwordRegister);
    setNameRegister("");
    setEmailRegister("");
    setPasswordRegister("");
  }

  function blurHandler(e) {
    switch (e.target.name) {
      case "name":
        setDataDirty(true);
        break;
      case "email":
        setDataDirty(true);
        break;
      case "password":
        setDataDirty(true);
        break;
      default:
        break;
    }
  }

  return (
    <FormAuthentication
      btn="Зарегистрироваться"
      paragraphLink="Уже зарегистрированы?"
      to="/signin"
      linkText="Войти"
      formName="formregister"
      title="Добро пожаловать!"
      handleSubmit={handleSubmit}
      formValid={!formValid}
      dataDirty={dataDirty}
      dataError={dataError}
    >
      <label className="form-authentication__label" htmlFor="nameregister">
        Имя
      </label>
      <input
        className="form-authentication__input"
        id="nameregister"
        type="text"
        name="name"
        value={nameRegister}
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        onBlur={blurHandler}
        autoComplete="off"
        required
      />
      <label className="form-authentication__label" htmlFor="emailregister">
        E-mail
      </label>
      <input
        className="form-authentication__input"
        id="emailregister"
        type="email"
        name="email"
        value={emailRegister}
        minLength="8"
        maxLength="40"
        onChange={handleChangeEmail}
        onBlur={blurHandler}
        autoComplete="off"
        required
      />
      <label className="form-authentication__label" htmlFor="passwordregister">
        Пароль
      </label>
      <input
        className="form-authentication__input"
        id="passwordregister"
        type="password"
        name="password"
        value={passwordRegister}
        minLength="6"
        maxLength="200"
        onChange={handleChangePassword}
        onBlur={blurHandler}
        autoComplete="off"
        required
      />
    </FormAuthentication>
  );
}

export default Register;
