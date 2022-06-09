import React from "react";
import Section from "../Section/Section";
import MyPhoto from "../../images/photo_author.png";

function Main(props) {
    return (
        <Section
            title="Студент"
            id={props.id}
        >
            <div className="about-me">
                <div className="about-me__row">
                    <div className="about-me__text">
                        <h3 className="about-me__name">Андрей</h3>
                        <p className="about-me__job">Фронтенд-разработчик, 24 года</p>
                        <p className="about-me__characteristic">Я из Республики Беларусь, родился в г.Ельск, живу в Минске, закончил уиверситет БелГУТ в Гомеле. Я люблю слушать музыку. Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <div>
                            <a className="about-me__social" href="/">Facebook</a>
                            <a className="about-me__social" href="/">Github</a>
                        </div>
                    </div>
                    <img className="about-me__author" src={MyPhoto} alt="Автор" />
                </div>
            </div>
        </Section>
    );
}

export default Main;