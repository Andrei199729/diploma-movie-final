import React from "react";
import { Link } from "react-router-dom";

function Error() {
    return (
        <div className="error">
            <div className="error__container">
                <h2 className="error__title">404</h2>
                <p className="error__paragraph">Страница не найдена</p>
                <Link className="error__link" to='/'>Назад</Link>
            </div>
        </div>
    );
}

export default Error;