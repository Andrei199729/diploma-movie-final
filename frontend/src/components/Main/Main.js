import React, { useContext } from "react";
import AboutProject from "../AboutProject/AboutProject";
import NavTab from "../NavTab/NavTab ";
import Promo from "../Promo/Promo ";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main() {

  return (
        <main className="main">
            <Promo />
            <NavTab />
            <AboutProject id="aboutproject" />
            <Techs id="techs" />
            <AboutMe id="student" />
            <Portfolio />
        </main>
    );
}

export default Main;