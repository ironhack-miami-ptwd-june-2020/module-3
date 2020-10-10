import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PokeList from "./components/PokeList";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/poke-list" component={PokeList} />
            </Switch>
        </div>
    );
}

export default App;
