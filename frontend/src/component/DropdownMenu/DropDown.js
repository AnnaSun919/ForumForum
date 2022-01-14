import React, { useState, useEffect } from "react";
import "./DropDown.css";

function Dropdownmenu(props) {
  const pageNoArr = props.pageArray;

  return (
    <>
      <div className="drop">
        <div className="menu">
          {pageNoArr.map((elem, index) => (
            <div
              className="item"
              key={index}
              onClick={(e) => {
                props.onPage(e, elem);
                props.onOpen();
              }}
            >
              {elem}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Dropdownmenu;
