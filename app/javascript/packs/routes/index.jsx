import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Events from "../components/Events";
import Event from '../components/Event';
import Home from '../components/Home';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/events" exact component={Events} />
      <Route path="/events/:id" exact component={Event} />
    </Switch>
  </Router>
);