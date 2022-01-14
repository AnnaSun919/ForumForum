import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./pages/Auth";
import Home from "./pages/Topic";
import Users from "./pages/User";
import Authcontext from "./context/authcontext";
import React, { useState, useContext } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const context = useContext(Authcontext);

  function login(token, userId, userName, TokenExpired) {
    setToken(token);
    setUserId(userId);
    setUserName(userName);

    const user = { username: userName, userid: userId, token: token };
    localStorage.setItem("user", JSON.stringify(user));
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.clear();

    setToken(null);
    setUserId(null);
    setUserName(null);
  }

  console.log(context);

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
