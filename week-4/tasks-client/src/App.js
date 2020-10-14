import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <Navbar />

            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </div>
    );
}

export default App;
