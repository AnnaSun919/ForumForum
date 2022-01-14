import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./pages/Auth";
import Home from "./pages/Topic";
import Users from "./pages/User";
import Authcontext from "./context/authcontext";
import React, { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  function login(token, userId, userName, TokenExpired) {
    setToken(token);
    setUserId(userId);
    setUserName(userName);
  }

  function logout() {
    setToken(null);
    setUserId(null);
    setUserName(null);
  }

  return (
    <BrowserRouter>
      <Authcontext.Provider
        value={{
          token: token,
          userId: userId,
          userName: userName,
          login: login,
          logout: logout,
        }}
      >
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/users" component={Users} exact />
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
