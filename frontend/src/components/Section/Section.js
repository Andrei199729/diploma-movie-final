import React from "react";

function Section(props) {
    return (
        <section className={props.title !== 'Технологии' ? `section` : 'techs__background'} id={props.id}>
            <div className="section__container">
                <h2 className="section__title">{props.title}</h2>
                {props.children}
            </div>
        </section>
    );
}

export default Section;