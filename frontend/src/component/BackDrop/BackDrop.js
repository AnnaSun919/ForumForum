import React from "react";

import "./BackDrop.css";

const backdrop = (props) => (
  <div onClick={props.onCreate} className="backdrop"></div>
);

export default backdrop;
