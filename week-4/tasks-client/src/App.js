import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import AuthService from "./components/services/AuthService";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TaskList from "./components/tasks/TaskList";
import UpdateTask from "./components/tasks/UpdateTask";
import CreateTask from "./components/tasks/CreateTask";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
// import axios from "axios";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null,
        };

        this.service = new AuthService();
    }

    componentDidMount() {
        this.getCurrentUser();
    }

    getCurrentUser = () => {
        console.log("getting user info!");
        this.service
            .currentUser()
            .then((theCurrentUser) => {
                console.log({ theCurrentUser });
                this.setState({ currentUser: theCurrentUser });
            })
            .catch((err) => {
                console.log({ err });
                this.setState({ currentUser: null });
            });
    };

    render() {
        return (
            <div className="App">
                <Navbar currentUser={this.state.currentUser} />

                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => (
                            <Home
                                {...props}
                                getCurrentUser={this.getCurrentUser}
                            />
                        )}
                    />
                    <Route exact path="/task-list" component={TaskList} />
                    <Route exact path="/task/create" component={CreateTask} />
                    <Route
                        exact
                        path="/update/:taskId"
                        render={(props) => <UpdateTask {...props} />}
                    />
                    <Route
                        exact
                        path="/signup"
                        render={(props) =>
                            this.state.currentUser ? (
                                <Redirect to="/" />
                            ) : (
                                <Signup
                                    {...props}
                                    getCurrentUser={this.getCurrentUser}
                                />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/login"
                        render={(props) =>
                            this.state.currentUser ? (
                                <Redirect to="/" />
                            ) : (
                                <Login
                                    {...props}
                                    getCurrentUser={this.getCurrentUser}
                                />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
