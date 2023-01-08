import React from 'react';
import './App.css';
import Header from './Header';
import Home from "./Home"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Checkout from "./Checkout"
import Login from "./Login"
import Footer from "./Footer"
import About from "./About";
import Contact from "./Contact"
import FAQ from "./FAQ";

function App() {
  return (
    // BEM
    <Router>
      <div className="app">

        <Switch>
          <Route path="/login" component={Login} />

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/about">
            <Header />
            <About />
            <Footer />
          </Route>

          <Route path="/faq">
            <Header />
            <FAQ />
            <Footer />
          </Route>

          <Route path="/contact">
            <Header />
            <Contact />
            <Footer />
          </Route>

          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
