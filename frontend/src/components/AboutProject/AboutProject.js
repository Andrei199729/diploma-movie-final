import React from "react";
import Section from "../Section/Section";

function AboutProject(props) {
    return (
        <Section
            title="О проекте"
            id={props.id}
        >
            <div className="about-project__row">
                <div className="about-project__size">
                    <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__size">
                    <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__performance">
                <div className="about-project__backend">
                    <h3 className="about-project__subtitle-development about-project__subtitle-backend">1 неделя</h3>
                    <p className="about-project__paragraph-development">Back-end</p>
                </div>
                <div className="about-project__frontend">
                    <h3 className="about-project__subtitle-development about-project__subtitle-frontend">4 недели</h3>
                    <p className="about-project__paragraph-development">Front-end</p>
                </div>
            </div>
        </Section>
    );
}

export default AboutProject;