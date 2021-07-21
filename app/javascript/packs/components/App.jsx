import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import Home from './Home';
import Events from './Events';
import Event from './Event';

export default props => (
    <Router>
    <Navbar />
    <Container>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/events" exact component={Events} />
        <Route path="/events/:id" exact component={Event} />
      </Switch>
    </Container>
    </Router>
);