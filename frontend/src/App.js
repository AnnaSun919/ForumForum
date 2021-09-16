import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./pages/Auth";
import Home from "./pages/Topic";
import Authcontext from "./context/authcontext";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  function login(token, userId, TokenExpired) {
    setToken(token);
    setUserId(userId);
  }

  function logout() {
    setToken(null);
    setUserId(null);
  }

  function Navbar(props) {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">{props.children}</ul>
      </nav>
    );
  }

  function NavItem(props) {
    const [open, setOpen] = useState(false);
    return (
      <li className="nav-item">
        <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </a>

        {open && props.children}
      </li>
    );
  }

  function DropdownMenu() {
    const [acitiveMenu, setActiveMenu] = useState("setting");
    function DropdownItem(props) {
      console.log(props.goToMenu);
      return (
        <a
          href="#"
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
      <div className="dropdown">
        <CSSTransition
          in={acitiveMenu === "main"}
          unmountOnExit
          timeout={500}
          classNames="menu-primary"
        >
          <div className="menu">
            <DropdownItem>My Profile</DropdownItem>
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
        >
          <div className="menu">
            <DropdownItem>Setting</DropdownItem>
            <DropdownItem leftIcon="🧐" rightIcon="👈🏻" goToMenu="main">
              My Profile
            </DropdownItem>
          </div>
        </CSSTransition>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar>
        <NavItem icon="🤣" />
        <NavItem icon="🤣" />
        <NavItem icon="🤣" />

        <NavItem icon="🤣">
          <DropdownMenu />
        </NavItem>
      </Navbar>
      <Authcontext.Provider
        value={{
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Switch>
          <Route path="/" component={Home} exact />
          <Route
            path="/signup"
            render={(routeProps) => {
              return <AuthPage name="Sign up" {...routeProps} />;
            }}
          />
          {token && <Redirect from="/signin" to="/" exact />}
          <Route
            path="/signin"
            render={(routeProps) => {
              return <AuthPage name="Sign in" {...routeProps} />;
            }}
          />
        </Switch>
      </Authcontext.Provider>
    </BrowserRouter>
  );
}

export default App;
