import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

function DropdownMenu() {
  const [acitiveMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href={props.path}
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={acitiveMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem path="/signup">Sign Up</DropdownItem>
          <DropdownItem path="/signin">Sign In </DropdownItem>
          <DropdownItem leftIcon="🧐" rightIcon="👉🏻" goToMenu="setting">
            Setting
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={acitiveMenu === "setting"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>Topic</DropdownItem>
          <DropdownItem path="/All">All</DropdownItem>
          <DropdownItem path="/shopping">Shopping </DropdownItem>
          <DropdownItem path="/Leisure">Leisure</DropdownItem>
          <DropdownItem path="/Food">Food</DropdownItem>
          <DropdownItem leftIcon="🧐" rightIcon="👈🏻" goToMenu="main">
            My Profile
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default DropdownMenu;
