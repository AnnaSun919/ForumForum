import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./pages/Auth";
import Home from "./pages/Topic";

import Authcontext from "./context/authcontext";
import React, { useState } from "react";

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

  return (
    <BrowserRouter>
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
