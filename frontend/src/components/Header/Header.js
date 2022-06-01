import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  const location = useLocation();
  const landing = location.pathname === "/";

  return (
    <header className={landing ? "header" : "header__movies"}>
      <Navigation loggedIn={props.loggedIn} />
    </header>
  );
}

export default Header;
