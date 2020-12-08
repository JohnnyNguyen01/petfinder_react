import React from "react";
import SignUp from "./pages/signup/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthState from "./contexts/auth/AuthState";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Switch>
          {/* //todo: change "/" to private route */}
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
