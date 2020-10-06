import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import NavBar from "./components/NavBar";
import { Projects } from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            loggedInUser: null,
        };
    }

    changeRedirect() {
        this.setState({ redirect: !this.state.redirect });
    }

    // return (
    //     <div className="App">
    //         <Home />
    //         <About />
    //     </div>
    // );

    render() {
        return (
            <div className="App">
                <NavBar />

                {/* This is the like the {{{body}}} in express layout */}
                <Switch>
                    <Route exact path="/" component={Home} />

                    {/* this method allows for only one prop to be passed */}
                    <Route exact path="/about" component={About} />

                    {/* this is the method to be able to pass multiple props */}
                    <Route
                        exact
                        path="/projects"
                        render={(props) => (
                            <Projects
                                changeRedirect={() => this.changeRedirect()}
                                redirect={this.state.redirect}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/projects/:id"
                        render={(props) =>
                            this.state.redirect ? (
                                <Redirect to="/" />
                            ) : (
                                <ProjectDetails {...props} />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
