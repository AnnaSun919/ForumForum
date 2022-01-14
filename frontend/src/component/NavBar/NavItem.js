import React, { useState } from "react";

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <span className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </span>
      <span>{props.name}</span>
      {open && props.children}
    </li>
  );
}

export default NavItem;
