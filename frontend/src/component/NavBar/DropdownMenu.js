import React, { useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import AuthContext from "../../context/authcontext";

function DropdownMenu() {
  const [acitiveMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const context = useContext(AuthContext);

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

  console.log(context);

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
          {context.userName ? (
            <>
              <DropdownItem>{context.userName}</DropdownItem>
              <DropdownItem leftIcon="😯">
                <span onClick={context.logout}>Logout</span>
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem leftIcon="😄" path="/signup">
                Sign Up
              </DropdownItem>
              <DropdownItem leftIcon="🥸" path="/signin">
                Sign In{" "}
              </DropdownItem>{" "}
            </>
          )}

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
          <DropdownItem leftIcon="🌝">Dark Mode </DropdownItem>
          <DropdownItem leftIcon="🌞">Light Mode </DropdownItem>
          <DropdownItem leftIcon="🧐" rightIcon="👈🏻" goToMenu="main">
            My Profile
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default DropdownMenu;
