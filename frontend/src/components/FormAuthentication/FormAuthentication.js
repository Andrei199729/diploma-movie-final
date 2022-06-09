import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";

function FormAuthentication(props) {
  return (
    <div className="form-authentication__container">
      <form
        className="form-authentication"
        action="/"
        method="PATCH"
        name={props.formName}
        onSubmit={props.handleSubmit}
      >
        <Link to="/" className="header__logo-authentication">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
        <h2 className="form-authentication__title">{props.title}</h2>
        {props.children}
        {props.dataDirty && props.dataError && (
          <div className="error-form">{props.dataError}</div>
        )}
        <button
          className="form-authentication__btn"
          type="submit"
          disabled={props.formValid}
        >
          {props.btn}
        </button>
      </form>
      <div className="form-authentication__signin">
        <p className="form-authentication__signin-paragraph">
          {props.paragraphLink}
          <Link className="form-authentication__link" to={props.to}>
            {props.linkText}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FormAuthentication;
