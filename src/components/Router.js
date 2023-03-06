import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <Router>
      <Switch>
        {isLogged ? (
          <Route exact path="/">
            <Home />
          </Route>
        ) : (
          <Route exact path="/login">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
