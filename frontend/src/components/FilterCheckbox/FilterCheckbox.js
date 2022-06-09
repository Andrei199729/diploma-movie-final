import React from "react";

function FilterCheckbox(props) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          className="filter-checkbox__input"
          type="checkbox"
          onChange={props.checkShort}
          checked={props.onChecked}
        />
        <span className="filter-checkbox__slider filter-checkbox__round"></span>
      </label>
      <p className="filter-checkbox__paragraph">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
