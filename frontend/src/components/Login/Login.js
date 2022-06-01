import React, { useEffect, useState } from "react";
import FormAuthentication from "../FormAuthentication/FormAuthentication";

function Login(props) {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

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

  function handleChangeEmail(e) {
    setEmailLogin(e.target.value);
    if (
      !String(e.target.value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setDataError(
        "Что-то пошло не так. Некорректный Email или неверный пароль"
      );
      if (!e.target.value) {
        setDataError("Email не может быть пустым");
      }
    } else {
      setDataError("");
    }
  }

  function handleChangePassword(e) {
    setPasswordLogin(e.target.value);

    if (e.target.value.length < 6 || e.target.value.length > 20) {
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
    if (!emailLogin || !passwordLogin) {
      return;
    }
    props.handleAuthorization(emailLogin, passwordLogin);
  }

  function blurHandler(e) {
    switch (e.target.name) {
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
      btn="Войти"
      paragraphLink="Ещё не зарегистрированы?"
      to="/signup"
      linkText="Регистрация"
      formName="formlogin"
      title="Рады видеть!"
      handleSubmit={handleSubmit}
      dataDirty={dataDirty}
      dataError={dataError}
      formValid={!formValid}
    >
      <label className="form-authentication__label" htmlFor="emaillogin">
        E-mail
      </label>
      <input
        className="form-authentication__input"
        id="emaillogin"
        type="email"
        name="email"
        value={emailLogin ? emailLogin : ""}
        minLength="2"
        maxLength="40"
        onChange={handleChangeEmail}
        onBlur={blurHandler}
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
        value={passwordLogin ? passwordLogin : ""}
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

export default Login;
