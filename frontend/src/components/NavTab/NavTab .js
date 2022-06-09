import React from "react";

function NavTab() {
    return (
        <nav className="navtab">
            <ul className="navtab__lists">
                <li><a className="navtab__list navtab__list-margin-reset" href="#aboutproject">О проекте</a></li>
                <li><a className="navtab__list" href="#techs">Технологии</a></li>
                <li><a className="navtab__list" href="#student">Студент</a></li>
            </ul>
        </nav>
    );
}

export default NavTab;