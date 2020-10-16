import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TaskList from "./components/tasks/TaskList";
import UpdateTask from "./components/tasks/UpdateTask";
import CreateTask from "./components/tasks/CreateTask";

function App() {
    return (
        <div className="App">
            <Navbar />

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/task-list" component={TaskList} />
                <Route exact path="/task/create" component={CreateTask} />
                <Route
                    exact
                    path="/update/:taskId"
                    render={(props) => <UpdateTask {...props} />}
                />
            </Switch>
        </div>
    );
}

export default App;
