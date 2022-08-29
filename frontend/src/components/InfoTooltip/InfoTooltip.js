import React from "react";

function InfoTooltip(props) {
  return (
    <>
      <div
        className={`popup popup_infotooltip popup_transition ${
          props.isOpen ? "popup_opened" : ""
        }`}
        onClick={props.onClose}
      >
        <div
          className="popup__container"
          onClick={(evt) => evt.stopPropagation()}
        >
          <button
            className="popup__close-btn"
            type="button"
            onClick={props.onClose}
          ></button>
          <div className="popup__content">
            <img className="popup__image" src={props.union.union} alt="icon" />
            <p className="popup__text">{props.union.text}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;
