import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Pair from "../components/Pair";
import Header from "../components/Header";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/" component={Dashboard}></Route>
        <Route exact path="/pair/:id" component={Pair}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
