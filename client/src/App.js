import React from "react";
import {BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Issue from "./components/Issue";
import Edit from "./components/Edit";
import Add from "./components/Add";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/add" exact component={Add} />
      <Route path="/list/:id" exact component={Issue} />
      <Route path="/update/:id" exact component={Edit} />
    </Router>
  );
}

export default App;
