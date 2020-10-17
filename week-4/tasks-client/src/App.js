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
import axios from "axios";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null,
        };

        this.service = new AuthService();
    }

    componentDidMount() {
        console.log({
            service: this.service,
            env: process.env.REACT_APP_API_DOMAIN,
        });
        this.service.currentUser().then((theCurrentUser) => {
            console.log({ theCurrentUser });
            this.setState({ currentUser: theCurrentUser || null });
        });
        // axios
        //     .get(`${process.env.REACT_APP_API_DOMAIN}/auth/isLoggedIn`, {
        //         withCredentials: true,
        //     })
        //     .then((theCurrentUser) => {
        //         console.log({ theCurrentUser });
        //         this.setState({ currentUser: theCurrentUser || null });
        //     });
    }

    render() {
        return (
            <div className="App">
                <Navbar currentUser={this.state.currentUser} />

                <Switch>
                    <Route exact path="/" component={Home} />
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
                                <Signup />
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
                                <Login />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
