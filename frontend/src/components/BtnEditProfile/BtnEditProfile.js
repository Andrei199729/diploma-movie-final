import React from "react";

function BtnEditProfile(props) {
  return (
    <button
      className="profile__btn"
      type="button"
      onClick={props.onHandleClick}
    >
      {props.editText}
    </button>
  );
}

export default BtnEditProfile;
