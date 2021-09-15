import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./pages/Auth";
import Home from "./pages/Topic";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route
          path="/signup"
          render={(routeProps) => {
            return <AuthPage name="Sign up" {...routeProps} />;
          }}
        />
        <Route
          path="/signin"
          render={(routeProps) => {
            return <AuthPage name="Sign in" {...routeProps} />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
