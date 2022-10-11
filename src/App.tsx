import "./App.css";

import * as React from "react";
import { Route, Switch } from "react-router-dom";

import useConfig from "./components/useConfig";
import Home from "./browser/pages/Home";
import Dashboard from "./browser/pages/Dashboard";

/**
 * Our Web Application
 */
export default function App() {
  const { app } = useConfig();
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
}
