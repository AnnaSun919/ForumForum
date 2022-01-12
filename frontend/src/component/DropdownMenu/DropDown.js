import React, { useState, useEffect } from "react";

function Dropdownmenu(props) {
  const pageNoArr = props.pageArray;

  return (
    <>
      <div className="dropdown">
        <div className="menu">
          {pageNoArr.map((elem, index) => (
            <div
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
