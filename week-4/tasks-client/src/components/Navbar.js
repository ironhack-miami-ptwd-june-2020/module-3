import React from "react";
import { Link } from "react-router-dom";
import AuthService from "./services/AuthService";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
        console.log({ propsInNav: this.props });
    }

    logout = () => {
        this.service
            .logout()
            .then(() => {
                this.props.history.push("/");
            })
            .catch((err) => console.log({ err }));
    };

    displayUserOptions() {
        return this.props.currentUser ? (
            <div>
                <img
                    src={`${this.props.currentUser.profileImage}`}
                    alt="profile icon"
                />
                <h4>Hello {this.props.currentUser.username}</h4>
                <button onClick={this.logout}>Logout</button>
            </div>
        ) : (
            <div>
                <Link to="/signup">Sing Up</Link>
                <Link to="login">Log In</Link>
            </div>
        );
    }

    render() {
        return (
            <nav className="space-between">
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/task-list">Tasks</Link>
                </div>
                <div>{this.displayUserOptions()}</div>
            </nav>
        );
    }
}

export default Navbar;
