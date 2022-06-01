import React from "react";

function Portfolio() {
    return (
        <div className="portfolio">
            <div className="portfolio__container">
                <h3 className="portfolio__subtitle">Портфолио</h3>
                <a className="portfolio__project" href="https://github.com/Andrei199729/how-to-learn.git" target="_blank" rel="noreferrer">Статичный сайт</a>
                <a className="portfolio__project" href="https://github.com/Andrei199729/russian-travel.git" target="_blank" rel="noreferrer">Адаптивный сайт</a>
                <a className="portfolio__project" href="https://github.com/Andrei199729/react-mesto-api-full.git"><span className="portfolio__project-span" target="_blank" rel="noreferrer">Одностраничное приложение</span></a>
            </div>
        </div>
    );
}

export default Portfolio;