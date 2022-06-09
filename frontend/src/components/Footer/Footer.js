import React from "react";

function Footer() {
    return (
      <footer className="footer">
        <div className="footer__container">
          <p className="footer__paragraph">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <div className="footer__row">
            <p className="footer__copy">&copy; {new Date().getFullYear()}</p>
            <ul className="footer__lists">
              <li className="footer__list-li">
                <a className="footer__list" href="/">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__list-li">
                <a className="footer__list" href="/">
                  Github
                </a>
              </li>
              <li className="footer__list-li">
                <a className="footer__list" href="/">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
}

export default Footer;
