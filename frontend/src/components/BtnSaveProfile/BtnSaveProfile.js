import React from "react";

function BtnSaveProfile(props) {
  return (
    <button className="profile__btn" type="submit" disabled={props.onDisabled}>
      {props.saveText}
    </button>
  );
}

export default BtnSaveProfile;
